"use client";

import Link from 'next/link';

interface DarkCardProps {
    title: string;
    description?: string;
    eyebrow?: string;
    href?: string;
    featured?: boolean;
    tags?: string[];
    num?: string;
    children?: React.ReactNode;
}

export default function DarkCard({ title, description, eyebrow, href, featured, tags, num, children }: DarkCardProps) {
    const style: React.CSSProperties = {
        borderRadius: 20, padding: 28,
        background: featured
            ? 'linear-gradient(140deg, color-mix(in srgb, var(--accent) 18%, var(--panel)) 0%, var(--panel) 60%)'
            : 'var(--panel)',
        border: featured
            ? '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))'
            : '1px solid var(--line)',
        transition: 'transform .3s, border-color .3s',
        textDecoration: 'none',
        color: 'var(--text)',
        display: 'flex', flexDirection: 'column',
    };

    const handlers = href ? {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            if (!featured) e.currentTarget.style.borderColor = 'var(--accent)';
        },
        onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            e.currentTarget.style.transform = 'none';
            if (!featured) e.currentTarget.style.borderColor = 'var(--line)';
        },
    } : {};

    const content = (
        <>
            {num && <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: eyebrow || title ? 32 : 0 }}>{num}</div>}
            {eyebrow && <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>{eyebrow}</div>}
            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 21, letterSpacing: '-0.01em', margin: '0 0 10px', lineHeight: 1.2 }}>{title}</h3>
            {description && <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: 0, flex: 1 }}>{description}</p>}
            {tags && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
                    {tags.map(t => (
                        <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--muted)', border: '1px solid var(--line)', padding: '5px 11px', borderRadius: 8 }}>{t}</span>
                    ))}
                </div>
            )}
            {children}
        </>
    );

    if (href) {
        return <Link href={href} style={style} {...handlers}>{content}</Link>;
    }

    return (
        <div style={style} {...handlers}>{content}</div>
    );
}
