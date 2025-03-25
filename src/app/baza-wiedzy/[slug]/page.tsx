import { notFound } from 'next/navigation';
import Link from 'next/link';
import PortableTextContent from '@/components/PortableTextContent';
import { client } from '@/lib/sanity';


export const dynamic = 'force-dynamic'; // albo static w zależności od potrzeb

type Props = {
    params: {
        slug: string;
    };
};

async function getEntry(slug: string) {
    try {
        return await client.fetch(`
      *[_type == "knowledgeBase" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        letter,
        shortDescription,
        content,
        publishedAt,
        tags
      }
    `, { slug });
    } catch (error) {
        console.error('Error fetching knowledge base entry:', error);
        return null;
    }
}

export default async function Page({ params }: Props) {
    const entry = await getEntry(params.slug);

    if (!entry) {
        notFound();
    }

    const publishDate = new Date(entry.publishedAt);
    new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(publishDate);
    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <Link href="/baza-wiedzy" className="text-gray-600 mb-12 flex items-center">
                    {/* ...ikonka + "Wróć" */}
                </Link>

                <div className="mb-8">
                    {/* ...treść artykułu */}
                </div>

                {entry.content && <PortableTextContent content={entry.content} />}

                <div className="mt-16 pt-8 border-t border-gray-200">
                    <Link
                        href="/baza-wiedzy"
                        className="inline-flex items-center text-gray-700 hover:text-black"
                    >
                        {/* ...nawigacja dolna */}
                    </Link>
                </div>
            </div>
        </main>
    );
}
