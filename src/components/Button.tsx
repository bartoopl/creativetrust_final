"use client";

import Link from 'next/link';

interface ButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ href, children, className = '', onClick, variant = 'primary' }) => {
    if (variant === 'ghost') {
        return (
            <Link href={href} className={`ct-ghost ${className}`} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <Link href={href} className={`ct-cta ${className}`} onClick={onClick}>
            {children}
            <span className="ct-badge" aria-hidden="true">
                <span className="ct-arrows"><span>→</span><span>→</span></span>
            </span>
        </Link>
    );
};

export default Button;
