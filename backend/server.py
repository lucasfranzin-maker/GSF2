from fastapi import FastAPI, APIRouter, HTTPException, Header, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import secrets
import hmac
import hashlib
import time
from collections import defaultdict, deque
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
# Initial/fallback recipient, seeded into the DB-backed setting below on first
# startup. After that, the value stored in MongoDB (editable from /admin) wins.
DEFAULT_CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', 'lucas.franzin@googlemail.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Admin auth. No hardcoded fallback: if unset, admin endpoints are disabled
# (503) instead of silently accepting a publicly-known default token.
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', '')
if not ADMIN_TOKEN:
    logger.warning(
        'ADMIN_TOKEN is not set - admin endpoints (/api/admin/*, /api/contact GET) '
        'are disabled until it is configured.'
    )

# Admin sessions: login exchanges ADMIN_TOKEN for a short-lived, HMAC-signed
# session token, so the actual secret only ever leaves the browser once.
ADMIN_SESSION_TTL_SECONDS = int(os.environ.get('ADMIN_SESSION_TTL_SECONDS', '28800'))  # 8h

# Contact-form spam protection (in-memory, per-process - fine for a single
# backend instance; would need a shared store e.g. Redis behind a load balancer).
CONTACT_RATE_LIMIT = int(os.environ.get('CONTACT_RATE_LIMIT', '5'))
CONTACT_RATE_WINDOW_SECONDS = int(os.environ.get('CONTACT_RATE_WINDOW_SECONDS', '600'))
_contact_submission_log: dict = defaultdict(deque)

SETTINGS_DOC_ID = 'app_settings'

# Create the main app without a prefix
app = FastAPI(title="GSF – Grafik Service Franzin API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    company: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=60)
    location: Optional[str] = Field(default="", max_length=120)
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)
    lang: Optional[str] = Field(default="de", max_length=5)
    # Honeypot: real visitors never see or fill this field (hidden in the UI).
    # Any non-empty value marks the submission as automated.
    website: Optional[str] = Field(default="", max_length=200)


class ContactResponse(BaseModel):
    ok: bool
    id: str
    email_status: str


class SettingsResponse(BaseModel):
    contact_recipient: str


class SettingsUpdate(BaseModel):
    contact_recipient: EmailStr


class AdminLoginResponse(BaseModel):
    ok: bool
    session_token: str
    expires_at: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _esc(value: Optional[str]) -> str:
    if not value:
        return "-"
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def _require_admin_token(x_admin_token: str) -> None:
    """Checked only at /admin/login, where the real secret is presented."""
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=503, detail="Admin-Zugang ist nicht konfiguriert (ADMIN_TOKEN fehlt).")
    if not secrets.compare_digest(x_admin_token or "", ADMIN_TOKEN):
        raise HTTPException(status_code=401, detail="Ungültiges Passwort")


def _sign(payload: str) -> str:
    return hmac.new(ADMIN_TOKEN.encode(), payload.encode(), hashlib.sha256).hexdigest()


def _issue_session_token() -> AdminLoginResponse:
    expires_at_ts = int(time.time()) + ADMIN_SESSION_TTL_SECONDS
    payload = str(expires_at_ts)
    token = f"{payload}.{_sign(payload)}"
    expires_at_iso = datetime.fromtimestamp(expires_at_ts, tz=timezone.utc).isoformat()
    return AdminLoginResponse(ok=True, session_token=token, expires_at=expires_at_iso)


def _verify_session_token(token: str) -> bool:
    if not ADMIN_TOKEN or not token or "." not in token:
        return False
    payload, _, sig = token.partition(".")
    if not secrets.compare_digest(sig, _sign(payload)):
        return False
    try:
        expires_at_ts = int(payload)
    except ValueError:
        return False
    return time.time() < expires_at_ts


def _require_admin_session(x_admin_session: str) -> None:
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=503, detail="Admin-Zugang ist nicht konfiguriert (ADMIN_TOKEN fehlt).")
    if not _verify_session_token(x_admin_session or ""):
        raise HTTPException(status_code=401, detail="Sitzung abgelaufen oder ungültig. Bitte erneut anmelden.")


def _client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def _is_rate_limited(ip: str) -> bool:
    now = time.time()
    log = _contact_submission_log[ip]
    while log and now - log[0] > CONTACT_RATE_WINDOW_SECONDS:
        log.popleft()
    if len(log) >= CONTACT_RATE_LIMIT:
        return True
    log.append(now)
    return False


async def _get_contact_recipient() -> str:
    doc = await db.settings.find_one({"_id": SETTINGS_DOC_ID})
    if doc and doc.get("contact_recipient"):
        return doc["contact_recipient"]
    return DEFAULT_CONTACT_RECIPIENT


