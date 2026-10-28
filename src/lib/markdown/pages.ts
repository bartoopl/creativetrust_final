/**
 * Registry of pages that have a Markdown twin for AI agents, plus the URL
 * mapping shared by the proxy and the route handlers. Plain data, no imports,
 * so `node --test` and the proxy can load it without touching the filesystem.
 */

export type MarkdownSection = 'company' | 'services' | 'pricing' | 'landings';

export interface MarkdownPage {
    /** HTML route the Markdown file mirrors. */
    route: string;
    section: MarkdownSection;
    /** Kept out of the main llms.txt list (e.g. noindex campaign landings). */
    optional?: boolean;
}

/** Order here is the order in llms.txt and llms-full.txt. */
export const markdownPages: MarkdownPage[] = [
    { route: '/', section: 'company' },
    { route: '/uslugi', section: 'company' },
    { route: '/o-nas', section: 'company' },
    { route: '/kontakt', section: 'company' },
    { route: '/uslugi/strony-www', section: 'services' },
    { route: '/uslugi/e-commerce', section: 'services' },
    { route: '/uslugi/marketing-automation', section: 'services' },
    { route: '/uslugi/social-media', section: 'services' },
    { route: '/uslugi/tworzenie-stron-www-cennik', section: 'pricing' },
    { route: '/uslugi/strona-firmowa-cena', section: 'pricing' },
    { route: '/uslugi/migracja-woocommerce-do-headless', section: 'landings' },
    { route: '/uslugi/headless-woocommerce', section: 'landings' },
    { route: '/uslugi/wdrozenie-salesmanago', section: 'landings' },
    { route: '/uslugi/landing-page-google-ads', section: 'landings', optional: true },
    { route: '/uslugi/landing-page-pod-reklamy', section: 'landings', optional: true },
];

const staticRoutes = new Set(markdownPages.map((page) => page.route));

/** Sanity slugs are lowercase kebab-case; anything else is not an article. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ArticleKind = 'blog' | 'knowledge-base' | 'portfolio';

export const articleBase: Record<ArticleKind, string> = {
    blog: '/blog',
    'knowledge-base': '/baza-wiedzy',
    portfolio: '/portfolio',
};

/** `/uslugi/` → `/uslugi`, keeps `/`. */
export function normalizeRoute(pathname: string): string {
    const trimmed = pathname.replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
}

/** content/ai file (relative) for a static route: `/` → `index.md`. */
export function contentFileFor(route: string): string {
    return route === '/' ? 'index.md' : `${route.slice(1)}.md`;
}

/** Public `.md` URL path for an HTML route: `/` → `/index.md`. */
export function markdownUrlFor(route: string): string {
    return route === '/' ? '/index.md' : `${route}.md`;
}

export type MarkdownTarget =
    | { kind: 'page'; route: string }
    | { kind: ArticleKind; route: string; slug: string };

/** Which Markdown document (if any) mirrors this HTML route. */
export function markdownTargetFor(pathname: string): MarkdownTarget | null {
    const route = normalizeRoute(pathname);
    if (staticRoutes.has(route)) return { kind: 'page', route };
    for (const kind of Object.keys(articleBase) as ArticleKind[]) {
        const prefix = `${articleBase[kind]}/`;
        if (route.startsWith(prefix)) {
            const slug = route.slice(prefix.length);
            return SLUG.test(slug) ? { kind, route, slug } : null;
        }
    }
    return null;
}

/** `/uslugi/strony-www.md` → `/uslugi/strony-www`, `/index.md` → `/`. */
export function routeFromMarkdownUrl(pathname: string): string | null {
    if (!pathname.endsWith('.md')) return null;
    const stem = pathname.slice(0, -3);
    return stem === '/index' ? '/' : normalizeRoute(stem);
}

/** Internal path of the route handler that renders a target. */
export function handlerPathFor(target: MarkdownTarget): string {
    return target.route === '/' ? '/md/index' : `/md${target.route}`;
}

/** Inverse of handlerPathFor for the catch-all segments. */
export function routeFromHandlerSegments(segments: string[]): string {
    return segments.length === 1 && segments[0] === 'index' ? '/' : `/${segments.join('/')}`;
}

/**
 * True when the client asks for Markdown at least as strongly as for HTML.
 * Browsers never list text/markdown, so they always get HTML.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
    if (!accept) return false;
    let markdown = 0;
    let html = 0;
    for (const part of accept.split(',')) {
        const [type, ...params] = part.trim().toLowerCase().split(';');
        const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
        const q = qParam ? Number(qParam.slice(2)) : 1;
        const weight = Number.isFinite(q) ? q : 0;
        if (type.trim() === 'text/markdown') markdown = Math.max(markdown, weight);
        if (type.trim() === 'text/html') html = Math.max(html, weight);
    }
    return markdown > 0 && markdown >= html;
}
