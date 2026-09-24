# Handoff: CreativeTrust.pl Redesign (Medusa.js-inspired)

## Overview
Redesign of creativetrust.pl's marketing site, restructured around the layout/UI patterns of medusajs.com (technical, monospace-labeled, boxy-grid, bordered-panel aesthetic) while keeping CreativeTrust's own brand colors and copy. One homepage screen was designed in full; the rest of the site (services, portfolio, blog, o nas, kontakt) should be redesigned using the same design system described below.

## About the Design Files
The file in this bundle (`homepage-reference.html`) is a **design reference built in HTML** — a prototype showing intended look, structure, and one interactive behavior (the services tab switcher). It is not production code to copy directly.

**Recreate this design inside the existing codebase** — Next.js 14+ (App Router) + Tailwind CSS + TypeScript, per `bartoopl/creativetrust_final`. Reuse existing components where sensible (`Hero`, `Services`, `NotchedButton`, etc. under `src/components/`) rather than duplicating markup; restyle them to match this system instead of writing net-new one-off components per page.

## Fidelity
**High-fidelity** for the homepage: exact colors, spacing, type sizes and component structure are final. Extend the same system (tokens below) to the rest of the site — those other pages were not individually mocked, so apply the tokens and component patterns with reasonable judgment, matching the homepage's density and rhythm.

## Design System

### Colors
- `--bg: #ffffff` — page background (all sections are light; no dark/inverted sections)
- `--panel: #fafafa` — subtle section/tint background (top strip, why-us section, testimonials, tab content panel)
- `--line: rgba(17,24,39,0.08)` to `rgba(17,24,39,0.12)` — hairline borders, used everywhere instead of shadows
- `--text: #111827` — primary text/headings
- `--muted: #5b6472` — secondary text
- `--muted-2: #9ca3af` — tertiary/meta text (e.g. process step durations)
- `--accent: #6c63ff` (violet) — **the single accent color**. Used for links, primary CTAs, active states, eyebrow labels, bullet dots. Do not introduce other accent hues (a previous version used lime `#CAFF04` as a second accent — removed per direction: one accent only).
- Placeholder imagery fill: `repeating-linear-gradient(135deg, #f3f4f6 0 10px, #fafafa 10px 20px)` with a centered monospace label describing what belongs there.

### Typography
- Body/UI font: **Inter** (400/500/600/700), already the project's font.
- Monospace accent font: **JetBrains Mono** (400/500) — used for: eyebrow/section labels (uppercase, `11–12px`, letter-spacing `.3px`), the "creativetrust" wordmark, process step numbers (`01`–`05`), stat/meta text.
- H1 (hero): `clamp(38px, 5vw, 60px)`, weight 600, letter-spacing `-1.6px`, line-height `1.05`.
- H2 (section titles): `clamp(26px, 3vw, 34px)`, weight 600, letter-spacing `-1px`.
- H3 (card titles): `16–24px`, weight 600.
- Body copy: `14–17px`, weight 400, color muted, line-height `1.6`.

### Spacing / Layout
- Section padding: `clamp(56px, 8vw, 96px) clamp(16px, 4vw, 72px)` (hero/CTA use `clamp(64px,10vw,120px)` vertically).
- Max content width: `1280px`, centered.
- Grid panels (why-us, process steps) use a 1px `background: var(--line)` grid gap trick to draw hairline dividers between cells instead of individual borders.
- Buttons are full pill (`border-radius: 999px`), with a circular arrow badge on the trailing edge (`26–34px`, filled with the accent or with white depending on primary/ghost variant).
- Cards/panels use small radii (`6–12px`), never large rounded corners, to keep the "technical/boxy" feel — this is a deliberate departure from softer, heavily-rounded card styles.
- Subtle dot-grid texture (`radial-gradient(circle, rgba(17,24,39,0.08) 1px, transparent 1px)`, `22px 22px`) is used behind the hero only, sparingly — not on every section.

