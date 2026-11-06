import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { organizationSchema, SITE_URL } from '../src/lib/schema.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(ROOT, path));

/** Width and height from a PNG IHDR chunk. */
function pngSize(path) {
    const buf = read(path);
    assert.equal(buf.toString('ascii', 1, 4), 'PNG', `${path} is a PNG`);
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test('the wordmark renders the new logo artwork in brand colours', () => {
    const source = read('src/components/ui/Wordmark.tsx').toString();
    assert.match(source, /viewBox="0 0 736 102"/, 'cropped to the horizontal logo artwork');
    assert.match(source, /aria-label="creativetrust"/);
    for (const colour of ['#0B0D12', '#3355FF', '#5A6172']) assert.ok(source.includes(colour), `uses ${colour}`);
    assert.doesNotMatch(source, /ct-mono/, 'no longer the monospace text wordmark');
    for (const component of ['Header', 'Footer']) {
        assert.match(read(`src/components/${component}.tsx`).toString(), /<Wordmark \/>/, `${component} shows the logo`);
    }
});

test('public logo files are the new horizontal colour logo', () => {
    const svg = read('public/logo.svg').toString();
    assert.match(svg, /<title>creativetrust<\/title>/);
    assert.match(svg, /#3355FF/);
    assert.doesNotMatch(svg, /fill:\s*#fff/i, 'not the old white logo');
    assert.ok(pngSize('public/logo.png').width >= 112);
});

test('JSON-LD points at the raster logo', () => {
    for (const node of organizationSchema['@graph']) {
        const logo = typeof node.logo === 'string' ? node.logo : node.logo?.url;
        if (logo) assert.equal(logo, `${SITE_URL}/logo.png`, `${node['@type']} logo`);
    }
});
