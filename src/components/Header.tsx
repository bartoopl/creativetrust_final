"use client";

import Link from 'next/link';
import Button from './Button';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolioProjects } from '@/lib/sanity';
import MegaMenu from './MegaMenu';

export default function Header() {
    const [projectCount, setProjectCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const servicesButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProjectCount = async () => {
            try {
                const projects = await getPortfolioProjects();
                setProjectCount(projects?.length || 0);
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania liczby projektów:', error);
                setProjectCount(0);
                setLoading(false);
            }
        };

        fetchProjectCount();
    }, []);

    // Zapobiegaj scrollowaniu strony kiedy menu mobilne jest otwarte
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Funkcja zamykająca menu mobilne
    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Funkcja obsługująca kliknięcie na przycisk "Usługi"
    const handleServicesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMegaMenuOpen(!megaMenuOpen);
    };

    return (
        <header className="bg-white py-4 relative z-50 border-b border-gray-100">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo (lewa strona) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="block">
                            {/* SVG logo z filtrami CSS, aby było czarne */}
                            <div className="w-64 h-10 relative">
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

                    {/* Menu (środek) - widoczne tylko na desktopie */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-900 hover:text-gray-500 transition-colors duration-300 px-1 py-2 text-sm font-medium">
                            Strona główna
                        </Link>

                        {/* Link do usług z ikoną dropdown */}
                        <div
                            ref={servicesButtonRef}
                            className="relative cursor-pointer"
                        >
                            <div
                                onClick={handleServicesClick}
                                className={`flex items-center text-sm font-medium px-1 py-2 transition-colors duration-300 ${megaMenuOpen ? 'text-black' : 'text-gray-900 hover:text-gray-500'}`}
                            >
                                <span>Usługi</span>
                                <svg
                                    className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <Link href="/portfolio" className="text-gray-900 hover:text-gray-500 transition-colors duration-300 px-1 py-2 text-sm font-medium">
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
                        <Link href="/o-nas" className="text-gray-900 hover:text-gray-500 transition-colors duration-300 px-1 py-2 text-sm font-medium">
                            O nas
                        </Link>
                        <Link href="/blog" className="text-gray-900 hover:text-gray-500 transition-colors duration-300 px-1 py-2 text-sm font-medium">
                            Blog
                        </Link>
                    </nav>

                    {/* Button kontaktowy (prawa strona) - widoczny tylko na desktopie */}
                    <div className="hidden md:flex items-center">
                        <Button href="/kontakt">Kontakt</Button>
                    </div>

                    {/* Menu mobilne (przycisk hamburgera) - widoczny tylko na mobile */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-900 hover:text-gray-600 p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                        >
                            {mobileMenuOpen ? (
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
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
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mega Menu dla usług */}
            <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

            {/* Menu mobilne - rozwija się po kliknięciu hamburgera */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 top-[61px] bg-white z-50 overflow-y-auto"
                    >
                        <div className="px-4 py-6 space-y-8">
                            <nav className="flex flex-col space-y-6">
                                <Link
                                    href="/"
                                    className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-4"
                                    onClick={closeMobileMenu}
                                >
                                    Strona główna
                                </Link>

                                {/* Usługi z submenu */}
                                <div className="border-b border-gray-100 pb-4">
                                    <Link
                                        href="/uslugi"
                                        className="text-xl font-medium text-gray-900 mb-4 block"
                                        onClick={closeMobileMenu}
                                    >
                                        Usługi
                                    </Link>
                                    <div className="pl-4 mt-4 space-y-3">
                                        <Link
                                            href="/uslugi/strony-www"
                                            className="text-lg text-gray-700 block"
                                            onClick={closeMobileMenu}
                                        >
                                            Strony WWW
                                        </Link>
                                        <Link
                                            href="/uslugi/e-commerce"
                                            className="text-lg text-gray-700 block"
                                            onClick={closeMobileMenu}
                                        >
                                            E-commerce
                                        </Link>
                                        <Link
                                            href="/uslugi/branding"
                                            className="text-lg text-gray-700 block"
                                            onClick={closeMobileMenu}
                                        >
                                            Branding
                                        </Link>
                                        <Link
                                            href="/uslugi/marketing-automation"
                                            className="text-lg text-gray-700 block"
                                            onClick={closeMobileMenu}
                                        >
                                            Marketing Automation
                                        </Link>
                                        <Link
                                            href="/uslugi/performance-marketing"
                                            className="text-lg text-gray-700 block"
                                            onClick={closeMobileMenu}
                                        >
                                            Performance Marketing
                                        </Link>
                                    </div>
                                </div>

                                <Link
                                    href="/portfolio"
                                    className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-4"
                                    onClick={closeMobileMenu}
                                >
                                    Realizacje {projectCount && <span className="text-sm ml-2">({projectCount})</span>}
                                </Link>
                                <Link
                                    href="/o-nas"
                                    className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-4"
                                    onClick={closeMobileMenu}
                                >
                                    O nas
                                </Link>
                                <Link
                                    href="/blog"
                                    className="text-xl font-medium text-gray-900 border-b border-gray-100 pb-4"
                                    onClick={closeMobileMenu}
                                >
                                    Blog
                                </Link>
                            </nav>

                            <div className="pt-4">
                                <Link
                                    href="/kontakt"
                                    className="group relative inline-flex items-center justify-center gap-2 w-full
                                    bg-black text-white px-6 py-3 rounded-full font-medium
                                    transition-all duration-300 ease-in-out
                                    hover:bg-transparent hover:text-black hover:border hover:border-black"
                                    onClick={closeMobileMenu}
                                >
                                    <span>Kontakt</span>
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
                                        className="transform transition-transform duration-300 group-hover:rotate-45"
                                    >
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </Link>
                            </div>

                            {/* Social media */}
                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-sm text-gray-500 mb-4">Śledź nas</h3>
                                <div className="flex space-x-6">
                                    <Link
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700"
                                        onClick={closeMobileMenu}
                                    >
                                        LinkedIn
                                    </Link>
                                    <Link
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700"
                                        onClick={closeMobileMenu}
                                    >
                                        Facebook
                                    </Link>
                                    <Link
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700"
                                        onClick={closeMobileMenu}
                                    >
                                        Instagram
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}