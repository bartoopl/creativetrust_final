import type { Metadata } from 'next';
import Image from 'next/image';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import NotchedButton from '@/components/ui/NotchedButton';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/wdrozenie-salesmanago`;

export const metadata: Metadata = {
    title: 'Wdrożenie SALESmanago | Marketing automation dla firm',
    description:
        'Wdrożenie SALESmanago, automatyzacje, segmentacja i lead nurturing. Landing page pod frazy: wdrożenie SALESmanago, partner SALESmanago, marketing automation.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Wdrożenie SALESmanago | CreativeTrust',
        description:
            'Projektujemy i wdrażamy SALESmanago: integracje CRM, scenariusze i personalizacja kampanii.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wdrożenie SALESmanago | CreativeTrust',
        description:
            'Lead nurturing, segmentacja i automatyzacje oparte na danych. SALESmanago wdrożone bez chaosu.',
    },
};

const symptoms = [
    'leady wpadają do CRM, ale nie ma z nich procesu',
    'zespół wysyła za dużo ręcznych follow-upów',
    'kampanie e-mail nie są segmentowane i personalizowane',
    'brakuje spójności między stroną, reklamą i CRM',
    'system marketing automation jest, ale nie pracuje na sprzedaż',
];

const deliverables = [
    {
        title: 'Audyt i architektura',
        text: 'Sprawdzamy dane, źródła leadów, integracje i miejsce, w którym automatyzacja ma dać największy zwrot.',
    },
    {
        title: 'Konfiguracja SALESmanago',
        text: 'Ustawiamy konto, tracking, segmenty, zdarzenia i podstawowe reguły scoringowe.',
    },
    {
        title: 'Scenariusze i lejki',
        text: 'Budujemy welcome flow, lead nurturing, odzyskiwanie kontaktu i kampanie, które uruchamiają się same.',
    },
    {
        title: 'Pomiar i rozwój',
        text: 'Podłączamy raportowanie, testy i optymalizację, żeby automatyzacja nie była jednorazowym wdrożeniem.',
    },
];

const useCases = [
    'B2B z długim cyklem sprzedaży',
    'e-commerce z porzuconym koszykiem i cross-sell',
    'firmy usługowe, które chcą automatyzować follow-up',
    'zespoły, które potrzebują segmentacji i personalizacji',
];

const benefits = [
    'mniej ręcznej pracy po stronie sprzedaży i marketingu',
    'lepsze domykanie leadów dzięki sekwencjom i scoringowi',
    'większa trafność komunikacji dzięki segmentacji',
    'wyższa jakość danych między stroną, CRM i kampaniami',
];

export default function SalesmanagoImplementationPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Wdrożenie SALESmanago', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <section className="border-b border-white/10 bg-black px-6 py-20 text-white md:py-28">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="mb-6 text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--lime-ink)' }}>
                            Marketing Automation
                        </p>
                        <h1 className="mb-8 text-3xl font-medium leading-tight md:text-5xl">
                            Wdrożenie SALESmanago, które faktycznie pracuje na sprzedaż
                        </h1>
                        <p className="mb-10 max-w-3xl text-xl text-white/70">
                            Projektujemy wdrożenie SALESmanago pod realne procesy firmy: integracje, segmentację,
                            scenariusze i raportowanie. Bez przypadkowych automatyzacji i bez zgadywania.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <NotchedButton href="#formularz" variant="primary-dark">
                                Omów wdrożenie SALESmanago
                            </NotchedButton>
                            <NotchedButton href="/uslugi/marketing-automation" variant="ghost-dark">
                                Zobacz ofertę automation
                            </NotchedButton>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/sales-manago-partnership.jpg"
                                alt="Wdrożenie SALESmanago i automatyzacje marketingowe"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
                            <p className="mb-6 text-white/40">Kiedy to ma sens?</p>
                            <div className="space-y-4">
                                {symptoms.map((item) => (
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
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Co wdrażamy</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Wdrożenie SALESmanago zaczyna się od procesu, nie od klikania w panel
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {deliverables.map((item, index) => (
                            <div key={item.title} className="rounded-3xl border border-gray-200 p-8">
                                <div className="mb-8 text-3xl font-bold text-gray-200">
                                    0{index + 1}
                                </div>
                                <h3 className="mb-4 text-xl font-medium">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Dla kogo</p>
                        <h2 className="text-2xl font-medium leading-tight md:text-4xl">
                            Landing pod frazę wdrożenie SALESmanago ma przyciągać firmy, które chcą automatyzować sprzedaż
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {useCases.map((item) => (
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
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Efekt biznesowy</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Dobre wdrożenie nie wygląda efektownie. Ono dowozi wynik
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {benefits.map((item) => (
                            <div key={item} className="rounded-3xl bg-black p-8 text-white">
                                <p className="text-white/80">{item}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 rounded-3xl bg-gray-50 p-8 md:p-12">
                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="mb-4 text-3xl font-medium">Chcesz wdrożyć SALESmanago bez chaosu?</h2>
                                <p className="max-w-2xl text-gray-600">
                                    Pokażemy, jak ułożyć automatyzacje, żeby firma zyskała uporządkowany proces i
                                    realny wzrost, a nie tylko kolejne reguły w systemie.
                                </p>
                            </div>
                            <NotchedButton href="#formularz" variant="primary-light">
                                Poproś o wdrożenie
                            </NotchedButton>
                        </div>
                    </div>
                </div>
            </section>

            <section id="formularz" className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <LandingLeadForm
                        formTitle="Wdrożenie SALESmanago"
                        formSubtitle="Opisz obecny CRM, źródła leadów i to, co ma działać automatycznie. Wrócimy z rekomendacją zakresu wdrożenia."
                        subjectPrefix="Wdrożenie SALESmanago"
                        serviceOptions={[
                            'audyt i architektura automatyzacji',
                            'wdrożenie SALESmanago od zera',
                            'integracje CRM i tracking',
                            'scenariusze lead nurturing',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 10 000 zł',
                            '10 000 - 25 000 zł',
                            '25 000 - 50 000 zł',
                            'powyżej 50 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, jakie macie źródła leadów, jaki CRM, co dziś jest ręczne i jakie automatyzacje chcecie uruchomić jako pierwsze."
                    />
                </div>
            </section>
        </main>
    );
}
