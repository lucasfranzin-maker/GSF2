import React from "react";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DashedRule } from "@/components/DashedRule";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { RouteMap } from "@/components/RouteMap";
import { useLang } from "@/i18n/LanguageContext";

export default function UeberGsf() {
  const { t } = useLang();
  const p = t.pages.ueber;
  return (
    <>
      <PageHeader label={p.label} icon={Info} headline={p.headline} intro={p.intro} />

      <section className="gsf-section">
        <div className="gsf-container grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="gsf-kicker">{p.focusLabel}</div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "var(--gsf-border)" }}>
              {p.focus.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.04}>
                  <div className="bg-white p-6 h-full">
                    <span className="font-mono-tech text-xs" style={{ color: "var(--gsf-blue)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="gsf-h3 mt-3 text-base">{f.title}</h3>
                    <p className="gsf-body mt-2 text-sm">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="gsf-panel !p-8">
              <RouteMap className="w-full max-w-[360px] mx-auto" labels={{ germany: t.common.germany, southAfrica: t.common.southAfrica }} compact />
            </div>
            <Reveal delay={0.1}>
              <blockquote className="mt-8 font-head uppercase text-xl sm:text-2xl leading-snug" style={{ color: "var(--gsf-ink)" }}>
                <span style={{ color: "var(--gsf-blue)" }}>&ldquo;</span>{p.quote}<span style={{ color: "var(--gsf-blue)" }}>&rdquo;</span>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="gsf-container"><DashedRule /></div>
      <ContactCTA />
    </>
  );
}
