"use client";

import { useState } from 'react';
import CaseStudyCard, { type CaseCard } from '@/components/CaseStudyCard';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: { filter: 'Rodzaj', technology: 'Technologia', all: 'Wszystkie', empty: 'Brak projektów dla wybranych filtrów.', reset: 'Pokaż wszystkie', count: (n: number) => `${n} ${n === 1 ? 'projekt' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? 'projekty' : 'projektów'}` },
    en: { filter: 'Type', technology: 'Technology', all: 'All', empty: 'No projects match the selected filters.', reset: 'Show all', count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}` },
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
        <div role="group" aria-label={label} className="flex flex-wrap items-center gap-1.5">
            <span style={{ minWidth: 92, marginRight: 6, fontSize: 14, color: 'var(--muted-2)' }}>{label}</span>
            {[{ id: 'all', title: allLabel, slug: 'all' }, ...options].map((option) => (
                <button key={option.id} type="button" onClick={() => onSelect(option.slug)} aria-pressed={selected === option.slug} className="ct-chip">
                    {option.title}
                </button>
            ))}
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

    const filtering = selected !== 'all' || technology !== 'all';
    const reset = () => {
        setSelected('all');
        setTechnology('all');
    };

    return (
        <section className="ct-section" style={{ paddingTop: 'clamp(32px, 4vw, 48px)' }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                {(categories.length > 0 || technologies.length > 0) && (
                    <div className="flex flex-col gap-3">
                        {categories.length > 0 && <FilterRow label={t.filter} allLabel={t.all} options={categories} selected={selected} onSelect={setSelected} />}
                        {technologies.length > 0 && <FilterRow label={t.technology} allLabel={t.all} options={technologies} selected={technology} onSelect={setTechnology} />}
                    </div>
                )}

                <p aria-live="polite" style={{ margin: 0, fontSize: 14, color: 'var(--muted-2)' }}>{t.count(filtered.length)}</p>

                {filtered.length > 0 ? (
                    <ul key={`${selected}:${technology}`} className="ct-fade grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {filtered.map((item, index) => (
                            <li key={item.key}>
                                <CaseStudyCard card={item} priority={index < 3} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="ct-tile flex flex-col items-center gap-4 text-center" style={{ padding: 'clamp(40px, 8vw, 80px) 24px' }}>
                        <p style={{ margin: 0, fontSize: 17, color: 'var(--muted)' }}>{t.empty}</p>
                        {filtering && <button type="button" onClick={reset} className="ct-ghost">{t.reset}</button>}
                    </div>
                )}
            </div>
        </section>
    );
}
