# Copy SEO na strony audytu i zarządzania e-commerce

Gałąź: `feat/seo-ecommerce-audit-copy`

## Cel

Wdrożyć zatwierdzoną treść (Obi-Wan, 13.11.2026) na `/uslugi/zarzadzanie-e-commerce` i `/uslugi/audyt-e-commerce`: nowy H1 i struktura sekcji, publikowana cena audytu, CTA do formularza na `/kontakt`, 9 pytań FAQ na audycie.

## Decyzje właściciela (dosłownie)

1. Cena audytu: „3 000 zł netto”; abonament prowadzenia bez kwot, propozycja po audycie razem z roadmapą.
2. Nazwy klientów 5.10.15, Quiosque, Monnari zostają w sekcji doświadczenia.
3. CTA na obu stronach: link do formularza na `/kontakt` („Pierwsza rozmowa 15 minut”), bez kalendarza.

## Zakres

- `src/app/(pl)/uslugi/zarzadzanie-e-commerce/page.tsx`: nowy title (55 zn.) i description (150 zn.) też w OG/Twitter, nowy H1, sekcje z pliku, nazwy klientów, 6 FAQ, `FAQPage` + `BreadcrumbList` + `Service` jak dotąd.
- `src/app/(pl)/uslugi/audyt-e-commerce/page.tsx`: H1 i meta bez zmian, nowe sekcje (definicja, zakres, czas, koszt, wynik, przygotowanie), usunięty blok warunków audytu, 3 nowe FAQ (razem 9).
- `src/lib/site-services.ts`: opublikowana cena audytu w `publishedPrices` (WebMCP `get_pricing`).
- `content/ai/uslugi/*.md`: bliźniaki stron zgodne z HTML.
- Testy: `meta-lengths` (12 stron), `webmcp` (cena audytu, abonament bez ceny).

## Non-goals

- `/en/services/*`, sitemap, przekierowania, canonical, hreflang, schema breadcrumb i service poza opisem.
- Zero kwot abonamentu i wymyślonych liczb poza „3 000 zł netto” i „5-7 dni roboczych”.

## Plan

### Phase 1: Strony

- 1.1 Zarządzanie e-commerce: meta, H1, sekcje, FAQ, CTA.
- 1.2 Audyt e-commerce: sekcje, cena, 9 FAQ, CTA.

### Phase 2: Bliźniaki i dane

- 2.1 `content/ai` dla obu stron.
- 2.2 Cena audytu w `publishedPrices`.

### Phase 3: Bramka

- 3.1 Testy i build.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Strony

- [ ] 1.1 Zarządzanie e-commerce: meta, H1, sekcje, FAQ, CTA
- [ ] 1.2 Audyt e-commerce: sekcje, cena, 9 FAQ, CTA

### Phase 2: Bliźniaki i dane

- [ ] 2.1 `content/ai` dla obu stron
- [ ] 2.2 Cena audytu w `publishedPrices`

### Phase 3: Bramka

- [ ] 3.1 Testy i build
