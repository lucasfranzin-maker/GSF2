import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Ship, ShieldCheck, Layers, Headset, Globe, Handshake } from "lucide-react";
import { RouteMap } from "@/components/RouteMap";
import { SectionLabel } from "@/components/SectionLabel";
import { DashedRule } from "@/components/DashedRule";
import { Reveal } from "@/components/Reveal";
import { PartnerLogoGrid, TesaLogo } from "@/components/PartnerLogos";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const STRENGTH_ICONS = [Ship, ShieldCheck, Layers, Headset];

export default function Home() {
  const { t, lang } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="pt-10 md:pt-14 lg:pt-16 pb-4" data-testid="home-hero">
        <div className="gsf-container">
          <SectionLabel label={t.hero.label} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Left: copy */}
            <div className="lg:col-span-6 xl:col-span-6">
              <Reveal>
                <h1 className="gsf-h1">
                  {t.hero.headline.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h1>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="gsf-body mt-7 max-w-xl text-[color:var(--gsf-ink-2)]">{t.hero.lead}</p>
                <p className="gsf-body mt-4 max-w-xl">{t.hero.sub}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
                  <Link to="/kontakt" className="gsf-btn-primary" data-testid="hero-contact-cta">
                    {t.common.contactCta}
                    <ArrowRight size={16} strokeWidth={2} className="gsf-arrow" />
                  </Link>
                  <Link to="/standorte" className="gsf-link" data-testid="hero-locations-link">
                    {t.common.toLocations}
                    <ArrowRight size={15} strokeWidth={2} className="gsf-arrow" />
                  </Link>
                </div>
                <p className="mt-6 font-mono-tech text-xs max-w-xs" style={{ color: "var(--gsf-muted)" }}>
                  {t.hero.ctaNote}
                </p>
              </Reveal>
            </div>

            {/* Right: map + info */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-center">
                <div className="xl:col-span-3">
                  <RouteMap className="w-full max-w-[440px] mx-auto" labels={{ germany: t.common.germany, southAfrica: t.common.southAfrica }} />
                </div>
                <div className="xl:col-span-2 flex flex-col gap-6">
                  <div>
                    <div className="gsf-kicker">{t.hero.panelTitle}</div>
                    <p className="gsf-body mt-2 text-sm">{t.hero.panelSubtitle}</p>
                  </div>
                  <DashedRule />
                  <div className="flex items-start gap-3">
                    <Globe size={18} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} className="mt-0.5 shrink-0" />
                    <p className="gsf-body text-sm">
                      <span className="font-semibold" style={{ color: "var(--gsf-ink)" }}>tesa Alliance</span> {lang === "de" ? "Partner in Südafrika." : "Partner in South Africa."}
                    </p>
                  </div>
                  <DashedRule />
                  <ul className="flex flex-col gap-2.5">
                    {t.hero.pins.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 gsf-body text-sm">
                        <MapPin size={15} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gsf-container"><DashedRule className="mt-8" /></div>

      {/* 02 STANDORTE teaser */}
      <section className="gsf-section" data-testid="home-locations">
        <div className="gsf-container">
          <SectionLabel icon={MapPin} label={t.locations.label} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className="gsf-h2">
                {t.locations.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
              </h2>
              <p className="gsf-body mt-5 max-w-md">{t.locations.text}</p>
              <Link to="/standorte" className="gsf-link mt-7" data-testid="locations-more-link">
                {lang === "de" ? "Zu den Standorten" : "To the locations"}
                <ArrowRight size={15} strokeWidth={2} className="gsf-arrow" />
              </Link>
            </Reveal>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.locations.items.map((item, i) => (
                <Reveal key={item.city} delay={i * 0.06}>
                  <div className="gsf-panel h-full hover:border-[color:var(--gsf-ink)]" data-testid={`location-chip-${i}`}>
                    <div className="flex items-start justify-between">
                      <MapPin size={20} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                      <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--gsf-muted)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="gsf-h3 mt-5">{item.city}</div>
                    <div className="font-mono-tech text-xs mt-1.5" style={{ color: "var(--gsf-muted)" }}>{item.role}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gsf-container"><DashedRule /></div>

      {/* 03 UNSERE STÄRKEN */}
      <section className="gsf-section" data-testid="home-strengths">
        <div className="gsf-container">
          <SectionLabel label={t.strengths.label} />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {t.strengths.items.map((item, i) => {
              const Icon = STRENGTH_ICONS[i] || Ship;
              return (
                <Reveal key={item.no} delay={i * 0.06}>
                  <div className="group" data-testid={`strength-${item.no}`}>
                    <div className="flex items-center justify-between">
                      <Icon size={26} strokeWidth={1.5} style={{ color: "var(--gsf-ink)" }} className="transition-colors duration-150 group-hover:text-[color:var(--gsf-blue)]" />
                      <span className="font-mono-tech text-sm" style={{ color: "var(--gsf-border)" }}>{item.no}</span>
                    </div>
                    <div className="mt-5 h-px w-full" style={{ background: "var(--gsf-border)" }} />
                    <h3 className="gsf-h3 mt-5 text-base">{item.title}</h3>
                    <p className="gsf-body mt-3 text-sm">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 TESA */}
      <section className="gsf-section" style={{ background: "var(--gsf-surface-2)" }} data-testid="home-tesa">
        <div className="gsf-container">
          <SectionLabel label={t.tesa.label} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <h2 className="gsf-h2">
                {t.tesa.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
              </h2>
              <p className="gsf-body mt-5 max-w-xl">{t.tesa.text}</p>
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-5">
                <Link to="/tesa" className="gsf-btn-secondary" data-testid="tesa-more-link">
                  {t.common.moreTesa}
                  <ArrowRight size={15} strokeWidth={2} className="gsf-arrow" />
                </Link>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="gsf-panel !p-8 flex flex-col items-center text-center gap-5">
                <TesaLogo height={54} />
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "rgba(11,95,255,0.08)" }}>
                  <ShieldCheck size={16} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} />
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--gsf-blue)" }}>
                    {t.tesa.badge}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 SORTIMENT */}
      <section className="gsf-section" data-testid="home-sortiment">
        <div className="gsf-container">
          <SectionLabel icon={Layers} label={t.sortiment.label} />
          <Reveal>
            <h2 className="gsf-h2 mt-10 max-w-3xl">
              {t.sortiment.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--gsf-border)" }}>
            {t.sortiment.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="bg-white p-8 h-full flex flex-col" data-testid={`sortiment-item-${i}`}>
                  <span className="font-mono-tech text-xs" style={{ color: "var(--gsf-blue)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="gsf-h3 mt-4">{item.title}</h3>
                  <p className="gsf-body mt-3 max-w-md">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link to="/sortiment" className="gsf-link mt-8" data-testid="sortiment-more-link">
            {lang === "de" ? "Zum Sortiment" : "To the range"}
            <ArrowRight size={15} strokeWidth={2} className="gsf-arrow" />
          </Link>
        </div>
      </section>

      <div className="gsf-container"><DashedRule /></div>

      {/* 06 PARTNER */}
      <section className="gsf-section" data-testid="home-partners">
        <div className="gsf-container">
          <SectionLabel icon={Handshake} label={t.partners.label} />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-5">
              <h2 className="gsf-h2">
                {t.partners.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
              </h2>
              <p className="gsf-body mt-5 max-w-md">{t.partners.text}</p>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="gsf-kicker mb-4">{t.partners.barLabel}</div>
              <PartnerLogoGrid note={lang === "de" ? "in Südafrika – exklusiv bei GSF" : "in South Africa – exclusive at GSF"} />
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
