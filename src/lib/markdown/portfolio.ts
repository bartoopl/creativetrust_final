/**
 * Portfolio case studies for crawlers and AI agents: meta description,
 * frontmatter and the Markdown twin of `/portfolio/<slug>`. Pure string work,
 * no imports, so `node --test` can load it directly; Portable Text and image
 * URLs are converted by the caller.
 */

export interface PortfolioProjectDocument {
    title?: string | null;
    client?: string | null;
    projectUrl?: string | null;
    scopeOfWork?: string[] | null;
    categories?: Array<{ title?: string | null } | null> | null;
    publishedAt?: string | null;
    _updatedAt?: string | null;
}

const clean = (value?: string | null) => value?.replace(/\s+/g, ' ').trim() || undefined;

const isoDate = (value?: string | null) => (value && !Number.isNaN(Date.parse(value)) ? new Date(value).toISOString().slice(0, 10) : undefined);

export function projectCategories(doc: PortfolioProjectDocument): string[] {
    return (doc.categories ?? []).map((c) => clean(c?.title)).filter((c): c is string => Boolean(c));
}

export function projectScope(doc: PortfolioProjectDocument): string[] {
    return (doc.scopeOfWork ?? []).map((item) => clean(item)).filter((item): item is string => Boolean(item));
}

/**
 * One-sentence summary for `<meta description>`, JSON-LD and llms.txt: the
 * project's own description when it has one, otherwise built from its facts.
 */
export function projectSummary(doc: PortfolioProjectDocument, plainDescription?: string | null): string {
    const own = clean(plainDescription);
    if (own) return own;
    const title = clean(doc.title) ?? 'Projekt';
    const client = clean(doc.client);
    const categories = projectCategories(doc);
    const scope = projectScope(doc).slice(0, 4);
    return [
        `${title} — realizacja CreativeTrust${client && client !== title ? ` dla ${client}` : ''}.`,
        categories.length ? `Kategorie: ${categories.join(', ')}.` : '',
        scope.length ? `Zakres: ${scope.join(', ')}.` : '',
    ]
        .filter(Boolean)
        .join(' ');
}

export type PortfolioFrontmatter = Record<string, string | string[] | undefined>;

export function portfolioFrontmatter(doc: PortfolioProjectDocument, canonical: string, summary: string): PortfolioFrontmatter {
    const title = clean(doc.title) ?? '';
    const client = clean(doc.client);
    const categories = projectCategories(doc);
    const keywords = client ? [...categories, client] : categories;
    return {
        title: `${title} — realizacja CreativeTrust`,
        description: summary,
        date: isoDate(doc.publishedAt),
        updated: isoDate(doc._updatedAt),
        canonical,
        lang: 'pl-PL',
        type: 'case-study',
        client,
        project_url: clean(doc.projectUrl),
        ai_summary: summary,
        target_audience: [
            categories.length
                ? `Firmy szukające wykonawcy w obszarach: ${categories.join(', ')}`
                : 'Firmy szukające wykonawcy strony, sklepu lub kampanii',
        ],
        semantic_keywords: keywords.length ? keywords : [title],
    };
}

export interface PortfolioMarkdownInput {
    doc: PortfolioProjectDocument;
    canonical: string;
    /** Serialised frontmatter block (`---\n…\n---`). */
    frontmatter: string;
    /** Project description already converted to Markdown. */
    descriptionMarkdown?: string;
    /** Absolute URL of the main image. */
    mainImageUrl?: string | null;
}

/** Description headings are demoted below the document's `##` sections. */
function nestUnder(markdown: string, minLevel: number): string {
    let fenced = false;
    return markdown
        .split('\n')
        .map((line) => {
            if (/^(```|~~~)/.test(line)) fenced = !fenced;
            const heading = !fenced && line.match(/^(#{1,6})\s/);
            if (!heading || heading[1].length >= minLevel) return line;
            return `${'#'.repeat(minLevel)}${line.slice(heading[1].length)}`;
        })
        .join('\n');
}

export function portfolioMarkdown({ doc, canonical, frontmatter, descriptionMarkdown, mainImageUrl }: PortfolioMarkdownInput): string {
    const title = clean(doc.title) ?? 'Projekt';
    const client = clean(doc.client);
    const categories = projectCategories(doc);
    const scope = projectScope(doc);
    const date = isoDate(doc.publishedAt);
    const projectUrl = clean(doc.projectUrl);

    const facts = [
        client ? `- **Klient:** ${client}` : '',
        date ? `- **Data realizacji:** ${date}` : '',
        categories.length ? `- **Kategorie:** ${categories.join(', ')}` : '',
        projectUrl ? `- **Link do projektu:** ${projectUrl}` : '',
        '- **Wykonawca:** CreativeTrust (https://www.creativetrust.pl)',
    ].filter(Boolean);

    const description = descriptionMarkdown?.trim();
    const sections = [
        frontmatter,
        `# ${title}`,
        mainImageUrl ? `\n![${title}](${mainImageUrl})` : '',
        `\n## Informacje o projekcie\n\n${facts.join('\n')}`,
        description ? `\n## Opis projektu\n\n${nestUnder(description, 3)}` : '',
        scope.length ? `\n## Zakres prac\n\n${scope.map((item) => `- ${item}`).join('\n')}` : '',
        `\n---\n\nWersja HTML: ${canonical}\nWszystkie realizacje: https://www.creativetrust.pl/llms.txt\n`,
    ];
    return sections.filter(Boolean).join('\n');
}
