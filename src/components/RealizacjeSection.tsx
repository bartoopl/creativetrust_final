import Link from 'next/link';
import { getLatestPortfolioProjects, urlFor } from '@/lib/sanity';
import SectionHeader from './ui/SectionHeader';

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

export interface CaseCard {
    key: string;
    href: string;
    meta: string;
    title: string;
    description: string;
    image?: string;
}

const fallback: CaseCard[] = [
    {
        key: 'beautyclinic',
        href: '/portfolio',
        meta: 'beautyclinic.pl · Strony www · e-commerce',
        title: 'BeautyClinic Karolina Bilińska',
        description: 'Realizacja strony, prace rozwojowe, kampanie Google Ads i automatyzacja voucherów online.',
    },
    {
        key: 'onkologgorzow',
        href: '/portfolio',
        meta: 'onkologgorzow.pl · Strony www',
        title: 'Dr Bartłomiej Delijewski',
        description: 'Projekt graficzny i realizacja strony www.',
    },
];

export function CaseStudyCard({ card }: { card: CaseCard }) {
    return (
        <Link href={card.href} className="ct-card-hover block overflow-hidden" style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, color: 'inherit' }}>
            {card.image ? (
                <div style={{ height: 220, overflow: 'hidden', background: 'var(--panel2)', borderBottom: '1px solid var(--line)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.image} alt={card.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            ) : (
                <div className="ct-placeholder" style={{ height: 180 }}>
                    <span className="ct-mono" style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)' }}>MIEJSCE NA ZDJĘCIE</span>
                </div>
            )}
            <div className="flex flex-col gap-2" style={{ padding: 22 }}>
                <span className="ct-meta">{card.meta}</span>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{card.title}</h3>
                <p className="ct-body" style={{ fontSize: 13 }}>{card.description}</p>
            </div>
        </Link>
    );
}

export default async function RealizacjeSection() {
    let projects: PortfolioProject[] = [];
    try {
        projects = (await getLatestPortfolioProjects(2)) ?? [];
    } catch {
        projects = [];
    }

    const cards: CaseCard[] = projects.length
        ? projects.map((item) => ({
            key: item._id,
            href: `/portfolio/${item.slug.current}`,
            meta: item.categories?.slice(0, 2).map((c) => c.title).join(' · ') || 'Realizacja',
            title: item.client || item.title,
            description: item.scopeOfWork?.join(' · ') || item.title,
            image: item.mainImage ? urlFor(item.mainImage).width(900).url() : undefined,
        }))
        : fallback;

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
