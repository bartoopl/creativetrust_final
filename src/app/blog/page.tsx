import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getBlogPosts, getBlogCategories, getFeaturedBlogPosts } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
    title: 'Blog - Agencja Marketingowa',
    description: 'Poznaj najnowsze trendy i strategie w marketingu, designie i technologii.',
};

export default async function BlogPage() {
    const allPosts = await getBlogPosts();
    const featuredPosts = await getFeaturedBlogPosts();
    const categories = await getBlogCategories();

    // Podziel posty na sekcje (bez wyróżnionych postów)
    const mainFeaturedPost = featuredPosts[0] || null;
    const secondaryFeaturedPosts = featuredPosts.slice(1, 3);

    // Uzyskaj wszystkie posty, które nie są wyróżnione
    const regularPosts = allPosts.filter(post =>
        !featuredPosts.some(featured => featured._id === post._id)
    );

    // Formatuj datę
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium mb-6">Blog</h1>
                    <p className="text-xl text-gray-600 max-w-3xl">
                        Najnowsze artykuły, porady i przemyślenia na temat marketingu, designu i technologii.
                    </p>
                </div>

                {/* Kategorie */}
                <div className="mb-12 flex flex-wrap gap-2">
                    <Link
                        href="/blog"
                        className="px-4 py-2 bg-black text-white rounded-full"
                    >
                        Wszystkie
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category._id}
                            href={`/blog/kategoria/${category.slug.current}`}
                            className={`px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors`}
                        >
                            {category.title} {category.count > 0 && <span className="text-sm">({category.count})</span>}
                        </Link>
                    ))}
                </div>

                {/* Główny wyróżniony post */}
                {mainFeaturedPost && (
                    <div className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-3 order-2 lg:order-1">
                                <div className="mb-4">
                                    {mainFeaturedPost.categories?.map((category) => (
                                        <Link
                                            key={category._id}
                                            href={`/blog/kategoria/${category.slug.current}`}
                                            className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 text-sm text-gray-800 rounded-full"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-medium mb-4">
                                    <Link href={`/blog/${mainFeaturedPost.slug.current}`} className="hover:text-gray-600 transition-colors">
                                        {mainFeaturedPost.title}
                                    </Link>
                                </h2>

                                <p className="text-gray-600 mb-6">{mainFeaturedPost.excerpt}</p>

                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <span className="mr-4">{formatDate(mainFeaturedPost.publishedAt)}</span>
                                    {mainFeaturedPost.estimatedReadingTime && (
                                        <span>{mainFeaturedPost.estimatedReadingTime} min czytania</span>
                                    )}
                                </div>

                                <Link
                                    href={`/blog/${mainFeaturedPost.slug.current}`}
                                    className="inline-flex items-center text-black font-medium group"
                                >
                                    Czytaj artykuł
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

                            <div className="lg:col-span-2 order-1 lg:order-2">
                                <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                                    {mainFeaturedPost.mainImage ? (
                                        <Image
                                            src={urlFor(mainFeaturedPost.mainImage).url()}
                                            alt={mainFeaturedPost.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-gray-400">Brak zdjęcia</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dodatkowe wyróżnione posty */}
                {secondaryFeaturedPosts.length > 0 && (
                    <div className="mb-20">
                        <h3 className="text-xl font-medium mb-8">Polecane artykuły</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {secondaryFeaturedPosts.map((post) => (
                                <div key={post._id} className="flex flex-col h-full">
                                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-6">
                                        {post.mainImage ? (
                                            <Image
                                                src={urlFor(post.mainImage).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-400">Brak zdjęcia</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-2">
                                        {post.categories?.map((category) => (
                                            <Link
                                                key={category._id}
                                                href={`/blog/kategoria/${category.slug.current}`}
                                                className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-full"
                                            >
                                                {category.title}
                                            </Link>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-medium mb-3">
                                        <Link href={`/blog/${post.slug.current}`} className="hover:text-gray-600 transition-colors">
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>

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
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Lista wszystkich postów */}
                <div>
                    <h3 className="text-xl font-medium mb-8">Wszystkie artykuły</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {regularPosts.map((post) => (
                            <div key={post._id} className="flex flex-col h-full group">
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
                                </div>

                                <div className="mb-2">
                                    {post.categories?.map((category) => (
                                        <Link
                                            key={category._id}
                                            href={`/blog/kategoria/${category.slug.current}`}
                                            className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded-full"
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>

                                <h3 className="text-xl font-medium mb-3">
                                    <Link href={`/blog/${post.slug.current}`} className="hover:text-gray-600 transition-colors">
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{post.excerpt}</p>

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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}