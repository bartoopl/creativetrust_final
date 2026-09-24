import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, PriceGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

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

const faqs = [
    {
        question: 'Ile kosztuje strona internetowa dla firmy?',
        answer: 'To zależy od zakresu. Prosta strona zaczyna się od kilku tysięcy złotych, a większe serwisy z CMS i integracjami są wyceniane indywidualnie.',
    },
    {
        question: 'Czy cennik oznacza stałą cenę?',
        answer: 'Nie. To orientacyjny punkt startu, który pomaga dobrać zakres do celu biznesowego i budżetu.',
    },
    {
        question: 'Czy taki landing pomaga w SEO?',
        answer: 'Tak, jeśli odpowiada na konkretną intencję wyszukiwania, ma dobrą strukturę, szybko się ładuje i prowadzi do kontaktu.',
    },
];

export default function WebsitePricingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Tworzenie stron WWW cennik', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Tworzenie stron WWW cennik',
        description:
            'Orientacyjny cennik stron WWW: od landing page po rozbudowany serwis firmowy z CMS, SEO i integracjami.',
        url: canonicalUrl,
        serviceType: 'Cennik stron internetowych',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Cennik stron internetowych"
                title="Ile kosztuje strona internetowa dla firmy?"
                description="Cena strony WWW zależy od zakresu, treści, CMS, integracji i celu biznesowego. Poniżej pokazujemy realne zakresy projektów, które mają działać sprzedażowo, a nie tylko wyglądać jak wizytówka."
                cta={{ label: 'Poproś o wycenę strony', href: '#formularz' }}
                ctaSecondary={{ label: 'Zobacz ofertę WWW', href: '/uslugi/strony-www' }}
                right={
                    <HeroMedia
                        src="/images/seo/website-pricing-hero.png"
                        alt="Projektowanie strony internetowej i planowanie zakresu wyceny"
                        label="Najważniejsza zasada"
                    >
                        <div style={{ borderTop: '1px solid var(--line)', padding: '16px 0 14px' }}>
                            <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.25 }}>
                                Najtańsza strona rzadko jest najtańszą decyzją.
                            </p>
                            <p className="ct-body" style={{ fontSize: 15 }}>
                                Jeśli strona nie ładuje się szybko, nie ma dobrych treści i nie mierzy konwersji,
                                kosztuje podwójnie: najpierw przy wdrożeniu, potem w przepalonych kampaniach i
                                utraconych zapytaniach.
                            </p>
                        </div>
                    </HeroMedia>
                }
            />

            <Section
                border={false}
                eyebrow="Orientacyjne zakresy"
                title="Cennik traktujemy jako punkt startu do rozmowy"
            >
                <PriceGrid
                    items={packages.map((item) => ({
                        name: item.name,
                        price: item.price,
                        text: item.description,
                        features: item.features,
                    }))}
                />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Od czego zależy cena?" title="Największy wpływ ma nie liczba pikseli, tylko zakres decyzji">
                    <BulletColumns items={costDrivers} />
                </SplitLayout>
            </Section>

            <Section>
                <NumberedGrid cols={3} items={comparisons.map((item) => ({ title: item.label, text: item.text }))} />
                <InlineCTA
                    title="Chcesz realną wycenę?"
                    text="Wyślij krótki opis firmy, celu strony i tego, co ma robić użytkownik po wejściu. Wrócimy z rekomendowanym zakresem, nie tylko z kwotą."
                    cta={{ label: 'Wyceń projekt WWW', href: '#formularz' }}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Najczęstsze pytania o cennik stron WWW" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
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
            </Section>
        </main>
    );
}
