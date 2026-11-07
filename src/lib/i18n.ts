/**
 * Two languages: Polish at the root (existing URLs never move), English under /en
 * with English slugs. ROUTE_PAIRS is the single source for the language switcher,
 * hreflang alternates and the sitemap. Plain data, no imports, so `node --test`
 * can load it directly.
 */

export type Locale = 'pl' | 'en';

export const EN_PREFIX = '/en';

export const HREFLANG: Record<Locale, string> = { pl: 'pl-PL', en: 'en' };

/** [Polish path, English path] for every page that exists in both languages. */
export const ROUTE_PAIRS: readonly (readonly [string, string])[] = [
    ['/', '/en'],
    ['/uslugi', '/en/services'],
    ['/uslugi/strony-www', '/en/services/websites'],
    ['/uslugi/e-commerce', '/en/services/e-commerce'],
    ['/uslugi/marketing-automation', '/en/services/marketing-automation'],
    ['/uslugi/social-media', '/en/services/social-media'],
    ['/uslugi/konsulting-e-commerce', '/en/services/e-commerce-consulting'],
    ['/uslugi/headless-woocommerce', '/en/services/headless-woocommerce'],
    ['/uslugi/migracja-woocommerce-do-headless', '/en/services/woocommerce-to-headless-migration'],
    ['/uslugi/wdrozenie-salesmanago', '/en/services/salesmanago-implementation'],
    ['/uslugi/landing-page-google-ads', '/en/services/google-ads-landing-page'],
    ['/uslugi/landing-page-pod-reklamy', '/en/services/ad-landing-page'],
    ['/uslugi/tworzenie-stron-www-cennik', '/en/services/website-pricing'],
    ['/uslugi/strona-firmowa-cena', '/en/services/company-website-cost'],
    ['/o-nas', '/en/about'],
    ['/kontakt', '/en/contact'],
    ['/portfolio', '/en/portfolio'],
    ['/polityka-prywatnosci', '/en/privacy-policy'],
    ['/regulamin', '/en/terms'],
];

const PL_TO_EN = new Map(ROUTE_PAIRS.map(([pl, en]) => [pl, en]));
const EN_TO_PL = new Map(ROUTE_PAIRS.map(([pl, en]) => [en, pl]));

function normalize(pathname: string): string {
    const path = pathname.split(/[?#]/)[0] || '/';
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function localeFromPath(pathname: string | null | undefined): Locale {
    const path = normalize(pathname ?? '/');
    return path === EN_PREFIX || path.startsWith(`${EN_PREFIX}/`) ? 'en' : 'pl';
}

/**
 * Where the language switcher leads from `pathname`: the translated page when one
 * exists, otherwise the other language's home page.
 */
export function alternatePathFor(pathname: string, target: Locale): string {
    const path = normalize(pathname);
    if (localeFromPath(path) === target) return path;
    if (target === 'en') return PL_TO_EN.get(path) ?? EN_PREFIX;
    return EN_TO_PL.get(path) ?? '/';
}

/**
 * Next.js `alternates` for a page that exists in both languages: canonical for the
 * current language plus hreflang links to both versions (x-default → Polish).
 */
export function pageAlternates(plPath: string, locale: Locale, siteUrl: string) {
    const en = PL_TO_EN.get(plPath);
    if (!en) throw new Error(`No English pair for ${plPath}`);
    const abs = (path: string) => (path === '/' ? siteUrl : `${siteUrl}${path}`);
    return {
        canonical: abs(locale === 'pl' ? plPath : en),
        languages: {
            [HREFLANG.pl]: abs(plPath),
            [HREFLANG.en]: abs(en),
            'x-default': abs(plPath),
        },
    };
}
