"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlogPosts, urlFor } from '@/lib/sanity';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    excerpt: string;
    publishedAt: string;
    estimatedReadingTime?: number;
    audioFile?: {
        asset: {
            url: string;
        };
    };
    categories: Array<{
        _id: string;
        title: string;
        slug: { current: string };
        color?: string;
    }>;
}

const LatestBlogPosts: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Format daty
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const fetchedPosts = await getBlogPosts();
                // Limit to the latest 3 posts
                setPosts(fetchedPosts.slice(0, 3));
                setIsLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania postów bloga:', error);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Wariant animacji dla elementów postów
    const postVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    if (isLoading) {
        return (
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-2xl mb-10">Blog</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="animate-pulse">
                                <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-6"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
        <section className="w-full py-16 md:py-24 px-6 border-t border-gray-100">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl">Najnowsze artykuły</h2>
                    <Link
                        href="/blog"
                        className="group inline-flex items-center text-gray-900 hover:text-gray-600 transition-colors"
                    >
                        Zobacz wszystkie
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 transform transition-transform group-hover:translate-x-1"
                        >
                            <path
                                d="M5 12H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 5L19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={postVariants}
                            className="group"
                        >
                            <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-6">
                                {post.mainImage ? (
                                    <Image
                                        src={urlFor(post.mainImage).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-400">Brak zdjęcia</span>
                                    </div>
                                )}
                                {post.audioFile && (
                                    <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded-full flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                                        </svg>
                                        <span className="text-xs">Audio</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-2">
                                {post.categories?.slice(0, 2).map((category) => (
                                    <Link
                                        key={category._id}
                                        href={`/blog/kategoria/${category.slug.current}`}
                                        className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-full"
                                    >
                                        {category.title}
                                    </Link>
                                ))}
                                {post.categories && post.categories.length > 2 && (
                                    <span className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-full">
                                        +{post.categories.length - 2}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-medium mb-3">
                                <Link href={`/blog/${post.slug.current}`} className="hover:text-gray-600 transition-colors">
                                    {post.title}
                                </Link>
                            </h3>

                            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>

                            <div className="flex items-center text-xs text-gray-500 mb-4 mt-auto">
                                <span className="mr-4">{formatDate(post.publishedAt)}</span>
                                {post.estimatedReadingTime && (
                                    <span>{post.estimatedReadingTime} min czytania</span>
                                )}
                            </div>

                            <Link
                                href={`/blog/${post.slug.current}`}
                                className="inline-flex items-center text-black font-medium text-sm group"
                            >
                                Czytaj artykuł
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 transform transition-transform group-hover:translate-x-1"
                                >
                                    <path
                                        d="M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 5L19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlogPosts;