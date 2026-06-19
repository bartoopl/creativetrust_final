import { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Branding i strategia marki — CreativeTrust | Pozycjonowanie, logo, komunikacja',
    description: 'Budujemy marki, które sprzedają i rosną. Pozycjonowanie, narracja, identyfikacja wizualna i komunikacja — spójne w każdym punkcie styku. Efekty, nie obietnice.',
    alternates: { canonical: `${SITE_URL}/uslugi/branding` },
    openGraph: {
        title: 'Branding i strategia marki | CreativeTrust',
        description: 'Pozycjonowanie, logo, identyfikacja wizualna i architektura komunikacji, która się broni. AI przyspiesza każdy etap procesu.',
        url: `${SITE_URL}/uslugi/branding`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const stats = [
    { value: '59%', label: 'konsumentów preferuje zakupy od marek, które znają' },
    { value: '81%', label: 'wymaga zaufania do marki przed dokonaniem zakupu' },
    { value: '3,2×', label: 'średni wzrost konwersji po rebrandingu z nami' },
    { value: '39×', label: 'większa szansa wyboru spośród konkurencji' },
];

const elements = [
    { title: 'Strategia marki', description: 'Misja, wizja, wartości, osobowość i pozycjonowanie — fundament dla wszystkich działań.', num: '01' },
    { title: 'Identyfikacja wizualna', description: 'Logo, kolorystyka, typografia i system graficzny spójny we wszystkich kanałach.', num: '02' },
    { title: 'Komunikacja', description: 'Tone of voice, storytelling i kluczowe komunikaty trafiające w odbiorców.', num: '03' },
    { title: 'Materiały brandingowe', description: 'Wizytówki, prezentacje, materiały cyfrowe i drukowane zaprojektowane systemowo.', num: '04' },
    { title: 'Brand guidelines', description: 'Księga znaku i zasady użycia marki — spójność na każdym poziomie.', num: '05' },
    { title: 'Rebranding', description: 'Odświeżenie marki z zachowaniem jej wartości i rozpoznawalności.', num: '06' },
];

const process = [
    { num: '01', title: 'Odkrycie', description: 'Wywiady, warsztaty i AI-research — poznajemy firmę, rynek i odbiorców głębiej niż tradycyjna analiza.' },
    { num: '02', title: 'Strategia', description: 'Pozycjonowanie, osobowość marki, propozycja wartości i komunikaty kluczowe.' },
    { num: '03', title: 'Projekt', description: 'System wizualny i język komunikacji. Generujemy i testujemy warianty szybciej dzięki AI.' },
    { num: '04', title: 'Wdrożenie', description: 'Marka w każdym punkcie styku. Brand guidelines i materiały gotowe do użycia.' },
    { num: '05', title: 'Ewaluacja', description: 'Analizujemy jak marka funkcjonuje w praktyce i optymalizujemy w pętli.' },
];

export default function BrandingPage() {
    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }}>
                <div style={{ maxWidth: 820 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
                        BRANDING
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 78px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px', textWrap: 'balance' } as React.CSSProperties}>
                        Budujemy marki, które pozostają w pamięci <span style={{ color: 'var(--accent)' }}>i rosną.</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 36px' }}>
                        Dobry branding to więcej niż logo. To spójna historia, która buduje zaufanie, wyróżnia na tle konkurencji i przekłada się na realny wynik biznesowy.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <Link href="/kontakt" className="ct-cta">
                            Porozmawiajmy o marce
                            <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px' }}>
                    <div style={{ display: 'grid', gap: 24 }} className="grid-cols-2 md:grid-cols-4">
                        {stats.map(s => (
                            <div key={s.value} style={{ borderLeft: '1px solid var(--line)', paddingLeft: 20 }}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 3.5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--accent)' }}>{s.value}</div>
                                <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 10 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Elements */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>ZAKRES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>
                            Co składa się na kompleksowy branding.
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {elements.map(el => (
                            <div key={el.num} style={{ borderRadius: 20, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 28 }}>{el.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 10px' }}>{el.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>{el.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 54 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>PROCES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>
                            Nasz proces brandingowy — napędzany AI.
                        </h2>
                        <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.55, margin: '16px 0 0', maxWidth: '52ch' }}>
                            AI przyspiesza każdy etap — research, generowanie wariantów i testowanie. Decyzje zostają po stronie ludzi.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {process.map((step, i) => (
                            <div key={step.num} style={{ borderRadius: 18, padding: '28px 24px', background: 'var(--panel)', border: i === process.length - 1 ? '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))' : '1px solid var(--line)', display: 'flex', alignItems: 'flex-start', gap: 24, ...(i === process.length - 1 ? { background: 'linear-gradient(140deg, color-mix(in srgb, var(--accent) 12%, var(--panel)), var(--panel))' } : {}) }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', flexShrink: 0, width: 32 }}>{step.num}</div>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 8px' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
