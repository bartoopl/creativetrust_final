import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { connection } from 'next/server';
import config from '@payload-config';
import { getPayload, type Where } from 'payload';
import { applyBlogPostFixes } from './blog-seo';
import { applyKnowledgeBaseSeo } from './knowledge-base-seo';
import { lexicalToPortableText, type LexicalState, type MediaDoc } from './richtext/lexical';
import type { PortableTextBlock } from './markdown/portable-text';
import { imageVariantUrl, type ImageSource } from './media';
import { CMS_CACHE_TAG } from '../payload/revalidate';

/**
 * Content from Payload (Postgres), returned in the shapes the pages were
 * written against when the content lived in Sanity: `slug: { current }`,
 * `_id`, `_updatedAt`, images as `{ asset, alt, caption }` and rich text as
 * Portable Text blocks. Keeping the shapes kept every page, schema.org
 * builder and Markdown twin unchanged by the migration.
 */

export { urlFor } from './media';


/**
 * Pages render on request, never at build: the image is built in CI without
 * access to the database. `connection()` marks every page that reads the CMS
 * as dynamic; query results are cached across requests (an hour, or until an
 * editor saves) and deduplicated within one render.
 */
function cached<A extends unknown[], R>(key: string, read: (...args: A) => Promise<R>): (...args: A) => Promise<R> {
    const shared = unstable_cache(read, ['cms', key], { tags: [CMS_CACHE_TAG], revalidate: 3600 });
    return cache(async (...args: A) => {
        await connection();
        return shared(...args);
    });
}

type Doc = Record<string, any>;

const PUBLISHED: Where = { _status: { equals: 'published' } };

/** Newest first; ties keep the order they had in Sanity (by document id). */
const NEWEST_FIRST = ['-publishedAt', 'sanityId'];

const payload = () => getPayload({ config });

// ------------------------------------------------------------------ shaping

const ARTICLE_BASE: Record<string, string> = {
    posts: '/blog',
    'knowledge-base': '/baza-wiedzy',
    'portfolio-projects': '/portfolio',
};

const richText = (value: unknown): PortableTextBlock[] =>
    lexicalToPortableText(value as LexicalState, {
        internalHref: (relationTo, doc) => (ARTICLE_BASE[relationTo] && doc.slug ? `${ARTICLE_BASE[relationTo]}/${doc.slug}` : null),
    });

const slug = (doc: Doc) => ({ current: String(doc.slug ?? '') });
const optionalSlug = (doc: Doc | null | undefined) => (doc?.slug ? { current: String(doc.slug) } : undefined);

/** Media document → the `{ asset, alt, caption }` object the pages read. */
export function toImage(media: unknown, key?: string): (ImageSource & { _type: 'image'; _key?: string }) | null {
    if (!media || typeof media !== 'object' || !(media as MediaDoc).url) return null;
    const doc = media as MediaDoc;
    return {
        _type: 'image',
        ...(key ? { _key: key } : {}),
        asset: doc,
        ...(doc.alt ? { alt: doc.alt } : {}),
        ...(doc.caption ? { caption: doc.caption } : {}),
    };
}

const category = (doc: Doc) => ({ _id: String(doc.id), title: doc.title, slug: slug(doc), ...(doc.color ? { color: doc.color } : {}) });

const relations = (value: unknown): Doc[] => (Array.isArray(value) ? value.filter((item): item is Doc => Boolean(item) && typeof item === 'object') : []);

function technology(doc: Doc) {
    return {
        _id: String(doc.id),
        title: doc.title,
        slug: slug(doc),
        group: doc.group ?? null,
        website: doc.website ?? null,
        logo: toImage(doc.logo),
    };
}

function projectCard(doc: Doc) {
    return {
        _id: String(doc.id),
        title: doc.title,
        slug: slug(doc),
        client: doc.client,
        mainImage: toImage(doc.mainImage),
        scopeOfWork: doc.scopeOfWork ?? [],
        categories: relations(doc.categories).map(category),
        technologies: relations(doc.technologies).map(technology),
        description: richText(doc.description),
        publishedAt: doc.publishedAt ?? null,
    };
}

function authorOf(doc: Doc | null | undefined) {
    if (!doc || typeof doc !== 'object') return null;
    return {
        name: doc.name,
        slug: slug(doc),
        image: toImage(doc.image),
        bio: richText(doc.bio),
        role: doc.role ?? null,
        socialLinks: doc.socialLinks ?? null,
    };
}

