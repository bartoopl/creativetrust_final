"use client";

import Link from 'next/link';

const proofPoints = [
    { value: '150+', label: 'zrealizowanych projektów' },
    { value: '15 lat', label: 'doświadczenia zespołu' },
    { value: 'AI + craft', label: 'proces bez sztucznego szumu' },
];

const focusAreas = [
    'Branding i pozycjonowanie',
    'Web i e-commerce',
    'Design produktów cyfrowych',
    'Automatyzacje AI',
];

const workingPrinciples = [
    'Najpierw diagnoza i kierunek, potem wykonanie.',
    'Jedna odpowiedzialność po naszej stronie, bez handoffów.',
    'Mierzymy wpływ na sprzedaż, czas i jakość decyzji.',
];

export default function Hero() {
    return (
        <section
            style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '56px 0 48px',
            }}
        >
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 'auto -8% 10% auto',
                    width: 520,
                    height: 520,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(198, 90, 54, 0.16) 0%, rgba(198, 90, 54, 0.04) 34%, transparent 72%)',
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: '12% auto auto 4%',
                    width: 180,
                    height: 180,
                    borderRadius: 28,
                    border: '1px solid color-mix(in srgb, var(--line) 80%, transparent)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.24))',
                    transform: 'rotate(-8deg)',
                    pointerEvents: 'none',
                }}
            />

            <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.95fr] lg:px-8 lg:py-10">
                <div className="flex flex-col justify-end">
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 10,
                            width: 'fit-content',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: 11,
                            letterSpacing: '0.16em',
                            color: 'var(--muted)',
                            textTransform: 'uppercase',
                            marginBottom: 18,
                        }}
                    >
                        <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)' }} />
                        Branding · Web · E-commerce · AI
                    </div>

                    <h1
                        style={{
                            fontFamily: 'var(--font-space), sans-serif',
                            fontWeight: 700,
                            fontSize: 'clamp(42px, 7vw, 88px)',
                            lineHeight: 0.98,
                            letterSpacing: '-0.04em',
                            margin: '0 0 24px',
                            maxWidth: '12ch',
                            textWrap: 'balance',
                        } as React.CSSProperties}
                    >
                        Budujemy marki i produkty cyfrowe, które dowożą szybciej.
                    </h1>

                    <p
                        style={{
                            fontSize: 'clamp(16px, 1.5vw, 20px)',
                            lineHeight: 1.55,
                            color: 'var(--muted)',
                            maxWidth: '56ch',
                            margin: '0 0 28px',
                        }}
                    >
                        Strategia, design, development i automatyzacje AI w jednym zespole. Zaczynamy od diagnozy, kończymy na wyniku, a nie na ładnym slajdzie.
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

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: 14,
                            marginTop: 28,
                        }}
                    >
                        {proofPoints.map((item) => (
                            <div
                                key={item.label}
                                style={{
                                    borderTop: '1px solid var(--line)',
                                    paddingTop: 14,
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'var(--font-space), sans-serif',
                                        fontSize: 28,
                                        lineHeight: 1,
                                        letterSpacing: '-0.04em',
                                        fontWeight: 700,
                                        marginBottom: 8,
                                    }}
                                >
                                    {item.value}
                                </div>
                                <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.45 }}>
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        position: 'relative',
                        borderRadius: 28,
                        border: '1px solid color-mix(in srgb, var(--line) 90%, transparent)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))',
                        boxShadow: '0 30px 90px rgba(17, 24, 39, 0.08)',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                                'linear-gradient(135deg, rgba(198,90,54,0.08) 0%, transparent 26%, transparent 74%, rgba(31,74,82,0.06) 100%)',
                            pointerEvents: 'none',
                        }}
                    />

                    <div style={{ position: 'relative', padding: 28, display: 'grid', gap: 16 }}>
                        <div
                            style={{
                                borderRadius: 22,
                                padding: 24,
                                background: 'linear-gradient(180deg, #171717 0%, #232323 100%)',
                                color: '#f7f4ef',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: 'var(--font-mono), monospace',
                                    fontSize: 11,
                                    letterSpacing: '0.16em',
                                    color: 'rgba(247,244,239,0.62)',
                                    textTransform: 'uppercase',
                                    marginBottom: 12,
                                }}
                            >
                                Jak pracujemy
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--font-space), sans-serif',
                                    fontWeight: 700,
                                    fontSize: 'clamp(24px, 3vw, 34px)',
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.04,
                                    maxWidth: '12ch',
                                    marginBottom: 14,
                                }}
                            >
                                Spójny proces. Jedna odpowiedzialność.
                            </div>
                            <p style={{ margin: 0, color: 'rgba(247,244,239,0.74)', lineHeight: 1.6, fontSize: 15, maxWidth: '40ch' }}>
                                Zamiast rozpraszać projekt na kilka podmiotów, prowadzimy go od strategii po wdrożenie i optymalizację.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gap: 12 }}>
                            {workingPrinciples.map((item, index) => (
                                <div
                                    key={item}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '36px 1fr',
                                        gap: 12,
                                        alignItems: 'start',
                                        padding: '14px 0',
                                        borderBottom: index === workingPrinciples.length - 1 ? 'none' : '1px solid var(--line)',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 999,
                                            border: '1px solid var(--line)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--accent)',
                                            fontWeight: 600,
                                        }}
                                    >
                                        0{index + 1}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>0{index + 1}</div>
                                        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: 15 }}>
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                gap: 12,
                            }}
                        >
                            {focusAreas.map((item, index) => (
                                <div
                                    key={item}
                                    style={{
                                        border: '1px solid var(--line)',
                                        borderRadius: 18,
                                        padding: 16,
                                        background: index === 0 ? 'rgba(198, 90, 54, 0.08)' : 'rgba(255,255,255,0.88)',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: 'var(--font-mono), monospace',
                                            fontSize: 11,
                                            letterSpacing: '0.14em',
                                            color: 'var(--muted)',
                                            textTransform: 'uppercase',
                                            marginBottom: 8,
                                        }}
                                    >
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </div>
                                    <div style={{ fontWeight: 600, lineHeight: 1.35 }}>{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
