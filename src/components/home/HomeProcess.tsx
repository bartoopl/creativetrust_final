import { steps } from '../ProcessPipelineSection';

/** The process as a flat timeline frame: step, what happens, how long — durations in mono. */
export default function HomeProcess() {
    return (
        <section id="proces" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Jak działamy</span>
                    <h2 className="ct-h2 ct-statement">Nasz proces. <span className="ct-electric">AI</span> w każdym kroku.</h2>
                </div>
                <ol className="ct-frame grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 1, background: 'var(--line)' }}>
                    {steps.map((step) => (
                        <li key={step.num} className="flex flex-col gap-3" style={{ padding: 24, minHeight: 200, background: 'var(--panel)' }}>
                            <span className="ct-mono" style={{ fontSize: 13, color: 'var(--accent)' }}>{step.num}</span>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500 }}>{step.title}</h3>
                            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{step.description}</p>
                            <span className="ct-mono" style={{ marginTop: 'auto', fontSize: 12, color: 'var(--muted-2)' }}>{step.duration}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
