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
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '112px 72px 120px' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>BLOG</div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: '0 0 14px', maxWidth: '12ch' }}>
                        Wiedza bez ogólników.
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', maxWidth: '52ch', margin: 0 }}>
                        Strategia, design, AI, e-commerce i automatyzacja. Piszemy o tym, co realnie zmienia wyniki.
                    </p>
                </div>
            </section>

            {categories.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '18px 72px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <Link href="/blog" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, padding: '7px 14px', borderRadius: 4, border: '1px solid rgba(0,0,0,0.15)', background: 'rgba(0,0,0,0.04)', color: '#000', textDecoration: 'none' }}>Wszystkie</Link>
                        {categories.map((cat: any) => (
                            <Link key={cat._id} href={`/blog/kategoria/${cat.slug.current}`} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, padding: '7px 14px', borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)', background: 'transparent', color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 72px' }}>

                {mainPost && (
                    <div style={{ marginBottom: 64 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 20 }}>WYRÓŻNIONY ARTYKUŁ</div>
                        <Link href={`/blog/${mainPost.slug.current}`} className="ct-card-hover grid grid-cols-1 overflow-hidden text-[var(--text)] no-underline lg:grid-cols-2" style={{ gap: 0, alignItems: 'stretch', borderRadius: 4, border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                            <div style={{ background: 'var(--panel2)', overflow: 'hidden', minHeight: 340 }}>
                                {mainPost.mainImage ? (
                                    <img src={urlFor(mainPost.mainImage).width(800).url()} alt={mainPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>// brak zdjęcia</div>
                                )}
                            </div>
                            <div style={{ padding: '36px 36px 36px 42px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {mainPost.categories?.slice(0, 1).map((cat: any) => (
                                    <div key={cat._id} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 14 }}>{cat.title}</div>
                                ))}
                                <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(24px, 3vw, 43.1px)', letterSpacing: '-1.76px', lineHeight: '48.4px', margin: '0 0 14px' }}>{mainPost.title}</h2>
                                {mainPost.excerpt && <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: '0 0 24px' }}>{mainPost.excerpt}</p>}
                                <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }}>
                                    {mainPost.publishedAt && <span>{formatDate(mainPost.publishedAt)}</span>}
                                    {mainPost.estimatedReadingTime && <span>· {mainPost.estimatedReadingTime} min</span>}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {regularPosts.length > 0 && (
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 28 }}>WSZYSTKIE ARTYKUŁY</div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {regularPosts.map((post: any) => (
                                <Link key={post._id} href={`/blog/${post.slug.current}`} className="ct-card-hover" style={{ textDecoration: 'none', color: 'var(--text)', display: 'flex', flexDirection: 'column', borderRadius: 4, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                                    <div style={{ aspectRatio: '16/9', background: 'var(--panel2)', overflow: 'hidden' }}>
                                        {post.mainImage ? (
                                            <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>// brak</div>
                                        )}
                                    </div>
                                    <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        {post.categories?.slice(0, 1).map((cat: any) => (
                                            <div key={cat._id} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>{cat.title}</div>
                                        ))}
                                        <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, lineHeight: '24px', letterSpacing: '-0.8px', margin: '0 0 10px' }}>{post.title}</h3>
                                        {post.excerpt && <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: '0 0 16px', flex: 1 }}>{post.excerpt}</p>}
                                        <div style={{ display: 'flex', gap: 12, color: 'rgba(0,0,0,0.4)', fontSize: 12, fontFamily: 'var(--font-mono), monospace', marginTop: 'auto' }}>
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
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(0,0,0,0.6)' }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, marginBottom: 16 }}>// brak artykułów</div>
                        <p>Artykuły pojawią się wkrótce.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
