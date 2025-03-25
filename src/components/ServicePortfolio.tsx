"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getPortfolioProjectsByCategory, urlFor } from '@/lib/sanity';

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
}

interface ServicePortfolioProps {
    categorySlug: string;
}

const ServicePortfolio: React.FC<ServicePortfolioProps> = ({ categorySlug }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Dane przykładowe
    const sampleWebsiteProjects = [
        {
            _id: 'sample1',
            title: 'Strona korporacyjna XYZ',
            slug: { current: 'strona-korporacyjna-xyz' },
            client: 'XYZ Company',
            mainImage: null
        },
        {
            _id: 'sample2',
            title: 'E-commerce dla ABC',
            slug: { current: 'ecommerce-dla-abc' },
            client: 'ABC Retail',
            mainImage: null
        },
        {
            _id: 'sample3',
            title: 'Portal informacyjny DEF',
            slug: { current: 'portal-informacyjny-def' },
            client: 'DEF Media',
            mainImage: null
        },
        {
            _id: 'sample4',
            title: 'Aplikacja webowa GHI',
            slug: { current: 'aplikacja-webowa-ghi' },
            client: 'GHI Solutions',
            mainImage: null
        }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const data = await getPortfolioProjectsByCategory(categorySlug);

                if (data && data.length > 0) {
                    setProjects(data);
                } else {
                    // Użyj danych przykładowych jeśli nie ma rzeczywistych projektów
                    setProjects(sampleWebsiteProjects);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania projektów:', error);
                setProjects(sampleWebsiteProjects);
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [categorySlug]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-xl bg-gray-100 p-6 h-72 animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p>Nie znaleziono projektów w tej kategorii.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project) => (
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
                                        {/* Placeholder dla braku zdjęcia */}
                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
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
    );
};

export default ServicePortfolio;