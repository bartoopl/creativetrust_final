import PageHero from '@/components/ui/PageHero';
import PortfolioGrid, { type PortfolioFilter, type PortfolioGridItem } from '@/components/PortfolioGrid';
import SchemaScript from '@/components/SchemaScript';
import { getPortfolioProjects, getServiceCategories, urlFor } from '@/lib/cms';
import { technologyFilters } from '@/lib/portfolio-technologies';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

// Sanity category titles are Polish; known ones get an English label, the rest fall back to the original.
const CATEGORY_LABELS: Record<string, string> = {
    'Strony internetowe': 'Websites',
    'Strony www': 'Websites',
    'Strona www': 'Websites',
    'Sklepy internetowe': 'Online shops',
    'Sklep internetowy': 'Online shop',
    'E-commerce': 'E-commerce',
    'Marketing automation': 'Marketing automation',
    'Social media': 'Social media',
    'Branding': 'Branding',
    'Identyfikacja wizualna': 'Visual identity',
    'Kampanie': 'Campaigns',
    'Kampanie reklamowe': 'Ad campaigns',
    'Reklama': 'Advertising',
    'Grafika': 'Graphic design',
    'Projektowanie graficzne': 'Graphic design',
    'Aplikacje': 'Applications',
    'Aplikacje webowe': 'Web applications',
    'Fotografia': 'Photography',
    'Wideo': 'Video',
    'Video': 'Video',
    'Landing page': 'Landing pages',
}
const categoryLabel = (title: string) => CATEGORY_LABELS[title] ?? title;

// Rendered on request from cached CMS data (src/lib/cms.ts); saving in the
// admin refreshes it immediately, otherwise it is re-read hourly.

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    categories: Category[] | null;
    technologies?: Category[] | null;
}

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

// CMS errors are thrown, not rendered as an empty list.
async function loadPortfolio(): Promise<{ projects: Project[]; categories: Category[] }> {
    const [projects, categories] = await Promise.all([getPortfolioProjects(), getServiceCategories()]);
    return { projects: projects ?? [], categories: categories ?? [] };
}

export default async function PortfolioPage() {
    const { projects, categories } = await loadPortfolio();

    const items: PortfolioGridItem[] = projects
        .filter((project) => project.slug?.current)
        .map((project) => ({
            key: project._id,
            href: `/portfolio/${project.slug.current}`,
            hrefLang: 'pl',
            noImageLabel: 'NO IMAGE',
            meta: project.client,
            title: project.title,
            description: project.categories?.map(c => categoryLabel(c.title)).join(' · ') || '',
            image: project.mainImage?.asset ? urlFor(project.mainImage).width(900).url() : undefined,
            categorySlugs: project.categories?.map(c => c.slug.current) ?? [],
            technologySlugs: project.technologies?.map((t) => t.slug.current) ?? [],
        }));
    const filters: PortfolioFilter[] = categories.map((c) => ({ id: c._id, title: categoryLabel(c.title), slug: c.slug.current }));

    const schema = [
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'CreativeTrust portfolio and case studies',
            url: `${SITE_URL}/en/portfolio`,
            inLanguage: 'en',
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
            { name: 'Home', url: `${SITE_URL}/en` },
            { name: 'Portfolio', url: `${SITE_URL}/en/portfolio` },
        ]),
    ];

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={schema} />
            <PageHero
                eyebrow="Case studies"
                title="150+ projects. Every one different."
                description="Brand, website, online shop or automation. Seeing the results is the best way to understand how we work."
            />
            <PortfolioGrid items={items} categories={filters} technologies={technologyFilters(projects)} locale="en" />
        </main>
    );
}
