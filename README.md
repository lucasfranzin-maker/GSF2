# GSF – Grafik Service Franzin | Print Engineering Solutions

Moderne, zweisprachige (DE/EN) B2B-Unternehmenswebsite für **GSF – Grafik Service Franzin**.
Import & Distribution von Produkten für die grafische Industrie sowie tesa Klebebandlösungen aus Deutschland nach Südafrika – alleiniger tesa Alliance Partner in Südafrika.

## Tech-Stack

| Bereich   | Technologie |
|-----------|-------------|
| Frontend  | React 19 (CRA), Tailwind CSS, shadcn/ui, framer-motion, lucide-react, react-router-dom |
| Backend   | FastAPI, Motor (MongoDB async), Pydantic |
| Datenbank | MongoDB |
| E-Mail    | Resend (transaktionale E-Mails für das Kontaktformular) |

## Projektstruktur

```
/app
├── backend/
│   ├── server.py              # FastAPI App + /api/contact (Speicherung + Resend-Mail)
│   ├── requirements.txt       # Laufzeit-Abhängigkeiten
│   ├── requirements-dev.txt   # zusätzlich: Tests/Lint (pytest, flake8, ...)
│   ├── .env.example           # Vorlage für backend/.env (NICHT committen)
│   └── .env                   # NICHT committen
├── .github/workflows/ci.yml   # Lint/Build-Check für Backend & Frontend
└── frontend/
    ├── public/                # index.html (SEO/OG), robots.txt, sitemap.xml
    └── src/
        ├── App.js             # Router + Provider
        ├── index.css          # GSF Design-Tokens (Farben, Typo, Regeln)
        ├── i18n/              # LanguageContext + Übersetzungen (DE/EN)
        ├── components/        # Header, Footer, RouteMap, BrandMark, PartnerLogos, ...
        └── pages/             # Home, UeberGsf, Standorte, Tesa, Sortiment, Kontakt, Admin, Impressum, Datenschutz
```

## Seiten / Routen

- `/` – Startseite (Hero + animierte Route-Grafik, Standorte, Stärken, tesa, Sortiment, Partner, Kontakt-CTA)
- `/standorte` – Cape Town, Durban, Johannesburg, Hamburg
- `/tesa` – tesa Partnerschaft & Anwendungen
- `/sortiment` – Produktbereiche (ohne Preise/Shop)
- `/ueber-gsf` – Über GSF
- `/kontakt` – Kontaktformular (Speicherung + E-Mail, Honeypot- und Rate-Limit-Spamschutz)
- `/admin` – Interner Bereich: eingegangene Anfragen + Einstellung des E-Mail-Empfängers (passwortgeschützt via `ADMIN_TOKEN`, siehe "Admin-Zugang" unten)
- `/impressum`, `/datenschutz`

## Design

Technisch-industrielle Editorial-Ästhetik: viel Weißraum, dünne/gestrichelte Linien, Navy-Text auf hellem Grau/Weiß, kräftiges Blau als Akzent, sparsame Türkis/Violett/Gelb-Mosaikakzente. Keine Verläufe, kein Glassmorphism, keine 3D-Effekte. Design-Tokens siehe `frontend/src/index.css`.

## Lokale Entwicklung

### Backend
```bash
cd backend
pip install -r requirements-dev.txt   # oder requirements.txt ohne Test-/Lint-Tools
cp .env.example .env                  # Werte anpassen, siehe unten
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd frontend
yarn install
cp .env.example .env                  # Werte anpassen, siehe unten
yarn start
```

## Environment-Variablen

