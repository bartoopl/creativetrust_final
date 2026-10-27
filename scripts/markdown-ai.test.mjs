import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, serializeFrontmatter } from '../src/lib/markdown/frontmatter.ts';
import { portableTextToMarkdown, escapeMarkdown } from '../src/lib/markdown/portable-text.ts';
import { buildLlmsTxt, buildLlmsFullTxt, CONTENT_SIGNAL } from '../src/lib/markdown/llms.ts';
import { articleFrontmatter } from '../src/lib/markdown/article.ts';
import {
    markdownPages,
    contentFileFor,
    markdownUrlFor,
    markdownTargetFor,
    routeFromMarkdownUrl,
    handlerPathFor,
    routeFromHandlerSegments,
    prefersMarkdown,
} from '../src/lib/markdown/pages.ts';
import { publishedPrices } from '../src/lib/site-services.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT = join(ROOT, 'content', 'ai');
const ORIGIN = 'https://www.creativetrust.pl';
const REQUIRED_KEYS = ['title', 'description', 'date', 'ai_summary', 'target_audience', 'semantic_keywords'];

function walk(dir) {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? walk(path) : name.endsWith('.md') ? [path] : [];
    });
}

const files = walk(CONTENT).map((path) => {
    const raw = readFileSync(path, 'utf8');
    return { path, rel: relative(CONTENT, path), raw, ...parseFrontmatter(raw) };
});
const byRoute = new Map(markdownPages.map((page) => [page.route, files.find((f) => f.rel === contentFileFor(page.route))]));

