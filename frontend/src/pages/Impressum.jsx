import React from "react";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function Impressum() {
  const { lang } = useLang();
  const de = lang === "de";
  useDocumentMeta({
    title: de ? "Impressum" : "Imprint",
    description: de ? "Angaben gemäß den gesetzlichen Anforderungen." : "Legal information as required by law.",
    path: "/impressum",
  });
  const Row = ({ label, value }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3" style={{ borderBottom: "1px solid var(--gsf-border)" }}>
      <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--gsf-muted)" }}>{label}</div>
      <div className="gsf-body text-sm sm:col-span-2">{value}</div>
    </div>
  );
  return (
    <>
      <PageHeader label={de ? "Impressum" : "Imprint"} icon={FileText} headline={[de ? "Impressum" : "Imprint"]} intro={de ? "Angaben gemäß den gesetzlichen Anforderungen." : "Legal information as required by law."} />
      <section className="gsf-section pt-6">
        <div className="gsf-container max-w-3xl">
          <div className="gsf-panel !p-8">
            <Row label={de ? "Firma" : "Company"} value="Grafik Service Franzin (Pty) Ltd." />
            <Row label={de ? "Anschrift (SA)" : "Address (SA)"} value="4 School Street, Unit 96, Platinum Junction Business Park, Milnerton 7441, Cape Town, South Africa" />
            <Row label={de ? "Vertreten durch" : "Represented by"} value={`${LOCATIONS_CONTACT.managingDirector}, Linnthun 12, 25578 Dägeling, Germany`} />
            <Row label={de ? "Geschäftsführer" : "Managing Director"} value={LOCATIONS_CONTACT.managingDirector} />
            <Row label={de ? "Telefon" : "Phone"} value={LOCATIONS_CONTACT.phoneGermany} />
            <Row label={de ? "Telefax" : "Fax"} value={LOCATIONS_CONTACT.faxGermany} />
            <Row label="E-Mail" value={LOCATIONS_CONTACT.emailSalesDE} />
            <Row label={de ? "USt-IdNr." : "VAT ID no."} value={LOCATIONS_CONTACT.vatId} />
            <Row label={de ? "Handelsreg.-Nr." : "Comp. reg. no."} value={LOCATIONS_CONTACT.compReg} />
            <Row label={de ? "Zoll-Import-Nr." : "Cust. import no."} value={LOCATIONS_CONTACT.custImport} />
          </div>
        </div>
      </section>
    </>
  );
}
