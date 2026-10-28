"use client";

import { useState } from 'react';
import CaseStudyCard, { type CaseCard } from '@/components/CaseStudyCard';

export interface PortfolioGridItem extends CaseCard {
    categorySlugs: string[];
}

export interface PortfolioFilter {
    id: string;
    title: string;
    slug: string;
}

/**
 * Category filter over a server-rendered project list: every card is in the
 * HTML (crawlers see all case studies), the filter only hides the others.
 */
export default function PortfolioGrid({ items, categories }: { items: PortfolioGridItem[]; categories: PortfolioFilter[] }) {
    const [selected, setSelected] = useState<string>('all');

    const filtered = selected === 'all' ? items : items.filter((item) => item.categorySlugs.includes(selected));

    return (
        <>
            {categories.length > 0 && (
                <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                    <div className="ct-shell-sm mx-auto flex max-w-[1280px] flex-wrap items-center gap-2" style={{ boxSizing: 'content-box' }}>
                        <span className="ct-meta" style={{ marginRight: 6, color: 'var(--muted-2)' }}>Filtruj</span>
                        {[{ id: 'all', title: 'Wszystkie', slug: 'all' }, ...categories].map(cat => {
                            const active = selected === cat.slug;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelected(cat.slug)}
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
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filtered.map(item => (
                                <CaseStudyCard key={item.key} card={item} />
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
        </>
    );
}
