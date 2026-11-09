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

// WEW-15: the audit checklist, the cost article and the B2B article, as their headings stand in Sanity.
const CHECKLIST = 'audyt-konta-google-ads-checklista';
const COST = 'ile-kosztuje-audyt-google-ads';
const B2B = 'google-ads-dla-b2b-jak-zbierac-leady';
const bullet = (value) => ({ ...block('normal', value), listItem: 'bullet', level: 1 });
const geoPost = (topicHeading) => ({
    title: 'Sanity title',
    seoTitle: 'Sanity SEO title',
    seoDescription: 'Sanity description',
    content: [
        block('h2', 'Krótka odpowiedź'),
        block('h2', topicHeading),
        block('h2', 'Jak podejść do tematu krok po kroku?'),
        block('normal', 'Najbezpieczniej zacząć od diagnozy i priorytetów.'),
        bullet('zweryfikuj konwersje primary i secondary'),
        bullet('porównaj dane Google Ads, GA4 i CRM'),
        block('h2', 'Najczęstsze błędy'),
        bullet('ocenianie kampanii po CTR bez jakości leadów'),
        block('h2', 'Jak mierzyć efekt?'),
        block('h2', 'Checklist przed wdrożeniem'),
        block('h2', 'Polecane kolejne kroki'),
    ],
});
const costPost = () => ({
    title: 'Ile kosztuje audyt Google Ads i kiedy warto go zrobić?',
    content: [
        block('h2', 'Kiedy audyt Google Ads ma sens'),
        block('h2', 'Co powinien obejmować dobry audyt'),
        block('normal', 'W praktyce najpierw sprawdza się fundamenty.'),
        block('h2', 'Ile może kosztować audyt'),
        block('h2', 'Polecane kolejne kroki'),
    ],
});
const linksTo = (content, href) =>
    content.filter((b) => b.markDefs?.some((mark) => mark.href === href)).map((b) => {
        const mark = b.markDefs.find((m) => m.href === href)._key;
        return b.children.filter((child) => child.marks.includes(mark)).map((child) => child.text).join('');
    });
const AREAS = ['Audyt konwersji i trackingu', 'Struktura konta i kampanii', 'Słowa kluczowe i wyszukiwane hasła', 'Budżet i stawki', 'Reklamy i landing page'];

test('the checklist ships the ticket title, meta description and H1', () => {
    const post = applyBlogPostFixes(CHECKLIST, geoPost('Dla kogo jest temat: audyt konta Google Ads'));
    assert.equal(post.title, 'Audyt Google Ads: checklista, która pokazuje, gdzie ucieka budżet');
    assert.match(post.seoTitle, /^Audyt Google Ads: checklista \d+ punktów krok po kroku \(2026\) \| CreativeTrust$/);
    assert.equal(
        post.seoDescription,
        'Darmowa checklista audytu konta Google Ads: konwersje i tracking, struktura kampanii, wyszukiwane hasła, budżet i landing page. Sprawdź, gdzie ucieka budżet.',
    );
});

test('the step-by-step section becomes five audit areas, each with a list to tick off', () => {
    const { content } = applyBlogPostFixes(CHECKLIST, geoPost('Dla kogo jest temat: audyt konta Google Ads'));
    assert.ok(!content.some((b) => text(b) === 'Jak podejść do tematu krok po kroku?'));
    assert.ok(!content.some((b) => text(b) === 'zweryfikuj konwersje primary i secondary'), 'old bullets go with their section');
    assert.deepEqual(headings(content, 'h3'), AREAS);

    const area = (name) => content.findIndex((b) => b.style === 'h3' && text(b) === name);
    for (const [i, name] of AREAS.entries()) {
        const end = i + 1 < AREAS.length ? area(AREAS[i + 1]) : content.findIndex((b) => text(b) === 'Najczęstsze błędy');
        const items = content.slice(area(name), end).filter((b) => b.listItem === 'bullet');
        assert.ok(items.length >= 5, `${name}: ${items.length} items`);
    }
});

