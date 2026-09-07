import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Layers, Boxes, Truck, Wrench } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { DashedRule } from "@/components/DashedRule";
import { useLang } from "@/i18n/LanguageContext";

const APP_ICONS = [Layers, Wrench, ShieldCheck, Truck];

export default function Tesa() {
  const { t } = useLang();
  const p = t.pages.tesa;
  return (
    <>
      <PageHeader label={p.label} icon={ShieldCheck} headline={p.headline} intro={p.intro} />

      <section className="pt-4">
        <div className="gsf-container">
          <Reveal>
            <div className="gsf-panel !p-8 md:!p-10 flex flex-col sm:flex-row items-center gap-8" style={{ background: "var(--gsf-surface-2)" }}>
              <svg viewBox="0 0 120 54" width="120" height="54" role="img" aria-label="tesa" className="shrink-0">
                <rect x="6" y="10" width="108" height="34" rx="5" fill="#E2001A" />
                <path d="M114 44 L114 30 L100 44 Z" fill="#0A57E0" />
                <text x="18" y="37" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" fill="#FFFFFF">tesa</text>
              </svg>
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} strokeWidth={1.6} style={{ color: "var(--gsf-blue)" }} />
                <span className="font-head uppercase text-lg sm:text-xl tracking-wide" style={{ color: "var(--gsf-ink)" }}>{t.tesa.badge}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="gsf-section">
        <div className="gsf-container">
          <div className="gsf-kicker">{p.applicationsLabel}</div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.applications.map((a, i) => {
              const Icon = APP_ICONS[i] || Boxes;
              return (
                <Reveal key={a.title} delay={i * 0.05}>
                  <div className="gsf-panel h-full hover:border-[color:var(--gsf-ink)]" data-testid={`tesa-application-${i}`}>
                    <Icon size={24} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                    <h3 className="gsf-h3 mt-5 text-base">{a.title}</h3>
                    <p className="gsf-body mt-3 text-sm">{a.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gsf-container"><DashedRule /></div>

      <section className="gsf-section">
        <div className="gsf-container">
          <div className="gsf-panel !p-8 md:!p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="gsf-h2">{p.ctaTitle}</h2>
              <p className="gsf-body mt-4">{p.ctaText}</p>
            </div>
            <Link to="/kontakt" className="gsf-btn-primary shrink-0" data-testid="tesa-contact-cta">
              {t.common.requestCta}
              <ArrowRight size={16} strokeWidth={2} className="gsf-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
