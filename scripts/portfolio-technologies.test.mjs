import { test } from 'node:test';
import assert from 'node:assert/strict';
import { technologyFilters } from '../src/lib/portfolio-technologies.ts';
import { portfolioMarkdown, portfolioFrontmatter } from '../src/lib/markdown/portfolio.ts';

const tech = (title, slug = title.toLowerCase()) => ({ _id: slug, title, slug: { current: slug } });

test('technology filter lists only used technologies, most used first', () => {
    const filters = technologyFilters([
        { technologies: [tech('WooCommerce'), tech('Next.js', 'next-js')] },
        { technologies: [tech('WooCommerce')] },
        { technologies: null },
    ]);
    assert.deepEqual(filters.map((f) => f.slug), ['woocommerce', 'next-js']);
    assert.deepEqual(technologyFilters([{}]), []);
});

test('case-study Markdown and frontmatter name the technologies', () => {
    const doc = { title: 'Sklep', client: 'Klient', technologies: [{ title: 'WooCommerce' }, { title: 'Next.js' }] };
    const md = portfolioMarkdown({ doc, canonical: 'https://www.creativetrust.pl/portfolio/sklep', frontmatter: '---\n---' });
    assert.match(md, /- \*\*Technologie:\*\* WooCommerce, Next\.js/);
    assert.ok(portfolioFrontmatter(doc, 'x', 's').semantic_keywords.includes('WooCommerce'));
});

test('technologies are detected from how project descriptions name them', async () => {
    const { detectTechnologies } = await import('../src/payload/technology-detection.ts');
    const names = (...texts) => detectTechnologies(...texts).map((t) => t.title);
    assert.deepEqual(names('Technologia: WordPress / WooCommerce'), ['WordPress', 'WooCommerce']);
    assert.deepEqual(names('Strona została wdrożona w technologii Next.js, co zapewnia:'), ['Next.js']);
    assert.deepEqual(names('Projekt i wdrożenie sklepu (WordPress + WooCommerce)'), ['WordPress', 'WooCommerce']);
    assert.deepEqual(names('wdrożenie SALESmanago', null), ['SALESmanago']);
    assert.deepEqual(names('Strona wizytówka, projekt graficzny'), []);
});
