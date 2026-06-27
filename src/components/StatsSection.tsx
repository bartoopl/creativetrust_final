export default function StatsSection() {
    return (
        <section style={{ background: '#fff', padding: '72px 16px' }} className="lg:px-[72px] lg:py-[120px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }} className="lg:mb-16">
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(28px, 4vw, 43.1px)', lineHeight: '1.15', letterSpacing: '-1.76px', color: '#000', margin: 0 }}>
                        Dlaczego firmy stawiają na Creativetrust
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(0,0,0,0.6)', margin: '8px 0 0' }}>
                        Nie jesteśmy agencją od ładnych rzeczy. Jesteśmy partnerem, który rozumie biznes i wdraża szybko.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 0 }} className="lg:gap-8 lg:px-20">
                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8" style={{ minHeight: 0 }}>
                        <div style={{ flex: 662, borderRadius: 4, background: '#000', overflow: 'hidden', position: 'relative', padding: 32 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 461 }}>
                                <p style={{ fontSize: 17, fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.36px', color: '#fff', margin: 0 }}>
                                    Jesteśmy w biznesie, nie tylko obok niego.
                                </p>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                                    Zarządzamy firmami klientów od środka. Każda decyzja projektowa jest dla nas decyzją biznesową - nie estetyczną.
                                </p>
                            </div>
                            <p style={{ position: 'absolute', bottom: 24, left: 24, fontSize: 15.4, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.32px', color: '#fff', margin: 0 }} className="lg:bottom-8 lg:left-8">
                                Klienci z Polski i z zagranicy · Projekty z mierzalnymi wynikami
                            </p>
                        </div>
                        <div style={{ flex: 441, borderRadius: 4, background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', overflow: 'hidden', padding: 24 }} className="lg:p-8">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <p style={{ fontSize: 17, fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.36px', color: '#000', margin: 0 }}>
                                    Ludzka decyzja + tempo AI.
                                </p>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                    Łączymy doświadczenie biznesowe z wdrożeniami przyspieszonymi przez AI. Dostajesz wyniki szybciej, bez obniżania jakości.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                        <div style={{ flex: 441, borderRadius: 4, background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', overflow: 'hidden', padding: 24 }} className="lg:p-8">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 376 }}>
                                <p style={{ fontSize: 17, fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.36px', color: '#000', margin: 0 }}>
                                    Kompleksowa obsługa - od projektu do sprzedaży.
                                </p>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                    Strony, sklepy, marketing automation i social media pod jednym dachem. Jeden partner, spójna strategia.
                                </p>
                            </div>
                        </div>

                        <div style={{ flex: 662, borderRadius: 4, background: 'rgba(0,0,0,0.04)', overflow: 'hidden', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }} className="lg:p-8 lg:gap-9">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <p style={{ fontSize: 17, fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.36px', color: '#000', margin: 0 }}>
                                    Open source i sprawdzone technologie.
                                </p>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                    Budujemy na otwartych, dojrzałych stackach - Medusa.js, Next.js, React. Brak vendor lock-in, pełna kontrola nad kodem.
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'stretch', height: 40, borderRadius: 4, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)', alignSelf: 'flex-start' }}>
                                <div style={{ width: 30, margin: '5px 0 5px 5px', borderRadius: 2, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill="rgb(0,0,0)">
                                        <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
                                    </svg>
                                </div>
                                <span style={{ padding: '9px 12px', fontSize: 13.2, fontWeight: 500, color: 'rgb(32,31,36)', whiteSpace: 'nowrap', lineHeight: '21px' }} className="whitespace-normal lg:whitespace-nowrap">
                                    Nasze podejście technologiczne
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <p style={{ fontSize: 35.6, fontWeight: 500, lineHeight: '39.6px', letterSpacing: '-1.44px', color: '#000', margin: 0 }}>50+</p>
                                    <p style={{ fontSize: 13, lineHeight: '21px', letterSpacing: '-0.245px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>Zrealizowanych projektów</p>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <p style={{ fontSize: 35.6, fontWeight: 500, lineHeight: '39.6px', letterSpacing: '-1.44px', color: '#000', margin: 0 }}>3×</p>
                                    <p style={{ fontSize: 13, lineHeight: '21px', letterSpacing: '-0.245px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>Szybciej z AI w procesie</p>
                                </div>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <p style={{ fontSize: 35.6, fontWeight: 500, lineHeight: '39.6px', letterSpacing: '-1.44px', color: '#000', margin: 0 }}>100%</p>
                                    <p style={{ fontSize: 13, lineHeight: '21px', letterSpacing: '-0.245px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>Projektów z mierzalnym celem</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                        <div style={{ flex: 1, borderRadius: 4, background: '#000', overflow: 'hidden', position: 'relative', padding: 24, minHeight: 260 }} className="lg:min-h-[360px] lg:p-8">
                            <img src="/design-handoff-v7/7299d9657a69413b.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 383 }}>
                                <p style={{ fontSize: 17, fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.36px', color: '#fff', margin: 0 }}>
                                    Dla firm, które chcą więcej niż ładną stronę.
                                </p>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                                    Robimy projekty cyfrowe, które mają sens biznesowy - i sprawdzamy to wspólnie z klientem na każdym etapie.
                                </p>
                            </div>
                            <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', alignItems: 'stretch', height: 40, borderRadius: 4, background: '#fff' }} className="lg:bottom-8 lg:left-8">
                                <div style={{ width: 30, margin: '5px 0 5px 5px', borderRadius: 2, background: 'rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill="rgb(0,0,0)">
                                        <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
                                    </svg>
                                </div>
                                <span style={{ padding: '9px 12px', fontSize: 13.2, fontWeight: 500, color: 'rgb(32,31,36)', whiteSpace: 'nowrap', lineHeight: '21px' }}>
                                    Zobacz case studies
                                </span>
                            </div>
                        </div>
                        <div style={{ flex: 1, borderRadius: 4, background: '#fff', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', overflow: 'hidden', position: 'relative', padding: 24, minHeight: 260 }} className="lg:min-h-[360px] lg:p-8">
                            <img src="/design-handoff-v7/122e661108f6caa0.png" alt="" style={{ position: 'absolute', right: 0, top: 0, height: '100%', opacity: 0.3, objectFit: 'cover' }} />
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 304 }}>
                                <p style={{ fontSize: 17, fontWeight: 500, lineHeight: '27px', letterSpacing: '-0.36px', color: '#000', margin: 0 }}>
                                    Pracujemy jak partner, nie jak agency.
                                </p>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                    Masz bezpośredni kontakt z osobami decyzyjnymi - bez account managerów i gry w głuchy telefon.
                                </p>
                            </div>
                            <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', alignItems: 'stretch', height: 40, borderRadius: 4, background: '#000' }} className="lg:bottom-8 lg:left-8">
                                <div style={{ width: 30, margin: '5px 0 5px 5px', borderRadius: 2, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill="rgb(255,255,255)">
                                        <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
                                    </svg>
                                </div>
                                <span style={{ padding: '9px 12px', fontSize: 13.2, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', lineHeight: '21px' }}>
                                    O nas
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderRadius: 4, background: '#000', overflow: 'hidden', position: 'relative' }}>
                        <img src="/design-handoff-v7/4d41d6b59840649b.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 24, minHeight: 280 }} className="lg:p-16 lg:min-h-[399px]">
                            <div style={{ width: '100%', maxWidth: 512, borderRadius: '4px 4px 0 0', background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }} className="lg:p-16 lg:gap-8">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: '#000', margin: 0 }}>
                                        Kiedy zmienia się sposób robienia biznesu w digital, my pomagamy firmom to wdrożyć.
                                    </p>
                                    <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                        AI przyspiesza wdrożenia. My wiemy, jak to przełożyć na wyniki - nie na slajdy.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'stretch', height: 40, borderRadius: 4, background: '#000', alignSelf: 'flex-start' }}>
                                    <div style={{ width: 30, margin: '5px 0 5px 5px', borderRadius: 2, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg width="9" height="9" viewBox="0 0 9.333 9.333" fill="rgb(255,255,255)">
                                            <path d="M 8.167 0 L 8.167 9.333 L 9.333 9.333 L 9.333 0 L 8.167 0 Z M 0 4.083 L 0 5.25 L 4.667 5.25 L 4.667 6.417 L 3.5 6.417 L 3.5 7.583 L 4.667 7.583 L 4.667 6.417 L 5.833 6.417 L 5.833 5.25 L 7 5.25 L 7 4.083 L 5.833 4.083 L 5.833 2.917 L 4.667 2.917 L 4.667 1.75 L 3.5 1.75 L 3.5 2.917 L 4.667 2.917 L 4.667 4.083 L 0 4.083 Z" fillRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span style={{ padding: '9px 12px', fontSize: 13.2, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', lineHeight: '21px' }}>
                                        Jak działamy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
