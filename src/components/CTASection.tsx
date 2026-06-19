import Link from 'next/link';

export default function CTASection() {
    return (
        <section id="kontakt" style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
            <div style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: 28,
                border: '1px solid color-mix(in srgb, var(--accent) 38%, var(--line))',
                background: 'radial-gradient(120% 140% at 50% 0%, color-mix(in srgb, var(--accent) 22%, var(--panel)), var(--panel))',
                padding: 'clamp(48px, 7vw, 96px) 32px',
                textAlign: 'center',
            }}>
                <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 420, height: 240, background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-space), sans-serif', fontWeight: 700,
                        fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.02,
                        margin: '0 0 20px', maxWidth: '18ch', marginLeft: 'auto', marginRight: 'auto',
                    }}>
                        Gotowy, żeby ruszyć w tempie AI?
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.5, maxWidth: '46ch', margin: '0 auto 34px' }}>
                        30-minutowa konsultacja. Pokażemy, gdzie AI realnie skróci Twój czas i podniesie wynik.
                    </p>
                    <Link href="/kontakt" className="ct-cta" style={{ fontSize: 16, padding: '9px 9px 9px 26px' }}>
                        Umów konsultację
                        <span className="ct-badge" style={{ width: 42, height: 42 }}>
                            <span className="ct-arrows"><span style={{ width: 42 }}>→</span><span style={{ width: 42 }}>→</span></span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
