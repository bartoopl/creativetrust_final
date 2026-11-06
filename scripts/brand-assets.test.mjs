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

test('favicon set covers Safari: ICO, PNG fallback, SVG and apple-touch-icon', () => {
    const ico = read('src/app/favicon.ico');
    assert.equal(ico.readUInt16LE(2), 1, 'favicon.ico is an icon resource');
    assert.ok(ico.readUInt16LE(4) >= 2, 'favicon.ico carries several sizes');
    assert.match(read('src/app/icon1.svg').toString(), /prefers-color-scheme:\s*dark/, 'SVG icon adapts to dark mode');
    assert.deepEqual(pngSize('src/app/icon2.png'), { width: 32, height: 32 }, 'PNG fallback for Safari without SVG favicons');
    assert.deepEqual(pngSize('src/app/apple-icon.png'), { width: 180, height: 180 });
    assert.deepEqual(pngSize('public/apple-touch-icon.png'), { width: 180, height: 180 }, 'root path Safari requests directly');
    assert.deepEqual(pngSize('src/app/opengraph-image.png'), { width: 1200, height: 630 });
});

test('web manifest icons exist and the proxy leaves the manifest alone', async () => {
    const { default: manifest } = await import('../src/app/manifest.ts');
    const { icons } = manifest();
    assert.ok(icons.length >= 2);
    for (const icon of icons) {
        const [width, height] = icon.sizes.split('x').map(Number);
        assert.deepEqual(pngSize(join('public', icon.src)), { width, height }, icon.src);
    }
    assert.match(read('src/proxy.ts').toString(), /\|webmanifest\|/);
    assert.ok(!existsSync(join(ROOT, 'public/favicon.ico')), 'one favicon.ico, served from src/app');
});
