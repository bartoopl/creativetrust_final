import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
    RETIRED_BLOG_POSTS,
    RETIRED_CONTENT_PAGES,
    RETIRED_PATHS,
    RETIRED_SERVICE_PAGES,
    rewriteRetiredHref,
    rewriteRetiredLinks,
} from '../src/lib/retired-links.ts';

const root = new URL('../', import.meta.url);
const pageFile = (route) => new URL(`src/app/(pl)${route}/page.tsx`, root);
const retiredBlogPosts = JSON.parse(readFileSync(new URL('retired-blog-posts.json', root), 'utf8'));

// A static page, or a single slug under a section with a dynamic [slug] route.
const isLiveRoute = (route) => {
    if (existsSync(pageFile(route))) return true;
    const dynamic = route.match(/^\/(blog|portfolio)\/[^/]+$/);
    return Boolean(dynamic) && existsSync(pageFile(`/${dynamic[1]}/[slug]`));
};

const linkBlock = (...hrefs) => ({
    _type: 'block',
    _key: 'b',
    style: 'normal',
    markDefs: hrefs.map((href, i) => ({ _type: 'link', _key: `m${i}`, href })),
    children: [{ _type: 'span', _key: 's', text: 'tekst', marks: hrefs.map((_, i) => `m${i}`) }],
});

test('every retired page redirects to a live page, never to another retired one', () => {
    for (const [source, target] of Object.entries(RETIRED_SERVICE_PAGES)) {
        assert.ok(!existsSync(pageFile(source)), `${source} must not be a live route`);
        assert.ok(existsSync(pageFile(target)), `${target} must be a live route`);
        assert.ok(!(target in RETIRED_SERVICE_PAGES), `${target} is retired itself`);
    }
});

test('the audit page is live and not redirected (WEW-16)', () => {
    assert.ok(existsSync(pageFile('/uslugi/audyt-google-ads')));
    assert.ok(!('/uslugi/audyt-google-ads' in RETIRED_SERVICE_PAGES));
    assert.equal(RETIRED_SERVICE_PAGES['/uslugi/performance-marketing/google-ads'], '/uslugi/audyt-google-ads');
});

test('rewriteRetiredHref maps retired paths, keeping query and hash', () => {
    assert.equal(rewriteRetiredHref('/uslugi/performance-marketing'), '/uslugi');
    assert.equal(rewriteRetiredHref('/uslugi/performance-marketing/'), '/uslugi');
    assert.equal(rewriteRetiredHref('/uslugi/performance-marketing/google-ads'), '/uslugi/audyt-google-ads');
    assert.equal(rewriteRetiredHref('/uslugi/performance-marketing/meta-ads#oferta'), '/uslugi/social-media#oferta');
    assert.equal(rewriteRetiredHref('https://www.creativetrust.pl/uslugi/performance-marketing/google-ads?x=1'), '/uslugi/audyt-google-ads?x=1');
    assert.equal(rewriteRetiredHref('https://creativetrust.pl/uslugi/performance-marketing'), '/uslugi');
});

test('rewriteRetiredHref leaves live, external and look-alike links alone', () => {
    for (const href of [
        '/uslugi/audyt-google-ads',
        '/uslugi/e-commerce',
        '/blog/kategoria/performance-marketing',
        '/blog/roas-cac-ltv-w-performance-marketingu',
        '/uslugi/performance-marketing-pro',
        'https://example.com/uslugi/performance-marketing',
        'mailto:kontakt@creativetrust.pl',
        '',
    ]) {
        assert.equal(rewriteRetiredHref(href), href);
    }
});

test('RETIRED_PATHS merges every map without overlap', () => {
    assert.equal(
        Object.keys(RETIRED_PATHS).length,
        Object.keys(RETIRED_SERVICE_PAGES).length + Object.keys(RETIRED_CONTENT_PAGES).length + Object.keys(RETIRED_BLOG_POSTS).length,
    );
    for (const [source, target] of Object.entries({ ...RETIRED_SERVICE_PAGES, ...RETIRED_CONTENT_PAGES, ...RETIRED_BLOG_POSTS })) {
        assert.equal(RETIRED_PATHS[source], target);
    }
});

