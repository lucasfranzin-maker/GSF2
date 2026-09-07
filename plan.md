# plan.md

## 1) Objectives
- **Deliverable status:** Build and ship a modern, high-end bilingual (DE/EN) B2B corporate website for **GSF – Grafik Service Franzin** aligned to the provided reference (clean grid, generous whitespace, thin/dashed dividers, technical/editorial aesthetic; **no warm tones/gradients/3D**).
- Provide a complete **React + Tailwind + shadcn/ui** frontend with modular components + React Router pages.
- Provide a **FastAPI + MongoDB** backend with a **working contact flow**: validate → store submission → **send real email** via provider.
- Implement simple i18n (DE default, EN toggle) with translations in a single dictionary + persistence.
- Ensure responsive behavior, accessibility basics, SEO baseline, and production-ready structure.
- Finalize repo hygiene (README, env examples, secrets handling) and **push to GitHub via Emergent integration**.

**Current status (high level):**
- Phases **1 & 2 are complete**. Backend and frontend are built and working; tests passed (backend 100%, frontend 96% with one low UI issue that is now fixed). Remaining work is primarily **Phase 4 (GitHub)** plus optional hardening.

---

## 2) Implementation Steps

### Phase 1 — Core POC (Email + Contact Submission) (Isolation)
**Goal:** Prove the only failure-prone integration (email provider) works end-to-end before UI build-out.

**Status:** ✅ Completed

**What was done**
1. Email provider changed from SendGrid plan to **Resend.com** (user provided API key).
2. Built a minimal Python POC (`backend/poc_email.py`) and verified delivery.
3. Confirmed **Resend test-mode restriction**: emails can only be delivered to the account owner email until a domain is verified.

**Exit criteria:** Met
- POC sends email successfully (to the allowed test recipient).

---

### Phase 2 — V1 App Development (Frontend + Backend integration)
**Status:** ✅ Completed

**What was delivered**

**Backend**
- Implemented `POST /api/contact`:
  - Pydantic validation (name/company/email/message required; optional fields supported).
  - Stores inquiry in MongoDB `contacts` collection.
  - Sends email via Resend (async via `asyncio.to_thread`).
  - Returns `{ ok: true, id, email_status }`.
- Implemented `GET /api/contact` for simple inquiry listing.
- Verified end-to-end via curl and testing agent (backend **100%**).

**Frontend**
- Implemented full bilingual site (DE/EN) with **LanguageToggle** persisted in `localStorage`.
- Implemented sticky **Header** with nav routes and mobile **Sheet** menu.
- Built homepage matching the reference direction:
  - Hero with technical label `01 / Startseite`, large condensed uppercase H1.
  - **Animated SVG RouteMap** (Germany → South Africa) with dashed route and moving marker.
  - Sections: `02 / Standorte`, `03 / Unsere Stärken`, `04 / tesa Partnerschaft`, `05 / Sortiment`, `06 / Partner` + partner logo grid.
  - Footer with locations and legal links.
- Built pages:
  - `/` Home
  - `/ueber-gsf`
  - `/standorte`
  - `/tesa`
  - `/sortiment`
  - `/kontakt` (form + real company contact data)
  - `/impressum`, `/datenschutz`, `*` NotFound
- SEO baseline:
  - Title/meta/OG in `public/index.html`
  - `robots.txt` + `sitemap.xml`
- Accessibility basics:
  - Skip link, visible focus states, form labels/ARIA

**Testing**
- testing_agent_v3: backend 100%; frontend 96% with 1 LOW Sheet close-button issue.
- LOW issue fixed:
  - Added `pointer-events-none` to close icon in `ui/sheet.jsx`.
  - Removed redundant custom close button from `Header.jsx`.

**Exit criteria:** Met
- All pages render and route correctly.
- DE/EN toggle works and persists.
- Contact submission stores and emails successfully.
- Visual direction matches the reference.

---

### Phase 3 — Hardening, UX polish, and content completion
**Status:** 🟡 Mostly complete (core items done; optional hardening remains)

**Already done**
1. Accessibility basics: skip link, focus ring, labeled form controls.
2. Robust UI states: submit disabled while sending; toast success/error; success panel.
3. Spacing/grid alignment and dashed rules aligned to reference.
4. Icons standardized (lucide-react) with thin stroke.
5. Second pass testing completed; minor UI issue fixed.

**Optional remaining hardening (nice-to-have)**
- Backend rate limiting for `/api/contact` (basic per-IP throttling) to reduce spam.
- Add server-side spam mitigation (honeypot field or simple captcha alternative) if needed.
- Expand logging/monitoring around email failures and DB insert issues.
- Add a small admin-protected view for contacts (only if required).

**Exit criteria:** Already met for MVP
- No major UX/accessibility gaps; stable contact flow.

---

### Phase 4 — Release & GitHub
**Status:** 🟠 Pending (final delivery step)

**Completed within this phase**
1. Added `.env.example` files:
   - `backend/.env.example`
   - `frontend/.env.example`
2. Updated root `.gitignore` to exclude `.env` files (prevents secret leakage).
3. Wrote a full `README.md` with run steps + env configuration.

**Remaining steps**
1. Ensure no secrets are committed (Resend key must remain only in local env / platform secrets).
2. Use **Emergent “Save to GitHub” integration** to push the repo:
   - Create/select repo
   - Push current state
   - Confirm build instructions in README
3. (Post-push) Switch Resend from test mode to production:
   - Verify a domain in Resend
   - Set `SENDER_EMAIL` to a verified domain sender
   - Update `CONTACT_RECIPIENT` to `sales-sa@franzin.de` and/or `info@franzin.de`

**Exit criteria (Phase 4)**
- Repo pushed successfully via Emergent integration.
- README + env examples allow reproducible local run.
- Contact email configuration documented (test mode vs production domain).

---

## 3) Next Actions
1. **GitHub push (Emergent integration):** run the platform push flow and verify the repository contains the latest code.
2. Confirm environment configuration for deployment:
   - Resend: domain verification plan + final recipients.
   - MongoDB: production URL/DB name if applicable.
3. Optional: implement basic contact rate limiting/spam mitigation if the site will be public-facing immediately.

---

## 4) Success Criteria
- **Visual:** matches reference direction (white/neutral bg, navy ink text, strong blue accent; dashed rules; no gradients/warm palette; premium whitespace).
- **Functional:** DE/EN toggle works site-wide and persists; navigation works; all pages render responsively.
- **Contact:** validated form → MongoDB record created → email send attempted; `email_status` recorded.
  - Note: With **Resend test mode**, delivery is restricted to account owner until a domain is verified.
- **Quality:** accessible navigation/forms, clear UI states, good performance (SVG graphics, minimal assets).
- **Delivery:** clean repo structure + README + `.env.example` + `.gitignore` excludes secrets; GitHub push via Emergent integration.