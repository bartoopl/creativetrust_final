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

const SITE_ORIGIN = /^https?:\/\/(?:www\.)?creativetrust\.pl(?=\/)/i;

/** The live target for a link to a retired service page, or the href unchanged. */
export function rewriteRetiredHref(href: string): string {
    const match = href.match(/^([^?#]*)([?#].*)?$/);
    const [, rawPath = '', suffix = ''] = match ?? [];
    const origin = rawPath.match(SITE_ORIGIN)?.[0] ?? '';
    const path = rawPath.slice(origin.length).replace(/(.)\/+$/, '$1');
    const target = RETIRED_SERVICE_PAGES[path];

    return target ? `${target}${suffix}` : href;
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
