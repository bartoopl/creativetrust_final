import { NextResponse } from 'next/server';
import { searchArticles } from '@/lib/cms';
import { SITE_URL } from '@/lib/schema';
import { matchTerms, parseArticleQuery, toHit } from '@/lib/webmcp/articles';

/** Read-only article search backing the `search_articles` WebMCP tool. */
export async function GET(request: Request) {
    const parsed = parseArticleQuery(new URL(request.url).searchParams);
    if (!parsed.ok) {
        return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    try {
        const docs = await searchArticles(matchTerms(parsed.query), parsed.limit);
        return NextResponse.json(
            { results: docs.map((doc) => toHit(doc, SITE_URL)) },
            { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } },
        );
    } catch (error) {
        console.error('Agent article search failed:', error);
        return NextResponse.json({ error: 'Search unavailable' }, { status: 502 });
    }
}
