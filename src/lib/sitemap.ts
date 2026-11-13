/**
 * /sitemap.xml (index) and /sitemap-0.xml, at the URLs next-sitemap used to
 * write, rendered on request from the CMS so a new post is listed without a
 * rebuild. Pure, import-free: node --test checks the static list against the
 * app directory (scripts/sitemap.test.mjs).
 */

export const SITE = 'https://www.creativetrust.pl';

/** Indexable pages without a dynamic segment. Campaign landings are noindex and left out. */
export const STATIC_ROUTES = [
    '/',
    '/baza-wiedzy',
    '/blog',
    '/kontakt',
    '/o-nas',
    '/polityka-prywatnosci',
    '/portfolio',
    '/regulamin',
    '/uslugi',
    '/uslugi/audyt-e-commerce',
    '/uslugi/audyt-google-ads',
    '/uslugi/e-commerce',
    '/uslugi/headless-woocommerce',
    '/uslugi/marketing-automation',
    '/uslugi/migracja-woocommerce-do-headless',
    '/uslugi/social-media',
    '/uslugi/strona-firmowa-cena',
    '/uslugi/strony-www',
    '/uslugi/tworzenie-stron-www-cennik',
    '/uslugi/wdrozenie-salesmanago',
    '/uslugi/zarzadzanie-e-commerce',
    '/en',
    '/en/about',
    '/en/contact',
    '/en/portfolio',
    '/en/privacy-policy',
    '/en/services',
    '/en/services/company-website-cost',
    '/en/services/e-commerce',
    '/en/services/e-commerce-audit',
    '/en/services/e-commerce-management',
    '/en/services/headless-woocommerce',
    '/en/services/marketing-automation',
    '/en/services/salesmanago-implementation',
    '/en/services/social-media',
    '/en/services/website-pricing',
    '/en/services/websites',
    '/en/services/woocommerce-to-headless-migration',
    '/en/terms',
] as const;

/** Static pages deliberately kept out of the sitemap (noindex ad landings). */
export const EXCLUDED_ROUTES = [
    '/uslugi/landing-page-google-ads',
    '/uslugi/landing-page-pod-reklamy',
    '/en/services/google-ads-landing-page',
    '/en/services/ad-landing-page',
] as const;

/**
 * Last content change per static route, taken from the commit that last touched
 * its page file. The production image has no `.git`, so the dates live here as
 * data instead of being read at request time: every request returns the same
 * value, and no date can be "now" or in the future.
 *
 * When a page changes, update its date. The sitemap test fails if a route has no
 * date, so a new page cannot slip in without one.
 */
