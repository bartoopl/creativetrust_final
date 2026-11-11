# Execution plan — WEW-16: internal links to retired Google Ads service pages

Source: Jira WEW-16 (https://creativetrust-team.atlassian.net/browse/WEW-16).

## Goal

No internal link on the site lands on a 3xx to `/uslugi`. `/uslugi/audyt-google-ads` becomes a real landing page (200, own title/meta/H1, in the sitemap).

## Findings

A scan of the whole public Sanity dataset (194 documents) on 2026-11-09 found the retired hrefs only in `blogPost` bodies, always as relative paths. 25 posts are affected, including the two named in the ticket:

| Retired href | Posts |
|---|---|
| `/uslugi/audyt-google-ads` | 16 |
| `/uslugi/performance-marketing/google-ads` | 13 |
| `/uslugi/performance-marketing` | 8 |
| `/uslugi/performance-marketing/meta-ads` | 1 |

The links are not in a shared CTA component: they are inline links in the Sanity content, written by `scripts/import-*.cjs`. No code in `src/` links to these paths.

## Decisions

- Variant (a) from the ticket: a new landing `/uslugi/audyt-google-ads`. No price is published (no source price exists on the site).
- `/uslugi/performance-marketing/google-ads` → `/uslugi/audyt-google-ads`: the audit is now the only Google Ads offer on the site. `/uslugi/landing-page-google-ads` is an ad landing kept out of the sitemap, so it is not a link target.
- `/uslugi/performance-marketing/meta-ads` → `/uslugi/social-media`: that page offers paid Meta Ads campaigns.
- `/uslugi/performance-marketing` → `/uslugi`: there is no performance-marketing service any more, and `/uslugi` (200) lists every service.
- One map, `RETIRED_SERVICE_PAGES` in `src/lib/retired-links.ts`, drives both the 308 redirects in `next.config.ts` (external backlinks) and the href rewrite in post bodies, so the two cannot drift.

## Why code and not Sanity

No Sanity write token is available to this run. Hrefs are rewritten in `getBlogPost`, so the HTML page and its `.md` twin both get them. A later CMS fix to the source is a no-op for the rewrite.

## Scope

- `src/lib/retired-links.ts` (new), `next.config.ts` — redirect map; `/uslugi/audyt-google-ads` no longer redirects.
- `src/lib/sanity.ts` — href rewrite for all blog posts.
- `src/app/(pl)/uslugi/audyt-google-ads/page.tsx` (new), `content/ai/uslugi/audyt-google-ads.md` (new), `src/lib/markdown/pages.ts`, `src/lib/site-services.ts` — landing, Markdown twin, menu/WebMCP listing (kept out of the English menu).
- `scripts/import-*.cjs` — source links updated, so a re-import does not bring them back.
- `scripts/retired-links.test.mjs` (new) — unit tests.

## Non-goals

- English twin of the audit page (PL-only, like the content that links to it).
- Rewriting article copy or anchors; other SEO fixes on the two articles (WEW-14 / WEW-15 PRs #20, #21).
- `ACTION-PLAN.md`, `FULL-AUDIT-REPORT.md`, `SEO-KEYWORD-STRATEGY.md`: historical audit docs, not site content.

## Risks

- `.ai/agentic.config.json` is absent. Values follow the previous runs: base `main`, runs in `.ai/runs`, GitHub tracker, gate = `typecheck`, `test`, `check:design`, `build`. `npm run lint` stays out, as in recent runs (broken on `main`).
- The sitemap is generated in `postbuild` from the filesystem; the new route is picked up there, not in the committed `public/sitemap-0.xml`.
- PRs #20 and #21 also edit `src/lib/blog-seo.ts`; this run keeps out of that file to avoid conflicts.

## Implementation Plan

### Phase 1: Link rewrite

- 1.1 Add the retired-page map, the redirects and the href rewrite with tests.
- 1.2 Update the import scripts' source links.

### Phase 2: Audit landing

- 2.1 Add the `/uslugi/audyt-google-ads` page, its Markdown twin and service listing.

## Progress

PR: #22

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Link rewrite

- [x] 1.1 Add the retired-page map, the redirects and the href rewrite with tests — 8eef969
- [x] 1.2 Update the import scripts' source links — afd14de

### Phase 2: Audit landing

- [x] 2.1 Add the /uslugi/audyt-google-ads page, its Markdown twin and service listing — a8b8130, bdb05ff
