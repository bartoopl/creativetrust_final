"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from '@/components/Lightbox';
import { Project, Category, ImageWithCaption } from '@/types';
import { use } from 'react';

// Pobieranie danych projektu
async function getProject(slug: string) {
    return await client.fetch(`
    *[_type == "portfolioProject" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      mainImage,
      galleryImages,
      projectUrl,
      scopeOfWork,
      categories[]->{
        _id,
        title,
        slug
      },
      description,
      publishedAt
    }
  `, { slug });
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    // Rozpakowanie parametrów za pomocą React.use()
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Formatuj datę
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    useEffect(() => {
        async function loadProject() {
            try {
                const data = await getProject(slug);
                if (!data) {
                    notFound();
                }
                setProject(data);
            } catch (error) {
                console.error("Błąd podczas ładowania projektu:", error);
                notFound();
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [slug]);

    // Otwieranie Lightbox z określonym indeksem
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);

        // Opcjonalnie: zatrzymaj przewijanie strony podczas otwartego lightboxa
        document.body.style.overflow = 'hidden';
    };

    if (loading) {
        return (
            <main className="min-h-screen py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="h-96 w-full animate-pulse bg-gray-200 rounded-xl"></div>
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <div className="max-w-[1800px] mx-auto px-6 py-24">
                <h1 className="text-4xl font-medium mb-8">Projekt nie istnieje</h1>
                <Link href="/portfolio" className="underline">
                    Wróć do portfolio
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <Link href="/portfolio" className="text-gray-600 mb-12 block flex items-center">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                    >
                        <path
                            d="M19 12H5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 19L5 12L12 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Wróć do portfolio
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Lewa kolumna - główne zdjęcie i informacje */}
                    <div>
                        {project.mainImage && (
                            <div className="mb-8 overflow-hidden rounded-lg shadow-md bg-gray-50 p-4 cursor-pointer" onClick={() => openLightbox(-1)}>
                                <div className="w-full relative group">
                                    <img
                                        src={urlFor(project.mainImage).width(800).url()}
                                        alt={project.title}
                                        className="w-full h-auto object-contain max-h-[500px]"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <svg
                                            className="w-12 h-12 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-6 border-t border-gray-200 pt-6">
                            <h2 className="text-xl font-medium mb-4">Informacje o projekcie</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-gray-600 text-sm">Klient</h3>
                                    <p className="font-medium">{project.client}</p>
                                </div>

                                {project.publishedAt && (
                                    <div>
                                        <h3 className="text-gray-600 text-sm">Data realizacji</h3>
                                        <p className="font-medium">{formatDate(project.publishedAt)}</p>
                                    </div>
                                )}

                                {project.categories && project.categories.length > 0 && (
                                    <div>
                                        <h3 className="text-gray-600 text-sm">Kategorie</h3>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {project.categories.map((category: Category) => (
                                                <span
                                                    key={category._id}
                                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                                >
                                                    {category.title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.projectUrl && (
                                    <div>
                                        <h3 className="text-gray-600 text-sm mb-2">Link do projektu</h3>
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Zobacz realizację
                                            <svg
                                                className="ml-2 w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Prawa kolumna - opis, zakres prac i galeria */}
                    <div>
                        <h1 className="text-4xl font-medium mb-6">{project.title}</h1>

                        <div className="prose max-w-none mb-8">
                            <p className="whitespace-pre-line text-lg">{project.description}</p>
                        </div>

                        {project.scopeOfWork && project.scopeOfWork.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-medium mb-4">Zakres prac</h2>
                                <ul className="space-y-2">
                                    {project.scopeOfWork.map((item: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-black mr-2">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Galeria zdjęć z możliwością kliknięcia i otwarcia lighboxa */}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-xl font-medium mb-6">Galeria projektu</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.galleryImages.map((image: ImageWithCaption, index: number) => (
                                        <div
                                            key={index}
                                            className="rounded-lg overflow-hidden shadow-md bg-gray-50 p-3 cursor-pointer group"
                                            onClick={() => openLightbox(index)}
                                        >
                                            <div className="w-full relative">
                                                <img
                                                    src={urlFor(image).width(600).url()}
                                                    alt={image.alt || `Zdjęcie ${index + 1} projektu ${project.title}`}
                                                    className="w-full h-auto object-contain max-h-[300px] transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <svg
                                                        className="w-10 h-10 text-white"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            {image.caption && (
                                                <div className="p-2 bg-gray-50 text-sm text-gray-600">
                                                    {image.caption}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox dla obrazów galerii */}
            {project.galleryImages && lightboxOpen && (
                <Lightbox
                    images={lightboxIndex === -1 ? [project.mainImage, ...project.galleryImages] : project.galleryImages}
                    initialIndex={lightboxIndex === -1 ? 0 : lightboxIndex}
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </main>
    );
}