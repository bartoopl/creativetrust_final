# SEO Action Plan — CreativeTrust.pl

**Generated:** 2026-05-02  
**Overall Score:** 39 / 100  
**Target Score (after all actions):** ~72 / 100

---

## CRITICAL — Fix Immediately (each < 2 hours)

### 1. Unblock Google-Extended, GPTBot, ClaudeBot in robots.txt

**Impact:** Unlocks Google AI Overviews, ChatGPT Search, Claude citations. Highest single-action ROI.  
**Where:** Cloudflare dashboard → Security → Bots → robots.txt management  
**What to remove:**
```
User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /
```
**What to update (Content-Signal line):**
```
Content-Signal: search=yes,ai-input=yes,ai-train=no
```
The `ai-train=no` signal already handles training restriction under EU DSM Art. 4. These crawlers need not be blocked.

---

### 2. Remove duplicate `<title>` tag from layout.tsx

**File:** `src/app/layout.tsx:129`  
**Delete this line:**
```tsx
<title>Creative Trust</title>
```
The Next.js Metadata API (`export const metadata`) handles title tags correctly. The hardcoded tag creates a duplicate on every single page.

---

### 3. Fix sitemap domain (non-www → www)

**File:** `next-sitemap.config.js:3`  
**Change:**
```js
// FROM:
siteUrl: 'https://creativetrust.pl',
// TO:
siteUrl: 'https://www.creativetrust.pl',
```
Then redeploy. This also fixes the `robots.txt` `Host:` and `Sitemap:` directives automatically.

---

### 4. Fix placeholder title on /uslugi/strony-www

**File:** `src/app/uslugi/strony-www/page.tsx:7`  
**Change:**
```ts
// FROM:
title: 'Strony WWW | Twoja Agencja',
// TO:
title: 'Tworzenie stron internetowych dla firm | CreativeTrust',
```

---

### 5. Add metadataBase to root layout

**File:** `src/app/layout.tsx`  
**Change:**
```ts
export const metadata: Metadata = {
    metadataBase: new URL('https://www.creativetrust.pl'), // ADD THIS
    title: 'CreativeTrust | Agencja Marketingowa',
    description: 'Agencja marketingowa specjalizująca się w performance marketingu, tworzeniu stron WWW, e-commerce, brandingu i marketing automation.',
};
```
This is a prerequisite for canonical tags and OG URLs to resolve correctly.

---

### 6. Fix /panel-klienta in sitemap

**File:** `next-sitemap.config.js`  
**Change:**
```js
exclude: [
    '/admin/*',
    '/login-admin',
    '/logowanie-klienta',
    '/panel-klienta',   // ADD THIS (without wildcard)
    '/panel-klienta/*',
    '/rejestracja-klienta'
],
```

---

### 7. Fix SALESmanago misspelling

**File:** `src/app/uslugi/marketing-automation/page.tsx`  
**Change:**
```ts
// FROM:
title: 'Marketing Automation | Creativetrust - Partner Sales Manago',
// TO:
title: 'Marketing Automation | CreativeTrust — Oficjalny Partner SALESmanago',
```

---

### 8. Remove userScalable: false from viewport

**File:** `src/app/layout.tsx:19-24`  
**Change:**
```ts
// FROM:
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};
// TO:
export const viewport = {
    width: 'device-width',
    initialScale: 1,
};
```

---

### 9. Add poweredByHeader: false to next.config.ts

**File:** `next.config.ts`  
**Change:**
```ts
const nextConfig: NextConfig = {
    poweredByHeader: false, // ADD THIS
    // ... rest of config
}
```

---

## HIGH — Fix Within 1 Week

### 10. Convert /google-ads and /meta-ads to Server Component wrappers

Both pages are `"use client"` components and cannot export metadata. Pattern to apply:

