# Rozdzielenie fraz stron www i linki z bloga

Gałąź: `feat/seo-websites-phrase-split`

## Cel

Trzy strony www mają różne frazy główne i różne title/description, a wpisy o stronach internetowych linkują do `/uslugi/strony-www`. Bez nowej treści i bez zmiany URL-i.

## Mapa fraz

- `/uslugi/strony-www` → „strony internetowe dla firm” (590/mies.), wspierająca „strona internetowa dla firmy” (480).
- `/uslugi/tworzenie-stron-www-cennik` → „ile kosztuje strona internetowa” (1000/mies.).
- `/uslugi/strona-firmowa-cena` → „strona www dla firmy” (260/mies.), wspierająca „strona firmowa” (140).

## Zakres

- `src/app/(pl)/uslugi/strony-www/page.tsx`: title, description (też OG/Twitter) i H1 pod „strony internetowe dla firm”.
- `src/app/(pl)/uslugi/tworzenie-stron-www-cennik/page.tsx`: description (też OG/Twitter) pod cenę; H1 „Ile kosztuje strona internetowa?”.
- `src/app/(pl)/uslugi/strona-firmowa-cena/page.tsx`: title, description (też OG/Twitter) i H1 pod „strona www dla firmy”.
- `src/lib/blog-seo.ts`: 8 wpisów o stronach/UX/SEO z jednym linkiem do `/uslugi/strony-www`, wstawianym przed istniejącym H2.
- `content/ai/uslugi/*.md`: frontmatter i H1 zgodne z HTML.
- Testy: `scripts/website-links.test.mjs`, aktualizacja `meta-lengths` i `markdown-ai`.

## Non-goals

- Bez zmian URL-i, canonicala, hreflang, sitemapy i przekierowań.
- Bez nowego copy i bez strony `/uslugi/audyt-strony-internetowej`.
- Bez linków z wpisów o sklepach.

## Plan

### Phase 1: Frazy i meta

- 1.1 Trzy strony: title, description, H1.
- 1.2 Bliźniaki `content/ai`.

### Phase 2: Linki z bloga

- 2.1 Konfiguracje `blog-seo.ts` dla 8 wpisów.

### Phase 3: Bramka

- 3.1 Testy, typy i build.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Frazy i meta

- [x] 1.1 Trzy strony: title, description, H1 — d1bd33b
- [x] 1.2 Bliźniaki `content/ai` — d1bd33b

### Phase 2: Linki z bloga

- [x] 2.1 Konfiguracje `blog-seo.ts` dla 8 wpisów — b50caed

### Phase 3: Bramka

- [x] 3.1 Testy, typy i build

## Druga tura: copy www (2026-11-13)

- Nowa strona `/uslugi/audyt-strony-internetowej`: część 1 copy, cena 1 500 zł netto, czas 5 dni roboczych, odliczenie od przebudowy, 6 FAQ, Service + BreadcrumbList + FAQPage, wpis w katalogu usług, sitemapie, `publishedPrices` i `.md`.
- `/uslugi/strony-www`: rozbudowa wg części 2 (segment, różnica wobec wizytówki, Astro i Next.js, proces, standard, technologie, 6 FAQ), H1 wraca do „Strony internetowe z konkretną rolą w sprzedaży.”.
- Linki krzyżowe: audyt e-commerce → audyt strony; audyt strony → audyt e-commerce i `/uslugi/strony-www`.
- `.md`: H1 i treść zgodne z HTML dla czterech stron.

### Phase 4: Copy www

- [x] 4.1 Nowa strona audytu z ceną i schema — cd1dd55
- [x] 4.2 Rozbudowa `/uslugi/strony-www` — 0dc61b3
- [x] 4.3 Linki krzyżowe audytów — 3ee072a
- [x] 4.4 `.md` zgodne z HTML, testy, typy, build

### Korekta po review

- [x] 4.5 Rotacja anchorów: 8 linków, 6 różnych anchorów (3× „strony internetowe dla firm”, po 1 wariancie); test sprawdza rotację.
- [x] 4.6 H1 na `/uslugi/strony-www` wraca do „Strony internetowe dla firm, które pracują na sprzedaż.” (HTML i `.md`).
