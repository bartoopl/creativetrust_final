import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import NotchedButton from '@/components/ui/NotchedButton';
import BlogPostCard from '@/components/BlogPostCard';
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

    const activePill = { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-soft)' };

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <PageHero
                eyebrow="Kategoria"
                title={category.title}
                description={category.description}
            />

            <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                <div className="ct-shell-sm mx-auto flex max-w-[1280px] flex-wrap items-center gap-2" style={{ boxSizing: 'content-box' }}>
                    <Link href="/blog" className="ct-meta ct-contact-link" style={{ marginRight: 10 }}>
                        ← Wróć do bloga
                    </Link>
                    <Link href="/blog" className="ct-pill ct-card-hover">
                        Wszystkie
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            href={`/blog/kategoria/${cat.slug.current}`}
                            className="ct-pill ct-card-hover"
                            style={cat.slug.current === slug ? activePill : undefined}
                        >
                            {cat.title}{cat.count > 0 && <span style={{ marginLeft: 6, color: 'var(--muted-2)' }}>({cat.count})</span>}
                        </Link>
                    ))}
                </div>
            </div>

            <section className="ct-section">
                <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
                    {/* Lista postów */}
                    {posts.length > 0 ? (
                        <>
                            <span className="ct-eyebrow">Kategoria: {category.title}</span>
                            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                                {posts.map((post) => (
                                    <BlogPostCard
                                        key={post._id}
                                        href={`/blog/${post.slug.current}`}
                                        title={post.title}
                                        image={post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined}
                                        meta={post.categories?.map((cat) => cat.title).join(' · ')}
                                        excerpt={post.excerpt}
                                        footer={[formatDate(post.publishedAt), post.estimatedReadingTime && `${post.estimatedReadingTime} min czytania`].filter(Boolean).join(' · ')}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="ct-panel flex flex-col items-center gap-4 text-center" style={{ padding: 'clamp(32px, 6vw, 64px) 24px', background: 'var(--panel)' }}>
                            <span className="ct-meta">// brak wyników</span>
                            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Brak artykułów w tej kategorii</h3>
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
