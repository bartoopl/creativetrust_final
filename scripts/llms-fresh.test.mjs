/**
 * /llms.txt must list every published article, not a snapshot from a build or
 * from the hourly CMS cache. The builder is pure; the routes read the CMS
 * without the cache and answer within five minutes of a publish.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildLlmsTxt } from '../src/lib/markdown/llms.ts';

const ORIGIN = 'https://www.creativetrust.pl';
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const articles = Array.from({ length: 4 }, (_, index) => ({
    kind: 'blog',
    title: `Checklista ${index + 1}`,
    summary: `Opis ${index + 1}`,
    url: `${ORIGIN}/blog/checklista-${index + 1}.md`,
}));

test('every article passed to the builder appears in llms.txt', () => {
    const txt = buildLlmsTxt({ origin: ORIGIN, pages: [], articles });

    for (const article of articles) {
        assert.ok(txt.includes(article.url), `missing ${article.url}`);
        assert.ok(txt.includes(article.summary), `missing summary for ${article.url}`);
    }
    assert.equal((txt.match(/\.md\)/g) ?? []).length, articles.length);
});

test('llms.txt and llms-full.txt read the CMS without the hourly cache', () => {
    for (const route of ['src/app/llms.txt/route.ts', 'src/app/llms-full.txt/route.ts']) {
        const source = read(route);
        assert.match(source, /getArticleIndex\(\{ fresh: true \}\)/, `${route} must skip the cached index`);
        assert.match(source, /plainTextResponse\([\s\S]*?, 300\)/, `${route} should be CDN-cached for five minutes`);
    }
});
