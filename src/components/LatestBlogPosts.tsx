"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/sanity';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    publishedAt: string;
    estimatedReadingTime?: number;
    categories: Array<{ _id: string; title: string; slug: { current: string } }>;
}

export default function LatestBlogPosts() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogPosts()
            .then(p => setPosts(p.slice(0, 3)))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && posts.length === 0) return null;

    const staticPosts = [
        { _id: '1', title: 'Jak wdrażamy agentów AI w procesie projektowym', cat: 'AI', time: 6, href: '/blog' },
        { _id: '2', title: 'Headless commerce w 2026: co realnie się opłaca', cat: 'E-COMMERCE', time: 8, href: '/blog' },
        { _id: '3', title: 'Automatyzacja marketingu, która naprawdę sprzedaje', cat: 'MARKETING', time: 5, href: '/blog' },
    ];

    const cardStyle = {
        textDecoration: 'none',
        color: 'var(--text)',
        borderRadius: 18,
        border: '1px solid var(--line)',
        background: '#ffffff',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 200,
        transition: 'transform .3s, border-color .3s',
        boxShadow: '0 12px 30px rgba(17,24,39,0.04)',
    } as const;

    return (
        <section id="insights" style={{ background: '#ffffff', borderTop: '1px solid var(--line)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '84px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
                            Insights
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: 'var(--text)' }}>
                            Dzielimy się tym, co działa.
                        </h2>
                    </div>
                    <Link href="/blog" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontFamily: 'var(--font-mono), monospace', fontWeight: 600 }}>
                        Wszystkie artykuły →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {loading
                        ? staticPosts.map(p => (
                            <Link key={p._id} href={p.href} style={cardStyle}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', fontWeight: 600 }}>{p.cat} · {p.time} min</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.25, margin: 0, flex: 1, color: 'var(--text)' }}>{p.title}</h3>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>Czytaj →</span>
                            </Link>
                        ))
                        : posts.map(post => (
                            <Link key={post._id} href={`/blog/${post.slug.current}`} style={cardStyle}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', fontWeight: 600 }}>
                                    {post.categories?.[0]?.title?.toUpperCase() ?? 'INSIGHTS'}
                                    {post.estimatedReadingTime ? ` · ${post.estimatedReadingTime} min` : ''}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 18, lineHeight: 1.25, margin: 0, flex: 1, color: 'var(--text)' }}>{post.title}</h3>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>Czytaj →</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
