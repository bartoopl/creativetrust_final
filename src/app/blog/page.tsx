import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogPosts, getBlogCategories, getFeaturedBlogPosts, urlFor } from '@/lib/sanity';
import { SITE_URL } from '@/lib/schema';
import PageHero from '@/components/ui/PageHero';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata: Metadata = {
    title: 'Blog — CreativeTrust | Strategia, design, AI i automatyzacja',
    description: 'Artykuły o strategii marki, web designie, e-commerce i AI w marketingu. Konkretna wiedza — bez ogólników.',
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
        title: 'Blog CreativeTrust | Strategia, design, AI',
        description: 'Artykuły o marketingu, designie, AI i e-commerce.',
        url: `${SITE_URL}/blog`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateString));
}

export default async function BlogPage() {
    const [allPosts, featuredPosts, categories] = await Promise.all([
        getBlogPosts(),
        getFeaturedBlogPosts(),
        getBlogCategories(),
    ]);

    const mainPost = featuredPosts[0] || allPosts[0] || null;
    const featuredIds = new Set(featuredPosts.map((p: any) => p._id));
    const regularPosts = allPosts.filter((p: any) => !featuredIds.has(p._id));

    return (
        <main style={{ minHeight: '100vh' }}>
            <PageHero
                eyebrow="Blog"
                title="Wiedza bez ogólników."
                description="Strategia, design, AI, e-commerce i automatyzacja. Piszemy o tym, co realnie zmienia wyniki."
            />

            {categories.length > 0 && (
                <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                    <div className="ct-shell-sm mx-auto flex max-w-[1280px] flex-wrap items-center gap-2" style={{ boxSizing: 'content-box' }}>
                        <span className="ct-meta" style={{ marginRight: 6, color: 'var(--muted-2)' }}>Kategorie</span>
                        <Link href="/blog" className="ct-pill" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'var(--accent-soft)' }}>Wszystkie</Link>
                        {categories.map((cat: any) => (
                            <Link key={cat._id} href={`/blog/kategoria/${cat.slug.current}`} className="ct-pill ct-card-hover">
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {mainPost && (
                <section className="ct-section">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
                        <span className="ct-eyebrow">Wyróżniony artykuł</span>
                        <Link href={`/blog/${mainPost.slug.current}`} className="ct-card-hover grid grid-cols-1 overflow-hidden lg:grid-cols-2" style={{ alignItems: 'stretch', borderRadius: 8, border: '1px solid rgba(17,24,39,0.1)', background: '#fff', color: 'inherit' }}>
                            <div className={mainPost.mainImage ? '' : 'ct-placeholder'} style={{ background: mainPost.mainImage ? 'var(--panel2)' : undefined, overflow: 'hidden', minHeight: 320 }}>
                                {mainPost.mainImage ? (
                                    <img src={urlFor(mainPost.mainImage).width(1000).url()} alt={mainPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span className="ct-mono" style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)' }}>BRAK ZDJĘCIA</span>
                                )}
                            </div>
                            <div className="flex flex-col justify-center gap-3 border-t lg:border-t-0 lg:border-l" style={{ padding: 'clamp(24px, 4vw, 44px)', borderColor: 'var(--line)' }}>
                                {mainPost.categories?.slice(0, 1).map((cat: any) => (
                                    <span key={cat._id} className="ct-meta" style={{ color: 'var(--accent)' }}>{cat.title}</span>
                                ))}
                                <h2 className="ct-h2" style={{ margin: 0 }}>{mainPost.title}</h2>
                                {mainPost.excerpt && <p className="ct-body" style={{ fontSize: 15 }}>{mainPost.excerpt}</p>}
                                <div className="ct-meta flex items-center gap-2" style={{ marginTop: 8, color: 'var(--muted-2)' }}>
                                    {mainPost.publishedAt && <span>{formatDate(mainPost.publishedAt)}</span>}
                                    {mainPost.estimatedReadingTime && <span>· {mainPost.estimatedReadingTime} min</span>}
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {regularPosts.length > 0 && (
                <section className="ct-section" style={{ borderTop: '1px solid var(--line)' }}>
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
                        <span className="ct-eyebrow">Wszystkie artykuły</span>
                        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                            {regularPosts.map((post: any) => (
                                <BlogPostCard
                                    key={post._id}
                                    href={`/blog/${post.slug.current}`}
                                    title={post.title}
                                    image={post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined}
                                    meta={post.categories?.[0]?.title}
                                    excerpt={post.excerpt}
                                    footer={[post.publishedAt && formatDate(post.publishedAt), post.estimatedReadingTime && `${post.estimatedReadingTime} min`].filter(Boolean).join(' · ')}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {allPosts.length === 0 && (
                <section className="ct-section">
                    <div className="mx-auto max-w-[1280px] text-center" style={{ padding: '48px 0' }}>
                        <div className="ct-meta" style={{ marginBottom: 12 }}>// brak artykułów</div>
                        <p className="ct-body" style={{ fontSize: 15 }}>Artykuły pojawią się wkrótce.</p>
                    </div>
                </section>
            )}
        </main>
    );
}