```tsx
// src/app/uslugi/performance-marketing/google-ads/page.tsx
import type { Metadata } from 'next';
import GoogleAdsClient from './GoogleAdsClient'; // move all current content here

export const metadata: Metadata = {
    title: 'Kampanie Google Ads | Agencja Google Partner — CreativeTrust',
    description: 'Skuteczne kampanie Google Ads nastawione na ROAS i konwersje. Zarządzamy budżetami od 5 000 zł/mies. Bezpłatny audyt kampanii w 48h.',
    alternates: { canonical: 'https://www.creativetrust.pl/uslugi/performance-marketing/google-ads' },
    openGraph: {
        title: 'Kampanie Google Ads | CreativeTrust',
        description: 'Skuteczne kampanie Google Ads — zarządzanie, optymalizacja, raportowanie.',
        url: 'https://www.creativetrust.pl/uslugi/performance-marketing/google-ads',
    },
};

export default function GoogleAdsPage() {
    return <GoogleAdsClient />;
}
```

Create `GoogleAdsClient.tsx` with `"use client"` at top, containing all the current page content.  
Apply the same pattern to `/meta-ads/page.tsx` (delete the orphaned `metadata.ts` file).

---

### 11. Add canonical tags to all pages

For each service page and static page, add `alternates.canonical` to the `metadata` export:

```ts
// Example for /uslugi/performance-marketing/page.tsx
export const metadata: Metadata = {
    title: 'Performance Marketing | Skuteczne kampanie — CreativeTrust',
    alternates: {
        canonical: 'https://www.creativetrust.pl/uslugi/performance-marketing',
    },
    // ...
};
```

For dynamic pages (blog, portfolio, baza-wiedzy), use `generateMetadata`:
```ts
export async function generateMetadata({ params }) {
    const { slug } = await params;
    return {
        alternates: {
            canonical: `https://www.creativetrust.pl/blog/${slug}`,
        },
    };
}
```

---

### 12. Add Open Graph tags to all service pages

Add `openGraph` and `twitter` to each service page metadata. Minimum required:
```ts
openGraph: {
    title: 'Performance Marketing | CreativeTrust',
    description: 'Zwiększ sprzedaż i ROI dzięki kampaniom performance marketingu.',
    url: 'https://www.creativetrust.pl/uslugi/performance-marketing',
    siteName: 'CreativeTrust',
    locale: 'pl_PL',
    type: 'website',
},
twitter: {
    card: 'summary_large_image',
    title: 'Performance Marketing | CreativeTrust',
},
```

---

### 13. Add Organization + LocalBusiness JSON-LD to root layout

**File:** `src/app/layout.tsx`  
Create `/src/lib/schema.ts` and add:

```ts
export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.creativetrust.pl/#organization",
      "name": "CreativeTrust",
      "url": "https://www.creativetrust.pl",
      "foundingDate": "2016",
      "description": "Agencja marketingowa specjalizująca się w performance marketingu, tworzeniu stron WWW, e-commerce, brandingu i marketing automation.",
      "email": "office@creativetrust.pl",
      "telephone": "+48570526421",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Kombatantów 34/500",
        "addressLocality": "Gorzów Wielkopolski",
        "postalCode": "66-400",
        "addressCountry": "PL"
      },
      "sameAs": [
        "https://www.linkedin.com/company/creativetrust",
        "https://www.facebook.com/creativetrustpl/",
        "https://www.instagram.com/creativetrust_/"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.creativetrust.pl/#localbusiness",
      "name": "CreativeTrust",
      "url": "https://www.creativetrust.pl",
      "telephone": "+48570526421",
      "email": "office@creativetrust.pl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Kombatantów 34/500",
        "addressLocality": "Gorzów Wielkopolski",
        "postalCode": "66-400",
        "addressCountry": "PL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 52.7369,
        "longitude": 15.2288
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }]
    }
  ]
};
```

In `layout.tsx`, inside `<head>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

---

### 14. Fix /uslugi/strony-www title inconsistency and add inline form

