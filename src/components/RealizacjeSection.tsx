 "use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPortfolioProjects, urlFor } from '@/lib/sanity';

type Project = {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage?: any;
    publishedAt?: string;
};

const fallbackRealizacje = [
    { _id: 'fallback-1', category: 'E-COMMERCE', title: 'Marka mody — redesign + headless', href: '/portfolio', mainImage: null },
    { _id: 'fallback-2', category: 'FINTECH', title: 'Onboarding sterowany AI', href: '/portfolio', mainImage: null },
    { _id: 'fallback-3', category: 'B2B SAAS', title: 'Strona i lejek sprzedażowy', href: '/portfolio', mainImage: null },
];

export default function RealizacjeSection() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        let alive = true;

        getPortfolioProjects()
            .then((items: Project[]) => {
                if (!alive) return;
                const latest = (items || [])
                    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
                    .slice(0, 3);
                setProjects(latest);
            })
            .catch(() => {
                if (alive) setProjects([]);
            });

        return () => {
            alive = false;
        };
    }, []);

    const items = projects.length > 0
        ? projects.map((project) => ({
            _id: project._id,
            category: project.client || 'REALIZACJA',
            title: project.title,
            href: `/portfolio/${project.slug.current}`,
            mainImage: project.mainImage,
        }))
        : fallbackRealizacje;

    return (
        <section id="realizacje" style={{ background: '#ffffff', borderTop: '1px solid var(--line)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '84px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
                            Case studies
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: 'var(--text)' }}>
                            Projekty, które działają.
                        </h2>
                    </div>
                    <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontFamily: 'var(--font-mono), monospace', fontWeight: 600 }}>
                        Wszystkie realizacje →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((r) => (
                        <Link key={r._id} href={r.href} style={{
                            textDecoration: 'none', color: 'var(--text)',
                            borderRadius: 18, overflow: 'hidden',
                            border: '1px solid var(--line)', background: '#ffffff',
                            display: 'flex', flexDirection: 'column',
                            transition: 'transform .3s, border-color .3s',
                            boxShadow: '0 12px 30px rgba(17,24,39,0.04)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                        >
                            <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: '#f7f7f7' }}>
                                {r.mainImage ? (
                                    <img
                                        src={urlFor(r.mainImage).width(900).url()}
                                        alt={r.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', color: 'var(--muted)', fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em' }}>
                                        [ realizacja ]
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '18px 18px 20px' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
                                    {r.category}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 16, margin: '0 0 10px', lineHeight: 1.2, color: 'var(--text)' }}>
                                    {r.title}
                                </h3>
                                <div style={{ color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.55, margin: 0 }}>
                                    Otwórz projekt i zobacz zakres, efekty oraz szczegóły wdrożenia.
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
