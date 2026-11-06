# Execution plan — new logo and Safari-safe favicon

Source: logo package `~/Downloads/creativetrust-logo` (direction A4 „Sygnał w górę”, README with brand rules and favicon `<head>` snippet).

## Goal

The site shows the new creativetrust logo everywhere the brand mark appears, and the favicon renders correctly in Safari (macOS tabs, iOS home screen) as well as in Chromium/Firefox.

## Where the brand currently appears

- `src/components/ui/Wordmark.tsx` — monospace text „creativetrust”, used in the header and footer.
- `public/logo.svg` — old white logo, referenced by Organization/LocalBusiness JSON-LD (`src/lib/schema.ts`).
- `src/app/favicon.ico` — old favicon; no SVG icon, no apple-touch-icon, no manifest (Safari falls back to a letter tile or a stale icon).
- No default Open Graph image.

## Scope

- Replace the `Wordmark` text with the new horizontal colour logo (vector, from the package), keeping the header/footer link wrappers and accessible name.
- Replace `public/logo.svg` with the new horizontal colour logo and add a raster `public/logo.png` for JSON-LD (Google's logo guidelines prefer a raster image ≥112 px).
- Favicons via Next.js App Router file conventions: `favicon.ico` (16/32/48), `icon.svg` (dark-mode aware), `icon.png` 32 px PNG fallback for browsers without SVG favicon support (Safari < 26), `apple-icon.png` 180 px, plus `public/apple-touch-icon.png` for Safari's direct root request, and `manifest.ts` with the 192/512 icons.
- Default Open Graph/Twitter image from the package (`opengraph-image.png`).
- Exclude `.webmanifest` from the proxy matcher like other static assets.

## Non-goals

- Changing the typography, colours or layout of the rest of the site.
- Sanity Studio branding, e-mail templates (no logo there today), social profile avatars.
- Removing unrelated unused assets in `public/`.

## Implementation Plan

### Phase 1: Logo

1.1 Swap the Wordmark for the new horizontal logo. 1.2 Replace `public/logo.svg` and point JSON-LD at a raster logo.

### Phase 2: Favicon and social image

2.1 Add the favicon set and web manifest. 2.2 Add the default Open Graph image.

## Risks

- Safari caches favicons aggressively (`~/Library/Safari/Favicon Cache`); the change may only be visible after clearing it or in a private window.
- Page-level `openGraph` objects replace the root one, so pages that define their own `openGraph` (most /uslugi/*, blog index, portfolio, knowledge base) get `twitter:image` but no `og:image` — verified on the built /uslugi/strony-www. They had no og:image before either; adding one per page is a follow-up.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Logo

- [x] 1.1 Swap the Wordmark for the new horizontal logo — 885ffa9
- [x] 1.2 Replace public/logo.svg and point JSON-LD at a raster logo — 51a9e04

### Phase 2: Favicon and social image

- [x] 2.1 Add the favicon set and web manifest — 97e2382
- [x] 2.2 Add the default Open Graph image — 89e63e5
