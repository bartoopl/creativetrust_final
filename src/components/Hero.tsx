import Link from 'next/link';
import HeroCanvas from './HeroCanvas';

const signals = [
    { label: 'AI-native delivery', value: 'w procesie' },
    { label: '150+ projects', value: 'dowożonych' },
    { label: '15 years', value: 'doświadczenia' },
];

export default function Hero() {
    return (
        <section
            className="relative overflow-hidden border-b border-[var(--line)]"
            style={{
                background: '#08080c',
                '--bg': '#08080c',
                '--panel': '#10131a',
                '--panel2': '#0a0c11',
                '--line': 'rgba(255,255,255,0.08)',
                '--text': '#f5f7fb',
                '--muted': '#9ca3af',
                '--accent': '#845cff',
            } as React.CSSProperties}
        >
            <div className="absolute inset-0">
                <HeroCanvas />
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(108,99,255,0.22),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(102,198,255,0.10),transparent_22%),linear-gradient(180deg,rgba(6,7,10,0.18)_0%,rgba(6,7,10,0.82)_40%,rgba(5,6,10,0.96)_100%)]"
            />

            <div className="relative mx-auto grid min-h-[calc(100vh-74px)] max-w-[1240px] grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
                <div className="flex flex-col justify-end pb-4 lg:pb-12">
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>
                        AI-NATIVE DELIVERY
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {signals.map((signal) => (
                            <div
                                key={signal.label}
                                style={{
                                    border: '1px solid var(--line)',
                                    borderRadius: 16,
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: '14px 16px',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
                                    {signal.label}
                                </div>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.03em', color: 'var(--text)' }}>
                                    {signal.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h1
                        style={{
                            fontFamily: 'var(--font-space), sans-serif',
                            fontWeight: 800,
                            fontSize: 'clamp(38px, 5.2vw, 68px)',
                            lineHeight: 0.96,
                            letterSpacing: '-0.05em',
                            margin: '24px 0 18px',
                            maxWidth: '12ch',
                            textWrap: 'balance',
                            color: 'var(--text)',
                        } as React.CSSProperties}
                    >
                        Ship web, e-commerce and automation at AI speed.
                    </h1>

                    <p style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: 1.65, color: 'var(--muted)', maxWidth: '46ch', margin: '0 0 26px' }}>
                        Projektujemy i wdrażamy systemy cyfrowe w jednym procesie. AI skraca research, produkcję i testy, a zespół pilnuje decyzji, jakości i wyniku.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link href="/kontakt" className="ct-cta">
                            Book Consultation
                            <span className="ct-badge">
                                <span className="ct-arrows">
                                    <span>→</span>
                                    <span>→</span>
                                </span>
                            </span>
                        </Link>
                        <Link href="#uslugi" className="ct-ghost">
                            <span className="ct-dot" />
                            How we can help
                            <span className="ct-tail">↓</span>
                        </Link>
                    </div>
                </div>

                <div className="relative flex items-end justify-end">
                    <div
                        style={{
                            width: '100%',
                            maxWidth: 560,
                            minHeight: 520,
                            borderRadius: 28,
                            border: '1px solid var(--line)',
                            background: 'linear-gradient(180deg, rgba(12,13,18,0.92) 0%, rgba(6,7,10,0.98) 100%)',
                            padding: 20,
                            boxShadow: '0 30px 120px rgba(0,0,0,0.45)',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
                            Live system
                        </div>
                        <div style={{ position: 'relative', height: 'calc(100% - 28px)', minHeight: 460, borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: '#08080c' }}>
                            <HeroCanvas />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
