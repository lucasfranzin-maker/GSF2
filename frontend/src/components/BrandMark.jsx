import React from "react";

const GSF_LOGO_PATH = "/gsf-logo.png";

// Official GSF mosaic mark + wordmark, served as a static asset so production
// builds and Vercel can load the same file in header and footer.
export const BrandLockup = ({ compact = false }) => (
  <img
    src={GSF_LOGO_PATH}
    alt="GSF – Grafik Service Franzin – Print Engineering Solutions"
    className="w-auto"
    style={{ height: compact ? 30 : 38 }}
    data-testid="brand-lockup"
  />
);

// Same official mark at a smaller height, for tight spots like the footer brand block.
export const BrandMark = ({ size = 40, className = "" }) => (
  <img
    src={GSF_LOGO_PATH}
    alt="GSF – Grafik Service Franzin"
    className={`w-auto ${className}`}
    style={{ height: size }}
  />
);