function postCard(doc: Doc) {
    const author = doc.author && typeof doc.author === 'object' ? (doc.author as Doc) : null;
    return {
        _id: String(doc.id),
        title: doc.title,
        slug: slug(doc),
        excerpt: doc.excerpt ?? null,
        mainImage: toImage(doc.mainImage),
        publishedAt: doc.publishedAt,
        _updatedAt: doc.updatedAt,
        estimatedReadingTime: doc.estimatedReadingTime ?? null,
        featured: Boolean(doc.featured),
        audioFile: doc.audioFile?.url ? { url: doc.audioFile.url } : null,
        authorName: author?.name ?? null,
        authorImage: toImage(author?.image),
        authorSlug: optionalSlug(author),
        categories: relations(doc.categories).map(category),
    };
}

// ------------------------------------------------------------------ portfolio

export const getPortfolioProjects = cached('getPortfolioProjects', async () => {
    const { docs } = await (await payload()).find({
        collection: 'portfolio-projects',
        where: PUBLISHED,
        sort: NEWEST_FIRST,
        depth: 1,
        limit: 0,
    });
    return docs.map(projectCard);
});

export const getPortfolioProject = cached('getPortfolioProject', async (projectSlug: string) => {
    const { docs } = await (await payload()).find({
        collection: 'portfolio-projects',
        where: { and: [PUBLISHED, { slug: { equals: projectSlug } }] },
        depth: 2,
        limit: 1,
    });
    const doc = docs[0];
    if (!doc) return null;
    return {
        ...projectCard(doc),
        galleryImages: relations(doc.galleryImages)
            .map((media, index) => toImage(media, `g${index}`))
            .filter((image): image is NonNullable<typeof image> => image !== null),
        projectUrl: doc.projectUrl ?? undefined,
        _updatedAt: doc.updatedAt,
    };
});

async function readGetPortfolioSlugs(): Promise<string[]> {
    const { docs } = await (await payload()).find({
        collection: 'portfolio-projects',
        where: PUBLISHED,
        depth: 0,
        limit: 0,
        select: { slug: true },
    });
    return docs.map((doc) => String(doc.slug)).filter(Boolean);
}

async function readGetLatestPortfolioProjects(limit = 2) {
    const { docs } = await (await payload()).find({
        collection: 'portfolio-projects',
        where: PUBLISHED,
        sort: NEWEST_FIRST,
        depth: 1,
        limit,
    });
    return docs.map(projectCard);
}

export const getServiceCategories = cached('getServiceCategories', async () => {
    const { docs } = await (await payload()).find({ collection: 'service-categories', sort: 'title', depth: 0, limit: 0 });
    return docs.map((doc) => ({ ...category(doc), description: doc.description ?? null }));
});

/** Technologies that at least one published project uses, for the portfolio filter. */
export const getTechnologies = cached('getTechnologies', async () => {
    const { docs } = await (await payload()).find({ collection: 'technologies', sort: 'title', depth: 1, limit: 0 });
    return docs.map(technology);
});

// ------------------------------------------------------------------ knowledge base

async function readGetKnowledgeBase() {
    const { docs } = await (await payload()).find({
        collection: 'knowledge-base',
        where: PUBLISHED,
        sort: ['letter', 'title'],
        depth: 0,
        limit: 0,
    });
    return docs.map((doc) => ({
        _id: String(doc.id),
        title: doc.title,
        slug: slug(doc),
        letter: doc.letter,
        shortDescription: doc.shortDescription,
        publishedAt: doc.publishedAt,
        tags: doc.tags ?? [],
    }));
}

export const getKnowledgeBaseEntry = cached('getKnowledgeBaseEntry', async (entrySlug: string) => {
    const { docs } = await (await payload()).find({
        collection: 'knowledge-base',
        where: { and: [PUBLISHED, { slug: { equals: entrySlug } }] },
        depth: 2,
        limit: 1,
    });
    const doc = docs[0];
    if (!doc) return null;
    return applyKnowledgeBaseSeo(entrySlug, {
        _id: String(doc.id),
        title: doc.title,
        slug: slug(doc),
        letter: doc.letter,
        shortDescription: doc.shortDescription,
        content: richText(doc.content),
        publishedAt: doc.publishedAt,
        _updatedAt: doc.updatedAt,
        tags: doc.tags ?? [],
        seoTitle: doc.seoTitle ?? null,
        seoDescription: doc.seoDescription ?? null,
    });
});

export async function getKnowledgeBaseLetters(): Promise<string[]> {
    const entries = await getKnowledgeBase();
    return [...new Set(entries.map((entry) => entry.letter as string))].sort();
}

