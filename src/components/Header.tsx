"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import NotchedButton from './ui/NotchedButton';
import MegaMenu from './MegaMenu';
import Wordmark from './ui/Wordmark';
import { createHoverIntent, type HoverIntent } from '@/lib/hover-intent';

const navItems = [
    { href: '/portfolio', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/o-nas', label: 'O nas' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sheetTop, setSheetTop] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const stripRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const mobileSheetRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesTriggerRef = useRef<HTMLButtonElement>(null);
    const servicesPanelRef = useRef<HTMLDivElement>(null);
    const intentRef = useRef<HoverIntent | null>(null);
    const focusPanelOnOpen = useRef(false);

    useEffect(() => {
        const intent = createHoverIntent({ onOpenChange: setServicesOpen });
        intentRef.current = intent;
        return () => intent.dispose();
    }, []);

    const closeServices = () => intentRef.current?.close();

    // Escape closes the menu and hands focus back to its trigger.
    useEffect(() => {
        if (!servicesOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeServices();
                servicesTriggerRef.current?.focus();
                return;
            }
            // The panel follows the whole nav in DOM order; stitch Tab back into the nav at both ends.
            const links = [...(servicesPanelRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])];
            if (e.key !== 'Tab' || !links.length) return;
            const active = document.activeElement;
            if (e.shiftKey && active === links[0]) {
                e.preventDefault();
                servicesTriggerRef.current?.focus();
            } else if (!e.shiftKey && active === links[links.length - 1]) {
                e.preventDefault();
                closeServices();
                (servicesTriggerRef.current?.nextElementSibling as HTMLElement | null)?.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [servicesOpen]);

    // A keyboard-opened menu moves focus to its first link, since the panel follows the whole nav in DOM order.
    useEffect(() => {
        if (!servicesOpen || !focusPanelOnOpen.current) return;
        focusPanelOnOpen.current = false;
        const raf = requestAnimationFrame(() => servicesPanelRef.current?.querySelector<HTMLElement>('a[href]')?.focus());
        return () => cancelAnimationFrame(raf);
    }, [servicesOpen]);

    // Hover intent is for mouse only; touch and pen go through click.
    const onServicesPointerEnter = (e: React.PointerEvent) => {
        if (e.pointerType === 'mouse') intentRef.current?.enter();
    };
    const onServicesPointerLeave = (e: React.PointerEvent) => {
        if (e.pointerType === 'mouse') intentRef.current?.leave();
    };
    // Close once keyboard focus leaves both the trigger and the panel.
    const onServicesBlur = (e: React.FocusEvent) => {
        const next = e.relatedTarget as Node | null;
        if (next && (servicesTriggerRef.current?.contains(next) || servicesPanelRef.current?.contains(next))) return;
        if (next) closeServices();
    };

    // The header is "scrolled" once the announcement strip above it has left the viewport.
    useEffect(() => {
        const strip = stripRef.current;
        if (!strip) return;
        const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
        observer.observe(strip);
        return () => observer.disconnect();
    }, []);

    const toggleMobile = () => {
        // Pin the sheet to the header's live bottom edge (the announcement strip may still be on screen).
        if (!mobileOpen) setSheetTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
        setMobileOpen((v) => !v);
    };

    useEffect(() => {
        if (!mobileOpen) return;
        document.body.style.overflow = 'hidden';
        const sheet = mobileSheetRef.current;
        sheet?.querySelector<HTMLElement>('a[href]')?.focus({ preventScroll: true });

        // Escape closes; Tab cycles between the toggle and the sheet so focus never falls behind it.
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileOpen(false);
                mobileToggleRef.current?.focus();
                return;
            }
            if (e.key !== 'Tab' || !sheet) return;
            const focusables = [mobileToggleRef.current, ...sheet.querySelectorAll<HTMLElement>('a[href], button')].filter(Boolean) as HTMLElement[];
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const inside = focusables.includes(document.activeElement as HTMLElement);
            if (!inside) {
                e.preventDefault();
                (e.shiftKey ? last : first).focus();
            } else if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        // Re-pin to the header after rotation/resize; close once the desktop nav takes over (sheet is md:hidden).
        const desktop = window.matchMedia('(min-width: 768px)');
        const onResize = () => {
            if (desktop.matches) setMobileOpen(false);
            else setSheetTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
        };
        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
        };
    }, [mobileOpen]);

    return (
        <>
            <div ref={stripRef} style={{ borderBottom: '1px solid var(--line)', padding: '9px var(--pad-x)', display: 'flex', justifyContent: 'center', background: 'var(--panel)', textAlign: 'center' }}>
                <span className="ct-mono" style={{ fontWeight: 500, fontSize: 12, color: 'var(--muted)', letterSpacing: '-0.1px' }}>
                    AI-native partner produktowy — zobacz{' '}
                    <Link href="/#proces" style={{ fontWeight: 600 }}>jak działamy →</Link>
                </span>
            </div>

            <header ref={headerRef} className="ct-header" data-scrolled={scrolled}>
                {/* Sits above the MegaMenu scrim so the trigger stays hoverable while the menu is open. */}
                <div className="ct-header-shell relative z-[60] mx-auto flex max-w-[1440px] items-center justify-between gap-4">
                    <Link href="/" aria-label="CreativeTrust — strona główna" style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
                        <Wordmark />
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex" aria-label="Główna nawigacja">
                        <button
                            ref={servicesTriggerRef}
                            type="button"
                            aria-expanded={servicesOpen}
                            aria-controls="services-menu"
                            onPointerEnter={onServicesPointerEnter}
                            onPointerLeave={onServicesPointerLeave}
                            onBlur={onServicesBlur}
                            onClick={(e) => {
                                // detail === 0: activated from the keyboard, not a pointer.
                                focusPanelOnOpen.current = e.detail === 0 && !servicesOpen;
                                intentRef.current?.click();
                            }}
                            className="ct-nav-link"
                            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', color: servicesOpen ? 'var(--accent)' : undefined }}
                        >
                            Usługi
                            <ChevronDown size={14} style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }} />
                        </button>
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="ct-nav-link">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <NotchedButton href="/kontakt" variant="outline" size="sm" className="hidden md:inline-flex">
                        Umów konsultację
                    </NotchedButton>

                    <button
                        ref={mobileToggleRef}
                        type="button"
                        className="inline-flex items-center justify-center md:hidden"
                        onClick={toggleMobile}
                        aria-controls="mobile-menu"
                        aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
                        aria-expanded={mobileOpen}
                        style={{ background: '#fff', border: '1px solid var(--line-strong)', borderRadius: 999, width: 40, height: 40, color: 'var(--text)', cursor: 'pointer', flex: 'none', padding: 0, touchAction: 'manipulation' }}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                <MegaMenu
                    id="services-menu"
                    isOpen={servicesOpen}
                    onClose={closeServices}
                    panelRef={servicesPanelRef}
                    onPointerEnter={onServicesPointerEnter}
                    onPointerLeave={onServicesPointerLeave}
                    onBlur={onServicesBlur}
                />

            </header>

            {/* Unrolls downward from the header and rolls back up the same way; critically damped, no bounce. */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        ref={mobileSheetRef}
                        id="mobile-menu"
                        initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
                        exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
                        transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', bounce: 0, duration: 0.35 }}
                        style={{ position: 'fixed', top: sheetTop, bottom: 0, left: 0, right: 0, background: '#fff', zIndex: 130, padding: '8px var(--pad-x) 32px', overflowY: 'auto', overscrollBehavior: 'contain', borderTop: '1px solid var(--line)' }}
                        className="flex flex-col md:hidden"
                    >
                        {[{ href: '/uslugi', label: 'Usługi' }, ...navItems, { href: '/kontakt', label: 'Kontakt' }].map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                                {item.label}
                                <span className="ct-mono" style={{ color: 'var(--muted-2)', fontSize: 13 }}>→</span>
                            </Link>
                        ))}
                        <div style={{ paddingTop: 24 }}>
                            <NotchedButton href="/kontakt" onClick={() => setMobileOpen(false)}>
                                Umów konsultację
                            </NotchedButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
