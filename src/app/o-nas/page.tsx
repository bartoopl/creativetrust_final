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
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '112px 72px 120px' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                        O NAS
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: '0 0 18px', maxWidth: '12ch' } as React.CSSProperties}>
                        AI-native partner produktowy.
                    </h1>
                    <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(255,255,255,0.6)', maxWidth: '54ch', margin: '0 0 28px' }}>
                        Łączymy strategię marki, design, development i automatyzację AI w jednym procesie. Pracujemy jak partner, nie podwykonawca — od diagnozy po wynik.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <Link href="/kontakt" style={{ height: 40, display: 'inline-flex', alignItems: 'center', padding: 5, borderRadius: 4, background: '#fff', boxShadow: 'inset 0 0 0 1px #fff', color: '#202124', textDecoration: 'none', fontSize: 13.2, fontWeight: 500 }}>
                            Porozmawiajmy
                            <span style={{ width: 30, height: 30, marginLeft: 12, borderRadius: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)' }}>→</span>
                        </Link>
                        <Link href="/uslugi" style={{ height: 40, display: 'inline-flex', alignItems: 'center', padding: '0 18px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.3)', color: '#fff', textDecoration: 'none', fontSize: 13.2, fontWeight: 500 }}>
                            Zobacz usługi
                        </Link>
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#000' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 72px' }}>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {stats.map(([val, label]) => (
                            <div key={label} style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 20 }}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(28px, 3.1vw, 43.1px)', letterSpacing: '-1.44px', lineHeight: 1, color: '#fff' }}>{val}</div>
                                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 8 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 72px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>CO NAS PROWADZI</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', letterSpacing: '-1.76px', margin: 0, lineHeight: '48.4px' }}>Zasady, które trzymają projekt w ryzach.</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {values.map((v, i) => (
                            <div key={v.title} style={{ borderRadius: 4, padding: 28, background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', marginBottom: 20 }}>0{i + 1}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 10px', letterSpacing: '-0.8px' }}>{v.title}</h3>
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0 }}>{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 72px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>NASZA DROGA</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', letterSpacing: '-1.76px', margin: 0, lineHeight: '48.4px' }}>
                            Budowaliśmy kompetencje tam, gdzie rósł rynek.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {milestones.map((m) => (
                            <div key={m.year} style={{ borderRadius: 4, padding: '24px 20px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', marginBottom: 18 }}>{m.year}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 10px', letterSpacing: '-0.8px' }}>{m.title}</h3>
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0 }}>{m.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
