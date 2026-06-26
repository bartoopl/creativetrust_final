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
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '112px 72px 120px' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>REALIZACJE</div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: '0 0 14px', maxWidth: '12ch' }}>
                    150+ projektów. Każdy inny.
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', maxWidth: '52ch', margin: 0 }}>
                        Marka, strona, sklep lub automatyzacja. Zobaczyć efekty to najlepszy sposób, żeby zrozumieć jak pracujemy.
                    </p>
                </div>
            </section>

            {categories.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '18px 72px', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        {[{ _id: 'all', title: 'Wszystkie', slug: { current: 'all' } }, ...categories].map(cat => (
                            <button
                                key={cat._id}
                                onClick={() => setSelected(cat.slug.current)}
                                style={{
                                    fontFamily: 'var(--font-mono), monospace', fontSize: 12, cursor: 'pointer',
                                    padding: '7px 14px', borderRadius: 4, border: '1px solid',
                                    borderColor: selected === cat.slug.current ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)',
                                    background: selected === cat.slug.current ? 'rgba(0,0,0,0.04)' : 'transparent',
                                    color: selected === cat.slug.current ? '#000' : 'rgba(0,0,0,0.6)',
                                    transition: 'all .2s',
                                }}
                            >{cat.title}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* Grid */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 72px' }}>
                {loading ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} style={{ borderRadius: 4, background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', aspectRatio: '16/10', animation: 'ctpulse 1.5s ease-in-out infinite' }} />
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {filtered.map(project => (
                            <Link key={project._id} href={`/portfolio/${project.slug.current}`} style={{ textDecoration: 'none', color: '#000', display: 'block', borderRadius: 4, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'border-color .3s, transform .3s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'none'; }}
                            >
                                <div style={{ aspectRatio: '16/9', background: 'var(--panel2)', overflow: 'hidden' }}>
                                    {project.mainImage ? (
                                        <img
                                            src={urlFor(project.mainImage).width(800).url()}
                                            alt={project.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                                        />
                                    ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 13 }}>brak zdjęcia</div>
                                        )}
                                </div>
                                <div style={{ padding: '20px 24px' }}>
                                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.5px' }}>{project.client}</div>
                                    <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, letterSpacing: '-0.8px' }}>{project.title}</div>
                                    {project.categories?.length > 0 && (
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                                            {project.categories.map(c => (
                                                <span key={c._id} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,0,0,0.08)', padding: '3px 9px', borderRadius: 4 }}>{c.title}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(0,0,0,0.6)' }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, marginBottom: 16 }}>// brak wyników</div>
                        <p>Brak projektów dla tej kategorii.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
