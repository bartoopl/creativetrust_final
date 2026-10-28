/**
 * Markdown twins of listing pages built from Sanity: the portfolio index
 * (`/portfolio.md`) and author profiles (`/blog/autor/<slug>.md`). Pure string
 * work, no imports, so `node --test` can load it directly.
 */

export interface CollectionLink {
    title: string;
    /** Absolute `.md` URL. */
    url: string;
    summary?: string | null;
}

const oneLine = (text?: string | null) => (text ?? '').replace(/\s+/g, ' ').trim();

const link = ({ title, url, summary }: CollectionLink) => {
    const note = oneLine(summary);
    return `- [${oneLine(title)}](${url})${note ? `: ${note}` : ''}`;
};

export function portfolioIndexMarkdown({ frontmatter, canonical, projects }: { frontmatter: string; canonical: string; projects: CollectionLink[] }): string {
    return [
        frontmatter,
        '# Portfolio i realizacje CreativeTrust',
        '',
        `Realizacje CreativeTrust: strony internetowe, sklepy e-commerce, marketing automation i kampanie. Łącznie ${projects.length} opisanych projektów; każdy ma pełny opis (klient, zakres prac, kategorie) pod adresem \`.md\`.`,
        '',
        '## Realizacje',
        '',
        ...(projects.length ? projects.map(link) : ['Lista realizacji jest chwilowo niedostępna. Wersja HTML: ' + canonical]),
        '',
        '---',
        '',
        `Wersja HTML: ${canonical}`,
        '',
    ].join('\n');
}

export interface AuthorMarkdownInput {
    frontmatter: string;
    canonical: string;
    name: string;
    jobTitle?: string;
    /** Bio already converted to Markdown. */
    bioMarkdown?: string;
    sameAs: string[];
    posts: CollectionLink[];
}

export function authorMarkdown({ frontmatter, canonical, name, jobTitle, bioMarkdown, sameAs, posts }: AuthorMarkdownInput): string {
    const bio = bioMarkdown?.trim();
    const blocks = [
        `# ${oneLine(name)}`,
        `${oneLine(name)}${jobTitle ? ` — ${oneLine(jobTitle)}` : ''}. Autor bloga CreativeTrust (https://www.creativetrust.pl).`,
        bio ? `## O autorze\n\n${bio}` : '',
        sameAs.length ? `## Profile\n\n${sameAs.map((url) => `- ${url}`).join('\n')}` : '',
        posts.length ? `## Artykuły (${posts.length})\n\n${posts.map(link).join('\n')}` : '',
        '---',
        `Wersja HTML: ${canonical}`,
    ];
    return `${frontmatter}\n${blocks.filter(Boolean).join('\n\n')}\n`;
}
