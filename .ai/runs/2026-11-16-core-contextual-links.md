# Tor B: linki kontekstowe z 8 stron do core

Gałąź: `feat/seo-core-contextual-links`
Spec: `/data/OpenBot/Shared/seo/2026-11-16-tor-b-core.md`, sekcja 5.

## Cel

Strony core nie mają linków kontekstowych — 1 793 linki wewnętrzne to praktycznie samo menu. Z ośmiu stron o największych wyświetleniach dodajemy po jednym linku do strony usługowej, w akapicie merytorycznym, bez edycji treści.

## Wdrożenie

- `src/lib/blog-seo.ts`: sekcje dla `audyt-konta-google-ads-checklista`, `google-ads-dla-b2b-jak-zbierac-leady` i nowa konfiguracja `ile-kosztuje-reklama-na-facebooku-przewodnik-po-kosztach`; wstawka przed istniejącym H2, `applySection` pomija wpis, który już linkuje cel.
- `src/lib/knowledge-base-seo.ts`: nowy mechanizm `inserts` — akapit przed blokiem o podanym tekście, pomijany gdy link już jest; wpisy `marketing-automation` i `webinar` dostały po jednym akapicie, a override `sales-manago` link w treści.
- Dwa źródła miały już link do celu (SSL → `/uslugi/strony-www`, przewodnik → `/uslugi/audyt-strony-internetowej`) — bez zmian, żeby nie dublować.
- Testy: `scripts/core-contextual-links.test.mjs` (anchor, href, miejsce przed H2, brak podwojenia, puste przy braku kotwicy).

## Non-goals

- Bez zmian treści, tytułów, meta, `llms.txt`, `Content-Signal` i sitemapy. Bez merge'a.
