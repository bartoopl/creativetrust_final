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

    return (
        <section id="insights" style={{ background: '#f4f1ea', borderTop: '1px solid rgba(12,14,18,0.08)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '80px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 lg:mb-11 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: '#5b6472', textTransform: 'uppercase', marginBottom: 12 }}>
                            INSIGHTS
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 3.3vw, 40px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: '#11131a' }}>
                            Dzielimy się tym, co działa.
                        </h2>
                    </div>
                    <Link href="/blog" style={{ color: '#5b6472', textDecoration: 'none', fontSize: 13, fontFamily: 'var(--font-mono), monospace' }}>
                        Wszystkie artykuły →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {loading
                        ? staticPosts.map(p => (
                            <Link key={p._id} href={p.href} style={{
                                textDecoration: 'none', color: '#11131a',
                                borderRadius: 18, border: '1px solid rgba(12,14,18,0.10)', background: 'rgba(255,255,255,0.82)',
                                padding: 24, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 200,
                                transition: 'transform .3s, border-color .3s',
                                boxShadow: '0 10px 30px rgba(12,14,18,0.04)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(12,14,18,0.10)'; }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#5b6472', letterSpacing: '.1em' }}>{p.cat} · {p.time} min</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, lineHeight: 1.25, margin: 0, flex: 1 }}>{p.title}</h3>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)' }}>Czytaj →</span>
                            </Link>
                        ))
                        : posts.map(post => (
                            <Link key={post._id} href={`/blog/${post.slug.current}`} style={{
                                textDecoration: 'none', color: '#11131a',
                                borderRadius: 18, border: '1px solid rgba(12,14,18,0.10)', background: 'rgba(255,255,255,0.82)',
                                padding: 24, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 200,
                                transition: 'transform .3s, border-color .3s',
                                boxShadow: '0 10px 30px rgba(12,14,18,0.04)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(12,14,18,0.10)'; }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#5b6472', letterSpacing: '.1em' }}>
                                    {post.categories?.[0]?.title?.toUpperCase() ?? 'INSIGHTS'}
                                    {post.estimatedReadingTime ? ` · ${post.estimatedReadingTime} min` : ''}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, lineHeight: 1.25, margin: 0, flex: 1 }}>{post.title}</h3>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)' }}>Czytaj →</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
