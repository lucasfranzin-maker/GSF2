import React from "react";
import { GSF_LOGO_DATA_URI } from "@/assets/gsf-logo";

// Official GSF logo (mosaic mark + wordmark + slogan), used as the site's main logo.
export const BrandLockup = ({ compact = false }) => (
  <img
    src={GSF_LOGO_DATA_URI}
    alt="GSF – Grafik Service Franzin – Print Engineering Solutions"
    className="w-auto"
    style={{ height: compact ? 30 : 38 }}
    data-testid="brand-lockup"
  />
);

// Same logo at a smaller height, for tight spots like the footer brand block.
export const BrandMark = ({ size = 40, className = "" }) => (
  <img
    src={GSF_LOGO_DATA_URI}
    alt="GSF – Grafik Service Franzin"
    className={`w-auto ${className}`}
    style={{ height: size }}
  />
);
