"use client";

import { useState, useEffect } from 'react';
import PageHero from '@/components/ui/PageHero';
import { CaseStudyCard } from '@/components/RealizacjeSection';
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
            <PageHero
                eyebrow="Realizacje"
                title="150+ projektów. Każdy inny."
                description="Marka, strona, sklep lub automatyzacja. Zobaczyć efekty to najlepszy sposób, żeby zrozumieć jak pracujemy."
            />

            {categories.length > 0 && (
                <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                    <div className="ct-shell-sm mx-auto flex max-w-[1280px] flex-wrap items-center gap-2" style={{ boxSizing: 'content-box' }}>
                        <span className="ct-meta" style={{ marginRight: 6, color: 'var(--muted-2)' }}>Filtruj</span>
                        {[{ _id: 'all', title: 'Wszystkie', slug: { current: 'all' } }, ...categories].map(cat => {
                            const active = selected === cat.slug.current;
                            return (
                                <button
                                    key={cat._id}
                                    onClick={() => setSelected(cat.slug.current)}
                                    aria-pressed={active}
                                    className="ct-pill ct-card-hover"
                                    style={{
                                        cursor: 'pointer',
                                        borderColor: active ? 'var(--accent)' : undefined,
                                        color: active ? 'var(--accent)' : undefined,
                                        background: active ? 'var(--accent-soft)' : undefined,
                                    }}
                                >{cat.title}</button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Grid */}
            <section className="ct-section">
                <div className="mx-auto max-w-[1280px]">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ borderRadius: 8, border: '1px solid var(--line-strong)', overflow: 'hidden', animation: 'ctpulse 1.5s ease-in-out infinite' }}>
                                    <div className="ct-placeholder" style={{ height: 220 }} />
                                    <div style={{ height: 110, background: '#fff' }} />
                                </div>
                            ))}
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filtered.map(project => (
                                <CaseStudyCard
                                    key={project._id}
                                    card={{
                                        key: project._id,
                                        href: `/portfolio/${project.slug.current}`,
                                        meta: project.client,
                                        title: project.title,
                                        description: project.categories?.map(c => c.title).join(' · ') || '',
                                        image: project.mainImage ? urlFor(project.mainImage).width(900).url() : undefined,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="ct-panel flex flex-col items-center gap-3 text-center" style={{ padding: 'clamp(40px, 8vw, 80px) 24px', background: 'var(--panel)' }}>
                            <div className="ct-meta">// brak wyników</div>
                            <p className="ct-body" style={{ fontSize: 15 }}>Brak projektów dla tej kategorii.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
