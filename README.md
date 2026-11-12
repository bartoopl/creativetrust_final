# CreativeTrust — www.creativetrust.pl

Next.js 16 + Payload CMS 3 (Postgres). Panel administracyjny: `/admin`.

- Praca lokalna, wdrożenie, backup i przeniesienie treści z Sanity: [DEPLOY.md](DEPLOY.md)
- Kolekcje CMS: `src/payload/collections/`, konfiguracja: `src/payload.config.ts`
- Odczyt treści przez strony: `src/lib/cms.ts`

```sh
npm run dev         # http://localhost:3000
npm test            # testy (node --test)
npm run typecheck
```
