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
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
            }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent)' }} />
            </span>
            <span style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.02em' }}>
                <span style={{ fontWeight: 500 }}>Creative</span>
                <span style={{ fontWeight: 700 }}>Trust</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>.</span>
            </span>
        </Link>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <header style={{
            position: 'sticky', top: 0, zIndex: 110,
            backdropFilter: 'blur(14px)',
            background: scrolled ? 'rgba(8, 9, 12, 0.84)' : 'rgba(8, 9, 12, 0.68)',
            borderBottom: '1px solid var(--line)',
            transition: 'background .3s ease',
        }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '12px 32px' }} className="flex items-center justify-between gap-6">
                <Logo />

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/kontakt" className="ct-cta sm">
                        Umów konsultację
                        <span className="ct-badge">
                            <span className="ct-arrows"><span>→</span><span>→</span></span>
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
                        background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
                        border: '1px solid var(--line)',
                        borderRadius: 999,
                        width: 40,
                        height: 40,
                        color: 'var(--text)',
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
                        inset: '68px 0 0 0',
                        background: 'color-mix(in srgb, var(--bg) 98%, transparent)',
                        zIndex: 130,
                        padding: '24px 32px',
                        maxHeight: 'calc(100dvh - 68px)',
                        overflowY: 'auto',
                        borderTop: '1px solid var(--line)',
                        backdropFilter: 'blur(14px)',
                    }}
                    className="flex flex-col gap-4 md:hidden"
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ fontSize: 20, fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid var(--line)' }}
                    >
                        {item.label}
                    </Link>
                    ))}
                    <div style={{ paddingTop: 20 }}>
                        <Link href="/kontakt" className="ct-cta" onClick={() => setMobileOpen(false)}>
                            Umów konsultację
                            <span className="ct-badge">
                                <span className="ct-arrows"><span>→</span><span>→</span></span>
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
