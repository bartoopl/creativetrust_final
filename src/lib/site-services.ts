/**
 * Single source for the service catalogue: the MegaMenu renders it and the
 * WebMCP tools expose it to in-browser AI agents. Plain data, no imports, so
 * `node --test` can load it directly.
 */

export interface Service {
    slug: string;
    href: string;
    title: string;
    description: string;
    accent: string;
}

export interface Landing {
    href: string;
    title: string;
    description: string;
    /** Main service the landing page belongs to. */
    service: Service['slug'];
}

export interface PublishedPrice {
    service: Service['slug'];
    name: string;
    /** Exactly as printed on the source page (net prices). */
    price: string;
    source: string;
}

export const services: Service[] = [
    { slug: 'strony-www', href: '/uslugi/strony-www', title: 'Strony WWW', description: 'Strony firmowe, landing pages, UX i performance.', accent: 'Konwersja' },
    { slug: 'e-commerce', href: '/uslugi/e-commerce', title: 'E-commerce', description: 'Headless commerce, migracje i integracje systemów.', accent: 'Skalowanie' },
    { slug: 'marketing-automation', href: '/uslugi/marketing-automation', title: 'Marketing Automation', description: 'SALESmanago, lejki, CRM i personalizacja.', accent: 'Automatyzacja' },
    { slug: 'social-media', href: '/uslugi/social-media', title: 'Social Media', description: 'Strategia, content, kampanie i raportowanie.', accent: 'Widoczność' },
    { slug: 'konsulting-e-commerce', href: '/uslugi/konsulting-e-commerce', title: 'Konsulting e-commerce', description: 'Sprzedaż, marża i architektura sklepu. Start od płatnej Diagnozy.', accent: 'Marża' },
];

export const seoLandings: Landing[] = [
    {
        href: '/uslugi/migracja-woocommerce-do-headless',
        title: 'Migracja WooCommerce do headless',
        description: 'Fraza dla sklepów, które rosną ponad monolit.',
        service: 'e-commerce',
    },
    {
        href: '/uslugi/wdrozenie-salesmanago',
        title: 'Wdrożenie SALESmanago',
        description: 'Landing pod zapytania o partnera i implementację.',
        service: 'marketing-automation',
    },
    {
        href: '/uslugi/landing-page-google-ads',
        title: 'Landing page Google Ads',
        description: 'Strony pod kampanie i reklamy płatne.',
        service: 'strony-www',
    },
    {
        href: '/uslugi/tworzenie-stron-www-cennik',
        title: 'Tworzenie stron WWW cennik',
        description: 'Wycena, zakres i orientacyjny budżet.',
        service: 'strony-www',
    },
    {
        href: '/uslugi/strona-firmowa-cena',
        title: 'Strona firmowa cena',
        description: 'Wycena strony firmowej i zakres projektu.',
        service: 'strony-www',
    },
    {
        href: '/uslugi/landing-page-pod-reklamy',
        title: 'Landing page pod reklamy',
        description: 'Strona pod kampanie i lead generation.',
        service: 'strony-www',
    },
    {
        href: '/uslugi/headless-woocommerce',
        title: 'Headless WooCommerce',
        description: 'Nowy storefront dla rozwijającego się sklepu.',
        service: 'e-commerce',
    },
];

type Copy = Pick<Service, 'href' | 'title' | 'description' | 'accent'>;

/** English copy of the catalogue (pages under /en/services), keyed by service slug. */
const servicesEn: Record<Service['slug'], Copy> = {
    'strony-www': { href: '/en/services/websites', title: 'Websites', description: 'Company websites, landing pages, UX and performance.', accent: 'Conversion' },
    'e-commerce': { href: '/en/services/e-commerce', title: 'E-commerce', description: 'Headless commerce, migrations and system integrations.', accent: 'Scale' },
    'marketing-automation': { href: '/en/services/marketing-automation', title: 'Marketing Automation', description: 'SALESmanago, funnels, CRM and personalisation.', accent: 'Automation' },
    'social-media': { href: '/en/services/social-media', title: 'Social Media', description: 'Strategy, content, campaigns and reporting.', accent: 'Visibility' },
    'konsulting-e-commerce': { href: '/en/services/e-commerce-consulting', title: 'E-commerce consulting', description: 'Sales, margin and store architecture. Starts with a paid Diagnosis.', accent: 'Margin' },
};

