# Execution plan — Medusa-inspired site redesign

Source doc: `design_handoff_medusa_redesign/README.md` (+ `homepage-reference.html`)

## Goal

Redesign the whole creativetrust.pl marketing site to the light, hairline-bordered, monospace-labeled "Medusa.js-inspired" design system from the handoff — single violet accent (`#6c63ff`), no dark/filled sections — keeping existing copy, routes, SEO metadata and data fetching.

## Scope

- Design tokens (CSS variables + Tailwind theme) and fonts (Inter + JetBrains Mono).
- Shared primitives: pill buttons (primary / ghost with circular arrow badge), eyebrow label, section header, striped image placeholder, bordered hairline grid.
- Global chrome: announcement strip, Header (+ MegaMenu, mobile menu), Footer.
- Homepage: rebuilt to match `homepage-reference.html` at high fidelity (hero, logo marquee, stats, why-us grid, services tab switcher, process grid, case studies, testimonials, final CTA).
- Inner pages restyled with the same tokens/components: `/uslugi` + service pages + SEO landing pages, `/portfolio` (+ detail), `/blog` (+ post, category, author), `/baza-wiedzy`, `/o-nas`, `/kontakt`, legal pages.
- Guard script asserting the removed lime accent / dark-section scheme does not return.

## Non-goals

- No copy rewrites beyond what the homepage reference specifies; no route, metadata, schema/SEO or Sanity query changes.
- No changes to API routes, email, consent logic, admin (Sanity Studio) UI.
- No new image assets (striped placeholders per handoff where the reference uses them; existing real images are kept where pages already have them).
- No pipeline setup (`.ai/agentic.config.json`) — the repo has none; defaults used: base `main`, GitHub via `gh`, gate = lint + typecheck + build + design guard.

## Implementation Plan

### Phase 1: Design system foundation
1. Tokens in `globals.css`/`tailwind.config.js`, JetBrains Mono via `next/font`, drop lime/dark tokens.
2. Shared primitives in `src/components/ui/` (restyle `NotchedButton` into the pill button keeping its API; add `Eyebrow`, `SectionHeader`, `Placeholder`; restyle `PageHero`, `DarkSection`, `DarkCard` to the light system).
3. Header with announcement strip, light MegaMenu and mobile menu.
4. Footer per reference.

### Phase 2: Homepage
1. Hero (badges, H1, CTAs, dot-grid, screenshot placeholder).
2. Client logos marquee + stat row.
3. Why-us hairline grid + services tab switcher (`useState<number>`, crossfade).
4. Process grid (01–05).
5. Case studies + testimonials.
6. Final CTA panel + homepage composition.

### Phase 3: Inner pages
1. `/uslugi` index.
2. Core service pages (strony-www, e-commerce, marketing-automation, social-media).
3. SEO landing pages under `/uslugi/*`.
4. `/portfolio` + `/portfolio/[slug]`.
5. `/blog`, post, category, author, `/baza-wiedzy`.
6. `/o-nas`.
7. `/kontakt`, contact forms, legal pages.

### Phase 4: Sweep and verification
1. Remove remaining dark/lime leftovers, add design-guard script.
2. Full gate (lint, typecheck, build, guard) + screenshots.

## Risks

- No automated UI test suite exists; verification relies on typecheck/build, the guard script and screenshots.
- `next build` fetches from Sanity; without credentials pages may fall back to empty data — build is still required to pass.
- Large visual diff; SEO landing pages share markup patterns so a mechanical restyle may miss per-page details — covered by screenshots.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Design system foundation

- [ ] 1.1 Design tokens and fonts
- [ ] 1.2 Shared UI primitives
- [ ] 1.3 Header, announcement strip and menus
- [ ] 1.4 Footer

### Phase 2: Homepage

- [ ] 2.1 Hero
- [ ] 2.2 Logo marquee and stats
- [ ] 2.3 Why-us grid and services tab switcher
- [ ] 2.4 Process grid
- [ ] 2.5 Case studies and testimonials
- [ ] 2.6 Final CTA and homepage composition

### Phase 3: Inner pages

- [ ] 3.1 Services index
- [ ] 3.2 Core service pages
- [ ] 3.3 SEO landing pages
- [ ] 3.4 Portfolio pages
- [ ] 3.5 Blog and knowledge base pages
- [ ] 3.6 About page
- [ ] 3.7 Contact and legal pages

### Phase 4: Sweep and verification

- [ ] 4.1 Leftover sweep and design guard
- [ ] 4.2 Full validation gate and screenshots
