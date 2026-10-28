import { test } from 'node:test';
import assert from 'node:assert/strict';
import { portableTextToPlainText } from '../src/lib/markdown/portable-text.ts';
import { portfolioFrontmatter, portfolioMarkdown, projectSummary } from '../src/lib/markdown/portfolio.ts';
import { serializeFrontmatter, parseFrontmatter } from '../src/lib/markdown/frontmatter.ts';
import { buildCreativeWorkSchema, SITE_URL } from '../src/lib/schema.ts';

const block = (text, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }], markDefs: [] });

const project = {
    title: 'Beauty Clinic',
    client: 'BeautyClinic.pl',
    projectUrl: 'https://beautyclinic.pl',
    scopeOfWork: ['Projekt UX/UI', ' Wdrożenie WordPress ', ''],
    categories: [{ title: 'Strony WWW' }, null, { title: 'SEO' }],
    publishedAt: '2024-05-10T10:00:00Z',
    _updatedAt: '2025-01-02T08:00:00Z',
};

test('portableTextToPlainText joins text blocks and skips images', () => {
    const text = portableTextToPlainText([block('Pierwszy  akapit.'), { _type: 'image' }, block('Drugi', 'h2')]);
    assert.equal(text, 'Pierwszy akapit. Drugi');
});

test('portableTextToPlainText accepts a plain string and cuts on a word boundary', () => {
    assert.equal(portableTextToPlainText('  jeden\n dwa  '), 'jeden dwa');
    const cut = portableTextToPlainText('Strona internetowa dla kliniki medycyny estetycznej z rezerwacją wizyt', 40);
    assert.ok(cut.length <= 40, cut);
    assert.ok(cut.endsWith('…'));
    assert.ok(!/\s…$/.test(cut));
    assert.equal(portableTextToPlainText(null), '');
});

test('projectSummary prefers the own description, else builds one from facts', () => {
    assert.equal(projectSummary(project, 'Nowa strona kliniki.'), 'Nowa strona kliniki.');
    const built = projectSummary(project, '');
    assert.match(built, /^Beauty Clinic — realizacja CreativeTrust dla BeautyClinic\.pl\./);
    assert.match(built, /Kategorie: Strony WWW, SEO\./);
    assert.match(built, /Zakres: Projekt UX\/UI, Wdrożenie WordPress\./);
    assert.equal(projectSummary({ title: 'Selfia', client: 'Selfia' }), 'Selfia — realizacja CreativeTrust.');
});

