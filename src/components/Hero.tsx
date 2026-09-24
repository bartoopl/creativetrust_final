import NotchedButton from './ui/NotchedButton';

const signals = [
    'Strony www',
    'Ecommerce headless',
    'Marketing automation',
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
                    className="ct-placeholder"
                    style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, minHeight: 320 }}
                    role="img"
                    aria-label="Podgląd wdrożenia"
                >
                    <span className="ct-placeholder-label">PODGLĄD WDROŻENIA — miejsce na screenshot</span>
                </div>
            </div>
        </section>
    );
}
