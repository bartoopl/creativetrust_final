"use client";

import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPortfolioProjects } from '@/lib/sanity';

export default function Header() {
    const [projectCount, setProjectCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjectCount = async () => {
            try {
                const projects = await getPortfolioProjects();
                setProjectCount(projects?.length || 0);
                setLoading(false);
            } catch (error) {
                console.error('Błąad podczas pobierania liczby projektów:', error);
                setProjectCount(0);
                setLoading(false);
            }
        };

        fetchProjectCount();
    }, []);

    return (
        <header className="bg-white shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo (lewa strona) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="block">
                            {/* SVG logo z filtrami CSS, aby było czarne */}
                            <div className="w-32 h-10 relative">
                                {/* Zastąp '/logo.svg' ścieżką do Twojego logo */}
                                <Image
                                    src="/logo.svg"
                                    alt="Logo Agencji"
                                    fill
                                    className="[filter:brightness(0)_invert(0)]"
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Menu (środek) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-900 hover:text-gray-600 px-1 py-2 text-sm font-medium">
                            Strona główna
                        </Link>
                        <Link href="/uslugi" className="text-gray-900 hover:text-gray-600 px-1 py-2 text-sm font-medium">
                            Usługi
                        </Link>
                        <div className="relative">
                            <Link href="/portfolio" className="text-gray-900 hover:text-gray-600 px-1 py-2 text-sm font-medium">
                                Realizacje
                            </Link>
                            {loading ? (
                                <motion.span
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                    className="absolute -top-1 -right-3 text-xs text-gray-400"
                                >
                                    ...
                                </motion.span>
                            ) : (
                                <motion.sup
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 15
                                    }}
                                    className="absolute -top-1 -right-3 text-xs text-gray-500 font-medium"
                                >
                                    {projectCount}
                                </motion.sup>
                            )}
                        </div>
                        <Link href="/o-nas" className="text-gray-900 hover:text-gray-600 px-1 py-2 text-sm font-medium">
                            O nas
                        </Link>
                        <Link href="/blog" className="text-gray-900 hover:text-gray-600 px-1 py-2 text-sm font-medium">
                            Blog
                        </Link>
                    </nav>

                    {/* Button kontaktowy (prawa strona) */}
                    <div className="flex items-center">
                        <Button href="/kontakt">Kontakt</Button>
                    </div>

                    {/* Menu mobilne (pojawia się na mniejszych ekranach) */}
                    <div className="md:hidden">
                        <button className="text-gray-900 hover:text-gray-600 p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}