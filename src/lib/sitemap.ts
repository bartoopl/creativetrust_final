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

export interface SitemapEntry {
    loc: string;
    lastmod?: string;
    changefreq: 'daily' | 'weekly' | 'monthly';
    priority: number;
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
 * are left out: the sitemap lists only 200s.
 */
export function sitemapEntries(source: SitemapSource, retired: Record<string, string>, now = new Date().toISOString()): SitemapEntry[] {
    const doc = (base: string, changefreq: SitemapEntry['changefreq'], priority: number) => (item: { slug: string; updatedAt: string }) => ({
        loc: `${base}/${item.slug}`,
        lastmod: item.updatedAt,
        changefreq,
        priority,
    });
    return [
        ...STATIC_ROUTES.map((route): SitemapEntry => ({ loc: route, lastmod: now, changefreq: 'daily', priority: 0.7 })),
        ...source.posts.filter((post) => !(post.slug in retired)).map(doc('/blog', 'weekly', 0.8)),
        ...source.projects.map(doc('/portfolio', 'monthly', 0.7)),
        ...source.blogCategories.map(doc('/blog/kategoria', 'weekly', 0.6)),
        ...source.authors.map(doc('/blog/autor', 'monthly', 0.6)),
        ...source.knowledgeBase.map(doc('/baza-wiedzy', 'monthly', 0.7)),
    ];
}

const escapeXml = (value: string) =>
    value.replace(/[<>&'"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[ch]!);

const absolute = (loc: string) => (loc === '/' ? SITE : `${SITE}${loc}`);

export function urlsetXml(entries: SitemapEntry[]): string {
    const urls = entries.map(
        (entry) =>
            `<url><loc>${escapeXml(absolute(entry.loc))}</loc>${entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''}<changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`,
    );
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}

export function sitemapIndexXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>\n</sitemapindex>`;
}
