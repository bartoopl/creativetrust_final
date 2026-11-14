import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyBlogPostFixes, getBlogSeoConfig } from '../src/lib/blog-seo.ts';

/**
 * Website-related posts that link the website service page from inside their body (WEW-20).
 * Posts about shops or unrelated topics are deliberately absent, and so are the
 * posts consolidated into a longer one in 2026-11: they answer 301 now, so their
 * overlays are gone and the new body carries its own links.
 */
const LINKED_POSTS = [
    'strona-glowna-ktora-generuje-klikniecia-to-mozliwe-poznaj-7-praktycznych-rad',
    '10-najczesciej-popelnianych-bledow-podczas-tworzenia-strony-internetowej',
    'optymalne-strategie-pozycjonowania-stron-internetowych-jak-wyroznic-sie-w-sieci',
    'dlaczego-oparcie-strony-internetowej-o-page-builder-to-nie-taki-zly-pomysl',
    'kiedy-mega-menu-jest-fajne-a-kiedy-nie',
];

const TARGET = '/uslugi/strony-www';

const block = (style, text) => ({
    _type: 'block',
    _key: text.slice(0, 12),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
});

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

test('every website post links the website service page exactly once', () => {
    for (const slug of LINKED_POSTS) {
        const config = getBlogSeoConfig(slug);
        assert.ok(config, `${slug}: no config`);
        const links = linksOf(config);
        assert.equal(links.length, 1, `${slug}: expected one link`);
        assert.equal(links[0].href, TARGET, `${slug}: wrong target`);
        assert.ok([...links[0].text].length >= 12, `${slug}: anchor too short: ${links[0].text}`);
        assert.ok(!/kliknij tutaj|tutaj|więcej/i.test(links[0].text), `${slug}: anchor is not descriptive`);
    }
});

test('the link lands right before its heading and leaves the post body intact', () => {
    for (const slug of LINKED_POSTS) {
        const [fix] = getBlogSeoConfig(slug).sections;
        const [link] = linksOf(getBlogSeoConfig(slug));
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

test('the website anchors rotate exactly as planned', () => {
    const anchors = LINKED_POSTS.map((slug) => linksOf(getBlogSeoConfig(slug))[0].text);
    const counts = anchors.reduce((map, anchor) => map.set(anchor, (map.get(anchor) ?? 0) + 1), new Map());
    assert.equal(anchors.length, 5);
    assert.equal(new Set(anchors).size, anchors.length, 'every remaining post keeps its own anchor');
    assert.deepEqual(Object.fromEntries([...counts].sort()), {
        'dobra strona firmowa': 1,
        'projekt strony internetowej dla firmy': 1,
        'strona internetowa dla firmy': 1,
        'strony internetowe dla firm': 1,
        'strony internetowe, które sprzedają': 1,
    });
    for (const anchor of counts.keys()) assert.ok(!/kliknij tutaj|tutaj|więcej/i.test(anchor), anchor);
});

test('a post that already links the page, or lost its heading, is left alone', () => {
    for (const slug of LINKED_POSTS) {
        const [fix] = getBlogSeoConfig(slug).sections;
        const [link] = linksOf(getBlogSeoConfig(slug));

        const existing = {
            _type: 'block',
            _key: 'existing',
            style: 'normal',
            markDefs: [{ _type: 'link', _key: 'l', href: link.href }],
            children: [{ _type: 'span', _key: 's', text: link.text, marks: ['l'] }],
        };
        const withLink = applyBlogPostFixes(slug, { title: 'Tytuł', content: [existing, block('h2', fix.beforeHeading)] });
        assert.equal(withLink.content.length, 2, `${slug}: inserted a duplicate link`);

        const noHeading = applyBlogPostFixes(slug, { title: 'Tytuł', content: [block('normal', 'Inny tekst.'), block('h2', 'Inny nagłówek')] });
        assert.equal(noHeading.content.length, 2, `${slug}: inserted without its heading`);
    }
});

test('shop posts are not given a website link', () => {
    for (const slug of ['sprzedaz-rosnie-koszyk-stoi-co-naprawde-napedza-polski-e-commerce', 'segmentacja-klientow-w-ecommerce', 'migracja-sklepu-bez-utraty-seo']) {
        const links = linksOf(getBlogSeoConfig(slug) ?? { sections: [] });
        assert.ok(!links.some(({ href }) => href === TARGET), `${slug}: website link on a shop post`);
    }
});
