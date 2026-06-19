"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
    return (
        <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
            <HeroCanvas />

            {/* overlay for text legibility */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(120% 80% at 20% 100%, color-mix(in srgb, var(--bg) 30%, transparent) 0%, color-mix(in srgb, var(--bg) 85%, transparent) 60%, var(--bg) 100%)',
            }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: 1240, margin: '0 auto', width: '100%', padding: '0 32px 72px' }} className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 26 }}>
                    STRATEGIA <span style={{ color: 'var(--accent)' }}>·</span> DESIGN <span style={{ color: 'var(--accent)' }}>·</span> DEVELOPMENT <span style={{ color: 'var(--accent)' }}>·</span> AI
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(40px, 7vw, 86px)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.025em',
                    margin: '0 0 26px',
                    maxWidth: '16ch',
                    textWrap: 'balance',
                } as React.CSSProperties}>
                    Tworzymy marki i produkty cyfrowe — w&nbsp;tempie <span style={{ color: 'var(--accent)' }}>AI</span>.
                </h1>

                <p style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.5, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 34px' }}>
                    Strategia, design, development i automatyzacja w jednym zespole. AI to nasza przewaga — wiemy, kiedy i jak go użyć, żeby Twój biznes rósł szybciej.
                </p>

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <Link href="/kontakt" className="ct-cta">
                        Umów konsultację
                        <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                    </Link>
                    <Link href="/portfolio" className="ct-ghost">
                        <span className="ct-dot" />
                        Zobacz realizacje
                        <span className="ct-tail">↓</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
