import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Ship, ShieldCheck, Layers, Headset, Handshake } from "lucide-react";
import { PROJECTS_CONTENT } from "@/content/projects";
import { SectionLabel } from "@/components/SectionLabel";
import { DashedRule } from "@/components/DashedRule";
import { Reveal } from "@/components/Reveal";
import { PartnerLogoGrid, TesaLogo } from "@/components/PartnerLogos";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const STRENGTH_ICONS = [Ship, ShieldCheck, Layers, Headset];

export default function Home() {
  const { t, lang } = useLang();
  useDocumentMeta({ description: t.hero.lead, path: "/" });

  const project = PROJECTS_CONTENT[lang] || PROJECTS_CONTENT.de;

  return (
    <>
      {/* HERO */}
      <section className="gsf-premium-hero" data-testid="home-hero">
        <div className="gsf-container">
          <SectionLabel label={t.hero.label} />
          <div className="gsf-hero-grid mt-8 grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-8 items-start">
            {/* Left: copy */}
            <div className="gsf-hero-copy xl:col-span-6">
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

            <Reveal className="xl:col-span-6 gsf-production-visual" delay={0.1}>
              <Link to="/projekte" className="gsf-production-link">
                <img src="/projects/gsf-project-1.webp" width="800" height="533"
                  alt={project.items[0].alt} fetchPriority="high" className="gsf-production-image" />
                <div className="gsf-production-caption">
                  <span><span className="gsf-production-eyebrow">GSF / PRINT ENGINEERING</span>
                    <strong>{lang === "de" ? "Präzision. In der Praxis." : "Precision. In practice."}</strong></span>
                  <ArrowRight size={24} aria-hidden="true" />
                </div>
              </Link>
              <div className="gsf-production-footnote">
                <span>{t.common.germany} ↔ {t.common.southAfrica}</span>
                <span>tesa Alliance Partner</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="gsf-container"><DashedRule /></div>

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
                  <Link
                    to="/standorte"
                    className="gsf-panel gsf-card-interactive h-full block"
                    data-testid={`location-chip-${i}`}
                    aria-label={`${item.city}: ${item.role}`}
                  >
                    <div className="flex items-start justify-between">
                      <MapPin size={20} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                      <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--gsf-muted)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 mt-5">
                      <div>
                        <div className="gsf-h3">{item.city}</div>
                        <div className="font-mono-tech text-xs mt-1.5" style={{ color: "var(--gsf-muted)" }}>{item.role}</div>
                      </div>
                      <ArrowRight size={17} strokeWidth={1.8} className="gsf-arrow shrink-0" style={{ color: "var(--gsf-blue)" }} />
                    </div>
                  </Link>
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
      <section className="gsf-section gsf-premium-tesa" data-testid="home-tesa">
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
                <Link
                  to="/sortiment"
                  className="gsf-card-interactive bg-white p-8 h-full flex flex-col"
                  data-testid={`sortiment-item-${i}`}
                  aria-label={item.title}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono-tech text-xs" style={{ color: "var(--gsf-blue)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <ArrowRight size={17} strokeWidth={1.8} className="gsf-arrow" style={{ color: "var(--gsf-blue)" }} />
                  </div>
                  <h3 className="gsf-h3 mt-4">{item.title}</h3>
                  <p className="gsf-body mt-3 max-w-md">{item.text}</p>
                </Link>
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

      <section className="gsf-section gsf-project-preview" aria-labelledby="project-preview-title">
        <div className="gsf-container">
          <SectionLabel label={project.label} />
          <div className="gsf-project-heading">
            <h2 id="project-preview-title" className="gsf-h2">{lang === "de" ? "Technik, die weiterbringt." : "Engineering that moves you forward."}</h2>
            <Link to="/projekte" className="gsf-link">{lang === "de" ? "Alle Projekte" : "All projects"} <ArrowRight size={18} /></Link>
          </div>
          <div className="gsf-project-grid">
            {[0, 2, 3].map((index) => (
              <Reveal key={index}>
                <Link to="/projekte" className="gsf-project-tile">
                  <div className="gsf-project-photo"><img src={`/projects/gsf-project-${index + 1}.webp`} width="800" height="533" loading="lazy" alt={project.items[index].alt} /></div>
                  <span className="gsf-kicker">{project.items[index].category}</span>
                  <h3 className="gsf-h3">{project.items[index].title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 PARTNER */}
      <section className="gsf-section" data-testid="home-partners">
        <div className="gsf-container">
          <SectionLabel icon={Handshake} label={t.partners.label} />
          <Reveal className="mt-10">
            <h2 className="gsf-h2 max-w-3xl">
              {t.partners.headline.map((l, i) => <span key={i} className="block">{l}</span>)}
            </h2>
            <p className="gsf-body mt-5 max-w-2xl">{t.partners.text}</p>
          </Reveal>
          <div className="gsf-kicker mt-10 mb-4">{t.partners.barLabel}</div>
          <Reveal delay={0.08}>
            <PartnerLogoGrid note={lang === "de" ? "in Südafrika – exklusiv bei GSF" : "in South Africa – exclusive at GSF"} />
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
