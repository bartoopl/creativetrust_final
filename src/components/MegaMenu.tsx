"use client";

import Link from 'next/link';
import type { Ref } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { servicesFor, landingsFor } from '@/lib/site-services';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: {
        close: 'Zamknij menu',
        eyebrow: 'Zakres usług',
        lead: 'Audytujemy, prowadzimy i budujemy e-commerce.',
        body: 'Audyt pokazuje, co hamuje sprzedaż i marżę. Sklepy i strony internetowe budujemy także jako osobne projekty.',
        all: { href: '/uslugi', label: 'Wszystkie usługi →' },
        contact: { href: '/uslugi/audyt-e-commerce#formularz', label: 'Zamów audyt →' },
        landings: 'Sklepy i strony: konkretne potrzeby',
    },
    en: {
        close: 'Close menu',
        eyebrow: 'What we do',
        lead: 'We audit, run and build e-commerce.',
        body: 'The audit shows what is holding back sales and margin. We also build online stores and websites as standalone projects.',
        all: { href: '/en/services', label: 'All services →' },
        contact: { href: '/en/services/e-commerce-audit#form', label: 'Order an audit →' },
        landings: 'Landing pages',
    },
};

interface MegaMenuProps {
    id: string;
    locale: Locale;
    isOpen: boolean;
    onClose: () => void;
    panelRef?: Ref<HTMLDivElement>;
    onPointerEnter?: (e: React.PointerEvent) => void;
    onPointerLeave?: (e: React.PointerEvent) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

export default function MegaMenu({ id, locale, isOpen, onClose, panelRef, onPointerEnter, onPointerLeave, onBlur }: MegaMenuProps) {
    const t = copy[locale];
    const services = servicesFor(locale);
    const seoLandings = landingsFor(locale);
    return (
        <AnimatePresence>
            {isOpen ? (
                <>
                    <motion.button
                        type="button"
                        tabIndex={-1}
                        aria-label={t.close}
                        className="fixed inset-0 z-40 cursor-default"
                        style={{ background: 'rgba(0,0,0,0.12)', border: 'none' }}
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
                        style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line-strong)' }}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onBlur={onBlur}
                    >
                        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.9fr_1.4fr_1fr]" style={{ padding: '0 var(--pad-x)' }}>
                            <div className="flex flex-col gap-4 py-8 lg:pr-8" style={{ borderRight: '1px solid var(--line)' }}>
                                <span className="ct-eyebrow">{t.eyebrow}</span>
                                <p style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: 1.25, color: 'var(--text)' }}>
                                    {t.lead}
                                </p>
                                <p className="ct-body">{t.body}</p>
                                <div className="mt-2 flex flex-wrap gap-3">
                                    <Link href={t.all.href} onClick={onClose} className="ct-link">{t.all.label}</Link>
                                    <Link href={t.contact.href} onClick={onClose} className="ct-link">{t.contact.label}</Link>
                                </div>
                            </div>

                            {/* Odd service count: the last tile spans the row instead of leaving an empty hairline cell. */}
                            <div className="grid sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2" style={{ gap: 1, background: 'var(--line)', borderRight: '1px solid var(--line)' }}>
                                {services.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={service.href}
                                        onClick={onClose}
                                        className="group flex flex-col gap-2 p-6 transition-colors"
                                        style={{ background: 'var(--bg)' }}
                                    >
                                        <span className="ct-meta" style={{ color: 'var(--accent)' }}>{service.accent}</span>
                                        <span className="flex items-center justify-between gap-4" style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)' }}>
                                            {service.title}
                                            <span className="ct-mono transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--accent)', fontSize: 13 }}>→</span>
                                        </span>
                                        <span className="ct-body" style={{ fontSize: 13 }}>{service.description}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 py-8 lg:pl-8" style={{ background: 'var(--panel)' }}>
                                <span className="ct-eyebrow" style={{ color: 'var(--muted)' }}>{t.landings}</span>
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
