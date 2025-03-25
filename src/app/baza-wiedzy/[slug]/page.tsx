import { getKnowledgeBaseEntry } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import PortableTextContent from '@/components/PortableTextContent';
import { ResolvingMetadata } from 'next';

// Typ dla parametrów generowania metadanych zgodny z PageProps
interface Params {
    slug: string;
}

// Dynamiczne generowanie metadanych
export async function generateMetadata(
    { params }: { params: Params },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const entry = await getKnowledgeBaseEntry(params.slug);

    if (!entry) {
        return {
            title: 'Nie znaleziono wpisu - Baza wiedzy',
            description: 'Wpis nie został znaleziony w naszej bazie wiedzy'
        };
    }

    return {
        title: entry.seoTitle || `${entry.title} - Baza wiedzy`,
        description: entry.seoDescription || entry.shortDescription
    };
}

// Generowanie statycznych parametrów
export async function generateStaticParams() {
    // Tutaj możesz dodać kod pobierający wszystkie slugi z bazy wiedzy
    // dla statycznej generacji stron
    // Na razie zostawiamy to puste - strony będą generowane na żądanie
    return [];
}

export default async function KnowledgeBaseEntryPage({ params }: { params: Params }) {
    const entry = await getKnowledgeBaseEntry(params.slug);

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

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <Link href="/baza-wiedzy" className="text-gray-600 mb-12 flex items-center">
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
                    Wróć do bazy wiedzy
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full">
                            {entry.letter.toUpperCase()}
                        </div>
                        <div className="text-gray-500">{formattedDate}</div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-medium mb-6">{entry.title}</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl">{entry.shortDescription}</p>

                    {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-12">
                            {entry.tags.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Renderowanie treści za pomocą PortableText */}
                {entry.content && <PortableTextContent content={entry.content} />}

                {/* Nawigacja na dole strony */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <Link
                        href="/baza-wiedzy"
                        className="inline-flex items-center text-gray-700 hover:text-black"
                    >
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
                        Wróć do pełnej listy wpisów w bazie wiedzy
                    </Link>
                </div>
            </div>
        </main>
    );
}