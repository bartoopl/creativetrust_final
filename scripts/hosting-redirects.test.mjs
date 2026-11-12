import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const CANONICAL = 'https://www.creativetrust.pl';

test('bare domain goes to https://www in one 301, path kept', async () => {
    const { apexRedirect } = await import('../src/lib/host-redirects.ts');
    assert.deepEqual(apexRedirect.has, [{ type: 'host', value: 'creativetrust.pl' }]);
    assert.equal(apexRedirect.source, '/:path*');
    assert.equal(apexRedirect.destination, `${CANONICAL}/:path*`);
    assert.equal(apexRedirect.statusCode, 301);
    const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
    assert.match(config, /^\s*apexRedirect,$/m, 'next.config.ts applies it');
});

test('the domain redirect targets another host (no loop)', async () => {
    const { apexRedirect } = await import('../src/lib/host-redirects.ts');
    const to = new URL(apexRedirect.destination.replace(':path*', 'x'));
    assert.notEqual(to.host, apexRedirect.has[0].value);
    assert.equal(to.origin, CANONICAL);
});

test('HSTS stays on every response', () => {
    const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
    assert.match(config, /Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains'/);
});
