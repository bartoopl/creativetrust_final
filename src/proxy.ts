import { NextResponse, type NextRequest } from 'next/server';
import { canonicalRedirectUrl } from '@/lib/canonical-redirects';
import { RETIRED_PATHS } from '@/lib/retired-links';
import { handlerPathFor, markdownTargetFor, markdownUrlFor, prefersMarkdown, routeFromMarkdownUrl } from '@/lib/markdown/pages';

/**
 * Dual-track serving: humans and Google get HTML, AI agents get Markdown.
 * - `/uslugi/strony-www.md` → Markdown twin
 * - `Accept: text/markdown` on `/uslugi/strony-www` → Markdown twin
 * - HTML pages with a twin advertise it in a `Link: rel="alternate"` header
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Host, trailing slash and legacy alias in one 301 (GSC 2026-11-14: the
    // three separate fixes used to chain). Runs before the Markdown rewrites so a
    // redirect never lands on a rewritten handler.
    const canonical = canonicalRedirectUrl({
        pathname,
        search: request.nextUrl.search,
        host: request.headers.get('host'),
        forwardedProto: request.headers.get('x-forwarded-proto'),
        protocol: request.nextUrl.protocol,
        aliases: RETIRED_PATHS,
    });
    if (canonical) return NextResponse.redirect(canonical, 301);

    const mdRoute = routeFromMarkdownUrl(pathname);
    if (mdRoute) {
        const target = markdownTargetFor(mdRoute);
        if (!target) return NextResponse.next();
        const url = request.nextUrl.clone();
        url.pathname = handlerPathFor(target);
        return NextResponse.rewrite(url);
    }

    const target = markdownTargetFor(pathname);
    if (!target) return NextResponse.next();

    if (prefersMarkdown(request.headers.get('accept'))) {
        const url = request.nextUrl.clone();
        url.pathname = handlerPathFor(target);
        const response = NextResponse.rewrite(url);
        response.headers.set('Vary', 'Accept');
        return response;
    }

    const response = NextResponse.next();
    response.headers.set('Link', `<${markdownUrlFor(target.route)}>; rel="alternate"; type="text/markdown"`);
    response.headers.set('Vary', 'Accept');
    return response;
}

export const config = {
    // Pages and `.md` URLs only: no Next internals, API, admin/studio, the
    // handler itself or static assets.
    matcher: [
        '/((?!_next/|api/|admin|studio|md/|llms|favicon\\.ico|robots\\.txt|sitemap|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|mp4|webm|glb|gltf|bin|hdr|txt|xml|json|js|css|map|webmanifest|woff2?|ttf|otf|pdf)$).*)',
    ],
};
