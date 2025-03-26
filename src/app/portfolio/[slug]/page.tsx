import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

// Define params as a Promise type for Next.js v15
type Params = Promise<{ slug: string }>;

// Generowanie statycznych parametrów
export async function generateStaticParams() {
    const projects = await client.fetch(`*[_type == "portfolioProject"]{ slug }`);
    return projects.map((project: any) => ({
        slug: project.slug.current,
    }));
}

// Pobieranie danych projektu
async function getProject(slug: string) {
    return await client.fetch(`
    *[_type == "portfolioProject" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      mainImage,
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

export default async function ProjectPage({ params }: { params: Params }) {
    // Await the params to get the slug
    const { slug } = await params;
    const project = await getProject(slug);

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
        <main className="min-h-screen">
            <div className="max-w-[1800px] mx-auto px-6 py-24">
                <Link href="/portfolio" className="text-gray-600 mb-12 block">
                    &larr; Wróć do portfolio
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium mb-4">{project.title}</h1>
                    <p className="text-xl text-gray-600">Klient: {project.client}</p>
                </div>

                {project.mainImage && (
                    <div className="aspect-video relative w-full mb-12 overflow-hidden rounded-lg">
                        <Image
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                    {project.categories?.map((category: any) => (
                        <span
                            key={category._id}
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm"
                        >
                            {category.title}
                        </span>
                    ))}
                </div>

                <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{project.description}</p>
                </div>
            </div>
        </main>
    );
}