"use client";

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
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

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <>
                    <motion.button
                        aria-label="Zamknij menu"
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
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
                        className="fixed left-0 right-0 top-[73px] z-50 border-b border-black/10 bg-white shadow-[0_22px_80px_rgba(0,0,0,0.16)]"
                        onMouseLeave={onClose}
                    >
                        <div className="mx-auto grid max-w-[1800px] gap-6 px-6 py-6 lg:grid-cols-[0.9fr_1.3fr_1fr] lg:gap-8">
                            <div className="rounded-[28px] bg-black p-6 text-white lg:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                                    Zakres usług
                                </p>
                                <h3 className="mt-3 text-2xl font-medium leading-tight text-white lg:text-[32px]">
                                    Wybierasz obszar, my spinamy strategię, wykonanie i rozwój.
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-white/65">
                                    Najczęściej wchodzimy od jednego problemu, ale układamy całość tak, żeby oferta, treść i
                                    sprzedaż pracowały razem.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link href="/uslugi" onClick={onClose} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                                        Wszystkie usługi
                                    </Link>
                                    <Link href="/kontakt" onClick={onClose} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black">
                                        Kontakt
                                    </Link>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {services.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        onClick={onClose}
                                        className="group rounded-[22px] border border-black/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                                                    {service.accent}
                                                </p>
                                                <h4 className="mt-2 text-lg font-medium text-black">
                                                    {service.title}
                                                </h4>
                                            </div>
                                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-black">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 7H17V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-black/60">
                                            {service.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            <div className="rounded-[28px] border border-black/10 bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] p-6 lg:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                                    Landing pages SEO
                                </p>
                                <h4 className="mt-3 text-2xl font-medium text-black">
                                    Strony pod konkretne zapytania, nie tylko ogólną ofertę.
                                </h4>
                                <p className="mt-4 text-sm leading-6 text-black/60">
                                    Te podstrony zbierają ruch z fraz long-tail i odsyłają do głównych usług.
                                </p>

                                <div className="mt-6 space-y-3">
                                    {seoLandings.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={onClose}
                                            className="group flex items-start justify-between gap-4 rounded-2xl border border-black/10 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-black">{item.title}</p>
                                                <p className="mt-1 text-xs leading-5 text-black/55">{item.description}</p>
                                            </div>
                                            <span className="mt-0.5 text-black/40 transition-transform group-hover:translate-x-0.5">→</span>
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
