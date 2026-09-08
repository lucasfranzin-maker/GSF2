import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BrandLockup } from "@/components/BrandMark";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";

export const Header = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/standorte", label: t.nav.standorte },
    { to: "/tesa", label: t.nav.tesa },
    { to: "/sortiment", label: t.nav.sortiment },
    { to: "/projekte", label: t.nav.projekte },
    { to: "/ueber-gsf", label: t.nav.ueber },
    { to: "/kontakt", label: t.nav.kontakt },
  ];

  const navClass = ({ isActive }) =>
    `relative font-head uppercase text-[13px] tracking-[0.08em] font-medium transition-colors duration-150 py-1 ${
      isActive ? "gsf-nav-active" : ""
    }`;

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: `1px solid var(--gsf-border)`, boxShadow: scrolled ? "0 1px 0 rgba(11,27,51,0.04)" : "none" }}
      data-testid="site-header"
    >
      <div className="gsf-container flex items-center justify-between h-16 lg:h-20">
        <Link to="/" aria-label="GSF – Startseite" data-testid="brand-home-link" className="shrink-0">
          <BrandLockup />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" data-testid="site-nav" aria-label="Hauptnavigation">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass} style={({ isActive }) => ({ color: isActive ? "var(--gsf-blue)" : "var(--gsf-ink)" })} data-testid={`nav-${l.to.replace("/", "")}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <LanguageToggle />
          <span className="gsf-dashed-v h-6" />
          <Link to="/kontakt" className="gsf-btn-primary !py-2.5 !px-4 text-[12px]" data-testid="header-contact-cta">
            {t.common.contactCta}
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Menü öffnen"
                data-testid="mobile-nav-open-button"
                className="inline-flex items-center justify-center rounded-[8px] border p-2.5"
                style={{ borderColor: "var(--gsf-border)", color: "var(--gsf-ink)" }}
              >
                <Menu size={22} strokeWidth={1.6} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm bg-white p-0" data-testid="mobile-nav-panel">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between px-5 h-16" style={{ borderBottom: "1px solid var(--gsf-border)" }}>
                <BrandLockup compact />
              </div>
              <nav className="flex flex-col px-5 py-2" aria-label="Mobile Navigation">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-head uppercase text-base tracking-[0.06em] py-4"
                    style={({ isActive }) => ({ color: isActive ? "var(--gsf-blue)" : "var(--gsf-ink)", borderBottom: "1px solid var(--gsf-border)" })}
                    data-testid={`mobile-nav-${l.to.replace("/", "")}`}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>
              <div className="px-5 pt-4">
                <Link to="/kontakt" onClick={() => setOpen(false)} className="gsf-btn-primary w-full" data-testid="mobile-header-contact-cta">
                  {t.common.contactCta}
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