test('consolidated blog posts map to the five live posts, never to another redirect', () => {
    // Stage 1 of the blog consolidation (2026-11-13): eight posts with no search
    // history of their own fold into a longer one, 301, no chains.
    const consolidated = {
        '/blog/jak-stworzyc-skuteczna-strone-internetowa-dla-twojego-biznesu':
            '/blog/tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow',
        '/blog/skuteczna-strona-internetowa-przyciagajaca-klientow-7-krokow-do-sukcesu-twojego-biznesu-online':
            '/blog/tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow',
        '/blog/kompleksowa-usluga-budowy-strony-www-klucz-do-sukcesu-twojej-firmy':
            '/blog/tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow',
        '/blog/jaka-powinna-byc-i-ile-kosztuje-strona-internetowa': '/blog/ile-kosztuje-strona-internetowa-dla-firmy',
        '/blog/jak-uniknac-porzucania-koszykow-podczas-platnosci-online-6-sposobow-poprawiajacych-konwersje':
            '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
        '/blog/checkout-ux-bledy-ktore-obnizaja-konwersje': '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
        '/blog/kiedy-woocommerce-headless-ma-sens': '/blog/headless-woocommerce-next-js',
        '/blog/core-web-vitals-a-konwersja': '/blog/core-web-vitals-w-ecommerce',
    };
    assert.equal(Object.keys(consolidated).length, 8);
    for (const [source, target] of Object.entries(consolidated)) {
        assert.equal(RETIRED_BLOG_POSTS[source], target);
    }
    for (const [source, target] of Object.entries(RETIRED_BLOG_POSTS)) {
        assert.ok(!(target in RETIRED_BLOG_POSTS), `${target} is a redirect itself (chain)`);
        assert.ok(!(target in RETIRED_PATHS), `${target} is retired`);
        assert.equal(rewriteRetiredHref(source), target);
        assert.equal(rewriteRetiredHref(`${source}/`), target);
        assert.equal(rewriteRetiredHref(`https://www.creativetrust.pl${source}?utm=x#h`), `${target}?utm=x#h`);
    }
    // The file next.config.ts and the sitemap/llms.txt filters read stays the single source.
    for (const [source, target] of Object.entries(RETIRED_BLOG_POSTS)) {
        assert.equal(retiredBlogPosts[source.replace('/blog/', '')], target);
    }
});

test('every old WordPress address points at a live route, never at a redirect', () => {
    for (const [source, target] of Object.entries(RETIRED_CONTENT_PAGES)) {
        assert.ok(!existsSync(pageFile(source)), `${source} must not be a live route`);
        assert.ok(isLiveRoute(target), `${target} must be a live route`);
        assert.ok(!(target in RETIRED_PATHS), `${target} is retired itself`);
        const slug = target.match(/^\/blog\/(.+)$/)?.[1];
        assert.ok(!slug || !(slug in retiredBlogPosts), `${target} is a retired blog post`);
    }
});

test('Google Analytics and SSL pages point at the long slugs that are live', () => {
    assert.equal(
        RETIRED_CONTENT_PAGES['/jakie-dane-z-google-analytics-warto-analizowac'],
        '/blog/jakie-dane-z-google-analytics-warto-analizowac-w-celu-poprawienia-konwersji-na-stronie',
    );
    assert.equal(
        RETIRED_CONTENT_PAGES['/ssl-co-to-jest-i-czy-jest-potrzebne'],
        '/blog/ssl-co-to-jest-i-czy-jest-potrzebne-4-powody-dla-ktorych-powinienes-go-wlaczyc',
    );
    // The short slugs return 404 in production; never map to them again.
    assert.ok(!Object.values(RETIRED_CONTENT_PAGES).includes('/blog/jakie-dane-z-google-analytics-warto-analizowac'));
    assert.ok(!Object.values(RETIRED_CONTENT_PAGES).includes('/blog/ssl-co-to-jest-i-czy-jest-potrzebne'));
});

test('rewriteRetiredHref maps every old WordPress address, with or without a trailing slash', () => {
    const expected = {
        '/e-commerce/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec': '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
        '/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec': '/blog/dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
        '/budowanie-profesjonalnego-marketingu-firmy-strategia-ktora-nadaje-marce-skrzydel': '/blog/budowanie-profesjonalnego-marketingu-firmy-strategia-ktora-nadaje-marce-skrzydel',
        '/jakie-dane-z-google-analytics-warto-analizowac': '/blog/jakie-dane-z-google-analytics-warto-analizowac-w-celu-poprawienia-konwersji-na-stronie',
        '/kiedy-mega-menu-jest-fajne-a-kiedy-nie': '/blog/kiedy-mega-menu-jest-fajne-a-kiedy-nie',
        '/ssl-co-to-jest-i-czy-jest-potrzebne': '/blog/ssl-co-to-jest-i-czy-jest-potrzebne-4-powody-dla-ktorych-powinienes-go-wlaczyc',
        '/zwiekszenie-sprzedazy-w-sklepie-internetowym-6-sposobow-na-ulepszenie-strategii-kuponow': '/blog/zwiekszenie-sprzedazy-w-sklepie-internetowym-6-sposobow-na-ulepszenie-strategii-kuponow',
        '/ile-kosztuje-strona-internetowa-w-2023-roku': '/uslugi/tworzenie-stron-www-cennik',
        '/portfolio/item/artcakes': '/portfolio/artcakes-pl',
        '/portfolio/item/sklep-sulphur': '/portfolio/sklep-sulphur-com-pl',
    };
    assert.deepEqual(RETIRED_CONTENT_PAGES, expected);
    for (const [source, target] of Object.entries(expected)) {
        assert.equal(rewriteRetiredHref(source), target);
        assert.equal(rewriteRetiredHref(`${source}/`), target);
        assert.equal(rewriteRetiredHref(`https://www.creativetrust.pl${source}/?utm=x#h`), `${target}?utm=x#h`);
    }
});

