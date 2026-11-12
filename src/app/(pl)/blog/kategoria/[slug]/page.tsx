import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';
import PageHero from '@/components/ui/PageHero';
import NotchedButton from '@/components/ui/NotchedButton';
import BlogPostCard from '@/components/BlogPostCard';
import type { Metadata } from 'next';
import { getBlogPostsByCategory, getBlogCategories } from '@/lib/cms';
import { urlFor } from '@/lib/cms';

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
        description: category.description || `Artykuły z kategorii ${category.title}`,
        // Own canonical: without it the page inherited the homepage's.
        alternates: { canonical: `${SITE_URL}/blog/kategoria/${slug}` },
    };
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
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <PageHero
                eyebrow="Kategoria"
                title={category.title}
                description={category.description}
            />

            <section className="ct-section" style={{ paddingTop: 'clamp(32px, 4vw, 48px)' }}>
                <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                    <nav aria-label="Kategorie bloga" className="flex flex-wrap items-center gap-1.5">
                        <span style={{ minWidth: 92, marginRight: 6, fontSize: 14, color: 'var(--muted-2)' }}>Kategorie</span>
                        <Link href="/blog" className="ct-chip">Wszystkie</Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat._id}
                                href={`/blog/kategoria/${cat.slug.current}`}
                                aria-current={cat.slug.current === slug ? 'page' : undefined}
                                className="ct-chip"
                            >
                                {cat.title}{cat.count > 0 && <span style={{ marginLeft: 6, opacity: 0.6 }}>{cat.count}</span>}
                            </Link>
                        ))}
                    </nav>

                    {posts.length > 0 ? (
                        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {posts.map((post) => (
                                <li key={post._id}>
                                    <BlogPostCard
                                        href={`/blog/${post.slug.current}`}
                                        title={post.title}
                                        image={post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined}
                                        meta={post.categories?.map((cat) => cat.title).join(' · ')}
                                        excerpt={post.excerpt}
                                        footer={[formatDate(post.publishedAt), post.estimatedReadingTime && `${post.estimatedReadingTime} min czytania`].filter(Boolean).join(' · ')}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="ct-tile flex flex-col items-center gap-4 text-center" style={{ padding: 'clamp(40px, 8vw, 80px) 24px' }}>
                            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>Brak artykułów w tej kategorii</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>
                                Nie znaleziono żadnych artykułów w kategorii {category.title}.
                            </p>
                            <NotchedButton href="/blog">Wróć do wszystkich artykułów</NotchedButton>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
