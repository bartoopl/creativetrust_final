"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { href: '/uslugi', label: 'Usługi' },
    { href: '/portfolio', label: 'Realizacje' },
    { href: '/o-nas', label: 'Podejście' },
    { href: '/blog', label: 'Insights' },
];

function Logo({ size = 30 }: { size?: number }) {
    return (
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: 'var(--text)' }}>
            <span style={{
                position: 'relative',
                width: size,
                height: size,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 'none',
                borderRadius: 8,
                border: '1px solid var(--line)',
                background: '#ffffff',
            }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent)' }} />
            </span>
            <span style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
                <span style={{ fontWeight: 500 }}>Creative</span>
                <span style={{ fontWeight: 700 }}>Trust</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>.</span>
            </span>
        </Link>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 110,
            background: '#000000',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-header-shell flex items-center justify-between gap-6">
                <Logo />

                <nav className="hidden items-center gap-0 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                height: 72,
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0 16px',
                                fontSize: 13.5,
                                color: 'rgba(255,255,255,0.92)',
                                textDecoration: 'none',
                                letterSpacing: '-0.28px',
                                fontWeight: 400,
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/kontakt"
                        style={{
                            marginLeft: 12,
                            height: 40,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0,
                            padding: '5px',
                            borderRadius: 4,
                            background: '#ffffff',
                            color: '#202124',
                            textDecoration: 'none',
                            fontSize: 13.2,
                            fontWeight: 500,
                            boxShadow: 'inset 0 0 0 1px #ffffff',
                        }}
                    >
                        <span style={{ padding: '0 12px' }}>Book consultation</span>
                        <span style={{
                            width: 30,
                            height: 30,
                            borderRadius: 2,
                            background: 'rgba(0,0,0,0.1)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000',
                            fontSize: 14,
                            lineHeight: 1,
                        }}>
                            →
                        </span>
                    </Link>
                </nav>

                {/* Mobile toggle */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center md:hidden"
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
                    aria-expanded={mobileOpen}
                    style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 999,
                        width: 40,
                        height: 40,
                        color: '#fff',
                        cursor: 'pointer',
                        flex: 'none',
                        padding: 0,
                        touchAction: 'manipulation',
                    }}
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: '64px 0 0 0',
                        background: 'rgba(0,0,0,0.98)',
                        zIndex: 130,
                        padding: '24px 32px',
                        maxHeight: 'calc(100dvh - 64px)',
                        overflowY: 'auto',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                    className="flex flex-col gap-4 md:hidden"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ fontSize: 20, fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, color: '#fff', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        {item.label}
                    </Link>
                    ))}
                    <div style={{ paddingTop: 20 }}>
                        <Link href="/kontakt" onClick={() => setMobileOpen(false)} style={{
                            height: 40,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0,
                            padding: '5px',
                            borderRadius: 4,
                            background: '#ffffff',
                            color: '#202124',
                            textDecoration: 'none',
                            fontSize: 13.2,
                            fontWeight: 500,
                            boxShadow: 'inset 0 0 0 1px #ffffff',
                        }}>
                            <span style={{ padding: '0 12px' }}>Book consultation</span>
                            <span style={{
                                width: 30,
                                height: 30,
                                borderRadius: 2,
                                background: 'rgba(0,0,0,0.1)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                                fontSize: 14,
                                lineHeight: 1,
                            }}>
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
