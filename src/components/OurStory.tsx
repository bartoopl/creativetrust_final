import Button from './Button';

const principles = [
    {
        title: 'Strategia przed estetyką',
        description: 'Najpierw definiujemy problem biznesowy i sposób pomiaru efektu. Design ma wspierać decyzję, nie tylko wyglądać dobrze.',
    },
    {
        title: 'Jedna odpowiedzialność za wynik',
        description: 'Łączymy web, e-commerce i automation w jednym procesie. Dzięki temu nie rozbijamy odpowiedzialności na przypadkowych wykonawców.',
    },
    {
        title: 'Wdrożenie, nie tylko koncepcja',
        description: 'Dowozimy projekt od planu po implementację. Klient dostaje działający system, a nie dokument do archiwum.',
    },
];

export default function OurStory() {
    return (
        <section className="w-full px-6 py-16 md:py-24">
            <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Dlaczego my
                        </p>
                        <h2 className="mt-3 text-3xl font-medium text-slate-950 md:text-4xl">
                            Pracujemy jak partner, nie jak dostawca od pojedynczej usługi.
                        </h2>
                    </div>

                    <div>
                        <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
                            {principles.map((principle) => (
                                <div key={principle.title} className="bg-white p-6 md:p-7">
                                    <h3 className="text-xl font-medium text-slate-950">
                                        {principle.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-6 text-slate-600">
                                        {principle.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                                Jeśli potrzebujesz uporządkować komunikację, przebudować stronę albo poukładać sprzedaż w sieci,
                                zaczynamy od diagnozy, a nie od gotowego szablonu.
                            </p>
                            <Button href="/o-nas">Poznaj zespół</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
