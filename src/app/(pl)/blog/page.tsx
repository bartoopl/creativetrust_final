import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogPosts, getBlogCategories, getFeaturedBlogPosts, urlFor } from '@/lib/cms';
import { SITE_URL } from '@/lib/schema';
import PageHero from '@/components/ui/PageHero';
import BlogPostCard from '@/components/BlogPostCard';

// Rendered on request from cached CMS data (src/lib/cms.ts); saving in the
// admin refreshes it immediately, otherwise it is re-read hourly.

export const metadata: Metadata = {
    title: 'Blog | Strategia, design, AI i automatyzacja',
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

            <section className="ct-section" style={{ paddingTop: 'clamp(32px, 4vw, 48px)' }}>
                <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                    {categories.length > 0 && (
                        <nav aria-label="Kategorie bloga" className="flex flex-wrap items-center gap-1.5">
                            <span style={{ minWidth: 92, marginRight: 6, fontSize: 14, color: 'var(--muted-2)' }}>Kategorie</span>
                            <Link href="/blog" aria-current="page" className="ct-chip">Wszystkie</Link>
                            {categories.map((cat: any) => (
                                <Link key={cat._id} href={`/blog/kategoria/${cat.slug.current}`} className="ct-chip">
                                    {cat.title}
                                </Link>
                            ))}
                        </nav>
                    )}

                    {mainPost && (
                        <Link href={`/blog/${mainPost.slug.current}`} className="ct-tile ct-v2-card grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr] lg:gap-10" style={{ padding: 12, color: 'inherit' }}>
                            <div className="ct-v2-media" style={{ aspectRatio: '16/9' }}>
                                {mainPost.mainImage ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={urlFor(mainPost.mainImage).width(1400).url()} alt={mainPost.title} />
                                ) : null}
                            </div>
                            <div className="flex flex-col justify-center gap-4" style={{ padding: 'clamp(4px, 2vw, 24px) clamp(12px, 2vw, 24px) clamp(16px, 2vw, 24px) 12px' }}>
                                <span style={{ fontSize: 14, color: 'var(--muted-2)' }}>
                                    Wyróżniony{mainPost.categories?.[0] ? <> · <span style={{ color: 'var(--accent)' }}>{mainPost.categories[0].title}</span></> : null}
                                </span>
                                <h2 className="ct-card-title" style={{ margin: 0, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', textWrap: 'balance' }}>{mainPost.title}</h2>
                                {mainPost.excerpt && <p className="line-clamp-4" style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--muted)' }}>{mainPost.excerpt}</p>}
                                <span style={{ fontSize: 14, color: 'var(--muted-2)' }}>
                                    {[mainPost.publishedAt && formatDate(mainPost.publishedAt), mainPost.estimatedReadingTime && `${mainPost.estimatedReadingTime} min czytania`].filter(Boolean).join(' · ')}
                                </span>
                            </div>
                        </Link>
                    )}

                    {regularPosts.length > 0 && (
                        <div className="flex flex-col gap-6" style={{ marginTop: 'clamp(24px, 4vw, 48px)' }}>
                            <h2 style={{ margin: 0, fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em' }}>Wszystkie artykuły</h2>
                            <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {regularPosts.map((post: any) => (
                                    <li key={post._id}>
                                        <BlogPostCard
                                            href={`/blog/${post.slug.current}`}
                                            title={post.title}
                                            image={post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined}
                                            meta={post.categories?.[0]?.title}
                                            excerpt={post.excerpt}
                                            footer={[post.publishedAt && formatDate(post.publishedAt), post.estimatedReadingTime && `${post.estimatedReadingTime} min`].filter(Boolean).join(' · ')}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {allPosts.length === 0 && (
                <section className="ct-section">
                    <div className="ct-tile mx-auto max-w-[1280px] text-center" style={{ padding: 'clamp(40px, 8vw, 80px) 24px' }}>
                        <p style={{ margin: 0, fontSize: 17, color: 'var(--muted)' }}>Artykuły pojawią się wkrótce.</p>
                    </div>
                </section>
            )}
        </main>
    );
}
