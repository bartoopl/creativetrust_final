import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const source = readFileSync(join(ROOT, 'src/components/TrustpilotReviewCollector.tsx'), 'utf8');

test('Review Collector uses the CreativeTrust business unit and a working fallback link', () => {
    assert.match(source, /TRUSTPILOT_BUSINESS_UNIT_ID = '[a-f0-9]{24}'/);
    assert.match(source, /TRUSTPILOT_REVIEW_COLLECTOR_TEMPLATE = '56278e9abfbbba0bdcd568bc'/);
    assert.match(source, /href=\{TRUSTPILOT_REVIEW_URL\}/, 'server-rendered link inside the widget');
    assert.match(source, /https:\/\/pl\.trustpilot\.com\/evaluate\/creativetrust\.pl/);
    assert.match(source, /rel="noopener noreferrer"/);
});

test('the footer renders the review prompt', () => {
    const footer = readFileSync(join(ROOT, 'src/components/Footer.tsx'), 'utf8');
    assert.match(footer, /<TrustpilotReviewCollector \/>/);
});

test('no Trustpilot secret key in the source tree', () => {
    const walk = (dir) =>
        readdirSync(dir).flatMap((name) => {
            const path = join(dir, name);
            return statSync(path).isDirectory() ? walk(path) : /\.(tsx?|mjs|js|json|md)$/.test(name) ? [path] : [];
        });
    for (const file of [...walk(join(ROOT, 'src')), ...walk(join(ROOT, 'content'))]) {
        assert.doesNotMatch(readFileSync(file, 'utf8'), /TRUSTPILOT_SECRET\s*=\s*['"][^'"]+['"]|secret[-_ ]?key\s*[:=]\s*['"][^'"]{16,}/i, file);
    }
});
