"use client";

import dynamic from 'next/dynamic';

const NeuralBridgeCanvas = dynamic(() => import('./NeuralBridgeCanvas'), { ssr: false });

export default function NeuralBridgeSection() {
    return (
        <section style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div style={{ textAlign: 'center', maxWidth: '62ch', margin: '0 auto 44px' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>
                        SYNERGIA
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.04 }}>
                        Człowiek <span style={{ color: 'var(--accent)' }}>×</span> AI. Najlepsze z obu światów.
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.55, margin: '18px auto 0', maxWidth: '52ch' }}>
                        Intuicja, smak i strategia po stronie ludzi. Skala, szybkość i analiza danych po stronie AI. Łączymy jedno z drugim w każdym projekcie.
                    </p>
                </div>

                <div style={{ position: 'relative', border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden', background: 'var(--panel2)', height: 'clamp(340px, 42vw, 420px)' }} className="min-h-[340px] md:h-[clamp(340px,42vw,420px)]">
                    <NeuralBridgeCanvas />

                    <div style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, pointerEvents: 'none' }} className="left-4 top-8 translate-y-0 md:left-[5%] md:top-1/2 md:-translate-y-1/2">
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.14em', color: 'var(--accent2)', textTransform: 'uppercase', marginBottom: 8 }}>// człowiek</div>
                        <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.25, maxWidth: '14ch' }}>
                            Intuicja<br />Strategia<br />Smak
                        </div>
                    </div>

                    <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', zIndex: 2, textAlign: 'right', pointerEvents: 'none' }} className="right-4 top-8 translate-y-0 md:right-[5%] md:top-1/2 md:-translate-y-1/2">
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8 }}>sztuczna inteligencja //</div>
                        <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.25, maxWidth: '14ch', marginLeft: 'auto' }}>
                            Skala<br />Szybkość<br />Dane
                        </div>
                    </div>

                    <div style={{
                        position: 'absolute', left: '50%', bottom: 18, transform: 'translateX(-50%)', zIndex: 2,
                        display: 'inline-flex', alignItems: 'center', gap: 9,
                        fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--muted)',
                        border: '1px solid var(--line)', background: 'color-mix(in srgb, var(--bg) 60%, transparent)',
                        backdropFilter: 'blur(6px)', padding: '7px 14px', borderRadius: 999, pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                    }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 9px var(--accent)', animation: 'ctpulse 1.4s infinite' }} />
                        neural bridge <span style={{ color: 'var(--accent)' }}>·</span> active
                        <span style={{ color: 'var(--accent)', animation: 'ctblink 1s steps(1) infinite' }}>_</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
