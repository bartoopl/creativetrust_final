# Odświeżenie portfolio i bloga (siatki i podstrony)

Gałąź: `feat/portfolio-blog-refresh`

## Cel

Strona główna ma już nowy język wizualny v2 („electric ink on drafting paper”: płaskie kafle Tile Gray, obraz osadzony w kaflu, duże nagłówki 500, odstępy zamiast linii). Listy i podstrony portfolio i bloga wciąż mają markup ze starego systemu Medusa (ramki `rgba(0,0,0,0.1)`, białe karty z linią pod zdjęciem, pasek filtrów jako szara belka, małe zdjęcia `object-contain` w ramkach, mono etykiety „BRAK ZDJĘCIA”, h3 jako etykiety w panelu informacji). Przenosimy te cztery widoki na język v2, żeby wyglądały jak strona główna.

## Zakres

- Karty: `CaseStudyCard` i `BlogPostCard` jako kafle v2 (wzorzec `HomeCases` / `HomeBlog`).
- Siatka portfolio (`PortfolioGrid`, PL i EN): filtry jako lekki rząd chipów bez belki, licznik wyników, siatka kafli.
- Pozycja portfolio (`/portfolio/[slug]`): nagłówek z klientem i kategoriami, duże zdjęcie główne, układ treść + przyklejona kolumna faktów (lista `dl`), galeria w układzie kolumnowym, sekcja „Zobacz też” z kolejnymi realizacjami.
- Siatka bloga (`/blog`): chipy kategorii, wyróżniony artykuł jako duży kafel, siatka 3 kolumn.
- Wpis bloga (`/blog/[slug]`): nagłówek, okładka w kaflu, typografia czytania (`PortableTextContent`), kafel autora, powiązane artykuły, jedna nawigacja powrotna.

## Non-goals

- Bez zmian danych, CMS, schematów JSON-LD, metadanych, URL-i i treści.
- Bez zmian strony głównej (HomeCases/HomeBlog) i stron kategorii/autora poza tym, co dziedziczą z nowych kart.
- Bez nowych zależności i bez zmian tokenów kolorów.

## Plan

### Phase 1: Karty
- 1.1 `CaseStudyCard` jako kafel v2 z osadzonym obrazem.
- 1.2 `BlogPostCard` jako kafel v2.

### Phase 2: Siatki
- 2.1 `PortfolioGrid`: chipy filtrów, licznik, siatka kafli.
- 2.2 `/blog`: chipy kategorii, wyróżniony kafel, siatka.

### Phase 3: Podstrony
- 3.1 Pozycja portfolio: nowy układ i „Zobacz też”.
- 3.2 Wpis bloga: nowy nagłówek, okładka, autor, powiązane.
- 3.3 `PortableTextContent`: typografia czytania v2.

### Phase 4: Testy i weryfikacja
- 4.1 Test regresji wzorca v2 w kartach i widokach.
- 4.2 Pełna bramka walidacji i zrzuty ekranu.

## Ryzyka

- Brak `.ai/agentic.config.json`: bramka walidacji przyjęta z CI i `package.json` (`typecheck`, `test`, `check:design`, `lint`, `build`).
- Zrzuty ekranu wymagają lokalnej bazy CMS; bez niej weryfikacja wizualna jest ograniczona.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Karty

- [x] 1.1 CaseStudyCard jako kafel v2 — 0ca4af0
- [x] 1.2 BlogPostCard jako kafel v2 — 9b246a8

### Phase 2: Siatki

- [x] 2.1 PortfolioGrid: chipy, licznik, kafle — 1a321c0
- [x] 2.2 Blog: chipy, wyróżniony kafel, siatka — d051f1d

### Phase 3: Podstrony

- [ ] 3.1 Pozycja portfolio: nowy układ i Zobacz też
- [ ] 3.2 Wpis bloga: nagłówek, okładka, autor, powiązane
- [ ] 3.3 PortableTextContent: typografia czytania

### Phase 4: Testy i weryfikacja

- [ ] 4.1 Test regresji wzorca v2
- [ ] 4.2 Pełna bramka walidacji i zrzuty
