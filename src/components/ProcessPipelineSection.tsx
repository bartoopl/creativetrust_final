import ProcessPipelineCanvas from './ProcessPipelineCanvas';
import NotchedButton from './ui/NotchedButton';

const steps = [
    {
        num: '01',
        title: 'Brief',
        description: 'Rozmawiamy o biznesie, celach i KPIs projektu.',
        duration: '1–2 dni',
        ai: false,
    },
    {
        num: '02',
        title: 'Strategia',
        description: 'AI analizuje rynek i dane. My projektujemy plan działania.',
        duration: '2–3 dni',
        ai: true,
        aiLabel: 'AI',
    },
    {
        num: '03',
        title: 'Design',
        description: 'Prototypy i projekty UI/UX - w godzinach, nie tygodniach.',
        duration: '3–5 dni',
        ai: false,
    },
    {
        num: '04',
        title: 'Wdrożenie',
        description: 'AI przyspiesza coding. Wdrażamy 3× szybciej niż standardowo.',
        duration: '1–4 tyg.',
        ai: true,
        aiLabel: 'AI ×3',
    },
    {
        num: '05',
        title: 'Launch & Wzrost',
        description: 'Start, monitoring, optymalizacja wyników od dnia pierwszego.',
        duration: 'Ongoing',
        ai: false,
    },
];

export default function ProcessPipelineSection() {
    return (
        <section style={{ background: '#080808', padding: '72px 16px 0' }} className="lg:px-[72px] lg:pt-[120px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 64 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <span style={{ fontSize: 12.2, fontWeight: 500, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: '20px' }}>
                            JAK DZIAŁAMY
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(30px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '1.13', letterSpacing: '-1.76px', color: '#fff', margin: 0 }}>
                            Nasz proces. AI<br />w każdym kroku.
                        </h2>
                    </div>
                    <p style={{ fontSize: 15.1, fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(255,255,255,0.5)', maxWidth: 380 }} className="lg:text-right">
                        Od briefu do wdrożenia - sprawdzony model łączący doświadczenie biznesowe z prędkością AI.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div style={{ position: 'relative', border: '0.5px solid rgba(255,255,255,0.08)', minWidth: 900 }}>
                        <ProcessPipelineCanvas />
                        <div style={{ height: 220 }} />
                        <div style={{ display: 'flex', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
                            {steps.map((step, i) => (
                                <div
                                    key={step.num}
                                    style={{
                                        flex: 1,
                                        padding: '28px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 16,
                                        borderRight: i < steps.length - 1 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
                                        background: step.ai ? 'rgba(202,255,4,0.025)' : 'transparent',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: step.ai ? 'var(--lime)' : 'rgba(255,255,255,0.3)' }}>
                                            {step.num}
                                        </span>
                                        {step.ai && (
                                            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(202,255,4,0.1)', border: '1px solid rgba(202,255,4,0.25)', padding: '2px 8px', animation: 'aiBadgePulse 2.5s ease-in-out infinite', animationDelay: step.num === '04' ? '0.8s' : undefined }}>
                                                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--lime)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                                    {step.aiLabel}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                            {step.title}
                                        </span>
                                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: '20px', margin: 0 }}>
                                            {step.description}
                                        </p>
                                    </div>
                                    <div style={{ marginTop: 'auto', display: 'flex' }}>
                                        <span style={{ fontSize: 10, color: step.ai ? 'var(--lime)' : 'rgba(255,255,255,0.25)', border: step.ai ? '1px solid rgba(202,255,4,0.25)' : '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', letterSpacing: '0.04em' }}>
                                            {step.duration}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-14" style={{ padding: '40px 0 64px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 35.6, fontWeight: 500, letterSpacing: '-1.44px', color: 'var(--lime)' }}>3×</span>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>szybciej z AI w procesie</span>
                    </div>
                    <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.08)' }} className="hidden lg:block" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 35.6, fontWeight: 500, letterSpacing: '-1.44px', color: '#fff' }}>60%</span>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>krótszy czas wdrożenia</span>
                    </div>
                    <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.08)' }} className="hidden lg:block" />
                    <p style={{ flex: 1, fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: '24px', maxWidth: 480, margin: 0 }}>
                        Nie zastępujemy ludzi AI - używamy jej do eliminacji powtarzalnych zadań, żebyś dostawał wyniki szybciej.
                    </p>
                    <NotchedButton href="/kontakt" variant="primary-dark" className="self-start lg:self-auto">
                        Umów konsultację
                    </NotchedButton>
                </div>
            </div>
        </section>
    );
}
