"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const services: Service[] = [
    {
        id: 'strony-www',
        title: 'Strony WWW',
        description: 'Projektujemy i wdrażamy nowoczesne strony internetowe.',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        color: 'bg-black'
    },
    {
        id: 'e-commerce',
        title: 'E-commerce',
        description: 'Tworzymy sklepy internetowe, które generują sprzedaż.',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
        color: 'bg-black'
    },
    {
        id: 'branding',
        title: 'Branding',
        description: 'Budujemy silne marki, które wyróżniają się na tle konkurencji.',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        color: 'bg-black'
    },
    {
        id: 'marketing-automation',
        title: 'Marketing Automation',
        description: 'Automatyzujemy procesy marketingowe i zwiększamy skuteczność.',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'bg-black'
    },
    {
        id: 'performance-marketing',
        title: 'Performance Marketing',
        description: 'Tworzymy i optymalizujemy kampanie nastawione na wyniki.',
        icon: (
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        color: 'bg-black'
    }
];

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // Obsługa kliknięcia poza menu, aby je zamknąć
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Zapobieganie scrollowaniu strony, gdy menu jest otwarte
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose}
                    />

                    {/* Mega Menu */}
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[76px] left-0 right-0 bg-white z-50 shadow-xl border-t border-gray-100"
                    >
                        <div className="max-w-[1800px] mx-auto px-6 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                {/* Główne usługi */}
                                <div className="col-span-2">
                                    <h3 className="text-lg font-medium mb-6">Nasze usługi</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {services.map((service) => (
                                            <Link
                                                key={service.id}
                                                href={`/uslugi/${service.id}`}
                                                className="p-4 rounded-xl hover:bg-gray-50 transition-colors flex flex-col h-full"
                                                onClick={onClose}
                                            >
                                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${service.color} mb-4`}>
                                                    {service.icon}
                                                </div>
                                                <h4 className="text-lg font-medium mb-2">{service.title}</h4>
                                                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                                <div className="mt-auto flex items-center text-sm font-medium text-gray-900">
                                                    <span>Dowiedz się więcej</span>
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="ml-2"
                                                    >
                                                        <path
                                                            d="M5 12H19"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 5L19 12L12 19"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Prawa kolumna z dodatkowymi linkami */}
                                <div>
                                    <h3 className="text-lg font-medium mb-6">Przydatne linki</h3>
                                    <div className="space-y-4">
                                        <Link
                                            href="/uslugi"
                                            className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                            onClick={onClose}
                                        >
                                            <h4 className="text-lg font-medium mb-1">Wszystkie usługi</h4>
                                            <p className="text-gray-600 text-sm">Zobacz pełną ofertę naszych usług</p>
                                        </Link>

                                        <Link
                                            href="/portfolio"
                                            className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                            onClick={onClose}
                                        >
                                            <h4 className="text-lg font-medium mb-1">Portfolio</h4>
                                            <p className="text-gray-600 text-sm">Zobacz nasze realizacje</p>
                                        </Link>

                                        <Link
                                            href="/blog"
                                            className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                            onClick={onClose}
                                        >
                                            <h4 className="text-lg font-medium mb-1">Blog</h4>
                                            <p className="text-gray-600 text-sm">Artykuły i porady</p>
                                        </Link>

                                        <div className="border-t border-gray-100 my-6"></div>

                                        <Link
                                            href="/kontakt"
                                            className="block p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                            onClick={onClose}
                                        >
                                            <h4 className="text-lg font-medium mb-1">Skontaktuj się z nami</h4>
                                            <p className="text-gray-300 text-sm">Umów bezpłatną konsultację</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;