test('rewriteRetiredHref drops the trailing slash of internal paths, keeping query and hash', () => {
    assert.equal(rewriteRetiredHref('/baza-wiedzy/buyer-persona/'), '/baza-wiedzy/buyer-persona');
    assert.equal(rewriteRetiredHref('/baza-wiedzy/buyer-persona//'), '/baza-wiedzy/buyer-persona');
    assert.equal(rewriteRetiredHref('/blog/?page=2'), '/blog?page=2');
    assert.equal(rewriteRetiredHref('/baza-wiedzy/buyer-persona/#definicja'), '/baza-wiedzy/buyer-persona#definicja');
    assert.equal(rewriteRetiredHref('/uslugi/strony-www/?a=1#b'), '/uslugi/strony-www?a=1#b');
    assert.equal(rewriteRetiredHref('https://www.creativetrust.pl/blog/'), 'https://www.creativetrust.pl/blog');
});

test('rewriteRetiredHref leaves the root, external and non-path links alone', () => {
    for (const href of [
        '/',
        '/?a=1',
        '/#proces',
        'https://www.creativetrust.pl/',
        'https://example.com/foo/',
        'https://example.com/portfolio/item/artcakes/',
        '//example.com/foo/',
        'mailto:kontakt@creativetrust.pl',
        'tel:+48123456789',
        '#sekcja',
        '?a=1',
        'relative/path/',
        '',
        // Missing knowledge base entries are not mapped to other entries.
        '/baza-wiedzy/cpm',
        '/baza-wiedzy/ctr',
        // Post content in the CMS, not a route in this repo.
        '/wp-admin/post.php?post=879&action=edit',
    ]) {
        assert.equal(rewriteRetiredHref(href), href);
    }
});

test('rewriteRetiredLinks rewrites old WordPress links and trailing slashes in post bodies', () => {
    const out = rewriteRetiredLinks([
        linkBlock('/portfolio/item/artcakes/', '/baza-wiedzy/buyer-persona/', 'https://example.com/foo/'),
    ]);
    assert.deepEqual(out[0].markDefs.map(({ href }) => href), ['/portfolio/artcakes-pl', '/baza-wiedzy/buyer-persona', 'https://example.com/foo/']);
});

test('rewriteRetiredLinks rewrites link marks and keeps untouched blocks by reference', () => {
    const untouched = linkBlock('/uslugi/strony-www');
    const image = { _type: 'image', _key: 'img' };
    const content = [
        linkBlock('/uslugi/audyt-google-ads', '/uslugi/performance-marketing/google-ads', '/uslugi/performance-marketing'),
        untouched,
        image,
    ];

    const out = rewriteRetiredLinks(content);

    assert.deepEqual(out[0].markDefs.map(({ href }) => href), ['/uslugi/audyt-google-ads', '/uslugi/audyt-google-ads', '/uslugi']);
    assert.deepEqual(out[0].children, content[0].children);
    assert.equal(out[1], untouched);
    assert.equal(out[2], image);
    assert.equal(content[0].markDefs[1].href, '/uslugi/performance-marketing/google-ads', 'input is not mutated');
});

test('rewriteRetiredLinks tolerates missing content and odd marks', () => {
    assert.equal(rewriteRetiredLinks(null), null);
    assert.equal(rewriteRetiredLinks(undefined), undefined);
    const odd = [{ _type: 'block', markDefs: [{ _type: 'strong' }, null] }];
    assert.deepEqual(rewriteRetiredLinks(odd), odd);
});

test('the audit landing is listed in Polish and kept out of the English menu', async () => {
    const { seoLandings, landingsFor } = await import('../src/lib/site-services.ts');
    assert.ok(seoLandings.some(({ href }) => href === '/uslugi/audyt-google-ads'));
    const en = landingsFor('en');
    assert.ok(en.every(({ href }) => href.startsWith('/en/')), 'English menu links only to English pages');
    assert.equal(en.length, seoLandings.length - 1);
});
