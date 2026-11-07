import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { HeroMedia, NumberedGrid } from '@/components/LandingBlocks';
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

            <PageHero
                eyebrow="E-commerce"
                title="Headless WooCommerce dla sklepu, który potrzebuje większej swobody"
                description="To landing page dla fraz związanych z headless WooCommerce, migracją sklepu i kontrolą nad frontendem. Jeśli motyw blokuje rozwój, ten kierunek ma sens."
                cta={{ label: 'Omów headless WooCommerce', href: '#formularz' }}
                ctaSecondary={{ label: 'Zobacz ofertę e-commerce', href: '/uslugi/e-commerce' }}
                right={
                    <HeroMedia
                        src="/images/seo/headless-woocommerce-hero.png"
                        alt="Headless WooCommerce i nowy storefront"
                        label="Kiedy to ma sens?"
                        items={signals}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Co zyskujesz"
                title="Headless WooCommerce daje więcej swobody tam, gdzie klasyczny motyw już przeszkadza"
            >
                <NumberedGrid cols={5} items={benefits.map((item) => ({ text: item }))} />
            </Section>

            <Section tint eyebrow="Modele wdrożenia" title="Nie każdy sklep musi migrować wszystko naraz">
                <NumberedGrid cols={3} items={approaches} />
            </Section>

            <Section eyebrow="Proces" title="Najpierw decyzja architektoniczna, potem wdrożenie">
                <NumberedGrid
                    cols={4}
                    items={[
                        'audyt WooCommerce i punktów bólu',
                        'decyzja o architekturze docelowej',
                        'budowa Next.js storefrontu',
                        'migracja etapami i monitoring',
                    ].map((item) => ({
                        title: item,
                        text: 'Projekt prowadzimy tak, żeby poprawić szybkość, UX i możliwość rozwoju bez psucia sprzedaży.',
                    }))}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Najczęstsze pytania o headless WooCommerce" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
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
            </Section>
        </main>
    );
}
