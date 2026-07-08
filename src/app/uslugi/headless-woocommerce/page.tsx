import type { Metadata } from 'next';
import Image from 'next/image';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import NotchedButton from '@/components/ui/NotchedButton';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/headless-woocommerce`;

export const metadata: Metadata = {
    title: 'Headless WooCommerce | Sklep bez ograniczeń WordPress',
    description:
        'Headless WooCommerce dla sklepów, które chcą szybszy frontend, lepszy UX i większą kontrolę nad rozwojem. Landing pod long-tail SEO i migracje.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Headless WooCommerce | CreativeTrust',
        description:
            'Projektujemy headless WooCommerce z Next.js storefrontem, lepszą wydajnością i pełną kontrolą nad UX.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Headless WooCommerce | CreativeTrust',
        description:
            'Next.js storefront, lepsze Core Web Vitals i kontrola nad rozwojem sklepu.',
    },
};

const signals = [
    'WooCommerce spowalnia przy większej skali',
    'każda zmiana w motywie blokuje development',
    'potrzebujesz szybszego frontu i lepszego UX',
    'sklep ma rosnąć razem z integracjami i automatyzacją',
    'SEO i performance są ważniejsze niż motyw z wtyczek',
];

const benefits = [
    'szybszy frontend i lepsze Core Web Vitals',
    'większa swoboda rozwoju checkoutu i PDP',
    'łatwiejsze łączenie sklepu z CMS, ERP i CRM',
    'mniej ograniczeń przy testach i optymalizacji',
    'lepsza baza pod SEO i kampanie płatne',
];

const approaches = [
    {
        title: 'WooCommerce jako backend',
        text: 'Produkty i zamówienia zostają w WooCommerce, a frontend przejmuje Next.js.',
    },
    {
        title: 'Migracja do nowego silnika',
        text: 'Przy większej skali rozważamy Medusa, Saleor albo Shopify Plus jako podstawę commerce.',
    },
    {
        title: 'Etapowa zmiana',
        text: 'Najpierw zmieniamy storefront, potem resztę architektury, żeby nie ryzykować sprzedaży.',
    },
];

const faqs = [
    {
        question: 'Czy headless WooCommerce oznacza całkowitą migrację sklepu?',
        answer: 'Nie zawsze. Czasem najpierw zmieniamy tylko frontend, a backend zostaje w WooCommerce.',
    },
    {
        question: 'Kiedy headless ma największy sens?',
        answer: 'Gdy motyw i wtyczki ograniczają rozwój, performance albo testowanie nowych doświadczeń zakupowych.',
    },
    {
        question: 'Czy headless poprawia SEO sklepu?',
        answer: 'Może poprawić techniczne fundamenty SEO dzięki szybkości i lepszej architekturze, ale wymaga też sensownej treści i linkowania.',
    },
];

export default function HeadlessWooCommercePage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Headless WooCommerce', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Headless WooCommerce',
        description:
            'Headless WooCommerce z Next.js storefrontem dla sklepów, które potrzebują lepszej wydajności i większej swobody UX.',
        url: canonicalUrl,
        serviceType: 'Headless e-commerce',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <section className="bg-black px-6 py-20 text-white md:py-28">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="mb-6 text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--lime-ink)' }}>
                            E-commerce
                        </p>
                        <h1 className="mb-8 text-3xl font-medium leading-tight md:text-5xl">
                            Headless WooCommerce dla sklepu, który potrzebuje większej swobody
                        </h1>
                        <p className="mb-10 max-w-3xl text-xl text-white/70">
                            To landing page dla fraz związanych z headless WooCommerce, migracją sklepu i
                            kontrolą nad frontendem. Jeśli motyw blokuje rozwój, ten kierunek ma sens.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <NotchedButton href="#formularz" variant="primary-dark">
                                Omów headless WooCommerce
                            </NotchedButton>
                            <NotchedButton href="/uslugi/e-commerce" variant="ghost-dark">
                                Zobacz ofertę e-commerce
                            </NotchedButton>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/images/seo/headless-woocommerce-hero.png"
                                alt="Headless WooCommerce i nowy storefront"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
                            <p className="mb-6 text-white/40">Kiedy to ma sens?</p>
                            <div className="space-y-4">
                                {signals.map((item) => (
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
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Co zyskujesz</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Headless WooCommerce daje więcej swobody tam, gdzie klasyczny motyw już przeszkadza
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {benefits.map((item) => (
                            <div key={item} className="rounded-3xl border border-gray-200 p-8">
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Modele wdrożenia</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Nie każdy sklep musi migrować wszystko naraz
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {approaches.map((item) => (
                            <div key={item.title} className="rounded-3xl bg-white p-8 shadow-sm">
                                <h3 className="mb-4 text-2xl font-medium">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Proces</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Najpierw decyzja architektoniczna, potem wdrożenie
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            'audyt WooCommerce i punktów bólu',
                            'decyzja o architekturze docelowej',
                            'budowa Next.js storefrontu',
                            'migracja etapami i monitoring',
                        ].map((item, index) => (
                            <div key={item} className="rounded-3xl bg-black p-8 text-white">
                                <div className="mb-8 text-3xl font-bold text-white/20">0{index + 1}</div>
                                <h3 className="mb-4 text-xl font-medium">{item}</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Projekt prowadzimy tak, żeby poprawić szybkość, UX i możliwość rozwoju bez psucia sprzedaży.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <div className="mb-10 max-w-3xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>FAQ</p>
                        <h2 className="text-2xl font-medium md:text-4xl">Najczęstsze pytania o headless WooCommerce</h2>
                    </div>
                    <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
                </div>
            </section>

            <section id="formularz" className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <LandingLeadForm
                        formTitle="Headless WooCommerce"
                        formSubtitle="Opisz sklep, ruch i problem, który blokuje rozwój. Wrócimy z rekomendacją: headless, etapowo albo optymalizacja."
                        subjectPrefix="Headless WooCommerce"
                        serviceOptions={[
                            'audyt sklepu WooCommerce',
                            'headless WooCommerce z Next.js',
                            'migracja sklepu do nowej architektury',
                            'przebudowa checkoutu',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 25 000 zł',
                            '25 000 - 50 000 zł',
                            '50 000 - 100 000 zł',
                            'powyżej 100 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, jaki macie sklep, co działa źle, ile produktów, jakie integracje i co najbardziej blokuje rozwój."
                    />
                </div>
            </section>
        </main>
    );
}
