import React from "react";

// Dashed horizontal rule matching the reference thin dashed dividers.
export const DashedRule = ({ className = "" }) => (
  <div className={`gsf-dashed ${className}`} aria-hidden="true" />
);

export const DashedRuleV = ({ className = "" }) => (
  <div className={`gsf-dashed-v ${className}`} aria-hidden="true" />
);
