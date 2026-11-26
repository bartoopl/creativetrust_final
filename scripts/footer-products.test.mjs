import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const footer = readFileSync(new URL('../src/components/Footer.tsx', import.meta.url), 'utf8');

test('footer lists our products in both locales as external links', () => {
    for (const url of ['https://lockadeck.io', 'https://flicktally.app']) {
        assert.equal(footer.split(`href: '${url}'`).length - 1, 2, `${url} should appear once per locale`);
    }
    assert.match(footer, /productsTitle: 'Nasze produkty'/);
    assert.match(footer, /productsTitle: 'Our products'/);
    assert.match(footer, /target="_blank" rel="noopener"/);
});
