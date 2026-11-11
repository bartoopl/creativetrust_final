const steps = [
    { num: '01', title: 'Rozmowa wstępna', description: 'Sprawdzamy, czy audyt ma w Twoim przypadku sens biznesowy. Bez zobowiązań.', duration: '15 minut' },
    { num: '02', title: 'Audyt e-commerce', description: 'Wywiad, analiza danych i zaplecza sklepu. Stała kwota, znana z góry.', duration: '5–7 dni roboczych' },
    { num: '03', title: 'Roadmapa', description: 'Priorytety w kolejności wpływu na zysk i czas zespołu, z wyceną ich realizacji.', duration: 'na koniec audytu' },
    { num: '04', title: 'Zarządzanie i wdrożenia', description: 'Prowadzimy e-commerce z zewnątrz i wdrażamy zmiany. Koszt audytu odliczamy w pierwszym miesiącu.', duration: 'miesięczny abonament' },
];

/** The engagement model as a flat timeline frame: step, what happens, how long — durations in mono. */
export default function HomeProcess() {
    return (
        <section id="proces" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Jak pracujemy</span>
                    <h2 className="ct-h2 ct-statement">Małe ryzyko na starcie. <span className="ct-electric">Konkretny plan</span> na dalej.</h2>
                </div>
                <ol className="ct-frame grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 1, background: 'var(--line)' }}>
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
