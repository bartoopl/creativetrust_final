"use client";

import { useState } from 'react';
import Link from 'next/link';
import ConsentManager from './ConsentManager';

const serviceLinks = [
    { href: '/uslugi/branding', label: 'Branding' },
    { href: '/uslugi/strony-www', label: 'Strony WWW' },
    { href: '/uslugi/e-commerce', label: 'E-commerce' },
    { href: '/uslugi/social-media', label: 'Social Media' },
    { href: '/uslugi/marketing-automation', label: 'Marketing Automation' },
];

export default function Footer() {
    const [showConsentManager, setShowConsentManager] = useState(false);

    return (
        <footer className="w-full bg-slate-950 px-6 py-16 text-white md:py-24">
            <div className="mx-auto max-w-[1800px]">
                <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                            CreativeTrust
                        </p>
                        <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-[1.05] md:text-5xl lg:text-6xl">
                            Jeśli chcesz uporządkować komunikację i przełożyć ją na wynik, porozmawiajmy.
                        </h2>
                    </div>

                    <div className="flex flex-col gap-4 lg:items-end">
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-transparent hover:text-white"
                        >
                            Umów rozmowę
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="7" y1="17" x2="17" y2="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="7 7 17 7 17 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <p className="max-w-md text-sm leading-6 text-white/60 lg:text-right">
                            Branding, strony WWW, e-commerce, social media i marketing automation. Zaczynamy od problemu,
                            kończymy na działającym systemie.
                        </p>
                    </div>
                </div>

                <div className="grid gap-8 py-10 md:grid-cols-3">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                            Nawigacja
                        </p>
                        <nav className="mt-4 flex flex-col gap-3 text-sm text-white/80">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <Link href="/uslugi" className="hover:text-white">Usługi</Link>
                            <Link href="/portfolio" className="hover:text-white">Realizacje</Link>
                            <Link href="/o-nas" className="hover:text-white">O nas</Link>
                            <Link href="/blog" className="hover:text-white">Blog</Link>
                            <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
                        </nav>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                            Usługi
                        </p>
                        <nav className="mt-4 flex flex-col gap-3 text-sm text-white/80">
                            {serviceLinks.map((service) => (
                                <Link key={service.href} href={service.href} className="hover:text-white">
                                    {service.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                            Kontakt
                        </p>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-white/80 md:items-end">
                            <Link href="mailto:office@creativetrust.pl" className="hover:text-white">
                                office@creativetrust.pl
                            </Link>
                            <Link href="https://www.linkedin.com/company/creativetrust" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                LinkedIn
                            </Link>
                            <Link href="https://www.instagram.com/creativetrust_/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                Instagram
                            </Link>
                            <button
                                onClick={() => setShowConsentManager(true)}
                                className="text-sm text-white/60 transition-colors hover:text-white"
                            >
                                Ustawienia prywatności
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>&copy; {new Date().getFullYear()} CreativeTrust. Wszystkie prawa zastrzeżone.</p>
                    <Link href="/polityka-prywatnosci" className="hover:text-white">
                        Polityka prywatności
                    </Link>
                </div>
            </div>

            {showConsentManager ? <ConsentManager onClose={() => setShowConsentManager(false)} /> : null}
        </footer>
    );
}
