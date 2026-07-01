import Link from 'next/link';
import { getBlogPosts, urlFor } from '@/lib/sanity';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage: any;
    publishedAt: string;
}

function formatMonthYear(dateString: string) {
    const date = new Date(dateString);
    const formatted = new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric' }).format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default async function BlogSection() {
    const posts: BlogPost[] = await getBlogPosts();

    if (!posts?.length) return null;

    const [featured, ...rest] = posts;
    const sideItems = rest.slice(0, 3);

    return (
        <section style={{ background: '#fff', padding: '72px 16px' }} className="lg:px-[72px] lg:py-[120px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }} className="lg:mb-16">
                    <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px', lineHeight: '18px' }}>Blog</span>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(28px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-1.76px', color: '#000', margin: 0 }}>
                        Wiedza, którą warto mieć.
                    </h2>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                    <Link
                        href={`/blog/${featured.slug.current}`}
                        style={{ textDecoration: 'none', color: 'inherit', flex: '2 1 0%', borderRadius: 4, background: 'rgba(0,0,0,0.04)', overflow: 'hidden', display: 'block' }}
                    >
                        <div style={{ height: 380, overflow: 'hidden', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {featured.mainImage && (
                                <img src={urlFor(featured.mainImage).width(1200).url()} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                        </div>
                        <div style={{ padding: 32 }} className="lg:p-10">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                                <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px', lineHeight: '20px' }}>Artykuł</span>
                                <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px', lineHeight: '18px' }}>{formatMonthYear(featured.publishedAt)}</span>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <h3 style={{ fontSize: 21.8, fontWeight: 500, lineHeight: '26.4px', letterSpacing: '-0.88px', color: '#000', margin: 0 }}>
                                    {featured.title}
                                </h3>
                                {featured.excerpt && (
                                    <p style={{ fontSize: 15.1, fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                        {featured.excerpt}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {sideItems.map((post, i) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    padding: '32px 0',
                                    borderBottom: i < sideItems.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px' }}>Artykuł</span>
                                    <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px' }}>{formatMonthYear(post.publishedAt)}</span>
                                </div>
                                <h4 style={{ fontSize: 17, fontWeight: 500, lineHeight: '26px', letterSpacing: '-0.36px', color: '#000', margin: 0 }}>
                                    {post.title}
                                </h4>
                                {post.excerpt && (
                                    <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.28px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                        {post.excerpt}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
