"use client";

import Link from 'next/link';

/**
 * Pill button from the design system: filled accent (primary) with a trailing
 * circular arrow badge, accent-outlined (outline) or neutral outlined (ghost).
 */
type Variant = 'primary' | 'outline' | 'ghost';

interface NotchedButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: Variant;
    size?: 'md' | 'sm';
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

export default function NotchedButton({ children, href, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled = false }: NotchedButtonProps) {
    const kind = variant;
    const classes = [
        kind === 'ghost' ? 'ct-ghost' : 'ct-cta',
        kind === 'outline' ? 'outline' : '',
        size === 'sm' ? 'sm' : '',
        className,
    ].filter(Boolean).join(' ');

    const content = (
        <>
            {children}
            {kind !== 'ghost' && (
                <span className="ct-badge" aria-hidden="true">
                    <span className="ct-arrows"><span>→</span><span>→</span></span>
                </span>
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
            {content}
        </button>
    );
}
