"use client";

import { useState } from 'react';
import CaseStudyCard, { type CaseCard } from '@/components/CaseStudyCard';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: { filter: 'Filtruj', technology: 'Technologia', all: 'Wszystkie', none: '// brak wyników', empty: 'Brak projektów dla wybranych filtrów.' },
    en: { filter: 'Filter', technology: 'Technology', all: 'All', none: '// no results', empty: 'No projects match the selected filters.' },
};

export interface PortfolioGridItem extends CaseCard {
    categorySlugs: string[];
    technologySlugs?: string[];
}

export interface PortfolioFilter {
    id: string;
    title: string;
    slug: string;
}

function FilterRow({ label, allLabel, options, selected, onSelect }: { label: string; allLabel: string; options: PortfolioFilter[]; selected: string; onSelect: (slug: string) => void }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="ct-meta" style={{ marginRight: 6, color: 'var(--muted-2)' }}>{label}</span>
            {[{ id: 'all', title: allLabel, slug: 'all' }, ...options].map((option) => {
                const active = selected === option.slug;
                return (
                    <button
                        key={option.id}
                        onClick={() => onSelect(option.slug)}
                        aria-pressed={active}
                        className="ct-pill ct-card-hover"
                        style={{
                            cursor: 'pointer',
                            borderColor: active ? 'var(--accent)' : undefined,
                            color: active ? 'var(--accent)' : undefined,
                            background: active ? 'var(--accent-soft)' : undefined,
                        }}
                    >{option.title}</button>
                );
            })}
        </div>
    );
}

/**
 * Category and technology filters over a server-rendered project list: every
 * card is in the HTML (crawlers see all case studies), the filters only hide
 * the others. The technology row appears once a project has a technology.
 */
export default function PortfolioGrid({
    items,
    categories,
    technologies = [],
    locale = 'pl',
}: {
    items: PortfolioGridItem[];
    categories: PortfolioFilter[];
    technologies?: PortfolioFilter[];
    locale?: Locale;
}) {
    const t = copy[locale];
    const [selected, setSelected] = useState<string>('all');
    const [technology, setTechnology] = useState<string>('all');

    const filtered = items.filter(
        (item) =>
            (selected === 'all' || item.categorySlugs.includes(selected)) &&
            (technology === 'all' || (item.technologySlugs ?? []).includes(technology)),
    );

    return (
        <>
            {(categories.length > 0 || technologies.length > 0) && (
                <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                    <div className="ct-shell-sm mx-auto flex max-w-[1280px] flex-col gap-3" style={{ boxSizing: 'content-box' }}>
                        {categories.length > 0 && <FilterRow label={t.filter} allLabel={t.all} options={categories} selected={selected} onSelect={setSelected} />}
                        {technologies.length > 0 && <FilterRow label={t.technology} allLabel={t.all} options={technologies} selected={technology} onSelect={setTechnology} />}
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
                            <div className="ct-meta">{t.none}</div>
                            <p className="ct-body" style={{ fontSize: 15 }}>{t.empty}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
