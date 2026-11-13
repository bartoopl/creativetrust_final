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

- [ ] 1.1 Trzy strony: title, description, H1
- [ ] 1.2 Bliźniaki `content/ai`

### Phase 2: Linki z bloga

- [ ] 2.1 Konfiguracje `blog-seo.ts` dla 8 wpisów

### Phase 3: Bramka

- [ ] 3.1 Testy, typy i build
