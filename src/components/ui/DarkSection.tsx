interface DarkSectionProps {
    eyebrow?: string;
    title: React.ReactNode;
    description?: string;
    children: React.ReactNode;
    id?: string;
    alt?: boolean;
    topBorder?: boolean;
    maxWidth?: number;
    rightHeader?: React.ReactNode;
}

export default function DarkSection({ eyebrow, title, description, children, id, alt, topBorder = true, maxWidth = 1240, rightHeader }: DarkSectionProps) {
    return (
        <section id={id} style={{ borderTop: topBorder ? '1px solid var(--line)' : undefined, background: alt ? 'var(--panel2)' : undefined }}>
            <div style={{ maxWidth, margin: '0 auto', padding: '96px 32px' }}>
                <div style={{ marginBottom: 48 }}>
                    <div style={{
                        display: 'flex', alignItems: 'flex-end',
                        justifyContent: rightHeader ? 'space-between' : 'flex-start',
                        gap: 24, flexWrap: 'wrap',
                    }}>
                        <div style={{ maxWidth: '60ch' }}>
                            {eyebrow && (
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>
                                    {eyebrow}
                                </div>
                            )}
                            <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>
                                {title}
                            </h2>
                            {description && (
                                <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.55, margin: '16px 0 0' }}>
                                    {description}
                                </p>
                            )}
                        </div>
                        {rightHeader && <div>{rightHeader}</div>}
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
}
