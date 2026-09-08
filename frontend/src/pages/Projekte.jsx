import React from "react";
import { Briefcase, Palette, Layers, Truck, Factory, Leaf, MapPin, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const ICONS = [Palette, Layers, Truck, Factory, Leaf, MapPin];

export default function Projekte() {
  const { t } = useLang();
  const p = t.pages.projekte;

  return (
    <>
      <PageHeader label={p.label} icon={Briefcase} headline={p.headline} intro={p.intro} />

      {p.note ? (
        <div className="gsf-container">
          <div
            className="mt-2 mb-2 flex items-start gap-3 rounded-[8px] border p-4 text-sm"
            style={{ borderColor: "var(--gsf-border)", background: "var(--gsf-surface-2)", color: "var(--gsf-muted)" }}
            data-testid="projekte-placeholder-note"
          >
            <Info size={16} strokeWidth={1.6} className="mt-0.5 shrink-0" style={{ color: "var(--gsf-blue)" }} />
            <span>{p.note}</span>
          </div>
        </div>
      ) : null}

      <section className="gsf-section pt-8">
        <div className="gsf-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--gsf-border)" }}>
            {p.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="bg-white p-7 h-full flex flex-col" data-testid={`project-card-${i}`}>
                    <div className="flex items-center justify-between">
                      <Icon size={24} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded" style={{ color: "var(--gsf-blue)", background: "rgba(11,95,255,0.08)" }}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="gsf-h3 mt-5 text-base">{item.title}</h3>
                    <p className="gsf-body mt-3 text-sm">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
