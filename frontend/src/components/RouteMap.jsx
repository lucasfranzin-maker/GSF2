import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Abstract, stylized Europe/Africa map with a dashed supply-chain route
// from Germany down to South Africa. Pure SVG, no photos, no gradients.

const ROUTE_D = "M352,150 C452,235 470,360 402,470 C372,518 330,548 300,556";

export const RouteMap = ({ className = "", labels = { germany: "Deutschland", southAfrica: "Südafrika" }, compact = false }) => {
  const reduce = useReducedMotion();

  const draw = {
    hidden: { pathLength: 0, opacity: 0.2 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2.2, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const INK = "#0B1B33";
  const LAND = "#E4E9EF";
  const LAND_LINE = "#D2DAE3";
  const BLUE = "#0B5FFF";
  const MUTED = "#6B7787";

  return (
    <div className={className} data-testid="hero-route-map">
      <svg
        viewBox="0 0 560 600"
        width="100%"
        height="100%"
        role="img"
        aria-label="Route von Deutschland nach Südafrika"
        style={{ display: "block" }}
      >
        {/* faint globe graticule */}
        <g stroke={LAND_LINE} strokeWidth="1" fill="none" opacity="0.7">
          <ellipse cx="300" cy="300" rx="250" ry="250" strokeDasharray="2 7" />
          <ellipse cx="300" cy="300" rx="185" ry="250" strokeDasharray="2 7" />
          <ellipse cx="300" cy="300" rx="110" ry="250" strokeDasharray="2 7" />
          <line x1="300" y1="55" x2="300" y2="545" strokeDasharray="2 7" />
          <line x1="55" y1="300" x2="545" y2="300" strokeDasharray="2 7" />
        </g>

        {/* Europe (abstract cluster) */}
        <g fill={LAND} stroke={LAND_LINE} strokeWidth="1.5">
          <path d="M300,95 L332,84 L372,92 L404,80 L430,96 L438,120 L420,138 L392,132 L372,150 L344,146 L322,158 L306,140 L292,120 Z" />
          <circle cx="452" cy="150" r="9" />
          <circle cx="288" cy="150" r="7" />
        </g>

        {/* Africa (abstract silhouette) */}
        <path
          fill={LAND}
          stroke={LAND_LINE}
          strokeWidth="1.5"
          d="M250,190 L300,178 L352,186 L392,180 L410,206 L398,250 L410,300 L392,352 L372,404 L352,452 L332,500 L308,548 L292,556 L280,520 L262,470 L250,430 L232,392 L226,344 L232,296 L226,250 L232,214 Z"
        />

        {/* route */}
        {reduce ? (
          <path d={ROUTE_D} fill="none" stroke={BLUE} strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
        ) : (
          <motion.path
            data-testid="hero-route-path"
            d={ROUTE_D}
            fill="none"
            stroke={BLUE}
            strokeWidth="2.5"
            strokeDasharray="7 7"
            strokeLinecap="round"
            variants={draw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          />
        )}

        {/* travelling marker */}
        {!reduce && (
          <circle
            data-testid="hero-route-marker"
            r="5"
            fill={BLUE}
            className="gsf-route-marker"
            style={{ offsetPath: `path('${ROUTE_D}')`, offsetRotate: "0deg" }}
          />
        )}

        {/* Germany node */}
        <g>
          <circle cx="352" cy="150" r="8" fill={BLUE} />
          <circle cx="352" cy="150" r="8" fill="none" stroke={BLUE} strokeWidth="1.5">
            {!reduce && <animate attributeName="r" values="8;15;8" dur="3s" repeatCount="indefinite" />}
            {!reduce && <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />}
          </circle>
          <text x="368" y="146" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight="500" fill={INK} letterSpacing="1.5">
            {labels.germany.toUpperCase()}
          </text>
        </g>

        {/* South Africa nodes */}
        <g fill={BLUE}>
          <circle cx="350" cy="470" r="4.5" />
          <circle cx="362" cy="512" r="4.5" />
          <circle cx="300" cy="556" r="6" />
        </g>
        <text x="316" y="552" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight="500" fill={INK} letterSpacing="1.5">
          {labels.southAfrica.toUpperCase()}
        </text>

        {/* small mosaic accent squares */}
        {!compact && (
          <g>
            <rect x="150" y="286" width="16" height="16" rx="2" fill="#22C3A6" />
            <rect x="170" y="286" width="16" height="16" rx="2" fill="#FFFFFF" stroke={LAND_LINE} />
            <rect x="150" y="306" width="16" height="16" rx="2" fill="#FFCF3A" />
            <rect x="170" y="306" width="16" height="16" rx="2" fill="#8A6BF0" />
          </g>
        )}
      </svg>

      <style>{`
        .gsf-route-marker {
          animation: gsf-travel 8s linear infinite;
        }
        @keyframes gsf-travel {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gsf-route-marker { animation: none; display: none; }
        }
      `}</style>
    </div>
  );
};
