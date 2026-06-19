"use client";

import { useState } from 'react';
import Link from 'next/link';
import ConsentManager from './ConsentManager';

const services = [
    { href: '/uslugi/branding', label: 'Strategia marki' },
    { href: '/uslugi/e-commerce', label: 'Web & e-commerce' },
    { href: '/uslugi/strony-www', label: 'Product design' },
    { href: '/uslugi/marketing-automation', label: 'AI & automatyzacja' },
];

const company = [
    { href: '/o-nas', label: 'O nas' },
    { href: '/portfolio', label: 'Realizacje' },
    { href: '/blog', label: 'Insights' },
    { href: '/kontakt', label: 'Kontakt' },
];

export default function Footer() {
    const [showConsent, setShowConsent] = useState(false);
    const year = new Date().getFullYear();

    return (
        <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '68px 32px 36px' }} className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">

                <h2 style={{
                    fontFamily: 'var(--font-space), sans-serif', fontWeight: 700,
                    fontSize: 'clamp(26px, 4.2vw, 48px)', letterSpacing: '-0.045em',
                    lineHeight: 1, margin: '0 0 64px', maxWidth: '18ch',
                }}>
                    Nie gonimy za trendami.{' '}
                    <span style={{ color: 'var(--accent)' }}>Tworzymy je.</span>
                </h2>

                <div style={{ paddingBottom: 44, borderBottom: '1px solid var(--line)' }} className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: 'var(--text)', marginBottom: 16 }}>
                            <span style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                border: '1px solid var(--line)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'color-mix(in srgb, var(--panel) 90%, transparent)',
                            }}>
                                <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--accent)' }} />
                            </span>
                            <span style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.02em' }}>
                                <span style={{ fontWeight: 500 }}>Creative</span>
                                <span style={{ fontWeight: 700 }}>Trust</span>
                                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>.</span>
                            </span>
                        </Link>
                        <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.55, maxWidth: '34ch', margin: 0 }}>
                            Strategia, design, development i automatyzacja w jednym zespole. AI-native partner produktowy.
                        </p>
                    </div>

                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 14 }}>Usługi</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                            {services.map(s => (
                                <Link key={s.href} href={s.href} style={{ color: 'var(--text)', opacity: 0.8, textDecoration: 'none', fontSize: 14, transition: 'opacity .2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
                                >{s.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 14 }}>Firma</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                            {company.map(s => (
                                <Link key={s.href} href={s.href} style={{ color: 'var(--text)', opacity: 0.8, textDecoration: 'none', fontSize: 14, transition: 'opacity .2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
                                >{s.label}</Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 14 }}>Kontakt</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                            <Link href="mailto:office@creativetrust.pl" style={{ color: 'var(--text)', opacity: 0.8, textDecoration: 'none', fontSize: 14 }}>office@creativetrust.pl</Link>
                            <Link href="https://www.linkedin.com/company/creativetrust" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', opacity: 0.8, textDecoration: 'none', fontSize: 14 }}>LinkedIn</Link>
                            <Link href="https://www.instagram.com/creativetrust_/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', opacity: 0.8, textDecoration: 'none', fontSize: 14 }}>Instagram</Link>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 22, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)' }}>
                            © {year} Creativetrust. Wszelkie prawa zastrzeżone.
                        </span>
                        <Link href="/polityka-prywatnosci" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                        >Polityka prywatności</Link>
                        <button
                            onClick={() => setShowConsent(true)}
                            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color .2s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                        >Ustawienia prywatności</button>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)' }}>Made at AI speed.</span>
                </div>
            </div>

            {showConsent && <ConsentManager onClose={() => setShowConsent(false)} />}
        </footer>
    );
}
