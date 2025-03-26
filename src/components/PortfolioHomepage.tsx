"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getPortfolioProjects, urlFor } from '@/lib/sanity';
import Button from './Button';

// Tworzymy prostszy komponent dla strony głównej
const PortfolioHomepage: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Przykładowe dane w przypadku braku połączenia z Sanity
    const sampleProjects = [
        {
            _id: 'sample1',
            title: 'Projekt Brandingowy XYZ',
            slug: { current: 'projekt-brandingowy-xyz' },
            client: 'XYZ Company',
            mainImage: null
        },
        {
            _id: 'sample2',
            title: 'Redesign UX dla ABC',
            slug: { current: 'redesign-ux-abc' },
            client: 'ABC Corporation',
            mainImage: null
        },
        {
            _id: 'sample3',
            title: 'Aplikacja Mobilna dla DEF',
            slug: { current: 'aplikacja-mobilna-def' },
            client: 'DEF Solutions',
            mainImage: null
        },
        {
            _id: 'sample4',
            title: 'Strona WWW dla GHI',
            slug: { current: 'strona-www-ghi' },
            client: 'GHI Company',
            mainImage: null
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Pobieramy wszystkie projekty, ale wyświetlamy tylko 4 najnowsze
                const projectsData = await getPortfolioProjects();

                if (projectsData && projectsData.length > 0) {
                    // Sortujemy według daty (od najnowszych) i bierzemy pierwsze 4
                    const sortedProjects = projectsData
                        .sort((a: any, b: any) => {
                            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                        })
                        .slice(0, 4);

                    setProjects(sortedProjects);
                } else {
                    // Używamy danych przykładowych jeśli nie ma projektów
                    setProjects(sampleProjects);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania projektów portfolio:', error);
                setProjects(sampleProjects);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="w-full py-16 md:py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl">Nasze realizacje</h2>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="rounded-xl bg-gray-100 p-6 h-72 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {projects.map((project) => (
                                <Link href={`/portfolio/${project.slug.current}`} key={project._id} className="block">
                                    <motion.div
                                        className="group relative"
                                        whileHover={{ scale: 0.98 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="rounded-xl bg-gray-50 p-6 relative overflow-hidden mb-4 h-full">
                                            <div className="relative rounded-lg bg-gray-100 mb-4 overflow-hidden">
                                                {project.mainImage ? (
                                                    <div className="w-full">
                                                        <img
                                                            src={urlFor(project.mainImage).width(800).url()}
                                                            alt={project.title}
                                                            className="w-full h-auto object-contain max-h-[180px] transition-all duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="aspect-[16/9] w-full flex items-center justify-center text-gray-400 text-sm">
                                                        Brak zdjęcia
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute bottom-6 left-6 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                                                <motion.div
                                                    className="flex items-center justify-center"
                                                    whileHover={{ rotate: 45 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="transform transition-transform group-hover:rotate-45"
                                                    >
                                                        <path
                                                            d="M7 17L17 7"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M7 7H17V17"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <div className="pl-2">
                                            <p className="text-gray-500 text-sm mb-1">{project.client}</p>
                                            <h3 className="text-xl font-medium">{project.title}</h3>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        <div className="flex justify-center mt-12">
                            <Button href="/portfolio">
                                Zobacz więcej realizacji
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default PortfolioHomepage;