import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getBlogAuthor } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import PortableTextContent from '@/components/PortableTextContent';
import NotchedButton from '@/components/ui/NotchedButton';
import BlogPostCard from '@/components/BlogPostCard';

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
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                    <Link href="/blog" className="ct-meta ct-contact-link" style={{ alignSelf: 'flex-start' }}>
                        ← Wróć do bloga
                    </Link>

                    {/* Profil autora */}
                    <div className="flex flex-col items-start gap-8 md:flex-row">
                        {author.image ? (
                            <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 120, height: 120, borderRadius: 'var(--radius-lg)', border: '1px solid var(--line-strong)', background: 'var(--panel2)' }}>
                                <Image
                                    src={urlFor(author.image).url()}
                                    alt={author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="ct-mono flex flex-shrink-0 items-center justify-center" style={{ width: 120, height: 120, borderRadius: 'var(--radius-lg)', border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--muted)', fontSize: 36 }}>
                                {author.name.charAt(0)}
                            </div>
                        )}

                        <div className="flex flex-col gap-4" style={{ maxWidth: 720 }}>
                            <span className="ct-eyebrow">Autor</span>
                            <h1 className="ct-h1">{author.name}</h1>

                            {author.role && (
                                <p className="ct-meta" style={{ fontSize: 12 }}>{author.role}</p>
                            )}

                            {author.bio && (
                                <PortableTextContent content={author.bio}/>
                            )}

                            {/* Social Links */}
                            {author.socialLinks && (
                                <div className="flex flex-wrap gap-2">
                                    {author.socialLinks.linkedin && (
                                        <a
                                            href={author.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ct-pill ct-card-hover"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
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
                                            className="ct-pill ct-card-hover"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
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
                                            className="ct-pill ct-card-hover"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="14"
                                                height="14"
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
            </section>

            <section className="ct-section">
                <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                    {/* Artykuły autora */}
                    {author.posts && author.posts.length > 0 ? (
                        <>
                            <div>
                                <span className="ct-eyebrow">Publikacje</span>
                                <h2 className="ct-h2">Artykuły autora <span className="ct-mono" style={{ color: 'var(--muted-2)', fontWeight: 500 }}>({author.posts.length})</span></h2>
                            </div>

                            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                                {author.posts.map((post) => (
                                    <BlogPostCard
                                        key={post._id}
                                        href={`/blog/${post.slug.current}`}
                                        title={post.title}
                                        image={post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined}
                                        excerpt={post.excerpt}
                                        footer={[formatDate(post.publishedAt), post.estimatedReadingTime && `${post.estimatedReadingTime} min czytania`].filter(Boolean).join(' · ')}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="ct-panel flex flex-col items-center gap-4 text-center" style={{ padding: 'clamp(32px, 6vw, 64px) 24px', background: 'var(--panel)' }}>
                            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Brak artykułów</h2>
                            <p className="ct-body" style={{ fontSize: 15 }}>
                                {author.name} nie opublikował(a) jeszcze żadnych artykułów.
                            </p>
                            <NotchedButton href="/blog">Przejdź do bloga</NotchedButton>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
