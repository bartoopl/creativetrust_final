# WEW-19: portfolio — 301 starego case study i wycofanie wpisu

Gałąź: `feat/WEW-19-portfolio-aurum-301`

## Cel

Dwa wpisy portfolio opisywały ten sam klub. Nowy (`aurumgorzow-pl`, id 63) zostaje, stary (`recznagorzow-pl`, id 32) dostaje 301 i znika z listy, sitemapy i `llms.txt`.

## Zakres

- `src/lib/retired-links.ts`: `/portfolio/recznagorzow-pl` → `/portfolio/aurumgorzow-pl` w `RETIRED_CONTENT_PAGES` (ta sama mapa zasila redirect w `next.config.ts`, proxy i przepisywanie linków w treści).
- `src/lib/canonical-redirects.ts`: bliźniak `.md` dziedziczy mapę aliasów, więc `/portfolio/recznagorzow-pl.md` → `/portfolio/aurumgorzow-pl.md` jednym skokiem (wcześniej `.md` content pages nie miały reguły).
- CMS: dokument id 32 ustawiony na `_status: draft` (unpublish, odwracalne) — publiczne API zwraca dla starego sluga 0 dokumentów, dla nowego 1.

## Testy

- `scripts/retired-links.test.mjs`: mapa 1:1 ze stanem (nowy wpis w oczekiwanej mapie).
- `scripts/canonical-redirects.test.mjs`: stary slug × {www, apex} × {bez /, z /} → dokładnie nowy URL; `.md` → `.md`; nowy wpis bez przekierowania i nie jest źródłem redirectu.

## Non-goals

- Bez zmian slugu i treści nowego wpisu, innych realizacji i adresów `/uslugi`.
- Bez merge'a; deploy zostaje dla człowieka.
