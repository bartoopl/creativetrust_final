import NotchedButton from './ui/NotchedButton';

const signals = [
    'Strony www',
    'Ecommerce headless',
    'Marketing automation',
];

const pipeline = [
    { num: '01', title: 'Cel biznesowy', text: 'KPI i mierzalny wynik przed pierwszym pikselem.', status: 'brief' },
    { num: '02', title: 'Research z AI', text: 'Rynek, konkurencja i dane — w dni, nie tygodnie.', status: 'strategia' },
    { num: '03', title: 'Prototyp', text: 'UX i UI testowane na realnych scenariuszach.', status: 'design' },
    { num: '04', title: 'Wdrożenie', text: 'Next.js, Medusa.js, automatyzacje i integracje.', status: 'development' },
    { num: '05', title: 'Optymalizacja', text: 'Monitoring i iteracje od dnia startu.', status: 'wzrost' },
];

export default function Hero() {
    return (
        <section
            className="ct-dotgrid relative"
            style={{ padding: 'var(--pad-y) var(--pad-x) 0' }}
        >
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12">
                <div className="flex max-w-[640px] flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                        {signals.map((signal) => (
                            <span key={signal} className="ct-pill">{signal}</span>
                        ))}
                    </div>

                    <h1 className="ct-h1">Projekty cyfrowe, które działają biznesowo.</h1>

                    <p className="ct-lead" style={{ maxWidth: '46ch' }}>
                        AI skraca research i produkcję. Zespół pilnuje decyzji, jakości i wyniku.
                    </p>

                    <div className="flex flex-wrap gap-3.5 pt-2">
                        <NotchedButton href="/kontakt">Umów konsultację</NotchedButton>
                        <NotchedButton href="#uslugi" variant="ghost">Jak możemy pomóc</NotchedButton>
                    </div>
                </div>

                <div
                    className="overflow-hidden"
                    style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, background: '#fff' }}
                    aria-label="Przykładowy przebieg wdrożenia"
                >
                    <div className="flex items-center justify-between gap-4" style={{ padding: '12px 20px', borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                        <span className="ct-mono" style={{ fontSize: 12, color: 'var(--muted)' }}>creativetrust / wdrożenie</span>
                        <span className="ct-mono" style={{ fontSize: 11, color: 'var(--accent)' }}>● AI w procesie</span>
                    </div>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ listStyle: 'none', margin: 0, padding: 0, gap: 1, background: 'var(--line)' }}>
                        {pipeline.map((step) => (
                            <li key={step.num} className="flex flex-col gap-2" style={{ background: '#fff', padding: '24px 20px', minHeight: 140 }}>
                                <span className="ct-mono" style={{ fontSize: 12, color: 'var(--accent)' }}>{step.num}</span>
                                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{step.title}</span>
                                <span className="ct-body" style={{ fontSize: 13 }}>{step.text}</span>
                                <span className="ct-mono" style={{ marginTop: 'auto', fontSize: 11, color: 'var(--muted-2)' }}>{step.status}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
