"use client";

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ href, children, className = '', onClick }) => {
    return (
        <Link
            href={href}
            className={`
                group inline-flex items-center justify-center gap-2 rounded-full
                border border-black bg-black px-5 py-3 text-sm font-medium text-white
                transition-all duration-300 ease-in-out
                hover:bg-white hover:text-black
                ${className}
            `}
            onClick={onClick}
        >
            <span>{children}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
        </Link>
    );
};

export default Button;
