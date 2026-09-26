import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildTools } from '../src/lib/webmcp/tools.ts';
import { findModelContext, registerTools } from '../src/lib/webmcp/register.ts';
import { parseArticleQuery, articleSearchGroq, matchTerms, toHit } from '../src/lib/webmcp/articles.ts';
import { services, seoLandings, publishedPrices } from '../src/lib/site-services.ts';

const ORIGIN = 'https://www.creativetrust.pl';
const parse = (result) => JSON.parse(result.content[0].text);

function tools(searchArticles = async () => []) {
    const list = buildTools({ origin: ORIGIN, services, landings: seoLandings, prices: publishedPrices, searchArticles });
    return Object.fromEntries(list.map((t) => [t.name, t]));
}

// ---------- tool definitions ----------

test('every tool is read-only, described and has an object input schema', () => {
    for (const tool of Object.values(tools())) {
        assert.equal(tool.annotations?.readOnlyHint, true, tool.name);
        assert.match(tool.name, /^[a-z_]+$/);
        assert.ok(tool.description.length > 40, `${tool.name} needs a useful description`);
        assert.equal(tool.inputSchema.type, 'object');
    }
});

test('list_services returns every service with absolute URLs and its landing pages', async () => {
    const all = parse(await tools().list_services.execute({}));
    assert.deepEqual(all.map((s) => s.service), services.map((s) => s.slug));
    const ecommerce = all.find((s) => s.service === 'e-commerce');
    assert.equal(ecommerce.url, `${ORIGIN}/uslugi/e-commerce`);
    assert.ok(ecommerce.pages.some((p) => p.url === `${ORIGIN}/uslugi/headless-woocommerce`));
    assert.equal(all.flatMap((s) => s.pages).length, seoLandings.length, 'every landing belongs to a service');
});

test('list_services filters and rejects unknown services', async () => {
    const one = parse(await tools().list_services.execute({ service: 'social-media' }));
    assert.equal(one.length, 1);
    const bad = await tools().list_services.execute({ service: 'seo' });
    assert.equal(bad.isError, true);
});

test('get_pricing returns only published prices, or says the service is quoted individually', async () => {
    const www = parse(await tools().get_pricing.execute({ service: 'strony-www' }));
    assert.deepEqual(www.prices.map((p) => p.price), publishedPrices.filter((p) => p.service === 'strony-www').map((p) => p.price));
    assert.equal(www.currency, 'PLN');
    assert.equal(www.net, true);
    const ma = parse(await tools().get_pricing.execute({ service: 'marketing-automation' }));
    assert.deepEqual(ma.prices, []);
    assert.match(ma.note, /quoted individually/);
    assert.equal(ma.quote, `${ORIGIN}/kontakt`);
    assert.equal((await tools().get_pricing.execute({})).isError, true);
});

test('search_articles validates and clamps input before searching', async () => {
    const calls = [];
    const t = tools(async (q, limit) => {
        calls.push([q, limit]);
        return [{ title: 'Headless', url: `${ORIGIN}/blog/headless`, type: 'blog' }];
    });
    assert.equal(parse(await t.search_articles.execute({ query: '  headless  ', limit: 50 }))[0].title, 'Headless');
    await t.search_articles.execute({ query: 'seo', limit: 'x' });
    assert.deepEqual(calls, [['headless', 10], ['seo', 5]]);
    assert.equal((await t.search_articles.execute({ query: 'a' })).isError, true);
    assert.equal((await t.search_articles.execute({ query: 42 })).isError, true);
});

test('search_articles reports failures as a tool error instead of throwing', async () => {
    const t = tools(async () => { throw new Error('down'); });
    const result = await t.search_articles.execute({ query: 'seo' });
    assert.equal(result.isError, true);
});

// ---------- registration ----------

test('findModelContext prefers document, falls back to navigator, ignores non-APIs', () => {
    const api = { registerTool() {} };
    assert.equal(findModelContext({ modelContext: api }, {}), api);
    assert.equal(findModelContext({}, { modelContext: api }), api);
    assert.equal(findModelContext({ modelContext: {} }, undefined), null);
    assert.equal(findModelContext(undefined, undefined), null);
});

