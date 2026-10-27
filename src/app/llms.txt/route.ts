import { SITE_URL } from '@/lib/schema';
import { buildLlmsTxt } from '@/lib/markdown/llms';
import { getLatestArticles, loadAllPages, plainTextResponse, toLlmsPage } from '@/lib/markdown/server';

// Per request, CDN-cached for an hour (s-maxage), so new articles show up
// without a deploy and next-sitemap does not list this file.
export const dynamic = 'force-dynamic';

export async function GET() {
    const [pages, articles] = await Promise.all([loadAllPages(), getLatestArticles()]);
    return plainTextResponse(buildLlmsTxt({ origin: SITE_URL, pages: pages.map(toLlmsPage), articles }));
}
