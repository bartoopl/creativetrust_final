# Execution plan — Konsulting e-commerce z płatną Diagnozą jako produktem wejściowym

Source: user brief (conversation, 2026-11-06) — „Model Sprzedaży Doradczo-Wdrożeniowej dla CreativeTrust” + doprecyzowanie: góra lejka to Diagnoza, docelowo sprzedajemy konsulting e-commerce (budowa sprzedaży, sterowanie marżą, know-how z dużych e-commerce'ów); nie wymieniamy klientów z nazwy (logotypy już są na stronie).

## Goal

Nowa podstrona `/uslugi/konsulting-e-commerce` pozycjonuje CreativeTrust jako konsultanta e-commerce i sprzedaje płatną „Diagnozę Wąskich Gardeł i Architektury eCommerce” (2 900 zł netto, 5–7 dni roboczych, koszt odliczany w pierwszym miesiącu stałej współpracy) jako pierwszy krok.

## Scope

- `src/app/uslugi/konsulting-e-commerce/page.tsx` — strona usługi na istniejących blokach (`PageHero`, `Section`, `LandingBlocks`, `LandingLeadForm`), breadcrumb + Service/FAQ schema.
- `src/lib/site-services.ts` — nowa usługa w katalogu (MegaMenu, WebMCP, asystent ofertowy) i opublikowana cena diagnozy.
- `src/components/MegaMenu.tsx` — nieparzysta liczba usług: ostatni kafel na pełną szerokość.
- `src/app/uslugi/page.tsx` — pozycja 05 na liście usług.
- `content/ai/uslugi/konsulting-e-commerce.md` + `src/lib/markdown/pages.ts` + `content/ai/uslugi.md` — markdown twin dla agentów AI.

## Non-goals

- Wewnętrzne elementy modelu sprzedaży (schemat pracy BDR, skrypt outreachu, plan postów LinkedIn) — nie trafiają na publiczną stronę.
- Nazwy klientów (Monnari, Floslek, NeoArt) — świadomie pominięte.
- Zmiany na stronie głównej.

## Risks

- Cena 2 900 zł netto publikowana publicznie — przyjęta z action planu; łatwa do zmiany w jednym miejscu (`publishedPrices` + strona + twin).

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Strona i katalog

- [ ] 1.1 Strona /uslugi/konsulting-e-commerce
- [ ] 1.2 Usługa i cena w katalogu, MegaMenu, lista usług
- [ ] 1.3 Markdown twin dla AI

### Phase 2: Walidacja

- [ ] 2.1 Testy, lint, typecheck, design check, build
