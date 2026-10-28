import PageHero from '@/components/ui/PageHero';
import PortfolioGrid, { type PortfolioFilter, type PortfolioGridItem } from '@/components/PortfolioGrid';
import SchemaScript from '@/components/SchemaScript';
import { getPortfolioProjects, getServiceCategories, urlFor } from '@/lib/sanity';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

// Server-rendered list of every case study (visible without JavaScript),
// regenerated hourly.
export const revalidate = 3600;

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    categories: Category[] | null;
}

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

async function loadPortfolio(): Promise<{ projects: Project[]; categories: Category[] }> {
    try {
        const [projects, categories] = await Promise.all([getPortfolioProjects(), getServiceCategories()]);
        return { projects: projects ?? [], categories: categories ?? [] };
    } catch (error) {
        console.error('Błąd podczas ładowania portfolio:', error);
        return { projects: [], categories: [] };
    }
}

export default async function PortfolioPage() {
    const { projects, categories } = await loadPortfolio();

    const items: PortfolioGridItem[] = projects
        .filter((project) => project.slug?.current)
        .map((project) => ({
            key: project._id,
            href: `/portfolio/${project.slug.current}`,
            meta: project.client,
            title: project.title,
            description: project.categories?.map(c => c.title).join(' · ') || '',
            image: project.mainImage ? urlFor(project.mainImage).width(900).url() : undefined,
            categorySlugs: project.categories?.map(c => c.slug.current) ?? [],
        }));
    const filters: PortfolioFilter[] = categories.map((c) => ({ id: c._id, title: c.title, slug: c.slug.current }));

    const schema = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Portfolio i realizacje CreativeTrust',
            url: `${SITE_URL}/portfolio`,
            inLanguage: 'pl-PL',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: items.length,
                itemListElement: items.map((item, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    url: `${SITE_URL}${item.href}`,
                    name: item.title,
                })),
            },
        },
        buildBreadcrumbSchema([
            { name: 'Strona główna', url: SITE_URL },
            { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
        ]),
    ];

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={schema} />
            <PageHero
                eyebrow="Realizacje"
                title="150+ projektów. Każdy inny."
                description="Marka, strona, sklep lub automatyzacja. Zobaczyć efekty to najlepszy sposób, żeby zrozumieć jak pracujemy."
            />
            <PortfolioGrid items={items} categories={filters} />
        </main>
    );
}
