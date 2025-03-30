"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { client, urlFor } from '@/lib/sanity';

interface FeaturedProject {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    description: string;
}

const FeaturedCaseStudy: React.FC = () => {
    const [featuredProject, setFeaturedProject] = useState<FeaturedProject | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Przykładowy projekt na wypadek braku połączenia z Sanity
    const sampleProject: FeaturedProject = {
        _id: 'sample1',
        title: 'Fintech Dello Banking App',
        slug: { current: 'fintech-dello-banking-app' },
        client: 'Booking Corp.',
        mainImage: null,
        description: 'Kompleksowy projekt aplikacji bankowej z funkcjami wymiany walut i zarządzania inwestycjami.'
    };

    useEffect(() => {
        const fetchFeaturedProject = async () => {
            try {
                setIsLoading(true);
                // Pobierz najnowszy projekt z kategorią "case-study"
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
                setIsLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania wyróżnionego projektu:', error);
                setFeaturedProject(sampleProject);
                setIsLoading(false);
            }
        };

        fetchFeaturedProject();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full py-16 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!featuredProject) return null;

    return (
        <section className="w-full py-16 md:py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="bg-gray-100 rounded-xl p-6 md:p-10">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-2/3 relative rounded-lg overflow-hidden mb-8 md:mb-0 md:mr-10">
                            {featuredProject.mainImage ? (
                                <div className="aspect-[16/9] relative">
                                    <Image
                                        src={urlFor(featuredProject.mainImage).url()}
                                        alt={featuredProject.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[16/9] bg-gray-200 relative flex items-center justify-center">
                                    <span className="text-gray-400">Brak zdjęcia</span>
                                </div>
                            )}

                            <div className="absolute bottom-4 left-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
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
                            </div>
                        </div>

                        <div className="w-full md:w-1/3">
                            <div className="mb-2 text-gray-500">{featuredProject.client}</div>
                            <h3 className="text-2xl md:text-3xl font-medium mb-4">{featuredProject.title}</h3>
                            <p className="text-gray-700 mb-6">
                                {featuredProject.description.length > 120
                                    ? `${featuredProject.description.substring(0, 120)}...`
                                    : featuredProject.description}
                            </p>

                            <Link href={`/portfolio/${featuredProject.slug.current}`}>
                                <motion.div
                                    className="inline-flex items-center text-black font-medium"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Zobacz case study
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-2"
                                    >
                                        <path
                                            d="M5 12H19"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 5L19 12L12 19"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCaseStudy;