import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { lexicalToPortableText, plainTextToPortableText, portableTextToLexical } from '../src/lib/richtext/lexical.ts';
import { portableTextToMarkdown } from '../src/lib/markdown/portable-text.ts';
import { urlFor, imageVariantUrl } from '../src/lib/media.ts';
import { slugify } from '../src/payload/slugify.ts';

const span = (text, marks = []) => ({ _type: 'span', text, marks });
const block = (children, extra = {}) => ({ _type: 'block', style: 'normal', markDefs: [], children, ...extra });

const roundTrip = (blocks, options) => lexicalToPortableText(portableTextToLexical(blocks, options));

test('headings, quotes, marks and links survive Portable Text → Lexical → Portable Text', () => {
    const source = [
        block([span('Tytuł')], { style: 'h2' }),
        block([span('Zwykły '), span('gruby', ['strong']), span(' i '), span('kursywa', ['em']), span(' oraz '), span('kod', ['code'])]),
        block([span('Link: '), span('tutaj', ['l1'])], { markDefs: [{ _key: 'l1', _type: 'link', href: 'https://example.com', blank: true }] }),
        block([span('Cytat')], { style: 'blockquote' }),
        block([span('linia 1\nlinia 2')]),
    ];
    const md = (blocks) => portableTextToMarkdown(blocks);
    assert.equal(md(roundTrip(source)), md(source));
    const link = roundTrip(source)[2];
    assert.deepEqual(link.markDefs, [{ _key: 'link0', _type: 'link', href: 'https://example.com', blank: true }]);
});

test('nested and mixed lists keep their type and level', () => {
    const source = [
        block([span('a')], { listItem: 'bullet', level: 1 }),
        block([span('a.1')], { listItem: 'bullet', level: 2 }),
        block([span('b')], { listItem: 'bullet', level: 1 }),
        block([span('1')], { listItem: 'number', level: 1 }),
        block([span('2')], { listItem: 'number', level: 1 }),
    ];
    const back = roundTrip(source).map((b) => [b.listItem, b.level, b.children[0].text]);
    assert.deepEqual(back, [
        ['bullet', 1, 'a'],
        ['bullet', 2, 'a.1'],
        ['bullet', 1, 'b'],
        ['number', 1, '1'],
        ['number', 1, '2'],
    ]);
    const lexical = portableTextToLexical(source);
    assert.deepEqual(lexical.root.children.map((n) => n.listType), ['bullet', 'number']);
});

test('images become uploads and come back with the populated media document', () => {
    const lexical = portableTextToLexical([{ _type: 'image', asset: { _ref: 'image-abc' }, alt: 'Alt' }], { resolveImage: () => 7 });
    assert.deepEqual(lexical.root.children[0], { type: 'upload', version: 3, format: '', relationTo: 'media', value: 7, fields: {} });
    lexical.root.children[0].value = { id: 7, url: '/api/media/file/a.png', alt: 'Alt' };
    const [image] = lexicalToPortableText(lexical);
    assert.equal(image._type, 'image');
    assert.equal(image.alt, 'Alt');
    assert.equal(image.asset.url, '/api/media/file/a.png');
    // Unresolvable images are dropped rather than rendered broken.
    assert.equal(portableTextToLexical([{ _type: 'image', asset: { _ref: 'x' } }]).root.children.length, 0);
});

test('internal links resolve to the linked document URL', () => {
    const lexical = { root: { type: 'root', children: [{ type: 'paragraph', children: [
        { type: 'link', fields: { linkType: 'internal', doc: { relationTo: 'posts', value: { slug: 'wpis' } } }, children: [{ type: 'text', text: 'wpis', format: 0 }] },
    ] }] } };
    const [paragraph] = lexicalToPortableText(lexical, { internalHref: (collection, doc) => (collection === 'posts' ? `/blog/${doc.slug}` : null) });
    assert.equal(paragraph.markDefs[0].href, '/blog/wpis');
});

test('plain-text descriptions split into paragraphs', () => {
    assert.deepEqual(plainTextToPortableText('A\nB\n\n  C  ').map((b) => b.children[0].text), ['A\nB', 'C']);
});

test('image URLs pick the smallest stored variant that covers the width', () => {
    const asset = {
        url: '/api/media/file/a.png',
        sizes: {
            thumbnail: { url: '/api/media/file/a-400.webp', width: 400 },
            card: { url: '/api/media/file/a-800.webp', width: 800 },
            large: { url: null, width: null },
            og: { url: '/api/media/file/a-og.jpg', width: 1200, height: 630 },
        },
    };
    const image = { asset };
    assert.equal(urlFor(image).width(300).url(), 'https://www.creativetrust.pl/api/media/file/a-400.webp');
    assert.equal(urlFor(image).width(800).url(), 'https://www.creativetrust.pl/api/media/file/a-800.webp');
    // No variant that wide (small upload): the original.
    assert.equal(urlFor(image).width(1200).url(), 'https://www.creativetrust.pl/api/media/file/a.png');
    assert.equal(urlFor(image).width(1200).height(630).url(), 'https://www.creativetrust.pl/api/media/file/a-og.jpg');
    assert.equal(imageVariantUrl(asset, 400), 'https://www.creativetrust.pl/api/media/file/a-400.webp');
    assert.equal(urlFor(null).url(), '');
});

