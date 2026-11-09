import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Ship, ShieldCheck, Layers, Headset, Handshake } from "lucide-react";
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
  const [activePhoto, setActivePhoto] = useState(0);
  const changePhoto = (step) => setActivePhoto((index) => (index + step + project.items.length) % project.items.length);

  return (
    <div className="gsf-classic-home">
      <section className="gsf-classic-intro" data-testid="home-hero">
        <div className="gsf-classic-company">
          <span className="gsf-kicker">PRINT ENGINEERING SOLUTIONS</span>
          <h1>GRAFIK SERVICE FRANZIN <span>(Pty) Ltd.</span></h1>
          <p>Cape Town <span>·</span> Durban <span>·</span> Johannesburg <span>·</span> Hamburg</p>
        </div>
        <div className="gsf-classic-gallery" role="region" aria-roledescription="carousel"
          aria-label={lang === "de" ? "Einblicke in unsere Projekte" : "Our projects in pictures"}>
          <div className="gsf-classic-stage">
            {project.items.map((item, index) => {
              let offset = (index - activePhoto + project.items.length) % project.items.length;
              if (offset > project.items.length / 2) offset -= project.items.length;
              return (
                <button key={index} type="button" className="gsf-classic-slide" data-offset={offset}
                  hidden={Math.abs(offset) > 2} tabIndex={offset === 0 ? 0 : -1}
                  aria-label={`${lang === "de" ? "Bild" : "Photo"} ${index + 1}: ${item.title}`}
                  aria-current={offset === 0 ? "true" : undefined} onClick={() => setActivePhoto(index)}>
                  <img src={`/projects/gsf-project-${index + 1}.webp`} width="800" height="533" alt={item.alt}
                    loading={index < 3 ? "eager" : "lazy"} />
                </button>
              );
            })}
          </div>
          <div className="gsf-classic-gallery-controls">
            <button type="button" onClick={() => changePhoto(-1)} aria-label={lang === "de" ? "Vorheriges Bild" : "Previous photo"}><ArrowLeft size={18} /></button>
            <p aria-live="polite" aria-atomic="true"><span>{String(activePhoto + 1).padStart(2, "0")} / {String(project.items.length).padStart(2, "0")}</span>{project.items[activePhoto].title}</p>
            <button type="button" onClick={() => changePhoto(1)} aria-label={lang === "de" ? "Nächstes Bild" : "Next photo"}><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="gsf-classic-welcome">
          <h2>{t.hero.headline.join(" ")}</h2>
          <p>{t.hero.lead}</p><p>{t.hero.sub}</p>
          <div className="gsf-classic-actions">
            <Link to="/kontakt" className="gsf-btn-primary" data-testid="hero-contact-cta">{t.common.contactCta}<ArrowRight size={16} /></Link>
            <Link to="/standorte" className="gsf-link" data-testid="hero-locations-link">{t.common.toLocations}<ArrowRight size={16} /></Link>
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
    </div>
  );
}
