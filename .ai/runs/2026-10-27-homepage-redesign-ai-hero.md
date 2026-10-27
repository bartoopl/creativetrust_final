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

## Risks

- Hallucinated offers/prices: the prompt lists only catalogue data, and the server drops any price not present in `publishedPrices` and any unknown service slug.
- Cost/abuse: question capped at 600 chars, `max_tokens` bounded, in-memory per-IP limit (best-effort on serverless), honeypot.
- `ANTHROPIC_API_KEY` must be configured on Netlify (`ANTHROPIC_MODEL` optional); without it the hero degrades to a contact prompt instead of erroring.
- `body:has()` scoping: unsupported browsers (very old) just see the current theme in header/footer.
- SEO: the homepage keeps a descriptive `<h1>` in the hero; previous hero heading becomes `<h2>`.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Foundations

- [ ] 1.1 .ct-v2 theme scope and fonts

### Phase 2: Offer assistant backend

- [ ] 2.1 Offer assistant core logic with tests
- [ ] 2.2 Offer assistant API route

### Phase 3: AI hero

- [ ] 3.1 AskHero layout, question box and scroll arrow
- [ ] 3.2 Answer panel
- [ ] 3.3 Inline contact request

### Phase 4: Homepage sections

- [ ] 4.1 Pipeline workspace frame, logo tiles and stats
- [ ] 4.2 Services, why-us bento and process
- [ ] 4.3 Testimonials, CTA and page composition
