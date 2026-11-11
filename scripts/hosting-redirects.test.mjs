import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const CANONICAL = 'https://www.creativetrust.pl';

/** `[[redirects]]` tables from netlify.toml: flat `key = value` pairs only. */
function netlifyRedirects() {
    const toml = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
    return toml
        .split(/^\[\[redirects\]\]\s*$/m)
        .slice(1)
        .map((chunk) => {
            const rule = {};
            for (const line of chunk.split('\n')) {
                if (/^\s*\[/.test(line)) break;
                const m = line.match(/^\s*(\w+)\s*=\s*(.+?)\s*$/);
                if (m) rule[m[1]] = JSON.parse(m[2]);
            }
            return rule;
        });
}

test('apex on http and https goes to https://www in one 301, path kept', () => {
    const rules = netlifyRedirects();
    for (const from of ['http://creativetrust.pl/*', 'https://creativetrust.pl/*']) {
        const rule = rules.find((r) => r.from === from);
        assert.ok(rule, `missing rule for ${from}`);
        assert.equal(rule.to, `${CANONICAL}/:splat`);
        assert.equal(rule.status, 301);
        assert.equal(rule.force, true);
    }
});

test('no domain-level redirect targets its own host (no loop)', () => {
    for (const rule of netlifyRedirects()) {
        if (!/^https?:\/\//.test(rule.from)) continue;
        const from = new URL(rule.from.replace('*', 'x'));
        const to = new URL(rule.to.replace(':splat', 'x'));
        assert.notEqual(from.host, to.host, `${rule.from} → ${rule.to} stays on the same host`);
        assert.equal(to.origin, CANONICAL);
    }
});

test('HSTS stays on every response', () => {
    const config = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');
    assert.match(config, /Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains'/);
});
