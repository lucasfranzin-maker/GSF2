import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DashedRule } from "@/components/DashedRule";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";

export const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const navLinks = [
    { to: "/ueber-gsf", label: t.nav.ueber },
    { to: "/standorte", label: t.nav.standorte },
    { to: "/tesa", label: t.nav.tesa },
    { to: "/sortiment", label: t.nav.sortiment },
    { to: "/kontakt", label: t.nav.kontakt },
  ];
  const cities = ["Cape Town", "Durban", "Johannesburg", "Hamburg"];

  return (
    <footer className="bg-white" style={{ borderTop: "1px solid var(--gsf-border)" }} data-testid="site-footer">
      <div className="gsf-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <BrandMark size={38} />
              <div className="leading-tight">
                <div className="font-head font-bold text-lg" style={{ color: "var(--gsf-ink)" }}>GSF – Grafik Service Franzin</div>
                <div className="font-mono-tech uppercase text-[10px] tracking-[0.2em]" style={{ color: "var(--gsf-muted)" }}>Print Engineering Solutions</div>
              </div>
            </div>
            <p className="gsf-body mt-5 max-w-sm">
              {t.tesa.badge}.
            </p>
            <div className="mt-6 flex flex-col gap-1 font-mono-tech text-xs" style={{ color: "var(--gsf-muted)" }}>
              <a href={`mailto:${LOCATIONS_CONTACT.emailInfo}`} className="hover:text-[color:var(--gsf-blue)] transition-colors" data-testid="footer-email-info">{LOCATIONS_CONTACT.emailInfo}</a>
              <a href={`tel:${LOCATIONS_CONTACT.phoneCapeTown.replace(/[^+\d]/g, "")}`} className="hover:text-[color:var(--gsf-blue)] transition-colors" data-testid="footer-phone">{LOCATIONS_CONTACT.phoneCapeTown}</a>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <div className="gsf-kicker mb-4">{t.footer.nav}</div>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-head uppercase text-sm tracking-[0.05em] transition-colors duration-150 hover:text-[color:var(--gsf-blue)]" style={{ color: "var(--gsf-ink-2)" }} data-testid={`footer-nav-${l.to.replace("/", "")}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="md:col-span-4">
            <div className="gsf-kicker mb-4">{t.footer.locations}</div>
            <ul className="flex flex-col gap-2.5">
              {cities.map((c) => (
                <li key={c} className="flex items-center gap-2 gsf-body">
                  <MapPin size={15} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DashedRule className="my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono-tech text-xs" style={{ color: "var(--gsf-muted)" }}>
            © {year} GSF – Grafik Service Franzin. {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="font-mono-tech text-xs uppercase tracking-[0.12em] hover:text-[color:var(--gsf-blue)] transition-colors" style={{ color: "var(--gsf-muted)" }} data-testid="footer-imprint">{t.footer.imprint}</Link>
            <Link to="/datenschutz" className="font-mono-tech text-xs uppercase tracking-[0.12em] hover:text-[color:var(--gsf-blue)] transition-colors" style={{ color: "var(--gsf-muted)" }} data-testid="footer-privacy">{t.footer.privacy}</Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};
