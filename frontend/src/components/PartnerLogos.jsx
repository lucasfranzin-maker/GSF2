import React from "react";

// Stylistic SVG recreations of partner logos (approximations of the real brands,
// to be replaced with official assets later). Kept clean and restrained.

export const TesaLogo = ({ className = "" }) => (
  <svg viewBox="0 0 120 54" className={className} role="img" aria-label="tesa" width="96" height="43">
    <rect x="6" y="10" width="108" height="34" rx="5" fill="#E2001A" />
    <path d="M114 44 L114 30 L100 44 Z" fill="#0A57E0" />
    <text x="18" y="37" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" fill="#FFFFFF">tesa</text>
  </svg>
);

export const EcographLogo = ({ className = "" }) => (
  <svg viewBox="0 0 220 40" className={className} role="img" aria-label="ECOGRAPH" width="170" height="31">
    <g fill="#E2001A">
      <rect x="2" y="15" width="14" height="4" />
      <rect x="7" y="10" width="4" height="14" />
    </g>
    <text x="20" y="28" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="26" fill="#E2001A">ECO</text>
    <text x="96" y="28" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="26" fill="#5B6673">GRAPH</text>
  </svg>
);

export const IsraVisionLogo = ({ className = "" }) => (
  <svg viewBox="0 0 200 60" className={className} role="img" aria-label="ISRA VISION" width="150" height="45">
    <text x="14" y="34" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="32" fill="#111827" letterSpacing="2">ISRA</text>
    <text x="16" y="52" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#E2001A" letterSpacing="8">VISION</text>
  </svg>
);

export const JustNormlichtLogo = ({ className = "" }) => (
  <svg viewBox="0 0 120 70" className={className} role="img" aria-label="JUST Normlicht" width="92" height="54">
    <rect x="6" y="6" width="108" height="58" fill="#111111" />
    <text x="60" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="24" fill="#FFFFFF">JUST</text>
    <text x="60" y="54" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11" fill="#FFFFFF" letterSpacing="2">NORMLICHT</text>
  </svg>
);

export const PARTNERS = [
  { key: "tesa", Logo: TesaLogo, tag: { de: "Alliance Partner", en: "Alliance Partner" } },
  { key: "ecograph", Logo: EcographLogo },
  { key: "isra", Logo: IsraVisionLogo },
  { key: "just", Logo: JustNormlichtLogo },
];

export const PartnerLogoGrid = ({ note = "" }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="partner-logo-grid">
    {PARTNERS.map(({ key, Logo, tag }) => (
      <div
        key={key}
        className="group flex flex-col items-center justify-center gap-2 rounded-[8px] border bg-white px-4 py-8 transition-colors duration-150"
        style={{ borderColor: "var(--gsf-border)" }}
        data-testid={`partner-logo-${key}`}
      >
        <div className="flex items-center justify-center h-12">
          <Logo className="opacity-90 transition-opacity duration-150 group-hover:opacity-100" />
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
