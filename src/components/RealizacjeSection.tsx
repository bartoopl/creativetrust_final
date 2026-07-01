import Link from 'next/link';
import { getLatestPortfolioProjects, urlFor } from '@/lib/sanity';
import NotchedButton from './ui/NotchedButton';

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
    const projects: PortfolioProject[] = await getLatestPortfolioProjects(2);

    if (!projects?.length) return null;

    return (
        <section style={{ background: '#fff', padding: '72px 16px' }} className="lg:px-[72px] lg:py-[120px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(28px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-1.76px', color: '#000', margin: '0 0 40px', textAlign: 'center' }} className="lg:mb-16">
                    Jak to wygląda w praktyce
                </h2>

                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    {projects.map((item) => (
                        <Link
                            key={item._id}
                            href={`/portfolio/${item.slug.current}`}
                            className="flex-1 overflow-hidden rounded-[4px] border border-[rgba(0,0,0,0.06)]"
                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                            <div style={{ height: 280, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                                {item.mainImage && (
                                    <img
                                        src={urlFor(item.mainImage).width(800).url()}
                                        alt={item.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                )}
                            </div>
                            <div style={{ padding: 32 }}>
                                <p style={{ fontSize: 11.4, fontWeight: 400, color: 'rgba(0,0,0,0.4)', lineHeight: '18px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '.5px' }}>
                                    {item.categories?.slice(0, 2).map((c) => c.title).join(' · ') || 'Realizacja'}
                                </p>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 21.8, fontWeight: 500, lineHeight: '26.4px', letterSpacing: '-0.88px', color: '#000', margin: '0 0 12px' }}>
                                    {item.client}
                                </h3>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                    {item.scopeOfWork?.join(' · ') || item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                    <NotchedButton href="/portfolio" variant="ghost-light">
                        Wszystkie realizacje
                    </NotchedButton>
                </div>
            </div>
        </section>
    );
}
