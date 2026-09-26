/**
 * WebMCP tools (https://github.com/webmachinelearning/webmcp): structured,
 * read-only actions an in-browser AI agent can call instead of scraping the
 * page. Pure — data and network access are injected — so `node --test` can
 * exercise the tools without a browser.
 *
 * Contact is deliberately not an imperative tool: the contact form is exposed
 * declaratively (see ContactForm), so the agent only fills it in and the
 * visitor reviews and submits it themselves.
 */

export interface ToolResult {
    content: { type: 'text'; text: string }[];
    isError?: boolean;
}

export interface WebMcpTool {
    name: string;
    title: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations?: { readOnlyHint?: boolean };
    execute: (input: Record<string, unknown>) => Promise<ToolResult>;
}

export interface ToolData {
    origin: string;
    services: { slug: string; href: string; title: string; description: string }[];
    landings: { href: string; title: string; description: string; service: string }[];
    prices: { service: string; name: string; price: string; source: string }[];
    /** Searches blog posts and knowledge-base entries. */
    searchArticles: (query: string, limit: number) => Promise<ArticleHit[]>;
}

export interface ArticleHit {
    title: string;
    url: string;
    type: 'blog' | 'knowledge-base';
    summary?: string;
    publishedAt?: string;
}

const ok = (value: unknown): ToolResult => ({ content: [{ type: 'text', text: JSON.stringify(value) }] });
const fail = (message: string): ToolResult => ({ content: [{ type: 'text', text: message }], isError: true });

export function buildTools({ origin, services, landings, prices, searchArticles }: ToolData): WebMcpTool[] {
    const slugs = services.map((s) => s.slug);
    const absolute = (path: string) => new URL(path, origin).toString();

    return [
        {
            name: 'list_services',
            title: 'Usługi CreativeTrust',
            description:
                'Lists the services CreativeTrust (a Polish digital agency) offers: websites, e-commerce, marketing automation and social media, each with its dedicated landing pages. Use it to find which offer fits a request and which page to open.',
            inputSchema: {
                type: 'object',
                properties: {
                    service: { type: 'string', enum: slugs, description: 'Optional: limit to one service.' },
                },
                additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            async execute(input) {
                const wanted = input?.service;
                if (wanted !== undefined && !slugs.includes(String(wanted))) return fail(`Unknown service "${wanted}". Use one of: ${slugs.join(', ')}.`);
                return ok(
                    services
                        .filter((s) => wanted === undefined || s.slug === wanted)
                        .map((s) => ({
                            service: s.slug,
                            title: s.title,
                            description: s.description,
                            url: absolute(s.href),
                            pages: landings
                                .filter((l) => l.service === s.slug)
                                .map((l) => ({ title: l.title, description: l.description, url: absolute(l.href) })),
                        })),
                );
            },
        },
        {
            name: 'get_pricing',
            title: 'Orientacyjne ceny',
            description:
                'Returns the prices CreativeTrust publishes on its site (PLN, net). Most projects are quoted individually; when no price is published the result says so and links the page where a quote can be requested. Never invent prices beyond what this returns.',
            inputSchema: {
                type: 'object',
                properties: {
                    service: { type: 'string', enum: slugs, description: 'Service to price.' },
                },
                required: ['service'],
                additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            async execute(input) {
                const service = services.find((s) => s.slug === input?.service);
                if (!service) return fail(`Unknown service "${input?.service}". Use one of: ${slugs.join(', ')}.`);
                const published = prices.filter((p) => p.service === service.slug);
                return ok({
                    service: service.slug,
                    currency: 'PLN',
                    net: true,
                    prices: published.map((p) => ({ name: p.name, price: p.price, source: absolute(p.source) })),
                    note: published.length
                        ? 'Starting prices; the final quote depends on scope.'
                        : 'No published price — this service is quoted individually after a short consultation.',
                    quote: absolute('/kontakt'),
                });
            },
        },
        {
            name: 'search_articles',
            title: 'Szukaj w blogu i bazie wiedzy',
            description:
                'Searches CreativeTrust blog posts and knowledge-base entries (Polish) about websites, headless e-commerce, SEO, marketing automation and AI. Returns titles, short summaries and URLs.',
            inputSchema: {
                type: 'object',
                properties: {
                    query: { type: 'string', minLength: 2, maxLength: 100, description: 'Search phrase, preferably in Polish.' },
                    limit: { type: 'integer', minimum: 1, maximum: 10, default: 5 },
                },
                required: ['query'],
                additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            async execute(input) {
                const query = typeof input?.query === 'string' ? input.query.trim() : '';
                if (query.length < 2 || query.length > 100) return fail('query must be 2–100 characters.');
                const rawLimit = Number(input?.limit ?? 5);
                const limit = Number.isFinite(rawLimit) ? Math.min(10, Math.max(1, Math.round(rawLimit))) : 5;
                try {
                    return ok(await searchArticles(query, limit));
                } catch {
                    return fail('Search is temporarily unavailable.');
                }
            },
        },
    ];
}
