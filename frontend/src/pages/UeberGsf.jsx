import React from "react";
import { Info, Users } from "lucide-react";
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

      {p.storyParagraphs?.length ? (
        <>
          <div className="gsf-container"><DashedRule /></div>
          <section className="gsf-section">
            <div className="gsf-container grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <div className="gsf-kicker">{p.storyLabel}</div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-5">
                {p.storyParagraphs.map((para, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <p className="gsf-body">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {p.team?.length ? (
        <>
          <div className="gsf-container"><DashedRule /></div>
          <section className="gsf-section">
            <div className="gsf-container">
              <div className="flex items-center gap-3">
                <Users size={22} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} />
                <div className="gsf-kicker !mb-0">{p.teamLabel}</div>
              </div>
              {p.teamIntro ? <p className="gsf-body mt-4 max-w-2xl">{p.teamIntro}</p> : null}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--gsf-border)" }}>
                {p.team.map((member, i) => (
                  <Reveal key={member.role} delay={i * 0.05}>
                    <div className="bg-white p-6 h-full flex flex-col" data-testid={`team-card-${i}`}>
                      <span className="font-mono-tech text-xs" style={{ color: "var(--gsf-blue)" }}>{String(i + 1).padStart(2, "0")}</span>
                      {member.name ? (
                        <>
                          <h3 className="gsf-h3 mt-3 text-base">{member.name}</h3>
                          <div className="font-mono-tech text-xs mt-1" style={{ color: "var(--gsf-muted)" }}>{member.role}</div>
                        </>
                      ) : (
                        <h3 className="gsf-h3 mt-3 text-base">{member.role}</h3>
                      )}
                      <p className="gsf-body mt-3 text-sm">{member.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <div className="gsf-container"><DashedRule /></div>
      <ContactCTA />
    </>
  );
}
