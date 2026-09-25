import { getKnowledgeBaseEntry } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import PortableTextContent from '@/components/PortableTextContent';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildDefinedTermSchema } from '@/lib/schema';

// Define the params type as a Promise as required in Next.js v15
type Params = Promise<{ slug: string }>;

export async function generateMetadata({
                                           params,
                                       }: {
    params: Params;
}): Promise<Metadata> {
    // Await the params to get the slug
    const { slug } = await params;
    const entry = await getKnowledgeBaseEntry(slug);

    if (!entry) {
        return {
            title: 'Nie znaleziono wpisu - Baza wiedzy',
            description: 'Wpis nie został znaleziony w naszej bazie wiedzy'
        };
    }

    return {
        title: entry.seoTitle || `${entry.title} - Baza wiedzy`,
        description: entry.seoDescription || entry.shortDescription,
        alternates: {
            canonical: `${SITE_URL}/baza-wiedzy/${slug}`,
        },
        openGraph: {
            title: entry.seoTitle || entry.title,
            description: entry.seoDescription || entry.shortDescription,
            url: `${SITE_URL}/baza-wiedzy/${slug}`,
            type: 'article',
            locale: 'pl_PL',
        },
        twitter: {
            card: 'summary_large_image',
            title: entry.seoTitle || entry.title,
            description: entry.seoDescription || entry.shortDescription,
        },
    };
}

export async function generateStaticParams() {
    return [];
}

// Update the page component to also handle Promise params
export default async function KnowledgeBaseEntryPage({
                                                         params,
                                                     }: {
    params: Params;
}) {
    // Await the params to get the slug
    const { slug } = await params;
    const entry = await getKnowledgeBaseEntry(slug);

    if (!entry) {
        notFound();
    }

    // Formatowanie daty publikacji
    const publishDate = new Date(entry.publishedAt);
    const formattedDate = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(publishDate);
    const canonicalUrl = `${SITE_URL}/baza-wiedzy/${slug}`;
    const definedTermSchema = buildDefinedTermSchema({
        title: entry.title,
        description: entry.shortDescription || entry.seoDescription,
        url: canonicalUrl,
        datePublished: entry.publishedAt,
        tags: entry.tags,
    });
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Baza wiedzy', url: `${SITE_URL}/baza-wiedzy` },
        { name: entry.title, url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <SchemaScript schema={[definedTermSchema, breadcrumbSchema]} />
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x) clamp(40px, 6vw, 64px)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto flex flex-col gap-6" style={{ maxWidth: 720 }}>
                    <Link href="/baza-wiedzy" className="ct-meta ct-contact-link" style={{ alignSelf: 'flex-start' }}>
                        ← Wróć do bazy wiedzy
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="ct-mono flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent)', color: 'var(--accent)', background: 'var(--accent-soft)', fontSize: 14, fontWeight: 500 }}>
                            {entry.letter.toUpperCase()}
                        </div>
                        <div className="ct-meta" style={{ color: 'var(--muted-2)' }}>{formattedDate}</div>
                    </div>

                    <h1 className="ct-h1" style={{ fontSize: 'clamp(32px, 4.2vw, 50px)', letterSpacing: '-0.024em', lineHeight: 1.1 }}>{entry.title}</h1>
                    <p className="ct-lead">{entry.shortDescription}</p>

                    {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag: string, index: number) => (
                                <span key={index} className="ct-pill">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <div style={{ padding: 'clamp(40px, 6vw, 64px) var(--pad-x) var(--pad-y)' }}>
                <article className="mx-auto" style={{ maxWidth: 720 }}>
                    {/* Renderowanie treści za pomocą PortableText */}
                    {entry.content && <PortableTextContent content={entry.content} />}

                    {/* Nawigacja na dole strony */}
                    <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                        <Link href="/baza-wiedzy" className="ct-link">
                            ← Wróć do pełnej listy wpisów w bazie wiedzy
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}
