"use client";

import Link from 'next/link';

const realizacje = [
    {
        category: 'E-COMMERCE',
        title: 'Marka mody — redesign + headless',
        metrics: [{ value: '+48%', label: 'konwersja' }, { value: '−60%', label: 'czas ładowania' }],
        href: '/portfolio',
    },
    {
        category: 'FINTECH',
        title: 'Onboarding sterowany AI',
        metrics: [{ value: '−35%', label: 'porzuceń' }, { value: '+22', label: 'NPS' }],
        href: '/portfolio',
    },
    {
        category: 'B2B SAAS',
        title: 'Strona i lejek sprzedażowy',
        metrics: [{ value: '3×', label: 'więcej leadów MQL' }],
        href: '/portfolio',
    },
];

export default function RealizacjeSection() {
    return (
        <section id="realizacje" style={{
            '--panel': '#ffffff',
            '--panel2': '#efeef6',
            '--line': 'rgba(14,14,24,0.10)',
            '--text': '#0c0c14',
            '--muted': '#5d5d6e',
            '--glow': 'rgba(132,92,255,0.20)',
            background: '#f6f5fb',
            color: 'var(--text)',
            borderTop: '1px solid rgba(14,14,24,0.10)',
        } as React.CSSProperties}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 42, flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>
                            REALIZACJE
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.04 }}>
                            Efekty, nie obietnice.
                        </h2>
                    </div>
                    <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', textDecoration: 'none', fontSize: 15, borderBottom: '1px solid var(--accent)', paddingBottom: 3 }}>
                        Wszystkie realizacje <span style={{ fontFamily: 'var(--font-mono), monospace' }}>→</span>
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }} className="grid-cols-1 md:grid-cols-3">
                    {realizacje.map((r) => (
                        <Link key={r.title} href={r.href} style={{
                            textDecoration: 'none', color: 'var(--text)',
                            borderRadius: 20, overflow: 'hidden',
                            border: '1px solid var(--line)', background: 'var(--panel)',
                            display: 'flex', flexDirection: 'column',
                            transition: 'transform .3s, border-color .3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                        >
                            <div style={{
                                aspectRatio: '4/3',
                                background: 'repeating-linear-gradient(135deg, var(--panel2) 0 11px, color-mix(in srgb, var(--accent) 7%, var(--panel2)) 11px 22px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em' }}>[ realizacja · zdjęcie ]</span>
                            </div>
                            <div style={{ padding: 24 }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                                    {r.category}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 12px', lineHeight: 1.2 }}>
                                    {r.title}
                                </h3>
                                <div style={{ display: 'flex', gap: 18 }}>
                                    {r.metrics.map(m => (
                                        <div key={m.label}>
                                            <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 22, color: 'var(--accent)' }}>{m.value}</div>
                                            <div style={{ color: 'var(--muted)', fontSize: 12 }}>{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
