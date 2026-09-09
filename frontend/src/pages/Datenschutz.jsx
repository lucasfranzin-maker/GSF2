import React from "react";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function Datenschutz() {
  const { lang } = useLang();
  const de = lang === "de";
  useDocumentMeta({
    title: de ? "Datenschutz" : "Privacy",
    description: de ? "Informationen zur Verarbeitung Ihrer Daten." : "Information on how we process your data.",
    path: "/datenschutz",
  });
  const sections = de
    ? [
        { h: "1. Verantwortlicher", b: `Verantwortlich für die Datenverarbeitung ist Grafik Service Franzin (Pty) Ltd. Kontakt: ${LOCATIONS_CONTACT.emailInfo}.` },
        { h: "2. Kontaktformular", b: "Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen angegebenen Daten (Name, Unternehmen, E-Mail, Telefon, Standort, Betreff und Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahme) bzw. lit. f (berechtigtes Interesse an der Beantwortung von Anfragen)." },
        { h: "3. E-Mail-Versand durch Resend", b: "Zum Versand der Benachrichtigung über eine neue Anfrage nutzen wir den E-Mail-Dienstleister Resend als Auftragsverarbeiter. Dabei werden die im Kontaktformular angegebenen Daten an Resend übermittelt, damit die Benachrichtigungs-E-Mail zugestellt werden kann." },
        { h: "4. Speicherdauer", b: "Ihre Anfrage wird zur Bearbeitung gespeichert und per E-Mail an unser Team übermittelt. Wir speichern Ihre Daten so lange, wie es zur Bearbeitung Ihrer Anfrage sowie zur Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich ist. Eine Weitergabe an unberechtigte Dritte erfolgt nicht." },
        { h: "5. Cookies & Analyse-Tools", b: "Wir setzen das Analyse-Tool PostHog ein, um anonymisierte Statistiken zur Nutzung unserer Website zu erhalten (z. B. besuchte Seiten, ungefähre Verweildauer). Dieses Tool wird ausschließlich dann aktiv, wenn Sie im Cookie-Banner „Alle akzeptieren“ ausgewählt haben; ohne Ihre Zustimmung findet keine Analyse statt. Ihre Entscheidung wird lokal in Ihrem Browser gespeichert (localStorage) und Sie können sie jederzeit ändern, indem Sie die Website-Daten Ihres Browsers für diese Seite löschen. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO." },
        { h: "6. Datenübermittlung nach Südafrika", b: "Da GSF sowohl in Deutschland als auch in Südafrika tätig ist, können im Rahmen der Bearbeitung Ihrer Anfrage Daten an unsere Standorte in Südafrika übermittelt werden. Wir treffen angemessene Maßnahmen, um ein Datenschutzniveau sicherzustellen, das dem der DSGVO entspricht." },
        { h: "7. Ihre Rechte", b: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie auf Datenübertragbarkeit und Widerspruch. Wenden Sie sich hierzu an die oben genannte Kontaktadresse." },
        { h: "8. Beschwerderecht", b: "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren." },
        { h: "9. Kontakt", b: `Bei Fragen zum Datenschutz erreichen Sie uns unter ${LOCATIONS_CONTACT.emailInfo}.` },
      ]
    : [
        { h: "1. Controller", b: `The data controller is Grafik Service Franzin (Pty) Ltd. Contact: ${LOCATIONS_CONTACT.emailInfo}.` },
        { h: "2. Contact form", b: "When you use our contact form, we process the data you provide (name, company, email, phone, location, subject and message) solely to handle your inquiry. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measure) or (f) (legitimate interest in responding to inquiries)." },
        { h: "3. Email delivery via Resend", b: "To send the notification about a new inquiry, we use the email service provider Resend as a data processor. The data you provide in the contact form is transmitted to Resend so the notification email can be delivered." },
        { h: "4. Retention period", b: "Your inquiry is stored for processing and forwarded to our team by email. We keep your data for as long as necessary to handle your inquiry and to meet statutory retention obligations. It is not shared with unauthorised third parties." },
        { h: "5. Cookies & analytics", b: "We use the analytics tool PostHog to obtain anonymised statistics on how our website is used (e.g. pages visited, approximate time on page). This tool is only activated if you select \"Accept all\" in the cookie banner; without your consent, no analytics take place. Your choice is stored locally in your browser (localStorage) and can be changed at any time by clearing this site's browsing data. The legal basis is your consent under Art. 6(1)(a) GDPR." },
        { h: "6. Data transfer to South Africa", b: "As GSF operates in both Germany and South Africa, data may be transferred to our South African locations as part of handling your inquiry. We take appropriate measures to ensure a level of data protection consistent with the GDPR." },
        { h: "7. Your rights", b: "You have the right to access, rectify, erase and restrict the processing of your personal data, as well as to data portability and objection. Please contact the address above." },
        { h: "8. Right to complain", b: "You have the right to lodge a complaint with a data protection supervisory authority regarding our processing of your personal data." },
        { h: "9. Contact", b: `For privacy questions, reach us at ${LOCATIONS_CONTACT.emailInfo}.` },
      ];
  return (
    <>
      <PageHeader label={de ? "Datenschutz" : "Privacy"} icon={ShieldCheck} headline={[de ? "Datenschutz" : "Privacy Policy"]} intro={de ? "Informationen zur Verarbeitung Ihrer Daten." : "Information on how we process your data."} />
      <section className="gsf-section pt-6">
        <div className="gsf-container max-w-3xl flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="gsf-h3">{s.h}</h2>
              <p className="gsf-body mt-3">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
