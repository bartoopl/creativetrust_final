"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
        // ... istniejący kod sample projects
    ];

    const sampleCategories = [
        // ... istniejący kod sample categories
    ];

    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [usingSampleData, setUsingSampleData] = useState<boolean>(false);
    const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

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
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h2 className="text-2xl mb-4 md:mb-0">Realizacje</h2>

                        {/* Przycisk filtrów na mobile */}
                        <div className="md:hidden w-full">
                            <button
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                                <span>Filtruj według kategorii</span>
                                <svg
                                    className={`w-5 h-5 transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Filtry w desktop */}
                        <div className="hidden md:flex flex-wrap gap-4">
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

                    {/* Filtry rozwijane na mobile */}
                    {showMobileFilters && (
                        <div className="md:hidden bg-gray-50 p-4 rounded-lg mt-2 border border-gray-200">
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setShowMobileFilters(false);
                                    }}
                                    className={`text-left px-3 py-2 rounded-md ${selectedCategory === 'all'
                                        ? 'bg-black text-white'
                                        : 'bg-white text-gray-800'}`}
                                >
                                    Wszystkie
                                </button>

                                {categories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() => {
                                            setSelectedCategory(category.slug.current);
                                            setShowMobileFilters(false);
                                        }}
                                        className={`text-left px-3 py-2 rounded-md ${
                                            selectedCategory === category.slug.current
                                                ? 'bg-black text-white'
                                                : 'bg-white text-gray-800'
                                        }`}
                                    >
                                        {category.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
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
                                    <div className="rounded-xl bg-gray-50 p-6 relative overflow-hidden mb-4 h-full">
                                        <div className="relative rounded-lg bg-gray-100 mb-4 overflow-hidden">
                                            {project.mainImage ? (
                                                <div className="w-full">
                                                    <img
                                                        src={urlFor(project.mainImage).width(800).url()}
                                                        alt={project.title}
                                                        className="w-full h-auto object-contain max-h-[300px] transition-all duration-500 group-hover:scale-105"
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