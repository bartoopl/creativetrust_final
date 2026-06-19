import { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'O nas — CreativeTrust | AI-native partner produktowy',
    description: 'CreativeTrust to AI-native partner produktowy. Łączymy strategię, design, development i automatyzację AI w jednym procesie. 15 lat doświadczenia, 150+ projektów.',
    alternates: { canonical: `${SITE_URL}/o-nas` },
};

const values = [
    { title: 'Skuteczność', description: 'Każde działanie ma wspierać wynik biznesowy, nie tylko poprawiać wygląd.' },
    { title: 'Transparentność', description: 'Ustalamy zakres, priorytety i odpowiedzialność na początku współpracy.' },
    { title: 'Partnerstwo', description: 'Pracujemy jak część zespołu klienta, a nie jak odłączony podwykonawca.' },
];

const milestones = [
    { year: '2010', title: 'Start agencji', description: 'Budowaliśmy pierwsze kampanie i komunikację dla marek, które potrzebowały prostszej ścieżki do klienta.' },
    { year: '2016', title: 'Web & e-commerce', description: 'Dołożyliśmy projektowanie stron i sklepów, żeby kontrolować cały lejek, a nie tylko fragment.' },
    { year: '2024', title: 'SALESmanago partner', description: 'Wzmocniliśmy obszar automatyzacji i pracy z danymi marketingowymi.' },
    { year: '2025', title: 'AI-native', description: 'AI wplecione w każdy etap pracy — od researchu po development. Krótszy time-to-market, wyższy wynik.' },
];

const stats = [
    ['15+', 'lat doświadczenia'],
    ['150+', 'projektów'],
    ['3,2×', 'średni wzrost konwersji'],
    ['40%', 'szybciej dzięki AI'],
];

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }}>
                <div style={{ maxWidth: 820 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
                        O NAS
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px', textWrap: 'balance' } as React.CSSProperties}>
                        AI-native partner produktowy.
                    </h1>
                    <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 36px' }}>
                        Łączymy strategię marki, design, development i automatyzację AI w jednym procesie. Pracujemy jak partner, nie podwykonawca — od diagnozy po wynik.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <Link href="/kontakt" className="ct-cta">
                            Porozmawiajmy
                            <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                        </Link>
                        <Link href="/uslugi" className="ct-ghost">
                            <span className="ct-dot" />
                            Zobacz usługi
                            <span className="ct-tail">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats bar */}
            <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="grid-cols-2 md:grid-cols-4">
                        {stats.map(([val, label]) => (
                            <div key={label} style={{ borderLeft: '1px solid var(--line)', paddingLeft: 20 }}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 3.5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--accent)' }}>{val}</div>
                                <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>CO NAS PROWADZI</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Zasady, które trzymają projekt w ryzach.</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="grid-cols-1 md:grid-cols-3">
                        {values.map((v, i) => (
                            <div key={v.title} style={{ borderRadius: 20, padding: 32, background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 24 }}>0{i + 1}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 22, margin: '0 0 12px' }}>{v.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>NASZA DROGA</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>
                            Budowaliśmy kompetencje tam, gdzie rósł rynek.
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                        {milestones.map((m) => (
                            <div key={m.year} style={{ borderRadius: 18, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 20 }}>{m.year}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 10px' }}>{m.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{m.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
