import { SITE_URL } from '@/lib/schema';
import { buildLlmsFullTxt } from '@/lib/markdown/llms';
import { markdownUrlFor } from '@/lib/markdown/pages';
import { getLatestArticles, loadAllPages, plainTextResponse } from '@/lib/markdown/server';

export const revalidate = 3600;

export async function GET() {
    const [pages, articles] = await Promise.all([loadAllPages(), getLatestArticles()]);
    const documents = pages.map((loaded) => ({ url: `${SITE_URL}${markdownUrlFor(loaded.page.route)}`, body: loaded.body }));
    return plainTextResponse(buildLlmsFullTxt({ origin: SITE_URL, documents, articles }));
}
