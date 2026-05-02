import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/migracja-woocommerce-do-headless`;

export const metadata: Metadata = {
    title: 'Migracja WooCommerce do headless | Next.js e-commerce',
    description:
        'Migracja WooCommerce do architektury headless: Next.js storefront, API, lepsza wydajność, SEO i kontrola nad UX sklepu.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Migracja WooCommerce do headless | CreativeTrust',
        description:
            'Sprawdź, kiedy warto przenieść sklep WooCommerce do headless i jak zaplanować migrację bez chaosu w sprzedaży.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Migracja WooCommerce do headless | CreativeTrust',
        description:
            'Next.js storefront dla WooCommerce, lepszy Core Web Vitals, API i kontrolowany plan migracji.',
    },
};

const symptoms = [
    'motyw i wtyczki spowalniają sklep przy większym ruchu',
    'każda zmiana checkoutu albo koszyka jest ryzykowna',
    'Core Web Vitals i mobile UX ograniczają wyniki kampanii',
    'frontend sklepu trudno połączyć z CMS, PIM, ERP lub automatyzacją',
    'zespół marketingu potrzebuje szybciej testować landing page’e i treści',
];

const migrationSteps = [
    {
        number: '01',
        title: 'Audyt obecnego WooCommerce',
        description:
            'Sprawdzamy katalog, checkout, wtyczki, dane, SEO, tracking i miejsca, w których monolit blokuje rozwój.',
    },
    {
        number: '02',
        title: 'Architektura docelowa',
        description:
            'Decydujemy, czy WooCommerce zostaje backendem, czy lepszy będzie Medusa, Saleor albo Shopify Plus.',
    },
    {
        number: '03',
        title: 'Next.js storefront',
        description:
            'Budujemy szybki frontend z kontrolą nad listami produktów, PDP, koszykiem, checkoutem i treściami.',
    },
    {
        number: '04',
        title: 'Migracja etapami',
        description:
            'Wdrażamy bez gwałtownego cięcia sprzedaży: staging, testy, przekierowania, tracking i monitoring po launchu.',
    },
];

const outcomes = [
    'szybszy frontend i lepsze Core Web Vitals',
    'większa swoboda projektowania UX bez ograniczeń motywu',
    'mniej ryzykowne wdrażanie zmian w warstwie prezentacji',
    'łatwiejsze połączenie sklepu z CMS, ERP, PIM i marketing automation',
    'lepsza baza pod SEO, kampanie płatne i eksperymenty konwersji',
    'czytelniejszy podział odpowiedzialności między commerce backend i storefront',
];

export default function WooCommerceHeadlessMigrationPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Migracja WooCommerce do headless', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <section className="px-6 py-20 md:py-28 bg-black text-white overflow-hidden">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-16 items-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
                            WooCommerce → Headless
                        </p>
                        <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-8">
                            Migracja WooCommerce do headless storefrontu w Next.js
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mb-10">
                            Oddzielamy frontend sklepu od ograniczeń motywu WordPress, zachowując kontrolę
                            nad danymi, SEO i sprzedażą. To kierunek dla e-commerce, który urósł poza prosty
                            sklep na wtyczkach.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button href="#formularz" className="bg-white !text-black hover:bg-gray-200">
                                Omów migrację sklepu
                            </Button>
                            <Link
                                href="/uslugi/e-commerce"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-medium text-white hover:bg-white hover:text-black transition-colors"
                            >
                                Zobacz ofertę e-commerce
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/images/seo/headless-woocommerce-hero.png"
                                alt="Headless WooCommerce i architektura sklepu internetowego"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
                            <p className="text-gray-400 mb-6">Kiedy to ma sens?</p>
                            <div className="space-y-5">
                                {symptoms.map((symptom) => (
                                    <div key={symptom} className="flex gap-4">
                                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                                        <p className="text-lg text-gray-100">{symptom}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[1800px] mx-auto">
                    <div className="max-w-4xl mb-12">
                        <p className="text-gray-500 mb-3">Proces migracji</p>
                        <h2 className="text-3xl md:text-5xl font-medium">
                            Headless nie zaczyna się od kodu, tylko od decyzji architektonicznej
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {migrationSteps.map((step) => (
                            <div key={step.number} className="rounded-3xl border border-gray-200 p-8">
                                <div className="text-4xl font-bold text-gray-200 mb-8">{step.number}</div>
                                <h3 className="text-2xl font-medium mb-4">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
                    <div>
                        <p className="text-gray-500 mb-3">Efekty biznesowe</p>
                        <h2 className="text-3xl md:text-5xl font-medium leading-tight">
                            Migracja ma poprawić sprzedaż, nie tylko stack technologiczny
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {outcomes.map((outcome) => (
                            <div key={outcome} className="rounded-2xl bg-white p-6 shadow-sm">
                                <p className="text-gray-800">{outcome}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-medium mb-6">
                            Nie każdy WooCommerce powinien przejść na headless
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Jeśli sklep jest mały, ma prosty katalog i nie ma problemów z ruchem, pełna migracja
                            może być nadmiarowa. Dlatego zaczynamy od audytu i rekomendujemy też warianty pośrednie:
                            optymalizację obecnego sklepu, przebudowę checkoutu albo stopniowy storefront.
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            Gdy problemem jest skala, złożone integracje i koszt każdej zmiany UX, headless
                            daje więcej kontroli nad frontem, wydajnością i rozwojem kanałów.
                        </p>
                        <Button href="#formularz">Sprawdź, czy headless ma sens</Button>
                    </div>
                    <div className="rounded-3xl bg-black text-white p-8 md:p-10">
                        <p className="text-gray-400 mb-4">Możliwe scenariusze</p>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-medium mb-2">WooCommerce jako backend</h3>
                                <p className="text-gray-300">
                                    Produkty i zamówienia zostają w WooCommerce, a frontend przejmuje Next.js.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium mb-2">Migracja do nowego silnika</h3>
                                <p className="text-gray-300">
                                    Przy większej skali rozważamy Medusa, Saleor albo Shopify Plus jako bazę commerce.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium mb-2">Etapowy checkout first</h3>
                                <p className="text-gray-300">
                                    Zaczynamy od najbardziej krytycznego fragmentu ścieżki zakupowej, zanim ruszymy katalog.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="formularz" className="px-6 py-16 md:py-24 bg-gray-50">
                <div className="max-w-[1100px] mx-auto">
                    <LandingLeadForm
                        formTitle="Porozmawiajmy o migracji WooCommerce"
                        formSubtitle="Opisz obecny sklep, skalę sprzedaży i problem. Ocenimy, czy headless ma sens, czy lepsza będzie optymalizacja lub etap pośredni."
                        subjectPrefix="Migracja WooCommerce do headless"
                        serviceOptions={[
                            'audyt obecnego WooCommerce',
                            'WooCommerce jako backend + Next.js storefront',
                            'migracja do Medusa / Saleor / Shopify Plus',
                            'checkout first / etapowa migracja',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 25 000 zł',
                            '25 000 - 50 000 zł',
                            '50 000 - 100 000 zł',
                            'powyżej 100 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, na czym stoi sklep, ile ma produktów, jakie integracje są krytyczne i co dziś najbardziej blokuje rozwój."
                    />
                </div>
            </section>
        </main>
    );
}
