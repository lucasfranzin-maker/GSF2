import React from "react";
import { useLang } from "@/i18n/LanguageContext";

export const LanguageToggle = ({ className = "" }) => {
  const { lang, setLang } = useLang();
  const base = "font-mono-tech text-xs uppercase tracking-[0.15em] px-1.5 py-0.5 transition-colors duration-150";
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Language selection"
      data-testid="language-toggle"
    >
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
        data-testid="language-toggle-de"
        className={base}
        style={{ color: lang === "de" ? "var(--gsf-blue)" : "var(--gsf-muted)", fontWeight: lang === "de" ? 600 : 400 }}
      >
        DE
      </button>
      <span aria-hidden="true" style={{ color: "var(--gsf-border)" }}>/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        data-testid="language-toggle-en"
        className={base}
        style={{ color: lang === "en" ? "var(--gsf-blue)" : "var(--gsf-muted)", fontWeight: lang === "en" ? 600 : 400 }}
      >
        EN
      </button>
    </div>
  );
};
