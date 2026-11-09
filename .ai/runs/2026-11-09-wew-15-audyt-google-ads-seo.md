# Execution plan — WEW-15: audit checklist article for „audyt google ads”

Source: Jira WEW-15 (https://creativetrust-team.atlassian.net/browse/WEW-15).

## Goal

`/blog/audyt-konta-google-ads-checklista` ships the ticket's title, meta description and H1, a 30-point checklist split into five audit areas (H3), an H2 on duration and cost that links to `/blog/ile-kosztuje-audyt-google-ads`, and two links back to it: from the cost article („checklista audytu Google Ads”) and from `/blog/google-ads-dla-b2b-jak-zbierac-leady` („audyt konta Google Ads”).

## Scope

- `src/lib/blog-seo.ts`: per-post overrides for the three slugs. The single `inlineLink` becomes a list of `sections`. Each one either replaces an H2 section or inserts blocks before a heading, using short authored blocks (headings, paragraphs, bullets, links).
- `scripts/blog-seo.test.mjs`: the ticket's acceptance criteria as tests.

## Findings from Sanity (public read, 2026-11-09)

- The checklist post `geo-seo-blog-2026-audyt-konta-google-ads-checklista` already has a nearly matching title. The H1 gains the comma before „gdzie” and drops „konta”, as the ticket asks.
- „Jak podejść do tematu krok po kroku?” has one paragraph and six generic bullets. It is replaced by an H2 „Checklista audytu Google Ads: 30 punktów w 5 obszarach” and five H3 areas with six bullets each (30 in total), so the title's „30 punktów” matches the content. A test enforces this.
- The ticket title is 76 characters with the brand. The keyword sits at the front, so if Google truncates, only the brand is lost. It is rendered as given (absolute, without a second `| CreativeTrust`).

## Why code and not Sanity

Same as WEW-11 and WEW-12: this run has no Sanity write token, and `blog-seo.ts` is the existing override layer. A fix matches the current Sanity heading text. Once an editor changes that heading, the fix stops applying, and an insert is skipped when its link already exists in the CMS.

## Non-goals

- The template sections every 2026 GEO post shares („Jak uwzględnić GEO i AI Search?”, „Checklist przed wdrożeniem”, which is about content, not ads). Reported on the PR.
- Prices or durations in numbers: none are published on the site, so none are invented.
- Other posts, blog list cards (they read Sanity directly), Jira status.

## Risks

- „(2026)” in the title goes stale in January 2027.
- The position < 20 criterion can only be measured 4–6 weeks after deploy.
- While the override exists, Sanity edits to the replaced section do not reach the site until its heading changes.
- `.ai/agentic.config.json` is absent. Values follow the previous runs: base `main`, runs in `.ai/runs`, GitHub tracker, gate = `typecheck`, `test`, `check:design`, `build`. `lint` stays out: it is already broken on `main`.

## Implementation Plan

### Phase 1: Overrides

- 1.1 Generalise inline links into section replacements and inserts.
- 1.2 Add the checklist, cost and B2B article overrides with tests.

### Phase 2: Verification

- 2.1 Run the validation gate.

## Progress

PR: #21

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Overrides

- [x] 1.1 Generalise inline links into section replacements and inserts — 0a3e093
- [x] 1.2 Add the checklist, cost and B2B article overrides with tests — c38c912

### Phase 2: Verification

- [x] 2.1 Run the validation gate — c38c912
