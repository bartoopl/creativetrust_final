import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { client, getBlogPost, getKnowledgeBaseEntry, getPortfolioProject, urlFor } from '@/lib/sanity';
import { SITE_URL } from '@/lib/schema';
import { resolveAuthor, type SanityAuthor } from '@/lib/authors';
import { articleFrontmatter, articleLead, type ArticleDocument } from './article';
import { frontmatterString, parseFrontmatter, serializeFrontmatter } from './frontmatter';
import type { LlmsArticle, LlmsPage } from './llms';
import { articleBase, contentFileFor, markdownPages, markdownUrlFor, retiredBlogPosts, type ArticleKind, type MarkdownPage } from './pages';
import { portableTextToMarkdown, portableTextToPlainText, type PortableTextBlock } from './portable-text';
import { portfolioFrontmatter, portfolioMarkdown, projectSummary, type PortfolioProjectDocument } from './portfolio';

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
    _type: 'blogPost' | 'knowledgeBase' | 'portfolioProject';
    title?: string;
    slug?: string;
    summary?: string | null;
}

type PortfolioListItem = PortfolioProjectDocument & { slug?: string; description?: PortableTextBlock[] | string | null };

const ARTICLE_KIND: Record<ArticleListItem['_type'], ArticleKind> = {
    blogPost: 'blog',
    knowledgeBase: 'knowledge-base',
    portfolioProject: 'portfolio',
};

/**
 * Every published case study, blog post and knowledge-base entry for llms.txt
 * (a partial list hides most of the evidence from AI agents); [] when Sanity fails.
 */
export async function getArticleIndex(): Promise<LlmsArticle[]> {
    const docs = await failSoft<ArticleListItem[]>(
        () =>
            client.fetch(
                `{
                    "portfolio": *[_type == "portfolioProject" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
                        title, client, scopeOfWork, "slug": slug.current, "categories": categories[]->{ title },
                        "description": coalesce(pt::text(description), description)
                    },
                    "blog": *[_type == "blogPost" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
                        _type, title, "slug": slug.current, "summary": excerpt
                    },
                    "kb": *[_type == "knowledgeBase" && defined(slug.current) && !(_id in path("drafts.**"))] | order(title asc) {
                        _type, title, "slug": slug.current, "summary": shortDescription
                    }
                }`,
            ).then((result: { portfolio?: PortfolioListItem[]; blog?: ArticleListItem[]; kb?: ArticleListItem[] }) => [
                ...(result?.portfolio ?? []).map(
                    (project): ArticleListItem => ({
                        _type: 'portfolioProject',
                        title: project.title ?? undefined,
                        slug: project.slug,
                        summary: projectSummary(project, portableTextToPlainText(project.description, 200)),
                    }),
                ),
                ...(result?.blog ?? []),
                ...(result?.kb ?? []),
            ]),
        [],
    );
    return docs
        .filter((doc) => doc.title && doc.slug && !(doc._type === 'blogPost' && doc.slug in retiredBlogPosts))
        .map((doc) => {
            const kind = ARTICLE_KIND[doc._type];
            return { kind, title: doc.title!, summary: doc.summary, url: `${SITE_URL}${articleBase[kind]}/${doc.slug}.md` };
        });
}

/** Markdown twin of a portfolio case study; null when it does not exist. */
export async function getPortfolioMarkdown(slug: string): Promise<string | null> {
    const doc = await failSoft<(PortfolioProjectDocument & { description?: PortableTextBlock[] | string | null; mainImage?: PortableTextBlock | null }) | null>(
        () => getPortfolioProject(slug),
        null,
    );
    if (!doc?.title) return null;

    const canonical = `${SITE_URL}${articleBase.portfolio}/${slug}`;
    const imageUrl = (image: PortableTextBlock) => {
        try {
            return image.asset ? urlFor(image).width(1200).auto('format').url() : null;
        } catch {
            return null;
        }
    };
    const summary = projectSummary(doc, portableTextToPlainText(doc.description, 300));
    const descriptionMarkdown =
        typeof doc.description === 'string' ? doc.description : portableTextToMarkdown(doc.description, { imageUrl });

    return portfolioMarkdown({
        doc,
        canonical,
        frontmatter: serializeFrontmatter(portfolioFrontmatter(doc, canonical, summary)),
        descriptionMarkdown,
        mainImageUrl: doc.mainImage ? imageUrl(doc.mainImage) : null,
    });
}

type SanityArticle = ArticleDocument & { content?: PortableTextBlock[] };

/** Markdown twin of a blog post or knowledge-base entry; null when it does not exist. */
export async function getArticleMarkdown(kind: Exclude<ArticleKind, 'portfolio'>, slug: string): Promise<string | null> {
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
        serializeFrontmatter(
            articleFrontmatter({ ...doc, author: { name: resolveAuthor(doc.author as SanityAuthor)?.name ?? doc.author?.name } }, kind, canonical),
        ),
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
