import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, NumberedGrid, PriceGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

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

const faqs = [
    {
        question: 'Od czego najbardziej zależy cena strony firmowej?',
        answer: 'Od zakresu, treści, CMS, integracji, poziomu projektu i tego, czy strona ma sprzedawać, czy tylko prezentować firmę.',
    },
    {
        question: 'Czy ta strona jest dobra jako landing SEO?',
        answer: 'Tak, jeśli użytkownik szuka wyceny i chce szybko zrozumieć przedział budżetu oraz czynniki wpływające na koszt.',
    },
    {
        question: 'Czy cena z formularza jest ostateczna?',
        answer: 'Nie. Formularz służy do diagnozy zakresu, a wycena zależy od realnych potrzeb i decyzji projektowych.',
    },
];

export default function CompanyWebsitePricingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Strona firmowa cena', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Strona firmowa cena',
        description:
            'Landing page pod frazę strona firmowa cena, koszt strony firmowej i wycena strony dla firmy.',
        url: canonicalUrl,
        serviceType: 'Wycena strony firmowej',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Strona firmowa"
                title="Strona firmowa cena, czyli ile naprawdę kosztuje dobra strona dla firmy"
                description="To landing page dla osób, które szukają wyceny strony firmowej i chcą zrozumieć, od czego zależy koszt, jaki zakres ma sens i gdzie warto dopłacić, a gdzie nie."
                cta={{ label: 'Poproś o wycenę', href: '#formularz' }}
                ctaSecondary={{ label: 'Zobacz ofertę stron WWW', href: '/uslugi/strony-www' }}
                right={
                    <HeroMedia
                        src="/images/seo/website-pricing-hero.png"
                        alt="Wycena strony firmowej i zakres projektu"
                        label="Co wpływa na cenę?"
                        items={drivers}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Orientacyjne zakresy"
                title="Cena strony firmowej zależy od tego, ile ma zrobić biznesowo, nie od samej liczby podstron"
            >
                <PriceGrid items={ranges} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Dobra strona firmowa ma mieć" title="Zakres dopasowany do firmy, a nie zbyt mały projekt na start">
                    <BulletColumns items={checklist} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Proces wyceny" title="Najpierw zakres, potem budżet. Nie odwrotnie">
                <NumberedGrid
                    cols={4}
                    items={[
                        'Diagnoza potrzeb i celu',
                        'Propozycja zakresu i architektury',
                        'Wycena z wariantami',
                        'Plan wdrożenia i termin',
                    ].map((item) => ({
                        title: item,
                        text: 'Porządkujemy decyzje tak, żeby wiedzieć, gdzie budżet robi różnicę, a gdzie nie trzeba go przepalać.',
                    }))}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Najczęstsze pytania o cenę strony firmowej" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
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
            </Section>
        </main>
    );
}
