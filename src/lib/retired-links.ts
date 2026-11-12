/**
 * Service pages that no longer exist, mapped to the closest live page. One map
 * drives the permanent redirects in next.config.ts (external backlinks) and the
 * href rewrite in Sanity post bodies (internal links), so an internal link never
 * points at a redirect. Plain data, no imports, so `node --test` can load it.
 */
export const RETIRED_SERVICE_PAGES: Readonly<Record<string, string>> = {
    // Only Google Ads offer left on the site.
    '/uslugi/performance-marketing/google-ads': '/uslugi/audyt-google-ads',
    // Paid Meta Ads campaigns are part of the social media offer.
    '/uslugi/performance-marketing/meta-ads': '/uslugi/social-media',
    // No performance marketing service any more: the full service list.
    '/uslugi/performance-marketing': '/uslugi',
};

/**
 * Pre-migration WordPress permalinks still linked from live post bodies (SEO audit,
 * 12 Nov 2026: 11 of them ended in a 404 after the trailing-slash redirect). Keyed by
 * the path without the trailing slash the old editor copied from WordPress.
 */
export const LEGACY_PATHS: Readonly<Record<string, string>> = {
    '/e-commerce/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec':
        '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
    '/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec':
        '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
    '/budowanie-profesjonalnego-marketingu-firmy-strategia-ktora-nadaje-marce-skrzydel':
        '/blog/budowanie-profesjonalnego-marketingu-firmy-strategia-ktora-nadaje-marce-skrzydel',
    '/jakie-dane-z-google-analytics-warto-analizowac': '/blog/jakie-dane-z-google-analytics-warto-analizowac',
    '/kiedy-mega-menu-jest-fajne-a-kiedy-nie': '/blog/kiedy-mega-menu-jest-fajne-a-kiedy-nie',
    '/ssl-co-to-jest-i-czy-jest-potrzebne': '/blog/ssl-co-to-jest-i-czy-jest-potrzebne',
    '/zwiekszenie-sprzedazy-w-sklepie-internetowym-6-sposobow-na-ulepszenie-strategii-kuponow':
        '/blog/zwiekszenie-sprzedazy-w-sklepie-internetowym-6-sposobow-na-ulepszenie-strategii-kuponow',
    '/ile-kosztuje-strona-internetowa-w-2023-roku': '/uslugi/tworzenie-stron-www-cennik',
    '/portfolio/item/artcakes': '/portfolio/artcakes-pl',
    '/portfolio/item/sklep-sulphur': '/portfolio/sklep-sulphur-com-pl',
};

const SITE_ORIGIN = /^https?:\/\/(?:www\.)?creativetrust\.pl(?=\/)/i;

/** The live target for a link to a retired service page, or the href unchanged. */
export function rewriteRetiredHref(href: string): string {
    const match = href.match(/^([^?#]*)([?#].*)?$/);
    const [, rawPath = '', suffix = ''] = match ?? [];
    const origin = rawPath.match(SITE_ORIGIN)?.[0] ?? '';
    const rawSubpath = rawPath.slice(origin.length);
    const path = rawSubpath.replace(/(.)\/+$/, '$1');
    const target = RETIRED_SERVICE_PAGES[path] ?? LEGACY_PATHS[path];

    if (target) return `${target}${suffix}`;
    // A copied WordPress permalink keeps its trailing slash; link straight at the canonical URL.
    if (path !== rawSubpath && path !== '') return `${path}${suffix}`;

    return href;
}

type LinkMark = { href?: unknown; [key: string]: unknown };
type Block = { markDefs?: LinkMark[] | null; [key: string]: unknown };

/** Rewrites every link mark in Portable Text that points at a retired service page. */
export function rewriteRetiredLinks<T extends Block>(content: T[] | null | undefined): T[] | null | undefined {
    if (!Array.isArray(content)) return content;

    return content.map((block) => {
        const marks = block?.markDefs;
        if (!Array.isArray(marks)) return block;

        let changed = false;
        const markDefs = marks.map((mark) => {
            if (typeof mark?.href !== 'string') return mark;
            const href = rewriteRetiredHref(mark.href);
            if (href === mark.href) return mark;
            changed = true;
            return { ...mark, href };
        });

        return changed ? { ...block, markDefs } : block;
    });
}
