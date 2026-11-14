# Portfolio: szablon case study (SEO)

Gałąź: `feat/seo-portfolio-template`
Spec: `/data/OpenBot/Shared/seo/2026-11-14-portfolio-szablon.md`

## Cel

61 case studies nie linkuje do usług, a `<title>` każdego wpisu ma 70–110 znaków. Szablon ma dodać pole `seoTitle` (≤60) i blok „Powiązane usługi” z kategorii projektu — bez edycji treści wpisów.

## Zakres

- `src/payload/collections/content.ts`: pole `seoTitle` (text, maxLength 60, opis w adminie).
- Migracja `20261114_213000_portfolio_seo_title`: `seo_title` w `portfolio_projects` i `version_seo_title` w `_portfolio_projects_v` (+ snapshot JSON).
- `src/payload-types.ts`: regenerowane (`npx payload generate:types`), 5 linii.
- `src/lib/portfolio-title.ts`: `portfolioPageTitle()` — `seoTitle` wygrywa, bez niego dokładnie dawna formuła („{nazwa} — realizacja dla {klienta}”).
- `src/lib/portfolio-services.ts`: `CATEGORY_SERVICES` (strony-www → `/uslugi/strony-www`, e-commerce → `/uslugi/e-commerce`), `servicesForCategories()` — maks. 2, bez duplikatów, performance marketing celowo pominięty.
- Strona HTML: blok `<h2>Powiązane usługi</h2>` pod „Zakres prac”, przed galerią, tylko gdy lista niepusta.
- Bliźniak `.md`: ten sam blok pod `## Zakres prac`.
- `src/lib/cms.ts`: `projectCard` przenosi `seoTitle`.

## Testy

`scripts/portfolio-services.test.mjs`: mapowanie kategorii (1 / 2 / 0 linków), duplikaty, limit 2, `portfolioPageTitle` z `seoTitle` i bez (formuła 1:1), blok w `.md` pod „Zakres prac”.

## Non-goals

- Bez zmian tytułów 61 wpisów (treść — Obi-Wan), bloga, `llms.txt`, sitemapy i przekierowań.
- Bez merge'a.
