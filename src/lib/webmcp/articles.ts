/**
 * Query parsing and result mapping for the agent article search endpoint.
 * Pure (no imports) so `node --test` can cover it.
 */

export const MAX_LIMIT = 10;

export type ArticleQuery = { ok: true; query: string; limit: number } | { ok: false; error: string };

export function parseArticleQuery(params: URLSearchParams): ArticleQuery {
    // Collapse whitespace and drop GROQ match wildcards the caller might send.
    const query = (params.get('q') ?? '').replace(/[*\s]+/g, ' ').trim();
    if (query.length < 2 || query.length > 100) return { ok: false, error: 'q must be 2–100 characters' };
    const raw = Number(params.get('limit') ?? 5);
    const limit = Number.isFinite(raw) ? Math.min(MAX_LIMIT, Math.max(1, Math.round(raw))) : 5;
    return { ok: true, query, limit };
}

/** Published blog posts and knowledge-base entries only; drafts are excluded because the server client holds a token. */
export function articleSearchGroq(limit: number): string {
    const end = Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit)));
    return `*[_type in ["blogPost", "knowledgeBase"] && defined(slug.current) && !(_id in path("drafts.**"))
        && [title, excerpt, shortDescription] match $terms]
        | order(publishedAt desc)[0...${end}] {
            _type, title, "slug": slug.current, "summary": coalesce(excerpt, shortDescription), publishedAt
        }`;
}

/** Every word must match, each as a prefix (so "migrac" finds "migracja"). */
export function matchTerms(query: string): string[] {
    return query.split(' ').filter(Boolean).map((word) => `${word}*`);
}

export interface ArticleDoc {
    _type: string;
    title?: string;
    slug?: string;
    summary?: string | null;
    publishedAt?: string | null;
}

export function toHit(doc: ArticleDoc, origin: string) {
    const blog = doc._type === 'blogPost';
    return {
        title: doc.title ?? '',
        url: new URL(`${blog ? '/blog' : '/baza-wiedzy'}/${doc.slug}`, origin).toString(),
        type: blog ? ('blog' as const) : ('knowledge-base' as const),
        ...(doc.summary ? { summary: doc.summary } : {}),
        ...(doc.publishedAt ? { publishedAt: doc.publishedAt } : {}),
    };
}
