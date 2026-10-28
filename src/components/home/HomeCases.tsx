import Link from 'next/link';
import { getLatestPortfolioProjects, urlFor } from '@/lib/sanity';

interface PortfolioProject {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: unknown;
    scopeOfWork?: string[];
    categories?: { _id: string; title: string }[];
}

/** Case studies as flat Tile Gray cards: the work is the proof, the image sits inset. */
export default async function HomeCases() {
    let projects: PortfolioProject[] = [];
    try {
        projects = (await getLatestPortfolioProjects(2)) ?? [];
    } catch {
        projects = [];
    }
    if (!projects.length) return null;

    return (
        <section id="case-studies" className="ct-section">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Jak to wygląda w praktyce</span>
                    <h2 className="ct-h2 ct-statement">Realizacje, które <span className="ct-electric">pracują</span> na wynik.</h2>
                </div>
                <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {projects.map((item) => (
                        <li key={item._id}>
                            <Link href={`/portfolio/${item.slug.current}`} className="ct-tile ct-v2-card flex h-full flex-col gap-4" style={{ padding: 12, color: 'inherit' }}>
                                <div className="ct-v2-media" style={{ aspectRatio: '16/10' }}>
                                    {item.mainImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={urlFor(item.mainImage).width(1000).url()} alt={item.client || item.title} loading="lazy" />
                                    ) : null}
                                </div>
                                <div className="flex flex-col gap-2" style={{ padding: '4px 12px 16px' }}>
                                    <span style={{ fontSize: 14, color: 'var(--muted-2)' }}>
                                        {item.categories?.slice(0, 2).map((c) => c.title).join(' · ') || 'Realizacja'}
                                    </span>
                                    <h3 style={{ margin: 0, fontSize: 24, fontWeight: 500, lineHeight: 1.27, letterSpacing: '-0.02em' }}>{item.client || item.title}</h3>
                                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{item.scopeOfWork?.join(' · ') || item.title}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link href="/portfolio" className="ct-ghost">Wszystkie realizacje</Link>
            </div>
        </section>
    );
}
