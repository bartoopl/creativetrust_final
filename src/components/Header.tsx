"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { href: '/uslugi', label: 'Usługi', chevron: true },
    { href: '/portfolio', label: 'Case Studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/o-nas', label: 'O nas', chevron: true },
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
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{ height: 72, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13.5, fontWeight: 400, color: '#fff', textDecoration: 'none', letterSpacing: '-0.28px' }}
                        >
                            {item.label}
                            {item.chevron && (
                                <svg width="7" height="4" viewBox="0 0 7 4" fill="currentColor">
                                    <path d="M 4 4 L 3 4 L 3 3 L 4 3 L 4 4 Z M 3 3 L 2 3 L 2 2 L 3 2 L 3 3 Z M 5 3 L 4 3 L 4 2 L 5 2 L 5 3 Z M 2 2 L 1 2 L 1 1 L 2 1 L 2 2 Z M 6 2 L 5 2 L 5 1 L 6 1 L 6 2 Z M 1 1 L 0 1 L 0 0 L 1 0 L 1 1 Z M 7 1 L 6 1 L 6 0 L 7 0 L 7 1 Z" fillRule="evenodd" />
                                </svg>
                            )}
                        </Link>
                    ))}
                </nav>

                <Link
                    href="/kontakt"
                    className="hidden md:inline-flex"
                    style={{ alignItems: 'stretch', height: 40, borderRadius: 4, background: '#fff', cursor: 'pointer', flexShrink: 0, textDecoration: 'none', boxShadow: 'inset 0 0 0 1px #fff' }}
                >
                    <span style={{ padding: '9px 12px', fontSize: 13.2, fontWeight: 500, color: 'rgb(32,31,36)', whiteSpace: 'nowrap', lineHeight: '21px' }}>Umów konsultację</span>
                    <span style={{ width: 30, margin: '5px 5px 5px 0', borderRadius: 2, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill="rgb(0,0,0)">
                            <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
                        </svg>
                    </span>
                </Link>

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

            {mobileOpen && (
                <div style={{ position: 'fixed', inset: '64px 0 0 0', background: 'rgba(0,0,0,0.98)', zIndex: 130, padding: '24px 32px', maxHeight: 'calc(100dvh - 64px)', overflowY: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="flex flex-col gap-4 md:hidden">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 20, fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, color: '#fff', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            {item.label}
                        </Link>
                    ))}
                    <div style={{ paddingTop: 20 }}>
                        <Link href="/kontakt" onClick={() => setMobileOpen(false)} style={{ height: 40, display: 'inline-flex', alignItems: 'stretch', borderRadius: 4, background: '#fff', cursor: 'pointer', flexShrink: 0, textDecoration: 'none', boxShadow: 'inset 0 0 0 1px #fff' }}>
                            <span style={{ padding: '9px 12px', fontSize: 13.2, fontWeight: 500, color: 'rgb(32,31,36)', whiteSpace: 'nowrap', lineHeight: '21px' }}>Umów konsultację</span>
                            <span style={{ width: 30, margin: '5px 5px 5px 0', borderRadius: 2, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill="rgb(0,0,0)">
                                    <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
