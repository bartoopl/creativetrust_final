import Link from 'next/link';

interface PageHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    cta?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    badges?: string[];
    right?: React.ReactNode;
    children?: React.ReactNode;
}

/** Inner-page hero: dot-grid background, pills/eyebrow, H1, lead, pill CTAs. */
export default function PageHero({ eyebrow, title, description, cta, ctaSecondary, badges, right, children }: PageHeroProps) {
    return (
        <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
            <div className={`mx-auto grid max-w-[1280px] items-center gap-12 ${right ? 'grid-cols-1 lg:grid-cols-[1fr_0.9fr]' : 'grid-cols-1'}`}>
                <div className="flex flex-col gap-6" style={{ maxWidth: right ? '100%' : 760 }}>
                    {badges && badges.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {badges.map((b) => <span key={b} className="ct-pill">{b}</span>)}
                        </div>
                    ) : (
                        <span className="ct-eyebrow">{eyebrow}</span>
                    )}
                    <h1 className="ct-h1">{title}</h1>
                    {description && <p className="ct-lead" style={{ maxWidth: '54ch' }}>{description}</p>}
                    {(cta || ctaSecondary) && (
                        <div className="flex flex-wrap gap-3.5 pt-2">
                            {cta && (
                                <Link href={cta.href} className="ct-cta">
                                    {cta.label}
                                    <span className="ct-badge" aria-hidden="true"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                                </Link>
                            )}
                            {ctaSecondary && (
                                <Link href={ctaSecondary.href} className="ct-ghost">
                                    {ctaSecondary.label}
                                </Link>
                            )}
                        </div>
                    )}
                    {children}
                </div>
                {right && <div>{right}</div>}
            </div>
        </section>
    );
}
