import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/cms';
import { urlFor } from '@/lib/cms';
import PortableTextContent from '@/components/PortableTextContent';
import AudioPlayer from '@/components/AudioPlayer';
import BlogServiceLinks from '@/components/BlogServiceLinks';
import BlogPostCard from '@/components/BlogPostCard';
import SchemaScript from '@/components/SchemaScript';
import { getBlogSeoConfig } from '@/lib/blog-seo';
import { SITE_URL, buildBlogPostingSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { resolveAuthor } from '@/lib/authors';

// Rendered on request from cached CMS data (src/lib/cms.ts); saving in the
// admin refreshes it immediately, otherwise it is re-read hourly.

// Define the params type as a Promise as required in Next.js v15
type Params = Promise<{ slug: string }>;

export async function generateMetadata({
                                           params,
                                       }: {
    params: Params;
}): Promise<Metadata> {
    // Await the params to get the slug
    const { slug } = await params;
    const post = await getBlogPost(slug);
    const seoConfig = getBlogSeoConfig(slug);

    if (!post) {
        return {
            title: 'Nie znaleziono artykułu - Blog',
            description: 'Artykuł nie został znaleziony'
        };
    }

    return {
        title: seoConfig?.title ? { absolute: seoConfig.title } : post.seoTitle || `${post.title} - Blog`,
        description: seoConfig?.description || post.seoDescription || post.excerpt || '',
        alternates: {
            canonical: `${SITE_URL}/blog/${slug}`,
        },
        openGraph: {
            title: seoConfig?.title || post.seoTitle || post.title,
            description: seoConfig?.description || post.seoDescription || post.excerpt || '',
            url: `${SITE_URL}/blog/${slug}`,
            type: 'article',
            locale: 'pl_PL',
            images: post.mainImage ? [{ url: urlFor(post.mainImage).url() }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: seoConfig?.title || post.seoTitle || post.title,
            description: seoConfig?.description || post.seoDescription || post.excerpt || '',
        },
    };
}

export default async function BlogPostPage({
                                               params,
                                           }: {
    params: Params;
}) {
    // Await the params to get the slug
    const { slug } = await params;
    const post = await getBlogPost(slug);
    const seoConfig = getBlogSeoConfig(slug);

    if (!post) {
        notFound();
    }

    // Formatowanie daty publikacji
    const publishDate = new Date(post.publishedAt);
    const formattedDate = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(publishDate);
    // Shown when the post was edited at least a day after publishing.
    const updated = post._updatedAt ? new Date(post._updatedAt) : null;
    const formattedUpdate =
        updated && !Number.isNaN(updated.getTime()) && updated.getTime() - publishDate.getTime() > 24 * 60 * 60 * 1000
            ? new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(updated)
            : null;
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;
    const author = resolveAuthor(post.author);
    const blogSchema = buildBlogPostingSchema({
        title: post.title,
        description: post.excerpt || post.seoDescription,
        url: canonicalUrl,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
        author: author
            ? {
                  name: author.name,
                  slug: author.slug,
                  jobTitle: author.jobTitle,
                  sameAs: author.sameAs,
                  image: post.author?.image ? urlFor(post.author.image).width(400).url() : undefined,
              }
            : undefined,
    });
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: post.title, url: canonicalUrl },
    ]);
    // Same items applyBlogPostFixes renders in the body, so the FAQPage matches visible content.
    const faqSchema = seoConfig?.faq ? buildFaqSchema(seoConfig.faq.items) : null;

    const hasRelated = Boolean(post.relatedPosts && post.relatedPosts.length > 0);

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <SchemaScript schema={faqSchema ? [blogSchema, breadcrumbSchema, faqSchema] : [blogSchema, breadcrumbSchema]} />
            <header style={{ padding: 'clamp(40px, 6vw, 80px) var(--pad-x) clamp(32px, 4vw, 48px)' }}>
                <div className="mx-auto flex flex-col gap-6" style={{ maxWidth: 880 }}>
                    <nav aria-label="Ścieżka" className="flex flex-wrap items-center gap-x-2 gap-y-1" style={{ fontSize: 14, color: 'var(--muted-2)' }}>
                        <Link href="/blog" className="ct-contact-link" style={{ color: 'var(--muted)' }}>Blog</Link>
                        {post.categories?.map((category) => (
                            <React.Fragment key={category._id}>
                                <span aria-hidden="true">/</span>
                                <Link href={`/blog/kategoria/${category.slug.current}`} className="ct-contact-link" style={{ color: 'var(--accent)' }}>
                                    {category.title}
                                </Link>
                            </React.Fragment>
                        ))}
                    </nav>

                    <h1 className="ct-h1" style={{ fontSize: 'clamp(34px, 5vw, 60px)', textWrap: 'balance' }}>{post.title}</h1>

                    {post.excerpt && (
                        <p style={{ margin: 0, maxWidth: '62ch', fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.5, color: 'var(--muted)' }}>{post.excerpt}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3" style={{ paddingTop: 8 }}>
                        <div className="flex items-center gap-3">
                            {post.author?.image ? (
                                <div className="relative overflow-hidden" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--panel2)' }}>
                                    <Image src={urlFor(post.author.image).width(120).url()} alt={post.author.name} fill sizes="40px" className="object-cover" />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--panel2)', color: 'var(--muted)', fontSize: 15 }}>
                                    {post.author?.name.charAt(0)}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <Link href={`/blog/autor/${post.author?.slug.current}`} className="ct-contact-link" style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>
                                    {author?.name ?? post.author?.name}
                                </Link>
                                {post.author?.role && <span style={{ fontSize: 13, color: 'var(--muted-2)' }}>{post.author.role}</span>}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-2" style={{ fontSize: 14, color: 'var(--muted-2)' }}>
                            <time dateTime={post.publishedAt}>{formattedDate}</time>
                            {formattedUpdate && (
                                <span>· Zaktualizowano <time dateTime={post._updatedAt}>{formattedUpdate}</time></span>
                            )}
                            {post.estimatedReadingTime && <span>· {post.estimatedReadingTime} min czytania</span>}
                        </div>
                    </div>
                </div>
            </header>

            {post.mainImage && (
                <div style={{ padding: '0 var(--pad-x)' }}>
                    <div className="ct-tile mx-auto" style={{ maxWidth: 1280, padding: 12 }}>
                        <div className="ct-v2-media relative" style={{ aspectRatio: '16/9' }}>
                            <Image src={urlFor(post.mainImage).width(2000).url()} alt={post.title} fill priority sizes="(min-width: 1360px) 1256px, 100vw" className="object-cover" />
                        </div>
                    </div>
                </div>
            )}

            <div style={{ padding: 'clamp(40px, 6vw, 72px) var(--pad-x) var(--pad-y)' }}>
                <article className="mx-auto" style={{ maxWidth: 720 }}>
                    {post.audioFile && <AudioPlayer audioUrl={post.audioFile.url} title={post.title} />}

                    {post.content && <PortableTextContent content={post.content} />}
                    <BlogServiceLinks links={seoConfig?.links || []} />

                    {/* Informacje o autorze */}
                    <aside className="ct-tile flex flex-col items-start gap-5 sm:flex-row" style={{ marginTop: 56, padding: 24 }}>
                        {post.author?.image ? (
                            <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--panel2)' }}>
                                <Image src={urlFor(post.author.image).width(200).url()} alt={post.author.name} fill sizes="72px" className="object-cover" />
                            </div>
                        ) : (
                            <div className="flex flex-shrink-0 items-center justify-center" style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--panel2)', color: 'var(--muted)', fontSize: 22 }}>
                                {post.author?.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                            <span style={{ fontSize: 14, color: 'var(--muted-2)' }}>Autor</span>
                            <p style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: '-0.01em' }}>
                                <Link href={`/blog/autor/${post.author?.slug.current}`} className="ct-contact-link" style={{ color: 'var(--text)' }}>
                                    {author?.name ?? post.author?.name}
                                </Link>
                            </p>
                            {post.author?.role && <p style={{ margin: 0, fontSize: 14, color: 'var(--muted)' }}>{post.author.role}</p>}
                            {post.author?.bio && (
                                <div style={{ marginTop: 6 }}>
                                    <PortableTextContent content={post.author.bio} compact />
                                </div>
                            )}
                        </div>
                    </aside>

                    {!hasRelated && (
                        <div style={{ marginTop: 40 }}>
                            <Link href="/blog" className="ct-ghost">← Wszystkie artykuły</Link>
                        </div>
                    )}
                </article>

                {/* Powiązane artykuły */}
                {hasRelated && (
                    <section className="mx-auto flex flex-col gap-8" style={{ maxWidth: 1280, marginTop: 'var(--pad-y)' }}>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <h2 className="ct-h2" style={{ margin: 0 }}>Czytaj dalej</h2>
                            <Link href="/blog" className="ct-ghost">Wszystkie artykuły</Link>
                        </div>
                        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {post.relatedPosts!.map((relatedPost) => (
                                <li key={relatedPost._id}>
                                    <BlogPostCard
                                        as="h3"
                                        href={`/blog/${relatedPost.slug.current}`}
                                        title={relatedPost.title}
                                        image={relatedPost.mainImage ? urlFor(relatedPost.mainImage).width(800).url() : undefined}
                                        footer={new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(relatedPost.publishedAt))}
                                    />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </main>
    );
}
