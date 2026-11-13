import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/**
 * Meta title and description limits for the pages that were cut off in Google.
 * The strings are pinned here and must also appear verbatim in the page source
 * (and in the content/ai twin, when one exists), so the test catches both an
 * over-long value and a page that does not use the approved string.
 */
const pages = [
    {
        route: '/uslugi',
        file: 'src/app/(pl)/uslugi/page.tsx',
        md: 'content/ai/uslugi.md',
        title: 'Audyt e-commerce, sklepy, strony internetowe | CreativeTrust',
        description: 'Audyt i zarządzanie e-commerce, projekt i budowa sklepów oraz stron internetowych, marketing automation i social media - w jednym zespole.',
    },
    {
        route: '/uslugi/e-commerce',
        file: 'src/app/(pl)/uslugi/e-commerce/page.tsx',
        md: 'content/ai/uslugi/e-commerce.md',
        title: 'Sklepy internetowe: projekt i wdrożenie | CreativeTrust',
        description: 'Budujemy sklepy internetowe: headless, WooCommerce, Shopify, migracje i integracje ERP. Pod sprzedaż, marżę i pracę zespołu.',
    },
    {
        route: '/uslugi/social-media',
        file: 'src/app/(pl)/uslugi/social-media/page.tsx',
        md: 'content/ai/uslugi/social-media.md',
        title: 'Social media dla marek: strategia i kampanie | CreativeTrust',
        description: 'Prowadzimy social media marek pod sprzedaż: strategia, content, kampanie i społeczność planowane z kalendarzem sprzedaży.',
    },
    {
        route: '/uslugi/strony-www',
        file: 'src/app/(pl)/uslugi/strony-www/page.tsx',
        md: 'content/ai/uslugi/strony-www.md',
        title: 'Strony internetowe dla firm, które sprzedają | CreativeTrust',
        description: 'Strony internetowe dla firm, które mają pracować na sprzedaż: projekt, wdrożenie i SEO. Strona internetowa dla firmy od briefu do startu.',
    },
    {
        route: '/uslugi/audyt-e-commerce',
        file: 'src/app/(pl)/uslugi/audyt-e-commerce/page.tsx',
        md: 'content/ai/uslugi/audyt-e-commerce.md',
        title: 'Audyt e-commerce: sprzedaż i marża | CreativeTrust',
        description: 'Audyt e-commerce w 5-7 dni roboczych: pokazujemy, gdzie sklep traci sprzedaż, marżę i czas zespołu. Stała kwota znana z góry.',
    },
    {
        route: '/uslugi/zarzadzanie-e-commerce',
        file: 'src/app/(pl)/uslugi/zarzadzanie-e-commerce/page.tsx',
        md: 'content/ai/uslugi/zarzadzanie-e-commerce.md',
        title: 'Agencja e-commerce i outsourcing sklepu | CreativeTrust',
        description: 'Prowadzimy e-commerce marek z zewnątrz: sprzedaż, marżę, zespół, dostawców i raportowanie. Start od audytu w 5-7 dni roboczych, potem stały abonament.',
    },
    {
        route: '/uslugi/tworzenie-stron-www-cennik',
        file: 'src/app/(pl)/uslugi/tworzenie-stron-www-cennik/page.tsx',
        md: 'content/ai/uslugi/tworzenie-stron-www-cennik.md',
        title: 'Ile kosztuje strona internetowa? Cennik | CreativeTrust',
        description: 'Ile kosztuje strona internetowa? Realne zakresy: landing page od 3 500 zł netto, strona firmowa od 7 500 zł, serwis z CMS. Sprawdź, co wpływa na cenę.',
    },
    {
        route: '/uslugi/wdrozenie-salesmanago',
        file: 'src/app/(pl)/uslugi/wdrozenie-salesmanago/page.tsx',
        md: 'content/ai/uslugi/wdrozenie-salesmanago.md',
        title: 'Wdrożenie SALESmanago i automatyzacje | CreativeTrust',
        description: 'Wdrożenie SALESmanago: automatyzacje, segmentacja i lead nurturing. Dla firm, które chcą mierzyć przychód z marketing automation.',
    },
    {
        route: '/en/services',
        file: 'src/app/en/services/page.tsx',
        title: 'Services: e-commerce audit, stores, websites | CreativeTrust',
        description: 'E-commerce audit, outsourced e-commerce management, online stores and websites, marketing automation and social media - one team.',
    },
    {
        route: '/en/services/e-commerce',
        file: 'src/app/en/services/e-commerce/page.tsx',
        title: 'Online stores: design, build, integrations | CreativeTrust',
        description: 'We design and build online stores: headless, WooCommerce, Shopify, migrations and ERP integrations - for sales, margin and the way your team works.',
    },
    {
        route: '/en/services/websites',
        file: 'src/app/en/services/websites/page.tsx',
        title: 'Websites for brands and companies | CreativeTrust',
        description: 'Company sites, product sites, landing pages and portals: fast, easy to edit, built for a specific role in sales. See the scope and pricing.',
    },
    {
        route: '/en/services/social-media',
        file: 'src/app/en/services/social-media/page.tsx',
        title: 'Social media for brands: strategy, campaigns | CreativeTrust',
        description: "We run brands' social media for sales: strategy, content, campaigns and community planned with your sales calendar and offer.",
    },
];

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replaceAll("\\'", "'");

test('SERP limits: title <= 60 and description <= 155 on the twelve service pages', () => {
    assert.equal(pages.length, 12);
    for (const page of pages) {
        assert.ok(page.title.length <= 60, `${page.route} title is ${page.title.length} chars`);
        assert.ok(page.description.length <= 155, `${page.route} description is ${page.description.length} chars`);
        assert.ok(page.title.endsWith('| CreativeTrust'), `${page.route} title keeps the brand suffix`);
        assert.ok(!page.title.includes('—') && !page.description.includes('—'), `${page.route} uses a plain hyphen`);
    }
});

test('every page source uses the approved title and description verbatim', () => {
    for (const page of pages) {
        const source = read(page.file);
        assert.ok(source.includes(`title: { absolute: '${page.title}' }`), `${page.route} title`);
        assert.ok(source.includes(page.description), `${page.route} description`);
    }
});

test('the content/ai twins carry the same title and description', () => {
    for (const page of pages.filter(({ md }) => md)) {
        const source = read(page.md);
        assert.ok(source.includes(`title: "${page.title}"`), `${page.route} md title`);
        assert.ok(source.includes(`description: "${page.description}"`), `${page.route} md description`);
    }
});
