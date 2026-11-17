import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { responsiveImage } from '../src/lib/media.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(ROOT, path), 'utf8');

const ORIGINAL = 'https://www.creativetrust.pl/api/media/file/unity-net-pl.png';
const variant = (width, height) => ({
    url: `https://www.creativetrust.pl/api/media/file/unity-net-pl-${width}x${height}.webp`,
    width,
    height,
    mimeType: 'image/webp',
});

/** Media 168 from the live CMS: a 1440×810 PNG with 400/800/1200 WebP siblings. */
const cover = (sizes = {}) => ({
    asset: {
        url: ORIGINAL,
        width: 1440,
        height: 810,
        sizes: {
            thumbnail: variant(400, 225),
            card: variant(800, 450),
            large: variant(1200, 675),
            xlarge: { url: null, width: null, height: null },
            ...sizes,
        },
    },
    alt: 'Strona doradcy inwestycyjnego',
});

test('portfolio cover points at a stored WebP variant, not the original PNG', () => {
    const image = responsiveImage(cover());

    assert.ok(image, 'cover should resolve');
    assert.equal(image.src, variant(1200, 675).url);
    assert.doesNotMatch(image.src, /\.png(\?|$)/);
    assert.deepEqual([image.width, image.height], [1200, 675]);
});

test('cover srcset offers the smaller variants so phones download less', () => {
    const image = responsiveImage(cover());
    const candidates = image.srcSet.split(', ');

    assert.deepEqual(candidates, [
        `${variant(400, 225).url} 400w`,
        `${variant(800, 450).url} 800w`,
        `${variant(1200, 675).url} 1200w`,
    ]);
});

test('a cover without rendered variants keeps the original and its size', () => {
    const image = responsiveImage(cover({ thumbnail: undefined, card: undefined, large: undefined }));

    assert.equal(image.src, ORIGINAL);
    assert.equal(image.srcSet, undefined);
    assert.deepEqual([image.width, image.height], [1440, 810]);
});

test('the case-study page renders the cover with intrinsic size and high priority', () => {
    const page = read('src/app/(pl)/portfolio/[slug]/page.tsx');

    assert.match(page, /responsiveImage\(mainImage\)/, 'page must ask for the responsive cover');
    assert.doesNotMatch(page, /urlFor\(mainImage\)\.width\(/, 'the cover must not request a width without a matching variant');
    assert.match(page, /width=\{cover\.width\}/);
    assert.match(page, /height=\{cover\.height\}/);
    assert.match(page, /fetchPriority="high"/, 'the LCP image should not wait behind other requests');
});

test('the blog post cover uses a stored variant, not a 2000 px request from the PNG', () => {
    const page = read('src/app/(pl)/blog/[slug]/page.tsx');

    assert.match(page, /responsiveImage\(post\.mainImage\)/);
    assert.doesNotMatch(page, /urlFor\(post\.mainImage\)\.width\(2000\)/);
    assert.match(page, /width=\{cover\.width\}/);
    assert.match(page, /height=\{cover\.height\}/);
    assert.match(page, /fetchPriority="high"/);
});
