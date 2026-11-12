# Wdrożenie: Payload CMS na własnym serwerze

Strona to jedna aplikacja Next.js z wbudowanym Payload CMS (panel: `/admin`).
Treści są w Postgresie, pliki na wolumenie Dockera, a przed serwerem stoi Cloudflare.

```
GitHub (push na main) ──► GitHub Actions: testy → obraz Dockera → ghcr.io ──► API Dokploy (compose.deploy)
                                                                                  │
Cloudflare (CDN, SSL) ──► serwer: Dokploy ── usługa Docker Compose (docker-compose.yml) ──┘
                                     app (Next + Payload) · db (Postgres 17) · backup (cron)
```

Obraz buduje się w CI **bez dostępu do bazy**. Strony z CMS-a (blog, portfolio,
baza wiedzy, sitemapa, llms.txt) renderują się na żądanie z danych trzymanych
w cache. Zapis w `/admin` czyści ten cache od razu, a bez zapisu dane odświeżają
się co godzinę. Migracje bazy wykonują się same przy starcie kontenera
(`prodMigrations` w `src/payload.config.ts`).

## 1. Jednorazowo: GitHub

1. Workflow `.github/workflows/deploy.yml` publikuje obrazy:
   - `ghcr.io/bartoopl/creativetrust_final:latest` (strona),
   - `ghcr.io/bartoopl/creativetrust_final:tools` (narzędzia: import, komendy Payload).
2. Pakiet w GHCR jest domyślnie prywatny, więc Dokploy musi się logować: *Settings → Registry →
   Add Registry*, URL `ghcr.io`, użytkownik `bartoopl`, hasło: token *classic* z uprawnieniem
   `read:packages` (do samego pobierania obrazów to wystarczy).
3. Sekrety repozytorium (*Settings → Secrets and variables → Actions*). Panel Dokploy jest
   dostępny tylko w sieci NetBird, więc job `deploy` dołącza do niej na czas wywołania API:
   - `NETBIRD_SETUP_KEY`: NetBird → *Setup Keys → Create*: **Reusable** i **Ephemeral peers**
     włączone, grupa, której polityka *Access Control* pozwala łączyć się z serwerem Dokploy
     (`100.64.245.228`, port 3000),
   - `DOKPLOY_URL`: `http://100.64.245.228:3000` *(ustawione)*,
   - `DOKPLOY_API_KEY`: Dokploy → *Settings → API Keys* *(ustawione)*,
   - `DOKPLOY_COMPOSE_ID`: ID usługi compose `creativetrust` *(ustawione)*.

## 2. Jednorazowo: serwer i panel

> Stan na 12.11.2026: w Dokploy jest już projekt **CreativeTrust** z usługą compose
> `creativetrust` (źródło *Raw*, Isolated Deployments włączone, auto-deploy wyłączony),
> wygenerowanymi `POSTGRES_PASSWORD` / `PAYLOAD_SECRET` i domeną testową
> `creativetrust.91.98.140.18.sslip.io`. Do uzupełnienia: zmienne `EMAIL_*` i `ANTHROPIC_*`.
> Plik compose w Dokploy to kopia z repozytorium; po zmianie `docker-compose.yml` wklej go
> ponownie (*General → Compose file*).

1. W projekcie Dokploy dodaj usługę **Compose** (typ *Docker Compose*), źródło: to repozytorium
   (gałąź `main`, plik `docker-compose.yml`) albo wklejony plik (*Raw*). **Auto Deploy wyłącz**,
   bo wdrożenia wyzwala GitHub Actions dopiero po zbudowaniu obrazu.
2. *Advanced → Utilities*: włącz **Isolated Deployments**. Wtedy wszystkie usługi (app, db,
   backup) są w jednej sieci razem z Traefikiem. Bez tego Dokploy podłącza do Traefika tylko
   usługę z domeną i aplikacja może stracić połączenie z bazą.
3. Zakładka *Environment* (Dokploy zapisuje ją do `.env`, a compose czyta zmienne przez `${…}`):

   | Zmienna | Wartość |
   |---|---|
   | `POSTGRES_PASSWORD` | długie losowe hasło (`openssl rand -hex 24`) |
   | `PAYLOAD_SECRET` | losowy ciąg (`openssl rand -hex 32`); **nie zmieniaj go później**, bo wyloguje wszystkich |
   | `EMAIL_SERVER`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`, `EMAIL_CONTACT`, `EMAIL_AUTOMATION` | jak dotąd w Netlify |
   | `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `ASSISTANT_QUOTA_SALT` | jak dotąd w Netlify |

