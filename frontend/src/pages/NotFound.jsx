import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function NotFound() {
  const { lang } = useLang();
  const de = lang === "de";
  useDocumentMeta({ title: de ? "Seite nicht gefunden" : "Page not found", description: de ? "Die angeforderte Seite existiert nicht." : "The requested page does not exist." });
  return (
    <section className="gsf-section">
      <div className="gsf-container text-center py-24">
        <div className="font-head font-bold text-7xl" style={{ color: "var(--gsf-blue)" }}>404</div>
        <h1 className="gsf-h2 mt-6">{de ? "Seite nicht gefunden" : "Page not found"}</h1>
        <p className="gsf-body mt-4">{de ? "Die angeforderte Seite existiert nicht." : "The requested page does not exist."}</p>
        <Link to="/" className="gsf-btn-primary mt-8">{de ? "Zur Startseite" : "Back home"}<ArrowRight size={16} strokeWidth={2} /></Link>
      </div>
    </section>
  );
}
