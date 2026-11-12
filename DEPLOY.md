# Wdrożenie: Payload CMS na własnym serwerze

Strona to jedna aplikacja Next.js z wbudowanym Payload CMS (panel: `/admin`).
Treści są w Postgresie, pliki na wolumenie Dockera, a przed serwerem stoi Cloudflare.

```
GitHub (push na main) ──► GitHub Actions: testy → obraz Dockera → ghcr.io ──► webhook panelu
                                                                                  │
Cloudflare (CDN, SSL) ──► serwer: panel (Coolify/Dokploy) ── docker-compose.yml ──┘
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
2. Pakiet w GHCR jest domyślnie prywatny. Serwer musi się zalogować:
   `docker login ghcr.io -u bartoopl` z tokenem PAT, który ma tylko uprawnienie `read:packages`.
   W Coolify robi się to w *Servers → Docker Registries*, w Dokploy w *Settings → Registry*.
3. Sekrety repozytorium (*Settings → Secrets and variables → Actions*):
   - `DEPLOY_WEBHOOK_URL`: webhook wdrożenia z panelu,
   - `DEPLOY_WEBHOOK_TOKEN`: tylko dla Coolify (token API); w Dokploy zostaw puste.

## 2. Jednorazowo: serwer i panel

1. W panelu utwórz zasób typu **Docker Compose** z pliku `docker-compose.yml` z repozytorium.
2. Ustaw zmienne:

   | Zmienna | Wartość |
   |---|---|
   | `POSTGRES_PASSWORD` | długie losowe hasło (`openssl rand -hex 24`) |
   | `PAYLOAD_SECRET` | losowy ciąg (`openssl rand -hex 32`); **nie zmieniaj go później**, bo wyloguje wszystkich |
   | `EMAIL_SERVER`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASSWORD`, `EMAIL_FROM`, `EMAIL_CONTACT`, `EMAIL_AUTOMATION` | jak dotąd w Netlify |
   | `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `ASSISTANT_QUOTA_SALT` | jak dotąd w Netlify |

3. Domena w panelu: `www.creativetrust.pl` (oraz `creativetrust.pl`), kierowana na usługę `app`, port `3000`.
4. Pierwsze uruchomienie tworzy tabele (migracje). Wejdź na `https://<adres-serwera>/admin`
   i załóż pierwsze konto administratora.

Zasoby: aplikacja ma limit 1 GB RAM (w praktyce zużywa ok. 300–500 MB), Postgres 512 MB,
backup 256 MB. Na serwerze nic się nie buduje.

## 3. Przeniesienie treści z Sanity

Skrypt `scripts/import-from-sanity.ts` kopiuje wszystkie wpisy, portfolio, bazę wiedzy,
autorów, kategorie i pliki. Daty z Sanity zostają, więc `lastmod` w sitemapie się nie zmienia.
Na końcu skrypt porównuje każdą treść z oryginałem. Można go uruchamiać wielokrotnie:
istniejące rekordy aktualizuje zamiast je dublować.

```sh
# nazwy sieci i wolumenu z: docker network ls / docker volume ls (panel dodaje prefiks)
docker run --rm \
  --network <projekt>_default \
  -e DATABASE_URL=postgres://creativetrust:<POSTGRES_PASSWORD>@db:5432/creativetrust \
  -e PAYLOAD_SECRET=<PAYLOAD_SECRET> \
  -v <projekt>_media:/app/media \
  ghcr.io/bartoopl/creativetrust_final:tools \
  npm run payload -- run scripts/import-from-sanity.ts

# pliki zapisane przez import mają należeć do użytkownika aplikacji
docker run --rm -v <projekt>_media:/m alpine chown -R 1001:1001 /m
```

Oczekiwany koniec: `Checked 185 documents. All content matches Sanity.`
(Liczba dokumentów wzrośnie, jeśli w międzyczasie dojdą nowe treści.)

## 4. Sprawdzenie przed przełączeniem DNS

Wystaw stronę pod tymczasową subdomeną, np. `nowa.creativetrust.pl` (rekord w Cloudflare
na IP serwera i ta sama domena w panelu), a potem z dowolnego komputera z repozytorium uruchom:

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
4. Cloudflare → SSL/TLS: tryb **Full (strict)**. Certyfikat na serwerze wystawia panel
   (Let's Encrypt) albo użyj *Origin Certificate* z Cloudflare.
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
Skopiuj wolumen na zewnątrz, np. przez `rclone sync` do Cloudflare R2, Backblaze B2 albo
Hetzner Storage Box (cron na hoście lub funkcja backupów w panelu).

Odtworzenie:

```sh
docker compose exec -T db pg_restore -U creativetrust -d creativetrust --clean < db_<data>.dump
docker run --rm -v <projekt>_media:/m -v $PWD:/b alpine tar -xzf /b/media_<data>.tar.gz -C /m
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
