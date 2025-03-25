"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AnimatedMenuItemProps {
    href: string;
    text: string;
    isActive?: boolean;
}

const AnimatedMenuItem: React.FC<AnimatedMenuItemProps> = ({ href, text, isActive = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={href}
            className="inline-block px-3 py-2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-6 flex items-center justify-center overflow-hidden relative w-full">
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
                        transition: 'transform 0.3s ease'
                    }}
                >
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap block">
            {text}
          </span>
                </div>

                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                        transition: 'transform 0.3s ease'
                    }}
                >
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap block">
            {text}
          </span>
                </div>
            </div>
        </Link>
    );
};

export default AnimatedMenuItem;