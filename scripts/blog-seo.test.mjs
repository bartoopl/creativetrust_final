import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyBlogPostFixes, getBlogSeoConfig } from '../src/lib/blog-seo.ts';
import { portableTextToMarkdown } from '../src/lib/markdown/portable-text.ts';

const block = (style, text) => ({
    _type: 'block',
    _key: text.slice(0, 12),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
});

const text = (b) => b.children.map((child) => child.text).join('');
const headings = (content, style) => content.filter((b) => b.style === style).map(text);

test('posts without fixes pass through untouched', () => {
    const post = { title: 'Inny', content: [block('h3', 'Nagłówek')] };
    assert.equal(applyBlogPostFixes('inny-wpis', post), post);
    assert.equal(applyBlogPostFixes('inny-wpis', null), null);
    const linksOnly = applyBlogPostFixes('migracja-sklepu-bez-utraty-seo', post);
    assert.equal(linksOnly.title, 'Inny');
    assert.deepEqual(linksOnly.content, post.content);
});

test('consolidated posts leave title, description and H1 to the CMS', async () => {
    // The 2026-11 consolidation rewrote these five bodies and their metadata, so an
    // overlay here would silently override the new title with the old one.
    const { RETIRED_BLOG_POSTS } = await import('../src/lib/retired-links.ts');
    const targets = [
        'tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow',
        'ile-kosztuje-strona-internetowa-dla-firmy',
        'dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
        'headless-woocommerce-next-js',
        'core-web-vitals-w-ecommerce',
    ];
    for (const slug of targets) {
        const config = getBlogSeoConfig(slug);
        assert.equal(config?.title, undefined, `${slug}: stale title override`);
        assert.equal(config?.description, undefined, `${slug}: stale description override`);
        assert.equal(config?.heading, undefined, `${slug}: stale H1 override`);
    }
    for (const source of Object.keys(RETIRED_BLOG_POSTS)) {
        assert.equal(getBlogSeoConfig(source.replace('/blog/', '')), undefined, `${source}: config for a redirecting post`);
    }
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

test('the B2B FAQPage JSON-LD mirrors the rendered questions and answers', async () => {
    const { buildFaqSchema } = await import('../src/lib/schema.ts');
    const { content } = applyBlogPostFixes(B2B, sanityB2b());
    const schema = buildFaqSchema(getBlogSeoConfig(B2B).faq.items);
    assert.equal(schema['@type'], 'FAQPage');
    for (const { name, acceptedAnswer } of schema.mainEntity) {
        const q = content.findIndex((b) => b.style === 'h3' && text(b) === name);
        assert.ok(q > 0, name);
        assert.equal(text(content[q + 1]), acceptedAnswer.text);
    }
});
