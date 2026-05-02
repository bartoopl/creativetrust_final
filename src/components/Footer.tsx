"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ConsentManager from './ConsentManager';

const Footer: React.FC = () => {
    const [showConsentManager, setShowConsentManager] = useState(false);

    return (
        <footer className="w-full py-16 md:py-24 px-6 bg-black overflow-hidden">
            <div className="max-w-[1800px] mx-auto">
                {/* Główny nagłówek CTA */}
                <div className="mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 md:mb-10 tracking-tight">
                        Porozmawiajmy <br className="hidden md:block" />o rozwiązaniach dla Ciebie
                    </h2>

                    <div>
                        <Link
                            href="/kontakt"
                            className="group relative inline-flex items-center justify-center gap-2
                                bg-white text-black px-6 py-3 rounded-full font-medium
                                transition-all duration-300 ease-in-out
                                hover:bg-transparent hover:text-white hover:border hover:border-white"
                        >
                            <span>Porozmawiajmy</span>
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
                </div>

                {/* Linki nawigacyjne i social media */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-gray-800">
                    {/* Main navigation */}
                    <div className="mb-6 md:mb-0">
                        <nav className="flex flex-col md:flex-row gap-3 md:gap-8">
                            <Link
                                href="/"
                                className="text-white hover:text-gray-300"
                            >
                                Home
                            </Link>
                            <Link
                                href="/portfolio"
                                className="text-white hover:text-gray-300"
                            >
                                Realizacje
                            </Link>
                            <Link
                                href="/o-nas"
                                className="text-white hover:text-gray-300"
                            >
                                O nas
                            </Link>
                            <Link
                                href="/kontakt"
                                className="text-white hover:text-gray-300"
                            >
                                Kontakt
                            </Link>
                            <Link
                                href="/baza-wiedzy"
                                className="text-white hover:text-gray-300"
                            >
                                Baza wiedzy
                            </Link>
                            <Link
                                href="/panel-klienta"
                                className="text-white hover:text-gray-300"
                            >
                                Panel Klienta
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-gray-400 text-sm mb-4">Usługi</h3>
                        <nav className="flex flex-col gap-3">
                            <Link href="/uslugi/strony-www" className="text-white hover:text-gray-300">
                                Strony WWW
                            </Link>
                            <Link href="/uslugi/tworzenie-stron-www-cennik" className="text-white hover:text-gray-300">
                                Cennik stron WWW
                            </Link>
                            <Link href="/uslugi/performance-marketing" className="text-white hover:text-gray-300">
                                Performance Marketing
                            </Link>
                            <Link href="/uslugi/audyt-google-ads" className="text-white hover:text-gray-300">
                                Audyt Google Ads
                            </Link>
                            <Link href="/uslugi/performance-marketing/google-ads" className="text-white hover:text-gray-300">
                                Google Ads
                            </Link>
                            <Link href="/uslugi/performance-marketing/meta-ads" className="text-white hover:text-gray-300">
                                Meta Ads
                            </Link>
                            <Link href="/uslugi/e-commerce" className="text-white hover:text-gray-300">
                                E-commerce
                            </Link>
                            <Link href="/uslugi/migracja-woocommerce-do-headless" className="text-white hover:text-gray-300">
                                Migracja WooCommerce
                            </Link>
                            <Link href="/uslugi/branding" className="text-white hover:text-gray-300">
                                Branding
                            </Link>
                            <Link href="/uslugi/marketing-automation" className="text-white hover:text-gray-300">
                                Marketing Automation
                            </Link>
                        </nav>
                    </div>

                    {/* Right section - Social media links */}
                    <div className="flex justify-end">
                        <div className="flex flex-col gap-3">
                            <Link
                                href="https://www.linkedin.com/company/creativetrust"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-gray-300"
                            >
                                <span className="mr-auto">LinkedIn</span>
                                <span className="ml-8">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-white"
                                    >
                                        <path
                                            d="M7 17L17 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7 7H17V17"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Link>

                            <Link
                                href="https://www.facebook.com/creativetrustpl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-gray-300"
                            >
                                <span className="mr-auto">Facebook</span>
                                <span className="ml-8">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-white"
                                    >
                                        <path
                                            d="M7 17L17 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7 7H17V17"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Link>

                            <Link
                                href="https://www.instagram.com/creativetrust_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-white hover:text-gray-300"
                            >
                                <span className="mr-auto">Instagram</span>
                                <span className="ml-8">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-white"
                                    >
                                        <path
                                            d="M7 17L17 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M7 7H17V17"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Informacje o prawach autorskich i ustawienia prywatności */}
                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p className="mb-2">&copy; {new Date().getFullYear()} Creative Trust. Wszelkie prawa zastrzeżone.</p>
                    <div className="flex justify-center space-x-6">
                        <Link href="/polityka-prywatnosci" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Polityka Prywatności
                        </Link>
                        <button
                            onClick={() => setShowConsentManager(true)}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            Ustawienia prywatności
                        </button>
                    </div>
                </div>
            </div>

            {/* Panel zarządzania zgodami */}
            {showConsentManager && <ConsentManager onClose={() => setShowConsentManager(false)} />}
        </footer>
    );
};

export default Footer;