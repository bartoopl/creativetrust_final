import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPortfolioProject, getPortfolioProjects, urlFor } from '@/lib/cms';
import CaseStudyCard from '@/components/CaseStudyCard';
import PortableTextContent from '@/components/PortableTextContent';
import SchemaScript from '@/components/SchemaScript';
import { GalleryTrigger, ProjectGallery } from '@/components/ProjectGallery';
import { Project, ImageWithCaption, Technology } from '@/types';
import { SITE_URL, buildBreadcrumbSchema, buildCreativeWorkSchema } from '@/lib/schema';
import { portableTextToPlainText, type PortableTextBlock } from '@/lib/markdown/portable-text';
import { projectCategories, projectSummary, projectTechnologies } from '@/lib/markdown/portfolio';

// Rendered on request from cached CMS data (src/lib/cms.ts); saving in the
// admin refreshes it immediately, otherwise it is re-read hourly.

type Params = Promise<{ slug: string }>;

type ProjectDocument = Project & { _updatedAt?: string };

// CMS errors are thrown, not turned into a 404 (a database hiccup must not
// tell Google the case study is gone).
async function loadProject(slug: string): Promise<ProjectDocument | null> {
    return (await getPortfolioProject(slug)) ?? null;
}

const hasAsset = (image: unknown): boolean => Boolean((image as { asset?: unknown } | null | undefined)?.asset);

function summaryOf(project: ProjectDocument, maxLength = 160) {
    return projectSummary(project, portableTextToPlainText(project.description as unknown as PortableTextBlock[] | string, maxLength));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const project = await loadProject(slug);
    if (!project) {
        return { title: 'Nie znaleziono projektu', robots: { index: false } };
    }

    const url = `${SITE_URL}/portfolio/${slug}`;
    const name = project.title.replace(/\s+/g, ' ').trim();
    const client = project.client?.replace(/\s+/g, ' ').trim();
    const title = client && client.toLowerCase() !== name.toLowerCase() ? `${name} — realizacja dla ${client}` : `${name} — realizacja`;
    const description = summaryOf(project);
    const image = hasAsset(project.mainImage) ? urlFor(project.mainImage).width(1200).height(630).fit('max').url() : undefined;

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

interface ProjectCard {
    _id: string;
    title: string;
    slug: { current: string } | null;
    client?: string;
    mainImage?: unknown;
    categories?: { title: string }[];
}

/** The next projects in portfolio order (wrapping around), so every case study links onward. */
async function loadMoreProjects(slug: string, count = 3): Promise<ProjectCard[]> {
    const all = ((await getPortfolioProjects()) ?? []) as ProjectCard[];
    const others = all.filter((project) => project.slug?.current);
    const index = others.findIndex((project) => project.slug?.current === slug);
    const rest = index === -1 ? others : [...others.slice(index + 1), ...others.slice(0, index)];
    return rest.slice(0, count);
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5" style={{ padding: '14px 0', borderTop: '1px solid var(--line)' }}>
            <dt style={{ fontSize: 14, color: 'var(--muted-2)' }}>{label}</dt>
            <dd style={{ margin: 0, fontSize: 15, lineHeight: 1.45, color: 'var(--text)' }}>{children}</dd>
        </div>
    );
}