**Title:** Change to `'Tworzenie stron internetowych dla firm | CreativeTrust'` (done in item #4)  
**Form:** Add a `WebsiteQuoteForm` component between the benefits section and portfolio. The form should include a budget select field. Reuse the existing `PerformanceMarketingForm` as a template.  
**Section order change:** Move the portfolio/realizacje section to position 2 (before the technology section).

---

### 15. Fix duplicate GA4 + gtag definition in layout.tsx

**File:** `src/app/layout.tsx`  
Remove the standalone GA4 initialization from the inline script (lines ~120–126). Keep only GTM initialization. GA4 should fire through GTM, not directly. Also remove the second `gtag` function definition.

---

### 16. Add BlogPosting schema to blog posts

**File:** `src/app/blog/[slug]/page.tsx`  
Add to the existing `generateMetadata` or as a separate script tag in the page:

```tsx
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt || post.seoDescription,
  "url": `https://www.creativetrust.pl/blog/${post.slug.current}`,
  "datePublished": post.publishedAt,
  "dateModified": post._updatedAt || post.publishedAt,
  "image": post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
  "author": { "@type": "Person", "name": post.author?.name },
  "publisher": {
    "@type": "Organization",
    "@id": "https://www.creativetrust.pl/#organization",
    "name": "CreativeTrust"
  }
};
```

Add `_updatedAt` to the Sanity GROQ query in `getBlogPost()`.

---

## MEDIUM — Fix Within 1 Month

### 17. Add FAQPage schema to service pages with FAQ sections

Apply to: /performance-marketing, /google-ads, /meta-ads, /e-commerce, /branding  
See full JSON-LD template in `FULL-AUDIT-REPORT.md § Schema` section.  
**Note:** FAQPage will not produce Google rich results for commercial pages, but boosts AI Overview and Perplexity citation probability.

---

### 18. Add BreadcrumbList schema to all nested pages

Add to service sub-pages (`/uslugi/performance-marketing/google-ads`), all blog posts, all portfolio pages, and all baza-wiedzy entries. See template in `FULL-AUDIT-REPORT.md`.

---

### 19. Add DefinedTerm schema to all /baza-wiedzy entries

**File:** `src/app/baza-wiedzy/[slug]/page.tsx`  
This is the highest-GEO-impact schema change — glossary entries are exactly the content AI systems cite. Template provided in `FULL-AUDIT-REPORT.md § Schema § 4f`.

---

### 20. Create /llms.txt

Create `public/llms.txt` with curated AI-friendly content map. Template provided in `FULL-AUDIT-REPORT.md § GEO § 7`. Key sections: agency description, services with URLs, baza-wiedzy index, blog, contact.

---

### 21. Add security headers

**File:** `next.config.ts` (or `netlify.toml`)  
```ts
async headers() {
    return [{
        source: '/(.*)',
        headers: [
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
            { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
    }];
},
```

---

### 22. Fix cache headers for better TTFB

**File:** `netlify.toml`  
```toml
[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### 23. Add preconnect for cdn.sanity.io

**File:** `src/app/layout.tsx` — add inside `<head>`:
```tsx
<link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
<link rel="dns-prefetch" href="https://cdn.sanity.io" />
```

---

### 24. Move GTM snippet to after `<body>` open

**File:** `src/app/layout.tsx`  
Move the GTM `<script>` from `<head>` to immediately after `<body>` opens (before `<noscript>`). This removes it from the critical render path and reduces LCP by an estimated 200–500ms.

---

### 25. Add priority prop to hero images

**Files:** Hero component, service page hero `<Image>` components  
```tsx
<Image src={...} alt={...} priority /> // ADD priority to above-fold LCP images
```

---

### 26. Convert homepage portfolio/blog sections to server components

Currently these sections use `animate-pulse` skeleton loaders (client-side Sanity fetch). Convert to async Server Components so content is present in initial HTML. This eliminates CLS from skeleton→content transitions and improves LCP.

---

### 27. Fix lastmod in sitemap to use Sanity _updatedAt

**File:** `next-sitemap.config.js`  
```js
// Change in all additionalPaths entries:
// FROM:
lastmod: new Date().toISOString(),
// TO:
lastmod: post._updatedAt || new Date().toISOString(),
```
Requires adding `_updatedAt` to each Sanity GROQ query.

---

### 28. Add baza-wiedzy to header navigation

**File:** `src/components/Header.tsx` or the MegaMenu component  
Add "Baza wiedzy" as a navigation item (either top-level or under a "Wiedza" section). The 35-entry glossary receives zero internal link traffic from commercial pages and is completely absent from header navigation.

---

### 29. Add service links to footer

**File:** `src/components/Footer.tsx`  
Add a "Usługi" column listing all 7 service pages. Currently the footer contains no service links at all.

---

### 30. Add privacy policy links to contact forms

Service page contact forms (PerformanceMarketingForm, EcommerceForm, BrandingForm) collect personal data without linking to the privacy policy. Under RODO (Polish GDPR), this is required at the point of data collection.

---

## LOW — Backlog

### 31. Fix year inconsistency across pages

"7+ lat" vs. "8+ lat" — the correct value in May 2026 (founding: 2016) is "9+ lat". Centralize this as a constant in a shared config file or Sanity document.

**Affected pages:** `src/app/uslugi/strony-www/page.tsx`, `src/app/uslugi/page.tsx`, `src/app/o-nas/page.tsx`

---

### 32. Fix blog index title

**File:** `src/app/blog/page.tsx`  
Change `title: 'Blog - Agencja Marketingowa'` to `title: 'Blog — CreativeTrust | Marketing i Technologia'`.

---

### 33. Add team member profiles to /o-nas

Add 3–4 team member entries with name, role, years of experience, and headshot. This is the highest E-E-A-T content improvement available without new case studies. Can be built as Sanity documents and rendered dynamically.

---

### 34. Source statistics or add attribution

Pages with unsourced statistics that should be attributed:
- Branding page: "39x większa szansa", "81% wymaga zaufania"
- Marketing automation page: "12.2x ROI", "67% firm osiągnęło cele"
- Performance marketing page: "+127% wzrost", "8.2x ROI"

Either: (a) add "Source: [Research name, Year]" below each stat, or (b) replace with own verified client data attributed to an anonymized vertical.

---

### 35. Implement IndexNow

Create an IndexNow key, place the verification file in `/public/[key].txt`, and configure a Sanity webhook that POSTs to the IndexNow API on blog post publish. Enables near-instant Bing indexation of new content.

---

### 36. Create /uslugi/migracja-woocommerce landing page

High-value search query ("migracja WooCommerce do headless", "platforma e-commerce zamiana WooCommerce") currently unaddressed. A dedicated landing page for WooCommerce migration queries would capture mid-funnel e-commerce buyers currently lost in the Monkydot handoff.

---

### 37. Add changefreq corrections to sitemap

Change `changefreq: 'daily'` to appropriate values on static pages:
- `/o-nas`, `/kontakt`, `/polityka-prywatnosci` → `monthly`
- `/uslugi/*` → `monthly`
- `/baza-wiedzy/[slug]` → `monthly`

---

## Implementation Roadmap

### Week 1 (Items 1–9): ~6–8 hours total
All can be done in a single deploy. Zero risk changes.
- Items 1–9 from the Critical section
- Estimated score improvement: **+12 points** → 51/100

### Week 2 (Items 10–16): ~2–3 days
Requires refactoring two page components and adding JSON-LD.
- Items 10–16
- Estimated score improvement: **+9 points** → 60/100

### Month 1 (Items 17–30): ~5–7 days total
Schema additions, performance fixes, UX improvements.
- Estimated score improvement: **+8 points** → 68/100

### Backlog (Items 31–37): ~3–5 days
Content and strategic improvements.
- Estimated score improvement: **+4 points** → 72/100

---

## Effort / Impact Matrix

| Item | Effort | Impact | Priority |
|---|---|---|---|
| 1. Unblock AI crawlers | 30 min | Critical | P0 |
| 2. Remove duplicate title | 5 min | Critical | P0 |
| 3. Fix sitemap siteUrl | 5 min | Critical | P0 |
| 4. Fix strony-www title | 5 min | High | P0 |
| 5. Add metadataBase | 10 min | High | P0 |
| 7. Fix SALESmanago | 5 min | Medium | P0 |
| 10. Refactor client components | 4h | Critical | P1 |
| 11. Add canonicals | 2h | High | P1 |
| 13. Organization schema | 2h | High | P1 |
| 14. Add form to strony-www | 3h | High | P1 |
| 16. BlogPosting schema | 2h | High | P1 |
| 19. DefinedTerm schema | 3h | High (GEO) | P2 |
| 20. Create llms.txt | 2h | High (GEO) | P2 |
| 24. Move GTM to body | 1h | Medium (LCP) | P2 |
| 26. Server component conversions | 4h | Medium (CWV) | P2 |
| 33. Add team profiles | 3h | Medium (E-E-A-T) | P3 |
| 36. WooCommerce migration page | 1 day | High (organic) | P3 |
