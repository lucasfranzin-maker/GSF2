import React from "react";
import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactCTA } from "@/components/ContactCTA";
import { useLang } from "@/i18n/LanguageContext";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { PROJECTS_CONTENT } from "@/content/projects";

const PROJECT_IMAGES = [
  "/projects/gsf-project-1.webp",
  "/projects/gsf-project-2.webp",
  "/projects/gsf-project-3.webp",
  "/projects/gsf-project-4.webp",
  "/projects/gsf-project-5.webp",
  "/projects/gsf-project-6.webp",
  "/projects/gsf-project-7.webp",
  "/projects/gsf-project-8.webp",
];

export default function Projekte() {
  const { lang } = useLang();
  const p = PROJECTS_CONTENT[lang];
  useDocumentMeta({ title: p.label, description: p.intro, path: "/projekte" });

  return (
    <>
      <PageHeader label={p.label} icon={Briefcase} headline={p.headline} intro={p.intro} />

      <section className="gsf-section pt-10">
        <div className="gsf-container">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="gsf-kicker">{p.galleryLabel}</div>
              <p className="gsf-body mt-2 max-w-2xl">{p.galleryIntro}</p>
            </div>
            <span
              className="font-head text-sm font-semibold uppercase tracking-[0.12em]"
              style={{ color: "var(--gsf-blue)" }}
            >
              {String(p.items.length).padStart(2, "0")} / GSF
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {p.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.05}>
                <article
                  className="group h-full overflow-hidden rounded-[12px] border bg-white"
                  style={{ borderColor: "var(--gsf-border)" }}
                  data-testid={`project-card-${i}`}
                >
                  <figure>
                    <div className="relative aspect-[3/2] overflow-hidden bg-[color:var(--gsf-ink)]">
                      <img
                        src={PROJECT_IMAGES[i]}
                        alt={item.alt}
                        width="800"
                        height="533"
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                        <span className="rounded bg-white/95 px-2.5 py-1 font-head text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--gsf-ink)]">
                          {item.category}
                        </span>
                        <span className="rounded bg-[color:var(--gsf-ink)]/90 px-2.5 py-1 font-head text-[10px] font-semibold tracking-[0.14em] text-white">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <figcaption className="p-5 sm:p-6">
                      <h2 className="gsf-h3 text-base sm:text-lg">{item.title}</h2>
                      <p className="gsf-body mt-3 text-sm">{item.text}</p>
                    </figcaption>
                  </figure>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
