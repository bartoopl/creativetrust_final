# Execution plan — WEW-18: SSL article vs knowledge-base entry for „co to jest ssl”

Source: Jira WEW-18 (https://creativetrust-team.atlassian.net/browse/WEW-18), brief pasted into the task on 2026-11-09.

## Goal

The blog article `/blog/ssl-co-to-jest-i-czy-jest-potrzebne-4-powody-dla-ktorych-powinienes-go-wlaczyc` is the page for „co to jest ssl”. It gets the ticket's title, meta and H1, opens with a „SSL to…” definition and has the four new H2s. `/baza-wiedzy/ssl` becomes a short glossary definition with H2s, and the two pages link to each other. No 301.

## Current state (Sanity, read 2026-11-09)

- Article `blogPost` `db20f2fc-91f1-400f-a94f-e151a9b96d1a`. H2s: Wstęp, Definicja SSL, Jak działa SSL?, Certyfikaty SSL, Korzyści z zastosowania SSL, Czy SSL jest potrzebne?, Podsumowanie. The four reasons are plain paragraphs „a) … d)”. There are no links.
- Entry `knowledgeBase` `21b4505e-c739-4593-b94f-69ba9097547d`. Title „SSL”, five paragraphs, no H2s, no links. Its seoTitle „Co to jest SSL i dlaczego jest ważny? …” targets the same query as the article.

## Scope

- `src/lib/blog-seo.ts`: a `content` field replaces the whole Sanity body of a post. The SSL article gets title, description, H1 and the rewritten body. `getBlogPost` already applies the fixes, so the page and its `.md` twin both pick them up.
- `src/lib/knowledge-base-seo.ts`: an `ssl` override with a dictionary-style H1, seoTitle, seoDescription, a short body with H2s and the link to the article. The type gains an optional `seoTitle`.
- `scripts/blog-seo.test.mjs`, `scripts/knowledge-base-seo.test.mjs`: the ticket's requirements as tests.

## Decisions

- The article body is rewritten as a whole, not patched heading by heading. It needs a new first sentence, four new sections, the reasons promoted to H3 and a link. Matching on Sanity text would be fragile at that size. The existing copy is reused where it was correct.
- „Jak działa SSL?” already exists as an H2 and is kept. The ticket's four new H2s are „Rodzaje certyfikatów SSL (DV, OV, EV)”, „Czy SSL jest potrzebny? 4 powody, by go włączyć”, „SSL a SEO” and „FAQ”. „Co to jest SSL?” replaces „Wstęp” + „Definicja SSL”, and „Jak włączyć SSL na stronie?” is added too.
- The knowledge-base seoTitle changes to a dictionary title („SSL – definicja…”), so the entry stops targeting the article's query with „Co to jest SSL…”.
- The title is the ticket's exact string (77 characters, longer than the usual 60). It is rendered as absolute so the layout template does not append a second „| CreativeTrust”.
- No FAQPage JSON-LD. Open PR #20 (WEW-14) adds FAQ schema support to the blog page. Adding it here as well would make two competing implementations of the same thing.

## Non-goals

- Editing Sanity documents: no write token is available to this run.
- A 301 redirect between the pages (ruled out by the ticket).
- Other articles and glossary entries, the blog list card title (read straight from Sanity), the English site.

## Risks

- While the overrides exist, Studio edits to the overridden fields of these two documents do not reach the site. Removing the slugs hands them back to Sanity.
- Open PRs #20 and #21 also change `src/lib/blog-seo.ts`. Whichever merges second has a mechanical conflict to resolve in the type and in `applyBlogPostFixes`.
- The GSC criterion (average position < 15 after 4–6 weeks) can only be checked after deploy.
- `.ai/agentic.config.json` is absent. Values follow the previous runs: base `main`, runs in `.ai/runs`, GitHub tracker, gate = `typecheck`, `test`, `check:design`, `build`. `lint` stays out because it is already broken on `main`.

## Implementation Plan

### Phase 1: Article

- 1.1 Add full-body replacement to blog-seo.ts and the SSL article title, meta, H1 and body with tests.

### Phase 2: Knowledge base

- 2.1 Add the ssl glossary override with H2s and the link to the article with tests.

### Phase 3: Verification

- 3.1 Run the validation gate and check the rendered HTML of both pages.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Article

- [ ] 1.1 Add full-body replacement to blog-seo.ts and the SSL article title, meta, H1 and body with tests

### Phase 2: Knowledge base

- [ ] 2.1 Add the ssl glossary override with H2s and the link to the article with tests

### Phase 3: Verification

- [ ] 3.1 Run the validation gate and check the rendered HTML of both pages
