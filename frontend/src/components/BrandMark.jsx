import React from "react";

const GSF_LOGO_PATH = "/gsf-logo.png";

const BrandSignature = ({ compact = false, width, className = "", testId }) => {
  const logoWidth = width ?? (compact ? 96 : 132);
  const primarySize = compact ? 5.5 : 7.5;
  const secondarySize = compact ? 5 : 6.5;

  return (
    <span
      role="img"
      aria-label="GSF – Grafik Service Franzin – Print Engineering Solutions"
      className={`inline-flex shrink-0 flex-col ${className}`}
      style={{ width: logoWidth }}
      data-testid={testId}
    >
      <img
        src={GSF_LOGO_PATH}
        alt=""
        aria-hidden="true"
        className="block h-auto w-full"
      />
      <span
        aria-hidden="true"
        className="mt-[3px] whitespace-nowrap text-center font-head font-bold uppercase leading-none"
        style={{ fontSize: primarySize, letterSpacing: "0.075em" }}
      >
        Grafik Service Franzin
      </span>
      <span
        aria-hidden="true"
        className="mt-[3px] whitespace-nowrap text-center font-head font-medium leading-none"
        style={{ fontSize: secondarySize, letterSpacing: "0.07em" }}
      >
        Print Engineering Solutions
      </span>
    </span>
  );
};

// Complete responsive lockup for the desktop header and compact mobile navigation.
export const BrandLockup = ({ compact = false }) => (
  <BrandSignature compact={compact} testId="brand-lockup" />
);

// Same complete lockup for reusable brand placements such as the footer.
export const BrandMark = ({ size = 132, className = "" }) => (
  <BrandSignature width={size} className={className} />
);
