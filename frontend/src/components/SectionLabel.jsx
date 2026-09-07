import React from "react";
import { DashedRule } from "@/components/DashedRule";

// Technical section label like "02 / STANDORTE" with optional icon + trailing dashed rule.
export const SectionLabel = ({ icon: Icon, label, withRule = true, className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`} data-testid="section-label">
    {Icon ? (
      <Icon size={16} strokeWidth={1.5} style={{ color: "var(--gsf-blue)" }} aria-hidden="true" />
    ) : null}
    <span className="gsf-kicker whitespace-nowrap">{label}</span>
    {withRule ? <DashedRule className="flex-1" /> : null}
  </div>
);
