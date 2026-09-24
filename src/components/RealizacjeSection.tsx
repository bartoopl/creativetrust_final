import Link from 'next/link';
import { getLatestPortfolioProjects, urlFor } from '@/lib/sanity';
import SectionHeader from './ui/SectionHeader';
import CaseStudyCard, { type CaseCard } from './CaseStudyCard';

interface PortfolioCategory {
    _id: string;
    title: string;
}

interface PortfolioProject {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    scopeOfWork?: string[];
    categories?: PortfolioCategory[];
}

export default async function RealizacjeSection() {
    let projects: PortfolioProject[] = [];
    try {
        projects = (await getLatestPortfolioProjects(2)) ?? [];
    } catch {
        projects = [];
    }

    if (!projects.length) return null;

    const cards: CaseCard[] = projects.map((item) => ({
            key: item._id,
            href: `/portfolio/${item.slug.current}`,
            meta: item.categories?.slice(0, 2).map((c) => c.title).join(' · ') || 'Realizacja',
            title: item.client || item.title,
            description: item.scopeOfWork?.join(' · ') || item.title,
            image: item.mainImage ? urlFor(item.mainImage).width(900).url() : undefined,
        }));

    return (
        <section id="case-studies" className="ct-section" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
                <SectionHeader
                    eyebrow="Jak to wygląda w praktyce"
                    title="Case studies"
                    right={<Link href="/portfolio" className="ct-link">Wszystkie realizacje →</Link>}
                />
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
                    {cards.map((card) => <CaseStudyCard key={card.key} card={card} />)}
                </div>
            </div>
        </section>
    );
}
