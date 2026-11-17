import { SITE_URL } from '@/lib/schema';
import { buildLlmsTxt } from '@/lib/markdown/llms';
import { getArticleIndex, loadAllPages, plainTextResponse, toLlmsPage } from '@/lib/markdown/server';

// Per request from a fresh CMS read (no hourly data cache), CDN-cached for
// five minutes: a post published a minute ago is already listed.
export const dynamic = 'force-dynamic';

export async function GET() {
    const [pages, articles] = await Promise.all([loadAllPages(), getArticleIndex({ fresh: true })]);
    return plainTextResponse(buildLlmsTxt({ origin: SITE_URL, pages: pages.map(toLlmsPage), articles }), 300);
}
