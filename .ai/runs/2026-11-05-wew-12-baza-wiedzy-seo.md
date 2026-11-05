# Execution plan — WEW-12: H1/H2 structure and internal links for the SALESmanago and CPS knowledge-base entries

Source: Jira WEW-12 (brief pasted into the task, 2026-11-05).

## Goal

`/baza-wiedzy/sales-manago` and `/baza-wiedzy/cps` ship a descriptive H1, at least four H2s in the server HTML and the internal links named in the ticket.

## Scope

- `src/lib/knowledge-base-seo.ts` — code-side override for the two entries: `headline` (H1), lead, `seoDescription`, structured Portable Text content. Follows the `src/lib/blog-seo.ts` precedent.
- `src/lib/sanity.ts` — `getKnowledgeBaseEntry` applies the override, so the page, its metadata and the Markdown twin read the same content.
- `src/app/baza-wiedzy/[slug]/page.tsx`, `src/lib/markdown/server.ts` — H1 renders `headline`, falling back to `title`.
- `scripts/knowledge-base-seo.test.mjs` — ticket requirements as tests.

## Non-goals

- Editing the Sanity documents: no write token is available in this environment.
- Changing the Sanity `title` (A–Z list, breadcrumbs and `DefinedTerm` keep the short name).
- Other knowledge-base entries; meta title of either entry; the Sanity schema.
- Licence prices or claims about named competitors: web access is blocked in this run, so nothing could be sourced.

## Implementation Plan

### Phase 1: Override and rendering

1.1 Add the override module with the content of both entries.
1.2 Apply it in `getKnowledgeBaseEntry` and render `headline` as the H1 on the page and in the Markdown twin.
1.3 Add tests.

### Phase 2: Verification

2.1 Run the validation gate and confirm H1, H2s, links and meta description in server-rendered HTML.

## Risks

- While an override exists, Sanity edits to the overridden fields of these two entries do not reach the site. Removing the slug from the module hands them back to the CMS.
- The GSC targets (CTR, position after 28 days) can only be measured after deploy.
- „Ile kosztuje SALESmanago” has no amounts, which may limit how well it answers the query. It needs a human with partner pricing knowledge.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Override and rendering

- [ ] 1.1 Add the override module with the content of both entries
- [ ] 1.2 Apply it in getKnowledgeBaseEntry and render headline as the H1
- [ ] 1.3 Add tests

### Phase 2: Verification

- [ ] 2.1 Run the validation gate and confirm the result in server-rendered HTML
