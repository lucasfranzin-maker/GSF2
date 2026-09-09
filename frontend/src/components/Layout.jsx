import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const Layout = ({ children }) => {
  return (
    <div className="App flex flex-col min-h-screen">
      <ScrollToTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:border" style={{ borderColor: "var(--gsf-border)" }}>
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};
