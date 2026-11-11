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
    { slug: 'audyt-e-commerce', href: '/uslugi/audyt-e-commerce', title: 'Audyt e-commerce', description: 'Sprzedaż, marża, technologia i praca zespołu sklepu. Raport i roadmapa w 5–7 dni roboczych.', accent: 'Diagnoza' },
    { slug: 'zarzadzanie-e-commerce', href: '/uslugi/zarzadzanie-e-commerce', title: 'Zarządzanie e-commerce', description: 'Prowadzenie e-commerce z zewnątrz: plan, marża, zespół, dostawcy i wyniki.', accent: 'Wynik' },
    { slug: 'e-commerce', href: '/uslugi/e-commerce', title: 'Wdrożenia e-commerce', description: 'Headless commerce, migracje i integracje systemów.', accent: 'Skalowanie' },
    { slug: 'strony-www', href: '/uslugi/strony-www', title: 'Strony WWW', description: 'Strony firmowe, landing pages, UX i performance.', accent: 'Konwersja' },
    { slug: 'marketing-automation', href: '/uslugi/marketing-automation', title: 'Marketing Automation', description: 'SALESmanago, lejki, CRM i personalizacja.', accent: 'Automatyzacja' },
    { slug: 'social-media', href: '/uslugi/social-media', title: 'Social Media', description: 'Strategia, content, kampanie i raportowanie.', accent: 'Widoczność' },
];

/** The two lead offers; the rest of the catalogue is implementation work. */
export const LEAD_SERVICE_SLUGS = ['audyt-e-commerce', 'zarzadzanie-e-commerce'];

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
