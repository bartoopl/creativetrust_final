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
                    borderRadius: 32,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'linear-gradient(135deg, #151515 0%, #222222 52%, #171717 100%)',
                    padding: 'clamp(34px, 6vw, 72px)',
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
                        background: 'radial-gradient(circle, rgba(198, 90, 54, 0.22) 0%, rgba(198, 90, 54, 0.06) 34%, transparent 72%)',
                        pointerEvents: 'none',
                    }}
                />
                <div style={{ position: 'relative', display: 'grid', gap: 28, alignItems: 'start', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
                    <div className="col-span-full lg:col-span-7">
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.16em', color: 'rgba(248,245,239,0.62)', textTransform: 'uppercase', marginBottom: 12 }}>
                            Porozmawiajmy
                        </div>
                        <h2
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(32px, 5vw, 64px)',
                                letterSpacing: '-0.04em',
                                lineHeight: 1.02,
                                margin: '0 0 18px',
                                maxWidth: '14ch',
                            }}
                        >
                            Chcesz uporządkować produkt i przyspieszyć wzrost?
                        </h2>
                        <p style={{ color: 'rgba(248,245,239,0.76)', fontSize: 18, lineHeight: 1.6, maxWidth: '44ch', margin: '0 0 26px' }}>
                            Zacznijmy od krótkiej konsultacji. Pokażemy, gdzie masz największą dźwignię w brandzie, webie, e-commerce i automatyzacji.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/kontakt" className="ct-cta" style={{ fontSize: 16, padding: '9px 9px 9px 26px' }}>
                                Umów konsultację
                                <span className="ct-badge" style={{ width: 42, height: 42 }}>
                                    <span className="ct-arrows">
                                        <span style={{ width: 42 }}>→</span>
                                        <span style={{ width: 42 }}>→</span>
                                    </span>
                                </span>
                            </Link>
                            <Link href="/portfolio" className="ct-ghost" style={{ borderColor: 'rgba(248,245,239,0.16)', color: '#f8f5ef', background: 'rgba(255,255,255,0.04)' }}>
                                <span className="ct-dot" />
                                Zobacz realizacje
                                <span className="ct-tail">↓</span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-full lg:col-span-5">
                        <div
                            style={{
                                borderRadius: 24,
                                border: '1px solid rgba(248,245,239,0.12)',
                                background: 'rgba(255,255,255,0.05)',
                                padding: 22,
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.16em', color: 'rgba(248,245,239,0.62)', textTransform: 'uppercase', marginBottom: 14 }}>
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
                                            borderBottom: index === contactPillars.length - 1 ? 'none' : '1px solid rgba(248,245,239,0.12)',
                                        }}
                                    >
                                        <div style={{ color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-mono), monospace' }}>
                                            0{index + 1}
                                        </div>
                                        <div style={{ color: 'rgba(248,245,239,0.82)', lineHeight: 1.5 }}>
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
