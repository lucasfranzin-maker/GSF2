import React from "react";

// Official partner assets. The files intentionally keep their original brand colors.
export const PARTNERS = [
  { key: "tesa", name: "tesa", file: "/partners/tesa.png" },
  { key: "ecograph", name: "ECOGRAPH", file: "/partners/ecograph.png" },
  { key: "isra", name: "ISRA VISION", file: "/partners/isra-vision.png" },
  { key: "just", name: "JUST Normlicht", file: "/partners/just-normlicht.png" },
];

const SUPPORTING_PARTNERS = PARTNERS.filter(({ key }) => key !== "tesa");
const LOGO_SIZE = {
  ecograph: "max-h-10 sm:max-h-12 max-w-[230px]",
  isra: "max-h-16 sm:max-h-20 max-w-[180px]",
  just: "max-h-16 sm:max-h-20 max-w-[180px]",
};

// Reusable official tesa logo, used in the featured partner area and tesa page.
export const TesaLogo = ({ className = "", height = 48 }) => (
  <img
    src="/partners/tesa.png"
    alt="tesa"
    height={height}
    style={{ height }}
    className={`w-auto object-contain ${className}`}
  />
);

export const PartnerLogoGrid = ({ note = "" }) => (
  <div className="flex flex-col gap-4" data-testid="partner-logo-grid">
    <div
      className="grid grid-cols-1 md:grid-cols-12 items-center gap-7 rounded-[12px] border bg-white px-7 py-9 md:px-10 md:py-11"
      style={{ borderColor: "var(--gsf-ink)" }}
      data-testid="partner-logo-tesa"
    >
      <div className="md:col-span-7 flex items-center justify-center md:justify-start min-h-24">
        <TesaLogo className="max-w-full" height={94} />
      </div>
      <div className="md:col-span-5 md:border-l md:pl-8" style={{ borderColor: "var(--gsf-border)" }}>
        <div className="font-head text-lg font-bold uppercase tracking-[-0.01em]" style={{ color: "var(--gsf-ink)" }}>
          tesa Alliance Partner
        </div>
        {note ? (
          <p className="font-mono-tech mt-2 text-[11px] uppercase tracking-[0.14em] leading-relaxed" style={{ color: "var(--gsf-muted)" }}>
            {note}
          </p>
        ) : null}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SUPPORTING_PARTNERS.map(({ key, name, file }) => (
        <div
          key={key}
          className="group flex min-h-40 items-center justify-center rounded-[12px] border bg-white px-7 py-8 transition-colors duration-150 hover:border-[color:var(--gsf-blue)]"
          style={{ borderColor: "var(--gsf-border)" }}
          data-testid={`partner-logo-${key}`}
        >
          <img
            src={file}
            alt={name}
            className={`h-auto w-auto object-contain opacity-90 transition-opacity duration-150 group-hover:opacity-100 ${LOGO_SIZE[key]}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);