/** Lines outside fenced code blocks. */
function proseLines(body) {
    let fenced = false;
    return body.split('\n').filter((line) => {
        if (/^(```|~~~)/.test(line)) {
            fenced = !fenced;
            return false;
        }
        return !fenced;
    });
}

// ---------- frontmatter parser ----------

test('parses scalars, quotes, inline lists and block lists', () => {
    const { data, body } = parseFrontmatter(
        [
            '---',
            'title: "Cena: od 3 500 zł"',
            "single: 'It''s fine'",
            'plain: zwykły tekst',
            'inline: [a, "b, c", d]',
            'list:',
            '  - "pierwszy"',
            '  - drugi',
            '---',
            '# Nagłówek',
        ].join('\n'),
    );
    assert.deepEqual(data, {
        title: 'Cena: od 3 500 zł',
        single: "It's fine",
        plain: 'zwykły tekst',
        inline: ['a', 'b, c', 'd'],
        list: ['pierwszy', 'drugi'],
    });
    assert.equal(body, '# Nagłówek');
});

test('a document without frontmatter is returned unchanged', () => {
    assert.deepEqual(parseFrontmatter('# Tylko treść\n'), { data: {}, body: '# Tylko treść\n' });
});

test('serialised frontmatter parses back to the same data and drops empty values', () => {
    const data = { title: 'Tytuł z "cudzysłowem" i \\ ukośnikiem', tags: ['a', 'b: c'], empty: '', none: undefined, list: [] };
    const out = serializeFrontmatter(data);
    assert.deepEqual(parseFrontmatter(`${out}body`).data, { title: data.title, tags: data.tags });
});

test('unsupported YAML is rejected instead of silently misread', () => {
    assert.throws(() => parseFrontmatter('---\n  nested: {a: 1}\n---\n'));
});

// ---------- content/ai files ----------

test('every registered page has a content file and every content file is registered', () => {
    for (const page of markdownPages) assert.ok(byRoute.get(page.route), `missing content/ai/${contentFileFor(page.route)}`);
    const registered = new Set(markdownPages.map((p) => contentFileFor(p.route)));
    for (const file of files) assert.ok(registered.has(file.rel), `${file.rel} is not in markdownPages`);
});

test('every content file has the SEO and AI frontmatter keys', () => {
    for (const file of files) {
        for (const key of REQUIRED_KEYS) {
            const value = file.data[key];
            const filled = Array.isArray(value) ? value.length > 0 && value.every(Boolean) : Boolean(value?.trim());
            assert.ok(filled, `${file.rel}: ${key} is missing or empty`);
        }
        assert.match(file.data.date, /^\d{4}-\d{2}-\d{2}$/, `${file.rel}: date must be YYYY-MM-DD`);
        assert.ok(Array.isArray(file.data.semantic_keywords), `${file.rel}: semantic_keywords must be a list`);
    }
});

test('canonical points at the HTML page the file mirrors', () => {
    for (const page of markdownPages) {
        const file = byRoute.get(page.route);
        assert.equal(file.data.canonical, `${ORIGIN}${page.route}`, file.rel);
    }
});

test('exactly one H1, no skipped levels and no empty headings', () => {
    for (const file of files) {
        const lines = proseLines(file.body);
        const headings = lines.map((line, i) => ({ line, i, m: /^(#{1,6})\s*(.*)$/.exec(line) })).filter((h) => h.m);
        assert.equal(headings.filter((h) => h.m[1].length === 1).length, 1, `${file.rel}: needs exactly one # heading`);
        assert.equal(headings[0].m[1].length, 1, `${file.rel}: the first heading must be #`);
        let previous = 1;
        for (const { m, i } of headings) {
            const level = m[1].length;
            assert.ok(m[2].trim(), `${file.rel}: empty heading`);
            assert.ok(level <= previous + 1, `${file.rel}: heading "${m[2]}" skips a level`);
            previous = level;
            // A heading needs content before the next heading of the same or higher rank.
            const next = lines.slice(i + 1).find((l) => l.trim() !== '');
            const nextLevel = /^(#{1,6})\s/.exec(next ?? '')?.[1].length;
            assert.ok(next !== undefined && (nextLevel === undefined || nextLevel > level), `${file.rel}: heading "${m[2]}" has no content`);
        }
    }
});

test('code fences declare a language', () => {
    for (const file of files) {
        let fenced = false;
        for (const line of file.body.split('\n')) {
            if (!/^(```|~~~)/.test(line)) continue;
            if (!fenced) assert.match(line, /^(```|~~~)\w+/, `${file.rel}: fence without language`);
            fenced = !fenced;
        }
    }
});

test('published prices appear verbatim on their source page twin', () => {
    for (const price of publishedPrices) {
        const file = byRoute.get(price.source);
        assert.ok(file, `no markdown twin for ${price.source}`);
        assert.ok(file.body.includes(price.price), `${file.rel} must quote "${price.price}" (${price.name})`);
    }
});

test('every price in the markdown is a published price', () => {
    const allowed = new Set(publishedPrices.map((p) => p.price));
    for (const file of files) {
        for (const match of file.raw.matchAll(/od [\d\s]+zł netto/g)) {
            assert.ok(allowed.has(match[0]), `${file.rel}: "${match[0]}" is not in publishedPrices`);
        }
    }
});

test('no secrets, HTML comments or hidden text in public markdown', () => {
    const forbidden = [
        [/<!--/, 'HTML comment'],
        [/display\s*:\s*none|visibility\s*:\s*hidden/i, 'hidden text'],
        [/\b(api[_-]?key|secret|password|hasło|token)\s*[:=]/i, 'credential'],
        [/\bsk-[A-Za-z0-9]{16,}|\bAKIA[0-9A-Z]{16}\b|-----BEGIN [A-Z ]*PRIVATE KEY/, 'key material'],
        [/\b(TODO|FIXME)\b/, 'internal note'],
    ];
    for (const file of files) {
        for (const [re, label] of forbidden) assert.doesNotMatch(file.raw, re, `${file.rel}: ${label}`);
    }
});

test('<details> blocks are balanced and have a summary', () => {
    for (const file of files) {
        const open = (file.body.match(/<details>/g) ?? []).length;
        assert.equal(open, (file.body.match(/<\/details>/g) ?? []).length, file.rel);
        assert.equal(open, (file.body.match(/<details>\s*<summary>[^<]+<\/summary>/g) ?? []).length, `${file.rel}: summary`);
    }
});

test('internal .md links in content resolve to a markdown document', () => {
    for (const file of files) {
        for (const [, url] of file.body.matchAll(/\]\((https:\/\/www\.creativetrust\.pl[^)]*\.md)\)/g)) {
            const route = routeFromMarkdownUrl(new URL(url).pathname);
            assert.ok(route && markdownTargetFor(route), `${file.rel}: ${url} has no markdown twin`);
        }
    }
});

// ---------- URL mapping and content negotiation ----------

test('maps .md URLs, handler paths and HTML routes consistently', () => {
    assert.equal(markdownUrlFor('/'), '/index.md');
    assert.equal(routeFromMarkdownUrl('/index.md'), '/');
    assert.equal(routeFromMarkdownUrl('/uslugi/strony-www.md'), '/uslugi/strony-www');
    assert.equal(routeFromMarkdownUrl('/uslugi/strony-www'), null);
    assert.deepEqual(markdownTargetFor('/uslugi/strony-www/'), { kind: 'page', route: '/uslugi/strony-www' });
    assert.deepEqual(markdownTargetFor('/blog/migracja-sklepu-bez-utraty-seo'), { kind: 'blog', route: '/blog/migracja-sklepu-bez-utraty-seo', slug: 'migracja-sklepu-bez-utraty-seo' });
    assert.equal(markdownTargetFor('/baza-wiedzy/crm')?.kind, 'knowledge-base');
    for (const route of ['/polityka-prywatnosci', '/regulamin', '/admin', '/blog', '/blog/kategoria/seo', '/blog/Zly_Slug', '/portfolio']) {
        assert.equal(markdownTargetFor(route), null, route);
    }
    for (const page of markdownPages) {
        const path = handlerPathFor({ kind: 'page', route: page.route });
        assert.equal(routeFromHandlerSegments(path.split('/').slice(2)), page.route);
    }
});

test('only clients that prefer markdown get it', () => {
    assert.equal(prefersMarkdown('text/markdown'), true);
    assert.equal(prefersMarkdown('text/markdown, text/html;q=0.9, */*;q=0.8'), true);
    assert.equal(prefersMarkdown('text/markdown, text/html, */*'), true);
    assert.equal(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'), false);
    assert.equal(prefersMarkdown('text/html, text/markdown;q=0.5'), false);
    assert.equal(prefersMarkdown('text/markdown;q=0'), false);
    assert.equal(prefersMarkdown(null), false);
});

// ---------- llms.txt ----------

function llmsInput() {
    const pages = markdownPages.map((page) => {
        const file = byRoute.get(page.route);
        return { title: file.data.title, description: file.data.description, url: `${ORIGIN}${markdownUrlFor(page.route)}`, section: page.section, optional: page.optional };
    });
    const articles = [
        { kind: 'blog', title: 'Migracja sklepu bez utraty SEO', url: `${ORIGIN}/blog/migracja-sklepu-bez-utraty-seo.md`, summary: 'Checklista\nmigracji.' },
        { kind: 'knowledge-base', title: 'CRM', url: `${ORIGIN}/baza-wiedzy/crm.md`, summary: null },
    ];
    return { origin: ORIGIN, pages, articles };
}

test('llms.txt has a title, summary, content signal and links only to existing .md documents', () => {
    const txt = buildLlmsTxt(llmsInput());
    assert.match(txt, /^# CreativeTrust\n\n> .+/);
    assert.ok(txt.includes(`Content-Signal: ${CONTENT_SIGNAL}`));
    assert.equal(CONTENT_SIGNAL.replace(/\s/g, ''), 'search=yes,ai-input=yes,ai-train=no');

    const links = [...txt.matchAll(/^- \[[^\]]+\]\(([^)]+)\)/gm)].map((m) => m[1]);
    assert.ok(links.length >= markdownPages.length);
    for (const url of links) {
        if (url === `${ORIGIN}/llms-full.txt`) continue;
        assert.ok(url.startsWith(`${ORIGIN}/`) && url.endsWith('.md'), `${url} must be an absolute .md URL`);
        const route = routeFromMarkdownUrl(new URL(url).pathname);
        const target = route && markdownTargetFor(route);
        assert.ok(target, `${url} does not resolve`);
        if (target.kind === 'page') assert.ok(byRoute.get(target.route), `${url} has no content file`);
    }
    for (const page of markdownPages) assert.ok(links.includes(`${ORIGIN}${markdownUrlFor(page.route)}`), `${page.route} missing from llms.txt`);
});

test('llms.txt omits pages without substantive value and keeps descriptions on one line', () => {
    const txt = buildLlmsTxt(llmsInput());
    assert.doesNotMatch(txt, /polityka-prywatnosci|regulamin|\/admin|koszyk|logowanie|panel-klienta/);
    assert.ok(txt.includes('): Checklista migracji.'));
    assert.ok(txt.includes('[CRM](https://www.creativetrust.pl/baza-wiedzy/crm.md)\n'));
    // noindex campaign landings live under Optional, after the main sections.
    const optional = txt.indexOf('## Optional');
    assert.ok(txt.indexOf('/uslugi/landing-page-pod-reklamy.md') > optional);
    assert.ok(txt.indexOf('/uslugi/strony-www.md') < optional);
});

test('llms.txt still lists every static page when Sanity returns nothing', () => {
    const txt = buildLlmsTxt({ ...llmsInput(), articles: [] });
    assert.doesNotMatch(txt, /## Blog|## Baza wiedzy/);
    assert.equal([...txt.matchAll(/\.md\)/g)].length, markdownPages.length);
});

test('llms-full.txt contains every page with a single H1', () => {
    const { pages, articles } = llmsInput();
    const documents = markdownPages.map((page, i) => ({ url: pages[i].url, body: byRoute.get(page.route).body }));
    const full = buildLlmsFullTxt({ origin: ORIGIN, documents, articles });
    assert.equal(proseLines(full).filter((l) => /^#\s/.test(l)).length, 1);
    for (const doc of documents) assert.ok(full.includes(`Źródło: ${doc.url}`));
    assert.ok(full.includes('## Cennik stron WWW: ile kosztuje strona internetowa dla firmy'));
    assert.ok(full.includes('### Landing page — od 3 500 zł netto'));
    assert.ok(full.includes('/baza-wiedzy/crm.md'));
});

// ---------- Portable Text → Markdown ----------

const span = (text, marks = []) => ({ _type: 'span', text, marks });
const block = (children, extra = {}) => ({ _type: 'block', style: 'normal', markDefs: [], children, ...extra });

test('converts headings, paragraphs and blockquotes', () => {
    const md = portableTextToMarkdown([
        block([span('Wstęp')], { style: 'h2' }),
        block([span('Akapit')]),
        block([span('Szczegół')], { style: 'h3' }),
        block([span('Mniejszy')], { style: 'h4' }),
        block([span('Cytat\ndrugi wiersz')], { style: 'blockquote' }),
        block([span('Tytuł w treści')], { style: 'h1' }),
    ]);
    assert.equal(md, '## Wstęp\n\nAkapit\n\n### Szczegół\n\n#### Mniejszy\n\n> Cytat\n> drugi wiersz\n\n## Tytuł w treści');
});

test('re-ranks heading levels so they never skip and drops bold inside headings', () => {
    // Knowledge-base entries use h4 as their only heading style.
    assert.equal(
        portableTextToMarkdown([block([span('Jak działa?', ['strong'])], { style: 'h4' }), block([span('Opis')]), block([span('Zalety')], { style: 'h4' })]),
        '## Jak działa?\n\nOpis\n\n## Zalety',
    );
    assert.equal(
        portableTextToMarkdown([block([span('A')], { style: 'h2' }), block([span('B')], { style: 'h4' }), block([span('C')], { style: 'h3' }), block([span('D')], { style: 'h4' })]),
        '## A\n\n### B\n\n### C\n\n#### D',
    );
});

test('skips empty blocks so no empty headings are produced', () => {
    assert.equal(portableTextToMarkdown([block([span('  ')], { style: 'h2' }), block([span('Treść')])]), 'Treść');
});

test('converts strong, em, code and links, merging spans', () => {
    const md = portableTextToMarkdown([
        block(
            [span('Zobacz '), span('cennik', ['strong', 'l1']), span(' stron', ['l1']), span(', '), span('ważne ', ['em']), span('npm i', ['code']), span(' '), span('a', ['strong']), span('b', ['strong'])],
            { markDefs: [{ _key: 'l1', _type: 'link', href: 'https://www.creativetrust.pl/uslugi/tworzenie-stron-www-cennik' }] },
        ),
    ]);
    assert.equal(md, 'Zobacz [**cennik** stron](https://www.creativetrust.pl/uslugi/tworzenie-stron-www-cennik), *ważne* `npm i` **ab**');
});

test('converts bullet and numbered lists, including nesting', () => {
    const md = portableTextToMarkdown([
        block([span('Lista')]),
        block([span('jeden')], { listItem: 'bullet', level: 1 }),
        block([span('zagnieżdżony')], { listItem: 'bullet', level: 2 }),
        block([span('dwa')], { listItem: 'bullet', level: 1 }),
        block([span('Kroki')]),
        block([span('audyt')], { listItem: 'number', level: 1 }),
        block([span('podkrok')], { listItem: 'number', level: 2 }),
        block([span('wdrożenie')], { listItem: 'number', level: 1 }),
    ]);
    assert.equal(md, 'Lista\n\n- jeden\n    - zagnieżdżony\n- dwa\n\nKroki\n\n1. audyt\n    1. podkrok\n2. wdrożenie');
});

test('renders images through the URL callback and code blocks with a language', () => {
    const image = { _type: 'image', asset: { _ref: 'image-abc-100x100-png' }, alt: 'Schemat [headless]', caption: 'Architektura' };
    const md = portableTextToMarkdown(
        [image, { _type: 'image', asset: { _ref: 'x' } }, { _type: 'code', code: 'const a = 1;\n', language: 'typescript' }, { _type: 'code', code: 'plain' }, { _type: 'unknownEmbed' }],
        { imageUrl: (img) => (img.alt ? 'https://cdn.sanity.io/images/abc.png' : null) },
    );
    assert.equal(md, '![Schemat headless](https://cdn.sanity.io/images/abc.png)\n\n*Architektura*\n\n```typescript\nconst a = 1;\n```\n\n```text\nplain\n```');
});

test('escapes text that would otherwise become markup', () => {
    assert.equal(escapeMarkdown('a*b_c [x] <!-- y'), 'a\\*b\\_c \\[x\\] \\<!-- y');
    assert.equal(portableTextToMarkdown([block([span('# nie nagłówek')]), block([span('1. nie lista')])]), '\\# nie nagłówek\n\n\\1. nie lista');
    assert.equal(portableTextToMarkdown(null), '');
});

// ---------- article frontmatter ----------

test('article frontmatter fills the SEO and AI keys from Sanity fields', () => {
    const fm = articleFrontmatter(
        {
            title: 'Migracja sklepu',
            seoDescription: 'Opis SEO',
            excerpt: 'Krótki\nlead',
            publishedAt: '2025-03-04T10:00:00Z',
            _updatedAt: '2025-05-06T10:00:00Z',
            categories: [{ title: 'E-commerce' }, null],
            author: { name: 'Jan' },
        },
        'blog',
        `${ORIGIN}/blog/migracja-sklepu`,
    );
    assert.equal(fm.title, 'Migracja sklepu');
    assert.equal(fm.description, 'Opis SEO');
    assert.equal(fm.date, '2025-03-04');
    assert.equal(fm.updated, '2025-05-06');
    assert.equal(fm.ai_summary, 'Krótki lead');
    assert.deepEqual(fm.semantic_keywords, ['E-commerce']);
    assert.equal(fm.author, 'Jan');
    const parsed = parseFrontmatter(serializeFrontmatter(fm)).data;
    for (const key of REQUIRED_KEYS) assert.ok(parsed[key]?.length, key);

    const kb = articleFrontmatter({ title: 'CRM', shortDescription: 'System', tags: ['sprzedaż'] }, 'knowledge-base', `${ORIGIN}/baza-wiedzy/crm`);
    assert.deepEqual(kb.semantic_keywords, ['sprzedaż']);
    assert.equal(kb.description, 'System');
    assert.equal(kb.date, undefined);
});
