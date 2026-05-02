import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/tworzenie-stron-www-cennik`;

export const metadata: Metadata = {
    title: 'Tworzenie strony internetowej cena | Cennik WWW',
    description:
        'Ile kosztuje strona internetowa dla firmy? Zobacz orientacyjne zakresy: landing page, strona firmowa, serwis z CMS, SEO i integracje.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Tworzenie strony internetowej cena | CreativeTrust',
        description:
            'Orientacyjny cennik stron WWW: od landing page po rozbudowany serwis firmowy z CMS, SEO i integracjami.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tworzenie strony internetowej cena | CreativeTrust',
        description:
            'Sprawdź, od czego zależy koszt strony internetowej i jaki zakres wybrać dla firmy.',
    },
};

const packages = [
    {
        name: 'Landing page',
        price: 'od 3 500 zł netto',
        description: 'Jedna strona pod kampanię, usługę lub konkretną ofertę.',
        features: ['struktura pod konwersję', 'copy sekcji sprzedażowych', 'formularz kontaktowy', 'podstawowe SEO'],
    },
    {
        name: 'Strona firmowa',
        price: 'od 7 500 zł netto',
        description: 'Kilka podstron dla firmy, która potrzebuje wiarygodnej obecności online.',
        features: ['architektura informacji', 'projekt UI', 'CMS do edycji treści', 'techniczne SEO i analityka'],
    },
    {
        name: 'Serwis rozbudowany',
        price: 'wycena indywidualna',
        description: 'Większy serwis z blogiem, bazą wiedzy, integracjami lub niestandardową logiką.',
        features: ['warsztat i discovery', 'integracje API/CRM', 'komponenty niestandardowe', 'plan rozwoju SEO'],
    },
];

const costDrivers = [
    'liczba typów podstron i sekcji',
    'czy treści są gotowe, czy trzeba je stworzyć od zera',
    'zakres CMS i uprawnień redakcyjnych',
    'integracje: CRM, newsletter, analityka, płatności, automatyzacje',
    'poziom projektu UI i animacji',
    'wymagania SEO, wydajności i migracji istniejącej strony',
];

const comparisons = [
    {
        label: 'Tania strona z szablonu',
        text: 'Dobra jako szybka wizytówka, ale zwykle trudniej ją rozbudować i wyróżnić w konkurencyjnej branży.',
    },
    {
        label: 'Strona projektowana pod firmę',
        text: 'Lepsza, gdy strona ma pracować jako element sprzedaży: zbierać leady, tłumaczyć ofertę i wspierać kampanie.',
    },
    {
        label: 'Serwis jako platforma treści',
        text: 'Najlepszy kierunek, gdy planujesz SEO, blog, bazę wiedzy, wiele usług albo dalsze skalowanie marketingu.',
    },
];

export default function WebsitePricingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Tworzenie stron WWW cennik', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <section className="px-6 py-20 md:py-28 bg-gray-50">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">
                            Cennik stron internetowych
                        </p>
                        <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
                            Ile kosztuje strona internetowa dla firmy?
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mb-10">
                            Cena strony WWW zależy od zakresu, treści, CMS, integracji i celu biznesowego.
                            Poniżej pokazujemy realne zakresy projektów, które mają działać sprzedażowo,
                            a nie tylko wyglądać jak wizytówka.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="#formularz">Poproś o wycenę strony</Button>
                            <Link
                                href="/uslugi/strony-www"
                                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 font-medium text-black hover:bg-black hover:text-white transition-colors"
                            >
                                Zobacz ofertę WWW
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-xl">
                            <Image
                                src="/images/seo/website-pricing-hero.png"
                                alt="Projektowanie strony internetowej i planowanie zakresu wyceny"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] bg-black p-8 md:p-10 text-white">
                            <p className="text-gray-400 mb-4">Najważniejsza zasada</p>
                            <p className="text-3xl md:text-4xl font-medium leading-tight mb-6">
                                Najtańsza strona rzadko jest najtańszą decyzją.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Jeśli strona nie ładuje się szybko, nie ma dobrych treści i nie mierzy konwersji,
                                kosztuje podwójnie: najpierw przy wdrożeniu, potem w przepalonych kampaniach i
                                utraconych zapytaniach.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[1800px] mx-auto">
                    <div className="max-w-3xl mb-12">
                        <p className="text-gray-500 mb-3">Orientacyjne zakresy</p>
                        <h2 className="text-3xl md:text-5xl font-medium">
                            Cennik traktujemy jako punkt startu do rozmowy
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {packages.map((item) => (
                            <div key={item.name} className="rounded-3xl border border-gray-200 p-8 flex flex-col">
                                <h3 className="text-2xl font-medium mb-3">{item.name}</h3>
                                <p className="text-3xl font-bold mb-5">{item.price}</p>
                                <p className="text-gray-600 mb-8">{item.description}</p>
                                <ul className="space-y-3 mt-auto">
                                    {item.features.map((feature) => (
                                        <li key={feature} className="flex gap-3 text-gray-700">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
                    <div>
                        <p className="text-gray-500 mb-3">Od czego zależy cena?</p>
                        <h2 className="text-3xl md:text-5xl font-medium leading-tight">
                            Największy wpływ ma nie liczba pikseli, tylko zakres decyzji
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {costDrivers.map((driver) => (
                            <div key={driver} className="rounded-2xl bg-white p-6 shadow-sm">
                                <p className="text-gray-800">{driver}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {comparisons.map((item) => (
                            <div key={item.label} className="rounded-3xl bg-black text-white p-8">
                                <h3 className="text-2xl font-medium mb-4">{item.label}</h3>
                                <p className="text-gray-300">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-3xl bg-gray-50 p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-medium mb-4">Chcesz realną wycenę?</h2>
                            <p className="text-gray-600 max-w-2xl">
                                Wyślij krótki opis firmy, celu strony i tego, co ma robić użytkownik po wejściu.
                                Wrócimy z rekomendowanym zakresem, nie tylko z kwotą.
                            </p>
                        </div>
                        <Button href="#formularz">Wyceń projekt WWW</Button>
                    </div>
                </div>
            </section>

            <section id="formularz" className="px-6 py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1100px] mx-auto">
                    <LandingLeadForm
                        formTitle="Wyceń stronę internetową"
                        formSubtitle="Podaj typ strony, cel i zakres. Odpowiemy, jaki wariant ma sens i od czego będzie zależeć koszt."
                        subjectPrefix="Wycena strony WWW"
                        serviceOptions={[
                            'landing page',
                            'strona firmowa',
                            'rozbudowany serwis z CMS',
                            'przebudowa istniejącej strony',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 5 000 zł',
                            '5 000 - 10 000 zł',
                            '10 000 - 25 000 zł',
                            'powyżej 25 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, czym zajmuje się firma, ile podstron przewidujesz i co strona ma robić: zbierać leady, sprzedawać, edukować, wspierać kampanie?"
                    />
                </div>
            </section>
        </main>
    );
}
