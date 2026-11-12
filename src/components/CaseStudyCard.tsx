import Link from 'next/link';

export interface CaseCard {
    key: string;
    href: string;
    meta: string;
    title: string;
    description: string;
    image?: string;
    hrefLang?: string;
}

/**
 * Case study as a flat Tile Gray card (v2): the image sits inset with its own
 * radius, a quiet meta line, a large title and the categories underneath.
 */
export default function CaseStudyCard({ card, priority = false }: { card: CaseCard; priority?: boolean }) {
    return (
        <Link href={card.href} hrefLang={card.hrefLang} className="ct-tile ct-v2-card flex h-full flex-col gap-4" style={{ padding: 12, color: 'inherit' }}>
            <div className="ct-v2-media" style={{ aspectRatio: '16/10' }}>
                {card.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.image} alt={card.title} loading={priority ? 'eager' : 'lazy'} />
                ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-2" style={{ padding: '4px 12px 14px' }}>
                {card.meta && <span style={{ fontSize: 14, color: 'var(--muted-2)' }}>{card.meta}</span>}
                <h3 className="ct-card-title" style={{ margin: 0, fontSize: 'clamp(20px, 1.9vw, 24px)', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.02em' }}>{card.title}</h3>
                {card.description && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{card.description}</p>}
            </div>
        </Link>
    );
}
