import React from "react";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { RouteMap } from "@/components/RouteMap";
import { DashedRule } from "@/components/DashedRule";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";
import { LOCATIONS_CONTACT } from "@/i18n/translations";

// Physical addresses that get an embedded map + directions link (Cape Town, Durban).
const MAP_ADDRESSES = {
  0: "4 School Street, Unit 96, Platinum Junction Business Park, Milnerton 7441, Cape Town, South Africa",
  1: "73 Nguni Way Rd, Unit 53, Acacia Business Park, Hillcrest 3610, Durban, South Africa",
};

const embedSrc = (addr) => `https://www.google.com/maps?q=${encodeURIComponent(addr)}&z=14&output=embed`;
const directionsHref = (addr) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`;

export default function Standorte() {
  const { t, lang } = useLang();
  const p = t.pages.standorte;
  const directionsLabel = lang === "de" ? "Route planen" : "Get directions";

  return (
    <>
      <PageHeader label={p.label} icon={MapPin} headline={p.headline} intro={p.intro} />

      <section className="gsf-section">
        <div className="gsf-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.cards.map((c, i) => {
              const mapAddr = MAP_ADDRESSES[i];
              return (
                <Reveal key={c.city} delay={i * 0.05}>
                  <div className="gsf-panel h-full flex flex-col hover:border-[color:var(--gsf-ink)]" data-testid={`location-card-${i}`}>
                    <div className="flex items-center justify-between">
                      <MapPin size={20} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                      <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--gsf-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="gsf-h3 mt-5">{c.city}</h3>
                    <div className="font-mono-tech text-xs mt-1.5" style={{ color: "var(--gsf-blue)" }}>{c.role}</div>
                    <p className="gsf-body mt-4 text-sm">{c.desc}</p>

                    {mapAddr ? (
                      <div className="mt-4 overflow-hidden rounded-[8px] border" style={{ borderColor: "var(--gsf-border)" }}>
                        <iframe
                          title={`Karte ${c.city}`}
                          src={embedSrc(mapAddr)}
                          className="w-full block"
                          style={{ height: 170, border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          data-testid={`location-map-${i}`}
                        />
                      </div>
                    ) : null}

                    <DashedRule className="my-4" />
                    <div className="flex flex-col gap-2 text-sm flex-1" style={{ color: "var(--gsf-ink-2)" }}>
                      <span className="gsf-body text-[13px] leading-snug">{c.address}</span>
                      <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-[color:var(--gsf-blue)] transition-colors"><Phone size={14} strokeWidth={1.6} />{c.phone}</a>
                      <a href={`mailto:${LOCATIONS_CONTACT.emailSales}`} className="flex items-center gap-2 hover:text-[color:var(--gsf-blue)] transition-colors"><Mail size={14} strokeWidth={1.6} />{LOCATIONS_CONTACT.emailSales}</a>
                    </div>

                    {mapAddr ? (
                      <a
                        href={directionsHref(mapAddr)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gsf-link mt-4"
                        data-testid={`location-directions-${i}`}
                      >
                        <Navigation size={14} strokeWidth={2} />
                        {directionsLabel}
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
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
