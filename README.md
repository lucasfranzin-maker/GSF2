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
│   ├── requirements.txt
│   └── .env                   # NICHT committen (siehe .env.example)
└── frontend/
    ├── public/                # index.html (SEO/OG), robots.txt, sitemap.xml
    └── src/
        ├── App.js             # Router + Provider
        ├── index.css          # GSF Design-Tokens (Farben, Typo, Regeln)
        ├── i18n/              # LanguageContext + Übersetzungen (DE/EN)
        ├── components/        # Header, Footer, RouteMap, BrandMark, PartnerLogos, ...
        └── pages/             # Home, UeberGsf, Standorte, Tesa, Sortiment, Kontakt, Impressum, Datenschutz
```

## Seiten / Routen

- `/` – Startseite (Hero + animierte Route-Grafik, Standorte, Stärken, tesa, Sortiment, Partner, Kontakt-CTA)
- `/standorte` – Cape Town, Durban, Johannesburg, Hamburg
- `/tesa` – tesa Partnerschaft & Anwendungen
- `/sortiment` – Produktbereiche (ohne Preise/Shop)
- `/ueber-gsf` – Über GSF
- `/kontakt` – Kontaktformular (Speicherung + E-Mail)
- `/impressum`, `/datenschutz`

## Design

Technisch-industrielle Editorial-Ästhetik: viel Weißraum, dünne/gestrichelte Linien, Navy-Text auf hellem Grau/Weiß, kräftiges Blau als Akzent, sparsame Türkis/Violett/Gelb-Mosaikakzente. Keine Verläufe, kein Glassmorphism, keine 3D-Effekte. Design-Tokens siehe `frontend/src/index.css`.

## Lokale Entwicklung

### Backend
```bash
cd backend
pip install -r requirements.txt
# .env anlegen (siehe .env.example)
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend
```bash
cd frontend
yarn install
# .env anlegen (siehe .env.example)
yarn start
```

## Environment-Variablen

**backend/.env**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
RESEND_API_KEY=re_...              # Resend API Key
SENDER_EMAIL=onboarding@resend.dev # verifizierter Absender (Domain bei Resend verifizieren)
CONTACT_RECIPIENT=info@franzin.de  # Empfänger der Kontaktanfragen
```

**frontend/.env**
```
REACT_APP_BACKEND_URL=https://<deine-backend-url>
```

## Kontaktformular / E-Mail (Resend)

`POST /api/contact` speichert jede Anfrage in MongoDB (`contacts`) und versendet eine
Benachrichtigung per Resend an `CONTACT_RECIPIENT`. **Hinweis:** Im Resend-Testmodus
(ohne verifizierte Domain) können E-Mails nur an die E-Mail des Kontoinhabers zugestellt
werden. Für den Live-Betrieb eine eigene Domain unter resend.com/domains verifizieren und
`SENDER_EMAIL` auf eine Adresse dieser Domain setzen sowie `CONTACT_RECIPIENT` auf
`sales-sa@franzin.de` / `info@franzin.de` umstellen.

## SEO & Accessibility

- Title, Meta-Description, Open Graph in `frontend/public/index.html`
- `robots.txt` + `sitemap.xml`
- Semantische HTML-Struktur, sichtbare Focus-States, ARIA-Labels, beschriftete Formularfelder
