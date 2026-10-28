# Execution plan — LLM / crawler visibility fixes (portfolio SSR, author entity, company consistency)

Source: user brief (conversation, 2026-10-28) — an external LLM-readiness audit of www.creativetrust.pl made from raw HTML (no JavaScript).

## Goal

Make every case study, the author and the company readable as consistent entities for crawlers and AI agents that do not run JavaScript: server-rendered portfolio pages with their own title/canonical/JSON-LD/Markdown twin, a canonical and a full Person entity for the author, one company description everywhere, and complete llms.txt.

## Scope

- `src/app/portfolio/**` — listing and `[slug]` become server components (data fetched on the server, ISR); interactive parts (category filter, lightbox gallery) move to small client components fed by props. Per-project `generateMetadata` (title, description, canonical, OG), `CreativeWork` + `BreadcrumbList` JSON-LD, real 404 for unknown slugs.
- `src/lib/markdown/*`, `src/app/md/[...path]/route.ts` — `portfolio` article kind: `/portfolio/<slug>.md` twin (404 Markdown for unknown slugs instead of the HTML soft 404), `Link: rel="alternate"` on project pages, "Realizacje" section in llms.txt / llms-full.txt, llms.txt lists all blog posts and knowledge-base entries (not the latest 20/30).
- `src/lib/schema.ts` — one shared company description (AI-native partner produktowy), `foundingDate: 2010` (matches the „O nas” timeline), `logo`, `buildPersonSchema` / `buildCreativeWorkSchema`; BlogPosting author becomes a full Person reference.
- `src/lib/authors.ts` — code-level profile for known authors (full name, job title) merged with Sanity data, because the Sanity author document only stores „Bartosz”.
- `src/app/blog/autor/[slug]` — own canonical, Person/ProfilePage JSON-LD; `src/app/blog/kategoria/[slug]`, `src/app/baza-wiedzy` — own canonical (same inherited-`/` bug).
- `src/app/blog/[slug]` — visible „Zaktualizowano” date when the post changed after publishing.
- Copy fixes: „Quisque” → „Quiosque” (`ClientLogos`, `content/ai/index.md`); double brand suffix in `<title>` (page titles that already contain „— CreativeTrust” plus the `%s | CreativeTrust` template).
- `next.config.ts` — 301 for the outdated „Ile kosztuje strona internetowa w 2023 roku” post → `/uslugi/tworzenie-stron-www-cennik` (current prices).
- `next-sitemap.config.js` — drop the useless `Host:` line from robots.txt.

## Non-goals

- No Sanity content edits (no write access from this run, and production content is the owner's call): the author's full name is supplied from code, the colour-trends 2023 post stays (no prices in it), article sources / own case-study numbers are content work.
- No NIP / legal company name: these facts are not in the repository and must not be invented — owner action.
- Cloudflare dashboard settings (Email Address Obfuscation on /kontakt, „Block AI bots” / AI Crawl Control) — not in the repo; listed as owner actions in the PR.
- No visual redesign of portfolio pages — markup and styles stay as they are, only where they render.
- No pipeline setup (`.ai/agentic.config.json`) — same defaults as previous runs: base `main`, GitHub via `gh`, gate = typecheck + test + check:design + build (`npm run lint` is broken on `main` already).

## Implementation Plan

### Phase 1: Portfolio server-rendered
1. Portfolio project page as a server component with metadata, canonical, CreativeWork + Breadcrumb JSON-LD and a client gallery.
2. Portfolio listing as a server component with a client category filter.

### Phase 2: Portfolio for AI agents
1. `/portfolio/<slug>.md` twin, alternate Link header, Markdown 404 for unknown slugs.
2. llms.txt / llms-full.txt: case studies section and complete blog / knowledge-base lists.

### Phase 3: Author and canonicals
1. Author profile + Person schema; author page canonical and ProfilePage JSON-LD; BlogPosting author as a full Person.
2. Own canonical for blog category and knowledge-base listing pages; visible update date on blog posts.

### Phase 4: Company consistency and small fixes
1. One company description, foundingDate 2010, logo in Organization (+ consistency test).
2. Quiosque typo, double title suffix, robots.txt Host, 301 for the outdated 2023 pricing post.

## Risks

- Server rendering depends on Sanity at build/revalidate time; pages use ISR (`revalidate`) and `generateStaticParams` so a Sanity outage at request time serves the last good page. Locally there is no Sanity token, but the public dataset is readable, so the build prerenders real projects.
- The 301 removes an indexed URL; it targets the page with the same intent (current website prices), so link equity is preserved.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Portfolio server-rendered

- [x] 1.1 Portfolio project page as a server component with metadata, canonical, CreativeWork + Breadcrumb JSON-LD and a client gallery — 58d8fc0
- [x] 1.2 Portfolio listing as a server component with a client category filter — c8be44c

### Phase 2: Portfolio for AI agents

- [ ] 2.1 Portfolio Markdown twin, alternate Link header, Markdown 404 for unknown slugs
- [ ] 2.2 llms.txt case studies section and complete blog / knowledge-base lists

### Phase 3: Author and canonicals

- [ ] 3.1 Author profile, Person schema, author page canonical and ProfilePage JSON-LD
- [ ] 3.2 Own canonical for blog category and knowledge-base pages, visible update date on posts

### Phase 4: Company consistency and small fixes

- [ ] 4.1 One company description, foundingDate 2010, Organization logo
- [ ] 4.2 Quiosque typo, double title suffix, robots.txt Host, 301 for the outdated 2023 pricing post
