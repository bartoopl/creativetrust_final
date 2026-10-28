import { test } from 'node:test';
import assert from 'node:assert/strict';
import { portableTextToPlainText } from '../src/lib/markdown/portable-text.ts';
import { portfolioFrontmatter, portfolioMarkdown, projectSummary } from '../src/lib/markdown/portfolio.ts';
import { serializeFrontmatter, parseFrontmatter } from '../src/lib/markdown/frontmatter.ts';
import { buildCreativeWorkSchema, SITE_URL } from '../src/lib/schema.ts';

const block = (text, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }], markDefs: [] });

const project = {
    title: 'Beauty Clinic',
    client: 'BeautyClinic.pl',
    projectUrl: 'https://beautyclinic.pl',
    scopeOfWork: ['Projekt UX/UI', ' Wdrożenie WordPress ', ''],
    categories: [{ title: 'Strony WWW' }, null, { title: 'SEO' }],
    publishedAt: '2024-05-10T10:00:00Z',
    _updatedAt: '2025-01-02T08:00:00Z',
};

test('portableTextToPlainText joins text blocks and skips images', () => {
    const text = portableTextToPlainText([block('Pierwszy  akapit.'), { _type: 'image' }, block('Drugi', 'h2')]);
    assert.equal(text, 'Pierwszy akapit. Drugi');
});

test('portableTextToPlainText accepts a plain string and cuts on a word boundary', () => {
    assert.equal(portableTextToPlainText('  jeden\n dwa  '), 'jeden dwa');
    const cut = portableTextToPlainText('Strona internetowa dla kliniki medycyny estetycznej z rezerwacją wizyt', 40);
    assert.ok(cut.length <= 40, cut);
    assert.ok(cut.endsWith('…'));
    assert.ok(!/\s…$/.test(cut));
    assert.equal(portableTextToPlainText(null), '');
});

test('projectSummary prefers the own description, else builds one from facts', () => {
    assert.equal(projectSummary(project, 'Nowa strona kliniki.'), 'Nowa strona kliniki.');
    const built = projectSummary(project, '');
    assert.match(built, /^Beauty Clinic — realizacja CreativeTrust dla BeautyClinic\.pl\./);
    assert.match(built, /Kategorie: Strony WWW, SEO\./);
    assert.match(built, /Zakres: Projekt UX\/UI, Wdrożenie WordPress\./);
    assert.equal(projectSummary({ title: 'Selfia', client: 'Selfia' }), 'Selfia — realizacja CreativeTrust.');
});

test('portfolio Markdown twin has frontmatter, one H1, facts, scope and the HTML link', () => {
    const canonical = `${SITE_URL}/portfolio/beautyclinic-pl`;
    const summary = projectSummary(project, 'Nowa strona kliniki.');
    const md = portfolioMarkdown({
        doc: project,
        canonical,
        frontmatter: serializeFrontmatter(portfolioFrontmatter(project, canonical, summary)),
        descriptionMarkdown: '# Wyzwanie\n\nKlinika potrzebowała rezerwacji.\n\n## Efekt\n\nWięcej wizyt.',
        mainImageUrl: 'https://cdn.sanity.io/x.jpg',
    });
    const { data, body } = parseFrontmatter(md);
    assert.equal(data.type, 'case-study');
    assert.equal(data.canonical, canonical);
    assert.equal(data.client, 'BeautyClinic.pl');
    assert.equal(data.date, '2024-05-10');
    assert.deepEqual(data.semantic_keywords, ['Strony WWW', 'SEO', 'BeautyClinic.pl']);
    for (const key of ['title', 'description', 'ai_summary', 'target_audience']) assert.ok(data[key], key);

    assert.equal(body.match(/^# /gm).length, 1, 'single H1');
    assert.match(body, /^# Beauty Clinic$/m);
    assert.match(body, /- \*\*Klient:\*\* BeautyClinic\.pl/);
    assert.match(body, /- \*\*Link do projektu:\*\* https:\/\/beautyclinic\.pl/);
    assert.match(body, /^### Wyzwanie$/m, 'description headings nest under ## Opis projektu');
    assert.match(body, /^### Efekt$/m);
    assert.match(body, /## Zakres prac\n\n- Projekt UX\/UI\n- Wdrożenie WordPress\n/);
    assert.ok(body.includes(`Wersja HTML: ${canonical}`));
    assert.ok(!/^#+\s*$/m.test(body), 'no empty headings');
});

test('portfolio Markdown omits empty sections', () => {
    const md = portfolioMarkdown({ doc: { title: 'X' }, canonical: `${SITE_URL}/portfolio/x`, frontmatter: '---\ntitle: X\n---\n' });
    assert.ok(!md.includes('## Opis projektu'));
    assert.ok(!md.includes('## Zakres prac'));
    assert.ok(md.includes('## Informacje o projekcie'));
});

test('CreativeWork schema links the case study to the organization and the client', () => {
    const url = `${SITE_URL}/portfolio/beautyclinic-pl`;
    const schema = buildCreativeWorkSchema({ name: 'Beauty Clinic', url, clientName: 'BeautyClinic.pl', keywords: ['SEO'], image: [], sameAs: 'https://beautyclinic.pl' });
    assert.equal(schema['@type'], 'CreativeWork');
    assert.equal(schema['@id'], `${url}#creativework`);
    assert.deepEqual(schema.creator, { '@id': `${SITE_URL}/#organization` });
    assert.deepEqual(schema.about, { '@type': 'Organization', name: 'BeautyClinic.pl' });
    assert.equal(schema.keywords, 'SEO');
    assert.equal(schema.image, undefined);
});
