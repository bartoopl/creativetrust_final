import { SITE_URL } from '@/lib/schema';
import { buildLlmsFullTxt } from '@/lib/markdown/llms';
import { markdownUrlFor } from '@/lib/markdown/pages';
import { getArticleIndex, loadAllPages, plainTextResponse } from '@/lib/markdown/server';

// Per request, CDN-cached for an hour (s-maxage), so new articles show up
// without a deploy and next-sitemap does not list this file.
export const dynamic = 'force-dynamic';

export async function GET() {
    const [pages, articles] = await Promise.all([loadAllPages(), getArticleIndex()]);
    const documents = pages.map((loaded) => ({ url: `${SITE_URL}${markdownUrlFor(loaded.page.route)}`, body: loaded.body }));
    return plainTextResponse(buildLlmsFullTxt({ origin: SITE_URL, documents, articles }));
}
