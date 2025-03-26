import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogPost } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import PortableTextContent from '@/components/PortableTextContent';

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
        openGraph: post.mainImage ? {
            images: [{ url: urlFor(post.mainImage).url() }]
        } : undefined
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

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="text-gray-600 mb-12 flex items-center">
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

                        <h1 className="text-4xl md:text-5xl font-medium mb-6">{post.title}</h1>

                        {post.excerpt && (
                            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
                        )}

                        <div className="flex items-center mb-8">
                            <div className="flex items-center mr-8">
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
                        <div className="mt-16">
                            <h3 className="text-2xl font-medium mb-8">Powiązane artykuły</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <div className="mt-16 pt-8 border-t border-gray-200">
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