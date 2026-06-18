import Link from 'next/link';

const services = [
    {
        title: 'Branding',
        href: '/uslugi/branding',
        description: 'Porządkujemy pozycjonowanie, identyfikację i komunikację marki, żeby działały spójnie w każdym punkcie styku.',
    },
    {
        title: 'Strony WWW',
        href: '/uslugi/strony-www',
        description: 'Projektujemy i wdrażamy strony, które jasno prowadzą użytkownika do kontaktu, zapytania lub zakupu.',
    },
    {
        title: 'E-commerce',
        href: '/uslugi/e-commerce',
        description: 'Budujemy sklepy i migracje headless z naciskiem na szybkość, integracje i skalowanie sprzedaży.',
    },
    {
        title: 'Social Media',
        href: '/uslugi/social-media',
        description: 'Układamy komunikację i content pod widoczność, zasięg i sprzedaż, nie tylko pod publikację postów.',
    },
    {
        title: 'Marketing Automation',
        href: '/uslugi/marketing-automation',
        description: 'Projektujemy automatyzacje, które pomagają domykać leady, segmentować bazę i odciążać zespół.',
    },
];

export default function Services() {
    return (
        <section className="w-full px-6 py-16 md:py-24">
            <div className="mx-auto max-w-[1800px]">
                <div className="mb-10 flex flex-col gap-3 border-t border-slate-200 pt-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Zakres usług
                        </p>
                        <h2 className="mt-2 max-w-2xl text-3xl font-medium text-slate-950 md:text-4xl">
                            Jedna współpraca, kilka kompetencji. Bez rozbijania projektu na przypadkowych wykonawców.
                        </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                        Dobieramy zakres do problemu biznesowego. Czasem zaczynamy od marki, czasem od strony lub sklepu,
                        a czasem od automatyzacji, która pozwala domknąć proces.
                    </p>
                </div>

                <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className="group bg-white p-6 transition-colors hover:bg-slate-50 md:p-8"
                        >
                            <div className="flex h-full flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                            Service
                                        </p>
                                        <h3 className="mt-3 text-2xl font-medium text-slate-950">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-slate-950">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 7H17V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>

                                <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600 md:text-base">
                                    {service.description}
                                </p>

                                <div className="mt-6 border-t border-slate-200 pt-4 text-sm font-medium text-slate-950">
                                    Zobacz zakres
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
