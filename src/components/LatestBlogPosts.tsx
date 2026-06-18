"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, urlFor } from '@/lib/sanity';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    excerpt: string;
    publishedAt: string;
    estimatedReadingTime?: number;
    categories: Array<{
        _id: string;
        title: string;
        slug: { current: string };
    }>;
}

export default function LatestBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const formatDate = (dateString: string) =>
        new Intl.DateTimeFormat('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(new Date(dateString));

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getBlogPosts();
                setPosts(fetchedPosts.slice(0, 3));
            } catch (error) {
                console.error('Błąd podczas pobierania postów bloga:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-8 border-t border-slate-200 pt-6">
                        <div className="h-8 w-40 animate-pulse rounded bg-slate-100" />
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-4">
                                <div className="aspect-[16/10] animate-pulse rounded-[8px] bg-slate-100" />
                                <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                                <div className="h-6 w-3/4 animate-pulse rounded bg-slate-100" />
                                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="w-full px-6 py-16 md:py-24">
            <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                <div className="mb-8 flex items-end justify-between gap-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Insights
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Artykuły i notatki z pracy nad stronami, sklepami i komunikacją.
                        </h2>
                    </div>
                    <Link href="/blog" className="hidden text-sm font-medium text-slate-950 md:inline-flex">
                        Zobacz blog
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post._id} className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white">
                            <Link href={`/blog/${post.slug.current}`} className="block">
                                <div className="relative aspect-[16/10] bg-slate-100">
                                    {post.mainImage ? (
                                        <Image
                                            src={urlFor(post.mainImage).url()}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                    ) : null}
                                </div>

                                <div className="p-5">
                                    <div className="flex flex-wrap gap-2">
                                        {post.categories?.slice(0, 2).map((category) => (
                                            <span
                                                key={category._id}
                                                className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500"
                                            >
                                                {category.title}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="mt-4 text-xl font-medium text-slate-950">
                                        {post.title}
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                                        <span>{formatDate(post.publishedAt)}</span>
                                        {post.estimatedReadingTime ? (
                                            <span>{post.estimatedReadingTime} min</span>
                                        ) : null}
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                <div className="mt-10 md:hidden">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-950">
                        Zobacz wszystkie artykuły
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
