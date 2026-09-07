import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { RouteMap } from "@/components/RouteMap";
import { DashedRule } from "@/components/DashedRule";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";

export default function Standorte() {
  const { t } = useLang();
  const p = t.pages.standorte;
  return (
    <>
      <PageHeader label={p.label} icon={MapPin} headline={p.headline} intro={p.intro} />

      <section className="gsf-section">
        <div className="gsf-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.cards.map((c, i) => (
              <Reveal key={c.city} delay={i * 0.05}>
                <div className="gsf-panel h-full flex flex-col hover:border-[color:var(--gsf-ink)]" data-testid={`location-card-${i}`}>
                  <div className="flex items-center justify-between">
                    <MapPin size={20} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                    <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--gsf-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="gsf-h3 mt-5">{c.city}</h3>
                  <div className="font-mono-tech text-xs mt-1.5" style={{ color: "var(--gsf-blue)" }}>{c.role}</div>
                  <p className="gsf-body mt-4 text-sm flex-1">{c.desc}</p>
                  <DashedRule className="my-4" />
                  <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--gsf-ink-2)" }}>
                    <span className="gsf-body text-[13px] leading-snug">{c.address}</span>
                    <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-[color:var(--gsf-blue)] transition-colors"><Phone size={14} strokeWidth={1.6} />{c.phone}</a>
                    <a href={`mailto:${LOCATIONS_CONTACT.emailSales}`} className="flex items-center gap-2 hover:text-[color:var(--gsf-blue)] transition-colors"><Mail size={14} strokeWidth={1.6} />{LOCATIONS_CONTACT.emailSales}</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-5">
            <div className="gsf-panel !p-8 lg:sticky lg:top-28">
              <div className="gsf-kicker mb-6">{t.common.germany} ↔ {t.common.southAfrica}</div>
              <RouteMap className="w-full max-w-[380px] mx-auto" labels={{ germany: t.common.germany, southAfrica: t.common.southAfrica }} compact />
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
