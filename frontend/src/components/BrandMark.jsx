import React from "react";

// Preserve the supplied artwork; the viewport includes only the GSF lockup.
const BrandSignature = ({ compact = false, width, className = "", testId }) => (
  <svg role="img" aria-label="GSF – Grafik Service Franzin – Print Engineering Solutions"
    viewBox="130 75 580 305"
    width={width ?? (compact ? 108 : 132)}
    height={(width ?? (compact ? 108 : 132)) * 305 / 580}
    className={`block shrink-0 max-w-full ${className}`} data-testid={testId}>
    <image href="/gsf-brand-source.jpg" width="2048" height="682" />
  </svg>
);

export const BrandLockup = ({ compact = false }) => (
  <BrandSignature compact={compact} testId="brand-lockup" />
);
export const BrandMark = ({ size = 132, className = "" }) => (
  <BrandSignature width={size} className={className} />
);
