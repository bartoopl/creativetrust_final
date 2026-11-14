import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import {
    APEX_HOST,
    CANONICAL_HOST,
    CANONICAL_ORIGIN,
    LEGACY_REDIRECTS,
    canonicalPathFor,
    canonicalRedirectUrl,
} from '../src/lib/canonical-redirects.ts';
import { RETIRED_PATHS } from '../src/lib/retired-links.ts';

const SITE = 'https://www.creativetrust.pl';
const canonical = (request) => canonicalRedirectUrl({ aliases: RETIRED_PATHS, ...request });
const root = new URL('../', import.meta.url);
const absolute = (path) => `${CANONICAL_ORIGIN}${path}`;

/** The eight posts consolidated into five (GSC report 2026-11-14). */
const CONSOLIDATED = {
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

test('a bare host, a trailing slash and an alias collapse into one canonical URL', () => {
    const cases = Object.entries(CONSOLIDATED);
    for (const [source, target] of cases) {
        for (const host of [CANONICAL_HOST, APEX_HOST]) {
            for (const slash of ['', '/']) {
                const url = canonical({ pathname: `${source}${slash}`, host });
                assert.equal(url, absolute(target), `${host}${source}${slash}`);
            }
        }
        // http is reported by the proxy only through X-Forwarded-Proto.
        assert.equal(canonical({ pathname: `${source}/`, host: APEX_HOST, forwardedProto: 'http' }), absolute(target));
    }
    assert.ok(Object.keys(CONSOLIDATED).length === 8);
});

test('the legacy 404s and /home answer the canonical target in one hop', () => {
    for (const [source, target] of Object.entries(LEGACY_REDIRECTS)) {
        for (const host of [CANONICAL_HOST, APEX_HOST]) {
            for (const slash of ['', '/']) {
                assert.equal(canonical({ pathname: `${source}${slash}`, host }), absolute(target), `${host}${source}${slash}`);
            }
        }
    }
    assert.equal(canonical({ pathname: '/home', host: APEX_HOST, forwardedProto: 'http' }), `${SITE}/`);
});

test('a canonical request is left alone', () => {
    for (const pathname of ['/', '/blog', '/uslugi/strony-www', '/blog/core-web-vitals-w-ecommerce', '/kontakt']) {
        assert.equal(canonical({ pathname, host: CANONICAL_HOST, forwardedProto: 'https' }), null, pathname);
        assert.equal(canonical({ pathname, host: CANONICAL_HOST, forwardedProto: null }), null, pathname);
    }
    // The apex host alone is enough to redirect, but only to `www`.
    assert.equal(canonical({ pathname: '/blog', host: APEX_HOST }), `${SITE}/blog`);
});

test('the query string survives the canonical redirect', () => {
    assert.equal(canonical({ pathname: '/uslugi/strony-www/', search: '?utm=x', host: CANONICAL_HOST }), `${SITE}/uslugi/strony-www?utm=x`);
    assert.equal(canonical({ pathname: '/home', search: '?a=1', host: APEX_HOST }), `${SITE}/?a=1`);
});

test('no destination is itself a redirect, so no chain can form', () => {
    for (const [source, target] of [...Object.entries(RETIRED_PATHS), ...Object.entries(LEGACY_REDIRECTS)]) {
        assert.equal(canonicalPathFor(target).redirected, false, `${source} → ${target} is a redirect`);
        const { pathname } = new URL(absolute(target));
        assert.equal(canonical({ pathname, host: CANONICAL_HOST }), null, `${source} → ${target} still redirects`);
    }
});

test('every local destination exists as a route (no redirect into a 404)', () => {
    // CMS-backed blog targets are checked by the post-deploy script; the static
    // legacy targets must exist in the app directory.
    for (const target of new Set(Object.values(LEGACY_REDIRECTS))) {
        const route = target === '/' ? '/page.tsx' : `${target}/page.tsx`;
        assert.ok(existsSync(new URL(`src/app/(pl)${route}`, root)), `${target} has no page`);
    }
});

test('robots.txt disallows the Cloudflare endpoint and keeps the rest', () => {
    const robots = readFileSync(new URL('public/robots.txt', root), 'utf8');
    assert.match(robots, /^Disallow: \/cdn-cgi\/$/m);
    assert.match(robots, /^Allow: \/$/m);
    assert.match(robots, /^Content-Signal: search=yes,ai-input=yes,ai-train=no$/m);
    assert.match(robots, /^Sitemap: https:\/\/www\.creativetrust\.pl\/sitemap\.xml$/m);
});

test('next.config leaves host and slash to the proxy', () => {
    const config = readFileSync(new URL('next.config.ts', root), 'utf8');
    assert.match(config, /^\s*skipTrailingSlashRedirect: true,$/m);
    assert.doesNotMatch(config, /apexRedirect/);
    // Every rule that moves a visitor must use the canonical origin, or a rule fired
    // on the bare domain would keep them there.
    assert.ok((config.match(/destination: absolute\(/g) ?? []).length >= 9, 'redirects use absolute()');
    assert.match(config, /source: '\/admin\/', destination: '\/admin', statusCode: 301/);
    assert.match(config, /source: '\/api\/:path\*\/', destination: '\/api\/:path\*', statusCode: 308/);
});
