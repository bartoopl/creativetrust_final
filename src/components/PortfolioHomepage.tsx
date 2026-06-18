"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPortfolioProjects, urlFor } from '@/lib/sanity';

type Project = {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    publishedAt?: string;
};

export default function PortfolioHomepage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const sampleProjects: Project[] = [
        { _id: 'sample1', title: 'Brand system dla marki retail', slug: { current: 'brand-system-retail' }, client: 'XYZ Company', mainImage: null },
        { _id: 'sample2', title: 'Redesign i optymalizacja konwersji', slug: { current: 'redesign-konwersji' }, client: 'ABC Corporation', mainImage: null },
        { _id: 'sample3', title: 'Sklep headless i migracja', slug: { current: 'sklep-headless-migracja' }, client: 'DEF Solutions', mainImage: null },
        { _id: 'sample4', title: 'Strona usługowa z lead flow', slug: { current: 'strona-uslugowa-lead-flow' }, client: 'GHI Company', mainImage: null },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await getPortfolioProjects();
                const sortedProjects = (projectsData || [])
                    .sort((a: Project, b: Project) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
                    .slice(0, 4);

                setProjects(sortedProjects.length > 0 ? sortedProjects : sampleProjects);
            } catch (error) {
                console.error('Błąd podczas pobierania projektów portfolio:', error);
                setProjects(sampleProjects);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="w-full px-6 py-16 md:py-24">
            <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                <div className="mb-8 flex items-end justify-between gap-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Realizacje
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Wybrane projekty, które pokazują sposób myślenia, a nie tylko ładny obrazek.
                        </h2>
                    </div>
                    <Link href="/portfolio" className="hidden text-sm font-medium text-slate-950 md:inline-flex">
                        Zobacz wszystkie
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="h-80 animate-pulse rounded-[8px] border border-slate-200 bg-slate-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {projects.map((project) => (
                            <Link key={project._id} href={`/portfolio/${project.slug.current}`} className="group block">
                                <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white transition-transform group-hover:-translate-y-1">
                                    <div className="relative aspect-[4/3] bg-slate-100">
                                        {project.mainImage ? (
                                            <Image
                                                src={urlFor(project.mainImage).width(900).url()}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                sizes="(max-width: 1280px) 50vw, 25vw"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                                Brak zdjęcia
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                            {project.client}
                                        </p>
                                        <h3 className="mt-3 text-lg font-medium text-slate-950">
                                            {project.title}
                                        </h3>
                                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-950">
                                            Otwórz projekt
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 5L19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="mt-10 md:hidden">
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-slate-950">
                        Zobacz wszystkie realizacje
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