def _build_email_html(payload: ContactCreate) -> str:
    rows = [
        ("Name", payload.name),
        ("Unternehmen", payload.company),
        ("E-Mail", payload.email),
        ("Telefon", payload.phone),
        ("Standort", payload.location),
        ("Betreff", payload.subject),
    ]
    row_html = "".join(
        f"<tr>"
        f"<td style='padding:8px 14px;border-bottom:1px solid #E2E8F0;"
        f"font-family:Arial,sans-serif;font-size:13px;color:#6B7787;width:150px;"
        f"vertical-align:top;'><b>{_esc(label)}</b></td>"
        f"<td style='padding:8px 14px;border-bottom:1px solid #E2E8F0;"
        f"font-family:Arial,sans-serif;font-size:14px;color:#0B1B33;'>{_esc(val)}</td>"
        f"</tr>"
        for label, val in rows
    )
    message_html = _esc(payload.message).replace("\n", "<br>")
    return f"""
    <div style="background:#F6F8FA;padding:28px;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #CBD3DC;\
border-radius:12px;overflow:hidden;">
        <div style="padding:22px 26px;border-bottom:1px solid #CBD3DC;">
          <div style="font-size:12px;letter-spacing:2px;color:#6B7787;text-transform:uppercase;">\
GSF · Print Engineering Solutions</div>
          <div style="font-size:20px;font-weight:bold;color:#0B1B33;margin-top:6px;">Neue Kontaktanfrage</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">{row_html}</table>
        <div style="padding:18px 26px;">
          <div style="font-size:13px;color:#6B7787;text-transform:uppercase;letter-spacing:1px;\
margin-bottom:8px;">Nachricht</div>
          <div style="font-size:14px;color:#0B1B33;line-height:1.6;">{message_html}</div>
        </div>
        <div style="padding:16px 26px;border-top:1px solid #CBD3DC;font-size:12px;color:#6B7787;">
          Gesendet über gsf-franzin.com · Sprache: {_esc(payload.lang)}
        </div>
      </div>
    </div>
    """


async def _send_contact_email(payload: ContactCreate) -> str:
    """Returns 'sent', 'skipped' (no key/recipient) or 'failed:<reason>'."""
    recipient = await _get_contact_recipient()
    if not RESEND_API_KEY or not recipient:
        logger.warning("Email skipped: RESEND_API_KEY or contact recipient not configured")
        return "skipped"

    subject = payload.subject or "Kontaktanfrage"
    params = {
        "from": f"GSF Kontakt <{SENDER_EMAIL}>",
        "to": [recipient],
        "reply_to": payload.email,
        "subject": f"[GSF Website] {subject} – {payload.name}",
        "html": _build_email_html(payload),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Contact email sent: {result.get('id') if isinstance(result, dict) else result}")
        return "sent"
    except Exception as e:  # noqa: BLE001
        logger.error(f"Failed to send contact email: {e!r}")
        return f"failed:{e}"


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "GSF API online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(payload: ContactCreate, request: Request):
    """Store a contact inquiry and send a notification email via Resend."""
    ip = _client_ip(request)

    if payload.website:
        # Honeypot triggered - almost certainly a bot. Pretend success
        # without storing or emailing anything, so it gets no useful signal.
        logger.info(f"Contact submission from {ip} rejected: honeypot field filled")
        return ContactResponse(ok=True, id=str(uuid.uuid4()), email_status="skipped")

    if _is_rate_limited(ip):
        raise HTTPException(status_code=429, detail="Zu viele Anfragen. Bitte versuchen Sie es später erneut.")

    contact_id = str(uuid.uuid4())
    email_status = await _send_contact_email(payload)

    doc = {
        "id": contact_id,
        "name": payload.name,
        "company": payload.company,
        "email": payload.email,
        "phone": payload.phone or "",
        "location": payload.location or "",
        "subject": payload.subject or "",
        "message": payload.message,
        "lang": payload.lang or "de",
        "email_status": email_status,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    try:
        await db.contacts.insert_one(doc)
    except Exception as e:  # noqa: BLE001
        logger.error(f"Failed to store contact: {e!r}")
        raise HTTPException(status_code=500, detail="Speicherung fehlgeschlagen. Bitte später erneut versuchen.")

    # Email delivery failing should not lose the inquiry (it is stored),
    # but surface a soft error so the UI can inform the user.
    if email_status.startswith("failed"):
        # Still return ok=True because the inquiry is stored; UI shows success.
        logger.warning(f"Contact {contact_id} stored but email failed: {email_status}")

    return ContactResponse(ok=True, id=contact_id, email_status=email_status)


@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(x_admin_token: str = Header(default="")):
    """Verify the admin password and exchange it for a short-lived session token."""
    _require_admin_token(x_admin_token)
    return _issue_session_token()


@api_router.get("/contact", response_model=List[dict])
async def list_contacts(x_admin_session: str = Header(default="")):
    """Protected admin listing of stored inquiries (most recent first)."""
    _require_admin_session(x_admin_session)
    contacts = await db.contacts.find({}, {"_id": 0}).sort("createdAt", -1).to_list(500)
    return contacts


@api_router.get("/admin/settings", response_model=SettingsResponse)
async def get_settings(x_admin_session: str = Header(default="")):
    """Read the current, DB-stored notification settings (e.g. contact recipient)."""
    _require_admin_session(x_admin_session)
    recipient = await _get_contact_recipient()
    return SettingsResponse(contact_recipient=recipient)


@api_router.put("/admin/settings", response_model=SettingsResponse)
async def update_settings(payload: SettingsUpdate, x_admin_session: str = Header(default="")):
    """Update where contact-form notification emails are sent, without a redeploy."""
    _require_admin_session(x_admin_session)
    await db.settings.update_one(
        {"_id": SETTINGS_DOC_ID},
        {"$set": {"contact_recipient": payload.contact_recipient}},
        upsert=True,
    )
    return SettingsResponse(contact_recipient=payload.contact_recipient)


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    # No cookies/sessions are used (admin auth is a bearer token in a custom
    # header), so credentials are not needed here. Keeping this False avoids
    # the unsafe combination of a wildcard origin with allow_credentials=True.
    allow_credentials=False,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def seed_settings():
    """Seed the DB-stored contact recipient once, from CONTACT_RECIPIENT/default."""
    existing = await db.settings.find_one({"_id": SETTINGS_DOC_ID})
    if not existing:
        await db.settings.insert_one({
            "_id": SETTINGS_DOC_ID,
            "contact_recipient": DEFAULT_CONTACT_RECIPIENT,
        })


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