test('the title counts exactly the points of the checklist', () => {
    const post = applyBlogPostFixes(CHECKLIST, geoPost('Dla kogo jest temat: audyt konta Google Ads'));
    const start = post.content.findIndex((b) => b.style === 'h3' && text(b) === AREAS[0]);
    const end = post.content.findIndex((b) => text(b) === 'Najczęstsze błędy');
    const points = post.content.slice(start, end).filter((b) => b.listItem === 'bullet').length;
    assert.equal(Number(post.seoTitle.match(/checklista (\d+) punktów/)[1]), points);
    assert.match(headings(post.content, 'h2').join('\n'), new RegExp(`Checklista audytu Google Ads: ${points} punktów`));
});

test('the cost H2 links to the cost article, before the closing next steps', () => {
    const { content } = applyBlogPostFixes(CHECKLIST, geoPost('Dla kogo jest temat: audyt konta Google Ads'));
    const h2 = content.findIndex((b) => b.style === 'h2' && text(b) === 'Ile trwa i ile kosztuje audyt Google Ads?');
    const next = content.findIndex((b) => text(b) === 'Polecane kolejne kroki');
    assert.ok(h2 > 0 && h2 < next);
    assert.deepEqual(linksTo(content.slice(h2, next), '/blog/ile-kosztuje-audyt-google-ads'), ['ile kosztuje audyt Google Ads']);
});

test('the cost article and the B2B article link back to the checklist with the ticket anchors', () => {
    const cost = applyBlogPostFixes(COST, costPost()).content;
    assert.deepEqual(linksTo(cost, '/blog/audyt-konta-google-ads-checklista'), ['checklista audytu Google Ads']);
    assert.equal(text(cost[cost.findIndex((b) => b.markDefs?.length) + 1]), 'Ile może kosztować audyt');

    const b2b = applyBlogPostFixes(B2B, geoPost('Dla kogo jest temat: Google Ads dla B2B')).content;
    assert.deepEqual(linksTo(b2b, '/blog/audyt-konta-google-ads-checklista'), ['audyt konta Google Ads']);
    assert.equal(text(b2b[b2b.findIndex((b) => b.markDefs?.length) + 1]), 'Jak mierzyć efekt?');
    assert.match(portableTextToMarkdown(b2b), /\[audyt konta Google Ads\]\(\/blog\/audyt-konta-google-ads-checklista\)/);
});

test('the checklist reaches the Markdown twin as H3s and bullet lists', () => {
    const markdown = portableTextToMarkdown(applyBlogPostFixes(CHECKLIST, geoPost('Dla kogo')).content);
    assert.match(markdown, /### Audyt konwersji i trackingu\n\n[^\n]+\n\n- konwersje primary/);
    assert.match(markdown, /\[ile kosztuje audyt Google Ads\]\(\/blog\/ile-kosztuje-audyt-google-ads\)/);
});

test('rendered blocks have unique keys', () => {
    for (const [slug, post] of [[CHECKLIST, geoPost('a')], [COST, costPost()], [B2B, geoPost('b')]]) {
        const keys = applyBlogPostFixes(slug, post).content.map((b) => b._key);
        const authored = keys.filter((key) => key.startsWith('seo-'));
        assert.equal(new Set(authored).size, authored.length, slug);
    }
});

test('section fixes yield to CMS edits', () => {
    const renamed = geoPost('Dla kogo');
    renamed.content[2] = block('h2', 'Jak przeprowadzić audyt – wersja redakcji');
    const { content } = applyBlogPostFixes(CHECKLIST, renamed);
    assert.deepEqual(headings(content, 'h3'), []);
    assert.equal(text(content[2]), 'Jak przeprowadzić audyt – wersja redakcji');

    const linked = costPost();
    linked.content[2].markDefs = [{ _type: 'link', _key: 'm', href: '/blog/audyt-konta-google-ads-checklista' }];
    assert.equal(applyBlogPostFixes(COST, linked).content.length, linked.content.length, 'no doubled back-link');
});
