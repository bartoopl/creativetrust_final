"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import NotchedButton from './ui/NotchedButton';
import MegaMenu from './MegaMenu';

const navItems = [
    { href: '/portfolio', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/o-nas', label: 'O nas' },
];

function LogoMark({ dark = false }: { dark?: boolean }) {
    const fill = dark ? '#000' : '#fff';
    return (
        <svg width="154" height="19" viewBox="0 0 154 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CreativeTrust">
            <rect x="0" y="0" width="3" height="3" fill={fill} />
            <rect x="4" y="0" width="3" height="3" fill={fill} />
            <rect x="8" y="0" width="3" height="3" fill={fill} />
            <rect x="0" y="4" width="3" height="3" fill={fill} />
            <rect x="0" y="8" width="3" height="3" fill={fill} />
            <rect x="0" y="12" width="3" height="3" fill={fill} />
            <rect x="0" y="16" width="3" height="3" fill={fill} />
            <rect x="4" y="16" width="3" height="3" fill={fill} />
            <rect x="8" y="16" width="3" height="3" fill={fill} />
            <text x="16" y="14" fontFamily="Inter,-apple-system,BlinkMacSystemFont,sans-serif" fontSize="13.5" fontWeight="500" letterSpacing="-0.4" fill={fill}>
                creativetrust
            </text>
        </svg>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 110, background: '#000', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-header-shell flex items-center justify-between">
                <Link href="/" style={{ display: 'flex', alignItems: 'center', flex: 'none', textDecoration: 'none' }}>
                    <LogoMark />
                </Link>

                <nav className="hidden items-center gap-0 md:flex" style={{ marginLeft: 184 }}>
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={servicesOpen}
                        onMouseEnter={() => setServicesOpen(true)}
                        onFocus={() => setServicesOpen(true)}
                        onClick={() => setServicesOpen((value) => !value)}
                        style={{ height: 72, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13.5, fontWeight: 400, color: '#fff', textDecoration: 'none', letterSpacing: '-0.28px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        Usługi
                        <svg width="7" height="4" viewBox="0 0 7 4" fill="currentColor" style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }}>
                            <path d="M 4 4 L 3 4 L 3 3 L 4 3 L 4 4 Z M 3 3 L 2 3 L 2 2 L 3 2 L 3 3 Z M 5 3 L 4 3 L 4 2 L 5 2 L 5 3 Z M 2 2 L 1 2 L 1 1 L 2 1 L 2 2 Z M 6 2 L 5 2 L 5 1 L 6 1 L 6 2 Z M 1 1 L 0 1 L 0 0 L 1 0 L 1 1 Z M 7 1 L 6 1 L 6 0 L 7 0 L 7 1 Z" fillRule="evenodd" />
                        </svg>
                    </button>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{ height: 72, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13.5, fontWeight: 400, color: '#fff', textDecoration: 'none', letterSpacing: '-0.28px' }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <NotchedButton href="/kontakt" variant="primary-dark" className="hidden md:inline-flex">
                    Umów konsultację
                </NotchedButton>

                <button
                    type="button"
                    className="inline-flex items-center justify-center md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
                    aria-expanded={mobileOpen}
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, width: 40, height: 40, color: '#fff', cursor: 'pointer', flex: 'none', padding: 0, touchAction: 'manipulation' }}
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            <MegaMenu isOpen={servicesOpen} onClose={() => setServicesOpen(false)} />

            {mobileOpen && (
                <div style={{ position: 'fixed', inset: '64px 0 0 0', background: 'rgba(0,0,0,0.98)', zIndex: 130, padding: '24px 32px', maxHeight: 'calc(100dvh - 64px)', overflowY: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="flex flex-col gap-4 md:hidden">
                    <Link href="/uslugi" onClick={() => setMobileOpen(false)} style={{ fontSize: 20, fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, color: '#fff', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        Usługi
                    </Link>
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 20, fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, color: '#fff', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            {item.label}
                        </Link>
                    ))}
                    <div style={{ paddingTop: 20 }}>
                        <NotchedButton href="/kontakt" variant="primary-dark" onClick={() => setMobileOpen(false)}>
                            Umów konsultację
                        </NotchedButton>
                    </div>
                </div>
            )}
        </header>
    );
}
