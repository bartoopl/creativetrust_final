import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyKnowledgeBaseSeo } from '../src/lib/knowledge-base-seo.ts';
import { portableTextToMarkdown } from '../src/lib/markdown/portable-text.ts';

const sanityEntry = { title: 'Nazwa', letter: 'c', shortDescription: 'Z Sanity', seoTitle: 'Tytuł SEO', seoDescription: 'Opis z Sanity', content: [] };

const text = (block) => block.children.map((child) => child.text).join('');
const headings = (entry, style) => entry.content.filter((block) => block.style === style).map(text);
const hrefs = (entry) => entry.content.flatMap((block) => block.markDefs.map((def) => def.href));

test('sales-manago carries the H1, H2s and link from WEW-12', () => {
    const entry = applyKnowledgeBaseSeo('sales-manago', sanityEntry);
    assert.equal(entry.headline, 'SALESmanago – co to jest i jak działa platforma marketing automation');
    assert.deepEqual(headings(entry, 'h2'), [
        'Co to jest SALESmanago',
        'Najważniejsze funkcje',
        'Ile kosztuje SALESmanago',
        'SALESmanago a inne platformy marketing automation',
        'Wdrożenie SALESmanago z agencją',
    ]);
    assert.ok(hrefs(entry).includes('/uslugi/marketing-automation'));
});

test('cps carries the H1, H2s, links and meta description from WEW-12', () => {
    const entry = applyKnowledgeBaseSeo('cps', sanityEntry);
    assert.equal(entry.headline, 'CPS (Cost Per Sale) – co to jest i jak obliczyć');
    assert.deepEqual(headings(entry, 'h2'), ['Co to jest CPS', 'Wzór i przykład obliczenia', 'CPS a CPA i ROAS', 'Kiedy stosować model CPS']);
    assert.ok(hrefs(entry).includes('/baza-wiedzy/cpa'));
    assert.ok(hrefs(entry).includes('/blog/roas-cac-ltv-w-performance-marketingu'));
    assert.match(entry.seoDescription, /CPS = koszt kampanii \/ liczba sprzedaży/);
});

test('overridden copy respects the 160-character limits of the Sanity schema', () => {
    for (const slug of ['sales-manago', 'cps']) {
        const entry = applyKnowledgeBaseSeo(slug, sanityEntry);
        assert.ok(entry.seoDescription.length <= 160, `${slug} seoDescription: ${entry.seoDescription.length}`);
        assert.ok(entry.shortDescription.length <= 160, `${slug} shortDescription: ${entry.shortDescription.length}`);
    }
});

test('fields without an override stay as Sanity sent them', () => {
    const salesManago = applyKnowledgeBaseSeo('sales-manago', sanityEntry);
    assert.equal(salesManago.title, 'Nazwa');
    assert.equal(salesManago.seoTitle, 'Tytuł SEO');
    assert.equal(salesManago.seoDescription, 'Opis z Sanity');
    assert.equal(applyKnowledgeBaseSeo('cps', sanityEntry).shortDescription, 'Z Sanity');
});

test('other slugs and missing entries pass through untouched', () => {
    assert.equal(applyKnowledgeBaseSeo('cpa', sanityEntry), sanityEntry);
    assert.equal(applyKnowledgeBaseSeo('constructor', sanityEntry), sanityEntry);
    assert.equal(applyKnowledgeBaseSeo('cps', null), null);
});

test('override content is valid Portable Text for the Markdown twin', () => {
    for (const slug of ['sales-manago', 'cps']) {
        const { content } = applyKnowledgeBaseSeo(slug, sanityEntry);
        assert.equal(new Set(content.map((block) => block._key)).size, content.length);
        for (const block of content) {
            const declared = block.markDefs.map((def) => def._key).sort();
            const used = block.children.flatMap((child) => child.marks).filter((mark) => mark !== 'strong').sort();
            assert.deepEqual(used, declared);
        }
        const markdown = portableTextToMarkdown(content);
        assert.match(markdown, /^## /m);
        assert.match(markdown, /\]\(\//);
    }
});
