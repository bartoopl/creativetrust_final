const steps = [
    { num: '01', title: 'Diagnoza', desc: 'Audyt, dane, cele. AI przyspiesza research i analizę konkurencji.' },
    { num: '02', title: 'Projekt', desc: 'Strategia i design. Warianty generujemy i testujemy szybciej niż kiedykolwiek.' },
    { num: '03', title: 'Wdrożenie', desc: 'Development z asystą AI. Krótszy time-to-market, mniej błędów.' },
    { num: '04', title: 'Rozwój', desc: 'Optymalizacja w pętli. Modele uczą się na Twoich danych i wynikach.', featured: true },
];

export default function ProcessSection() {
    return (
        <section id="podejscie" style={{ background: '#ffffff', borderTop: '1px solid var(--line)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '84px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div style={{ marginBottom: 42, maxWidth: '58ch' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>
                        Approach
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: 'var(--text)' }}>
                        Proces napędzany przez AI.
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: '14px 0 0' }}>
                        Pracujemy w pętli. AI przyspiesza każdy etap, ale decyzje zostają po stronie ludzi.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {steps.map(step => (
                        <div key={step.num} style={{
                            padding: '24px',
                            border: step.featured ? '1px solid color-mix(in srgb, var(--accent) 30%, var(--line))' : '1px solid var(--line)',
                            borderRadius: 18,
                            background: step.featured ? 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, #ffffff), #ffffff)' : '#ffffff',
                            boxShadow: '0 12px 28px rgba(17,24,39,0.04)',
                        }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)', marginBottom: 34, fontWeight: 600 }}>{step.num}</div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 18, margin: '0 0 8px', color: 'var(--text)' }}>{step.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
