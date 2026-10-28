# Execution plan — LLM visibility follow-ups (after PR #9)

Source: second audit pass by the user (conversation, 2026-10-28), against production after #9 was deployed.

## Goal

Close the remaining crawler gaps: the sitemap lists only URLs that return 200, the outdated colour-trends post is retired, Sanity edits (and `dateModified`) reach the site without a deploy, and `/portfolio` and author pages have Markdown twins.

## Scope

- `retired-blog-posts.json` — one list of retired posts, used by `next.config.ts` (301), `next-sitemap.config.js` (filtered from `additionalPaths`; `exclude` runs before them, which is why #9's exclude did nothing) and llms.txt.
- Colour trends 2023 → 301 to the evergreen „Psychologia kolorów w UI/UX” post.
- `export const revalidate = 3600` on every Sanity-backed page (blog, categories, author, knowledge base, homepage). Production served blog posts from the Netlify durable cache with a one-year TTL, so content edits and `dateModified` never showed without a deploy.
- `/portfolio.md` and `/blog/autor/<slug>.md` twins + `Link: rel="alternate"` on both pages.

## Non-goals

- Sanity content edits (sources in the AI Search post, numbers in case studies): production CMS content, no write access in this run — owner action.
- NIP / legal name: values not in the repository — waiting for the owner.
- Cloudflare bot settings: dashboard, not the repo.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Follow-ups

- [ ] 1.1 Sitemap lists only 200s, colour-trends post retired
- [ ] 1.2 Hourly revalidation of Sanity pages
- [ ] 1.3 Markdown twins for the portfolio index and author pages
