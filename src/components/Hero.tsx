"use client";

import Link from 'next/link';
import HeroCanvas from './HeroCanvas';

const signals = [
    { label: 'Brand systems', value: 'spójność' },
    { label: 'Web & commerce', value: 'konwersja' },
    { label: 'AI workflows', value: 'prędkość' },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-[var(--line)]">
            <div className="absolute inset-0">
                <HeroCanvas />
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(165,107,255,0.16),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(102,198,255,0.10),transparent_22%),linear-gradient(180deg,rgba(6,7,10,0.18)_0%,rgba(6,7,10,0.82)_40%,rgba(5,6,10,0.96)_100%)]"
            />

            <div className="relative mx-auto grid min-h-[calc(100vh-74px)] max-w-[1240px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
                <div className="flex flex-col justify-end pb-4 lg:pb-12">
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>
                        Branding · Web · E-commerce · AI
                    </div>

                    <h1
                        style={{
                            fontFamily: 'var(--font-space), sans-serif',
                            fontWeight: 700,
                            fontSize: 'clamp(34px, 5.4vw, 68px)',
                            lineHeight: 0.96,
                            letterSpacing: '-0.05em',
                            margin: '0 0 18px',
                            maxWidth: '11ch',
                            textWrap: 'balance',
                        } as React.CSSProperties}
                    >
                        Ciemny, techniczny design, który dowozi wynik.
                    </h1>

                    <p style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: 1.6, color: 'var(--muted)', maxWidth: '44ch', margin: '0 0 26px' }}>
                        Projektujemy marki i produkty cyfrowe w jednym procesie. Mniej slajdów, mniej podwykonawców, więcej decyzji, które widać w wyniku.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link href="/kontakt" className="ct-cta">
                            Umów konsultację
                            <span className="ct-badge">
                                <span className="ct-arrows">
                                    <span>→</span>
                                    <span>→</span>
                                </span>
                            </span>
                        </Link>
                        <Link href="/portfolio" className="ct-ghost">
                            <span className="ct-dot" />
                            Zobacz realizacje
                            <span className="ct-tail">↓</span>
                        </Link>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {signals.map((signal) => (
                            <div
                                key={signal.label}
                                style={{
                                    border: '1px solid var(--line)',
                                    borderRadius: 16,
                                    background: 'rgba(255,255,255,0.02)',
                                    padding: '14px 16px',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                                    {signal.label}
                                </div>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 16, letterSpacing: '-0.03em' }}>
                                    {signal.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative flex items-end justify-end">
                    <div
                        style={{
                            width: '100%',
                            maxWidth: 520,
                            borderRadius: 24,
                            border: '1px solid var(--line)',
                            background: 'linear-gradient(180deg, rgba(17,19,26,0.72) 0%, rgba(10,12,17,0.9) 100%)',
                            padding: 22,
                            boxShadow: '0 30px 120px rgba(0,0,0,0.45)',
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>
                            Status / live system
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            {[
                                'Brand strategy',
                                'Web architecture',
                                'E-commerce performance',
                                'AI-assisted delivery',
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 12,
                                        padding: '14px 0',
                                        borderBottom: index < 3 ? '1px solid var(--line)' : 'none',
                                    }}
                                >
                                    <span style={{ color: 'var(--text)', fontSize: 14 }}>{item}</span>
                                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: 'var(--accent)' }}>active</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
