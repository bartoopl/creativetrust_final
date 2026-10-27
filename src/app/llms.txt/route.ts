import { SITE_URL } from '@/lib/schema';
import { buildLlmsTxt } from '@/lib/markdown/llms';
import { getLatestArticles, loadAllPages, plainTextResponse, toLlmsPage } from '@/lib/markdown/server';

// Regenerated hourly so new blog posts and knowledge-base entries show up.
export const revalidate = 3600;

export async function GET() {
    const [pages, articles] = await Promise.all([loadAllPages(), getLatestArticles()]);
    return plainTextResponse(buildLlmsTxt({ origin: SITE_URL, pages: pages.map(toLlmsPage), articles }));
}
