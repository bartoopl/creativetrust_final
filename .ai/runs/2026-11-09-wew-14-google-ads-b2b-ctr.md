# Execution plan — WEW-14: Google Ads dla B2B title, meta, short answer and FAQ for CTR

Source: Jira WEW-14 (https://creativetrust-team.atlassian.net/browse/WEW-14).

## Goal

`/blog/google-ads-dla-b2b-jak-zbierac-leady` gets the ticket's title and meta description, a short answer that uses „Google Ads dla usług B2B” and „AdWords B2B” verbatim, and an H2 „FAQ: Google Ads w B2B” with four questions backed by FAQPage JSON-LD.

## Scope

- `src/lib/blog-seo.ts` — per-post title and description for this slug, plus two new fix kinds: a paragraph rewrite (matched on the exact Sanity text) and an FAQ section inserted into the content.
- `src/app/(pl)/blog/[slug]/page.tsx` — emits `FAQPage` JSON-LD from the same FAQ items that are rendered.
- `scripts/blog-seo.test.mjs` — unit tests.

## Why code and not Sanity

Same as WEW-11 (PR #12): no Sanity write token for this run, and `blog-seo.ts` is the existing per-post override layer. `getBlogPost` applies it, so the page and its `.md` twin both get the changes. The paragraph fix matches the current Sanity text, so a later CMS edit wins.

## Decisions

- Title rendered as absolute, exactly as the ticket gives it, `| CreativeTrust` included (82 characters). Google cuts it around 60 characters, after „Poradnik 2026”; the keyword and the promise come first, so the cut loses only the brand.
- Meta description used verbatim (156 characters).
- FAQ goes before „Polecane kolejne kroki” (the closing links stay last); appended at the end if that heading is gone; skipped if the post already has the FAQ heading. Answers stay qualitative: the article has no cost data, so no invented price ranges.

## Non-goals

- Other posts; the H1 and the blog list card title (Sanity title stays).
- Rewriting the rest of the article body.

## Risks

- „2026” in the title goes stale in January 2027.
- The CTR criterion is measurable only ~4 weeks after deploy.
- `.ai/agentic.config.json` is absent. Values follow the previous runs: base `main`, runs in `.ai/runs`, GitHub tracker, gate = `typecheck`, `test`, `check:design`, `build`. `npm run lint` stays out, as in the recent runs.

## Implementation Plan

### Phase 1: Article overrides

- 1.1 Title, meta, short-answer rewrite and FAQ section in blog-seo.ts with tests.
- 1.2 FAQPage JSON-LD on the blog post page.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Article overrides

- [ ] 1.1 Title, meta, short-answer rewrite and FAQ section in blog-seo.ts with tests
- [ ] 1.2 FAQPage JSON-LD on the blog post page
