import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyBlogPostFixes, getBlogSeoConfig } from '../src/lib/blog-seo.ts';

const CORE = ['/uslugi/audyt-e-commerce', '/uslugi/e-commerce', '/uslugi/zarzadzanie-e-commerce'];

/** Posts that link a core service page from inside their body (WEW-19). */
const LINKED_POSTS = [
    'dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec',
    'jak-uniknac-porzucania-koszykow-podczas-platnosci-online-6-sposobow-poprawiajacych-konwersje',
    'co-zrobic-kiedy-twoj-sklep-internetowy-nie-sprzedaje-6-praktycznych-porad-od-creative-trust',
    'google-ads-dla-sklepu-internetowego-od-czego-zaczac',
    'e-commerce-na-wordpressie-dlaczego-warto-rozwazyc-woocommerce',
    'jak-stworzyc-skuteczny-sklep-internetowy-6-czynnikow-ktore-musisz-wziac-pod-uwage',
    'wzrost-czy-marza-ecommerce',
    '7-najwazniejszych-metryk-email-marketingowych-dla-e-commerce',
];

const BANNED_ANCHORS = ['kliknij tutaj', 'tutaj', 'więcej', 'zobacz', 'link'];

const block = (style, text) => ({
    _type: 'block',
    _key: text.slice(0, 12),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
});

/** Every link of a section fix, with the visible anchor text. */
const linksOf = (config) =>
    (config.sections ?? []).flatMap(({ blocks }) =>
        blocks.flatMap((authored) => {
            const parts = typeof authored.p === 'string' ? [authored.p] : authored.p ?? [];
            return parts.filter((part) => typeof part !== 'string').map(({ text, href }) => ({ text, href }));
        }),
    );

const linksIn = (content) =>
    content.flatMap((b) =>
        (b.markDefs ?? []).map((def) => ({
            href: def.href,
            text: (b.children ?? []).filter((child) => child.marks?.includes(def._key)).map((child) => child.text).join(''),
        })),
    );

test('every configured post links a core service page with a descriptive anchor', () => {
    for (const slug of LINKED_POSTS) {
        const config = getBlogSeoConfig(slug);
        assert.ok(config, `${slug}: no config`);
        const links = linksOf(config);
        assert.ok(links.length >= 1 && links.length <= 2, `${slug}: ${links.length} links`);
        assert.equal(new Set(links.map(({ href }) => href)).size, links.length, `${slug}: duplicate href`);
        for (const { text, href } of links) {
            assert.ok(CORE.includes(href), `${slug}: ${href} is not a core service page`);
            assert.ok([...text].length >= 8, `${slug}: anchor too short: ${text}`);
            assert.ok(!BANNED_ANCHORS.includes(text.trim().toLowerCase()), `${slug}: anchor is not descriptive: ${text}`);
        }
    }
});

test('the three core service pages all get at least one link', () => {
    const linked = new Set(LINKED_POSTS.flatMap((slug) => linksOf(getBlogSeoConfig(slug)).map(({ href }) => href)));
    for (const href of CORE) {
        assert.ok(linked.has(href), `${href} has no inbound post link`);
    }
});

test('a link lands right before its heading and leaves the post body intact', () => {
    for (const slug of LINKED_POSTS) {
        const config = getBlogSeoConfig(slug);
        const [fix] = config.sections;
        const [link] = linksOf(config);
        const intro = 'Akapit wprowadzający.';
        const after = 'Akapit po nagłówku.';
        const post = {
            title: 'Tytuł',
            seoTitle: 'SEO tytuł',
            seoDescription: 'SEO opis',
            content: [block('normal', intro), block('h2', fix.beforeHeading), block('normal', after)],
        };

        const { content } = applyBlogPostFixes(slug, post);
        assert.equal(content.length, 4, `${slug}: expected one inserted block`);
        assert.equal(content[0].children[0].text, intro);
        assert.equal(content[1].style, 'normal', `${slug}: link block is not a paragraph`);
        assert.deepEqual(linksIn([content[1]]), [link], `${slug}: wrong or missing link`);
        assert.equal(content[2].style, 'h2');
        assert.equal(content[2].children[0].text, fix.beforeHeading);
        assert.equal(content[3].children[0].text, after);
    }
});

test('a post that already links the same page is left alone', () => {
    for (const slug of LINKED_POSTS) {
        const config = getBlogSeoConfig(slug);
        const [fix] = config.sections;
        const [link] = linksOf(config);
        const existing = {
            _type: 'block',
            _key: 'existing',
            style: 'normal',
            markDefs: [{ _type: 'link', _key: 'l', href: link.href }],
            children: [{ _type: 'span', _key: 's', text: link.text, marks: ['l'] }],
        };
        const post = {
            title: 'Tytuł',
            content: [existing, block('h2', fix.beforeHeading)],
        };

        const { content } = applyBlogPostFixes(slug, post);
        assert.equal(content.length, 2, `${slug}: inserted a duplicate link`);
    }
});

test('a post without its heading is left alone', () => {
    for (const slug of LINKED_POSTS) {
        const post = { title: 'Tytuł', content: [block('normal', 'Inny tekst.'), block('h2', 'Inny nagłówek')] };
        const { content } = applyBlogPostFixes(slug, post);
        assert.equal(content.length, 2, `${slug}: inserted without its heading`);
        assert.deepEqual(linksIn(content), []);
    }
});