test('registerTools is a no-op without the API', async () => {
    assert.deepEqual(await registerTools(null, [{ name: 'a' }], new AbortController().signal), []);
});

test('registerTools passes the signal, skips rejected tools, and unregisters handles on abort', async () => {
    const seen = [];
    let unregistered = 0;
    const context = {
        async registerTool(tool, options) {
            seen.push([tool.name, options.signal]);
            if (tool.name === 'bad') throw new DOMException('nope', 'NotAllowedError');
            return tool.name === 'legacy' ? { unregister: () => unregistered++ } : undefined;
        },
    };
    const controller = new AbortController();
    const names = await registerTools(context, [{ name: 'a' }, { name: 'bad' }, { name: 'legacy' }], controller.signal);
    assert.deepEqual(names, ['a', 'legacy']);
    assert.ok(seen.every(([, signal]) => signal === controller.signal));
    controller.abort();
    assert.equal(unregistered, 1);
});

// ---------- article search endpoint helpers ----------

test('parseArticleQuery trims, strips wildcards and clamps the limit', () => {
    assert.deepEqual(parseArticleQuery(new URLSearchParams('q=  migracja   woo*  &limit=99')), { ok: true, query: 'migracja woo', limit: 10 });
    assert.deepEqual(parseArticleQuery(new URLSearchParams('q=seo&limit=abc')), { ok: true, query: 'seo', limit: 5 });
    assert.equal(parseArticleQuery(new URLSearchParams('q=*')).ok, false);
    assert.equal(parseArticleQuery(new URLSearchParams(`q=${'a'.repeat(101)}`)).ok, false);
});

test('article search GROQ excludes drafts and uses a literal, bounded slice', () => {
    const groq = articleSearchGroq(7);
    assert.match(groq, /!\(_id in path\("drafts\.\*\*"\)\)/);
    assert.match(groq, /\[0\.\.\.7\]/);
    assert.match(articleSearchGroq(1000), /\[0\.\.\.10\]/);
    assert.doesNotMatch(groq, /\$\{/);
    assert.deepEqual(matchTerms('migracja woo'), ['migracja*', 'woo*']);
});

test('toHit maps blog and knowledge-base documents to public URLs', () => {
    assert.deepEqual(toHit({ _type: 'blogPost', title: 'A', slug: 'a', summary: 'S', publishedAt: '2026-01-01' }, ORIGIN),
        { title: 'A', url: `${ORIGIN}/blog/a`, type: 'blog', summary: 'S', publishedAt: '2026-01-01' });
    assert.deepEqual(toHit({ _type: 'knowledgeBase', title: 'B', slug: 'b', summary: null }, ORIGIN),
        { title: 'B', url: `${ORIGIN}/baza-wiedzy/b`, type: 'knowledge-base' });
});

// ---------- data integrity ----------

test('published prices still appear verbatim on their source pages', () => {
    for (const { price, source } of publishedPrices) {
        const page = readFileSync(new URL(`../src/app${source}/page.tsx`, import.meta.url), 'utf8');
        assert.ok(page.includes(`'${price}'`), `${price} not found on ${source}`);
    }
});

test('the contact form is exposed declaratively without autosubmit and without the honeypot', () => {
    const form = readFileSync(new URL('../src/components/ContactForm.tsx', import.meta.url), 'utf8');
    const formAt = form.search(/<form\s*\n/);
    const formTag = form.slice(formAt).match(/<form[\s\S]*?\n\s*>/)[0];
    assert.match(formTag, /toolname="contact_creativetrust"/);
    assert.doesNotMatch(formTag, /toolautosubmit/, 'the visitor must review and send the message');
    const honeypotAt = form.indexOf('name={HONEYPOT_FIELD_NAME}');
    assert.ok(honeypotAt !== -1 && honeypotAt < formAt, 'honeypot must sit outside <form>');
    // form.reset() cancels the agent's pending declarative tool call before respondWith() delivers the result.
    assert.doesNotMatch(form, /form\.reset\(\)\;/);
    assert.match(form, /respondWith/);
});
