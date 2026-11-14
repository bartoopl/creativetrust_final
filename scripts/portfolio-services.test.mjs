import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CATEGORY_SERVICES, servicesForCategories } from '../src/lib/portfolio-services.ts';
import { portfolioPageTitle } from '../src/lib/portfolio-title.ts';
import { portfolioMarkdown, projectCategorySlugs } from '../src/lib/markdown/portfolio.ts';

const root = new URL('../', import.meta.url);

test('the website category yields exactly one link to the website service page', () => {
    assert.deepEqual(servicesForCategories(['strony-www']), [{ href: '/uslugi/strony-www', label: 'strony internetowe dla firm' }]);
});

test('two mapped categories yield two distinct links, in category order', () => {
    const services = servicesForCategories(['strony-www', 'e-commerce']);
    assert.deepEqual(services.map((service) => service.href), ['/uslugi/strony-www', '/uslugi/e-commerce']);
    assert.equal(services.length, 2);
    assert.equal(new Set(services.map((service) => service.href)).size, services.length);
});

test('a duplicated category keeps a single link', () => {
    assert.deepEqual(servicesForCategories(['e-commerce', 'e-commerce']), [{ href: '/uslugi/e-commerce', label: 'e-commerce' }]);
});

test('unmapped and unknown categories yield nothing', () => {
    for (const slug of ['case-study', 'performance-marketing', 'obsluga-techniczna-strony-www', 'nie-ma-takiej']) {
        assert.deepEqual(servicesForCategories([slug]), [], slug);
        assert.equal(CATEGORY_SERVICES[slug], undefined, `${slug} must not map to a service`);
    }
    assert.deepEqual(servicesForCategories([]), []);
    assert.deepEqual(servicesForCategories([null, undefined, '']), []);
});

test('at most two links even with more mapped categories', () => {
    const services = servicesForCategories(['strony-www', 'e-commerce', 'strony-www']);
    assert.equal(services.length, 2);
});

test('seoTitle replaces the client formula, and its whitespace is collapsed', () => {
    assert.equal(
        portfolioPageTitle({ seoTitle: '  Strona klubu   z biletami online ', title: 'domena.pl', client: 'Klient' }),
        'Strona klubu z biletami online',
    );
});

test('without seoTitle the title is exactly the previous formula', () => {
    // Values from live projects: the title used to be "{name} — realizacja dla {client}".
    assert.equal(portfolioPageTitle({ title: 'aurumgorzow-pl', client: 'Aurum Gorzów' }), 'aurumgorzow-pl — realizacja dla Aurum Gorzów');
    assert.equal(portfolioPageTitle({ title: 'Acme', client: 'acme' }), 'Acme — realizacja');
    assert.equal(portfolioPageTitle({ title: 'Acme', client: null }), 'Acme — realizacja');
    assert.equal(portfolioPageTitle({ title: '  Acme  ', client: '  Inna Firma ' }), 'Acme — realizacja dla Inna Firma');
});

test('the page renders the block and delegates the title to the helper', () => {
    const page = readFileSync(new URL('src/app/(pl)/portfolio/[slug]/page.tsx', root), 'utf8');
    assert.match(page, /portfolioPageTitle\(project\)/, 'generateMetadata uses the shared title');
    assert.match(page, /Powiązane usługi/);
    assert.match(page, /relatedServices\.map/);
});

test('category slugs come from the CMS shape and from a plain string', () => {
    assert.deepEqual(projectCategorySlugs({ categories: [{ slug: { current: 'strony-www' } }, { slug: 'e-commerce' }] }), ['strony-www', 'e-commerce']);
    assert.deepEqual(projectCategorySlugs({ categories: [null, {}] }), []);
});

test('the Markdown twin lists the same services under "Zakres prac"', () => {
    const md = portfolioMarkdown({
        doc: { title: 'Klub', client: 'Aurum', scopeOfWork: ['Projekt', 'Wdrożenie'], categories: [{ title: 'Strony www', slug: { current: 'strony-www' } }] },
        canonical: 'https://www.creativetrust.pl/portfolio/klub',
        frontmatter: '---\ntitle: Klub\n---',
        services: servicesForCategories(['strony-www']),
    });
    assert.match(md, /## Zakres prac/);
    assert.match(md, /## Powiązane usługi\n\n- \[strony internetowe dla firm\]\(\/uslugi\/strony-www\)/);
    assert.ok(md.indexOf('## Powiązane usługi') > md.indexOf('## Zakres prac'));
    // An unmapped project has no heading at all.
    const plain = portfolioMarkdown({ doc: { title: 'X' }, canonical: 'https://www.creativetrust.pl/portfolio/x', frontmatter: '---\n---', services: [] });
    assert.doesNotMatch(plain, /Powiązane usługi/);
});
