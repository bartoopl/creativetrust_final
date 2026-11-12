/**
 * Query parsing and result mapping for the agent article search endpoint.
 * Pure (no imports) so `node --test` can cover it.
 */

export const MAX_LIMIT = 10;

export type ArticleQuery = { ok: true; query: string; limit: number } | { ok: false; error: string };

export function parseArticleQuery(params: URLSearchParams): ArticleQuery {
    // Collapse whitespace and drop wildcards the caller might send.
    const query = (params.get('q') ?? '').replace(/[*\s]+/g, ' ').trim();
    if (query.length < 2 || query.length > 100) return { ok: false, error: 'q must be 2–100 characters' };
    const raw = Number(params.get('limit') ?? 5);
    const limit = Number.isFinite(raw) ? Math.min(MAX_LIMIT, Math.max(1, Math.round(raw))) : 5;
    return { ok: true, query, limit };
}

/** Every word must appear in the title or summary (case-insensitive contains, so "migrac" finds "migracja"). */
export function matchTerms(query: string): string[] {
    return query.split(' ').filter(Boolean);
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
