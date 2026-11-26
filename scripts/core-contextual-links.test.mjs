import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyBlogPostFixes, getBlogSeoConfig } from '../src/lib/blog-seo.ts';
import { applyKnowledgeBaseSeo } from '../src/lib/knowledge-base-seo.ts';

const block = (style, text) => ({
    _type: 'block',
    _key: `k-${text.slice(0, 10)}`,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
});

const linksIn = (content) =>
    (content ?? []).flatMap((b) =>
        (b.markDefs ?? []).map((def) => ({
            href: def.href,
            text: (b.children ?? []).filter((child) => child.marks?.includes(def._key)).map((child) => child.text).join(''),
        })),
    );

/** The section config for a blog slug that points at `href`. */
const blogSection = (slug, href) =>
    getBlogSeoConfig(slug)?.sections?.find((section) => section.blocks.some((authored) => (Array.isArray(authored.p) ? authored.p : [authored.p]).some((part) => part && part.href === href)));

const BLOG_LINKS = [
    { slug: 'audyt-konta-google-ads-checklista', href: '/uslugi/audyt-e-commerce', anchor: 'audyt e-commerce', before: 'Polecane kolejne kroki' },
    { slug: 'google-ads-dla-b2b-jak-zbierac-leady', href: '/uslugi/strony-www', anchor: 'strona firmowa, która sprzedaje', before: 'Polecane kolejne kroki' },
    {
        slug: 'ile-kosztuje-reklama-na-facebooku-przewodnik-po-kosztach',
        href: '/uslugi/audyt-strony-internetowej',
        anchor: 'audyt strony internetowej',
        before: 'Czy reklama na Facebooku się opłaca?',
    },
];

test('each core blog link sits before a real heading with the planned anchor', () => {
    for (const { slug, href, anchor, before } of BLOG_LINKS) {
        const section = blogSection(slug, href);
        assert.ok(section, `${slug}: no section for ${href}`);
        assert.equal(section.beforeHeading, before, `${slug}: wrong insertion point`);
        const post = applyBlogPostFixes(slug, { title: 'T', content: [block('normal', 'Akapit.'), block('h2', before)] });
        const links = linksIn(post.content).filter((link) => link.href === href);
        assert.equal(links.length, 1, `${slug}: expected one ${href} link`);
        assert.equal(links[0].text, anchor, `${slug}: wrong anchor`);
        assert.ok(!/kliknij tutaj|tutaj|więcej/i.test(links[0].text), `${slug}: anchor is not descriptive`);
        // The paragraph lands before the heading, not appended at the end.
        const at = post.content.findIndex((b) => b.style === 'h2' && b.children[0].text === before);
        assert.ok(post.content.slice(0, at).some((b) => (b.markDefs ?? []).some((m) => m.href === href)), `${slug}: link is after the heading`);
    }
});

test('the two posts that already linked their target are not doubled', () => {
    // The SSL article's code body already links /uslugi/strony-www; the guide's CMS
    // body links /uslugi/audyt-strony-internetowej, so its config must not repeat that
    // href — it may still point at the other service pages the article does not link.
    const ssl = applyBlogPostFixes('ssl-co-to-jest-i-czy-jest-potrzebne-4-powody-dla-ktorych-powinienes-go-wlaczyc', { title: 'SSL' });
    assert.equal(linksIn(ssl.content).filter((link) => link.href === '/uslugi/strony-www').length, 1);
    const guide = getBlogSeoConfig('tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow');
    const guideHrefs = (guide?.links ?? []).map((link) => link.href);
    assert.ok(!guideHrefs.includes('/uslugi/audyt-strony-internetowej'), 'the guide doubles the link its CMS body already carries');
    assert.ok(guideHrefs.includes('/uslugi/strony-www'), 'the guide should link the website service page');
});

const kbBlock = (text) => ({
    _type: 'block',
    _key: `kb-${text.slice(0, 8)}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: 's', text, marks: [] }],
});

const kbEntry = (texts) => ({ _id: '1', title: 'T', content: texts.map(kbBlock) });

test('knowledge-base entries get one contextual link before their section', () => {
    const cases = [
        { slug: 'marketing-automation', before: 'Przykłady zastosowania Marketing Automation', href: '/uslugi/audyt-e-commerce', anchor: 'audyt sklepu internetowego' },
        { slug: 'webinar', before: 'Podsumowanie', href: '/uslugi/e-commerce', anchor: 'usługi e-commerce' },
    ];
    for (const { slug, before, href, anchor } of cases) {
        const entry = applyKnowledgeBaseSeo(slug, kbEntry(['Wstęp.', before, 'Treść.']));
        const links = linksIn(entry.content).filter((link) => link.href === href);
        assert.equal(links.length, 1, `${slug}: expected one ${href}`);
        assert.equal(links[0].text, anchor, `${slug}: wrong anchor`);
        const at = entry.content.findIndex((b) => (b.children ?? []).some((child) => child.text === before));
        assert.ok(at > 0, `${slug}: anchor block is gone`);
        assert.ok((entry.content[at - 1].markDefs ?? []).some((m) => m.href === href), `${slug}: link is not right before the section`);
        assert.match(entry.content[0].children[0].text, /Wstęp\./);
    }
});

test('a knowledge-base entry that already links the page is left alone', () => {
    const existing = {
        _type: 'block',
        _key: 'existing',
        style: 'normal',
        markDefs: [{ _key: 'l', _type: 'link', href: '/uslugi/audyt-e-commerce' }],
        children: [{ _type: 'span', _key: 's', text: 'audyt e-commerce', marks: ['l'] }],
    };
    const entry = applyKnowledgeBaseSeo('marketing-automation', { _id: '1', content: [existing, kbBlock('Przykłady zastosowania Marketing Automation')] });
    assert.equal(linksIn(entry.content).length, 1);
});

test('an unknown insertion point leaves the knowledge-base body untouched', () => {
    const entry = applyKnowledgeBaseSeo('webinar', kbEntry(['A.', 'B.']));
    assert.equal(entry.content.length, 2);
    assert.deepEqual(linksIn(entry.content), []);
});

test('the SALESmanago override carries exactly one e-commerce audit link', () => {
    const entry = applyKnowledgeBaseSeo('sales-manago', kbEntry(['CMS body.']));
    const links = linksIn(entry.content).filter((link) => link.href === '/uslugi/audyt-e-commerce');
    assert.equal(links.length, 1);
    assert.equal(links[0].text, 'audyt e-commerce');
    // The override still replaces the CMS body, not just adds to it.
    assert.ok(entry.content.length > 10);
    assert.ok(!entry.content.some((b) => (b.children ?? []).some((child) => child.text === 'CMS body.')));
});
