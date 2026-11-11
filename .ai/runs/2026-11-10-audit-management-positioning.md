# Repozycjonowanie: audyt i zarządzanie e-commerce

Gałąź: `feat/audit-management-positioning`

## Cel

Strona prowadzi do dwóch głównych ofert — audytu e-commerce i zarządzania e-commerce z zewnątrz — a wdrożenia (sklepy, strony, marketing automation, social media) są trzecim filarem.

## Zasada dla treści o doświadczeniu

Wolno pisać o doświadczeniu w zarządzaniu e-commerce 5.10.15 i Quiosque oraz o pracy przy rozwoju Grupy Kapitałowej Monnari. Sformułowania są neutralne czasowo (rzeczowniki, bez „prowadziliśmy” / „prowadzimy”): strona nie wskazuje, czy współpraca trwa, czy się zakończyła. Jedno źródło: `src/lib/experience.ts`.

## Zmiany

- Strona główna: nowy hero z doświadczeniem, trzy filary oferty, model współpracy od audytu; asystent oferty przeniesiony niżej.
- Nowe podstrony: `/uslugi/audyt-e-commerce` (dawny konsulting e-commerce, 301) i `/uslugi/zarzadzanie-e-commerce`, z wersjami Markdown.
- Nawigacja, mega menu, stopka, `/uslugi`, `/o-nas`, `/kontakt`, metadane, opis firmy (JSON-LD, llms.txt), katalog usług i asystent oferty.

## Do decyzji właściciela

- Liczba projektów: wszędzie 150+ (strona główna miała wcześniej 50+).
- Cena audytu nadal niepublikowana (test `webmcp.test.mjs`).
- Opinie klientów podpisane samymi imionami; brak osoby i zdjęcia na „O nas”.
- Grafika Open Graph (`opengraph-image.png`) wciąż ma stare hasło.
- Zakres i rytm pracy na stronie zarządzania e-commerce wymagają potwierdzenia.
