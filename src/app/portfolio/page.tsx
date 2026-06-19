"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPortfolioProjects, getServiceCategories, urlFor } from '@/lib/sanity';

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    categories: Category[];
}

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selected, setSelected] = useState<string>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [p, c] = await Promise.all([getPortfolioProjects(), getServiceCategories()]);
                if (p?.length) setProjects(p);
                if (c?.length) setCategories(c);
            } catch {}
            setLoading(false);
        };
        load();
    }, []);

    const filtered = selected === 'all'
        ? projects
        : projects.filter(p => p.categories?.some(c => c.slug.current === selected));

    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 64px' }} className="px-4 pb-14 sm:px-6 lg:px-8">
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>REALIZACJE</div>
                <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
                    150+ projektów. Każdy inny.
                </h1>
                <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.55, maxWidth: '52ch', margin: 0 }}>
                    Marka, strona, sklep lub automatyzacja. Zobaczyć efekty to najlepszy sposób, żeby zrozumieć jak pracujemy.
                </p>
            </section>

            {/* Filter */}
            {categories.length > 0 && (
                <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--panel2)' }}>
                    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 32px', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }} className="px-4 sm:px-6 lg:px-8">
                        {[{ _id: 'all', title: 'Wszystkie', slug: { current: 'all' } }, ...categories].map(cat => (
                            <button
                                key={cat._id}
                                onClick={() => setSelected(cat.slug.current)}
                                style={{
                                    fontFamily: 'var(--font-mono), monospace', fontSize: 13, cursor: 'pointer',
                                    padding: '8px 16px', borderRadius: 999, border: '1px solid',
                                    borderColor: selected === cat.slug.current ? 'var(--accent)' : 'var(--line)',
                                    background: selected === cat.slug.current ? 'color-mix(in srgb, var(--accent) 15%, var(--panel))' : 'transparent',
                                    color: selected === cat.slug.current ? 'var(--text)' : 'var(--muted)',
                                    transition: 'all .2s',
                                }}
                            >{cat.title}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* Grid */}
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 32px 96px' }} className="px-4 py-14 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ borderRadius: 20, background: 'var(--panel)', border: '1px solid var(--line)', aspectRatio: '16/10', animation: 'ctpulse 1.5s ease-in-out infinite' }} />
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {filtered.map(project => (
                            <Link key={project._id} href={`/portfolio/${project.slug.current}`} style={{ textDecoration: 'none', color: 'var(--text)', display: 'block', borderRadius: 20, background: 'var(--panel)', border: '1px solid var(--line)', overflow: 'hidden', transition: 'border-color .3s, transform .3s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <div style={{ aspectRatio: '16/9', background: 'var(--panel2)', overflow: 'hidden' }}>
                                    {project.mainImage ? (
                                        <img
                                            src={urlFor(project.mainImage).width(800).url()}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 13 }}>brak zdjęcia</div>
                                    )}
                                </div>
                                <div style={{ padding: '20px 24px' }}>
                                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.1em' }}>{project.client}</div>
                                    <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 19 }}>{project.title}</div>
                                    {project.categories?.length > 0 && (
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                                            {project.categories.map(c => (
                                                <span key={c._id} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', border: '1px solid var(--line)', padding: '3px 9px', borderRadius: 6 }}>{c.title}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, marginBottom: 16 }}>// brak wyników</div>
                        <p>Brak projektów dla tej kategorii.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
