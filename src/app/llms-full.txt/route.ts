import { SITE_URL } from '@/lib/schema';
import { buildLlmsFullTxt } from '@/lib/markdown/llms';
import { markdownUrlFor } from '@/lib/markdown/pages';
import { getArticleIndex, loadAllPages, plainTextResponse } from '@/lib/markdown/server';

// Per request from a fresh CMS read (no hourly data cache), CDN-cached for
// five minutes: a post published a minute ago is already listed.
export const dynamic = 'force-dynamic';

export async function GET() {
    const [pages, articles] = await Promise.all([loadAllPages(), getArticleIndex({ fresh: true })]);
    const documents = pages.map((loaded) => ({ url: `${SITE_URL}${markdownUrlFor(loaded.page.route)}`, body: loaded.body }));
    return plainTextResponse(buildLlmsFullTxt({ origin: SITE_URL, documents, articles }), 300);
}