export default async function ProjectPage({ params }: { params: Params }) {
    const { slug } = await params;
    const project = await loadProject(slug);
    if (!project) notFound();

    const url = `${SITE_URL}/portfolio/${slug}`;
    const mainImage = hasAsset(project.mainImage) ? project.mainImage : null;
    const galleryImages: ImageWithCaption[] = (project.galleryImages ?? []).filter(hasAsset);
    // Lightbox order: main image first, then the gallery.
    const lightboxImages: ImageWithCaption[] = [...(mainImage ? [mainImage] : []), ...galleryImages];
    const galleryOffset = mainImage ? 1 : 0;

    const schema = [
        buildCreativeWorkSchema({
            name: project.title,
            description: summaryOf(project, 500),
            url,
            clientName: project.client,
            dateCreated: project.publishedAt,
            image: lightboxImages.slice(0, 4).map((image) => urlFor(image).width(1200).fit('max').url()),
            keywords: [...projectCategories(project), ...projectTechnologies(project)],
            sameAs: project.projectUrl,
        }),
        buildBreadcrumbSchema([
            { name: 'Strona główna', url: SITE_URL },
            { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
            { name: project.title, url },
        ]),
    ];

    const moreProjects = await loadMoreProjects(slug);
    const categoryNames = (project.categories ?? []).map((category) => category.title);
    const year = project.publishedAt ? new Date(project.publishedAt).getFullYear() : null;

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <SchemaScript schema={schema} />
            <section style={{ padding: 'clamp(40px, 6vw, 80px) var(--pad-x) clamp(28px, 4vw, 48px)' }}>
                <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                    <Link href="/portfolio" className="ct-contact-link" style={{ alignSelf: 'flex-start', fontSize: 14, color: 'var(--muted)' }}>
                        ← Portfolio
                    </Link>
                    <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_auto]">
                        <div className="flex flex-col gap-4">
                            <span style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', color: 'var(--muted-2)' }}>
                                {[project.client, year].filter(Boolean).join(' · ')}
                            </span>
                            <h1 className="ct-h1" style={{ maxWidth: '18ch' }}>{project.title}</h1>
                            {categoryNames.length > 0 && (
                                <ul className="flex flex-wrap gap-1.5" style={{ listStyle: 'none', margin: '4px 0 0', padding: 0 }}>
                                    {categoryNames.map((name) => (
                                        <li key={name} className="ct-chip" style={{ cursor: 'default' }}>{name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {project.projectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="ct-cta" style={{ alignSelf: 'flex-end' }}>
                                Zobacz na żywo <span aria-hidden="true">↗</span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <ProjectGallery images={lightboxImages}>
                {mainImage && (
                    <div style={{ padding: '0 var(--pad-x)' }}>
                        <GalleryTrigger index={0} label={`Powiększ zdjęcie projektu ${project.title}`} className="ct-tile ct-v2-card mx-auto block max-w-[1280px]" style={{ padding: 12, cursor: 'zoom-in' }}>
                            <div className="ct-v2-media ct-project-cover">
                                <img src={urlFor(mainImage).width(1600).url()} alt={project.title} />
                            </div>
                        </GalleryTrigger>
                    </div>
                )}

                <section className="ct-section">
                    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-20">
                        <div className="flex min-w-0 flex-col gap-14">
                            <div style={{ maxWidth: 720 }}>
                                {typeof project.description === 'string' ? (
                                    <p className="whitespace-pre-line" style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: 'var(--text-2)' }}>{project.description}</p>
                                ) : (
                                    <PortableTextContent content={project.description} />
                                )}
                            </div>

                            {project.scopeOfWork && project.scopeOfWork.length > 0 && (
                                <div style={{ maxWidth: 720 }}>
                                    <h2 style={{ margin: '0 0 16px', fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em' }}>Zakres prac</h2>
                                    <ol className="grid grid-cols-1 gap-1 sm:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                        {project.scopeOfWork.map((item: string, index: number) => (
                                            <li key={index} className="ct-tile flex items-baseline gap-3" style={{ padding: '14px 16px', fontSize: 15, lineHeight: 1.45, color: 'var(--text)' }}>
                                                <span className="ct-mono" style={{ fontSize: 12, color: 'var(--muted-2)' }}>{String(index + 1).padStart(2, '0')}</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>

                        <aside className="order-first lg:order-none">
                            <div className="ct-tile lg:sticky" style={{ top: 96, padding: '8px 20px 20px' }}>
                                <dl style={{ margin: 0 }}>
                                    {project.client && <Fact label="Klient">{project.client}</Fact>}
                                    {project.publishedAt && (
                                        <Fact label="Data realizacji">
                                            <time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time>
                                        </Fact>
                                    )}
                                    {categoryNames.length > 0 && <Fact label="Rodzaj projektu">{categoryNames.join(', ')}</Fact>}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <Fact label="Technologie">
                                            <ul className="flex flex-wrap gap-1.5" style={{ listStyle: 'none', margin: '2px 0 0', padding: 0 }}>
                                                {project.technologies.map((technology: Technology) => (
                                                    <li key={technology._id} className="ct-chip" style={{ cursor: 'default', background: 'var(--bg)', minHeight: 30, padding: '4px 12px' }}>{technology.title}</li>
                                                ))}
                                            </ul>
                                        </Fact>
                                    )}
                                </dl>
                                {project.projectUrl && (
                                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="ct-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
                                        Odwiedź stronę projektu <span aria-hidden="true">↗</span>
                                    </a>
                                )}
                            </div>
                        </aside>
                    </div>
                </section>

                {galleryImages.length > 0 && (
                    <section className="ct-section" style={{ paddingTop: 0 }}>
                        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
                            <h2 style={{ margin: 0, fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em' }}>Galeria projektu</h2>
                            <ul className="columns-1 gap-1 sm:columns-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {galleryImages.map((image, index) => {
                                    const alt = image.alt || `Zdjęcie ${index + 1} projektu ${project.title}`;
                                    return (
                                        <li key={index} className="break-inside-avoid" style={{ marginBottom: 4 }}>
                                            <GalleryTrigger index={galleryOffset + index} label={`Powiększ: ${alt}`} className="ct-tile ct-v2-card block" style={{ padding: 8, cursor: 'zoom-in' }}>
                                                <div className="ct-v2-media ct-gallery-media">
                                                    <img src={urlFor(image).width(1000).url()} alt={alt} loading="lazy" />
                                                </div>
                                                {image.caption && (
                                                    <p style={{ margin: 0, padding: '10px 8px 4px', fontSize: 14, lineHeight: 1.45, color: 'var(--muted)' }}>{image.caption}</p>
                                                )}
                                            </GalleryTrigger>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </section>
                )}
            </ProjectGallery>

            {moreProjects.length > 0 && (
                <section className="ct-section">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <h2 className="ct-h2" style={{ margin: 0 }}>Więcej realizacji</h2>
                            <Link href="/portfolio" className="ct-ghost">Wszystkie projekty</Link>
                        </div>
                        <ul className="grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {moreProjects.map((item) => (
                                <li key={item._id}>
                                    <CaseStudyCard
                                        card={{
                                            key: item._id,
                                            href: `/portfolio/${item.slug?.current}`,
                                            meta: item.client ?? '',
                                            title: item.title,
                                            description: item.categories?.map((category) => category.title).join(' · ') ?? '',
                                            image: hasAsset(item.mainImage) ? urlFor(item.mainImage).width(900).url() : undefined,
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </main>
    );
}
