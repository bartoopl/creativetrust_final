"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import MegaMenu from './MegaMenu';

const navItems = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Realizacje' },
    { href: '/o-nas', label: 'O nas' },
    { href: '/blog', label: 'Blog' },
    { href: '/baza-wiedzy', label: 'Baza wiedzy' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-8 w-48">
                        <Image
                            src="/logo.svg"
                            alt="CreativeTrust"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-slate-900 transition-colors hover:text-slate-500"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <button
                        type="button"
                        onClick={() => setMegaMenuOpen((value) => !value)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition-colors hover:text-slate-500"
                    >
                        Usługi
                        <svg className={`h-4 w-4 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </nav>

                <div className="hidden md:block">
                    <Button href="/kontakt">Kontakt</Button>
                </div>

                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-950 md:hidden"
                    onClick={() => setMobileMenuOpen((value) => !value)}
                    aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <MegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

            <AnimatePresence>
                {mobileMenuOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-[73px] z-40 border-b border-slate-200 bg-white px-6 py-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="border-b border-slate-100 pb-4 text-lg font-medium text-slate-950"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/uslugi"
                                onClick={() => setMobileMenuOpen(false)}
                                className="border-b border-slate-100 pb-4 text-lg font-medium text-slate-950"
                            >
                                Usługi
                            </Link>
                            <div className="pt-2">
                                <Button href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                                    Kontakt
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </header>
    );
}