test('slugify handles Polish letters', () => {
    assert.equal(slugify('Zdjęcie główne – Łódź, sklep #1'), 'zdjecie-glowne-lodz-sklep-1');
});

// ---------------------------------------------------------------- tables (GFM)

/** Serialized Lexical table as Payload stores it: header row flagged per cell. */
const lexicalTable = (rows) => ({
    type: 'table',
    children: rows.map((cells, rowIndex) => ({
        type: 'tablerow',
        children: cells.map((content) => ({
            type: 'tablecell',
            headerState: rowIndex === 0 ? 1 : 0,
            children: [{
                type: 'paragraph',
                children: typeof content === 'string' ? [{ type: 'text', text: content, format: 0 }] : content,
            }],
        })),
    })),
});

test('a 3×15 GFM table keeps its header, columns and every row', () => {
    const rows = [['Obszar', 'Co sprawdzić', 'Na co uważać']];
    for (let i = 1; i <= 14; i += 1) rows.push([`Obszar ${i}`, `Punkt ${i}`, `Ryzyko ${i}`]);

    const blocks = lexicalToPortableText({ root: { type: 'root', children: [lexicalTable(rows)] } });
    assert.equal(blocks.length, 1);
    const table = blocks[0];
    assert.equal(table._type, 'table');
    assert.deepEqual(table.head.map((cell) => cell.spans[0].text), ['Obszar', 'Co sprawdzić', 'Na co uważać']);
    assert.equal(table.rows.length, 14);
    assert.deepEqual(table.rows[13].map((cell) => cell.spans[0].text), ['Obszar 14', 'Punkt 14', 'Ryzyko 14']);

    // Back to Lexical for writing through MCP: header row again carries headerState.
    const lexical = portableTextToLexical(blocks);
    const back = lexical.root.children[0];
    assert.equal(back.type, 'table');
    assert.equal(back.children.length, 15);
    assert.equal(back.children[0].children[0].headerState, 1);
    assert.equal(back.children[1].children[0].headerState, 0);
});

test('bold and a link inside a table cell survive the round trip', () => {
    const cell = [
        { type: 'text', text: 'Płatność ', format: 0 },
        { type: 'text', text: 'online', format: 1 },
        { type: 'link', fields: { linkType: 'custom', url: '/blog/jak-placic' }, children: [{ type: 'text', text: ' według poradnika', format: 0 }] },
    ];
    const blocks = lexicalToPortableText({ root: { type: 'root', children: [lexicalTable([['Obszar', 'Link'], [cell, 'brak']])] } });
    const table = blocks[0];
    const spans = table.rows[0][0].spans;

    assert.equal(spans.map((s) => s.text).join(''), 'Płatność online według poradnika');
    assert.ok(spans.find((s) => s.text === 'online').marks.includes('strong'));
    const linkKey = spans[spans.length - 1].marks.find((mark) => mark.startsWith('link'));
    assert.equal(table.rows[0][0].markDefs.find((def) => def._key === linkKey).href, '/blog/jak-placic');

    const lexical = portableTextToLexical(blocks);
    const link = lexical.root.children[0].children[1].children[0].children[0].children.find((node) => node.type === 'link');
    assert.equal(link.fields.url, '/blog/jak-placic');
});

test('the Markdown twin renders a table as GFM, escaping pipes', () => {
    const blocks = [{
        _type: 'table',
        _key: 't1',
        head: [{ spans: [span('Obszar')] }, { spans: [span('Uwaga')] }],
        rows: [[{ spans: [span('Ceny | rabaty')] }, { spans: [span('płatność online', ['strong'])] }]],
    }];
    assert.equal(
        portableTextToMarkdown(blocks),
        '| Obszar | Uwaga |\n| --- | --- |\n| Ceny \\| rabaty | **płatność online** |',
    );
});

test('the blog body renders tables through the shared Portable Text component', () => {
    const source = readFileSync(new URL('../src/components/PortableTextContent.tsx', import.meta.url), 'utf8');
    assert.match(source, /table: \(\{ value \}: any\)/);
    assert.match(source, /<table className="ct-table">/);
    assert.match(source, /<th key=\{index\} scope="col">/);
});