**backend/.env** (siehe `backend/.env.example`)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=gsf_database
CORS_ORIGINS=http://localhost:3000        # kommagetrennte Liste, kein "*" in Produktion
RESEND_API_KEY=re_...                     # Resend API Key
SENDER_EMAIL=onboarding@resend.dev        # verifizierter Absender (Domain bei Resend verifizieren)
CONTACT_RECIPIENT=lucas.franzin@googlemail.com  # nur Start-Default, siehe unten
ADMIN_TOKEN=...                           # Pflicht! Langer, zufälliger String (z. B. `openssl rand -hex 32`)
ADMIN_SESSION_TTL_SECONDS=28800           # Session-Gültigkeit nach Login, Default 8h
CONTACT_RATE_LIMIT=5                      # max. Kontaktformular-Anfragen ...
CONTACT_RATE_WINDOW_SECONDS=600           # ... pro IP innerhalb dieses Zeitfensters (Sek.)
```

**frontend/.env** (siehe `frontend/.env.example`)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

`ADMIN_TOKEN` ist Pflicht: Ist die Variable nicht gesetzt, antworten alle `/api/admin/*`-Endpunkte
sowie `GET /api/contact` mit `503`, statt einen unsicheren Standardwert zu akzeptieren.

## Admin-Zugang

`POST /api/admin/login` prüft das `ADMIN_TOKEN`-Passwort und tauscht es gegen ein kurzlebiges,
HMAC-signiertes **Session-Token** (Standard-Gültigkeit 8h, `ADMIN_SESSION_TTL_SECONDS`). Alle
weiteren Aufrufe (Anfragen-Liste, Einstellungen) verwenden dieses Session-Token im Header
`X-Admin-Session` – das eigentliche Passwort verlässt den Browser dadurch nur einmal beim
Login, nicht mehr bei jedem einzelnen Request. Im Frontend liegt nur das Session-Token (inkl.
Ablaufzeit) in `sessionStorage`; nach Ablauf oder einem `401` vom Server wird automatisch
ausgeloggt.

Offener Punkt für später: aktuell teilen sich alle Mitarbeiter ein einzelnes Passwort. Echte,
personalisierte Logins (z. B. E-Mail + Passwort pro Mitarbeiter) wären der nächste Schritt, falls
Nachvollziehbarkeit ("wer hat wann reingeschaut") relevant wird.

## Spam-Schutz im Kontaktformular

`POST /api/contact` hat zwei einfache Schutzmechanismen gegen automatisierten Spam:

- **Honeypot-Feld** (`website`): im Frontend unsichtbar, wird aber von simplen Formular-Bots
  häufig automatisch ausgefüllt. Ist das Feld befüllt, wird die Anfrage weder gespeichert noch
  per Mail verschickt – der Absender bekommt aber weiterhin eine Erfolgsmeldung, damit Bots kein
  Signal erhalten, dass sie erkannt wurden.
- **Rate-Limit pro IP**: standardmäßig maximal `CONTACT_RATE_LIMIT` (5) Anfragen pro
  `CONTACT_RATE_WINDOW_SECONDS` (600s) und IP-Adresse; weitere Anfragen erhalten `429`. Das Limit
  liegt im Arbeitsspeicher des Backend-Prozesses – für den aktuellen Betrieb mit einer einzelnen
  Backend-Instanz ausreichend. Bei mehreren Instanzen hinter einem Load Balancer müsste dieses
  Limit später in einen gemeinsamen Speicher (z. B. Redis) wandern.

## Kontaktformular / E-Mail (Resend)

`POST /api/contact` speichert jede Anfrage in MongoDB (`contacts`) und versendet eine
Benachrichtigung per Resend an den aktuell hinterlegten Empfänger. Dieser Empfänger ist
**keine feste Umgebungsvariable mehr**, sondern eine in MongoDB gespeicherte Einstellung:

- `CONTACT_RECIPIENT` in `backend/.env` dient nur als **Start-Default**, der beim allerersten
  Start in die Datenbank übernommen wird.
- Danach kann der Empfänger jederzeit direkt im **Admin-Bereich (`/admin`)** geändert werden
  (Feld "Empfänger-E-Mail" bzw. "Recipient email"), ohne Code-Änderung oder Redeploy.
- Aktuell ist der Empfänger auf `lucas.franzin@googlemail.com` gesetzt (Resend-Testmodus).

**Hinweis:** Im Resend-Testmodus (ohne verifizierte Domain) können E-Mails nur an die E-Mail
des Kontoinhabers zugestellt werden. Für den Live-Betrieb eine eigene Domain unter
resend.com/domains verifizieren, `SENDER_EMAIL` auf eine Adresse dieser Domain setzen und
den Empfänger im Admin-Bereich auf `sales-sa@franzin.de` / `info@franzin.de` umstellen.

## SEO & Accessibility

- Title, Meta-Description, Open Graph in `frontend/public/index.html`
- `robots.txt` + `sitemap.xml`
- Semantische HTML-Struktur, sichtbare Focus-States, ARIA-Labels, beschriftete Formularfelder

## CI

`.github/workflows/ci.yml` prüft bei jedem Push/PR: Backend-Lint (`flake8`) + Compile-Check,
sowie den Frontend-Build (`yarn build`). Das ersetzt keine vollständige Testsuite, gibt aber
eine automatische Rückmeldung, bevor kaputter Code auf `main` landet.
