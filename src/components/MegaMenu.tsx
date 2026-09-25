"use client";

import Link from 'next/link';
import type { Ref } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MegaMenuProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    panelRef?: Ref<HTMLDivElement>;
    onPointerEnter?: (e: React.PointerEvent) => void;
    onPointerLeave?: (e: React.PointerEvent) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

const services = [
    { href: '/uslugi/strony-www', title: 'Strony WWW', description: 'Strony firmowe, landing pages, UX i performance.', accent: 'Konwersja' },
    { href: '/uslugi/e-commerce', title: 'E-commerce', description: 'Headless commerce, migracje i integracje systemów.', accent: 'Skalowanie' },
    { href: '/uslugi/marketing-automation', title: 'Marketing Automation', description: 'SALESmanago, lejki, CRM i personalizacja.', accent: 'Automatyzacja' },
    { href: '/uslugi/social-media', title: 'Social Media', description: 'Strategia, content, kampanie i raportowanie.', accent: 'Widoczność' },
];

const seoLandings = [
    {
        href: '/uslugi/migracja-woocommerce-do-headless',
        title: 'Migracja WooCommerce do headless',
        description: 'Fraza dla sklepów, które rosną ponad monolit.',
    },
    {
        href: '/uslugi/wdrozenie-salesmanago',
        title: 'Wdrożenie SALESmanago',
        description: 'Landing pod zapytania o partnera i implementację.',
    },
    {
        href: '/uslugi/landing-page-google-ads',
        title: 'Landing page Google Ads',
        description: 'Strony pod kampanie i reklamy płatne.',
    },
    {
        href: '/uslugi/tworzenie-stron-www-cennik',
        title: 'Tworzenie stron WWW cennik',
        description: 'Wycena, zakres i orientacyjny budżet.',
    },
    {
        href: '/uslugi/strona-firmowa-cena',
        title: 'Strona firmowa cena',
        description: 'Wycena strony firmowej i zakres projektu.',
    },
    {
        href: '/uslugi/landing-page-pod-reklamy',
        title: 'Landing page pod reklamy',
        description: 'Strona pod kampanie i lead generation.',
    },
    {
        href: '/uslugi/headless-woocommerce',
        title: 'Headless WooCommerce',
        description: 'Nowy storefront dla rozwijającego się sklepu.',
    },
];

export default function MegaMenu({ id, isOpen, onClose, panelRef, onPointerEnter, onPointerLeave, onBlur }: MegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <>
                    <motion.button
                        type="button"
                        tabIndex={-1}
                        aria-label="Zamknij menu"
                        className="fixed inset-0 z-40 cursor-default"
                        style={{ background: 'rgba(17,24,39,0.12)', border: 'none' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drops down out of the header along the same path it leaves by; critically damped, no overshoot. */}
                    <motion.div
                        id={id}
                        ref={panelRef}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.25 }}
                        className="absolute left-0 right-0 top-full z-50"
                        style={{ background: '#fff', borderBottom: '1px solid var(--line-strong)' }}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onBlur={onBlur}
                    >
                        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.9fr_1.4fr_1fr]" style={{ padding: '0 var(--pad-x)' }}>
                            <div className="flex flex-col gap-4 py-8 lg:pr-8" style={{ borderRight: '1px solid var(--line)' }}>
                                <span className="ct-eyebrow">Zakres usług</span>
                                <p style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.25, color: 'var(--text)' }}>
                                    Wybierasz obszar, my spinamy strategię, wykonanie i rozwój.
                                </p>
                                <p className="ct-body">
                                    Najczęściej wchodzimy od jednego problemu, ale układamy całość tak, żeby oferta, treść i
                                    sprzedaż pracowały razem.
                                </p>
                                <div className="mt-2 flex flex-wrap gap-3">
                                    <Link href="/uslugi" onClick={onClose} className="ct-link">Wszystkie usługi →</Link>
                                    <Link href="/kontakt" onClick={onClose} className="ct-link">Kontakt →</Link>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2" style={{ gap: 1, background: 'var(--line)', borderRight: '1px solid var(--line)' }}>
                                {services.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        onClick={onClose}
                                        className="group flex flex-col gap-2 p-6 transition-colors"
                                        style={{ background: '#fff' }}
                                    >
                                        <span className="ct-meta" style={{ color: 'var(--accent)' }}>{service.accent}</span>
                                        <span className="flex items-center justify-between gap-4" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
                                            {service.title}
                                            <span className="ct-mono transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--accent)', fontSize: 13 }}>→</span>
                                        </span>
                                        <span className="ct-body" style={{ fontSize: 13 }}>{service.description}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 py-8 lg:pl-8" style={{ background: 'var(--panel)' }}>
                                <span className="ct-eyebrow" style={{ color: 'var(--muted)' }}>Landing pages</span>
                                <div className="flex flex-col">
                                    {seoLandings.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className="group flex items-center justify-between gap-4 py-2.5"
                                            style={{ borderTop: '1px solid var(--line)', color: 'var(--text)' }}
                                        >
                                            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{item.title}</span>
                                            <span className="ct-mono transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--muted-2)', fontSize: 12 }}>→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    );
}
