# Execution plan — Homepage redesign (Devin style) with an AI offer assistant hero

Source: user brief (conversation, 2026-10-27) + attached style reference "Devin — Style Reference" (electric ink on drafting paper: Paper `#f7f6f5`, Carbon `#141414`, Tile Gray `#efefef`, Graphite `#1f1f1f` bento, Electric Blue `#2200ff` as the single signal, 500-weight tightly tracked display type, 2px buttons, 16px flat tiles).

## Goal

Trial redesign of the homepage only: a full-viewport (100svh) centered hero where a visitor types what they need and an AI assistant — grounded strictly in the CreativeTrust service catalogue and published prices — answers whether and how we deliver it, gives a price when one is published, and lets them send a contact request with the conversation attached; an animated arrow leads to the rest of the restyled homepage.

## Scope

- `src/app/globals.css` — homepage-only `.ct-v2` theme scope (tokens + component overrides) activated with `body:has(.ct-v2)` so header/footer follow on `/` only.
- `src/lib/offer-assistant.ts` (+ `scripts/offer-assistant.test.mjs`) — pure logic: catalogue-grounded system prompt, question validation, tool schema, response normalization (no invented prices, only known service slugs).
- `src/app/api/offer-assistant/route.ts` — Claude Messages API via `fetch` (no new dependency), forced tool call for structured output, per-IP rate limit, graceful `503` when `ANTHROPIC_API_KEY` is not set.
- `src/components/home/*` — new homepage sections in the Devin language; `src/app/page.tsx` composition.

## Non-goals

- No changes to other pages or shared section components (`Services`, `WhyUsSection`, `CTASection`, … stay as they are for `/uslugi/*`, `/o-nas`).
- No change to `/api/contact` or the Netlify contact function — the lead form reuses them as-is.
- No chat history / multi-turn conversation, no storage of questions beyond the e-mail the visitor chooses to send.
- No pipeline setup (`.ai/agentic.config.json`) — same defaults as previous runs: base `main`, GitHub via `gh`, gate = lint + typecheck + test + check:design + build.

## Implementation Plan

### Phase 1: Foundations
1. `.ct-v2` theme scope: Paper/Carbon/Tile/Graphite/Electric tokens, display type, compact 2px buttons, Geist Mono for technical detail.

### Phase 2: Offer assistant backend
1. `offer-assistant.ts`: catalogue prompt, validation, tool schema, normalization + unit tests.
2. `/api/offer-assistant` route: Claude call, rate limit, timeout, no-key fallback.

### Phase 3: AI hero
1. `AskHero`: 100svh centered headline, question box with suggestion chips, animated scroll arrow.
2. Answer panel: verdict, answer, matching services, published price, CTA.
3. Inline contact request posting to `/api/contact` with the question and answer attached.

### Phase 4: Homepage sections
1. Pipeline workspace frame (former hero content + 3D scene, heading demoted to h2) and logo tiles / stats.
2. Services, why-us Graphite bento, process.
3. Testimonials, closing CTA, `page.tsx` composition with case studies and blog.

### Phase 5: Style-reference compliance (follow-up audit)
1. Header strip, wordmark, permanent divider and footer in the v2 language on `/`.
2. Case studies and blog sections in the v2 language.
3. Hero cleanup: plain Paper, no extra badge, Tile Gray question box, 64px section display.

### Phase 6: Assistant works without an API key (follow-up)
1. Keyword catalogue fallback when the key is missing or Claude fails, marked as non-AI in the UI.

## Risks

- Hallucinated offers/prices: the prompt lists only catalogue data, and the server drops any price not present in `publishedPrices` and any unknown service slug.
- Cost/abuse: question capped at 600 chars, `max_tokens` bounded, in-memory per-IP limit (best-effort on serverless), honeypot.
- `ANTHROPIC_API_KEY` must be configured on Netlify (`ANTHROPIC_MODEL` optional); without it the hero degrades to a contact prompt instead of erroring.
- `body:has()` scoping: unsupported browsers (very old) just see the current theme in header/footer.
- Validation gate blocker: `npm run lint` is broken on `main` independently of this run (`next lint` was removed in Next 16; `eslint` crashes on a circular config). Gate run = typecheck + test + check:design + build.
- SEO: the homepage keeps a descriptive `<h1>` in the hero; previous hero heading becomes `<h2>`.

## Progress

PR: #6

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Foundations

- [x] 1.1 .ct-v2 theme scope and fonts — 22e1359

### Phase 2: Offer assistant backend

- [x] 2.1 Offer assistant core logic with tests — 6729bf9
- [x] 2.2 Offer assistant API route — d3b6de7

### Phase 3: AI hero

- [x] 3.1 AskHero layout, question box and scroll arrow — 14b0dfe
- [x] 3.2 Answer panel — 14b0dfe
- [x] 3.3 Inline contact request — 14b0dfe

### Phase 4: Homepage sections

- [x] 4.1 Pipeline workspace frame, logo tiles and stats — f27dde2
- [x] 4.2 Services, why-us bento and process — e4d79ce
- [x] 4.3 Testimonials, CTA and page composition — 6f40ec6

### Phase 5: Style-reference compliance

- [x] 5.1 Header strip, wordmark and footer in v2 — e832912
- [x] 5.2 Case studies and blog in v2 — 5a2f13b
- [x] 5.3 Hero cleanup and 64px display — cdd214d

### Phase 6: Assistant fallback

- [x] 6.1 Catalogue fallback without API key — 4e661e5