export const STATIC_LASTMOD: Readonly<Record<(typeof STATIC_ROUTES)[number], string>> = {
    '/': '2026-11-12T14:15:55.000Z',
    '/baza-wiedzy': '2026-11-12T08:55:59.000Z',
    '/blog': '2026-11-12T15:22:12.000Z',
    '/kontakt': '2026-11-11T19:05:25.000Z',
    '/o-nas': '2026-11-12T14:15:55.000Z',
    '/polityka-prywatnosci': '2026-11-07T23:45:58.000Z',
    '/portfolio': '2026-11-12T09:14:42.000Z',
    '/regulamin': '2026-11-07T23:45:58.000Z',
    '/uslugi': '2026-11-12T22:44:50.000Z',
    '/uslugi/audyt-e-commerce': '2026-11-12T22:44:50.000Z',
    '/uslugi/audyt-google-ads': '2026-11-12T22:03:58.000Z',
    '/uslugi/e-commerce': '2026-11-12T22:44:50.000Z',
    '/uslugi/headless-woocommerce': '2026-11-07T23:43:55.000Z',
    '/uslugi/marketing-automation': '2026-11-12T22:06:12.000Z',
    '/uslugi/migracja-woocommerce-do-headless': '2026-11-07T23:43:55.000Z',
    '/uslugi/social-media': '2026-11-12T22:44:50.000Z',
    '/uslugi/strona-firmowa-cena': '2026-11-07T23:43:55.000Z',
    '/uslugi/strony-www': '2026-11-12T22:44:50.000Z',
    '/uslugi/tworzenie-stron-www-cennik': '2026-11-12T22:44:50.000Z',
    '/uslugi/wdrozenie-salesmanago': '2026-11-12T22:44:50.000Z',
    '/uslugi/zarzadzanie-e-commerce': '2026-11-11T19:09:32.000Z',
    '/en': '2026-11-12T08:55:59.000Z',
    '/en/about': '2026-11-12T14:15:55.000Z',
    '/en/contact': '2026-11-11T19:13:17.000Z',
    '/en/portfolio': '2026-11-12T15:21:06.000Z',
    '/en/privacy-policy': '2026-11-07T23:49:28.000Z',
    '/en/services': '2026-11-12T22:44:50.000Z',
    '/en/services/company-website-cost': '2026-11-07T23:43:55.000Z',
    '/en/services/e-commerce': '2026-11-12T22:44:50.000Z',
    '/en/services/e-commerce-audit': '2026-11-11T19:09:32.000Z',
    '/en/services/e-commerce-management': '2026-11-11T19:09:32.000Z',
    '/en/services/headless-woocommerce': '2026-11-07T23:43:55.000Z',
    '/en/services/marketing-automation': '2026-11-12T22:06:12.000Z',
    '/en/services/salesmanago-implementation': '2026-11-07T23:43:55.000Z',
    '/en/services/social-media': '2026-11-12T22:44:50.000Z',
    '/en/services/website-pricing': '2026-11-07T23:43:55.000Z',
    '/en/services/websites': '2026-11-12T22:44:50.000Z',
    '/en/services/woocommerce-to-headless-migration': '2026-11-07T23:43:55.000Z',
    '/en/terms': '2026-11-07T23:45:58.000Z',
};

export interface SitemapEntry {
    loc: string;
    lastmod?: string;
}

export interface SitemapSource {
    posts: { slug: string; updatedAt: string }[];
    projects: { slug: string; updatedAt: string }[];
    knowledgeBase: { slug: string; updatedAt: string }[];
    blogCategories: { slug: string; updatedAt: string }[];
    authors: { slug: string; updatedAt: string }[];
}

/**
 * Every URL to list. Retired posts answer with a 301 (next.config.ts), so they
 * are left out: the sitemap lists only 200s. CMS documents carry their own
 * `updatedAt`; static pages use STATIC_LASTMOD, so repeated requests never
 * invent a fresh date.
 */
export function sitemapEntries(source: SitemapSource, retired: Record<string, string>): SitemapEntry[] {
    const doc = (base: string) => (item: { slug: string; updatedAt: string }) => ({
        loc: `${base}/${item.slug}`,
        lastmod: item.updatedAt,
    });
    return [
        ...STATIC_ROUTES.map((route): SitemapEntry => ({ loc: route, lastmod: STATIC_LASTMOD[route] })),
        ...source.posts.filter((post) => !(post.slug in retired)).map(doc('/blog')),
        ...source.projects.map(doc('/portfolio')),
        ...source.blogCategories.map(doc('/blog/kategoria')),
        ...source.authors.map(doc('/blog/autor')),
        ...source.knowledgeBase.map(doc('/baza-wiedzy')),
    ];
}

const escapeXml = (value: string) =>
    value.replace(/[<>&'"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[ch]!);

const absolute = (loc: string) => (loc === '/' ? SITE : `${SITE}${loc}`);

export function urlsetXml(entries: SitemapEntry[]): string {
    const urls = entries.map(
        (entry) => `<url><loc>${escapeXml(absolute(entry.loc))}</loc>${entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''}</url>`,
    );
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}

export function sitemapIndexXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>\n</sitemapindex>`;
}
