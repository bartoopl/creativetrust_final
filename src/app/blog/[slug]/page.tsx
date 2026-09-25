import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import PortableTextContent from '@/components/PortableTextContent';
import AudioPlayer from '@/components/AudioPlayer';
import BlogServiceLinks from '@/components/BlogServiceLinks';
import BlogPostCard from '@/components/BlogPostCard';
import SchemaScript from '@/components/SchemaScript';
import { getBlogSeoConfig } from '@/lib/blog-seo';
import { SITE_URL, buildBlogPostingSchema, buildBreadcrumbSchema } from '@/lib/schema';

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
        title: seoConfig?.title || post.seoTitle || `${post.title} - Blog`,
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

export async function generateStaticParams() {
    return [];
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
    const canonicalUrl = `${SITE_URL}/blog/${slug}`;
    const blogSchema = buildBlogPostingSchema({
        title: post.title,
        description: post.excerpt || post.seoDescription,
        url: canonicalUrl,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
        authorName: post.author?.name,
    });
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: post.title, url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <SchemaScript schema={[blogSchema, breadcrumbSchema]} />
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x) clamp(40px, 6vw, 64px)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto flex flex-col gap-6" style={{ maxWidth: 720 }}>
                    <Link href="/blog" className="ct-meta ct-contact-link" style={{ alignSelf: 'flex-start' }}>
                        ← Wróć do bloga
                    </Link>

                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.categories.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/blog/kategoria/${category.slug.current}`}
                                    className="ct-pill ct-card-hover"
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>
                    )}

                    <h1 className="ct-h1" style={{ fontSize: 'clamp(32px, 4.2vw, 50px)', letterSpacing: '-0.024em', lineHeight: 1.1 }}>{post.title}</h1>

                    {post.excerpt && (
                        <p className="ct-lead">{post.excerpt}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3" style={{ paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                        <div className="flex items-center gap-3">
                            {post.author?.image ? (
                                <div className="relative overflow-hidden" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--line-strong)' }}>
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="ct-mono flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--muted)', fontSize: 13 }}>
                                    {post.author?.name.charAt(0)}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <Link
                                    href={`/blog/autor/${post.author?.slug.current}`}
                                    className="ct-contact-link"
                                    style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}
                                >
                                    {post.author?.name}
                                </Link>
                                {post.author?.role && <span className="ct-body" style={{ fontSize: 12.5 }}>{post.author.role}</span>}
                            </div>
                        </div>

                        <div className="ct-meta flex items-center gap-2" style={{ color: 'var(--muted-2)' }}>
                            <span>{formattedDate}</span>
                            {post.estimatedReadingTime && (
                                <span>· {post.estimatedReadingTime} min czytania</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ padding: 'clamp(40px, 6vw, 64px) var(--pad-x) var(--pad-y)' }}>
                {post.mainImage && (
                    <div className="relative mx-auto overflow-hidden" style={{ maxWidth: 960, aspectRatio: '16/9', marginBottom: 'clamp(40px, 6vw, 56px)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line-strong)', background: 'var(--panel2)' }}>
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                <article className="mx-auto" style={{ maxWidth: 720 }}>
                    {/* Audio Player */}
                    {post.audioFile && (
                        <AudioPlayer
                            audioUrl={post.audioFile.url}
                            title={post.title}
                        />
                    )}

                    {/* Renderowanie treści za pomocą PortableText */}
                    {post.content && <PortableTextContent content={post.content} />}
                    <BlogServiceLinks links={seoConfig?.links || []} />

                    {/* Informacje o autorze */}
                    <div className="ct-panel flex flex-col items-start gap-5 md:flex-row" style={{ marginTop: 56, padding: 24 }}>
                        {post.author?.image ? (
                            <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--line-strong)' }}>
                                <Image
                                    src={urlFor(post.author.image).url()}
                                    alt={post.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="ct-mono flex flex-shrink-0 items-center justify-center" style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--muted)', fontSize: 20 }}>
                                {post.author?.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                            <span className="ct-eyebrow">Autor</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                                <Link
                                    href={`/blog/autor/${post.author?.slug.current}`}
                                    className="ct-contact-link"
                                    style={{ color: 'var(--text)' }}
                                >
                                    {post.author?.name}
                                </Link>
                            </h3>
                            {post.author?.role && (
                                <p className="ct-meta">{post.author.role}</p>
                            )}
                            {post.author?.bio && (
                                <PortableTextContent content={post.author.bio} compact />
                            )}
                        </div>
                    </div>
                </article>

                {/* Powiązane artykuły */}
                {post.relatedPosts && post.relatedPosts.length > 0 && (
                    <div className="mx-auto flex flex-col gap-6" style={{ maxWidth: 1280, marginTop: 'var(--pad-y)', paddingTop: 'var(--pad-y)', borderTop: '1px solid var(--line)' }}>
                        <div>
                            <span className="ct-eyebrow">Czytaj dalej</span>
                            <h3 className="ct-h2">Powiązane artykuły</h3>
                        </div>
                        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                            {post.relatedPosts.map((relatedPost) => (
                                <BlogPostCard
                                    key={relatedPost._id}
                                    as="h4"
                                    href={`/blog/${relatedPost.slug.current}`}
                                    title={relatedPost.title}
                                    image={relatedPost.mainImage ? urlFor(relatedPost.mainImage).width(800).url() : undefined}
                                    footer={new Date(relatedPost.publishedAt).toLocaleDateString('pl-PL')}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Nawigacja na dole strony */}
                <div className="mx-auto" style={{ maxWidth: post.relatedPosts && post.relatedPosts.length > 0 ? 1280 : 720, marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                    <Link href="/blog" className="ct-link">
                        ← Wróć do pełnej listy artykułów
                    </Link>
                </div>
            </div>
        </main>
    );
}
