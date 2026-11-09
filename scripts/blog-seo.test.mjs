import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyBlogPostFixes, getBlogSeoConfig } from '../src/lib/blog-seo.ts';
import { portableTextToMarkdown } from '../src/lib/markdown/portable-text.ts';

const GUIDE = 'tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow';

const block = (style, text) => ({
    _type: 'block',
    _key: text.slice(0, 12),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
});

// Headings as they stand in Sanity (blogPost 61a4187f-b758-45d0-a131-0caa25215554).
const sanityGuide = () => ({
    title: 'Tworzenie Stron Internetowych: Przewodnik od A do Z dla Kreatywnych Przedsiębiorców',
    seoTitle: 'Tworzenie Stron Internetowych: React, WordPress, SEO i AI',
    seoDescription: 'Kompletny przewodnik po tworzeniu profesjonalnych stron internetowych.  Zbuduj skuteczną stronę z CreativeTrust.pl!',
    content: [
        block('normal', 'Wstęp'),
        block('h2', 'Dlaczego Profesjonalna Strona Internetowa Jest Kluczowa dla Twojego Biznesu?'),
        block('h3', 'Krok 1: Planowanie i Strategia Twojej Strony Internetowej'),
        block('h3', 'Krok 2: Wybór Technologii: React, WordPress, Elementor – Poznaj Ich Moc!'),
        block('h4', 'React: Dynamiczne i Interaktywne Aplikacje Webowe'),
        block('h4', 'WordPress: Potęga Prostoty i Elastyczności'),
        block('h4', 'Elementor: Wizualny Kreator Stron dla WordPressa'),
        block('h2', 'Krok 3: Projektowanie i UX – Strona Przyjazna Użytkownikowi'),
        block('normal', 'Treść kroku 3'),
        block('h2', 'Krok 4: Optymalizacja SEO – Bądź Widoczny w Wyszukiwarkach'),
        block('h2', 'Krok 5: Integracja z Chatbotami AI – Nowoczesna Obsługa Klienta'),
        block('h2', 'Krok 6: Testowanie i Wdrożenie – Uruchomienie Twojej Nowej Strony'),
    ],
});

const text = (b) => b.children.map((child) => child.text).join('');
const headings = (content, style) => content.filter((b) => b.style === style).map(text);

test('the guide title fits 60 characters and its description 140-155', () => {
    const { title, description } = getBlogSeoConfig(GUIDE);
    assert.ok([...title].length <= 60, title);
    assert.ok([...description].length >= 140 && [...description].length <= 155, description);
    assert.doesNotMatch(description, / {2}/);
});

test('the guide has an H2 for each of the six steps, in order', () => {
    const { content } = applyBlogPostFixes(GUIDE, sanityGuide());
    const steps = headings(content, 'h2').filter((heading) => heading.startsWith('Krok'));
    assert.deepEqual(steps.map((step) => step.slice(0, 6)), ['Krok 1', 'Krok 2', 'Krok 3', 'Krok 4', 'Krok 5', 'Krok 6']);
});

test('the technology subsections move up with their parent step', () => {
    const { content } = applyBlogPostFixes(GUIDE, sanityGuide());
    assert.deepEqual(headings(content, 'h3'), [
        'React: dynamiczne i interaktywne aplikacje webowe',
        'WordPress: potęga prostoty i elastyczności',
        'Elementor: wizualny kreator stron dla WordPressa',
    ]);
    assert.deepEqual(headings(content, 'h4'), []);
});

test('no heading keeps Title Case', () => {
    const post = applyBlogPostFixes(GUIDE, sanityGuide());
    const allowed = /^(Twojego|Twojej|WordPress\w*|React\w*|Elementor|SEO|UX|AI|A|Z)$/;
    for (const heading of [post.title, ...post.content.filter((b) => /^h\d$/.test(b.style)).map(text)]) {
        const words = heading.replace(/^Krok \d: /, '').split(/[\s:–?]+/).slice(1);
        assert.deepEqual(words.filter((word) => /^\p{Lu}/u.test(word) && !allowed.test(word)), [], heading);
    }
});

test('the link to the service page closes step 3 and reaches the Markdown twin', () => {
    const { content } = applyBlogPostFixes(GUIDE, sanityGuide());
    const index = content.findIndex((b) => b.markDefs?.some(({ href }) => href === '/uslugi/strony-www'));
    assert.equal(text(content[index + 1]).slice(0, 6), 'Krok 4');
    assert.equal(text(content[index - 1]), 'Treść kroku 3');
    assert.match(portableTextToMarkdown(content), /\[projektowanie stron www\]\(\/uslugi\/strony-www\)/);
});

test('fixes yield to CMS edits', () => {
    const post = sanityGuide();
    post.content[9] = block('h2', 'Krok 4: SEO po zmianach redakcji');
    post.content[10] = block('h3', 'Krok 5: Integracja z Chatbotami AI – Nowoczesna Obsługa Klienta edytowana');
    const { content } = applyBlogPostFixes(GUIDE, post);
    assert.equal(text(content[9]), 'Krok 4: SEO po zmianach redakcji');
    assert.equal(content[10].style, 'h3');
    assert.ok(!content.some((b) => b.markDefs?.length), 'no anchor heading, no link');
});

