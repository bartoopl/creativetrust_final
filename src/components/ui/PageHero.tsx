import Link from 'next/link';

interface PageHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    cta?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    right?: React.ReactNode;
}

export default function PageHero({ eyebrow, title, description, cta, ctaSecondary, right }: PageHeroProps) {
    return (
        <section style={{
            maxWidth: 1240, margin: '0 auto',
            padding: 'clamp(72px, 10vw, 120px) 32px clamp(64px, 8vw, 96px)',
        }} className="px-4 sm:px-6 lg:px-8">
            <div className={`grid items-center gap-10 ${right ? 'grid-cols-1 lg:grid-cols-[1fr_0.8fr] lg:gap-16' : 'grid-cols-1'}`}>
                <div style={{ maxWidth: right ? '100%' : 820 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
                        {eyebrow}
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-space), sans-serif', fontWeight: 700,
                        fontSize: 'clamp(36px, 6vw, 78px)', lineHeight: 1.02,
                        letterSpacing: '-0.025em', margin: '0 0 24px',
                        textWrap: 'balance',
                    } as React.CSSProperties}>
                        {title}
                    </h1>
                    {description && (
                        <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 36px' }}>
                            {description}
                        </p>
                    )}
                    {(cta || ctaSecondary) && (
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                            {cta && (
                                <Link href={cta.href} className="ct-cta">
                                    {cta.label}
                                    <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                                </Link>
                            )}
                            {ctaSecondary && (
                                <Link href={ctaSecondary.href} className="ct-ghost">
                                    <span className="ct-dot" />
                                    {ctaSecondary.label}
                                    <span className="ct-tail">↓</span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                {right && <div>{right}</div>}
            </div>
        </section>
    );
}
