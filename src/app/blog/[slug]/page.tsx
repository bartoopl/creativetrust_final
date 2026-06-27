import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import PortableTextContent from '@/components/PortableTextContent';
import AudioPlayer from '@/components/AudioPlayer';
import SchemaScript from '@/components/SchemaScript';
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

    if (!post) {
        return {
            title: 'Nie znaleziono artykułu - Blog',
            description: 'Artykuł nie został znaleziony'
        };
    }

    return {
        title: post.seoTitle || `${post.title} - Blog`,
        description: post.seoDescription || post.excerpt || '',
        alternates: {
            canonical: `${SITE_URL}/blog/${slug}`,
        },
        openGraph: {
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || '',
            url: `${SITE_URL}/blog/${slug}`,
            type: 'article',
            locale: 'pl_PL',
            images: post.mainImage ? [{ url: urlFor(post.mainImage).url() }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seoTitle || post.title,
            description: post.seoDescription || post.excerpt || '',
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
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[blogSchema, breadcrumbSchema]} />
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                        Blog
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: 0, maxWidth: '12ch' }}>
                        {post.title}
                    </h1>
                </div>
            </section>
            <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <Link href="/blog" className="text-gray-600 mb-8 sm:mb-12 flex items-center">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                        >
                            <path
                                d="M19 12H5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 19L5 12L12 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Wróć do bloga
                    </Link>

                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories?.map((category) => (
                                <Link
                                    key={category._id}
                                    href={`/blog/kategoria/${category.slug.current}`}
                                    className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                                >
                                    {category.title}
                                </Link>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-medium mb-5 sm:mb-6 leading-tight">{post.title}</h1>

                        {post.excerpt && (
                            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">{post.excerpt}</p>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-8">
                            <div className="flex items-center">
                                {post.author?.image ? (
                                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
                                        <Image
                                            src={urlFor(post.author.image).url()}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full mr-3">
                                        {post.author?.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium">
                                        <Link
                                            href={`/blog/autor/${post.author?.slug.current}`}
                                            className="hover:text-gray-600 transition-colors"
                                        >
                                            {post.author?.name}
                                        </Link>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {post.author?.role}
                                    </div>
                                </div>
                            </div>

                            <div className="text-gray-500 text-sm flex items-center">
                                <span className="mr-4">{formattedDate}</span>
                                {post.estimatedReadingTime && (
                                    <span>{post.estimatedReadingTime} min czytania</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {post.mainImage && (
                        <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-12">
                            <Image
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Audio Player */}
                    {post.audioFile && (
                        <AudioPlayer
                            audioUrl={post.audioFile.url}
                            title={post.title}
                        />
                    )}

                    {/* Renderowanie treści za pomocą PortableText */}
                    {post.content && <PortableTextContent content={post.content} />}

                    {/* Informacje o autorze */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex items-start md:items-center flex-col md:flex-row">
                            {post.author?.image ? (
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-6 relative flex-shrink-0 mb-4 md:mb-0">
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mr-6 flex-shrink-0 mb-4 md:mb-0">
                                    {post.author?.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-medium mb-2">
                                    <Link
                                        href={`/blog/autor/${post.author?.slug.current}`}
                                        className="hover:text-gray-600 transition-colors"
                                    >
                                        {post.author?.name}
                                    </Link>
                                </h3>
                                {post.author?.role && (
                                    <p className="text-gray-600 mb-3">{post.author.role}</p>
                                )}
                                {post.author?.bio && (
                                    <div className="text-sm text-gray-600 prose max-w-none">
                                        <PortableTextContent content={post.author.bio} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Powiązane artykuły */}
                    {post.relatedPosts && post.relatedPosts.length > 0 && (
                        <div className="mt-12 sm:mt-16">
                            <h3 className="text-2xl font-medium mb-6 sm:mb-8">Powiązane artykuły</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                {post.relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost._id}
                                        href={`/blog/${relatedPost.slug.current}`}
                                        className="group"
                                    >
                                        <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-4">
                                            {relatedPost.mainImage ? (
                                                <Image
                                                    src={urlFor(relatedPost.mainImage).url()}
                                                    alt={relatedPost.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                    <span className="text-gray-400 text-sm">Brak zdjęcia</span>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-medium group-hover:text-gray-600 transition-colors">
                                            {relatedPost.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(relatedPost.publishedAt).toLocaleDateString('pl-PL')}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nawigacja na dole strony */}
                    <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-700 hover:text-black"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2"
                            >
                                <path
                                    d="M19 12H5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 19L5 12L12 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Wróć do pełnej listy artykułów
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
