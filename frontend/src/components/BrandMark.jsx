import React from "react";

// GSF mosaic mark – abstract square cluster in the brand accents (teal/violet/yellow) + ink.
export const BrandMark = ({ size = 40, className = "" }) => {
  const u = size / 5; // unit grid (5x5)
  const sq = (x, y, fill, w = 1, h = 1) => (
    <rect
      key={`${x}-${y}`}
      x={x * u}
      y={y * u}
      width={w * u - u * 0.14}
      height={h * u - u * 0.14}
      rx={u * 0.12}
      fill={fill}
    />
  );
  const INK = "#0B1B33";
  const TEAL = "#22C3A6";
  const VIOLET = "#8A6BF0";
  const YELLOW = "#FFCF3A";
  const BLUE = "#0B5FFF";
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="GSF"
      focusable="false"
    >
      {sq(2, 0, TEAL)}
      {sq(3, 0, INK)}
      {sq(1, 1, VIOLET)}
      {sq(2, 1, INK)}
      {sq(3, 1, YELLOW)}
      {sq(0, 2, INK)}
      {sq(1, 2, TEAL)}
      {sq(2, 2, BLUE)}
      {sq(0, 3, VIOLET)}
      {sq(1, 3, INK)}
      {sq(2, 3, YELLOW)}
      {sq(1, 4, INK)}
    </svg>
  );
};

// Full logo lockup: mark + wordmark + slogan
export const BrandLockup = ({ compact = false }) => {
  return (
    <span className="flex items-center gap-3" data-testid="brand-lockup">
      <BrandMark size={compact ? 34 : 42} />
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline gap-2">
          <span
            className="font-head font-bold tracking-tight"
            style={{ color: "var(--gsf-ink)", fontSize: compact ? 22 : 26, lineHeight: 1 }}
          >
            GSF
          </span>
          <span
            className="font-head font-medium hidden sm:inline"
            style={{ color: "var(--gsf-ink)", fontSize: compact ? 14 : 16 }}
          >
            Grafik Service Franzin
          </span>
        </span>
        <span
          className="font-mono-tech uppercase hidden sm:block"
          style={{ color: "var(--gsf-muted)", fontSize: 9.5, letterSpacing: "0.22em", marginTop: 3 }}
        >
          Print Engineering Solutions
        </span>
      </span>
    </span>
  );
};