const landingsEn: Record<Landing['href'], Pick<Landing, 'href' | 'title' | 'description'>> = {
    '/uslugi/migracja-woocommerce-do-headless': { href: '/en/services/woocommerce-to-headless-migration', title: 'WooCommerce to headless migration', description: 'For stores that have outgrown the monolith.' },
    '/uslugi/wdrozenie-salesmanago': { href: '/en/services/salesmanago-implementation', title: 'SALESmanago implementation', description: 'Partner-led setup and rollout.' },
    '/uslugi/landing-page-google-ads': { href: '/en/services/google-ads-landing-page', title: 'Google Ads landing page', description: 'Pages built for paid campaigns.' },
    '/uslugi/tworzenie-stron-www-cennik': { href: '/en/services/website-pricing', title: 'Website pricing', description: 'Quote, scope and indicative budget.' },
    '/uslugi/strona-firmowa-cena': { href: '/en/services/company-website-cost', title: 'Company website cost', description: 'What a company website costs and includes.' },
    '/uslugi/landing-page-pod-reklamy': { href: '/en/services/ad-landing-page', title: 'Landing page for ads', description: 'Pages for campaigns and lead generation.' },
    '/uslugi/headless-woocommerce': { href: '/en/services/headless-woocommerce', title: 'Headless WooCommerce', description: 'A new storefront for a growing store.' },
};

/** The catalogue in the visitor's language; slugs stay Polish so both lists join on them. */
export function servicesFor(locale: 'pl' | 'en'): Service[] {
    return locale === 'en' ? services.map((s) => ({ ...s, ...servicesEn[s.slug] })) : services;
}

export function landingsFor(locale: 'pl' | 'en'): Landing[] {
    return locale === 'en' ? seoLandings.map((l) => ({ ...l, ...landingsEn[l.href] })) : seoLandings;
}

/**
 * Prices published on the pricing pages. A test checks each string still
 * appears in its source page, so this list cannot silently drift.
 */
export const publishedPrices: PublishedPrice[] = [
    { service: 'strony-www', name: 'Landing page', price: 'od 3 500 zł netto', source: '/uslugi/tworzenie-stron-www-cennik' },
    { service: 'strony-www', name: 'Strona firmowa', price: 'od 7 500 zł netto', source: '/uslugi/tworzenie-stron-www-cennik' },
    { service: 'strony-www', name: 'Strona firmowa z CMS', price: 'od 10 000 zł netto', source: '/uslugi/strona-firmowa-cena' },
    { service: 'strony-www', name: 'Serwis rozbudowany', price: 'wycena indywidualna', source: '/uslugi/tworzenie-stron-www-cennik' },
];

/** English labels of the published prices; amounts unchanged (net, PLN), source is the English pricing page. */
const pricesEn: Record<PublishedPrice['name'], Pick<PublishedPrice, 'name' | 'price' | 'source'>> = {
    'Landing page': { name: 'Landing page', price: 'from PLN 3,500 net', source: '/en/services/website-pricing' },
    'Strona firmowa': { name: 'Company website', price: 'from PLN 7,500 net', source: '/en/services/website-pricing' },
    'Strona firmowa z CMS': { name: 'Company website with CMS', price: 'from PLN 10,000 net', source: '/en/services/company-website-cost' },
    'Serwis rozbudowany': { name: 'Extended website', price: 'individual quote', source: '/en/services/website-pricing' },
};

export function pricesFor(locale: 'pl' | 'en'): PublishedPrice[] {
    return locale === 'en' ? publishedPrices.map((p) => ({ ...p, ...pricesEn[p.name] })) : publishedPrices;
}
