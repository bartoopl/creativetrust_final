const steps = [
    { num: '01', title: 'Diagnoza', desc: 'Audyt, dane, cele. AI przyspiesza research i analizę konkurencji.' },
    { num: '02', title: 'Projekt', desc: 'Strategia i design. Warianty generujemy i testujemy szybciej niż kiedykolwiek.' },
    { num: '03', title: 'Wdrożenie', desc: 'Development z asystą AI. Krótszy time-to-market, mniej błędów.' },
    { num: '04', title: 'Rozwój', desc: 'Optymalizacja w pętli. Modele uczą się na Twoich danych i wynikach.', featured: true },
];

export default function ProcessSection() {
    return (
        <section id="podejscie" style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div style={{ marginBottom: 54, maxWidth: '60ch' }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>
                        PODEJŚCIE
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.04 }}>
                        Proces napędzany przez AI.
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.55, margin: '18px 0 0' }}>
                        Pracujemy jak partner produktowy — w pętli. AI przyspiesza każdy etap, ale decyzje zostają po stronie ludzi.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {steps.map(step => (
                        <div key={step.num} style={{
                            padding: '28px 24px',
                            border: step.featured ? '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))' : '1px solid var(--line)',
                            borderRadius: 18,
                            background: step.featured ? 'linear-gradient(160deg, color-mix(in srgb, var(--accent) 16%, var(--panel)), var(--panel))' : 'var(--panel)',
                        }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 48 }}>{step.num}</div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 8px' }}>{step.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
