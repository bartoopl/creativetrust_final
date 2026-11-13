# Linki z wpisów do stron core i eventy konwersji GA4

Gałąź: `feat/seo-core-service-links-events`

## Cel

Blog generuje 87% wyświetleń w GSC, a strony oferty 579 z 12 571. Wpisy mają linkować kontekstowo do trzech stron core (`/uslugi/audyt-e-commerce`, `/uslugi/e-commerce`, `/uslugi/zarzadzanie-e-commerce`), a GA4 ma mierzyć leady z formularzy, kliknięcia w telefon i e-mail oraz CTA.

## Zakres

- `src/lib/blog-seo.ts`: jedna sekcja-link na wpis (maks. 2 na wpis), wstawiana przed istniejącym nagłówkiem, tylko tam, gdzie sekcja faktycznie mówi o temacie; istniejący link do tego samego adresu blokuje wstawkę.
- `src/lib/analytics.ts`: `trackFormLead` (`generate_lead` z `form_name` i `page_path`), `trackContactClick` (`click_contact` z `method`), `trackCtaClick` (`cta_click` z `cta_label`).
- `LeadLinkTracking`: tel/mailto → `click_contact` + dotychczasowy `generate_lead`; klik w `[data-cta-label]` → `cta_click`.
- `ContactForm` i `LandingLeadForm`: `trackFormLead` zamiast samego `lead_source`.
- `PageHero`, `InlineCTA`, `CTASection`, `NotchedButton`: atrybut `data-cta-label` na przyciskach CTA.
- Testy: `scripts/service-links.test.mjs` (nowy), rozszerzenie `scripts/analytics.test.mjs`.

## Non-goals

- Bez zmian w CMS/Payload, w treści merytorycznej wpisów, title/description, canonical, hreflang, sitemapie, przekierowaniach i schema.
- Bez nowych zależności, bez merge i deployu.

## Plan

### Phase 1: Eventy GA4

- 1.1 Funkcje eventów w `analytics.ts`.
- 1.2 Podpięcie formularzy, kliknięć kontaktowych i CTA.

### Phase 2: Linki z wpisów

- 2.1 Konfiguracje `blog-seo.ts` dla 8 wpisów (4× audyt, 2× e-commerce, 2× zarządzanie).

### Phase 3: Testy i bramka

- 3.1 Testy linków i eventów.
- 3.2 `npm test`, `tsc --noEmit`, `npm run build`.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Eventy GA4

- [x] 1.1 Funkcje eventów w `analytics.ts` — 3eac917
- [x] 1.2 Podpięcie formularzy, kliknięć kontaktowych i CTA — 3eac917

### Phase 2: Linki z wpisów

- [x] 2.1 Konfiguracje `blog-seo.ts` dla 8 wpisów — 3054427

### Phase 3: Testy i bramka

- [x] 3.1 Testy linków i eventów — 25802b1
- [x] 3.2 `npm test`, `tsc --noEmit`, `npm run build`
