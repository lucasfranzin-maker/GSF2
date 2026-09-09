import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BrandLockup } from "@/components/BrandMark";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";

export const Header = () => {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrollState, setScrollState] = useState({ scrolled: false, progress: 0 });

  useEffect(() => {
    let frame;
    const updateScrollState = () => {
      frame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
        setScrollState({ scrolled: window.scrollY > 8, progress });
      });
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { to: "/standorte", label: t.nav.standorte },
    { to: "/tesa", label: t.nav.tesa },
    { to: "/sortiment", label: t.nav.sortiment },
    { to: "/projekte", label: t.nav.projekte },
    { to: "/ueber-gsf", label: t.nav.ueber },
    { to: "/kontakt", label: t.nav.kontakt },
  ];

  const navClass = ({ isActive }) =>
    `relative font-head uppercase text-[12px] xl:text-[13px] tracking-[0.04em] font-semibold transition-colors duration-150 py-1 ${isActive ? "gsf-nav-active" : ""}`;

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{
        borderBottom: "1px solid var(--gsf-border)",
        boxShadow: scrollState.scrolled ? "0 4px 18px rgba(11,27,51,0.06)" : "none",
      }}
      data-testid="site-header"
    >
      <div className="gsf-container flex items-center justify-between h-16 lg:h-20">
        <Link to="/" aria-label="GSF – Startseite" data-testid="brand-home-link" className="shrink-0">
          <BrandLockup />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" data-testid="site-nav" aria-label="Hauptnavigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={navClass}
              style={({ isActive }) => ({ color: isActive ? "var(--gsf-blue)" : "var(--gsf-ink)" })}
              data-testid={`nav-${l.to.replace("/", "")}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 xl:gap-5">
          <LanguageToggle />
          <span className="gsf-dashed-v h-6" />
          <Link to="/kontakt" className="gsf-btn-primary !min-h-0 !py-2.5 !px-4 text-[12px]" data-testid="header-contact-cta">
            {t.common.contactCta}
            <ArrowRight size={15} strokeWidth={2} className="gsf-arrow" />
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Menü öffnen"
                aria-expanded={open}
                data-testid="mobile-nav-open-button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[8px] border p-2.5 transition-colors hover:bg-[color:var(--gsf-surface-2)]"
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
                {links.map((l, index) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between font-head uppercase text-base tracking-[0.035em] font-semibold py-4"
                    style={({ isActive }) => ({
                      color: isActive ? "var(--gsf-blue)" : "var(--gsf-ink)",
                      borderBottom: "1px solid var(--gsf-border)",
                    })}
                    data-testid={`mobile-nav-${l.to.replace("/", "")}`}
                  >
                    <span>{l.label}</span>
                    <span className="font-mono-tech text-[10px] text-[color:var(--gsf-muted)] group-hover:text-[color:var(--gsf-blue)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </NavLink>
                ))}
              </nav>
              <div className="px-5 pt-4">
                <Link to="/kontakt" onClick={() => setOpen(false)} className="gsf-btn-primary w-full" data-testid="mobile-header-contact-cta">
                  {t.common.contactCta}
                  <ArrowRight size={16} strokeWidth={2} className="gsf-arrow" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <span
        className="gsf-scroll-progress w-full"
        style={{ transform: `scaleX(${scrollState.progress})` }}
        aria-hidden="true"
      />
    </header>
  );
};
