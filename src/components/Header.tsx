"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
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
            if (e.key !== 'Escape') return;
            closeServices();
            servicesTriggerRef.current?.focus();
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

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    return (
        <>
            <div style={{ borderBottom: '1px solid var(--line)', padding: '9px var(--pad-x)', display: 'flex', justifyContent: 'center', background: 'var(--panel)', textAlign: 'center' }}>
                <span className="ct-mono" style={{ fontWeight: 500, fontSize: 12, color: 'var(--muted)', letterSpacing: '-0.1px' }}>
                    AI-native partner produktowy — zobacz{' '}
                    <Link href="/#proces" style={{ fontWeight: 600 }}>jak działamy →</Link>
                </span>
            </div>

            <header style={{ position: 'sticky', top: 0, zIndex: 110, background: 'rgba(255,255,255,0.92)', backdropFilter: 'saturate(180%) blur(8px)', WebkitBackdropFilter: 'saturate(180%) blur(8px)', borderBottom: '1px solid var(--line)' }}>
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
                        type="button"
                        className="inline-flex items-center justify-center md:hidden"
                        onClick={() => setMobileOpen((v) => !v)}
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

                {mobileOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, height: 'calc(100dvh - 100%)', background: '#fff', zIndex: 130, padding: '8px var(--pad-x) 32px', overflowY: 'auto', borderTop: '1px solid var(--line)' }} className="flex flex-col md:hidden">
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
                    </div>
                )}
            </header>
        </>
    );
}
