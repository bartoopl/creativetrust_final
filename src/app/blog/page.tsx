import Link from 'next/link';
import { Metadata } from 'next';
import { getBlogPosts, getBlogCategories, getFeaturedBlogPosts, urlFor } from '@/lib/sanity';
import { SITE_URL } from '@/lib/schema';

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

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 64px' }} className="px-4 pb-14 sm:px-6 lg:px-8">
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>BLOG</div>
                <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
                    Wiedza bez ogólników.
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.55, maxWidth: '52ch', margin: 0 }}>
                    Strategia marki, design, AI, e-commerce i automatyzacja. Piszemy o tym, co realnie zmienia wyniki.
                </p>
            </section>

            {/* Category nav */}
            {categories.length > 0 && (
                <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--panel2)' }}>
                    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 32px', display: 'flex', gap: 8, flexWrap: 'wrap' }} className="px-4 sm:px-6 lg:px-8">
                        <Link href="/blog" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, padding: '8px 16px', borderRadius: 999, border: '1px solid var(--accent)', background: 'color-mix(in srgb, var(--accent) 15%, var(--panel))', color: 'var(--text)', textDecoration: 'none' }}>Wszystkie</Link>
                        {categories.map((cat: any) => (
                            <Link key={cat._id} href={`/blog/kategoria/${cat.slug.current}`} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, padding: '8px 16px', borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', color: 'var(--muted)', textDecoration: 'none' }}>
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 32px 96px' }} className="px-4 py-14 sm:px-6 lg:px-8">

                {/* Featured post */}
                {mainPost && (
                    <div style={{ marginBottom: 64 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 24 }}>WYRÓŻNIONY ARTYKUŁ</div>
                        <Link href={`/blog/${mainPost.slug.current}`} className="ct-card-hover grid grid-cols-1 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--panel)] text-[var(--text)] no-underline lg:grid-cols-2" style={{ gap: 0, alignItems: 'stretch' }}>
                            <div style={{ background: 'var(--panel2)', overflow: 'hidden', minHeight: 340 }}>
                                {mainPost.mainImage ? (
                                    <img src={urlFor(mainPost.mainImage).width(800).url()} alt={mainPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>// brak zdjęcia</div>
                                )}
                            </div>
                            <div style={{ padding: '40px 40px 40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {mainPost.categories?.slice(0, 1).map((cat: any) => (
                                    <div key={cat._id} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>{cat.title}</div>
                                ))}
                                <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 34px)', letterSpacing: '-0.02em', lineHeight: 1.12, margin: '0 0 16px' }}>{mainPost.title}</h2>
                                {mainPost.excerpt && <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, margin: '0 0 24px' }}>{mainPost.excerpt}</p>}
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }}>
                                    {mainPost.publishedAt && <span>{formatDate(mainPost.publishedAt)}</span>}
                                    {mainPost.estimatedReadingTime && <span>· {mainPost.estimatedReadingTime} min</span>}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* All posts grid */}
                {regularPosts.length > 0 && (
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 32 }}>WSZYSTKIE ARTYKUŁY</div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {regularPosts.map((post: any) => (
                                <Link key={post._id} href={`/blog/${post.slug.current}`} className="ct-card-hover" style={{ textDecoration: 'none', color: 'var(--text)', display: 'flex', flexDirection: 'column', borderRadius: 20, background: 'var(--panel)', border: '1px solid var(--line)', overflow: 'hidden' }}>
                                    <div style={{ aspectRatio: '16/9', background: 'var(--panel2)', overflow: 'hidden' }}>
                                        {post.mainImage ? (
                                            <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>// brak</div>
                                        )}
                                    </div>
                                    <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        {post.categories?.slice(0, 1).map((cat: any) => (
                                            <div key={cat._id} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>{cat.title}</div>
                                        ))}
                                        <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, lineHeight: 1.25, margin: '0 0 10px' }}>{post.title}</h3>
                                        {post.excerpt && <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>{post.excerpt}</p>}
                                        <div style={{ display: 'flex', gap: 12, color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-mono), monospace', marginTop: 'auto' }}>
                                            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                                            {post.estimatedReadingTime && <span>· {post.estimatedReadingTime} min</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {allPosts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, marginBottom: 16 }}>// brak artykułów</div>
                        <p>Artykuły pojawią się wkrótce.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
