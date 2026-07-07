import type { Metadata } from 'next';
import Image from 'next/image';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import NotchedButton from '@/components/ui/NotchedButton';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/strona-firmowa-cena`;

export const metadata: Metadata = {
    title: 'Strona firmowa cena | Ile kosztuje strona dla firmy',
    description:
        'Ile kosztuje strona firmowa? Landing page pod frazę: strona firmowa cena, koszt strony firmowej, wycena strony dla firmy. Zobacz realne zakresy.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Strona firmowa cena | CreativeTrust',
        description:
            'Wycena strony firmowej: od czego zależy koszt, jak wybrać zakres i co powinno się znaleźć w projekcie.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Strona firmowa cena | CreativeTrust',
        description:
            'Poznaj orientacyjne zakresy i elementy wpływające na cenę strony firmowej.',
    },
};

const ranges = [
    {
        name: 'Prosta strona firmowa',
        price: 'od 7 500 zł netto',
        text: 'Dobra, gdy potrzebujesz wiarygodnej obecności online i jasnej prezentacji oferty.',
    },
    {
        name: 'Strona firmowa z CMS',
        price: 'od 10 000 zł netto',
        text: 'Lepsza, gdy treści mają się zmieniać, a zespół potrzebuje samodzielnie nimi zarządzać.',
    },
    {
        name: 'Serwis sprzedażowy',
        price: 'wycena indywidualna',
        text: 'Gdy strona ma zbierać leady, wspierać kampanie i pracować jak narzędzie sprzedaży.',
    },
];

const drivers = [
    'liczba podstron i typów sekcji',
    'czy treści trzeba przygotować od zera',
    'CMS, formularze, integracje i analityka',
    'poziom projektu UX/UI',
    'wymagania SEO i wydajności',
    'harmonogram i liczba iteracji',
];

const checklist = [
    'jasna architektura informacji',
    'sekcje odpowiadające na najczęstsze pytania klientów',
    'szybkie ładowanie i dobre Core Web Vitals',
    'formularz lub inna ścieżka konwersji',
    'podstawowe SEO i pomiar wyników',
];

export default function CompanyWebsitePricingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Strona firmowa cena', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <section className="bg-black px-6 py-20 text-white md:py-28">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="mb-6 text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--lime-ink)' }}>
                            Strona firmowa
                        </p>
                        <h1 className="mb-8 text-3xl font-medium leading-tight md:text-5xl">
                            Strona firmowa cena, czyli ile naprawdę kosztuje dobra strona dla firmy
                        </h1>
                        <p className="mb-10 max-w-3xl text-xl text-white/70">
                            To landing page dla osób, które szukają wyceny strony firmowej i chcą zrozumieć,
                            od czego zależy koszt, jaki zakres ma sens i gdzie warto dopłacić, a gdzie nie.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <NotchedButton href="#formularz" variant="primary-dark">
                                Poproś o wycenę
                            </NotchedButton>
                            <NotchedButton href="/uslugi/strony-www" variant="ghost-dark">
                                Zobacz ofertę stron WWW
                            </NotchedButton>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/images/seo/website-pricing-hero.png"
                                alt="Wycena strony firmowej i zakres projektu"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
                            <p className="mb-6 text-white/40">Co wpływa na cenę?</p>
                            <div className="space-y-4">
                                {drivers.map((item) => (
                                    <div key={item} className="flex gap-4">
                                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                                        <p className="text-lg text-white/90">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Orientacyjne zakresy</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Cena strony firmowej zależy od tego, ile ma zrobić biznesowo, nie od samej liczby podstron
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {ranges.map((item) => (
                            <div key={item.name} className="rounded-3xl border border-gray-200 p-8">
                                <h3 className="mb-3 text-2xl font-medium">{item.name}</h3>
                                <p className="mb-5 text-3xl font-bold">{item.price}</p>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Dobra strona firmowa ma mieć</p>
                        <h2 className="text-2xl font-medium leading-tight md:text-4xl">
                            Zakres dopasowany do firmy, a nie zbyt mały projekt na start
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {checklist.map((item) => (
                            <div key={item} className="rounded-2xl bg-white p-6 shadow-sm">
                                <p className="text-gray-800">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Proces wyceny</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Najpierw zakres, potem budżet. Nie odwrotnie
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            'Diagnoza potrzeb i celu',
                            'Propozycja zakresu i architektury',
                            'Wycena z wariantami',
                            'Plan wdrożenia i termin',
                        ].map((item, index) => (
                            <div key={item} className="rounded-3xl bg-black p-8 text-white">
                                <div className="mb-8 text-3xl font-bold text-white/20">0{index + 1}</div>
                                <h3 className="mb-4 text-xl font-medium">{item}</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Porządkujemy decyzje tak, żeby wiedzieć, gdzie budżet robi różnicę, a gdzie nie trzeba go przepalać.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="formularz" className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <LandingLeadForm
                        formTitle="Wycena strony firmowej"
                        formSubtitle="Opisz firmę, cel strony i co ma się wydarzyć po wejściu użytkownika. Wrócimy z rekomendacją zakresu i budżetu."
                        subjectPrefix="Strona firmowa cena"
                        serviceOptions={[
                            'strona firmowa',
                            'strona firmowa z CMS',
                            'przebudowa istniejącej strony',
                            'nowa strona pod sprzedaż',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 10 000 zł',
                            '10 000 - 20 000 zł',
                            '20 000 - 40 000 zł',
                            'powyżej 40 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, ile podstron potrzebujesz, czy treści są gotowe i czy strona ma zbierać leady, sprzedawać, czy po prostu dobrze prezentować firmę."
                    />
                </div>
            </section>
        </main>
    );
}
