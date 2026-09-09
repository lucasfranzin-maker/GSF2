import React from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

// Standard interior page header with a consistent visual entry point.
export const PageHeader = ({ label, icon, headline = [], intro }) => (
  <section className="gsf-page-header pt-12 md:pt-16 lg:pt-20" data-testid="page-header">
    <div className="gsf-container">
      <SectionLabel icon={icon} label={label} />
      <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <Reveal className="lg:col-span-7">
          <h1 className="gsf-h1">
            {headline.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal className="lg:col-span-5" delay={0.08}>
            <div className="border-l-2 pl-5 md:pl-6" style={{ borderColor: "var(--gsf-blue)" }}>
              <p className="gsf-body max-w-xl">{intro}</p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  </section>
);
