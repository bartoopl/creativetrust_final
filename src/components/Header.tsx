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
            <span style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
                    <circle cx="15" cy="15" r="11.5" stroke="var(--accent)" strokeWidth="1.5" />
                </svg>
                <span style={{ position: 'absolute', inset: 0, animation: 'ctspin 7s linear infinite' }}>
                    <span style={{ position: 'absolute', top: 1, left: '50%', width: 5, height: 5, marginLeft: -2.5, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 9px var(--glow)' }} />
                </span>
            </span>
            <span style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em' }}>
                <span style={{ fontWeight: 500 }}>creative</span>
                <span style={{ fontWeight: 700 }}>trust</span>
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
            position: 'sticky', top: 0, zIndex: 50,
            backdropFilter: 'blur(14px)',
            background: scrolled ? 'color-mix(in srgb, var(--bg) 88%, transparent)' : 'color-mix(in srgb, var(--bg) 72%, transparent)',
            borderBottom: '1px solid var(--line)',
            transition: 'background .3s ease',
        }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                <Logo />

                {/* Desktop nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="hidden md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }}
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
                    className="md:hidden"
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
                    style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 999, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)', cursor: 'pointer' }}
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: '73px 0 0 0', background: 'var(--bg)', zIndex: 40, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            style={{ fontSize: 22, fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid var(--line)' }}
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
