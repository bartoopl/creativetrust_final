import Link from 'next/link';

export interface CaseCard {
    key: string;
    href: string;
    meta: string;
    title: string;
    description: string;
    image?: string;
}

export default function CaseStudyCard({ card }: { card: CaseCard }) {
    return (
        <Link href={card.href} className="ct-card-hover block overflow-hidden" style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, color: 'inherit' }}>
            {card.image ? (
                <div style={{ height: 220, overflow: 'hidden', background: 'var(--panel2)', borderBottom: '1px solid var(--line)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.image} alt={card.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            ) : (
                <div className="ct-placeholder" style={{ height: 180 }}>
                    <span className="ct-mono" style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)' }}>BRAK ZDJĘCIA</span>
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
