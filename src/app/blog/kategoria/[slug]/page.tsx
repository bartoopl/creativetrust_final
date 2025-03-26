import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogPostsByCategory, getBlogCategories } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

// Define the params type as a Promise as required in Next.js v15
type Params = Promise<{ slug: string }>;

export async function generateMetadata({
                                           params,
                                       }: {
    params: Params;
}): Promise<Metadata> {
    // Await the params to get the slug
    const { slug } = await params;

    // Znajdź kategorię
    const categories = await getBlogCategories();
    const category = categories.find(cat => cat.slug.current === slug);

    if (!category) {
        return {
            title: 'Kategoria nie znaleziona - Blog',
            description: 'Nie znaleziono artykułów w tej kategorii'
        };
    }

    return {
        title: `${category.title} - Blog`,
        description: category.description || `Artykuły z kategorii ${category.title}`
    };
}

export async function generateStaticParams() {
    const categories = await getBlogCategories();
    return categories.map(category => ({
        slug: category.slug.current,
    }));
}

export default async function BlogCategoryPage({
                                                   params,
                                               }: {
    params: Params;
}) {
    // Await the params to get the slug
    const { slug } = await params;

    const categories = await getBlogCategories();
    const category = categories.find(cat => cat.slug.current === slug);

    if (!category) {
        notFound();
    }

    const posts = await getBlogPostsByCategory(slug);

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
                <Link href="/blog" className="text-gray-600 mb-8 flex items-center">
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

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium mb-6">
                        Kategoria: {category.title}
                    </h1>
                    {category.description && (
                        <p className="text-xl text-gray-600 max-w-3xl">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* Kategorie */}
                <div className="mb-12 flex flex-wrap gap-2">
                    <Link
                        href="/blog"
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Wszystkie
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            href={`/blog/kategoria/${cat.slug.current}`}
                            className={`px-4 py-2 rounded-full hover:bg-gray-200 transition-colors ${
                                cat.slug.current === slug
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {cat.title} {cat.count > 0 && <span className="text-sm">({cat.count})</span>}
                        </Link>
                    ))}
                </div>

                {/* Lista postów */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post) => (
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
                                    {post.categories?.map((cat) => (
                                        <Link
                                            key={cat._id}
                                            href={`/blog/kategoria/${cat.slug.current}`}
                                            className={`inline-block mr-2 mb-1 px-2 py-1 text-xs rounded-full ${
                                                cat.slug.current === slug
                                                    ? 'bg-black text-white'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {cat.title}
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
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-medium mb-4">Brak artykułów w tej kategorii</h3>
                        <p className="text-gray-600 mb-8">
                            Nie znaleziono żadnych artykułów w kategorii {category.title}.
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Wróć do wszystkich artykułów
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}