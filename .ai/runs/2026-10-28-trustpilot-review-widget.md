# Execution plan — Trustpilot review prompt in the footer

Source: user brief (conversation, 2026-10-28) + Trustpilot onboarding e-mail (business unit ID, Verified Review Collector snippet).

## Goal

Every page's footer invites past clients to review CreativeTrust on Trustpilot.

## Scope

- `src/components/TrustpilotReviewCollector.tsx` — standard TrustBox „Review Collector” (template `56278e9abfbbba0bdcd568bc`, business unit `6ae266b014c0719eb0bb48a7`), bootstrap script loaded only when the footer nears the viewport; server-rendered `evaluate/creativetrust.pl` link as the no-JS / blocked-script fallback.
- `src/components/Footer.tsx` — mounted under the footer lead.

## Non-goals

- Verified (In-App) Review Collector from the e-mail: it needs a logged-in customer's data signed server-side with the secret key (`/api/payload`); anonymous footer visitors have none. Candidate for `/panel-klienta` later. The secret key is never committed.

## Progress

PR: (set after opening)

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Footer widget

- [x] 1.1 Review Collector TrustBox in the footer with a server-rendered fallback link — 38be883
