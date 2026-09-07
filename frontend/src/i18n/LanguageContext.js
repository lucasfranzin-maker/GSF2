import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { translations } from "@/i18n/translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "gsf-lang";

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "de" || stored === "en") return stored;
    }
    return "de";
  });

  const setLang = useCallback((next) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "de" ? "en" : "de");
  }, [lang, setLang]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
