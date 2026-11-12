import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXCLUDED_ROUTES, STATIC_ROUTES, sitemapEntries, sitemapIndexXml, urlsetXml } from '../src/lib/sitemap.ts';

const APP = fileURLToPath(new URL('../src/app', import.meta.url));

/** Every page.tsx without a dynamic segment, as a URL path (route groups dropped). */
function staticPageRoutes(dir = APP) {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return staticPageRoutes(path);
        if (name !== 'page.tsx') return [];
        const segments = relative(APP, dir).split(sep).filter(Boolean);
        if (segments.some((segment) => segment.startsWith('['))) return [];
        if (segments[0] === '(payload)') return [];
        const route = `/${segments.filter((segment) => !segment.startsWith('(')).join('/')}`;
        return [route];
    });
}

test('the sitemap lists every static page except the noindex landings', () => {
    const pages = staticPageRoutes().sort();
    const listed = [...STATIC_ROUTES, ...EXCLUDED_ROUTES].sort();
    assert.deepEqual(listed, pages, 'add new pages to STATIC_ROUTES (or EXCLUDED_ROUTES) in src/lib/sitemap.ts');
});

test('sitemap entries cover every CMS collection with its public URL', () => {
    const doc = (slug) => ({ slug, updatedAt: '2026-02-03T04:05:06.000Z' });
    const entries = sitemapEntries(
        { posts: [doc('wpis')], projects: [doc('projekt')], knowledgeBase: [doc('haslo')], blogCategories: [doc('kat')], authors: [doc('autor')] },
        {},
        '2026-01-01T00:00:00.000Z',
    );
    const locs = entries.map((entry) => entry.loc);
    for (const loc of ['/blog/wpis', '/portfolio/projekt', '/baza-wiedzy/haslo', '/blog/kategoria/kat', '/blog/autor/autor', '/', '/en']) {
        assert.ok(locs.includes(loc), loc);
    }
    assert.equal(entries.find((entry) => entry.loc === '/blog/wpis').lastmod, '2026-02-03T04:05:06.000Z');
});

test('sitemap XML uses absolute URLs and the index points to sitemap-0.xml', () => {
    const xml = urlsetXml([{ loc: '/', changefreq: 'daily', priority: 0.7 }, { loc: '/blog/a&b', changefreq: 'weekly', priority: 0.8 }]);
    assert.match(xml, /<loc>https:\/\/www\.creativetrust\.pl<\/loc>/);
    assert.match(xml, /<loc>https:\/\/www\.creativetrust\.pl\/blog\/a&amp;b<\/loc>/);
    assert.match(sitemapIndexXml(), /<loc>https:\/\/www\.creativetrust\.pl\/sitemap-0\.xml<\/loc>/);
});
