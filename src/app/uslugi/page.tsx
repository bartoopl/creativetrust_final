import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Usługi - CreativeTrust | Strategia, WWW, e-commerce i automatyzacja',
    description: 'Projektujemy branding, strony WWW, e-commerce, social media i marketing automation. Jeden zespół, jeden proces, jeden cel: lepszy wynik biznesowy.',
    alternates: {
        canonical: `${SITE_URL}/uslugi`,
    },
};

const services = [
    {
        title: 'Branding',
        href: '/uslugi/branding',
        description: 'Porządkujemy pozycjonowanie, identyfikację wizualną i komunikację marki.',
        points: ['Strategia marki', 'Identyfikacja wizualna', 'Rebranding'],
    },
    {
        title: 'Strony WWW',
        href: '/uslugi/strony-www',
        description: 'Projektujemy i wdrażamy strony, które prowadzą użytkownika do kontaktu lub zapytania.',
        points: ['Strony firmowe', 'Landing pages', 'UX i wdrożenie'],
    },
    {
        title: 'E-commerce',
        href: '/uslugi/e-commerce',
        description: 'Budujemy sklepy headless i migracje, które nie dźwigają zbędnego długu technicznego.',
        points: ['Headless commerce', 'Migracje', 'Integracje'],
    },
    {
        title: 'Social Media',
        href: '/uslugi/social-media',
        description: 'Układamy komunikację pod zasięg, spójność i sprzedaż, nie tylko pod regularne publikacje.',
        points: ['Strategia', 'Content', 'Analityka'],
    },
    {
        title: 'Marketing Automation',
        href: '/uslugi/marketing-automation',
        description: 'Wdrażamy automatyzacje, które wspierają segmentację, lead nurturing i domykanie sprzedaży.',
        points: ['SALESmanago', 'Scenariusze', 'Personalizacja'],
    },
];

const process = [
    {
        step: '01',
        title: 'Diagnoza',
        description: 'Sprawdzamy problem biznesowy, kontekst rynkowy i ograniczenia technologiczne.',
    },
    {
        step: '02',
        title: 'Strategia',
        description: 'Układamy zakres działań, priorytety i sposób mierzenia efektu.',
    },
    {
        step: '03',
        title: 'Wdrożenie',
        description: 'Projektujemy i implementujemy rozwiązanie w jednym, kontrolowanym procesie.',
    },
    {
        step: '04',
        title: 'Rozwój',
        description: 'Optymalizujemy komunikację, wydajność i konwersję po starcie.',
    },
];

const faqItems = [
    {
        question: 'Od czego najlepiej zacząć?',
        answer: 'Najczęściej od diagnozy: marka, strona, sklep albo automatyzacja. Wybór zależy od tego, gdzie dziś tracisz najwięcej potencjału.',
    },
    {
        question: 'Czy łączycie kilka usług w jednym projekcie?',
        answer: 'Tak. To zwykle lepszy model niż oddzielne zamawianie brandingu, WWW i komunikacji u różnych wykonawców.',
    },
    {
        question: 'Czy pracujecie tylko z dużymi firmami?',
        answer: 'Nie. Obsługujemy mniejsze biznesy, które potrzebują uporządkować ofertę i sprzedaż, oraz większe zespoły z bardziej złożonym procesem.',
    },
    {
        question: 'Czy możecie zacząć od audytu?',
        answer: 'Tak. Audyt jest dobrym punktem startowym, jeśli potrzebujesz decyzji, co robić dalej i w jakiej kolejności.',
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <section className="w-full px-6 py-16 md:py-24 lg:py-28">
                <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Usługi
                        </p>
                        <h1 className="mt-4 text-4xl font-medium leading-[1.02] text-slate-950 md:text-6xl lg:text-7xl">
                            Jeden zespół. Wiele kompetencji. Jeden cel: lepszy wynik.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                            Projektujemy branding, strony WWW, e-commerce, social media i marketing automation tak, żeby
                            działały razem, a nie obok siebie. To podejście oszczędza czas, ogranicza chaos i poprawia konwersję.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button href="/kontakt">Umów rozmowę</Button>
                            <Link
                                href="#zakres"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-950 hover:border-slate-950"
                            >
                                Zobacz zakres
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
                        <div className="bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Priorytet</p>
                            <p className="mt-3 text-xl font-medium text-slate-950">Jasny przekaz i sprawny proces</p>
                        </div>
                        <div className="bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Efekt</p>
                            <p className="mt-3 text-xl font-medium text-slate-950">Mniej tarcia, więcej wyniku</p>
                        </div>
                        <div className="bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Model</p>
                            <p className="mt-3 text-xl font-medium text-slate-950">Strategia + wdrożenie</p>
                        </div>
                        <div className="bg-white p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Zakres</p>
                            <p className="mt-3 text-xl font-medium text-slate-950">Brand, web, commerce, automation</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="zakres" className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                    <div className="mb-8 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Zakres usług
                            </p>
                            <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                                Moduły, które można uruchamiać osobno lub łączyć w jeden projekt.
                            </h2>
                        </div>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
                        {services.map((service) => (
                            <Link
                                key={service.title}
                                href={service.href}
                                className="group bg-white p-6 transition-colors hover:bg-slate-50 md:p-8"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                            Service
                                        </p>
                                        <h3 className="mt-3 text-2xl font-medium text-slate-950">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-slate-950">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 7H17V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>

                                <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600 md:text-base">
                                    {service.description}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {service.points.map((point) => (
                                        <span
                                            key={point}
                                            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                                        >
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Jak pracujemy
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Proces bez chaosu, za to z jasną odpowiedzialnością na każdym etapie.
                        </h2>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-4">
                        {process.map((step) => (
                            <div key={step.step} className="bg-white p-6">
                                <p className="text-sm font-medium text-slate-500">{step.step}</p>
                                <h3 className="mt-3 text-xl font-medium text-slate-950">{step.title}</h3>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            FAQ
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Najczęstsze pytania przed startem współpracy.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {faqItems.map((item) => (
                            <div key={item.question} className="rounded-[8px] border border-slate-200 bg-white p-6">
                                <h3 className="text-xl font-medium text-slate-950">{item.question}</h3>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                            Jeśli chcesz uporządkować zakres prac i ustalić, od czego naprawdę zacząć, zrobimy to na jednej rozmowie.
                        </p>
                        <Button href="/kontakt">Zacznij od konsultacji</Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