// ------------------------------------------------------------------ blog

async function readBlogPosts() {
    const { docs } = await (await payload()).find({ collection: 'posts', where: PUBLISHED, sort: NEWEST_FIRST, depth: 2, limit: 0 });
    return docs.map(postCard);
}

export const getBlogPosts = cached('getBlogPosts', readBlogPosts);

export async function getFeaturedBlogPosts() {
    return (await getBlogPosts()).filter((post) => post.featured).slice(0, 3);
}

export const getBlogPost = cached('getBlogPost', async (postSlug: string) => {
    const client = await payload();
    const { docs } = await client.find({
        collection: 'posts',
        where: { and: [PUBLISHED, { slug: { equals: postSlug } }] },
        depth: 2,
        limit: 1,
    });
    const doc = docs[0];
    if (!doc) return null;

    const categoryIds = relations(doc.categories).map((item) => item.id);
    const related = categoryIds.length
        ? (
              await client.find({
                  collection: 'posts',
                  where: { and: [PUBLISHED, { slug: { not_equals: postSlug } }, { categories: { in: categoryIds } }] },
                  sort: NEWEST_FIRST,
                  depth: 1,
                  limit: 3,
              })
          ).docs
        : [];

    const card = postCard(doc);
    const post = {
        _id: card._id,
        title: card.title,
        slug: card.slug,
        excerpt: card.excerpt,
        mainImage: card.mainImage,
        content: richText(doc.content),
        publishedAt: card.publishedAt,
        _updatedAt: card._updatedAt,
        estimatedReadingTime: card.estimatedReadingTime,
        featured: card.featured,
        audioFile: card.audioFile,
        author: authorOf(doc.author as Doc),
        categories: card.categories,
        relatedPosts: related.map((post) => ({
            _id: String(post.id),
            title: post.title,
            slug: slug(post),
            mainImage: toImage(post.mainImage),
            publishedAt: post.publishedAt,
        })),
        seoTitle: doc.seoTitle ?? null,
        seoDescription: doc.seoDescription ?? null,
    };
    // blog-seo.ts types Portable Text loosely; the shape is the same.
    return applyBlogPostFixes(postSlug, post as Parameters<typeof applyBlogPostFixes>[1] & typeof post);
});

export async function getBlogPostsByCategory(categorySlug: string) {
    return (await getBlogPosts()).filter((post) => post.categories.some((item) => item.slug?.current === categorySlug));
}

export const getBlogCategories = cached('getBlogCategories', async () => {
    const [{ docs }, posts] = await Promise.all([
        (await payload()).find({ collection: 'blog-categories', sort: 'title', depth: 0, limit: 0 }),
        readBlogPosts(),
    ]);
    return docs.map((doc) => ({
        ...category(doc),
        description: doc.description ?? null,
        count: posts.filter((post) => post.categories.some((item) => item._id === String(doc.id))).length,
    }));
});

export const getBlogAuthor = cached('getBlogAuthor', async (authorSlug: string) => {
    const { docs } = await (await payload()).find({ collection: 'authors', where: { slug: { equals: authorSlug } }, depth: 1, limit: 1 });
    const doc = docs[0];
    if (!doc) return null;
    const posts = (await readBlogPosts()).filter((post) => post.authorSlug?.current === authorSlug);
    return {
        _id: String(doc.id),
        ...authorOf(doc)!,
        posts: posts.map((post) => ({
            _id: post._id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            mainImage: post.mainImage,
            publishedAt: post.publishedAt,
            estimatedReadingTime: post.estimatedReadingTime,
        })),
    };
});

// ------------------------------------------------------------------ indexes (llms.txt, agent search, sitemap)

export interface ArticleIndexDoc {
    _type: 'blogPost' | 'knowledgeBase' | 'portfolioProject';
    title: string;
    slug: string;
    summary?: string | null;
    publishedAt?: string | null;
    updatedAt?: string | null;
    description?: PortableTextBlock[];
    client?: string;
    scopeOfWork?: string[];
    categories?: { title: string }[];
    technologies?: { title: string }[];
}

