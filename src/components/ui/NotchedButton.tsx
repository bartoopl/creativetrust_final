"use client";

import Link from 'next/link';

type Variant = 'primary-dark' | 'ghost-dark' | 'primary-light' | 'ghost-light';

interface NotchedButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: Variant;
    className?: string;
}

const NOTCH = 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)';

const VARIANT_STYLE: Record<Variant, React.CSSProperties> = {
    'primary-dark': {
        background: 'var(--lime)',
        color: '#000',
        clipPath: NOTCH,
        padding: '0 14px',
    },
    'ghost-dark': {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.15)',
        borderLeft: '2px solid var(--lime)',
        color: 'rgba(255,255,255,0.75)',
        padding: '0 14px 0 12px',
    },
    'primary-light': {
        background: '#000',
        color: '#fff',
        clipPath: NOTCH,
        padding: '0 14px',
    },
    'ghost-light': {
        background: 'transparent',
        border: '1px solid rgba(0,0,0,0.1)',
        borderLeft: '2px solid var(--lime)',
        color: '#000',
        padding: '0 14px 0 12px',
    },
};

const HAS_ICON: Record<Variant, boolean> = {
    'primary-dark': true,
    'ghost-dark': false,
    'primary-light': true,
    'ghost-light': false,
};

const ICON_FILL: Record<Variant, string> = {
    'primary-dark': '#000',
    'ghost-dark': 'currentColor',
    'primary-light': 'var(--lime)',
    'ghost-light': 'currentColor',
};

function ArrowIcon({ fill }: { fill: string }) {
    return (
        <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill={fill}>
            <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
        </svg>
    );
}

export default function NotchedButton({ children, href, onClick, variant = 'primary-dark', className = '' }: NotchedButtonProps) {
    const style: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 40,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: variant.startsWith('primary') ? 'opacity 0.15s' : 'border-color 0.15s',
        ...VARIANT_STYLE[variant],
    };

    const content = (
        <>
            {HAS_ICON[variant] && <ArrowIcon fill={ICON_FILL[variant]} />}
            {children}
        </>
    );

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={className} style={style}>
                {content}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className} style={style}>
            {content}
        </button>
    );
}
