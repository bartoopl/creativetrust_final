import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { ROUTE_PAIRS, alternatePathFor, localeFromPath, pageAlternates } from '../src/lib/i18n.ts';

const SITE = 'https://www.creativetrust.pl';

/** App Router file for a URL path: Polish pages live in the (pl) route group. */
const pageFile = (path) => (path.startsWith('/en')
    ? `src/app${path}/page.tsx`
    : `src/app/(pl)${path === '/' ? '' : path}/page.tsx`);

test('every route pair has a page in both languages', () => {
    for (const [pl, en] of ROUTE_PAIRS) {
        assert.ok(existsSync(pageFile(pl)), `missing ${pageFile(pl)}`);
        assert.ok(existsSync(pageFile(en)), `missing ${pageFile(en)}`);
    }
});

test('route pairs are unique and English paths live under /en', () => {
    const pl = ROUTE_PAIRS.map(([p]) => p);
    const en = ROUTE_PAIRS.map(([, e]) => e);
    assert.equal(new Set(pl).size, pl.length);
    assert.equal(new Set(en).size, en.length);
    for (const path of en) assert.match(path, /^\/en(\/[a-z0-9-]+)*$/);
    for (const path of pl) assert.doesNotMatch(path, /^\/en(\/|$)/);
});

test('localeFromPath reads the /en prefix only', () => {
    assert.equal(localeFromPath('/'), 'pl');
    assert.equal(localeFromPath('/en'), 'en');
    assert.equal(localeFromPath('/en/services?x=1'), 'en');
    assert.equal(localeFromPath('/engineering'), 'pl');
    assert.equal(localeFromPath(null), 'pl');
});

test('alternatePathFor switches to the translated page or the other home', () => {
    assert.equal(alternatePathFor('/uslugi/strony-www', 'en'), '/en/services/websites');
    assert.equal(alternatePathFor('/en/services/websites/', 'pl'), '/uslugi/strony-www');
    assert.equal(alternatePathFor('/blog/some-post', 'en'), '/en');
    assert.equal(alternatePathFor('/en/unknown', 'pl'), '/');
    assert.equal(alternatePathFor('/kontakt', 'pl'), '/kontakt');
});

test('pageAlternates gives a self canonical and reciprocal hreflang links', () => {
    const pl = pageAlternates('/o-nas', 'pl', SITE);
    const en = pageAlternates('/o-nas', 'en', SITE);
    assert.equal(pl.canonical, `${SITE}/o-nas`);
    assert.equal(en.canonical, `${SITE}/en/about`);
    assert.deepEqual(pl.languages, en.languages);
    assert.deepEqual(en.languages, { 'pl-PL': `${SITE}/o-nas`, en: `${SITE}/en/about`, 'x-default': `${SITE}/o-nas` });
    assert.equal(pageAlternates('/', 'pl', SITE).canonical, SITE);
    assert.throws(() => pageAlternates('/blog', 'en', SITE));
});
