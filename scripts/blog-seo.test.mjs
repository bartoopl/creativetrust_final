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

const B2B = 'google-ads-dla-b2b-jak-zbierac-leady';
const B2B_SHORT_ANSWER =
    'Google Ads dla B2B działa najlepiej, gdy kampanie są budowane wokół intencji zakupowej, a nie samego wolumenu wyszukiwań. Najważniejsze są dobrze rozdzielone słowa kluczowe, precyzyjne wykluczenia, landing page odpowiadający na obiekcje decydenta oraz pomiar jakości leadów w CRM. Bez informacji, które zapytania stają się realnymi rozmowami sprzedażowymi, kampania będzie optymalizować się pod ilość formularzy, a nie pod przychód.';

// Structure as imported by scripts/import-geo-seo-blog-posts-2026.cjs.
const sanityB2b = () => ({
    title: 'Google Ads dla B2B: jak zbierać leady, które mają szansę przejść do sprzedaży?',
    seoTitle: 'Google Ads dla B2B: leady, tracking i kwalifikacja',
    seoDescription: 'Jak prowadzić Google Ads dla B2B: intencja słów kluczowych, formularze, CRM, kwalifikacja leadów i optymalizacja kampanii.',
    content: [
        block('h2', 'Krótka odpowiedź'),
        block('normal', B2B_SHORT_ANSWER),
        block('h2', 'Checklist przed wdrożeniem'),
        block('h2', 'Polecane kolejne kroki'),
        block('normal', 'Jeśli chcesz przejść od strategii do wdrożenia, zobacz: ...'),
    ],
});

test('the B2B post uses the WEW-14 title and description verbatim', () => {
    const post = applyBlogPostFixes(B2B, sanityB2b());
    assert.equal(post.seoTitle, 'Google Ads dla B2B: jak pozyskać leady sprzedażowe? Poradnik 2026 | CreativeTrust');
    assert.equal(
        post.seoDescription,
        'Kampanie Google Ads dla firm B2B krok po kroku: dobór słów kluczowych, formularze, CRM i kwalifikacja leadów. Sprawdź, jak obniżyć koszt pozyskania klienta.',
    );
    assert.ok([...post.seoDescription].length <= 160);
    assert.equal(post.title, sanityB2b().title, 'H1 stays as in Sanity');
});

test('the short answer names Google Ads dla usług B2B and AdWords B2B', () => {
    const { content } = applyBlogPostFixes(B2B, sanityB2b());
    const answer = text(content[1]);
    assert.ok(answer.startsWith('Google Ads dla usług B2B'), answer);
    assert.match(answer, /AdWords B2B/);
    assert.ok(answer.endsWith('a nie pod przychód.'));
});

test('the FAQ is an H2 with H3 questions right before the closing links', () => {
    const { content } = applyBlogPostFixes(B2B, sanityB2b());
    const faq = content.findIndex((b) => text(b) === 'FAQ: Google Ads w B2B');
    assert.equal(content[faq].style, 'h2');
    const questions = getBlogSeoConfig(B2B).faq.items;
    assert.ok(questions.length >= 3 && questions.length <= 4);
    questions.forEach(({ question, answer }, i) => {
        assert.equal(content[faq + 1 + i * 2].style, 'h3');
        assert.equal(text(content[faq + 1 + i * 2]), question);
        assert.equal(text(content[faq + 2 + i * 2]), answer);
    });
    assert.equal(text(content[faq + 1 + questions.length * 2]), 'Polecane kolejne kroki');
    assert.ok(questions.some(({ question }) => question === 'Ile kosztuje Google Ads dla B2B?'));
    assert.ok(questions.some(({ question }) => question === 'Czy Google Ads działa w B2B?'));
    const keys = content.map((b) => b._key);
    assert.equal(new Set(keys).size, keys.length, 'unique block keys');
    assert.match(portableTextToMarkdown(content), /## FAQ: Google Ads w B2B\n\n### Ile kosztuje Google Ads dla B2B\?/);
});

test('the FAQ is appended when the closing heading is gone, and never doubled', () => {
    const post = sanityB2b();
    post.content = post.content.slice(0, 3);
    const appended = applyBlogPostFixes(B2B, post).content;
    assert.equal(text(appended[3]), 'FAQ: Google Ads w B2B');

    const withFaq = sanityB2b();
    withFaq.content.push(block('h2', 'FAQ: Google Ads w B2B'));
    const { content } = applyBlogPostFixes(B2B, withFaq);
    assert.equal(content.filter((b) => text(b) === 'FAQ: Google Ads w B2B').length, 1);
});

test('the short answer rewrite yields to CMS edits', () => {
    const post = sanityB2b();
    post.content[1] = block('normal', 'Nowa krótka odpowiedź od redakcji.');
    assert.equal(text(applyBlogPostFixes(B2B, post).content[1]), 'Nowa krótka odpowiedź od redakcji.');
});
