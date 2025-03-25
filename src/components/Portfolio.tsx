"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPortfolioProjects, getServiceCategories, urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';

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

const Portfolio: React.FC = () => {
    // Przykładowe dane do użycia, gdy nie można połączyć się z Sanity
    const sampleProjects = [
        {
            _id: 'sample1',
            title: 'Projekt Brandingowy XYZ',
            slug: { current: 'projekt-brandingowy-xyz' },
            client: 'XYZ Company',
            mainImage: null, // Brak zdjęcia w danych przykładowych
            categories: [{ _id: 'cat1', title: 'Branding', slug: { current: 'branding' } }],
            description: 'Przykładowy opis projektu brandingowego.'
        },
        {
            _id: 'sample2',
            title: 'Redesign UX dla ABC',
            slug: { current: 'redesign-ux-abc' },
            client: 'ABC Corporation',
            mainImage: null,
            categories: [{ _id: 'cat2', title: 'UX/UI Designs', slug: { current: 'ux-ui' } }],
            description: 'Przykładowy opis projektu UX/UI.'
        },
        {
            _id: 'sample3',
            title: 'Aplikacja Mobilna dla DEF',
            slug: { current: 'aplikacja-mobilna-def' },
            client: 'DEF Solutions',
            mainImage: null,
            categories: [{ _id: 'cat3', title: 'Mobile', slug: { current: 'mobile' } }],
            description: 'Przykładowy opis aplikacji mobilnej.'
        }
    ];

    const sampleCategories = [
        { _id: 'cat1', title: 'Branding', slug: { current: 'branding' } },
        { _id: 'cat2', title: 'UX/UI Designs', slug: { current: 'ux-ui' } },
        { _id: 'cat3', title: 'Mobile', slug: { current: 'mobile' } },
        { _id: 'cat4', title: 'Web Development', slug: { current: 'web-development' } }
    ];

    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [usingSampleData, setUsingSampleData] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const projectsData = await getPortfolioProjects();
                const categoriesData = await getServiceCategories();

                // Sprawdź, czy dane zostały pomyślnie pobrane
                if (projectsData && projectsData.length > 0 && categoriesData && categoriesData.length > 0) {
                    setProjects(projectsData);
                    setCategories(categoriesData);
                    setUsingSampleData(false);
                } else {
                    // Użyj danych przykładowych, jeśli nie ma danych z Sanity
                    console.log("Używam danych przykładowych, ponieważ nie znaleziono danych w Sanity");
                    setProjects(sampleProjects);
                    setCategories(sampleCategories);
                    setUsingSampleData(true);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
                // W przypadku błędu użyj danych przykładowych
                setProjects(sampleProjects);
                setCategories(sampleCategories);
                setIsLoading(false);
                setError(true);
                setUsingSampleData(true);
            }
        };

        fetchData();
    }, []);

    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects.filter(project =>
            project.categories.some(category => category.slug.current === selectedCategory)
        );

    return (
        <section className="w-full py-16 md:py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <h2 className="text-2xl mb-6 md:mb-0">Realizacje</h2>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 text-sm transition-colors ${selectedCategory === 'all' ? 'text-black font-medium' : 'text-gray-500'}`}
                        >
                            Wszystkie
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category._id}
                                onClick={() => setSelectedCategory(category.slug.current)}
                                className={`px-4 py-2 text-sm transition-colors ${selectedCategory === category.slug.current ? 'text-black font-medium' : 'text-gray-500'}`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <p>Ładowanie projektów...</p>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProjects.map((project) => (
                            <Link href={`/portfolio/${project.slug.current}`} key={project._id} className="block">
                                <motion.div
                                    className="group relative"
                                    whileHover={{ scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="rounded-xl bg-gray-100 p-6 relative overflow-hidden mb-4">
                                        <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-200 mb-2 mx-auto w-4/5">
                                            {project.mainImage ? (
                                                <Image
                                                    src={urlFor(project.mainImage).url()}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover transition-all duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
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
                ) : (
                    <div className="text-center py-12">
                        {selectedCategory !== 'all' ? (
                            <p>Brak projektów dla wybranej kategorii.</p>
                        ) : (
                            <div>
                                <p className="mb-4">Brak projektów w portfolio.</p>
                                <p className="text-gray-500 text-sm">
                                    Przed poprawnym wyświetleniem projektów upewnij się, że:
                                </p>
                                <ul className="text-gray-500 text-sm list-disc list-inside mt-2">
                                    <li>ID projektu Sanity jest poprawnie skonfigurowane w zmiennych środowiskowych</li>
                                    <li>Projekty zostały dodane w Sanity Studio</li>
                                    <li>Twoje uprawnienia i tokeny dostępu są prawidłowe</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {usingSampleData && (
                    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-yellow-800 text-sm">
                            <strong>Uwaga:</strong> Aktualnie wyświetlane są przykładowe dane, ponieważ nie udało się połączyć z Sanity lub nie znaleziono danych.
                            Dodaj projekty w Sanity Studio lub sprawdź konfigurację połączenia.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Portfolio;