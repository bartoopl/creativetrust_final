# Execution plan — WEW-11: guide title, meta and heading structure for CTR

Source: Jira WEW-11 (https://creativetrust-team.atlassian.net/browse/WEW-11).

## Goal

The guide `/blog/tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow` gets a click-worthy title and meta description, a complete H2 ladder (Krok 1–6), consistent heading case and an in-text link to `/uslugi/strony-www`.

## Scope

- `src/lib/blog-seo.ts` — per-post title, description and body fixes for this slug, plus a pure `applyBlogPostFixes`.
- `src/lib/sanity.ts` — `getBlogPost` applies the fixes, so the page and its `.md` twin both get them.
- `src/app/blog/[slug]/page.tsx` — a `blog-seo.ts` title is rendered as absolute: the root `%s | CreativeTrust` template would push it past 60 characters.
- `scripts/blog-seo.test.mjs` — unit tests.

## Findings that differ from the ticket

Read from the Sanity dataset (`blogPost` `61a4187f-b758-45d0-a131-0caa25215554`):

- Krok 1 and Krok 2 exist, but as H3 (their subsections are H4). They are promoted to H2, the subsections to H3. No text is missing.
- The example title is 61 characters (limit ≤60). The dash becomes a colon: 60 characters.
- The example meta is 139 characters (range 140–155) and promises costs and common mistakes, which the article does not cover. It is rewritten to what the article delivers (147 characters).
- Same reason for the Krok 1 heading: the section covers goals, audience and scope, not budget.

## Why code and not Sanity

No Sanity write token is available to this run, and the repo already overrides per-post SEO from `blog-seo.ts`. Fixes match on the current heading text, so a later CMS edit of a heading wins and its fix becomes a no-op.

## Non-goals

- New article sections (costs, common mistakes).
- Other posts, and the Title Case title shown on blog list cards (those read Sanity directly).
- Body copy defects: the `[Profesjonalny projekt strony internetowej]` placeholder paragraph, „testowaniei”, „przez Cię przez krok po kroku”. Reported on the PR.

## Risks

- „2026” in the title goes stale in January 2027.
- The CTR > 2% criterion can only be measured 28 days after deployment.
- `.ai/agentic.config.json` is absent. Values follow the previous runs instead of generating pipeline files in an SEO PR: base `main`, runs in `.ai/runs`, GitHub tracker, gate = `lint`, `typecheck`, `test`, `check:design`, `build`.

## Implementation Plan

### Phase 1: Metadata and body fixes

- 1.1 Add the guide's title, description and body fixes with tests.
- 1.2 Apply the fixes in `getBlogPost` and render the title as absolute.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Metadata and body fixes

- [ ] 1.1 Add the guide's title, description and body fixes with tests
- [ ] 1.2 Apply the fixes in getBlogPost and render the title as absolute