### Components
- **Top announcement strip**: thin bar above nav, centered mono text + inline link, `#fafafa` background, bottom hairline border.
- **Nav**: wordmark (mono) left, text links center, pill CTA button right (ghost with accent border by default).
- **Eyebrow badge pills**: small bordered pill, uppercase mono `11.5px`, used in hero to list service categories.
- **Primary button**: filled accent, pill shape, trailing circular arrow badge inverted on hover.
- **Ghost button**: outlined, no fill.
- **Logo marquee**: infinite CSS `translateX` loop (`@keyframes` duplicate the content list once for seamless looping), muted mono uppercase text (no logo image assets currently — swap in real SVG logos when available).
- **Stat row**: 3-up grid, hairline dividers between columns, large numeral + small muted label.
- **Why-us / process grid**: 1px-gap bordered grid of cards, mono numeral top-left, heading, muted description.
- **Services tab switcher** (interactive): left column list of 4 service tabs (button per item, left border accent + `#fafafa` fill when active); right panel shows the active service's eyebrow, title, and bulleted feature list (small square accent-colored bullet, hairline top border per row). Clicking a tab swaps the right panel content — implement as local component state (`useState<number>`).
- **Case study cards**: image placeholder block + meta line (mono, uppercase) + title + one-line description, whole card is a link.
- **Testimonial cards**: quote + attribution (mono, muted), bordered, on `#fafafa` section background.
- **Final CTA**: centered content inside a bordered rounded panel (not a filled dark band — this was corrected from an earlier dark-inverted version per explicit design direction: **no dark/filled sections anywhere on the site**, light backgrounds with borders only).
- **Footer**: wordmark + two link columns (Usługi / Firma), hairline-separated bottom bar with copyright + legal links.

## Interactions & Behavior
- Services tab switcher: click sets active index, updates border/fill on the clicked tab and re-renders the right-hand detail panel. No transition animation is required but a short (150–200ms) crossfade on the panel content would read well.
- Logo marquee: continuous linear-timing CSS animation, ~32s loop, pause-on-hover is a nice-to-have, not required.
- All links/buttons use the single accent color for hover state (darken slightly, e.g. `#5148e6`).

## Design Tokens (for Tailwind config / CSS variables)
```
--bg: #ffffff
--panel: #fafafa
--line: rgba(17,24,39,0.08)
--line-strong: rgba(17,24,39,0.12)
--text: #111827
--muted: #5b6472
--muted-2: #9ca3af
--accent: #6c63ff
--accent-hover: #5148e6
--font-sans: "Inter", system-ui, sans-serif
--font-mono: "JetBrains Mono", monospace
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-pill: 999px
```

## Assets
No new image assets were used — all imagery is a striped placeholder box with a monospace caption describing what belongs there (client logos, case study photos, hero product screenshot). Replace these with real photography/screenshots during implementation; keep the same aspect ratios and placement.

## Files
- `homepage-reference.html` — full homepage design reference (open directly in a browser). This is a standalone "Design Component" file (custom lightweight component format used in the design tool) — read it as plain HTML/inline-styles/JS; ignore any `<x-dc>`-style wrapper tags or `support.js` script include, they're tooling scaffolding and not part of the design.

## Next Steps for Implementation
1. Add the tokens above to `tailwind.config.js` / `globals.css`, replacing the current `--accent`/`--lime` scheme with the single-accent violet system.
2. Rebuild `Hero.tsx`, `Services.tsx`, `ClientLogos.tsx`, `StatsSection.tsx`, `ProcessSection.tsx`/`ProcessPipelineSection.tsx`, `RealizacjeSection.tsx`, `CTASection.tsx` to match the light, bordered, mono-labeled system — remove the current black background sections (`Hero`, `Services` currently render on `#000`).
3. Extend the same tokens/components to `/uslugi`, `/portfolio`, `/o-nas`, `/blog`, `/kontakt` for a consistent site-wide redesign.
