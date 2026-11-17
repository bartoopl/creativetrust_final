/**
 * Markdown → Lexical for GFM tables, through the same Payload converter the
 * MCP `saveMarkdownContent` tool calls. The editor config needs a Payload
 * config object; a stub with the collections the features point at is enough
 * for the conversion (no database, no request).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import { editorFeatures } from '../src/payload/editor.ts';
import { lexicalToPortableText } from '../src/lib/richtext/lexical.ts';

const stubConfig = {
    collections: ['media', 'posts', 'knowledge-base', 'portfolio-projects'].map((slug) => ({ slug, fields: [], labels: {} })),
    blocks: [],
    editor: { features: [] },
    admin: {},
    localization: null,
    i18n: {},
};

const editorConfig = await editorConfigFactory.fromFeatures({ config: stubConfig, features: editorFeatures() });
const convert = (markdown) => convertMarkdownToLexical({ editorConfig, markdown });

test('a GFM table in Markdown becomes a Lexical table, not a paragraph of pipes', () => {
    const rows = ['| Obszar | Co sprawdzić | Na co uważać |', '| --- | --- | --- |'];
    for (let i = 1; i <= 14; i += 1) rows.push(`| Obszar ${i} | Punkt ${i} | Ryzyko ${i} |`);

    const state = convert(rows.join('\n'));
    const table = state.root.children[0];

    assert.equal(table.type, 'table');
    assert.equal(table.children.length, 15);
    assert.equal(table.children[0].children.length, 3);
    assert.equal(table.children[0].children[0].headerState, 1, 'first row is the header');
    assert.equal(table.children[14].children[0].headerState, 0);
    assert.doesNotMatch(JSON.stringify(state), /\|/, 'no literal pipes left in the text');
});

test('bold and links inside cells become Lexical marks, then Portable Text', () => {
    const markdown = [
        '| Obszar | Link |',
        '| --- | --- |',
        '| **Płatność** | [poradnik](/blog/jak-placic) |',
    ].join('\n');

    const state = convert(markdown);
    const blocks = lexicalToPortableText(state);
    const table = blocks[0];

    assert.equal(table._type, 'table');
    const bold = table.rows[0][0].spans.find((span) => span.text === 'Płatność');
    assert.ok(bold.marks.includes('strong'), 'bold survives into the cell');
    const linkCell = table.rows[0][1];
    const linkSpan = linkCell.spans.find((span) => (span.marks ?? []).some((mark) => mark.startsWith('link')));
    assert.equal(linkCell.markDefs.find((def) => def._key === linkSpan.marks[0]).href, '/blog/jak-placic');
});

test('a paragraph next to a table keeps its place', () => {
    const state = convert('Wstęp\n\n| A | B |\n| --- | --- |\n| 1 | 2 |\n\nPo tabeli');
    assert.deepEqual(state.root.children.map((node) => node.type), ['paragraph', 'table', 'paragraph']);
});
