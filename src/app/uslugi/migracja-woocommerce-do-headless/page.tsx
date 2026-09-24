import type { Metadata } from 'next';
import Link from 'next/link';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import NotchedButton from '@/components/ui/NotchedButton';
import { BulletColumns, HeroMedia, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

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

const faqs = [
    {
        question: 'Czy migracja WooCommerce do headless może odbyć się bez utraty SEO?',
        answer: 'Tak, jeśli przed uruchomieniem przygotujemy mapę URL, przekierowania 301, canonicale, sitemapę, dane strukturalne i plan monitoringu po wdrożeniu.',
    },
    {
        question: 'Czy trzeba przenosić cały sklep od razu?',
        answer: 'Nie. W wielu przypadkach bezpieczniejszy jest etapowy rollout, na przykład najpierw storefront lub checkout, a następnie pozostałe obszary sklepu.',
    },
    {
        question: 'Kiedy headless nie jest najlepszym wyborem?',
        answer: 'Gdy sklep jest prosty, nie ma problemów z wydajnością ani złożonymi integracjami. Wtedy audyt może wskazać tańszą optymalizację obecnego rozwiązania.',
    },
];

export default function WooCommerceHeadlessMigrationPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Migracja WooCommerce do headless', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Migracja WooCommerce do headless',
        description: 'Migracja WooCommerce do architektury headless z planem zachowania SEO, danych i sprzedaży.',
        url: canonicalUrl,
        serviceType: 'Migracja e-commerce',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="WooCommerce → Headless"
                title="Migracja WooCommerce do headless storefrontu w Next.js"
                description="Oddzielamy frontend sklepu od ograniczeń motywu WordPress, zachowując kontrolę nad danymi, SEO i sprzedażą. To kierunek dla e-commerce, który urósł poza prosty sklep na wtyczkach."
                cta={{ label: 'Omów migrację sklepu', href: '#formularz' }}
                ctaSecondary={{ label: 'Zobacz ofertę e-commerce', href: '/uslugi/e-commerce' }}
                right={
                    <HeroMedia
                        src="/images/seo/headless-woocommerce-hero.png"
                        alt="Headless WooCommerce i architektura sklepu internetowego"
                        label="Kiedy to ma sens?"
                        items={symptoms}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Proces migracji"
                title="Headless nie zaczyna się od kodu, tylko od decyzji architektonicznej"
            >
                <NumberedGrid
                    cols={4}
                    items={migrationSteps.map((step) => ({ title: step.title, text: step.description }))}
                />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Efekty biznesowe" title="Migracja ma poprawić sprzedaż, nie tylko stack technologiczny">
                    <BulletColumns items={outcomes} />
                </SplitLayout>
            </Section>

            <Section>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-5">
                        <SectionHeader title="Nie każdy WooCommerce powinien przejść na headless" />
                        <p className="ct-body" style={{ fontSize: 16 }}>
                            Jeśli sklep jest mały, ma prosty katalog i nie ma problemów z ruchem, pełna migracja
                            może być nadmiarowa. Dlatego zaczynamy od audytu i rekomendujemy też warianty pośrednie:
                            optymalizację obecnego sklepu, przebudowę checkoutu albo stopniowy storefront.
                        </p>
                        <p className="ct-body" style={{ fontSize: 16 }}>
                            Gdy problemem jest skala, złożone integracje i koszt każdej zmiany UX, headless
                            daje więcej kontroli nad frontem, wydajnością i rozwojem kanałów.
                        </p>
                        <div className="pt-2">
                            <NotchedButton href="#formularz">Sprawdź, czy headless ma sens</NotchedButton>
                        </div>
                    </div>
                    <div className="ct-panel" style={{ padding: '24px 28px 8px' }}>
                        <p className="ct-meta" style={{ margin: '0 0 12px' }}>Możliwe scenariusze</p>
                        {[
                            {
                                title: 'WooCommerce jako backend',
                                text: 'Produkty i zamówienia zostają w WooCommerce, a frontend przejmuje Next.js.',
                            },
                            {
                                title: 'Migracja do nowego silnika',
                                text: 'Przy większej skali rozważamy Medusa, Saleor albo Shopify Plus jako bazę commerce.',
                            },
                            {
                                title: 'Etapowy checkout first',
                                text: 'Zaczynamy od najbardziej krytycznego fragmentu ścieżki zakupowej, zanim ruszymy katalog.',
                            },
                        ].map((scenario, i) => (
                            <div key={scenario.title} className="flex gap-4" style={{ padding: '18px 0', borderTop: '1px solid var(--line)' }}>
                                <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)', paddingTop: 4 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 600 }}>{scenario.title}</h3>
                                    <p className="ct-body">{scenario.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section tint>
                <SplitLayout eyebrow="SEO w migracji" title="Plan migracji chroni widoczność tylko wtedy, gdy jest częścią wdrożenia.">
                    <div className="flex flex-col items-start gap-6">
                        <p className="ct-body" style={{ fontSize: 16 }}>Przed zmianą technologii ustalamy adresy do zachowania, mapę przekierowań, canonicale, sitemapę, dane strukturalne i pomiar. Po starcie sprawdzamy indeksację, błędy 404 oraz kluczowe strony i zapytania.</p>
                        <Link href="/blog/migracja-sklepu-bez-utraty-seo" className="ct-ghost" style={{ whiteSpace: 'normal' }}>
                            Zobacz checklistę migracji sklepu bez utraty SEO
                        </Link>
                    </div>
                </SplitLayout>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o migrację WooCommerce do headless" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
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
            </Section>
        </main>
    );
}