test('the link is not doubled once it exists in Sanity', () => {
    const post = sanityGuide();
    post.content[8].markDefs = [{ _type: 'link', _key: 'm', href: '/uslugi/strony-www' }];
    const { content } = applyBlogPostFixes(GUIDE, post);
    assert.equal(content.length, post.content.length);
});

test('a paragraph matching a heading text stays a paragraph', () => {
    const post = sanityGuide();
    post.content[0] = block('normal', 'Krok 1: Planowanie i Strategia Twojej Strony Internetowej');
    const { content } = applyBlogPostFixes(GUIDE, post);
    assert.equal(content[0].style, 'normal');
    assert.equal(text(content[0]), 'Krok 1: Planowanie i Strategia Twojej Strony Internetowej');
});

test('posts without fixes pass through untouched', () => {
    const post = { title: 'Inny', content: [block('h3', 'Nagłówek')] };
    assert.equal(applyBlogPostFixes('inny-wpis', post), post);
    assert.equal(applyBlogPostFixes(GUIDE, null), null);
    const linksOnly = applyBlogPostFixes('migracja-sklepu-bez-utraty-seo', post);
    assert.equal(linksOnly.title, 'Inny');
    assert.deepEqual(linksOnly.content, post.content);
});

// WEW-18. H2s of the article as it stands in Sanity (blogPost db20f2fc-91f1-400f-a94f-e151a9b96d1a).
const SSL = 'ssl-co-to-jest-i-czy-jest-potrzebne-4-powody-dla-ktorych-powinienes-go-wlaczyc';
const SANITY_SSL_H2 = ['Wstęp', 'Definicja SSL', 'Jak działa SSL?', 'Certyfikaty SSL', 'Korzyści z zastosowania SSL', 'Czy SSL jest potrzebne?', 'Podsumowanie'];
const sanitySsl = () => ({
    title: 'SSL – co to jest i czy jest potrzebne? 4 powody dla których powinieneś go włączyć.',
    seoTitle: 'SSL – co to jest i dlaczego jest niezbędny dla bezpieczeństwa strony?',
    seoDescription: 'SSL to kluczowy protokół szyfrowania chroniący dane przesyłane w Internecie.',
    content: SANITY_SSL_H2.flatMap((heading) => [block('h2', heading), block('normal', `Treść: ${heading}`)]),
});

test('the SSL article carries the WEW-18 title, meta description and H1', () => {
    const post = applyBlogPostFixes(SSL, sanitySsl());
    assert.equal(post.seoTitle, 'Co to jest SSL? Jak działa certyfikat SSL i czy jest potrzebny | CreativeTrust');
    assert.equal(
        post.seoDescription,
        'SSL to certyfikat szyfrujący połączenie ze stroną (kłódka i https). Wyjaśniamy prosto, jak działa, jakie są rodzaje SSL i jak wpływa na SEO.',
    );
    assert.equal(post.title, 'Co to jest SSL i czy jest potrzebny? 4 powody, by go włączyć');
    assert.equal(getBlogSeoConfig(SSL).title, post.seoTitle, 'rendered as absolute, without a second suffix');
});

test('the SSL article opens with a „SSL to…” definition', () => {
    const [first] = applyBlogPostFixes(SSL, sanitySsl()).content;
    assert.equal(first.style, 'normal');
    assert.match(text(first), /^SSL to [^.]{20,200}\.$/);
});

test('the SSL article adds the four H2s from the ticket and keeps „Jak działa SSL?”', () => {
    const h2 = headings(applyBlogPostFixes(SSL, sanitySsl()).content, 'h2');
    for (const heading of ['Jak działa SSL?', 'Rodzaje certyfikatów SSL (DV, OV, EV)', 'SSL a SEO', 'FAQ']) {
        assert.ok(h2.includes(heading), heading);
    }
    const added = h2.filter((heading) => !SANITY_SSL_H2.includes(heading));
    assert.ok(added.length >= 4, added.join(' | '));
});

test('the four reasons and the FAQ questions are H3s', () => {
    const h3 = headings(applyBlogPostFixes(SSL, sanitySsl()).content, 'h3');
    assert.deepEqual(h3.filter((heading) => /^\d\. /.test(heading)).map((heading) => heading[0]), ['1', '2', '3', '4']);
    assert.ok(h3.filter((heading) => heading.endsWith('?')).length >= 4);
});

test('the SSL article links to the glossary entry and replaces the Sanity body', () => {
    const { content } = applyBlogPostFixes(SSL, sanitySsl());
    const markdown = portableTextToMarkdown(content);
    assert.match(markdown, /\]\(\/baza-wiedzy\/ssl\)/);
    assert.match(markdown, /^## FAQ$/m);
    assert.match(markdown, /^1\. /m);
    assert.ok(!content.some((b) => text(b).startsWith('Treść: ')), 'no Sanity paragraph is left over');
    assert.equal(new Set(content.map((b) => b._key)).size, content.length);
    for (const b of content) {
        assert.deepEqual(b.children.flatMap((child) => child.marks).sort(), b.markDefs.map((def) => def._key).sort());
    }
});
