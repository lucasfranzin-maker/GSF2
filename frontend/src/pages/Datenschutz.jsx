import React from "react";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";

export default function Datenschutz() {
  const { lang } = useLang();
  const de = lang === "de";
  const sections = de
    ? [
        { h: "1. Verantwortlicher", b: `Verantwortlich für die Datenverarbeitung ist Grafik Service Franzin (Pty) Ltd. Kontakt: ${LOCATIONS_CONTACT.emailInfo}.` },
        { h: "2. Erhebung und Verwendung", b: "Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen angegebenen Daten (Name, Unternehmen, E-Mail, Telefon, Standort, Betreff und Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage." },
        { h: "3. Speicherung", b: "Ihre Anfrage wird zur Bearbeitung gespeichert und per E-Mail an unser Team übermittelt. Eine Weitergabe an unberechtigte Dritte erfolgt nicht." },
        { h: "4. Ihre Rechte", b: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich hierzu an die oben genannte Kontaktadresse." },
        { h: "5. Kontakt", b: `Bei Fragen zum Datenschutz erreichen Sie uns unter ${LOCATIONS_CONTACT.emailInfo}.` },
      ]
    : [
        { h: "1. Controller", b: `The data controller is Grafik Service Franzin (Pty) Ltd. Contact: ${LOCATIONS_CONTACT.emailInfo}.` },
        { h: "2. Collection and use", b: "When you use our contact form, we process the data you provide (name, company, email, phone, location, subject and message) solely to handle your inquiry." },
        { h: "3. Storage", b: "Your inquiry is stored for processing and forwarded to our team by email. It is not shared with unauthorised third parties." },
        { h: "4. Your rights", b: "You have the right to access, rectify, erase and restrict the processing of your personal data. Please contact the address above." },
        { h: "5. Contact", b: `For privacy questions, reach us at ${LOCATIONS_CONTACT.emailInfo}.` },
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
