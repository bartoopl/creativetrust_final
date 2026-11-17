import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { extractFaq } from '../src/lib/faq.ts';

const text = (value, style = 'normal') => ({
    _type: 'block',
    style,
    markDefs: [],
    children: [{ _type: 'span', text: value, marks: [] }],
});

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const faqBody = (questions) => [
    text('Wstęp', 'h2'),
    text('Treść artykułu'),
    text('FAQ', 'h2'),
    ...questions.flatMap(([question, ...answer]) => [text(question, 'h3'), ...answer.map((paragraph) => text(paragraph))]),
];

test('an ## FAQ section becomes one item per ### question', () => {
    const items = extractFaq(faqBody([
        ['Ile kosztuje audyt e-commerce?', 'Od 3 000 zł netto.'],
        ['Co zawiera audyt?', 'Cztery obszary.', 'Raport z priorytetami.'],
        ['Ile trwa?', 'Od 5 do 7 dni roboczych.'],
        ['Czy wymaga dostępu do GA4?', 'Tak, read-only.'],
        ['Czy działa dla SaaS?', 'Tak.'],
        ['Kto powinien zamówić?', 'Sklep z ruchem i przychodem.'],
        ['Czy zobowiązuje do współpracy?', 'Nie.'],
        ['Jakie dostępy są potrzebne?', 'GA4, Merchant Center, panel sklepu.'],
    ]));

    assert.equal(items.length, 8);
    assert.equal(items[0].question, 'Ile kosztuje audyt e-commerce?');
    assert.equal(items[1].answer, 'Cztery obszary. Raport z priorytetami.');
    assert.equal(items[7].answer, 'GA4, Merchant Center, panel sklepu.');
});

test('the next ## section ends the FAQ and items without an answer are dropped', () => {
    const items = extractFaq([
        text('FAQ', 'h2'),
        text('Pytanie z odpowiedzią', 'h3'),
        text('Odpowiedź.'),
        text('Pytanie bez odpowiedzi', 'h3'),
        text('Kolejna sekcja', 'h2'),
        text('To nie jest odpowiedź', 'h3'),
        text('Treść poza FAQ'),
    ]);

    assert.deepEqual(items.map((item) => item.question), ['Pytanie z odpowiedzią']);
});

test('content without an FAQ heading produces no schema', () => {
    assert.deepEqual(extractFaq([text('Wstęp', 'h2'), text('Treść')]), []);
    assert.deepEqual(extractFaq(null), []);
});

test('the blog page falls back to the CMS FAQ section', () => {
    const page = read('src/app/(pl)/blog/[slug]/page.tsx');

    assert.match(page, /extractFaq\(post\.content/);
    assert.match(page, /faqItems\.length >= 2 \? buildFaqSchema\(faqItems\)/);
    assert.match(page, /faqSchema \? \[blogSchema, breadcrumbSchema, faqSchema\]/);
});
