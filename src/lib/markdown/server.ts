import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { client, getBlogPost, getKnowledgeBaseEntry, urlFor } from '@/lib/sanity';
import { SITE_URL } from '@/lib/schema';
import { articleFrontmatter, articleLead, type ArticleDocument } from './article';
import { frontmatterString, parseFrontmatter, serializeFrontmatter } from './frontmatter';
import type { LlmsArticle, LlmsPage } from './llms';
import { articleBase, contentFileFor, markdownPages, markdownUrlFor, type ArticleKind, type MarkdownPage } from './pages';
import { portableTextToMarkdown, type PortableTextBlock } from './portable-text';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'ai');
const SANITY_TIMEOUT_MS = 4000;

export interface LoadedPage {
    page: MarkdownPage;
    raw: string;
    body: string;
    title: string;
    description: string;
}

export async function loadPage(page: MarkdownPage): Promise<LoadedPage> {
    const raw = await readFile(path.join(CONTENT_DIR, contentFileFor(page.route)), 'utf8');
    const { data, body } = parseFrontmatter(raw);
    return {
        page,
        raw,
        body,
        title: frontmatterString(data, 'title') ?? page.route,
        description: frontmatterString(data, 'description') ?? '',
    };
}

export function loadAllPages(): Promise<LoadedPage[]> {
    return Promise.all(markdownPages.map(loadPage));
}

export function toLlmsPage(loaded: LoadedPage): LlmsPage {
    return {
        title: loaded.title,
        description: loaded.description,
        url: `${SITE_URL}${markdownUrlFor(loaded.page.route)}`,
        section: loaded.page.section,
        optional: loaded.page.optional,
    };
}

/** Resolves to the fallback when Sanity is slow, unreachable or unconfigured. */
async function failSoft<T>(work: () => Promise<T>, fallback: T): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
        return await Promise.race([
            work(),
            new Promise<T>((resolve) => {
                timer = setTimeout(() => resolve(fallback), SANITY_TIMEOUT_MS);
            }),
        ]);
    } catch {
        return fallback;
    } finally {
        clearTimeout(timer);
    }
}

interface ArticleListItem {
    _type: 'blogPost' | 'knowledgeBase';
    title?: string;
    slug?: string;
    summary?: string | null;
}

/** Latest published blog posts and knowledge-base entries; [] when Sanity fails. */
export async function getLatestArticles(blogLimit = 20, knowledgeLimit = 30): Promise<LlmsArticle[]> {
    const docs = await failSoft<ArticleListItem[]>(
        () =>
            client.fetch(
                `{
                    "blog": *[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...$blogLimit] {
                        _type, title, "slug": slug.current, "summary": excerpt
                    },
                    "kb": *[_type == "knowledgeBase" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...$knowledgeLimit] {
                        _type, title, "slug": slug.current, "summary": shortDescription
                    }
                }`,
                { blogLimit, knowledgeLimit },
            ).then((result: { blog?: ArticleListItem[]; kb?: ArticleListItem[] }) => [...(result?.blog ?? []), ...(result?.kb ?? [])]),
        [],
    );
    return docs
        .filter((doc) => doc.title && doc.slug)
        .map((doc) => {
            const kind: ArticleKind = doc._type === 'blogPost' ? 'blog' : 'knowledge-base';
            return { kind, title: doc.title!, summary: doc.summary, url: `${SITE_URL}${articleBase[kind]}/${doc.slug}.md` };
        });
}

type SanityArticle = ArticleDocument & { content?: PortableTextBlock[] };

/** Markdown twin of a blog post or knowledge-base entry; null when it does not exist. */
export async function getArticleMarkdown(kind: ArticleKind, slug: string): Promise<string | null> {
    const fetcher = kind === 'blog' ? getBlogPost : getKnowledgeBaseEntry;
    const doc = await failSoft<SanityArticle | null>(() => fetcher(slug), null);
    if (!doc?.title) return null;

    const canonical = `${SITE_URL}${articleBase[kind]}/${slug}`;
    const lead = articleLead(doc);
    const body = portableTextToMarkdown(doc.content, {
        imageUrl: (image) => {
            try {
                return image.asset ? urlFor(image).width(1200).auto('format').url() : null;
            } catch {
                return null;
            }
        },
    });

    return [
        serializeFrontmatter(articleFrontmatter(doc, kind, canonical)),
        `# ${doc.title.replace(/\s+/g, ' ').trim()}`,
        lead ? `\n${lead}` : '',
        body ? `\n${body}` : '',
        `\n---\n\nWersja HTML: ${canonical}\n`,
    ].join('\n');
}

export interface MarkdownResponseOptions {
    canonical: string;
    status?: number;
}

export function markdownResponse(body: string, { canonical, status = 200 }: MarkdownResponseOptions): Response {
    return new Response(body, {
        status,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': status === 200 ? 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' : 'no-store',
            // The HTML page is the one Google should index.
            'X-Robots-Tag': 'noindex',
            Link: `<${canonical}>; rel="canonical"`,
            Vary: 'Accept',
        },
    });
}

export function plainTextResponse(body: string): Response {
    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