/** Every published case study, blog post and knowledge-base entry. */
async function readGetArticleIndexDocs(): Promise<{ portfolio: ArticleIndexDoc[]; blog: ArticleIndexDoc[]; kb: ArticleIndexDoc[] }> {
    const client = await payload();
    const [portfolio, blog, kb] = await Promise.all([
        client.find({ collection: 'portfolio-projects', where: PUBLISHED, sort: NEWEST_FIRST, depth: 1, limit: 0 }),
        client.find({ collection: 'posts', where: PUBLISHED, sort: NEWEST_FIRST, depth: 0, limit: 0 }),
        client.find({ collection: 'knowledge-base', where: PUBLISHED, sort: 'title', depth: 0, limit: 0 }),
    ]);
    return {
        portfolio: portfolio.docs.map((doc) => ({
            _type: 'portfolioProject',
            title: doc.title,
            slug: doc.slug,
            client: doc.client,
            scopeOfWork: doc.scopeOfWork ?? [],
            categories: relations(doc.categories).map((item) => ({ title: item.title })),
            technologies: relations(doc.technologies).map((item) => ({ title: item.title })),
            description: richText(doc.description),
            updatedAt: doc.updatedAt,
        })),
        blog: blog.docs.map((doc) => ({
            _type: 'blogPost',
            title: doc.title,
            slug: doc.slug,
            summary: doc.excerpt ?? null,
            publishedAt: doc.publishedAt,
            updatedAt: doc.updatedAt,
        })),
        kb: kb.docs.map((doc) => ({
            _type: 'knowledgeBase',
            title: doc.title,
            slug: doc.slug,
            summary: doc.shortDescription ?? null,
            publishedAt: doc.publishedAt,
            updatedAt: doc.updatedAt,
        })),
    };
}

/** Blog posts and knowledge-base entries whose title or summary contains every term. */
async function readSearchArticles(terms: string[], limit: number): Promise<ArticleIndexDoc[]> {
    const client = await payload();
    const matching = (fields: string[]): Where => ({
        and: terms.map((term) => ({ or: fields.map((field) => ({ [field]: { like: term } })) })),
    });
    const [posts, entries] = await Promise.all([
        client.find({ collection: 'posts', where: { and: [PUBLISHED, matching(['title', 'excerpt'])] }, sort: NEWEST_FIRST, depth: 0, limit }),
        client.find({ collection: 'knowledge-base', where: { and: [PUBLISHED, matching(['title', 'shortDescription'])] }, sort: NEWEST_FIRST, depth: 0, limit }),
    ]);
    return [
        ...posts.docs.map((doc): ArticleIndexDoc => ({ _type: 'blogPost', title: doc.title, slug: doc.slug, summary: doc.excerpt, publishedAt: doc.publishedAt })),
        ...entries.docs.map((doc): ArticleIndexDoc => ({ _type: 'knowledgeBase', title: doc.title, slug: doc.slug, summary: doc.shortDescription, publishedAt: doc.publishedAt })),
    ]
        .sort((a, b) => String(b.publishedAt ?? '').localeCompare(String(a.publishedAt ?? '')))
        .slice(0, limit);
}

export interface SitemapDocs {
    posts: { slug: string; updatedAt: string }[];
    projects: { slug: string; updatedAt: string }[];
    knowledgeBase: { slug: string; updatedAt: string }[];
    blogCategories: { slug: string; updatedAt: string }[];
    authors: { slug: string; updatedAt: string }[];
}

async function readGetSitemapDocs(): Promise<SitemapDocs> {
    const client = await payload();
    const list = async (collection: 'posts' | 'portfolio-projects' | 'knowledge-base' | 'blog-categories' | 'authors', published: boolean) =>
        (
            await client.find({
                collection,
                ...(published ? { where: PUBLISHED } : {}),
                depth: 0,
                limit: 0,
                select: { slug: true, updatedAt: true },
            })
        ).docs.map((doc) => ({ slug: String(doc.slug), updatedAt: String(doc.updatedAt) }));
    const [posts, projects, knowledgeBase, blogCategories, authors] = await Promise.all([
        list('posts', true),
        list('portfolio-projects', true),
        list('knowledge-base', true),
        list('blog-categories', false),
        list('authors', false),
    ]);
    return { posts, projects, knowledgeBase, blogCategories, authors };
}

export { imageVariantUrl };

export const getPortfolioSlugs = cached('getPortfolioSlugs', readGetPortfolioSlugs);
export const getLatestPortfolioProjects = cached('getLatestPortfolioProjects', readGetLatestPortfolioProjects);
export const getKnowledgeBase = cached('getKnowledgeBase', readGetKnowledgeBase);
export const getArticleIndexDocs = cached('getArticleIndexDocs', readGetArticleIndexDocs);
export const searchArticles = cached('searchArticles', readSearchArticles);
export const getSitemapDocs = cached('getSitemapDocs', readGetSitemapDocs);
