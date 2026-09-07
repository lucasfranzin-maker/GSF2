import React from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

// Standard interior page header.
export const PageHeader = ({ label, icon, headline = [], intro }) => (
  <section className="pt-12 md:pt-16 lg:pt-20" data-testid="page-header">
    <div className="gsf-container">
      <SectionLabel icon={icon} label={label} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <Reveal className="lg:col-span-7">
          <h1 className="gsf-h1">
            {headline.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="gsf-body max-w-xl">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  </section>
);
