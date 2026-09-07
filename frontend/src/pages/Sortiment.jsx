import React from "react";
import { Layers, Boxes, Factory, Truck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";

const ICONS = [Layers, Boxes, Factory, Truck];

export default function Sortiment() {
  const { t } = useLang();
  const p = t.pages.sortiment;
  const items = t.sortiment.items;
  return (
    <>
      <PageHeader label={p.label} icon={Layers} headline={p.headline} intro={p.intro} />

      <section className="gsf-section">
        <div className="gsf-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--gsf-border)" }}>
            {items.map((item, i) => {
              const Icon = ICONS[i] || Layers;
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="bg-white p-8 md:p-10 h-full flex flex-col" data-testid={`sortiment-page-item-${i}`}>
                    <div className="flex items-center justify-between">
                      <Icon size={28} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                      <span className="font-mono-tech text-sm" style={{ color: "var(--gsf-border)" }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="gsf-h3 mt-6">{item.title}</h3>
                    <p className="gsf-body mt-3 max-w-md">{item.text}</p>
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
