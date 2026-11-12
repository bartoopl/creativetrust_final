/**
 * Retired URLs mapped to the closest live page, in two maps:
 * - RETIRED_SERVICE_PAGES: service pages removed from the current offer;
 * - RETIRED_CONTENT_PAGES: old WordPress addresses (root-level post slugs,
 *   /e-commerce/ category paths, /portfolio/item/ projects) still linked from
 *   post bodies, external sites and old search results.
 * Both, merged as RETIRED_PATHS, drive the permanent redirects in next.config.ts
 * (external backlinks) and the href rewrite in CMS post bodies (internal links),
 * so an internal link never points at a redirect. Plain data, no imports, so
 * `node --test` can load it.
 */
export const RETIRED_SERVICE_PAGES: Readonly<Record<string, string>> = {
    // Only Google Ads offer left on the site.
    '/uslugi/performance-marketing/google-ads': '/uslugi/audyt-google-ads',
    // Paid Meta Ads campaigns are part of the social media offer.
    '/uslugi/performance-marketing/meta-ads': '/uslugi/social-media',
    // No performance marketing service any more: the full service list.
    '/uslugi/performance-marketing': '/uslugi',
};

export const RETIRED_CONTENT_PAGES: Readonly<Record<string, string>> = {
    // WordPress posts lived at the site root (or under a category); they are under /blog now.
    '/e-commerce/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec': '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
    '/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec': '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
    '/budowanie-profesjonalnego-marketingu-firmy-strategia-ktora-nadaje-marce-skrzydel': '/blog/budowanie-profesjonalnego-marketingu-firmy-strategia-ktora-nadaje-marce-skrzydel',
    '/jakie-dane-z-google-analytics-warto-analizowac': '/blog/jakie-dane-z-google-analytics-warto-analizowac',
    '/kiedy-mega-menu-jest-fajne-a-kiedy-nie': '/blog/kiedy-mega-menu-jest-fajne-a-kiedy-nie',
    '/ssl-co-to-jest-i-czy-jest-potrzebne': '/blog/ssl-co-to-jest-i-czy-jest-potrzebne',
    '/zwiekszenie-sprzedazy-w-sklepie-internetowym-6-sposobow-na-ulepszenie-strategii-kuponow': '/blog/zwiekszenie-sprzedazy-w-sklepie-internetowym-6-sposobow-na-ulepszenie-strategii-kuponow',
    // Outdated 2023 price article: the current pricing page.
    '/ile-kosztuje-strona-internetowa-w-2023-roku': '/uslugi/tworzenie-stron-www-cennik',
    // WordPress portfolio items → the current case studies.
    '/portfolio/item/artcakes': '/portfolio/artcakes-pl',
    '/portfolio/item/sklep-sulphur': '/portfolio/sklep-sulphur-com-pl',
};

/** Every retired path (service and content pages) → its live target. */
export const RETIRED_PATHS: Readonly<Record<string, string>> = {
    ...RETIRED_SERVICE_PAGES,
    ...RETIRED_CONTENT_PAGES,
};

const SITE_ORIGIN = /^https?:\/\/(?:www\.)?creativetrust\.pl(?=\/)/i;

/**
 * The live target for a link to a retired page; otherwise the href with the
 * trailing slash of an internal path dropped (the site serves paths without one).
 * External, protocol-relative, relative and non-http links are returned unchanged.
 */
export function rewriteRetiredHref(href: string): string {
    const match = href.match(/^([^?#]*)([?#].*)?$/);
    const [, rawPath = '', suffix = ''] = match ?? [];
    const origin = rawPath.match(SITE_ORIGIN)?.[0] ?? '';
    const rest = rawPath.slice(origin.length);
    // Root-relative paths on this site only ('//host/…' is protocol-relative, i.e. external).
    if (!rest.startsWith('/') || rest.startsWith('//')) return href;

    const path = rest.replace(/(.)\/+$/, '$1');
    const target = RETIRED_PATHS[path];
    if (target) return `${target}${suffix}`;

    return path === rest ? href : `${origin}${path}${suffix}`;
}

type LinkMark = { href?: unknown; [key: string]: unknown };
type Block = { markDefs?: LinkMark[] | null; [key: string]: unknown };

/** Rewrites every link mark in Portable Text that points at a retired page or ends with a slash. */
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
