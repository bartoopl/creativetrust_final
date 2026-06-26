import Link from 'next/link';

const contactPillars = [
    '30-minutowa konsultacja',
    'Diagnoza kanałów i procesów',
    'Plan kolejnych kroków bez zobowiązań',
];

export default function CTASection() {
    return (
        <section id="kontakt" style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div
                style={{
                    maxWidth: 1440,
                    margin: '0 auto',
                    padding: '112px 72px 0',
                    color: '#fff',
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.1fr 0.9fr',
                    gap: 80,
                    alignItems: 'start',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    padding: '48px 40px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 'auto -12% -18% auto', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(86,196,219,0.12) 0%, rgba(86,196,219,0.04) 34%, transparent 72%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative' }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                            Porozmawiajmy
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: '0 0 16px', maxWidth: '14ch', color: '#ffffff' }}>
                            Chcesz uporządkować produkt i przyspieszyć wzrost?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', maxWidth: '44ch', margin: '0 0 22px' }}>
                            Zacznijmy od krótkiej konsultacji. Pokażemy, gdzie masz największą dźwignię w brandzie, webie, e-commerce i automatyzacji.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/kontakt" style={{
                                height: 40,
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: 5,
                                borderRadius: 4,
                                background: '#fff',
                                boxShadow: 'inset 0 0 0 1px #fff',
                                color: '#202124',
                                textDecoration: 'none',
                                fontSize: 13.2,
                                fontWeight: 500,
                            }}>
                                <span style={{ padding: '0 12px' }}>Umów konsultację</span>
                                <span style={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 2,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.1)',
                                    fontSize: 14,
                                    lineHeight: 1,
                                }}>
                                    →
                                </span>
                            </Link>
                            <Link href="/portfolio" style={{
                                height: 40,
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '0 18px',
                                borderRadius: 4,
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: '#fff',
                                background: 'transparent',
                                textDecoration: 'none',
                                fontSize: 13.2,
                                fontWeight: 500,
                            }}>
                                Zobacz realizacje
                            </Link>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 16, fontWeight: 500 }}>
                                Co dostajesz
                            </div>
                            <div style={{ display: 'grid', gap: 14 }}>
                                {contactPillars.map((item, index) => (
                                    <div key={item} style={{
                                        display: 'grid',
                                        gridTemplateColumns: '28px 1fr',
                                        gap: 12,
                                        alignItems: 'start',
                                        paddingBottom: 14,
                                        borderBottom: index === contactPillars.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                    }}>
                                        <div style={{ color: '#56C4DB', fontWeight: 500, fontFamily: 'var(--font-mono), monospace' }}>
                                            0{index + 1}
                                        </div>
                                        <div style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '24px', letterSpacing: '-0.32px' }}>
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 24, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', width: 'max-content', gap: 24, padding: '18px 0', animation: 'ctmarquee 28s linear infinite', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', textTransform: 'uppercase' }}>
                        <span>150+ projektów</span>
                        <span>•</span>
                        <span>15 lat doświadczenia</span>
                        <span>•</span>
                        <span>AI-native delivery</span>
                        <span>•</span>
                        <span>150+ projektów</span>
                        <span>•</span>
                        <span>15 lat doświadczenia</span>
                        <span>•</span>
                        <span>AI-native delivery</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
