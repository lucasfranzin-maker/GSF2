{
  "project": {
    "name": "GSF – Grafik Service Franzin",
    "slogan": "Print Engineering Solutions",
    "brand_attributes": [
      "German technical precision",
      "international distribution/logistics",
      "trustworthy B2B",
      "premium editorial engineering",
      "calm, whitespace-forward",
      "precise alignment + thin rules"
    ],
    "strict_prohibitions": [
      "NO orange",
      "NO beige",
      "NO warm brown",
      "NO gradients (anywhere)",
      "NO glassmorphism",
      "NO 3D effects",
      "NO heavy shadows",
      "NO stock photos of smiling people",
      "NO exaggerated animations/parallax"
    ],
    "implementation_note": "Codebase uses .js (not .tsx). All guidance below assumes React + Tailwind + shadcn/ui in .jsx/.js files."
  },

  "design_tokens": {
    "css_custom_properties": {
      "location": "/app/frontend/src/index.css (override :root tokens)",
      "tokens": {
        "--gsf-bg": "#F6F8FA",
        "--gsf-surface": "#FFFFFF",
        "--gsf-surface-2": "#F2F5F8",

        "--gsf-ink": "#0B1B33",
        "--gsf-ink-2": "#1A2436",
        "--gsf-muted": "#6B7787",

        "--gsf-border": "#CBD3DC",
        "--gsf-border-2": "#D9E0E7",

        "--gsf-blue": "#0B5FFF",
        "--gsf-blue-2": "#0A57E0",

        "--gsf-teal": "#22C3A6",
        "--gsf-violet": "#8A6BF0",
        "--gsf-yellow": "#FFCF3A",

        "--gsf-focus": "#0B5FFF",
        "--gsf-danger": "#B42318",
        "--gsf-success": "#067647",

        "--gsf-radius-sm": "8px",
        "--gsf-radius-md": "12px",

        "--gsf-shadow-none": "0 0 #0000",

        "--gsf-rule": "1px",
        "--gsf-rule-dash": "6 6",
        "--gsf-rule-gap": "10px"
      },
      "shadcn_hsl_mapping": {
        "note": "Map the above hex colors into shadcn HSL tokens so components inherit the GSF palette. Keep surfaces white/light; no dark mode by default.",
        "recommended": {
          "--background": "210 33% 98%",
          "--foreground": "216 65% 12%",
          "--card": "0 0% 100%",
          "--card-foreground": "216 65% 12%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "216 65% 12%",
          "--primary": "217 100% 52%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "210 25% 96%",
          "--secondary-foreground": "216 65% 12%",
          "--muted": "210 25% 96%",
          "--muted-foreground": "215 16% 45%",
          "--accent": "210 25% 96%",
          "--accent-foreground": "216 65% 12%",
          "--border": "214 20% 83%",
          "--input": "214 20% 83%",
          "--ring": "217 100% 52%",
          "--radius": "0.75rem"
        }
      }
    },

    "tailwind_extensions": {
      "note": "Prefer Tailwind utility usage; add a few semantic utilities via CSS classes for dashed rules + technical labels.",
      "semantic_classes_to_add": [
        ".gsf-container",
        ".gsf-section",
        ".gsf-kicker",
        ".gsf-rule",
        ".gsf-rule-dashed",
        ".gsf-btn-primary",
        ".gsf-link",
        ".gsf-focus-ring"
      ]
    },

    "spacing_system": {
      "principle": "Use 2–3x more whitespace than feels comfortable; keep vertical rhythm consistent.",
      "section_padding": {
        "mobile": "py-12",
        "tablet": "md:py-16",
        "desktop": "lg:py-20"
      },
      "container": "max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    },

    "borders_and_rules": {
      "thin_rules": "1px solid var(--gsf-border)",
      "dashed_rules": {
        "style": "Use SVG or CSS background for dashed rules; keep dash subtle.",
        "tailwind_pattern": "border-t border-[color:var(--gsf-border)]",
        "preferred": "Use <Separator> for solid rules; use custom <DashedRule /> component for dashed rules to match reference."
      }
    },

    "shadows": {
      "policy": "Avoid shadows except minimal elevation for dropdown/sheet. Cards are border-based, not shadow-based.",
      "allowed": [
        "shadow-sm only for popovers/menus",
        "no shadow on content cards"
      ]
    }
  },

  "typography": {
    "font_pairing": {
      "headline_font": {
        "google_font": "Roboto Condensed",
        "fallbacks": "'Roboto Condensed', 'Arial Narrow', system-ui, sans-serif",
        "usage": "H1/H2/H3, nav labels, section titles; uppercase; tight leading; slightly expanded tracking"
      },
      "body_font": {
        "google_font": "Inter",
        "fallbacks": "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        "usage": "Body copy, form labels, paragraphs"
      },
      "technical_label_font": {
        "google_font": "IBM Plex Mono",
        "fallbacks": "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        "usage": "Small labels like '01 / STARTSEITE', location codes, microcopy, map labels"
      }
    },

    "type_scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] leading-[0.95]",
      "h2": "text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.02em] leading-tight",
      "h3": "text-xl sm:text-2xl font-semibold uppercase tracking-[0.02em]",
      "body": "text-sm sm:text-base leading-relaxed text-[color:var(--gsf-ink-2)]",
      "muted": "text-sm text-[color:var(--gsf-muted)]",
      "kicker": "text-xs font-medium tracking-[0.18em] uppercase text-[color:var(--gsf-muted)]",
      "technical_label": "text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-[color:var(--gsf-muted)]"
    },

    "rules": {
      "uppercase_policy": "Headlines + nav + section labels are uppercase. Body text is sentence case.",
      "line_length": "Keep paragraphs ~60–75 characters per line on desktop (use max-w-prose)."
    }
  },

  "layout": {
    "grid": {
      "desktop": "12-column grid; hero split ~7/5 columns (text/map)",
      "tablet": "stack or 8/4 depending on space; keep map visible",
      "mobile": "single column; map below hero text; CTA stays above fold"
    },

    "page_shell": {
      "header": {
        "behavior": "sticky top-0; white background; thin bottom rule; no blur/glass",
        "height": "h-16 lg:h-20",
        "left_block": "mosaic square logo + wordmark stack",
        "right_block": "nav links + language toggle",
        "mobile": "hamburger opens Sheet with nav + language toggle"
      },
      "footer": {
        "behavior": "minimal; thin top rule; 2–3 columns; language toggle on right",
        "content": [
          "GSF – Grafik Service Franzin · Print Engineering Solutions",
          "Locations list: Cape Town · Durban · Johannesburg · Hamburg",
          "Legal links: Impressum · Datenschutz"
        ]
      }
    },

    "section_pattern": {
      "label_row": {
        "left": "icon + technical label '0X / SECTION'",
        "right": "dashed rule extending to the right (or between label and content)"
      },
      "content": "headline + short paragraph + text link CTA",
      "separators": "Between major sections use dashed rule; within content use solid thin rules"
    }
  },

  "components": {
    "component_path": {
      "shadcn_primary": {
        "button": "/app/frontend/src/components/ui/button.jsx",
        "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
        "dropdown_menu": "/app/frontend/src/components/ui/dropdown-menu.jsx",
        "sheet": "/app/frontend/src/components/ui/sheet.jsx",
        "separator": "/app/frontend/src/components/ui/separator.jsx",
        "card": "/app/frontend/src/components/ui/card.jsx",
        "badge": "/app/frontend/src/components/ui/badge.jsx",
        "input": "/app/frontend/src/components/ui/input.jsx",
        "textarea": "/app/frontend/src/components/ui/textarea.jsx",
        "label": "/app/frontend/src/components/ui/label.jsx",
        "select": "/app/frontend/src/components/ui/select.jsx",
        "form": "/app/frontend/src/components/ui/form.jsx",
        "sonner": "/app/frontend/src/components/ui/sonner.jsx"
      },
      "custom_components_to_create": [
        "/app/frontend/src/components/BrandMark.jsx",
        "/app/frontend/src/components/Header.jsx",
        "/app/frontend/src/components/Footer.jsx",
        "/app/frontend/src/components/SectionLabel.jsx",
        "/app/frontend/src/components/DashedRule.jsx",
        "/app/frontend/src/components/RouteMapHero.jsx",
        "/app/frontend/src/components/PartnerLogoGrid.jsx",
        "/app/frontend/src/components/StrengthsRow.jsx",
        "/app/frontend/src/components/LanguageToggle.jsx"
      ]
    },

    "button_system": {
      "variants": {
        "primary": {
          "style": "solid blue, squared-premium radius, no gradient",
          "tailwind": "inline-flex items-center justify-center gap-2 rounded-[var(--gsf-radius-sm)] bg-[color:var(--gsf-blue)] px-5 py-3 text-sm font-semibold text-white hover:bg-[color:var(--gsf-blue-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gsf-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "motion": "hover: background-color 160ms ease; active: translate-y-[1px]"
        },
        "secondary": {
          "tailwind": "inline-flex items-center justify-center gap-2 rounded-[var(--gsf-radius-sm)] border border-[color:var(--gsf-border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--gsf-ink)] hover:border-[color:var(--gsf-ink)] focus-visible:ring-2 focus-visible:ring-[color:var(--gsf-focus)] focus-visible:ring-offset-2",
          "motion": "hover: border-color 160ms ease"
        },
        "link": {
          "tailwind": "inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--gsf-ink)] hover:text-[color:var(--gsf-blue)]",
          "motion": "hover: color 160ms ease; arrow shifts 2px"
        }
      },
      "data_testid_examples": [
        "data-testid=\"hero-contact-cta\"",
        "data-testid=\"hero-locations-link\"",
        "data-testid=\"contact-form-submit-button\""
      ]
    },

    "header_nav": {
      "desktop": {
        "use": "shadcn NavigationMenu for top-level + DropdownMenu for Standorte",
        "nav_items": [
          "STANDORTE (dropdown)",
          "TESA PARTNERSCHAFT",
          "SORTIMENT",
          "ÜBER GSF",
          "KONTAKT"
        ],
        "styling": "uppercase condensed; thin underline on hover; active route shows blue underline"
      },
      "mobile": {
        "use": "shadcn Sheet",
        "styling": "full-height white panel; sectioned links with thin rules"
      },
      "data_testid": {
        "header": "site-header",
        "nav": "site-nav",
        "mobile_menu_button": "mobile-nav-open-button",
        "language_toggle": "language-toggle"
      }
    },

    "section_label": {
      "spec": {
        "left": "lucide icon (stroke 1.5) + IBM Plex Mono label",
        "rule": "dashed line extending horizontally",
        "tailwind": "flex items-center gap-3"
      },
      "data_testid": "section-label"
    },

    "cards_and_panels": {
      "policy": "No glass, no heavy shadows. Use white surface + 1px border + generous padding.",
      "panel_tailwind": "rounded-[var(--gsf-radius-md)] border border-[color:var(--gsf-border)] bg-white p-5 sm:p-6",
      "micro": "On hover: border becomes ink; icon stroke becomes blue"
    },

    "partner_logo_grid": {
      "layout": "4 columns desktop; 2 columns mobile; each logo in bordered cell",
      "cell_tailwind": "flex items-center justify-center rounded-[var(--gsf-radius-sm)] border border-[color:var(--gsf-border)] bg-white p-6",
      "hover": "border -> ink; logo tint -> ink",
      "data_testid": "partner-logo-grid"
    },

    "forms": {
      "contact_form": {
        "fields": [
          "Name",
          "Unternehmen",
          "E-Mail",
          "Telefon",
          "Standort (Select)",
          "Betreff",
          "Nachricht (Textarea)"
        ],
        "validation": "client-side required + email format; show inline error text in danger color",
        "success": "use sonner toast + inline success panel",
        "field_style": "inputs are white with 1px border; focus ring blue; no rounded-pill",
        "data_testid": {
          "form": "contact-form",
          "name": "contact-form-name-input",
          "company": "contact-form-company-input",
          "email": "contact-form-email-input",
          "phone": "contact-form-phone-input",
          "location": "contact-form-location-select",
          "subject": "contact-form-subject-input",
          "message": "contact-form-message-textarea",
          "submit": "contact-form-submit-button",
          "success": "contact-form-success-message",
          "error": "contact-form-error-message"
        }
      }
    }
  },

  "hero_route_map": {
    "visual_spec": {
      "right_column": "pure SVG map (abstract Europe/Africa silhouettes in light grey), dashed blue route line Germany→South Africa, moving marker dot, labels DEUTSCHLAND/SÜDAFRIKA, small teal/violet/yellow squares as accents",
      "no_photos": true,
      "no_gradients": true
    },
    "animation": {
      "library": "framer-motion (already installed)",
      "principles": [
        "fade-in on scroll for hero blocks",
        "route line draws once (2.0–2.6s) when in view",
        "marker dot moves slowly along path (6–10s loop) OR subtle pulse at endpoints",
        "respect prefers-reduced-motion"
      ],
      "framer_motion_scaffold_js": "// Route line draw\nconst draw = {\n  hidden: { pathLength: 0, opacity: 0 },\n  visible: { pathLength: 1, opacity: 1, transition: { duration: 2.2, ease: 'easeInOut' } }\n};\n\n// In component\n// <motion.path variants={draw} initial=\"hidden\" whileInView=\"visible\" viewport={{ once: true, amount: 0.4 }} />\n\n// Marker dot motion\n// <motion.circle animate={{ offsetDistance: ['0%', '100%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ offsetPath: `path('M...')` }} />",
      "reduced_motion": "If prefers-reduced-motion: show static dashed route + static dot."
    },
    "side_panel": {
      "content": [
        "IMPORT & DISTRIBUTION (globe line icon)",
        "tesa Alliance Partner in Südafrika",
        "Pins: Cape Town / Durban / Johannesburg (Kunden)"
      ],
      "style": "bordered white panel; thin rules; small mono labels"
    },
    "data_testid": {
      "hero": "home-hero",
      "map": "hero-route-map",
      "route": "hero-route-path",
      "marker": "hero-route-marker"
    }
  },

  "iconography": {
    "library": "lucide-react",
    "stroke": "strokeWidth={1.5} (thin technical line icons)",
    "sizes": {
      "section_label": "16",
      "strengths": "20-22",
      "hero_panel": "18"
    },
    "do_not_use": ["emoji icons"],
    "suggested_icons": {
      "import": "Ship",
      "trust": "ShieldCheck",
      "engineering": "Cog",
      "partner": "Handshake",
      "locations": "MapPin",
      "globe": "Globe"
    }
  },

  "motion": {
    "principles": [
      "Subtle, premium, engineering-like",
      "No parallax overkill",
      "No background particle fields",
      "Use opacity + small translateY only",
      "Line animations (route + dashed rules) are the signature"
    ],
    "durations": {
      "hover": "160ms",
      "fade_in": "420–560ms",
      "route_draw": "2200ms"
    },
    "easing": {
      "standard": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      "linear": "linear (for marker travel)"
    }
  },

  "accessibility": {
    "contrast": "Ink on white/light grey must meet WCAG AA; blue used for focus + primary CTA only.",
    "keyboard": [
      "Visible focus ring (2px blue) on all interactive elements",
      "NavigationMenu + dropdown must be keyboard accessible",
      "Skip-to-content link at top"
    ],
    "aria": [
      "aria-label for language toggle",
      "aria-current for active nav link",
      "form fields have <Label htmlFor>"
    ],
    "reduced_motion": "Respect prefers-reduced-motion: disable route draw + marker travel; keep content visible."
  },

  "images_and_graphics": {
    "image_urls": {
      "policy": "Avoid stock photography. Prefer custom SVG graphics (map, logos, icons).",
      "categories": [
        {
          "category": "hero_map_svg",
          "description": "Custom inline SVG (Europe/Africa abstract) with dashed route line and marker dot. No external image URL.",
          "urls": []
        },
        {
          "category": "partner_logos_svg",
          "description": "Recreate partner logos as clean SVG marks (tesa, ECOGRAPH, ISRA VISION, JUST NORMLICHT).",
          "urls": []
        }
      ]
    }
  },

  "page_blueprints": {
    "home": {
      "sections_order": [
        "Header (sticky)",
        "01 / STARTSEITE Hero split (text + RouteMapHero + side panel)",
        "Dashed rule",
        "02 / STANDORTE teaser (headline + copy + link) + strengths row (3–4 items)",
        "Dashed rule",
        "03 / PARTNER teaser",
        "Partner logo grid bar",
        "Contact CTA strip (solid white, bordered)",
        "Footer"
      ]
    },
    "ueber_gsf": {
      "tone": "credibility narrative; no invented metrics",
      "layout": "editorial: left rail section labels + right content blocks with thin rules"
    },
    "standorte": {
      "layout": "locations list as bordered panels; include DE↔ZA connection mini-map",
      "cards": ["Cape Town (Head Office)", "Durban (Branch)", "Johannesburg (Sales area)", "Hamburg (Germany connection)"]
    },
    "tesa": {
      "layout": "hero headline + applications list + consulting CTA",
      "trust_block": "GSF is sole tesa Alliance Partner in South Africa (prominent but restrained)"
    },
    "sortiment": {
      "layout": "category grid (2x2 or 3x2) with thin-line icons; no pricing; no cart",
      "categories": ["Grafische Industrie", "Klebebandlösungen", "Industrielle Lösungen", "Distribution"]
    },
    "kontakt": {
      "layout": "two-column desktop: form left, direct contact + locations right; stacked on mobile"
    }
  },

  "libraries": {
    "required": [
      {
        "name": "framer-motion",
        "purpose": "scroll fade-in + SVG route draw",
        "install": "already installed (per problem statement)",
        "usage": "Use motion.* components; gate animations behind prefers-reduced-motion"
      },
      {
        "name": "lucide-react",
        "purpose": "thin technical icons",
        "install": "already installed",
        "usage": "strokeWidth={1.5}"
      }
    ],
    "optional": [
      {
        "name": "react-i18next",
        "purpose": "DE/EN toggle",
        "install_cmd": "npm i i18next react-i18next",
        "note": "If existing i18n solution exists, keep it. Otherwise implement minimal dictionary-based toggle."
      }
    ]
  },

  "instructions_to_main_agent": [
    "Remove CRA default App.css centering/dark header styles; do not use .App { text-align:center }.",
    "Override shadcn tokens in index.css to match GSF palette (white/light grey surfaces, ink navy text, blue accent).",
    "Implement a custom DashedRule component (SVG line) to match reference dashed dividers; do not approximate with random borders.",
    "Build Header with sticky positioning, thin bottom rule, precise alignment; use shadcn NavigationMenu + DropdownMenu + Sheet for mobile.",
    "Hero must be split layout with RouteMapHero SVG on right; no images; route line is dashed blue with subtle draw animation.",
    "Use Roboto Condensed for uppercase headings/nav; Inter for body; IBM Plex Mono for technical labels.",
    "Use teal/violet/yellow ONLY as tiny mosaic squares/markers (<= 3–5 small accents per viewport).",
    "No gradients anywhere. No glass. No heavy shadows.",
    "All interactive + key informational elements must include stable data-testid attributes (kebab-case).",
    "Animations: subtle fade-in on scroll + route draw; respect prefers-reduced-motion."
  ],

  "appendix_general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>\n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
