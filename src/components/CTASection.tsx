import Link from 'next/link';

const contactPillars = [
    '30-minutowa konsultacja',
    'Diagnoza kanałów i procesów',
    'Plan kolejnych kroków bez zobowiązań',
];

export default function CTASection() {
    return (
        <section id="kontakt" style={{ maxWidth: 1240, margin: '0 auto', padding: '24px 32px 96px' }} className="px-4 py-10 sm:px-6 lg:px-8">
            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'linear-gradient(135deg, #10131a 0%, #171a23 52%, #10131a 100%)',
                    padding: 'clamp(28px, 5vw, 58px)',
                    color: '#f8f5ef',
                }}
            >
                <div
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            inset: 'auto -15% -30% auto',
                            width: 440,
                            height: 440,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(165, 107, 255, 0.24) 0%, rgba(165, 107, 255, 0.06) 34%, transparent 72%)',
                            pointerEvents: 'none',
                        }}
                    />
                <div style={{ position: 'relative', display: 'grid', gap: 28, alignItems: 'start', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
                    <div className="col-span-full lg:col-span-7">
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
                            Porozmawiajmy
                        </div>
                        <h2
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(26px, 3.4vw, 40px)',
                                letterSpacing: '-0.045em',
                                lineHeight: 1.02,
                                margin: '0 0 16px',
                                maxWidth: '14ch',
                            }}
                        >
                            Chcesz uporządkować produkt i przyspieszyć wzrost?
                        </h2>
                        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, maxWidth: '44ch', margin: '0 0 22px' }}>
                            Zacznijmy od krótkiej konsultacji. Pokażemy, gdzie masz największą dźwignię w brandzie, webie, e-commerce i automatyzacji.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/kontakt" className="ct-cta" style={{ fontSize: 14, padding: '7px 7px 7px 20px' }}>
                                Umów konsultację
                                <span className="ct-badge" style={{ width: 34, height: 34 }}>
                                    <span className="ct-arrows">
                                        <span style={{ width: 34 }}>→</span>
                                        <span style={{ width: 34 }}>→</span>
                                    </span>
                                </span>
                            </Link>
                            <Link href="/portfolio" className="ct-ghost" style={{ borderColor: 'var(--line)', color: '#f8f5ef', background: 'rgba(255,255,255,0.02)' }}>
                                <span className="ct-dot" />
                                Zobacz realizacje
                                <span className="ct-tail">↓</span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-full lg:col-span-5">
                        <div
                            style={{
                                borderRadius: 18,
                                border: '1px solid var(--line)',
                                background: 'rgba(255,255,255,0.02)',
                                padding: 22,
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                                Co dostajesz
                            </div>
                            <div style={{ display: 'grid', gap: 12 }}>
                                {contactPillars.map((item, index) => (
                                    <div
                                        key={item}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '28px 1fr',
                                            gap: 12,
                                            alignItems: 'start',
                                            paddingBottom: 12,
                                            borderBottom: index === contactPillars.length - 1 ? 'none' : '1px solid var(--line)',
                                        }}
                                    >
                                        <div style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-mono), monospace' }}>
                                            0{index + 1}
                                        </div>
                                        <div style={{ color: 'var(--text)', lineHeight: 1.5 }}>
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
