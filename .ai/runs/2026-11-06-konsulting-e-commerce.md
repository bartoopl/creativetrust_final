# Execution plan — Konsulting e-commerce z płatną Diagnozą jako produktem wejściowym

Source: user brief (conversation, 2026-11-06) — „Model Sprzedaży Doradczo-Wdrożeniowej dla CreativeTrust” + doprecyzowanie: góra lejka to Diagnoza, docelowo sprzedajemy konsulting e-commerce (budowa sprzedaży, sterowanie marżą, know-how z dużych e-commerce'ów); nie wymieniamy klientów z nazwy (logotypy już są na stronie).

## Goal

Nowa podstrona `/uslugi/konsulting-e-commerce` pozycjonuje CreativeTrust jako konsultanta e-commerce i sprzedaje płatną „Diagnozę Wąskich Gardeł i Architektury eCommerce” (2 900 zł netto, 5–7 dni roboczych, koszt odliczany w pierwszym miesiącu stałej współpracy) jako pierwszy krok.

## Scope

- `src/app/uslugi/konsulting-e-commerce/page.tsx` — strona usługi na istniejących blokach (`PageHero`, `Section`, `LandingBlocks`, `LandingLeadForm`), breadcrumb + Service/FAQ schema.
- `src/lib/site-services.ts` — nowa usługa w katalogu (MegaMenu, WebMCP, asystent ofertowy) i opublikowana cena diagnozy.
- `src/components/Footer.tsx` — link w kolumnie usług.
- `src/components/MegaMenu.tsx` — nieparzysta liczba usług: ostatni kafel na pełną szerokość.
- `src/app/uslugi/page.tsx` — pozycja 05 na liście usług.
- `content/ai/uslugi/konsulting-e-commerce.md` + `src/lib/markdown/pages.ts` + `content/ai/uslugi.md` — markdown twin dla agentów AI.

## Non-goals

- Wewnętrzne elementy modelu sprzedaży (schemat pracy BDR, skrypt outreachu, plan postów LinkedIn) — nie trafiają na publiczną stronę.
- Nazwy klientów (Monnari, Floslek, NeoArt) — świadomie pominięte.
- Zmiany na stronie głównej.

## Risks

- `npm run lint` (eslint) pada na `main` niezależnie od zmiany (circular JSON w konfiguracji) — poza zakresem.
- Cena 2 900 zł netto publikowana publicznie — przyjęta z action planu; łatwa do zmiany w jednym miejscu (`publishedPrices` + strona + twin).

## Progress

PR: #15

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Strona i katalog

- [x] 1.1 Strona /uslugi/konsulting-e-commerce — bcfabe0
- [x] 1.2 Usługa i cena w katalogu, MegaMenu, lista usług — fc8abd2
- [x] 1.3 Markdown twin dla AI — 1046c1a

### Phase 2: Walidacja

- [x] 2.1 Testy, lint, typecheck, design check, build — 1046c1a
