from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', '')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

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


class ContactResponse(BaseModel):
    ok: bool
    id: str
    email_status: str


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
      <div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #CBD3DC;border-radius:12px;overflow:hidden;">
        <div style="padding:22px 26px;border-bottom:1px solid #CBD3DC;">
          <div style="font-size:12px;letter-spacing:2px;color:#6B7787;text-transform:uppercase;">GSF · Print Engineering Solutions</div>
          <div style="font-size:20px;font-weight:bold;color:#0B1B33;margin-top:6px;">Neue Kontaktanfrage</div>
        </div>
        <table style="width:100%;border-collapse:collapse;">{row_html}</table>
        <div style="padding:18px 26px;">
          <div style="font-size:13px;color:#6B7787;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Nachricht</div>
          <div style="font-size:14px;color:#0B1B33;line-height:1.6;">{message_html}</div>
        </div>
        <div style="padding:16px 26px;border-top:1px solid #CBD3DC;font-size:12px;color:#6B7787;">
          Gesendet über gsf-franzin.com · Sprache: {_esc(payload.lang)}
        </div>
      </div>
    </div>
    """


async def _send_contact_email(payload: ContactCreate) -> str:
    """Returns 'sent', 'skipped' (no key) or 'failed:<reason>'."""
    if not RESEND_API_KEY or not CONTACT_RECIPIENT:
        logger.warning("Email skipped: RESEND_API_KEY or CONTACT_RECIPIENT not configured")
        return "skipped"

    subject = payload.subject or "Kontaktanfrage"
    params = {
        "from": f"GSF Kontakt <{SENDER_EMAIL}>",
        "to": [CONTACT_RECIPIENT],
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
async def create_contact(payload: ContactCreate):
    """Store a contact inquiry and send a notification email via Resend."""
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


@api_router.get("/contact", response_model=List[dict])
async def list_contacts():
    """Simple admin listing of stored inquiries (most recent first)."""
    contacts = await db.contacts.find({}, {"_id": 0}).sort("createdAt", -1).to_list(500)
    return contacts


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
