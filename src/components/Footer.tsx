"use client";

import { useState } from 'react';
import Link from 'next/link';
import ConsentManager from './ConsentManager';

const services = [
    { href: '/uslugi/e-commerce', label: 'Web & e-commerce' },
    { href: '/uslugi/strony-www', label: 'Product design' },
    { href: '/uslugi/marketing-automation', label: 'AI & automatyzacja' },
    { href: '/portfolio', label: 'Realizacje' },
];

const technology = [
    { href: '/uslugi/strony-www', label: 'React' },
    { href: '/uslugi/marketing-automation', label: 'AI' },
    { href: '/blog', label: 'Insights' },
];

const company = [
    { href: '/o-nas', label: 'O nas' },
    { href: '/portfolio', label: 'Kariera' },
    { href: '/kontakt', label: 'Kontakt' },
    { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
];

const insights = [
    { href: '/blog', label: 'Artykuły' },
    { href: '/blog', label: 'Newsletter' },
    { href: '/blog', label: 'Wydarzenia' },
];

const social = ['in', 'x', 'gh', 'yt', 'be', 'ig'];

export default function Footer() {
    const [showConsent, setShowConsent] = useState(false);
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 72px 0' }}>
                <h2 style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontWeight: 500,
                    fontSize: 'clamp(34px, 4vw, 43.1px)',
                    letterSpacing: '-1.76px',
                    lineHeight: '48.4px',
                    margin: '0 0 60px',
                    maxWidth: '16ch',
                    color: '#000000',
                }}>
                    Nie gonimy za trendami.{' '}
                    <span style={{ color: '#000000' }}>Tworzymy je.</span>
                </h2>

                <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 60 }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60, gap: 24, flexWrap: 'wrap' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', color: '#000000' }}>
                        <span style={{
                            width: 99.56,
                            height: 19.802,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 4,
                            border: '1px solid rgba(0,0,0,0.08)',
                            background: '#ffffff',
                        }}>
                            <span style={{ width: 12, height: 12, borderRadius: 3, background: '#56C4DB' }} />
                        </span>
                        <span style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
                            <span style={{ fontWeight: 500 }}>Creative</span>
                            <span style={{ fontWeight: 700 }}>Trust</span>
                            <span style={{ color: '#56C4DB', fontWeight: 700 }}>.</span>
                        </span>
                    </Link>

                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {social.map((item) => (
                            <div key={item} style={{
                                width: 36,
                                height: 36,
                                borderRadius: 4,
                                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'rgba(0,0,0,0.4)',
                                fontSize: 12,
                                fontWeight: 500,
                                textTransform: 'uppercase',
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 60 }} />

                <div style={{ display: 'flex', gap: 32, paddingBottom: 60, flexWrap: 'wrap' }}>
                    <div style={{ width: 416, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000000', margin: 0 }}>
                            Zapisz się po aktualizacje AI i webowe
                        </p>
                        <div style={{ display: 'flex', height: 44, gap: 0, position: 'relative' }}>
                            <div style={{ flex: 1, borderRadius: 2, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', background: '#ffffff', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                                <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(0,0,0,0.4)', lineHeight: '19.2px' }}>
                                    E-mail*
                                </span>
                            </div>
                            <div style={{ position: 'absolute', right: 0, top: 0, height: 44, padding: '0 16px', borderRadius: 2, background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <span style={{ fontSize: 13.2, fontWeight: 500, color: 'rgb(32,31,36)', lineHeight: '14px' }}>
                                    Subskrybuj
                                </span>
                            </div>
                        </div>
                        <p style={{ fontSize: 11.4, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                            Wysyłamy tylko konkretne materiały o projektowaniu, AI i wdrożeniach. Bez spamu.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 32, flex: 1, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000', margin: '0 0 4px' }}>Usługi</p>
                            {services.map((item) => (
                                <Link key={item.href} href={item.href} style={{ fontSize: 13.5, fontWeight: 400, lineHeight: '21px', letterSpacing: '-0.28px', color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000', margin: '0 0 4px' }}>Technologia</p>
                            {technology.map((item) => (
                                <Link key={item.href + item.label} href={item.href} style={{ fontSize: 13.5, fontWeight: 400, lineHeight: '21px', letterSpacing: '-0.28px', color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000', margin: '0 0 4px' }}>Firma</p>
                            {company.map((item) => (
                                <Link key={item.href + item.label} href={item.href} style={{ fontSize: 13.5, fontWeight: 400, lineHeight: '21px', letterSpacing: '-0.28px', color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 160 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000', margin: '0 0 4px' }}>Insights</p>
                            {insights.map((item) => (
                                <Link key={item.href + item.label} href={item.href} style={{ fontSize: 13.5, fontWeight: 400, lineHeight: '21px', letterSpacing: '-0.28px', color: 'rgba(0,0,0,0.6)', textDecoration: 'none' }}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ height: 1, background: 'rgba(0,0,0,0.08)' }} />

                <div style={{ padding: '18px 0 32px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <p style={{ fontSize: 11.4, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>
                        © {year} CreativeTrust. Wszystkie prawa zastrzeżone.
                    </p>
                    <p style={{ fontSize: 11.4, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>
                        Strategia, design, development i automatyzacja w jednym zespole.
                    </p>
                </div>
            </div>

            {showConsent && <ConsentManager onClose={() => setShowConsent(false)} />}
        </footer>
    );
}
