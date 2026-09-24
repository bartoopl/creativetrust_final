import Link from 'next/link';

interface CardProps {
    title: string;
    description?: string;
    eyebrow?: string;
    num?: string;
    href?: string;
    tags?: string[];
    children?: React.ReactNode;
    className?: string;
}

/** Bordered card with small radius — mono numeral/eyebrow, heading, muted description. */
export default function Card({ title, description, eyebrow, num, href, tags, children, className = '' }: CardProps) {
    const content = (
        <>
            {num && <span className="ct-mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{num}</span>}
            {eyebrow && <span className="ct-meta" style={{ color: 'var(--accent)' }}>{eyebrow}</span>}
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{title}</h3>
            {description && <p className="ct-body" style={{ flex: 1 }}>{description}</p>}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2" style={{ marginTop: 6 }}>
                    {tags.map((t) => <span key={t} className="ct-pill">{t}</span>)}
                </div>
            )}
            {children}
        </>
    );
    const cls = `flex flex-col gap-2.5 ${href ? 'ct-card-hover' : ''} ${className}`;
    const style: React.CSSProperties = { padding: 28, background: '#fff', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' };

    if (href) {
        return <Link href={href} className={cls} style={style}>{content}</Link>;
    }
    return <div className={cls} style={style}>{content}</div>;
}
