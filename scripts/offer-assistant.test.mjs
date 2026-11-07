import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    MAX_QUESTION_LENGTH, TOOL_NAME, validateQuestion, buildSystemPrompt, buildAnswerTool,
    buildMessagesRequest, extractToolInput, normalizeAnswer, formatLeadMessage, answerFromCatalogue, fold, assistantLocale,
} from '../src/lib/offer-assistant.ts';
import { services, seoLandings, publishedPrices, servicesFor, landingsFor, pricesFor } from '../src/lib/site-services.ts';

const catalogue = { services, landings: seoLandings, prices: publishedPrices };
const catalogueEn = { services: servicesFor('en'), landings: landingsFor('en'), prices: pricesFor('en') };

// ---------- validateQuestion ----------

test('validateQuestion trims and collapses whitespace', () => {
    assert.deepEqual(validateQuestion('  sklep \n na   Medusie '), { ok: true, question: 'sklep na Medusie' });
});

test('validateQuestion rejects non-strings, too short and too long input', () => {
    assert.equal(validateQuestion(undefined).ok, false);
    assert.equal(validateQuestion(42).ok, false);
    assert.equal(validateQuestion('  a ').ok, false);
    assert.equal(validateQuestion('x'.repeat(MAX_QUESTION_LENGTH + 1)).ok, false);
    assert.equal(validateQuestion('x'.repeat(MAX_QUESTION_LENGTH)).ok, true);
});

// ---------- prompt and tool ----------

test('system prompt lists every service, landing and published price verbatim', () => {
    const prompt = buildSystemPrompt(catalogue);
    for (const s of services) assert.ok(prompt.includes(s.slug) && prompt.includes(s.href), s.slug);
    for (const l of seoLandings) assert.ok(prompt.includes(l.href), l.href);
    for (const p of publishedPrices) assert.ok(prompt.includes(p.price), p.name);
});

test('answer tool restricts slugs and price names to the catalogue', () => {
    const { name, input_schema } = buildAnswerTool(catalogue);
    assert.equal(name, TOOL_NAME);
    assert.deepEqual(input_schema.properties.service_slugs.items.enum, services.map((s) => s.slug));
    assert.deepEqual(input_schema.properties.price_names.items.enum, publishedPrices.map((p) => p.name));
    assert.deepEqual(input_schema.required.sort(), ['answer', 'price_names', 'service_slugs', 'verdict']);
});

test('messages request forces the answer tool and passes the question as the only user turn', () => {
    const body = buildMessagesRequest('landing pod Google Ads', catalogue, 'test-model');
    assert.equal(body.model, 'test-model');
    assert.deepEqual(body.tool_choice, { type: 'tool', name: TOOL_NAME });
    assert.deepEqual(body.messages, [{ role: 'user', content: 'landing pod Google Ads' }]);
    assert.ok(body.max_tokens > 0 && body.max_tokens <= 1024);
});

// ---------- extractToolInput ----------

test('extractToolInput finds the forced tool call and ignores other blocks', () => {
    const input = { verdict: 'yes' };
    const response = { content: [{ type: 'text', text: 'hi' }, { type: 'tool_use', name: TOOL_NAME, input }] };
    assert.equal(extractToolInput(response), input);
    assert.equal(extractToolInput({ content: [{ type: 'tool_use', name: 'other', input }] }), null);
    assert.equal(extractToolInput(null), null);
    assert.equal(extractToolInput({ error: {} }), null);
});

// ---------- normalizeAnswer ----------

test('normalizeAnswer resolves known slugs and prices to catalogue entries', () => {
    const result = normalizeAnswer({
        verdict: 'yes',
        answer: ' Tak, robimy landing pages. ',
        service_slugs: ['strony-www'],
        price_names: ['Landing page'],
    }, catalogue);
    assert.equal(result.verdict, 'yes');
    assert.equal(result.answer, 'Tak, robimy landing pages.');
    assert.deepEqual(result.services, [{ slug: 'strony-www', title: 'Strony WWW', href: '/uslugi/strony-www' }]);
    assert.deepEqual(result.prices, [publishedPrices.find((p) => p.name === 'Landing page')]);
});

test('normalizeAnswer drops invented services and prices', () => {
    const result = normalizeAnswer({
        verdict: 'yes',
        answer: 'Tak.',
        service_slugs: ['aplikacje-mobilne', 'e-commerce', 7],
        price_names: ['Aplikacja mobilna', 'od 1 zł'],
    }, catalogue);
    assert.deepEqual(result.services.map((s) => s.slug), ['e-commerce']);
    assert.deepEqual(result.prices, []);
});

test('normalizeAnswer never shows prices with a "no" verdict and defaults an unknown verdict', () => {
    const no = normalizeAnswer({ verdict: 'no', answer: 'Nie.', service_slugs: [], price_names: ['Landing page'] }, catalogue);
    assert.deepEqual(no.prices, []);
    const odd = normalizeAnswer({ verdict: 'maybe', answer: 'Hm.' }, catalogue);
    assert.equal(odd.verdict, 'unclear');
    assert.deepEqual(odd.services, []);
});

test('normalizeAnswer rejects empty or malformed input and caps long answers', () => {
    assert.equal(normalizeAnswer(null, catalogue), null);
    assert.equal(normalizeAnswer({ verdict: 'yes', answer: '   ' }, catalogue), null);
    const long = normalizeAnswer({ verdict: 'yes', answer: 'a'.repeat(5000) }, catalogue);
    assert.ok(long.answer.length <= 1200 && long.answer.endsWith('…'));
});

