import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXCLUDED_ROUTES, STATIC_LASTMOD, STATIC_ROUTES, sitemapEntries, sitemapIndexXml, urlsetXml } from '../src/lib/sitemap.ts';

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

const doc = (slug, updatedAt = '2026-02-03T04:05:06.000Z') => ({ slug, updatedAt });
const fixture = {
    posts: [doc('wpis')],
    projects: [doc('projekt')],
    knowledgeBase: [doc('haslo')],
    blogCategories: [doc('kat')],
    authors: [doc('autor')],
};

test('the sitemap lists every static page except the noindex landings', () => {
    const pages = staticPageRoutes().sort();
    const listed = [...STATIC_ROUTES, ...EXCLUDED_ROUTES].sort();
    assert.deepEqual(listed, pages, 'add new pages to STATIC_ROUTES (or EXCLUDED_ROUTES) in src/lib/sitemap.ts');
});

test('all 29 service routes are accounted for: listed, or noindex and excluded', () => {
    const serviceRoutes = [...STATIC_ROUTES, ...EXCLUDED_ROUTES].filter(
        (route) => route === '/uslugi' || route.startsWith('/uslugi/') || route === '/en/services' || route.startsWith('/en/services/'),
    );
    assert.equal(serviceRoutes.length, 29);
    const entries = sitemapEntries(fixture, {});
    const locs = entries.map((entry) => entry.loc);
    for (const route of EXCLUDED_ROUTES) assert.ok(!locs.includes(route), `${route} is noindex and must stay out`);
    for (const route of STATIC_ROUTES.filter((route) => serviceRoutes.includes(route))) {
        assert.ok(locs.includes(route), `${route} is missing from the sitemap`);
    }
});

test('every static route has a fixed lastmod that is not generated at request time', () => {
    const entries = sitemapEntries(fixture, {});
    const now = Date.now();
    for (const route of STATIC_ROUTES) {
        const entry = entries.find((candidate) => candidate.loc === route);
        assert.ok(entry, `${route} is missing`);
        assert.equal(entry.lastmod, STATIC_LASTMOD[route], `${route} lastmod`);
        assert.ok(Number.isFinite(Date.parse(entry.lastmod)), `${route} lastmod is a valid date`);
        assert.ok(Date.parse(entry.lastmod) < now, `${route} lastmod is not in the future`);
    }
});

test('two sitemap builds return identical lastmod values', () => {
    const first = sitemapEntries(fixture, {});
    const second = sitemapEntries(fixture, {});
    assert.deepEqual(second, first);
});

test('sitemap entries cover every CMS collection with its own updatedAt', () => {
    const entries = sitemapEntries(fixture, {});
    const locs = entries.map((entry) => entry.loc);
    for (const loc of ['/blog/wpis', '/portfolio/projekt', '/baza-wiedzy/haslo', '/blog/kategoria/kat', '/blog/autor/autor', '/', '/en']) {
        assert.ok(locs.includes(loc), loc);
    }
    assert.equal(entries.find((entry) => entry.loc === '/blog/wpis').lastmod, '2026-02-03T04:05:06.000Z');
});

test('sitemap XML uses absolute URLs and no changefreq or priority', () => {
    const xml = urlsetXml([{ loc: '/', lastmod: '2026-01-02T03:04:05.000Z' }, { loc: '/blog/a&b', lastmod: '2026-01-03T00:00:00.000Z' }]);
    assert.match(xml, /<loc>https:\/\/www\.creativetrust\.pl<\/loc>/);
    assert.match(xml, /<loc>https:\/\/www\.creativetrust\.pl\/blog\/a&amp;b<\/loc>/);
    assert.match(xml, /<lastmod>2026-01-02T03:04:05\.000Z<\/lastmod>/);
    assert.doesNotMatch(xml, /<changefreq>/);
    assert.doesNotMatch(xml, /<priority>/);
    assert.match(sitemapIndexXml(), /<loc>https:\/\/www\.creativetrust\.pl\/sitemap-0\.xml<\/loc>/);
});
