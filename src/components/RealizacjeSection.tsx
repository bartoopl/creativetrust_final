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
        <section id="realizacje" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 72px' }}>
                <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                            Realizacje
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0, color: '#000000' }}>
                            Projekty, które działają.
                        </h2>
                    </div>
                    <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(0,0,0,0.6)', textDecoration: 'none', fontSize: 13.2, fontFamily: 'var(--font-mono), monospace', fontWeight: 500 }}>
                        Wszystkie realizacje →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-12">
                    {items.map((r) => (
                        <Link key={r._id} href={r.href} style={{
                            textDecoration: 'none', color: 'var(--text)',
                            borderRadius: 4, overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.08)', background: '#ffffff',
                            display: 'flex', flexDirection: 'column',
                            transition: 'transform .3s, border-color .3s',
                            boxShadow: 'none',
                            gridColumn: r._id === items[0]?._id ? 'span 7' : 'span 5',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                        >
                            <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: '#f7f7f7' }}>
                                {r.mainImage ? (
                                    <img
                                        src={urlFor(r.mainImage).width(900).url()}
                                        alt={r.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', color: 'rgba(0,0,0,0.4)', fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em' }}>
                                        [ realizacja ]
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', letterSpacing: '.5px', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500 }}>
                                    {r.category}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 10px', lineHeight: '24px', letterSpacing: '-0.8px', color: '#000000' }}>
                                    {r.title}
                                </h3>
                                <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0 }}>
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
