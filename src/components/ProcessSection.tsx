const steps = [
    { num: '01', title: 'Diagnoza', desc: 'Audyt, dane, cele. AI przyspiesza research i analizę konkurencji.' },
    { num: '02', title: 'Projekt', desc: 'Strategia i design. Warianty generujemy i testujemy szybciej niż kiedykolwiek.' },
    { num: '03', title: 'Wdrożenie', desc: 'Development z asystą AI. Krótszy time-to-market, mniej błędów.' },
    { num: '04', title: 'Rozwój', desc: 'Optymalizacja w pętli. Modele uczą się na Twoich danych i wynikach.', featured: true },
];

export default function ProcessSection() {
    return (
        <section id="podejscie" style={{ background: '#f4f1ea', borderTop: '1px solid rgba(12,14,18,0.08)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div style={{ marginBottom: 42, maxWidth: '58ch' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: '#5b6472', textTransform: 'uppercase', marginBottom: 12 }}>
                        PODEJŚCIE
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 3.2vw, 40px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: '#11131a' }}>
                        Proces napędzany przez AI.
                    </h2>
                    <p style={{ color: '#5b6472', fontSize: 15, lineHeight: 1.55, margin: '14px 0 0' }}>
                        Pracujemy jak partner produktowy — w pętli. AI przyspiesza każdy etap, ale decyzje zostają po stronie ludzi.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {steps.map(step => (
                        <div key={step.num} style={{
                            padding: '28px 24px',
                            border: step.featured ? '1px solid rgba(165,107,255,0.28)' : '1px solid rgba(12,14,18,0.10)',
                            borderRadius: 18,
                            background: step.featured ? 'linear-gradient(160deg, rgba(165,107,255,0.16), rgba(255,255,255,0.92))' : 'rgba(255,255,255,0.80)',
                            boxShadow: '0 10px 30px rgba(12,14,18,0.04)',
                        }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)', marginBottom: 38 }}>{step.num}</div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 8px', color: '#11131a' }}>{step.title}</h3>
                            <p style={{ color: '#5b6472', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
