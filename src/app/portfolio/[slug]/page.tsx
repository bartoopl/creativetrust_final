import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPortfolioProject, getPortfolioSlugs, urlFor } from '@/lib/sanity';
import PortableTextContent from '@/components/PortableTextContent';
import SchemaScript from '@/components/SchemaScript';
import { GalleryTrigger, ProjectGallery } from '@/components/ProjectGallery';
import { Project, Category, ImageWithCaption } from '@/types';
import { SITE_URL, buildBreadcrumbSchema, buildCreativeWorkSchema } from '@/lib/schema';
import { portableTextToPlainText, type PortableTextBlock } from '@/lib/markdown/portable-text';
import { projectCategories, projectSummary } from '@/lib/markdown/portfolio';

// Server-rendered so crawlers and AI agents that do not run JavaScript see the
// case study; regenerated hourly when the project changes in Sanity.
export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

type ProjectDocument = Project & { _updatedAt?: string };

async function loadProject(slug: string): Promise<ProjectDocument | null> {
    try {
        return (await getPortfolioProject(slug)) ?? null;
    } catch (error) {
        console.error('Błąd podczas ładowania projektu:', error);
        return null;
    }
}

function summaryOf(project: ProjectDocument, maxLength = 160) {
    return projectSummary(project, portableTextToPlainText(project.description as unknown as PortableTextBlock[] | string, maxLength));
}

export async function generateStaticParams() {
    try {
        const slugs = await getPortfolioSlugs();
        return slugs.map((slug) => ({ slug }));
    } catch {
        // Sanity unreachable at build time: pages render on first request instead.
        return [];
    }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const project = await loadProject(slug);
    if (!project) {
        return { title: 'Nie znaleziono projektu', robots: { index: false } };
    }

    const url = `${SITE_URL}/portfolio/${slug}`;
    const title = project.client && project.client !== project.title ? `${project.title} — realizacja dla ${project.client}` : `${project.title} — realizacja`;
    const description = summaryOf(project);
    const image = project.mainImage ? urlFor(project.mainImage).width(1200).height(630).fit('max').url() : undefined;

    return {
        title: `${title} | Portfolio`,
        description,
        alternates: {
            canonical: url,
            types: { 'text/markdown': `${url}.md` },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'CreativeTrust',
            locale: 'pl_PL',
            type: 'article',
            images: image ? [{ url: image }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

// Formatuj datę
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(dateString));
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

const imagePanel: CSSProperties = { background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer' };

export default async function ProjectPage({ params }: { params: Params }) {
    const { slug } = await params;
    const project = await loadProject(slug);
    if (!project) notFound();

    const url = `${SITE_URL}/portfolio/${slug}`;
    const galleryImages: ImageWithCaption[] = project.galleryImages ?? [];
    // Lightbox order: main image first, then the gallery.
    const lightboxImages: ImageWithCaption[] = [...(project.mainImage ? [project.mainImage] : []), ...galleryImages];
    const galleryOffset = project.mainImage ? 1 : 0;

    const schema = [
        buildCreativeWorkSchema({
            name: project.title,
            description: summaryOf(project, 500),
            url,
            clientName: project.client,
            dateCreated: project.publishedAt,
            image: lightboxImages.slice(0, 4).map((image) => urlFor(image).width(1200).fit('max').url()),
            keywords: projectCategories(project),
            sameAs: project.projectUrl,
        }),
        buildBreadcrumbSchema([
            { name: 'Strona główna', url: SITE_URL },
            { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
            { name: project.title, url },
        ]),
    ];

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <SchemaScript schema={schema} />
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

            <ProjectGallery images={lightboxImages}>
                <section className="ct-section">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                        {/* Lewa kolumna - główne zdjęcie i informacje */}
                        <div className="flex flex-col gap-8">
                            {project.mainImage && (
                                <GalleryTrigger index={0} label={`Powiększ zdjęcie projektu ${project.title}`} className="ct-card-hover group relative" style={{ ...imagePanel, padding: 16 }}>
                                    <img
                                        src={urlFor(project.mainImage).width(800).url()}
                                        alt={project.title}
                                        className="mx-auto h-auto max-h-[500px] w-full object-contain"
                                    />
                                    {zoomIcon}
                                </GalleryTrigger>
                            )}

                            <div className="ct-panel" style={{ padding: 24 }}>
                                <span className="ct-eyebrow">Projekt</span>
                                <h2 style={{ margin: '8px 0 16px', fontSize: 20, fontWeight: 500 }}>Informacje o projekcie</h2>

                                <div className="flex flex-col">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                        <h3 className="ct-meta" style={{ margin: 0 }}>Klient</h3>
                                        <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{project.client}</p>
                                    </div>

                                    {project.publishedAt && (
                                        <div className="flex flex-wrap items-baseline justify-between gap-2" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                            <h3 className="ct-meta" style={{ margin: 0 }}>Data realizacji</h3>
                                            <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>
                                                <time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time>
                                            </p>
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
                                    <h2 style={{ margin: '8px 0 16px', fontSize: 20, fontWeight: 500 }}>Zakres prac</h2>
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
                            {galleryImages.length > 0 && (
                                <div>
                                    <span className="ct-eyebrow">Galeria</span>
                                    <h2 style={{ margin: '8px 0 16px', fontSize: 20, fontWeight: 500 }}>Galeria projektu</h2>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {galleryImages.map((image, index) => {
                                            const alt = image.alt || `Zdjęcie ${index + 1} projektu ${project.title}`;
                                            return (
                                                <GalleryTrigger key={index} index={galleryOffset + index} label={`Powiększ: ${alt}`} className="ct-card-hover group relative" style={imagePanel}>
                                                    <div style={{ padding: 12 }}>
                                                        <img
                                                            src={urlFor(image).width(600).url()}
                                                            alt={alt}
                                                            loading="lazy"
                                                            className="mx-auto h-auto max-h-[300px] w-full object-contain"
                                                        />
                                                    </div>
                                                    {zoomIcon}
                                                    {image.caption && (
                                                        <div className="ct-body" style={{ padding: '10px 14px', fontSize: 13, borderTop: '1px solid var(--line)', background: '#fff' }}>
                                                            {image.caption}
                                                        </div>
                                                    )}
                                                </GalleryTrigger>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </ProjectGallery>
        </main>
    );
}
