const steps = [
    { num: '01', title: 'Diagnoza', desc: 'Audyt, dane, cele. AI przyspiesza research i analizę konkurencji.' },
    { num: '02', title: 'Projekt', desc: 'Strategia i design. Warianty generujemy i testujemy szybciej niż kiedykolwiek.' },
    { num: '03', title: 'Wdrożenie', desc: 'Development z asystą AI. Krótszy time-to-market, mniej błędów.' },
    { num: '04', title: 'Rozwój', desc: 'Optymalizacja w pętli. Modele uczą się na Twoich danych i wynikach.', featured: true },
];

export default function ProcessSection() {
    return (
        <section id="podejscie" style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-28">
                    <div style={{ alignSelf: 'start' }} className="lg:sticky lg:top-24">
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                        Podejście
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0, color: '#000000', maxWidth: '12ch' }}>
                        Proces napędzany przez AI.
                        </h2>
                        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', margin: '14px 0 0', maxWidth: '34ch' }}>
                        Pracujemy w pętli. AI przyspiesza każdy etap, ale decyzje zostają po stronie ludzi.
                        </p>
                    </div>

                    <div style={{ display: 'grid' }}>
                        {steps.map((step, index) => (
                            <div key={step.num} style={{
                                display: 'grid',
                                gridTemplateColumns: '120px 1fr',
                                gap: 24,
                                padding: '28px 0',
                                borderTop: index === 0 ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.08)',
                                alignItems: 'start',
                            }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', letterSpacing: '.5px', textTransform: 'uppercase', fontWeight: 500 }}>
                                    {step.num}
                                </div>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, lineHeight: '24px', letterSpacing: '-0.8px', margin: 0, color: '#000000' }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0, maxWidth: '42ch' }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
