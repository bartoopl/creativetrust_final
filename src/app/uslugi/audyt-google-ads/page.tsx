import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/audyt-google-ads`;

export const metadata: Metadata = {
    title: 'Audyt Google Ads | Sprawdź kampanie i budżet',
    description:
        'Audyt Google Ads dla firm, które chcą sprawdzić strukturę konta, konwersje, budżet i błędy w kampaniach. Konkretne rekomendacje optymalizacji.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Audyt Google Ads | CreativeTrust',
        description:
            'Sprawdzimy konto Google Ads, tracking, strukturę kampanii, budżet i miejsca, w których uciekają konwersje.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Audyt Google Ads | CreativeTrust',
        description:
            'Diagnoza kampanii Google Ads z konkretną listą poprawek, priorytetów i ryzyk.',
    },
};

const auditAreas = [
    'Konwersje, GA4, GTM i import celów do Google Ads',
    'Struktura konta, grup reklam i słów kluczowych',
    'Budżety, strategie stawek i przepalanie środków',
    'Search terms, wykluczenia i dopasowania słów',
    'Jakość reklam, assety, rozszerzenia i landing page',
    'Merchant Center, Performance Max i remarketing, jeśli są używane',
];

const deliverables = [
    {
        title: 'Mapa błędów',
        description:
            'Lista problemów pogrupowana według wpływu na budżet, tracking i wynik kampanii.',
    },
    {
        title: 'Plan optymalizacji',
        description:
            'Priorytety na pierwsze 30 dni: co poprawić od razu, co testować, czego nie ruszać bez danych.',
    },
    {
        title: 'Ocena potencjału',
        description:
            'Informacja, czy konto wymaga porządków, przebudowy struktury, czy tylko regularnej optymalizacji.',
    },
];

const redFlags = [
    'dużo kliknięć, mało zapytań lub sprzedaży',
    'kampanie działają, ale nikt nie wie, co realnie konwertuje',
    'Performance Max zjada budżet bez jasnego podziału wyników',
    'brakuje wykluczeń, a raport wyszukiwanych haseł wygląda przypadkowo',
    'agencja wysyła raporty, ale bez decyzji i rekomendacji',
];

export default function GoogleAdsAuditPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Audyt Google Ads', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <section className="px-6 py-20 md:py-28 bg-black text-white">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
                            Audyt Google Ads
                        </p>
                        <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
                            Sprawdź, gdzie kampanie Google Ads tracą budżet
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mb-10">
                            Audytujemy konto, tracking i strukturę kampanii, żeby pokazać, które decyzje
                            blokują konwersje. Dostajesz nie ogólną opinię, tylko listę konkretnych działań
                            do wdrożenia.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="#formularz" className="bg-white !text-black hover:bg-gray-200">
                                Umów audyt kampanii
                            </Button>
                            <Link
                                href="/uslugi/performance-marketing/google-ads"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-medium text-white hover:bg-white hover:text-black transition-colors"
                            >
                                Zobacz prowadzenie Google Ads
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/images/seo/google-ads-audit-hero.png"
                                alt="Audyt Google Ads i analiza wyników kampanii"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10 shadow-2xl">
                            <p className="text-gray-400 mb-6">Dla kogo?</p>
                            <div className="space-y-5">
                                {redFlags.map((flag) => (
                                    <div key={flag} className="flex gap-4">
                                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                                        <p className="text-lg text-gray-100">{flag}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
                        <div>
                            <p className="text-gray-500 mb-3">Zakres audytu</p>
                            <h2 className="text-3xl md:text-5xl font-medium leading-tight">
                                Sprawdzamy konto od techniki po decyzje budżetowe
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {auditAreas.map((area) => (
                                <div key={area} className="rounded-2xl border border-gray-200 p-6">
                                    <p className="text-gray-800">{area}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="max-w-3xl mb-12">
                        <p className="text-gray-500 mb-3">Efekt po audycie</p>
                        <h2 className="text-3xl md:text-5xl font-medium">
                            Wiesz, co poprawić i w jakiej kolejności
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {deliverables.map((item) => (
                            <div key={item.title} className="rounded-3xl bg-white p-8 shadow-sm">
                                <h3 className="text-2xl font-medium mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-medium mb-6">
                            Audyt może być jednorazowy albo początkiem optymalizacji
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Jeśli po audycie chcesz wdrożyć rekomendacje z zespołem, możemy przejąć prowadzenie
                            kampanii lub pracować warsztatowo z Twoim specjalistą. Najpierw jednak porządkujemy
                            dane, bo bez poprawnego trackingu optymalizacja jest tylko zgadywaniem.
                        </p>
                        <Button href="#formularz">Porozmawiajmy o audycie</Button>
                    </div>
                    <div className="rounded-3xl bg-black p-8 text-white">
                        <h3 className="text-2xl font-medium mb-6">Najczęstsze szybkie wygrane</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li>Poprawienie zdublowanych lub źle importowanych konwersji.</li>
                            <li>Ograniczenie wydatków na frazy informacyjne bez intencji zakupu.</li>
                            <li>Rozdzielenie kampanii brand, non-brand i remarketingu.</li>
                            <li>Urealnienie budżetów względem marży, sezonowości i celu kampanii.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id="formularz" className="px-6 py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1100px] mx-auto">
                    <LandingLeadForm
                        formTitle="Zamów audyt Google Ads"
                        formSubtitle="Opisz krótko konto, budżet i problem. Wrócimy z informacją, jaki zakres audytu ma sens."
                        subjectPrefix="Audyt Google Ads"
                        serviceOptions={[
                            'audyt konta Google Ads',
                            'audyt konwersji i GA4/GTM',
                            'audyt Performance Max',
                            'audyt kampanii e-commerce',
                            'nie wiem, potrzebuję diagnozy',
                        ]}
                        budgetOptions={[
                            'do 5 000 zł miesięcznie',
                            '5 000 - 15 000 zł miesięcznie',
                            '15 000 - 50 000 zł miesięcznie',
                            'powyżej 50 000 zł miesięcznie',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, od kiedy działają kampanie, jaki jest budżet i co budzi największe wątpliwości."
                    />
                </div>
            </section>
        </main>
    );
}
