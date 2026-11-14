# GSC „Nie zaindeksowano” — jednoskokowe przekierowania i robots.txt

Gałąź: `feat/seo-gsc-redirects`
Spec: `/data/OpenBot/Shared/seo/2026-11-14-gsc-niezaindeksowane.md`

## Cel

Raport GSC z 9.11.2026: 120 niezaindeksowanych stron, w tym 42 „strona zawiera przekierowanie” i 19 404. Pomiar z 14.11.2026 pokazał łańcuchy po 3 skoki (308 ukośnika → 301 hosta → 301 aliasu) i przekierowanie `/home` na 404. Etap: tylko warstwa przekierowań i `robots.txt`.

## Przyczyna łańcucha

Next dokłada własną regułę ukośnika (`/:path+/` → `/:path+`, **308**, `priority: true`) do `routes-manifest.json`. Wykonuje się przed `headers`/`redirects`, więc `redirects()` widzi już adres bez ukośnika, a każda reguła i tak poprawia tylko jedną rzecz. Stąd trzy skoki.

## Rozwiązanie

- `skipTrailingSlashRedirect: true` usuwa wewnętrzną regułę 308; `/admin` i `/api` dostają jawne reguły (API na 308, żeby nie zmienić metody POST).
- Proxy (`src/proxy.ts`) liczy finalny URL w jednym przejściu: host `creativetrust.pl` → `www`, ukośnik obcięty, alias z `RETIRED_PATHS` lub `LEGACY_REDIRECTS` rozwiązany. Jedno `NextResponse.redirect(..., 301)`.
- Cele reguł w `next.config.ts` są absolutne (`https://www.creativetrust.pl/...`), bo reguła odpalona na gołej domenie z relatywnym `Location` zostawiłaby użytkownika na niej i dołożyła drugi skok.
- `LEGACY_REDIRECTS`: `/home` → `/`, cztery adresy panelu klienta → `/kontakt`, `/uslugi/branding` → `/uslugi`.
- `robots.txt`: `Disallow: /cdn-cgi/` (artefakt Cloudflare); `Allow`, `Content-Signal` i `Sitemap` bez zmian.
- Hosty inne niż produkcyjne (localhost, staging) zachowują własne origin — test ukośnika na stagingu nie wyśle na produkcję.

## Zakres plików

- `next.config.ts`, `src/proxy.ts`, `src/lib/canonical-redirects.ts` (nowy), `src/lib/host-redirects.ts` (usunięty, stałe przeniesione), `src/lib/retired-links.ts` (komentarz).
- Testy: `scripts/canonical-redirects.test.mjs` (nowy), `scripts/hosting-redirects.test.mjs`, `scripts/check-redirects.mjs` (dokładnie 1 skok, warianty host/ukośnik, też legacy).
- `public/robots.txt`.

## Non-goals

- Bez zmian treści, `llms.txt`, `.md`, `Content-Signal`; bez zmian w mapach bloga z #43/#44 (cele bez zmian); bez merge'a.

## Plan

### Phase 1: Canonicalization

- 1.1 Moduł `canonical-redirects.ts` (host + ukośnik + alias w jednym).
- 1.2 Proxy + `skipTrailingSlashRedirect`, absolutne cele w `next.config.ts`.
- 1.3 Legacy: `/home`, panel klienta, branding.

### Phase 2: robots.txt

- 2.1 `Disallow: /cdn-cgi/`.

### Phase 3: Bramka

- 3.1 Testy jednostkowe, `check-redirects.mjs`, curl -I na lokalnym buildzie.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Canonicalization

- [ ] 1.1 Moduł `canonical-redirects.ts` (host + ukośnik + alias w jednym)
- [ ] 1.2 Proxy + `skipTrailingSlashRedirect`, absolutne cele w `next.config.ts`
- [ ] 1.3 Legacy: `/home`, panel klienta, branding

### Phase 2: robots.txt

- [ ] 2.1 `Disallow: /cdn-cgi/`

### Phase 3: Bramka

- [ ] 3.1 Testy jednostkowe, `check-redirects.mjs`, curl -I na lokalnym buildzie
