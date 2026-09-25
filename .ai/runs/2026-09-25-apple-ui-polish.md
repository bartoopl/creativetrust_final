# Execution plan — Apple-style interaction & accessibility polish

Source: Apple-design audit of the site (conversation, 2026-09-25), re-verified against `origin/main` after PR #1 (Medusa redesign) landed. Findings already resolved by PR #1 (single accent, pill buttons, JetBrains Mono, light sections, translucent header, marquee pause + reduced motion, no canvases) are dropped.

## Goal

Make the site's interactions feel immediate, interruptible and accessible: fix the MegaMenu hover/click conflict, the Lightbox's missing exit animation, respect user text-size and motion/transparency preferences, add press and focus feedback, animate the mobile menu / FAQ / cookie banner along symmetric paths, and add a swipe gesture with momentum to the Lightbox.

## Scope

- `src/app/globals.css` — root font size, type tracking in `em`, `:focus-visible`, `:active`, reduced motion/transparency/contrast, header material class, dead `[data-reveal]` removal.
- `src/components/Header.tsx`, `MegaMenu.tsx` — hover intent, click/escape behaviour, animated mobile sheet, scroll-edge hairline.
- `src/components/FAQAccordion.tsx`, `CookieConsent.tsx`, `Lightbox.tsx`.
- `src/lib/gesture.ts` + `scripts/gesture.test.mjs` — pure momentum/rubber-band/snap math with unit tests.

## Non-goals

- No copy, route, SEO/metadata, Sanity query or consent-logic changes.
- No visual redesign — sizes stay identical at the default browser text size (`87.5%` = 14px).
- No new dependencies (framer-motion is already installed; tests use `node --test`).
- No pipeline setup (`.ai/agentic.config.json`) — same defaults as the previous run: base `main`, GitHub via `gh`, gate = lint + typecheck + test + check:design + build.

## Implementation Plan

### Phase 1: Global foundations
1. Root font size `87.5%` so the user's text-size setting scales the layout; heading tracking in `em`.
2. Global `:focus-visible` ring and `:active` press feedback for buttons/links.
3. Reduced motion / reduced transparency / more contrast coverage; drop unused `[data-reveal]`.

### Phase 2: Navigation
1. MegaMenu: hover intent (open/close delays over trigger + panel), click no longer closes a hover-opened menu, Escape closes and returns focus.
2. Mobile menu as an animated sheet (critically damped spring, same enter/exit path), Escape + focus handling.
3. Header material in CSS with scroll-edge hairline and reduced-transparency fallback.

### Phase 3: Components
1. FAQ: height transition (interruptible), `aria-controls`, heading wraps the button.
2. Cookie banner enters and exits along the same bottom path.
3. Lightbox: exit animation actually plays, stable keyboard handlers, dialog semantics, focus restore.

### Phase 4: Lightbox gesture
1. Gesture math (`project`, `rubberband`, `pickSwipeTarget`) with unit tests.
2. Swipe between images with 1:1 drag, velocity handoff, rubber-banding at the ends, swipe down to close.

## Risks

- Root font-size change: Tailwind `rem` utilities keep their size at default settings (87.5% of 16px = 14px); only users with a custom text size see scaling, which is the intent.
- Hover intent timers must be cleared on unmount to avoid state updates after navigation.
- Lightbox drag must not break click-to-close on the backdrop or the arrow buttons (drag threshold 10px).
- Tests import a `.ts` module from `node --test`; requires Node ≥ 22.18 type stripping (local: Node 26).

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Global foundations

- [x] 1.1 Root font size 87.5% and em-based heading tracking — 9ef5f90
- [x] 1.2 Focus-visible ring and active press feedback — cf16190
- [x] 1.3 Reduced motion, transparency and contrast coverage — df8b391

### Phase 2: Navigation

- [x] 2.1 MegaMenu hover intent, click and Escape behaviour — 6c2c0ad
- [x] 2.2 Animated mobile menu sheet — 85b0b0e
- [x] 2.3 Header material with scroll-edge hairline — 31a295e

### Phase 3: Components

- [ ] 3.1 FAQ height transition and ARIA
- [ ] 3.2 Cookie banner symmetric enter/exit
- [ ] 3.3 Lightbox exit animation, keyboard and focus fixes

### Phase 4: Lightbox gesture

- [ ] 4.1 Gesture math with unit tests
- [ ] 4.2 Lightbox swipe with momentum and rubber-banding
