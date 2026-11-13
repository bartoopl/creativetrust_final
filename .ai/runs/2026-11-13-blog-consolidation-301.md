# Konsolidacja bloga — etap 1: przekierowania 301

Gałąź: `feat/seo-blog-consolidation-301`
Spec: `/data/OpenBot/Shared/seo/2026-11-13-konsolidacja-blog.md`

## Cel

Osiem wpisów dubluje intencję pięciu dłuższych tekstów. Etap 1 to same 301 (bez zmian treści): historia wyszukiwania przechodzi na wpis docelowy, a linki wewnętrzne, sitemapa i `llms.txt` nie pokazują adresów, które przekierowują.

## Mapa przekierowań

| Z | NA |
|---|---|
| `/blog/jak-stworzyc-skuteczna-strone-internetowa-dla-twojego-biznesu` | `/blog/tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow` |
| `/blog/skuteczna-strona-internetowa-przyciagajaca-klientow-7-krokow-do-sukcesu-twojego-biznesu-online` | ten sam |
| `/blog/kompleksowa-usluga-budowy-strony-www-klucz-do-sukcesu-twojej-firmy` | ten sam |
| `/blog/jaka-powinna-byc-i-ile-kosztuje-strona-internetowa` | `/blog/ile-kosztuje-strona-internetowa-dla-firmy` |
| `/blog/jak-uniknac-porzucania-koszykow-podczas-platnosci-online-6-sposobow-poprawiajacych-konwersje` | `/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec` |
| `/blog/checkout-ux-bledy-ktore-obnizaja-konwersje` | ten sam |
| `/blog/kiedy-woocommerce-headless-ma-sens` | `/blog/headless-woocommerce-next-js` |
| `/blog/core-web-vitals-a-konwersja` | `/blog/core-web-vitals-w-ecommerce` |

## Zakres

- `retired-blog-posts.json`: jedno źródło dla przekierowań, sitemapy, `llms.txt` i filtra treści w CMS.
- `next.config.ts`: wpisy z tego pliku dostają `statusCode: 301` (wcześniej `permanent: true` = 308); HTML i bliźniak `.md`.
- `src/lib/retired-links.ts`: `RETIRED_BLOG_POSTS` (pochodne JSON-a) wchodzi do `RETIRED_PATHS`, więc `rewriteRetiredHref` poprawia też linki w treści z CMS.
- `src/lib/cms.ts`: wpisy z listy wypadają z indeksu bloga, kategorii, autora i „powiązanych” (`readBlogPosts` + related w `getBlogPost`).
- Testy: `scripts/retired-links.test.mjs` (mapa 1:1 ze specem, brak łańcuchów) i `scripts/blog-consolidation.test.mjs` (301 w configu, brak linków do starych URL-i w repo, filtr w CMS).

## Non-goals

- Bez zmian treści wpisów i wpisów docelowych — to etap 2 z copy Obi-Wana.
- Bez usuwania adresów, bez redirectu na home, bez merge'a.

## Plan

### Phase 1: Przekierowania

- 1.1 JSON + `next.config.ts` (301, HTML i `.md`).

### Phase 2: Linki i listy

- 2.1 `RETIRED_BLOG_POSTS` w `RETIRED_PATHS` (rewrite treści z CMS).
- 2.2 Filtr w `readBlogPosts` i w powiązanych.

### Phase 3: Bramka

- 3.1 Testy, typy, build; `curl -I` na lokalnym buildzie.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Przekierowania

- [x] 1.1 JSON + `next.config.ts` (301, HTML i `.md`) — f38a235

### Phase 2: Linki i listy

- [x] 2.1 `RETIRED_BLOG_POSTS` w `RETIRED_PATHS` (rewrite treści z CMS) — f38a235
- [x] 2.2 Filtr w `readBlogPosts` i w powiązanych — f38a235

### Phase 3: Bramka

- [x] 3.1 Testy, typy, build; `curl -I` na lokalnym buildzie — f38a235

## Etap 2, część kodowa: pogodzenie overlays z nową treścią

Nowe H2 pięciu wpisów są w `/data/OpenBot/Shared/seo/2026-11-13-konsolidacja-tresci.md`. Overlays w `blog-seo.ts` dopasowują się do tekstu H2; po przepisaniu wpisu dopasowanie po cichu znika, więc plik trzeba było przewiązać z nową treścią.

- `tworzenie-stron-internetowych-przewodnik…`: usunięta cała konfiguracja (stary title/description reklamujący WordPress, H1, mapowanie starych nagłówków, sekcja pod nieistniejącym „Krok 4”). Nowy tekst sam linkuje `/uslugi/strony-www` i audyt inline, a metadata idzie z CMS.
- `dlaczego-klienci-porzucaja-koszyki…`: `beforeHeading` przeniesione na istniejące H2 „Co mierzyć i w jakiej kolejności naprawiać”.
- `ile-kosztuje-strona-internetowa-dla-firmy`: w `links` zostaje tylko `/uslugi/strony-www`; cennik jest linkowany w treści dwa razy.
- Usunięte konfiguracje czterech wpisów z `retired-blog-posts.json`: `jak-uniknac-porzucania-koszykow…`, `jak-stworzyc-skuteczna-strone…`, `kompleksowa-usluga-budowy…`, `jaka-powinna-byc-i-ile-kosztuje…`.
- `headless-woocommerce-next-js` i `core-web-vitals-w-ecommerce` nie miały i nie mają konfiguracji.
- Testy: `blog-seo.test.mjs` (brak overlays dla pięciu slugów i brak konfiguracji dla przekierowanych), `website-links.test.mjs` (5 wpisów, 5 różnych anchorów), `service-links.test.mjs` (bez przekierowanego wpisu).

### Phase 4: Overlays po nowej treści

- [x] 4.1 `blog-seo.ts` bez martwych overlays — 4aed164
- [x] 4.2 Testy, typy, build — 4aed164