4. Zakładka *Domains*: `www.creativetrust.pl` i `creativetrust.pl`, usługa `app`, port `3000`,
   HTTPS włączone (Let's Encrypt). Na czas testów dodaj też `nowa.creativetrust.pl`.
5. *Deploy*. Pierwsze uruchomienie tworzy tabele (migracje). Wejdź na `https://nowa.creativetrust.pl/admin`
   i załóż pierwsze konto administratora.

Zasoby: aplikacja ma limit 1 GB RAM (w praktyce zużywa ok. 300–500 MB), Postgres 512 MB,
backup 256 MB. Na serwerze nic się nie buduje.

## 3. Przeniesienie treści z Sanity

Skrypt `scripts/import-from-sanity.ts` kopiuje wszystkie wpisy, portfolio, bazę wiedzy,
autorów, kategorie i pliki. Do tego przypina projektom technologie wymienione w opisach
(WordPress, WooCommerce, Next.js…), dokładając je do przypiętych ręcznie, nigdy nie usuwając. Daty z Sanity zostają, więc `lastmod` w sitemapie się nie zmienia.
Na końcu skrypt porównuje każdą treść z oryginałem. Można go uruchamiać wielokrotnie:
istniejące rekordy aktualizuje zamiast je dublować.

```sh
# na serwerze (SSH); nazwy sieci i wolumenu: docker network ls / docker volume ls
# (Dokploy nadaje im prefiks z nazwy usługi, np. creativetrust-abc123_media)
docker run --rm \
  --network <nazwa-uslugi> \
  -e DATABASE_URL=postgres://creativetrust:<POSTGRES_PASSWORD>@db:5432/creativetrust \
  -e PAYLOAD_SECRET=<PAYLOAD_SECRET> \
  -e REVALIDATE_URL=http://app:3000/api/revalidate \
  -v <nazwa-uslugi>_media:/app/media \
  ghcr.io/bartoopl/creativetrust_final:tools \
  npm run payload -- run scripts/import-from-sanity.ts

# pliki zapisane przez import mają należeć do użytkownika aplikacji
docker run --rm -v <nazwa-uslugi>_media:/m alpine chown -R 1001:1001 /m
```

Oczekiwany koniec: `Checked 185 documents. All content matches Sanity.` oraz `Site cache cleared.`
(bez czyszczenia cache strona przez godzinę pokazywałaby stan sprzed importu).
(Liczba dokumentów wzrośnie, jeśli w międzyczasie dojdą nowe treści.)

## 4. Sprawdzenie przed przełączeniem DNS

Wystaw stronę pod tymczasową subdomeną `nowa.creativetrust.pl` (rekord A w Cloudflare na IP
serwera, domena dodana w Dokploy), a potem z dowolnego komputera z repozytorium uruchom:

```sh
node scripts/check-urls.mjs --candidate https://nowa.creativetrust.pl
```

Skrypt sprawdza każdy adres z obecnej sitemapy, wersje `.md` dla AI, przekierowania
wycofanych wpisów, `llms.txt` i `robots.txt`, a potem porównuje kody odpowiedzi i cele
przekierowań z produkcją. Lokalnie wynik to 400/401. Jedyna różnica to
`/uslugi/audyt-google-ads`, które celowo przekierowuje na `/uslugi`.

## 5. Przełączenie

1. Wstrzymaj edycję treści w Sanity.
2. Uruchom import jeszcze raz (punkt 3), żeby dociągnąć ostatnie zmiany.
3. Cloudflare → DNS: rekordy `www` i `@` jako **A na IP serwera, Proxied** (pomarańczowa chmurka);
   usuń rekordy Netlify.
4. Cloudflare → SSL/TLS: tryb **Full (strict)**. Certyfikat na serwerze wystawia Dokploy
   (Let's Encrypt). Jeśli jego wystawienie przez proxy Cloudflare się nie uda, na chwilę wyłącz
   proxy (szara chmurka) albo użyj *Origin Certificate* z Cloudflare.
5. Cloudflare → Caching → Cache Rules:
   - `/api/media/file/*`: *Eligible for cache* (pliki mają `s-maxage` na 30 dni),
   - `/admin*` i `/api/*` poza mediami: *Bypass cache*.
6. Po kilku godzinach bez błędów:
   - **Ustaw dataset Sanity jako prywatny albo go usuń.** Dziś jest publiczny i można z niego
     bez logowania pobrać dane klientów (e-maile, NIP-y) i faktury.
   - Wyłącz stronę w Netlify.

## 6. Backup

Usługa `backup` co noc o 3:00 zapisuje do wolumenu `backups`:
- `db_<data>.dump`: zrzut bazy,
- `media_<data>.tar.gz`: wszystkie pliki.

Przechowuje 14 dni. **Kopia tylko na tym samym serwerze nie chroni przed jego utratą.**
Najprościej w Dokploy: *Volume Backups* dla wolumenów `backups` (albo bezpośrednio `pgdata`
i `media`) do zewnętrznego S3, np. Cloudflare R2 lub Backblaze B2, ustawione w *Settings → S3 Destinations*.
Alternatywa: `rclone sync` z crona na hoście.

Odtworzenie:

```sh
docker exec -i <kontener-db> pg_restore -U creativetrust -d creativetrust --clean < db_<data>.dump
docker run --rm -v <nazwa-uslugi>_media:/m -v $PWD:/b alpine tar -xzf /b/media_<data>.tar.gz -C /m
```

## Praca lokalna

Wymagany Node 22 (Payload nie działa jeszcze na Node 26) i Postgres.

```sh
cp .env.example .env              # DATABASE_URL, PAYLOAD_SECRET
npm ci
npm run payload -- migrate        # tabele
npm run payload -- run scripts/import-from-sanity.ts   # opcjonalnie: treści z Sanity
npm run dev                       # http://localhost:3000, panel: /admin
```

Zmiana pól w kolekcjach (`src/payload/collections/*`) wymaga nowej migracji:

```sh
npm run payload -- migrate:create opis-zmiany
npm run payload -- generate:types
```

Commituj migrację razem z kodem; serwer wykona ją sam przy następnym wdrożeniu.
