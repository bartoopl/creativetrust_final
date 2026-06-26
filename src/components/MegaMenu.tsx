"use client";

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const services = [
    { id: 'strony-www', title: 'Strony WWW', description: 'Strony firmowe, landing pages, UX i wdrożenie.' },
    { id: 'e-commerce', title: 'E-commerce', description: 'Headless commerce, migracje i integracje.' },
    { id: 'social-media', title: 'Social Media', description: 'Komunikacja, content i prowadzenie kanałów.' },
    { id: 'marketing-automation', title: 'Marketing Automation', description: 'Automatyzacje, segmentacja i lead nurturing.' },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <>
                    <motion.button
                        aria-label="Zamknij menu"
                        className="fixed inset-0 z-40 bg-slate-950/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-0 right-0 top-[73px] z-50 border-b border-slate-200 bg-white"
                    >
                        <div className="mx-auto grid max-w-[1800px] gap-8 px-6 py-8 md:grid-cols-[0.75fr_1.25fr]">
                            <div className="max-w-md">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                    Zakres usług
                                </p>
                                <h3 className="mt-3 text-2xl font-medium text-slate-950">
                                    Wybierasz obszar, my spinamy strategię, wykonanie i rozwój.
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-slate-600">
                                    Najczęściej wchodzimy od jednego problemu, ale projektujemy całość tak, żeby nie rozjechać
                                    komunikacji między stroną, sprzedażą i marketingiem.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link href="/uslugi" onClick={onClose} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-950 hover:border-slate-950">
                                        Wszystkie usługi
                                    </Link>
                                    <Link href="/kontakt" onClick={onClose} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-950 hover:border-slate-950">
                                        Kontakt
                                    </Link>
                                </div>
                            </div>

                            <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
                                {services.map((service) => (
                                    <Link
                                        key={service.id}
                                        href={`/uslugi/${service.id}`}
                                        onClick={onClose}
                                        className="group bg-white p-5 transition-colors hover:bg-slate-50"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                                    Service
                                                </p>
                                                <h4 className="mt-2 text-lg font-medium text-slate-950">
                                                    {service.title}
                                                </h4>
                                            </div>
                                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-slate-950">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 7H17V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-slate-600">
                                            {service.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    );
}
