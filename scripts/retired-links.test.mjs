import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { RETIRED_SERVICE_PAGES, rewriteRetiredHref, rewriteRetiredLinks } from '../src/lib/retired-links.ts';

const root = new URL('../', import.meta.url);
const pageFile = (route) => new URL(`src/app/(pl)${route}/page.tsx`, root);

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

test('import scripts no longer write links to retired service pages', () => {
    for (const file of ['scripts/import-seo-blog-posts.cjs', 'scripts/import-geo-seo-blog-posts-2026.cjs']) {
        const source = readFileSync(new URL(file, root), 'utf8');
        for (const retired of Object.keys(RETIRED_SERVICE_PAGES)) {
            assert.ok(!source.includes(`'${retired}'`), `${file} still links to ${retired}`);
        }
    }
});
