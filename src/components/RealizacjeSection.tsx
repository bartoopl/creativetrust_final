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
    {
        _id: 'fallback-1',
        category: 'E-COMMERCE',
        title: 'Marka mody — redesign + headless',
        metrics: [{ value: '+48%', label: 'konwersja' }, { value: '−60%', label: 'czas ładowania' }],
        href: '/portfolio',
    },
    {
        _id: 'fallback-2',
        category: 'FINTECH',
        title: 'Onboarding sterowany AI',
        metrics: [{ value: '−35%', label: 'porzuceń' }, { value: '+22', label: 'NPS' }],
        href: '/portfolio',
    },
    {
        _id: 'fallback-3',
        category: 'B2B SAAS',
        title: 'Strona i lejek sprzedażowy',
        metrics: [{ value: '3×', label: 'więcej leadów MQL' }],
        href: '/portfolio',
    },
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
        <section id="realizacje" style={{
            '--panel': '#11131a',
            '--panel2': '#0c0d12',
            '--line': 'rgba(255,255,255,0.08)',
            '--text': '#f5f7fb',
            '--muted': '#9ca3af',
            '--glow': 'rgba(255,106,61,0.20)',
            background: 'var(--bg)',
            color: 'var(--text)',
            borderTop: '1px solid var(--line)',
        } as React.CSSProperties}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 32px 84px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>
                            REALIZACJE
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04 }}>
                            Efekty, nie obietnice.
                        </h2>
                    </div>
                    <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', textDecoration: 'none', fontSize: 13, borderBottom: '1px solid var(--accent)', paddingBottom: 3 }}>
                        Wszystkie realizacje <span style={{ fontFamily: 'var(--font-mono), monospace' }}>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((r) => (
                        <Link key={r._id} href={r.href} style={{
                            textDecoration: 'none', color: 'var(--text)',
                            borderRadius: 16, overflow: 'hidden',
                            border: '1px solid var(--line)', background: 'var(--panel)',
                            display: 'flex', flexDirection: 'column',
                            transition: 'transform .3s, border-color .3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                        >
                            <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', background: 'var(--panel2)' }}>
                                {r.mainImage ? (
                                    <img
                                        src={urlFor(r.mainImage).width(900).url()}
                                        alt={r.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'repeating-linear-gradient(135deg, var(--panel2) 0 11px, color-mix(in srgb, var(--accent) 7%, var(--panel2)) 11px 22px)',
                                    }}>
                                        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>[ realizacja ]</span>
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(180deg, transparent 35%, rgba(8,8,12,0.55) 100%)',
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    left: 18,
                                    bottom: 16,
                                    zIndex: 1,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '6px 10px',
                                    borderRadius: 999,
                                    background: 'color-mix(in srgb, var(--bg) 62%, transparent)',
                                    border: '1px solid var(--line)',
                                    backdropFilter: 'blur(8px)',
                                    fontFamily: 'var(--font-mono), monospace',
                                    fontSize: 11,
                                    letterSpacing: '.12em',
                                    textTransform: 'uppercase',
                                }}>
                                    Najnowsza realizacja
                                </div>
                            </div>
                            <div style={{ padding: '18px 18px 20px' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'var(--accent)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                                    {r.category}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 17, margin: '0 0 10px', lineHeight: 1.2 }}>
                                    {r.title}
                                </h3>
                                <div style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>
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
