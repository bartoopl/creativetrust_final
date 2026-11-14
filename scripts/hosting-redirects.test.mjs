import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { APEX_HOST, CANONICAL_HOST, CANONICAL_ORIGIN, canonicalRedirectUrl } from '../src/lib/canonical-redirects.ts';

test('bare domain goes to https://www in one 301, path kept', () => {
    assert.equal(APEX_HOST, 'creativetrust.pl');
    assert.equal(CANONICAL_HOST, 'www.creativetrust.pl');
    assert.equal(CANONICAL_ORIGIN, 'https://www.creativetrust.pl');
    assert.equal(canonicalRedirectUrl({ pathname: '/uslugi', host: APEX_HOST }), `${CANONICAL_ORIGIN}/uslugi`);
    assert.equal(canonicalRedirectUrl({ pathname: '/uslugi/', host: APEX_HOST }), `${CANONICAL_ORIGIN}/uslugi`);
});

test('the proxy applies it, not a next.config rule', () => {
    const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
    const proxy = readFileSync(new URL('../src/proxy.ts', import.meta.url), 'utf8');
    assert.match(proxy, /canonicalRedirectUrl\(/);
    assert.doesNotMatch(config, /apexRedirect/, 'a config rule would run before the slash fix and chain');
    assert.match(config, /skipTrailingSlashRedirect: true/);
});

test('the domain redirect targets another host (no loop)', () => {
    const to = new URL(canonicalRedirectUrl({ pathname: '/', host: APEX_HOST }));
    assert.equal(to.host, CANONICAL_HOST);
    assert.equal(canonicalRedirectUrl({ pathname: '/', host: CANONICAL_HOST }), null);
});

test('HSTS stays on every response', () => {
    const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
    assert.match(config, /Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains'/);
});
