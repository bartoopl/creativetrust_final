import { SITE_URL } from '@/lib/schema';
import { markdownPages, markdownTargetFor, routeFromHandlerSegments } from '@/lib/markdown/pages';
import { getArticleMarkdown, getAuthorMarkdown, getPortfolioIndexMarkdown, getPortfolioMarkdown, loadPage, markdownResponse } from '@/lib/markdown/server';

// Reached through the proxy: `/uslugi/strony-www.md` and `Accept: text/markdown`
// on `/uslugi/strony-www` are both rewritten to `/md/uslugi/strony-www`.
// Rendered per request and cached by the CDN (s-maxage): prerendering would
// make next-sitemap list the internal /md/* paths in the public sitemap.
export const dynamic = 'force-dynamic';

const notFound = (canonical: string) =>
    markdownResponse('# Nie znaleziono\n\nTa strona nie ma wersji Markdown. Spis dostępnych dokumentów: /llms.txt\n', { canonical, status: 404 });

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    const route = routeFromHandlerSegments(path);
    const target = markdownTargetFor(route);
    const canonical = `${SITE_URL}${route}`;
    if (!target) return notFound(canonical);

    if (target.kind === 'page') {
        const page = markdownPages.find((p) => p.route === target.route)!;
        const loaded = await loadPage(page);
        return markdownResponse(loaded.raw, { canonical });
    }

    if (target.kind === 'portfolio-index') return markdownResponse(await getPortfolioIndexMarkdown(), { canonical });

    const markdown =
        target.kind === 'portfolio'
            ? await getPortfolioMarkdown(target.slug)
            : target.kind === 'author'
              ? await getAuthorMarkdown(target.slug)
              : await getArticleMarkdown(target.kind, target.slug);
    return markdown ? markdownResponse(markdown, { canonical }) : notFound(canonical);
}
