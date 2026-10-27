/**
 * Frontmatter for blog posts and knowledge-base entries fetched from Sanity.
 * Returns plain data (serialised by the caller) so it stays import-free.
 */

export interface ArticleDocument {
    title?: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    excerpt?: string | null;
    shortDescription?: string | null;
    publishedAt?: string | null;
    _updatedAt?: string | null;
    tags?: string[] | null;
    categories?: Array<{ title?: string | null } | null> | null;
    author?: { name?: string | null } | null;
}

export type ArticleFrontmatter = Record<string, string | string[] | undefined>;

const isoDate = (value?: string | null) => (value && !Number.isNaN(Date.parse(value)) ? new Date(value).toISOString().slice(0, 10) : undefined);

const clean = (value?: string | null) => value?.replace(/\s+/g, ' ').trim() || undefined;

export function articleFrontmatter(doc: ArticleDocument, kind: 'blog' | 'knowledge-base', canonical: string): ArticleFrontmatter {
    const title = clean(doc.title) ?? '';
    const lead = clean(doc.excerpt) ?? clean(doc.shortDescription);
    const description = clean(doc.seoDescription) ?? lead;
    const categories = (doc.categories ?? []).map((c) => clean(c?.title)).filter((c): c is string => Boolean(c));
    const tags = (doc.tags ?? []).map((t) => clean(t)).filter((t): t is string => Boolean(t));
    const keywords = kind === 'blog' ? categories : tags;

    return {
        title: clean(doc.seoTitle) ?? title,
        description,
        date: isoDate(doc.publishedAt),
        updated: isoDate(doc._updatedAt),
        canonical,
        lang: 'pl-PL',
        type: kind === 'blog' ? 'blog-post' : 'knowledge-base-entry',
        author: kind === 'blog' ? clean(doc.author?.name) : undefined,
        ai_summary: lead ?? description,
        target_audience:
            kind === 'blog'
                ? [categories.length ? `Czytelnicy zainteresowani tematami: ${categories.join(', ')}` : 'Czytelnicy bloga CreativeTrust']
                : [`Osoby szukające wyjaśnienia pojęcia „${title}”`],
        semantic_keywords: keywords.length ? keywords : [title],
    };
}

/** Lead paragraph shown under the H1, if the document has one. */
export function articleLead(doc: ArticleDocument): string | undefined {
    return clean(doc.excerpt) ?? clean(doc.shortDescription);
}
