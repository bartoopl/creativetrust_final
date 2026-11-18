import Link from 'next/link';

export interface RelatedLink {
    href: string;
    title: string;
    description: string;
}

interface RelatedLinksProps {
    links: RelatedLink[];
    eyebrow?: string;
    heading?: string;
    ariaLabel?: string;
}

/**
 * The "go from reading to doing" box: a short list of pages that continue the
 * article or the service. Used by blog posts (services) and by service pages
 * (the checklists), so the two sides link to each other instead of the service
 * pages staying a dead end.
 */
export default function RelatedLinks({ links, eyebrow = 'Powiązane usługi', heading = 'Chcesz przejść od wiedzy do działania?', ariaLabel = 'Powiązane usługi' }: RelatedLinksProps) {
    if (!links.length) {
        return null;
    }

    return (
        <aside className="ct-panel" style={{ margin: '48px 0', padding: 'clamp(22px, 3vw, 32px)', background: 'var(--panel)' }} aria-label={ariaLabel}>
            <p className="ct-eyebrow" style={{ margin: 0 }}>{eyebrow}</p>
            <h2 style={{ margin: '10px 0 22px', fontSize: 22, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: 1.25 }}>{heading}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="ct-card-hover flex flex-col gap-1.5"
                        style={{ padding: 20, background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
                    >
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>{link.title}</h3>
                        <p className="ct-body" style={{ fontSize: 13.5 }}>{link.description}</p>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
