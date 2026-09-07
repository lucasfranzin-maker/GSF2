import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

// Accurate, stylized Europe/Africa map with a dashed supply-chain route
// from Germany down to South Africa. Real geography via d3-geo (topojson).

const W = 560;
const H = 640;
const PAD = 28;

// Framed region: Europe (north) down to South Africa (south)
const REGION = { type: "MultiPoint", coordinates: [[-22, 61], [52, -37]] };

const CITIES = {
  germany: { coords: [9.99, 53.55], label: "DEUTSCHLAND" },
  capeTown: { coords: [18.42, -33.92] },
  durban: { coords: [31.02, -29.86] },
  johannesburg: { coords: [28.05, -26.2] },
};

export const RouteMap = ({ className = "", labels = { germany: "Deutschland", southAfrica: "Südafrika" }, compact = false }) => {
  const reduce = useReducedMotion();

  const { paths, pts, routeD } = useMemo(() => {
    const projection = geoMercator().fitExtent(
      [[PAD, PAD], [W - PAD, H - PAD]],
      REGION
    );
    const pathGen = geoPath(projection);

    const allFeatures = feature(worldData, worldData.objects.countries).features;
    // Keep only Europe + Africa (+ near) by centroid, drop far continents.
    const regionFeatures = allFeatures.filter((f) => {
      const [lon, lat] = geoCentroid(f);
      return lon >= -28 && lon <= 60 && lat >= -40 && lat <= 73;
    });
    const paths = regionFeatures
      .map((f) => pathGen(f))
      .filter(Boolean);

    const project = (c) => {
      const [x, y] = projection(c);
      return { x, y };
    };
    const pts = {
      germany: project(CITIES.germany.coords),
      capeTown: project(CITIES.capeTown.coords),
      durban: project(CITIES.durban.coords),
      johannesburg: project(CITIES.johannesburg.coords),
    };

    // Curved route: Germany -> (eastward bow over Africa) -> Cape Town
    const g = pts.germany;
    const c = pts.capeTown;
    const c1 = { x: g.x + 120, y: g.y + (c.y - g.y) * 0.32 };
    const c2 = { x: c.x + 130, y: g.y + (c.y - g.y) * 0.72 };
    const routeD = `M ${g.x},${g.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${c.x},${c.y}`;

    return { paths, pts, routeD };
  }, []);

  const LAND = "#E4E9EF";
  const LAND_LINE = "#CBD3DC";
  const INK = "#0B1B33";
  const BLUE = "#0B5FFF";

  const draw = {
    hidden: { pathLength: 0, opacity: 0.25 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 2.2, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className={className} data-testid="hero-route-map">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" role="img" aria-label="Route von Deutschland nach Südafrika" style={{ display: "block" }}>
        {/* faint graticule backdrop */}
        <g stroke={LAND_LINE} strokeWidth="1" fill="none" opacity="0.5">
          <line x1={PAD} y1={H * 0.28} x2={W - PAD} y2={H * 0.28} strokeDasharray="2 8" />
          <line x1={PAD} y1={H * 0.62} x2={W - PAD} y2={H * 0.62} strokeDasharray="2 8" />
          <line x1={W * 0.4} y1={PAD} x2={W * 0.4} y2={H - PAD} strokeDasharray="2 8" />
        </g>

        {/* continents (accurate outlines) */}
        <g fill={LAND} stroke={LAND_LINE} strokeWidth="0.9" strokeLinejoin="round">
          {paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* route */}
        {reduce ? (
          <path d={routeD} fill="none" stroke={BLUE} strokeWidth="2.5" strokeDasharray="7 7" strokeLinecap="round" />
        ) : (
          <motion.path
            data-testid="hero-route-path"
            d={routeD}
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
          <circle data-testid="hero-route-marker" r="5" fill={BLUE} className="gsf-route-marker" style={{ offsetPath: `path('${routeD}')` }} />
        )}

        {/* Germany node */}
        <g>
          <circle cx={pts.germany.x} cy={pts.germany.y} r="7" fill={BLUE} />
          <circle cx={pts.germany.x} cy={pts.germany.y} r="7" fill="none" stroke={BLUE} strokeWidth="1.5">
            {!reduce && <animate attributeName="r" values="7;14;7" dur="3s" repeatCount="indefinite" />}
            {!reduce && <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />}
          </circle>
          <text x={pts.germany.x + 14} y={pts.germany.y - 8} fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight="500" fill={INK} letterSpacing="1.5">
            {labels.germany.toUpperCase()}
          </text>
        </g>

        {/* South Africa nodes */}
        <g fill={BLUE}>
          <circle cx={pts.johannesburg.x} cy={pts.johannesburg.y} r="4" />
          <circle cx={pts.durban.x} cy={pts.durban.y} r="4" />
          <circle cx={pts.capeTown.x} cy={pts.capeTown.y} r="6" />
        </g>
        <text x={pts.capeTown.x - 6} y={pts.capeTown.y + 22} textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="12" fontWeight="500" fill={INK} letterSpacing="1.5">
          {labels.southAfrica.toUpperCase()}
        </text>

        {/* small mosaic accent (restrained), placed in the Atlantic */}
        {!compact && (
          <g>
            <rect x={PAD + 4} y={H * 0.5} width="14" height="14" rx="2" fill="#22C3A6" />
            <rect x={PAD + 22} y={H * 0.5} width="14" height="14" rx="2" fill="#FFCF3A" />
            <rect x={PAD + 4} y={H * 0.5 + 18} width="14" height="14" rx="2" fill="#8A6BF0" />
          </g>
        )}
      </svg>

      <style>{`
        .gsf-route-marker { animation: gsf-travel 8s linear infinite; }
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
