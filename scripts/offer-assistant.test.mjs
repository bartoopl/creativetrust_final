import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    MAX_QUESTION_LENGTH, TOOL_NAME, validateQuestion, buildSystemPrompt, buildAnswerTool,
    buildMessagesRequest, extractToolInput, normalizeAnswer, formatLeadMessage,
} from '../src/lib/offer-assistant.ts';
import { services, seoLandings, publishedPrices } from '../src/lib/site-services.ts';

const catalogue = { services, landings: seoLandings, prices: publishedPrices };

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
