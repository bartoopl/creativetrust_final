import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { SITE_URL } from '@/lib/schema';
import { articleSearchGroq, matchTerms, parseArticleQuery, toHit, type ArticleDoc } from '@/lib/webmcp/articles';

/** Read-only article search backing the `search_articles` WebMCP tool. */
export async function GET(request: Request) {
    const parsed = parseArticleQuery(new URL(request.url).searchParams);
    if (!parsed.ok) {
        return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    try {
        const docs = await client.fetch<ArticleDoc[]>(articleSearchGroq(parsed.limit), { terms: matchTerms(parsed.query) });
        return NextResponse.json(
            { results: docs.map((doc) => toHit(doc, SITE_URL)) },
            { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } },
        );
    } catch (error) {
        console.error('Agent article search failed:', error);
        return NextResponse.json({ error: 'Search unavailable' }, { status: 502 });
    }
}