// ---------- formatLeadMessage ----------

test('formatLeadMessage includes the question, answer, services, prices and note', () => {
    const answer = normalizeAnswer({ verdict: 'yes', answer: 'Tak.', service_slugs: ['strony-www'], price_names: ['Landing page'] }, catalogue);
    const text = formatLeadMessage('Potrzebuję landing page', answer, ' Termin: maj ');
    for (const part of ['Potrzebuję landing page', 'Tak.', 'Strony WWW', 'od 3 500 zł netto', 'Termin: maj']) {
        assert.ok(text.includes(part), part);
    }
    assert.equal(formatLeadMessage('Q', null, ''), 'Pytanie z asystenta oferty na stronie głównej:\nQ');
});


// ---------- answerFromCatalogue (no-AI fallback) ----------

test('normalizeAnswer marks model answers with source "ai"', () => {
    assert.equal(normalizeAnswer({ verdict: 'yes', answer: 'Tak.' }, catalogue).source, 'ai');
});

test('fold lowercases and strips Polish diacritics', () => {
    assert.equal(fold('SKLEPÓW Łódź żółć'), 'sklepow lodz zolc');
});

test('catalogue fallback matches a shop question to e-commerce', () => {
    const a = answerFromCatalogue('Potrzebuję sklepu internetowego na Medusie', catalogue);
    assert.equal(a.verdict, 'yes');
    assert.equal(a.source, 'catalogue');
    assert.deepEqual(a.services.map((s) => s.slug), ['e-commerce']);
    assert.deepEqual(a.prices, []);
});

test('catalogue fallback attaches only the published price for the deliverable named', () => {
    const a = answerFromCatalogue('Ile kosztuje landing page pod Google Ads?', catalogue);
    assert.equal(a.verdict, 'yes');
    assert.deepEqual(a.prices.map((p) => p.name), ['Landing page']);
    for (const p of a.prices) assert.ok(publishedPrices.includes(p));
});

test('catalogue fallback lists basic website prices when a price is asked without a specific deliverable', () => {
    const a = answerFromCatalogue('Ile kosztuje strona www?', catalogue);
    assert.ok(a.prices.length > 0);
    assert.ok(a.prices.every((p) => p.service === 'strony-www' && p.name !== 'Serwis rozbudowany'));
});

test('catalogue fallback says no to things outside the offer', () => {
    const a = answerFromCatalogue('Zrobicie aplikację mobilną na Androida?', catalogue);
    assert.equal(a.verdict, 'no');
    assert.deepEqual(a.prices, []);
});

test('catalogue fallback is unclear for off-topic questions and does not trip on substrings', () => {
    assert.equal(answerFromCatalogue('Jaka będzie pogoda wiosną?', catalogue).verdict, 'unclear');
});

// ---------- English version ----------

test('assistantLocale accepts only "en" and defaults to Polish', () => {
    assert.equal(assistantLocale('en'), 'en');
    assert.equal(assistantLocale('pl'), 'pl');
    assert.equal(assistantLocale('de'), 'pl');
    assert.equal(assistantLocale(undefined), 'pl');
});

test('English catalogue keeps slugs and amounts, swaps copy and links', () => {
    assert.deepEqual(catalogueEn.services.map((s) => s.slug), services.map((s) => s.slug));
    for (const s of catalogueEn.services) assert.match(s.href, /^\/en\/services\//);
    for (const l of catalogueEn.landings) assert.match(l.href, /^\/en\/services\//);
    assert.deepEqual(catalogueEn.prices.map((p) => p.service), publishedPrices.map((p) => p.service));
    for (const p of catalogueEn.prices) assert.match(p.source, /^\/en\/services\//);
});

test('English questions get English validation errors and an English answer instruction', () => {
    assert.equal(validateQuestion('a', 'en').error, 'Please write a little more about what you need.');
    assert.match(buildSystemPrompt(catalogueEn, 'en'), /po angielsku/);
    assert.doesNotMatch(buildSystemPrompt(catalogue), /po angielsku/);
    assert.equal(buildMessagesRequest('x', catalogueEn, 'm', 'en').system, buildSystemPrompt(catalogueEn, 'en'));
});

test('English catalogue fallback answers in English with English price names', () => {
    const a = answerFromCatalogue('How much does a landing page for a Google Ads campaign cost?', catalogueEn, 'en');
    assert.equal(a.verdict, 'yes');
    assert.match(a.answer, /^Yes — /);
    assert.deepEqual(a.prices.map((p) => p.name), ['Landing page']);
    const shop = answerFromCatalogue('We need an online store integrated with our ERP', catalogueEn, 'en');
    assert.deepEqual(shop.services.map((s) => s.slug), ['e-commerce']);
    assert.equal(shop.services[0].href, '/en/services/e-commerce');
    const site = answerFromCatalogue('What does a company website cost?', catalogueEn, 'en');
    assert.ok(site.prices.length > 0 && site.prices.every((p) => p.name !== 'Extended website'));
    assert.equal(answerFromCatalogue('Can you build a mobile app for iPhone?', catalogueEn, 'en').verdict, 'no');
    assert.match(answerFromCatalogue('What will the weather be?', catalogueEn, 'en').answer, /^I'm not sure/);
});

test('formatLeadMessage flags leads from the English page', () => {
    assert.match(formatLeadMessage('Q', null, '', 'en'), /wersja angielska/);
});