test('portfolio Markdown twin has frontmatter, one H1, facts, scope and the HTML link', () => {
    const canonical = `${SITE_URL}/portfolio/beautyclinic-pl`;
    const summary = projectSummary(project, 'Nowa strona kliniki.');
    const md = portfolioMarkdown({
        doc: project,
        canonical,
        frontmatter: serializeFrontmatter(portfolioFrontmatter(project, canonical, summary)),
        descriptionMarkdown: '# Wyzwanie\n\nKlinika potrzebowała rezerwacji.\n\n## Efekt\n\nWięcej wizyt.',
        mainImageUrl: 'https://cdn.sanity.io/x.jpg',
    });
    const { data, body } = parseFrontmatter(md);
    assert.equal(data.type, 'case-study');
    assert.equal(data.canonical, canonical);
    assert.equal(data.client, 'BeautyClinic.pl');
    assert.equal(data.date, '2024-05-10');
    assert.deepEqual(data.semantic_keywords, ['Strony WWW', 'SEO', 'BeautyClinic.pl']);
    for (const key of ['title', 'description', 'ai_summary', 'target_audience']) assert.ok(data[key], key);

    assert.equal(body.match(/^# /gm).length, 1, 'single H1');
    assert.match(body, /^# Beauty Clinic$/m);
    assert.match(body, /- \*\*Klient:\*\* BeautyClinic\.pl/);
    assert.match(body, /- \*\*Link do projektu:\*\* https:\/\/beautyclinic\.pl/);
    assert.match(body, /^### Wyzwanie$/m, 'description headings nest under ## Opis projektu');
    assert.match(body, /^### Efekt$/m);
    assert.match(body, /## Zakres prac\n\n- Projekt UX\/UI\n- Wdrożenie WordPress\n/);
    assert.ok(body.includes(`Wersja HTML: ${canonical}`));
    assert.ok(!/^#+\s*$/m.test(body), 'no empty headings');
});

test('portfolio Markdown omits empty sections', () => {
    const md = portfolioMarkdown({ doc: { title: 'X' }, canonical: `${SITE_URL}/portfolio/x`, frontmatter: '---\ntitle: X\n---\n' });
    assert.ok(!md.includes('## Opis projektu'));
    assert.ok(!md.includes('## Zakres prac'));
    assert.ok(md.includes('## Informacje o projekcie'));
});

test('CreativeWork schema links the case study to the organization and the client', () => {
    const url = `${SITE_URL}/portfolio/beautyclinic-pl`;
    const schema = buildCreativeWorkSchema({ name: 'Beauty Clinic', url, clientName: 'BeautyClinic.pl', keywords: ['SEO'], image: [], sameAs: 'https://beautyclinic.pl' });
    assert.equal(schema['@type'], 'CreativeWork');
    assert.equal(schema['@id'], `${url}#creativework`);
    assert.deepEqual(schema.creator, { '@id': `${SITE_URL}/#organization` });
    assert.deepEqual(schema.about, { '@type': 'Organization', name: 'BeautyClinic.pl' });
    assert.equal(schema.keywords, 'SEO');
    assert.equal(schema.image, undefined);
});

test('portfolio projects have a Markdown twin URL', async () => {
    const { markdownTargetFor, routeFromMarkdownUrl, handlerPathFor } = await import('../src/lib/markdown/pages.ts');
    const target = markdownTargetFor('/portfolio/beautyclinic-pl');
    assert.deepEqual(target, { kind: 'portfolio', route: '/portfolio/beautyclinic-pl', slug: 'beautyclinic-pl' });
    assert.equal(routeFromMarkdownUrl('/portfolio/beautyclinic-pl.md'), '/portfolio/beautyclinic-pl');
    assert.equal(handlerPathFor(target), '/md/portfolio/beautyclinic-pl');
    assert.deepEqual(markdownTargetFor('/portfolio'), { kind: 'portfolio-index', route: '/portfolio' });
    assert.equal(handlerPathFor(markdownTargetFor('/portfolio')), '/md/portfolio');
    assert.deepEqual(markdownTargetFor('/blog/autor/bartosz'), { kind: 'author', route: '/blog/autor/bartosz', slug: 'bartosz' });
    assert.equal(markdownTargetFor('/blog/autor/Zly_Slug'), null);
    assert.equal(markdownTargetFor('/portfolio/Zly_Slug'), null);
});

test('llms.txt lists case studies after services and every article', async () => {
    const { buildLlmsTxt, buildLlmsFullTxt } = await import('../src/lib/markdown/llms.ts');
    const origin = SITE_URL;
    const pages = [
        { title: 'Strona główna', description: 'Start', url: `${origin}/index.md`, section: 'company' },
        { title: 'Strony WWW', description: 'Usługa', url: `${origin}/uslugi/strony-www.md`, section: 'services' },
        { title: 'Cennik', description: 'Ceny', url: `${origin}/uslugi/tworzenie-stron-www-cennik.md`, section: 'pricing' },
    ];
    const articles = [
        { kind: 'portfolio', title: 'Beauty Clinic', url: `${origin}/portfolio/beautyclinic-pl.md`, summary: 'Strona kliniki.' },
        ...Array.from({ length: 70 }, (_, i) => ({ kind: 'blog', title: `Wpis ${i}`, url: `${origin}/blog/wpis-${i}.md` })),
        { kind: 'knowledge-base', title: 'CRM', url: `${origin}/baza-wiedzy/crm.md` },
    ];
    const txt = buildLlmsTxt({ origin, pages, articles });
    const services = txt.indexOf('## Usługi');
    const cases = txt.indexOf('## Realizacje (case studies)');
    const pricing = txt.indexOf('## Cenniki');
    assert.ok(services < cases && cases < pricing, 'case studies sit between services and pricing');
    assert.ok(txt.includes(`- [Beauty Clinic](${origin}/portfolio/beautyclinic-pl.md): Strona kliniki.`));
    assert.equal((txt.match(/\]\(https:\/\/www\.creativetrust\.pl\/blog\/wpis-/g) ?? []).length, 70, 'no blog cap');
    const blogSection = txt.slice(txt.indexOf('## Blog'));
    assert.ok(!blogSection.includes('beautyclinic'), 'case studies are not listed as blog posts');

    const full = buildLlmsFullTxt({ origin, documents: [], articles });
    assert.ok(full.indexOf('## Realizacje (case studies)') < full.indexOf('## Artykuły i baza wiedzy'));
    assert.ok(!full.slice(full.indexOf('## Artykuły i baza wiedzy')).includes('beautyclinic'));
});

test('author resolves to a full Person entity with sameAs', async () => {
    const { resolveAuthor } = await import('../src/lib/authors.ts');
    const { buildPersonSchema, buildProfilePageSchema, buildBlogPostingSchema } = await import('../src/lib/schema.ts');
    const sanityAuthor = {
        name: 'Bartosz',
        role: 'CEO',
        slug: { current: 'bartosz' },
        socialLinks: { linkedin: 'https://www.linkedin.com/in/x/', twitter: '', instagram: 'https://instagram.com/x' },
    };
    const author = resolveAuthor(sanityAuthor);
    assert.equal(author.name, 'Bartosz Łyśniewski');
    assert.equal(author.jobTitle, 'CEO CreativeTrust');
    assert.deepEqual(author.sameAs, ['https://www.linkedin.com/in/x/', 'https://instagram.com/x']);
    assert.equal(resolveAuthor({ name: 'Anna', role: 'Copywriter', slug: 'anna' }).name, 'Anna', 'unknown authors keep their Sanity name');
    assert.equal(resolveAuthor({ name: ' ' }), null);

    const person = buildPersonSchema(author);
    assert.equal(person['@id'], `${SITE_URL}/blog/autor/bartosz#person`);
    assert.equal(person.url, `${SITE_URL}/blog/autor/bartosz`);
    assert.deepEqual(person.worksFor, { '@id': `${SITE_URL}/#organization` });

    const profile = buildProfilePageSchema({ ...author, slug: 'bartosz' });
    assert.equal(profile['@type'], 'ProfilePage');
    assert.equal(profile.mainEntity.name, 'Bartosz Łyśniewski');

    const post = buildBlogPostingSchema({ title: 'T', url: `${SITE_URL}/blog/t`, datePublished: '2025-01-01', author, authorName: 'Bartosz' });
    assert.equal(post.author.name, 'Bartosz Łyśniewski');
    assert.equal(post.author['@id'], person['@id']);
});

test('one company description and founding year across JSON-LD, llms.txt and the site', async () => {
    const { readFileSync } = await import('node:fs');
    const { organizationSchema, COMPANY_DESCRIPTION, FOUNDING_YEAR } = await import('../src/lib/schema.ts');
    const { SUMMARY } = await import('../src/lib/markdown/llms.ts');
    const { parseFrontmatter } = await import('../src/lib/markdown/frontmatter.ts');
    const org = organizationSchema['@graph'].find((node) => node['@type'] === 'Organization');
    assert.equal(org.description, COMPANY_DESCRIPTION);
    assert.equal(SUMMARY, COMPANY_DESCRIPTION, 'llms.txt summary matches the Organization description');
    assert.match(COMPANY_DESCRIPTION, /AI-native partner produktowy/);
    assert.doesNotMatch(COMPANY_DESCRIPTION, /agencja marketingowa|performance marketing/i);
    assert.equal(org.foundingDate, FOUNDING_YEAR);
    assert.ok(org.logo?.url?.startsWith(SITE_URL), 'Organization has a logo');

    const home = parseFrontmatter(readFileSync(new URL('../content/ai/index.md', import.meta.url), 'utf8'));
    assert.equal(home.data.ai_summary, COMPANY_DESCRIPTION);
    const about = readFileSync(new URL('../src/app/o-nas/page.tsx', import.meta.url), 'utf8');
    const firstYear = about.match(/year: '(\d{4})'/)[1];
    assert.equal(firstYear, FOUNDING_YEAR, 'the „O nas” timeline starts in the founding year');
});

test('retired blog posts redirect to a live page and never reach the sitemap', async () => {
    const { readFileSync } = await import('node:fs');
    const { createRequire } = await import('node:module');
    const Module = (await import('node:module')).default;
    const { markdownPages, markdownTargetFor } = await import('../src/lib/markdown/pages.ts');
    const retired = JSON.parse(readFileSync(new URL('../retired-blog-posts.json', import.meta.url), 'utf8'));
    const slugs = Object.keys(retired);
    assert.ok(slugs.length >= 2);
    for (const destination of Object.values(retired)) {
        const target = markdownTargetFor(destination);
        assert.ok(target, `${destination} has a Markdown twin`);
        if (target.kind === 'page') assert.ok(markdownPages.some((p) => p.route === destination));
        assert.ok(!slugs.some((slug) => destination === `/blog/${slug}`), 'no redirect chains');
    }

    // Run the real additionalPaths with a fake Sanity client that returns the retired posts.
    const originalLoad = Module._load;
    Module._load = function (request, ...rest) {
        if (request === 'next-sanity') {
            return {
                createClient: () => ({
                    fetch: async (query) =>
                        query.includes('"blogPost"') ? [...slugs, 'aktualny-wpis'].map((slug) => ({ slug, _updatedAt: '2026-01-01' })) : [],
                }),
            };
        }
        return originalLoad.call(this, request, ...rest);
    };
    try {
        const config = createRequire(import.meta.url)('../next-sitemap.config.js');
        const paths = (await config.additionalPaths({})).map((p) => p.loc);
        assert.ok(paths.includes('/blog/aktualny-wpis'));
        for (const slug of slugs) assert.ok(!paths.includes(`/blog/${slug}`), `${slug} left out of the sitemap`);
    } finally {
        Module._load = originalLoad;
    }
});

test('robots.txt transform drops the Host line and keeps Content-Signal', async () => {
    const { createRequire } = await import('node:module');
    const config = createRequire(import.meta.url)('../next-sitemap.config.js');
    const generated = '# *\nUser-agent: *\nAllow: /\n\n# Host\nHost: https://www.creativetrust.pl\n\n# Sitemaps\nSitemap: https://www.creativetrust.pl/sitemap.xml\n';
    const robots = await config.robotsTxtOptions.transformRobotsTxt({}, generated);
    assert.ok(!robots.includes('Host:'));
    assert.match(robots, /Content-Signal: search=yes,ai-input=yes,ai-train=no\n\n# Sitemaps/);
});

test('portfolio index and author Markdown twins', async () => {
    const { portfolioIndexMarkdown, authorMarkdown } = await import('../src/lib/markdown/collections.ts');
    const index = portfolioIndexMarkdown({
        frontmatter: '---\ntitle: P\n---\n',
        canonical: `${SITE_URL}/portfolio`,
        projects: [{ title: 'Beauty Clinic', url: `${SITE_URL}/portfolio/beautyclinic-pl.md`, summary: 'Strona\nkliniki.' }],
    });
    assert.equal(index.match(/^# /gm).length, 1);
    assert.match(index, /Łącznie 1 opisanych projektów/);
    assert.ok(index.includes(`- [Beauty Clinic](${SITE_URL}/portfolio/beautyclinic-pl.md): Strona kliniki.`));

    const author = authorMarkdown({
        frontmatter: '---\ntitle: A\n---\n',
        canonical: `${SITE_URL}/blog/autor/bartosz`,
        name: 'Bartosz Łyśniewski',
        jobTitle: 'CEO CreativeTrust',
        bioMarkdown: '',
        sameAs: ['https://www.linkedin.com/in/x/'],
        posts: [{ title: 'Wpis', url: `${SITE_URL}/blog/wpis.md` }],
    });
    assert.match(author, /^# Bartosz Łyśniewski$/m);
    assert.match(author, /Bartosz Łyśniewski — CEO CreativeTrust\./);
    assert.ok(!author.includes('## O autorze'), 'empty bio is omitted');
    assert.match(author, /## Profile\n\n- https:\/\/www\.linkedin\.com\/in\/x\//);
    assert.match(author, /## Artykuły \(1\)/);
    assert.ok(!/\n\n\n/.test(author), 'no blank-line runs');
    assert.ok(!/^#+\s*$/m.test(author));
});

test('legal identity matches the privacy policy and appears in Organization and the footer', async () => {
    const { readFileSync } = await import('node:fs');
    const { organizationSchema, LEGAL_NAME, TAX_ID } = await import('../src/lib/schema.ts');
    const org = organizationSchema['@graph'].find((node) => node['@type'] === 'Organization');
    assert.equal(org.legalName, LEGAL_NAME);
    if (TAX_ID) {
        assert.match(TAX_ID, /^\d{10}$/, 'NIP is 10 digits');
        assert.equal(org.taxID, TAX_ID);
    } else {
        assert.equal(org.taxID, undefined);
    }
    const policy = readFileSync(new URL('../src/app/polityka-prywatnosci/page.tsx', import.meta.url), 'utf8');
    assert.ok(policy.includes(LEGAL_NAME), 'same legal name as the privacy policy');
    const footer = readFileSync(new URL('../src/components/Footer.tsx', import.meta.url), 'utf8');
    assert.ok(footer.includes('{LEGAL_NAME}'));
});

test('NIP passes the official checksum', async () => {
    const { TAX_ID } = await import('../src/lib/schema.ts');
    assert.ok(TAX_ID, 'NIP is set');
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    const digits = [...TAX_ID].map(Number);
    const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0);
    assert.equal(sum % 11, digits[9]);
});
