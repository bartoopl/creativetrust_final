import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogAuthor } from '@/lib/sanity';
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
    const author = await getBlogAuthor(slug);

    if (!author) {
        return {
            title: 'Autor nie znaleziony - Blog',
            description: 'Nie znaleziono autora'
        };
    }

    return {
        title: `${author.name} - Autor | Blog`,
        description: `Artykuły napisane przez ${author.name}${author.role ? ` - ${author.role}` : ''}`
    };
}

export async function generateStaticParams() {
    return [];
}

export default async function AuthorPage({
                                             params,
                                         }: {
    params: Params;
}) {
    // Await the params to get the slug
    const {slug} = await params;
    const author = await getBlogAuthor(slug);

    if (!author) {
        notFound();
    }

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

                {/* Profil autora */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {author.image ? (
                            <div className="w-32 h-32 rounded-full overflow-hidden relative">
                                <Image
                                    src={urlFor(author.image).url()}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full">
                                <span className="text-3xl text-gray-600">{author.name.charAt(0)}</span>
                            </div>
                        )}

                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-medium mb-4">{author.name}</h1>

                            {author.role && (
                                <p className="text-xl text-gray-600 mb-6">{author.role}</p>
                            )}

                            {author.bio && (
                                <div className="text-gray-700 max-w-2xl mb-6 prose">
                                    <PortableTextContent content={author.bio}/>
                                </div>
                            )}

                            {/* Social Links */}
                            {author.socialLinks && (
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    {author.socialLinks.linkedin && (
                                        <a
                                            href={author.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-gray-700 hover:text-black"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path
                                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect x="2" y="9" width="4" height="12"></rect>
                                                <circle cx="4" cy="4" r="2"></circle>
                                            </svg>
                                            LinkedIn
                                        </a>
                                    )}

                                    {author.socialLinks.twitter && (
                                        <a
                                            href={author.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-gray-700 hover:text-black"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <path
                                                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                            </svg>
                                            Twitter
                                        </a>
                                    )}

                                    {author.socialLinks.instagram && (
                                        <a
                                            href={author.socialLinks.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-gray-700 hover:text-black"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-2"
                                            >
                                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                            </svg>
                                            Instagram
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Artykuły autora */}
                {author.posts && author.posts.length > 0 ? (
                    <div>
                        <h2 className="text-2xl font-medium mb-8">Artykuły autora ({author.posts.length})</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {author.posts.map((post) => (
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

                                    <h3 className="text-xl font-medium mb-3">
                                        <Link href={`/blog/${post.slug.current}`}
                                              className="hover:text-gray-600 transition-colors">
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
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-medium mb-4">Brak artykułów</h2>
                        <p className="text-gray-600 mb-8">
                            {author.name} nie opublikował(a) jeszcze żadnych artykułów.
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Przejdź do bloga
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}