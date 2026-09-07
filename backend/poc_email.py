"""
POC: Verify Resend email delivery works with the provided API key.
Run: cd /app/backend && python poc_email.py
"""
import os
import resend
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
RECIPIENT = os.environ.get("CONTACT_RECIPIENT", "Lucas@Franzin.de")

resend.api_key = RESEND_API_KEY


def test_send():
    print(f"Sender:    {SENDER_EMAIL}")
    print(f"Recipient: {RECIPIENT}")
    print(f"Key set:   {bool(RESEND_API_KEY)}")

    html = """
    <div style="font-family: Arial, sans-serif; color:#0B1B33;">
      <h2 style="color:#0B1B33;">GSF - Neue Kontaktanfrage (POC-Test)</h2>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><b>Name</b></td><td>Max Mustermann</td></tr>
        <tr><td><b>Unternehmen</b></td><td>Musterdruck GmbH</td></tr>
        <tr><td><b>E-Mail</b></td><td>max@musterdruck.de</td></tr>
        <tr><td><b>Nachricht</b></td><td>Dies ist ein POC-Test der Resend-Anbindung.</td></tr>
      </table>
    </div>
    """
    params = {
        "from": f"GSF Kontakt <{SENDER_EMAIL}>",
        "to": [RECIPIENT],
        "subject": "GSF POC-Test - Kontaktanfrage",
        "html": html,
    }
    try:
        result = resend.Emails.send(params)
        print("SUCCESS:", result)
        return True
    except Exception as e:
        print("FAILED:", repr(e))
        return False


if __name__ == "__main__":
    ok = test_send()
    print("\n=== RESULT:", "PASS" if ok else "FAIL", "===")
