import Section from './ui/Section';

const steps = [
    { num: '01', title: 'Brief', description: 'Rozmawiamy o biznesie, celach i KPIs.', duration: '1–2 dni' },
    { num: '02', title: 'AI Strategia', description: 'AI analizuje rynek i dane. My projektujemy plan.', duration: '2–3 dni' },
    { num: '03', title: 'Design', description: 'Prototypy i UI/UX w godzinach, nie tygodniach.', duration: '3–5 dni' },
    { num: '04', title: 'AI×3 Wdrożenie', description: 'AI przyspiesza coding — 3× szybciej niż standardowo.', duration: '1–4 tyg.' },
    { num: '05', title: 'Launch & Wzrost', description: 'Start, monitoring, optymalizacja od dnia pierwszego.', duration: 'Ongoing' },
];

export default function ProcessPipelineSection() {
    return (
        <Section id="proces" eyebrow="Jak działamy" title="Nasz proces. AI w każdym kroku." className="scroll-mt-20">
            <ol className="ct-grid-lines" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', listStyle: 'none', margin: 0, padding: 0 }}>
                {steps.map((step) => (
                    <li key={step.num} className="flex flex-col gap-2.5" style={{ padding: 24 }}>
                        <span className="ct-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)' }}>{step.num}</span>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{step.title}</h3>
                        <p className="ct-body" style={{ fontSize: 13 }}>{step.description}</p>
                        <span className="ct-mono" style={{ marginTop: 'auto', fontSize: 11, fontWeight: 500, color: 'var(--muted-2)' }}>{step.duration}</span>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
