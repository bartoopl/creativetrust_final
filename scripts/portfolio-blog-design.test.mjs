// Portfolio and blog speak the v2 design language (flat Tile Gray cards with inset media),
// not the retired bordered-card markup.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const views = {
    caseCard: read('src/components/CaseStudyCard.tsx'),
    blogCard: read('src/components/BlogPostCard.tsx'),
    portfolioGrid: read('src/components/PortfolioGrid.tsx'),
    blogIndex: read('src/app/(pl)/blog/page.tsx'),
    blogCategory: read('src/app/(pl)/blog/kategoria/[slug]/page.tsx'),
    project: read('src/app/(pl)/portfolio/[slug]/page.tsx'),
    post: read('src/app/(pl)/blog/[slug]/page.tsx'),
};
const css = read('src/app/globals.css');

test('cards are v2 tiles with an inset media frame', () => {
    for (const card of [views.caseCard, views.blogCard]) {
        assert.match(card, /className="ct-tile ct-v2-card /);
        assert.match(card, /className="ct-v2-media"/);
    }
});

test('no view keeps the retired bordered-card markup', () => {
    for (const [name, source] of Object.entries(views)) {
        assert.doesNotMatch(source, /border: '1px solid rgba\(0,0,0,0\.1\)'/, `${name} uses the old card border`);
        assert.doesNotMatch(source, /BRAK ZDJĘCIA|NO IMAGE/, `${name} prints a placeholder label`);
        assert.doesNotMatch(source, /\/\/ brak/, `${name} prints a code-comment empty state`);
        assert.doesNotMatch(source, /ct-pill/, `${name} uses legacy mono pills instead of chips`);
    }
});

test('filters and categories are chips that expose their state', () => {
    assert.match(views.portfolioGrid, /aria-pressed=\{selected === option\.slug\}[^>]*className="ct-chip"/);
    assert.match(views.blogIndex, /aria-current="page" className="ct-chip"/);
    assert.match(views.blogCategory, /aria-current=\{cat\.slug\.current === slug \? 'page' : undefined\}/);
    assert.match(css, /\.ct-chip\[aria-pressed="true"\], \.ct-chip\[aria-current="page"\] \{ background: var\(--text\); color: #fff; \}/);
});

test('the portfolio count follows Polish plural forms', () => {
    const plural = views.portfolioGrid.match(/count: \(n: number\) => `\$\{n\} \$\{(.*)\}`/)?.[1];
    assert.ok(plural, 'Polish count formatter not found');
    const count = new Function('n', `return ${plural};`);
    assert.deepEqual([1, 2, 4, 5, 12, 14, 22, 25, 112, 152].map(count), ['projekt', 'projekty', 'projekty', 'projektów', 'projektów', 'projektów', 'projekty', 'projektów', 'projektów', 'projekty']);
});

test('a project page links on to more projects and keeps the lightbox', () => {
    assert.match(views.project, /Więcej realizacji/);
    assert.match(views.project, /<ProjectGallery images=\{lightboxImages\}>/);
    assert.match(views.project, /<GalleryTrigger index=\{0\}/);
});

test('image hover zoom stops under reduced motion', () => {
    assert.match(css, /\.ct-v2-card:hover \.ct-v2-media img \{ transform: scale\(1\.03\); \}/);
    const block = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
    assert.match(block, /\.ct-v2-card:hover \.ct-v2-media img \{ transform: none; \}/);
});
