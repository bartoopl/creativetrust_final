import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { getBlogSeoConfig } from '../src/lib/blog-seo.ts';

const SRC = new URL('../src', import.meta.url).pathname;

function walk(dir) {
    return readdirSync(dir).flatMap((name) => {
        const full = join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });
}

const tsxFiles = walk(SRC).filter((file) => file.endsWith('.tsx'));

test('no React key is assembled from a value and its label', () => {
    // Thrawn, GSC 16.11.2026: `key={item.href + item.label}` leaked "/blogBlog" and
    // "/kontaktKontakt" into the RSC payload, and Google crawled them as 404s.
    const offenders = tsxFiles.filter((file) => /key=\{[^}]*\+[^}]*\}/.test(readFileSync(file, 'utf8')));
    assert.deepEqual(offenders, [], `keys built by concatenation: ${offenders.join(', ')}`);
});

test('the Markdown twin is noindex but still followed', () => {
    const server = readFileSync(join(SRC, 'lib/markdown/server.ts'), 'utf8');
    assert.match(server, /'X-Robots-Tag': 'noindex, follow'/, 'the .md response must keep the twin out of the index and its links crawlable');
});

const EXPECTED_LINKS = {
    'audyt-e-commerce-checklista': ['/uslugi/audyt-e-commerce', '/uslugi/zarzadzanie-e-commerce'],
    'ile-kosztuje-audyt-e-commerce': ['/uslugi/audyt-e-commerce', '/uslugi/zarzadzanie-e-commerce'],
    'audyt-seo-sklepu-internetowego-checklista': ['/uslugi/audyt-e-commerce'],
    'audyt-ux-sklepu-internetowego-checklista': ['/uslugi/audyt-e-commerce'],
    'audyt-strony-internetowej-checklista': ['/uslugi/audyt-strony-internetowej', '/uslugi/strony-www'],
    'ile-kosztuje-audyt-strony-internetowej': ['/uslugi/audyt-strony-internetowej', '/uslugi/strony-www'],
    'tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow': ['/uslugi/strony-www', '/uslugi/e-commerce'],
    'jak-stworzyc-skuteczny-sklep-internetowy-6-czynnikow-ktore-musisz-wziac-pod-uwage': ['/uslugi/e-commerce', '/uslugi/strony-www'],
};

test('the buying-question posts carry the service links they answer for', () => {
    for (const [slug, hrefs] of Object.entries(EXPECTED_LINKS)) {
        const config = getBlogSeoConfig(slug);
        assert.ok(config, `${slug}: no SEO config`);
        const actual = config.links.map((link) => link.href);
        assert.deepEqual(actual, hrefs, `${slug}: wrong service links`);
        for (const link of config.links) {
            assert.ok([...link.title].length >= 8, `${slug}: anchor too short: ${link.title}`);
            assert.ok(link.description.length >= 40, `${slug}: link needs a sentence of context`);
        }
    }
});

test('the service pages link back to the checklists', () => {
    const pages = {
        'app/(pl)/uslugi/audyt-strony-internetowej/page.tsx': '/blog/audyt-strony-internetowej-checklista',
        'app/(pl)/uslugi/e-commerce/page.tsx': '/blog/audyt-e-commerce-checklista',
    };
    for (const [page, checklist] of Object.entries(pages)) {
        const source = readFileSync(join(SRC, page), 'utf8');
        assert.match(source, /<RelatedLinks/, `${page}: no related-reading block`);
        assert.ok(source.includes(checklist), `${page}: missing ${checklist}`);
    }
});
