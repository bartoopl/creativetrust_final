"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from '@/components/Lightbox';
import PortableTextContent from '@/components/PortableTextContent';
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

    const zoomIcon = (
        <span
            className="absolute flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ top: 12, right: 12, width: 36, height: 36, borderRadius: 'var(--radius-pill)', background: '#fff', border: '1px solid var(--line-strong)', color: 'var(--accent)' }}
            aria-hidden="true"
        >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
        </span>
    );

    const imagePanel: React.CSSProperties = { background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer' };

    if (loading) {
        return (
            <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
                <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-4">
                        <span className="ct-eyebrow">Portfolio</span>
                        <h1 className="ct-h1">Projekt wczytywany</h1>
                    </div>
                </section>
                <section className="ct-section">
                    <div className="ct-placeholder mx-auto max-w-[1280px]" style={{ height: 384, borderRadius: 'var(--radius-md)', border: '1px solid var(--line-strong)', animation: 'ctpulse 1.5s ease-in-out infinite' }} />
                </section>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="ct-section">
                <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6">
                    <h1 className="ct-h2">Projekt nie istnieje</h1>
                    <Link href="/portfolio" className="ct-link">
                        Wróć do portfolio
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
                    <Link href="/portfolio" className="ct-meta ct-contact-link" style={{ alignSelf: 'flex-start' }}>
                        ← Wróć do portfolio
                    </Link>
                    <span className="ct-eyebrow">Realizacje</span>
                    <h1 className="ct-h1" style={{ maxWidth: '20ch' }}>
                        {project.title}
                    </h1>
                    {project.categories && project.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.categories.map((category: Category) => (
                                <span key={category._id} className="ct-pill">{category.title}</span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="ct-section">
                <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    {/* Lewa kolumna - główne zdjęcie i informacje */}
                    <div className="flex flex-col gap-8">
                        {project.mainImage && (
                            <div className="ct-card-hover group relative" style={{ ...imagePanel, padding: 16 }} onClick={() => openLightbox(-1)}>
                                <img
                                    src={urlFor(project.mainImage).width(800).url()}
                                    alt={project.title}
                                    className="mx-auto h-auto max-h-[500px] w-full object-contain"
                                />
                                {zoomIcon}
                            </div>
                        )}

                        <div className="ct-panel" style={{ padding: 24 }}>
                            <span className="ct-eyebrow">Projekt</span>
                            <h2 style={{ margin: '8px 0 16px', fontSize: 20, fontWeight: 600 }}>Informacje o projekcie</h2>

                            <div className="flex flex-col">
                                <div className="flex flex-wrap items-baseline justify-between gap-2" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                    <h3 className="ct-meta" style={{ margin: 0 }}>Klient</h3>
                                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{project.client}</p>
                                </div>

                                {project.publishedAt && (
                                    <div className="flex flex-wrap items-baseline justify-between gap-2" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                        <h3 className="ct-meta" style={{ margin: 0 }}>Data realizacji</h3>
                                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{formatDate(project.publishedAt)}</p>
                                    </div>
                                )}

                                {project.categories && project.categories.length > 0 && (
                                    <div className="flex flex-col gap-2" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                        <h3 className="ct-meta" style={{ margin: 0 }}>Kategorie</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.categories.map((category: Category) => (
                                                <span key={category._id} className="ct-pill">
                                                    {category.title}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {project.projectUrl && (
                                    <div className="flex flex-col gap-3" style={{ padding: '12px 0 0', borderTop: '1px solid var(--line)' }}>
                                        <h3 className="ct-meta" style={{ margin: 0 }}>Link do projektu</h3>
                                        <a
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ct-cta sm"
                                            style={{ alignSelf: 'flex-start' }}
                                        >
                                            Zobacz realizację
                                            <span className="ct-badge" aria-hidden="true">
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Prawa kolumna - opis, zakres prac i galeria */}
                    <div className="flex flex-col gap-12">
                        <div>
                            {typeof project.description === 'string' ? (
                                <p className="ct-lead whitespace-pre-line">{project.description}</p>
                            ) : (
                                <PortableTextContent content={project.description} />
                            )}
                        </div>

                        {project.scopeOfWork && project.scopeOfWork.length > 0 && (
                            <div>
                                <span className="ct-eyebrow">Zakres</span>
                                <h2 style={{ margin: '8px 0 16px', fontSize: 20, fontWeight: 600 }}>Zakres prac</h2>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                    {project.scopeOfWork.map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-3" style={{ padding: '12px 0', borderTop: '1px solid var(--line)', fontSize: 14.5, color: 'var(--text-2)' }}>
                                            <span className="ct-bullet" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Galeria zdjęć z możliwością kliknięcia i otwarcia lighboxa */}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <div>
                                <span className="ct-eyebrow">Galeria</span>
                                <h2 style={{ margin: '8px 0 16px', fontSize: 20, fontWeight: 600 }}>Galeria projektu</h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {project.galleryImages.map((image: ImageWithCaption, index: number) => (
                                        <div
                                            key={index}
                                            className="ct-card-hover group relative"
                                            style={imagePanel}
                                            onClick={() => openLightbox(index)}
                                        >
                                            <div style={{ padding: 12 }}>
                                                <img
                                                    src={urlFor(image).width(600).url()}
                                                    alt={image.alt || `Zdjęcie ${index + 1} projektu ${project.title}`}
                                                    className="mx-auto h-auto max-h-[300px] w-full object-contain"
                                                />
                                            </div>
                                            {zoomIcon}
                                            {image.caption && (
                                                <div className="ct-body" style={{ padding: '10px 14px', fontSize: 13, borderTop: '1px solid var(--line)', background: '#fff' }}>
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
            </section>

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
