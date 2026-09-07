import React from "react";

// Partner logos are loaded from /public/partners/*.svg so they are fully swappable:
// replace the file with the official asset (same filename) and it updates everywhere.
// See /public/partners/README.md.

export const PARTNERS = [
  { key: "tesa", name: "tesa", file: "/partners/tesa.svg" },
  { key: "ecograph", name: "ECOGRAPH", file: "/partners/ecograph.svg" },
  { key: "isra", name: "ISRA VISION", file: "/partners/isra-vision.svg" },
  { key: "just", name: "JUST Normlicht", file: "/partners/just-normlicht.svg" },
];

// Reusable single logo (used in tesa section/page too) -> stays swappable.
export const TesaLogo = ({ className = "", height = 48 }) => (
  <img src="/partners/tesa.svg" alt="tesa" height={height} style={{ height }} className={className} />
);

export const PartnerLogoGrid = ({ note = "" }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="partner-logo-grid">
    {PARTNERS.map(({ key, name, file }) => (
      <div
        key={key}
        className="group flex flex-col items-center justify-center gap-2 rounded-[8px] border bg-white px-4 py-8 transition-colors duration-150 hover:border-[color:var(--gsf-ink)]"
        style={{ borderColor: "var(--gsf-border)" }}
        data-testid={`partner-logo-${key}`}
      >
        <div className="flex items-center justify-center h-12">
          <img
            src={file}
            alt={name}
            className="max-h-12 w-auto opacity-90 transition-opacity duration-150 group-hover:opacity-100"
            loading="lazy"
          />
        </div>
        {key === "tesa" && note ? (
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-center" style={{ color: "var(--gsf-muted)" }}>
            {note}
          </span>
        ) : null}
      </div>
    ))}
  </div>
);
