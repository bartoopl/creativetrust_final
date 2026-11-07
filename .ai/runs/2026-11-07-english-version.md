# Execution plan — Angielska wersja językowa całej strony

Source: user brief (conversation, 2026-11-07) — „Potrzebuję dodać drugi język: angielski na całej stronie”.

## Goal

Cała publiczna strona marketingowa CreativeTrust jest dostępna po angielsku pod `/en/…` (angielskie slugi), z przełącznikiem PL/EN w nagłówku, poprawnym `<html lang>` i powiązaniami `hreflang` między wersjami — bez zmiany żadnego istniejącego polskiego adresu.

## Decyzje (domyślne, do ewentualnej zmiany przez właściciela)

- **Polska wersja zostaje pod dotychczasowymi adresami** (zero przekierowań, zero ryzyka SEO dla obecnego ruchu). Angielska żyje pod prefiksem `/en`.
- **Angielskie slugi** (`/en/services/websites`, `/en/about`, `/en/contact` …) — jedna mapa par PL↔EN w `src/lib/i18n.ts` napędza przełącznik języka, `hreflang` i sitemapę.
- **Dwa root layouty** (route groups): `src/app/(pl)/layout.tsx` z `lang="pl"` i `src/app/en/layout.tsx` z `lang="en"`, oba renderują wspólny `SiteShell`. Strony statyczne pozostają statyczne (bez `headers()`).
- **Treści z Sanity** (wpisy bloga, baza wiedzy, opisy case studies) zostają po polsku — tłumaczenie CMS wymaga zmian schematu i przetłumaczenia każdego artykułu. Angielska nawigacja linkuje do polskiego bloga z oznaczeniem „(PL)”, a `/en/portfolio` pokazuje listę realizacji z linkami do polskich case studies.
- Ceny zostają w PLN (oferta jest kierowana do tych samych klientów); asystent ofertowy odpowiada po angielsku na stronie `/en`.

## Scope

- `src/lib/i18n.ts` — locale, mapa tras PL↔EN, helpery `localizedHref`, `alternatePathFor`, `languageAlternates`; test `scripts/i18n.test.mjs`.
- `src/app/(pl)/…` — przeniesienie obecnych stron publicznych do grupy (URL bez zmian); `src/app/en/…` — angielskie strony.
- `src/components/SiteShell.tsx` — wspólny `<html>/<body>` (GTM, consent, schema, Header/Footer).
- Chrome: `Header` (+ przełącznik języka), `MegaMenu`, `Footer`, `CookieConsent`, `ConsentManager`, `TrustpilotReviewCollector`, `CTASection`, formularze (`ContactForm`, `LandingLeadForm`, `LeadRequest`).
- Strona główna: komponenty `home/*` + dane współdzielone (`Hero.pipeline`, `ProcessPipelineSection.steps`, `WhyUsSection.reasons`, `TestimonialSection`, `StatsSection`).
- `src/lib/site-services.ts` — angielski katalog usług; `src/app/api/offer-assistant` + `src/lib/offer-assistant.ts` — parametr `locale`.
- Wszystkie strony usług i landingi, O nas, Kontakt, Portfolio, Polityka prywatności, Regulamin.
- SEO: `alternates.languages` (hreflang) na każdej parze stron, `openGraph.locale`, `inLanguage` w schema, sitemapa.

## Non-goals

- Tłumaczenie treści z Sanity (blog, kategorie/autorzy bloga, baza wiedzy, opisy case studies) — osobny projekt (schemat i18n w Sanity + tłumaczenie artykułów).
- Angielskie bliźniaki Markdown dla agentów AI (`/en/*.md`, `llms.txt`) — zostają polskie.
- Panel admina / Sanity Studio.
- Automatyczne przekierowanie na podstawie `Accept-Language` (świadomie: Google odradza, crawler widziałby tylko jedną wersję).

## Risks

- Dwa root layouty: przejście PL↔EN to pełne przeładowanie strony (akceptowalne — zmiana języka). Nieznane adresy (404 spoza obu grup) potrzebują `global-not-found` — sprawdzane w kroku 1.2.
- `npm run lint` pada na `main` niezależnie od zmiany (circular JSON w konfiguracji eslint) — poza zakresem; `package-lock.json` jest niezsynchronizowany z `package.json` na `main` (`npm ci` nie przechodzi) — poza zakresem.
- Teksty prawne (polityka prywatności, regulamin) po angielsku to tłumaczenie informacyjne; wiążąca pozostaje wersja polska (zaznaczone na stronach).

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Fundament i18n

- [x] 1.1 Mapa tras PL↔EN i helpery i18n z testem — 16afd93
- [x] 1.2 Dwa root layouty (pl/en) ze wspólnym SiteShell — d7ec74d
- [x] 1.3 Chrome dwujęzyczny: Header z przełącznikiem, MegaMenu, Footer, cookies — 94b1d86

### Phase 2: Strona główna

- [x] 2.1 Komponenty strony głównej z kopią EN i strona /en — 1eec16d
- [x] 2.2 Asystent ofertowy i formularz kontaktu po angielsku — 1eec16d

### Phase 3: Usługi

- [ ] 3.1 /en/services i główne strony usług
- [ ] 3.2 Landingi SEO po angielsku

### Phase 4: Firma i strony prawne

- [ ] 4.1 About, Contact, Portfolio
- [ ] 4.2 Privacy policy i Terms

### Phase 5: SEO i walidacja

- [ ] 5.1 hreflang, sitemap i schema dla wersji EN
- [ ] 5.2 Pełna walidacja (test, typecheck, design check, build)
