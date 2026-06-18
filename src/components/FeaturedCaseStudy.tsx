"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';

interface FeaturedProject {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    description: any;
}

const sampleProject: FeaturedProject = {
    _id: 'sample1',
    title: 'Strategic website rollout',
    slug: { current: 'strategic-website-rollout' },
    client: 'CreativeTrust',
    mainImage: null,
    description: 'Zintegrowany projekt strony, contentu i konwersji dla marki, która potrzebowała jasnego, bardziej dojrzałego przekazu.',
};

export default function FeaturedCaseStudy() {
    const [featuredProject, setFeaturedProject] = useState<FeaturedProject | null>(null);

    useEffect(() => {
        const fetchFeaturedProject = async () => {
            try {
                const data = await client.fetch(`
                    *[_type == "portfolioProject" && references(*[_type == "serviceCategory" && slug.current == "case-study"]._id)][0] {
                        _id,
                        title,
                        slug,
                        client,
                        mainImage,
                        description
                    }
                `);

                setFeaturedProject(data || sampleProject);
            } catch (error) {
                console.error('Błąd podczas pobierania wyróżnionego projektu:', error);
                setFeaturedProject(sampleProject);
            }
        };

        fetchFeaturedProject();
    }, []);

    if (!featuredProject) {
        return (
            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="h-[420px] animate-pulse rounded-[8px] border border-slate-200 bg-slate-100" />
                </div>
            </section>
        );
    }

    const description = Array.isArray(featuredProject.description)
        ? featuredProject.description[0]?.children?.[0]?.text || 'Zobacz szczegóły projektu.'
        : featuredProject.description || 'Zobacz szczegóły projektu.';

    return (
        <section className="w-full px-6 py-16 md:py-24">
            <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                <div className="mb-8 flex items-end justify-between gap-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Wybrane case study
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Jedna realizacja, która pokazuje jak łączymy design, treść i wykonanie.
                        </h2>
                    </div>
                    <Link href={`/portfolio/${featuredProject.slug.current}`} className="hidden text-sm font-medium text-slate-950 md:inline-flex">
                        Otwórz projekt
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-slate-50">
                        {featuredProject.mainImage ? (
                            <div className="relative aspect-[16/10]">
                                <Image
                                    src={urlFor(featuredProject.mainImage).url()}
                                    alt={featuredProject.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 65vw"
                                />
                            </div>
                        ) : (
                            <div className="flex aspect-[16/10] items-center justify-center bg-slate-100 text-sm text-slate-400">
                                Brak zdjęcia
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-between rounded-[8px] border border-slate-200 bg-white p-6 md:p-8">
                        <div>
                            <p className="text-sm font-medium text-slate-500">{featuredProject.client}</p>
                            <h3 className="mt-3 text-2xl font-medium text-slate-950 md:text-3xl">
                                {featuredProject.title}
                            </h3>
                            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                                {description.length > 180 ? `${description.slice(0, 180)}...` : description}
                            </p>
                        </div>

                        <div className="mt-10 grid gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
                            <div className="flex items-center justify-between">
                                <span>Zakres</span>
                                <span className="font-medium text-slate-950">Strategia / UX / wdrożenie</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Cel</span>
                                <span className="font-medium text-slate-950">Lepsza konwersja</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Format</span>
                                <span className="font-medium text-slate-950">Case study</span>
                            </div>
                        </div>

                        <Link
                            href={`/portfolio/${featuredProject.slug.current}`}
                            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-950"
                        >
                            Zobacz pełen projekt
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
