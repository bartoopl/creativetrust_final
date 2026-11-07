import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/landing-page-google-ads`;

export const metadata: Metadata = {
    title: 'Landing page Google Ads | Strona pod kampanie i reklamy',
    description:
        'Landing page Google Ads, Meta Ads i performance marketing. Strona pod reklamy, która zwiększa konwersję i wspiera SEO. Projektujemy pod zapytania sprzedażowe.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Landing page Google Ads | CreativeTrust',
        description:
            'Tworzymy landing page pod kampanie płatne, reklamy i lead generation. Szybko, czytelnie i pod konwersję.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Landing page Google Ads | CreativeTrust',
        description:
            'Strona pod reklamy Google Ads i kampanie performance. Projekt pod kliknięcia, leady i wynik.',
    },
    robots: {
        index: false,
        follow: true,
    },
};

const signals = [
    'wysoki CPC wymaga wyższej konwersji po kliknięciu',
    'ruch z kampanii płatnych potrzebuje jasnej ścieżki do CTA',
    'strona główna nie zawsze jest najlepszym miejscem na kampanię',
    'każda sekunda ładowania wpływa na wynik kampanii',
    'landing page powinien mówić jednym językiem z reklamą',
];

const essentials = [
    {
        title: 'Jedna obietnica',
        text: 'Landing page odpowiada na jedno zapytanie i prowadzi do jednego konkretnego działania.',
    },
    {
        title: 'Szybkie ładowanie',
        text: 'Optymalizujemy wydajność, bo każda dodatkowa sekunda obniża skuteczność kampanii.',
    },
    {
        title: 'Treść pod intencję',
        text: 'Układamy copy tak, żeby odpowiadało na pytanie użytkownika z reklamy, a nie ogólnie opisywało firmę.',
    },
    {
        title: 'Pomiar konwersji',
        text: 'Podpinamy analitykę, żeby wiedzieć, który komunikat i które CTA daje wynik.',
    },
];

const useCases = [
    'kampania Google Ads na konkretną usługę',
    'reklama lead generation dla B2B',
    'Meta Ads kierujące do jednej oferty',
    'testowanie nowych komunikatów sprzedażowych',
];

const process = [
    {
        title: 'Research i intencja',
        text: 'Sprawdzamy frazę, konkurencję i cel użytkownika. Landing bez tej warstwy zwykle przepala budżet.',
    },
    {
        title: 'Wireframe i komunikat',
        text: 'Budujemy strukturę sekcji tak, żeby reklama i strona mówiły tym samym językiem.',
    },
    {
        title: 'Design i wdrożenie',
        text: 'Robimy stronę lekką, szybą i czytelną. Dla kampanii to ważniejsze niż efekciarstwo.',
    },
    {
        title: 'Test i optymalizacja',
        text: 'Po starcie mierzymy zachowanie użytkowników i poprawiamy treść, układ i CTA.',
    },
];

const faqs = [
    {
        question: 'Czy landing page pod Google Ads powinien być osobną stroną?',
        answer: 'Tak, jeśli kampania ma jedną ofertę i jeden cel konwersji. Osobna strona zwykle lepiej dopasowuje komunikat niż homepage.',
    },
    {
        question: 'Czym różni się od zwykłej strony usługowej?',
        answer: 'Landing ma krótszą ścieżkę, mniej rozpraszaczy i mocniejsze CTA. Strona usługowa jest szersza i mniej wyspecjalizowana.',
    },
    {
        question: 'Czy pomagacie też z SEO takiego landinga?',
        answer: 'Tak, ale w sensie technicznym i treściowym: intencja, meta, nagłówki, wydajność i linkowanie. Nie robimy klasycznego SEO kampanijnego.',
    },
];

export default function GoogleAdsLandingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Landing page Google Ads', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Landing page Google Ads',
        description:
            'Strona pod kampanie Google Ads i performance marketing, projektowana pod jedną ofertę i jedną konwersję.',
        url: canonicalUrl,
        serviceType: 'Landing page pod reklamy',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Performance landing page"
                title="Landing page Google Ads, która zamienia kliknięcia w zapytania"
                description="Projektujemy strony pod reklamy płatne, które mają jedną rolę: zwiększyć konwersję. Copy, UX, wydajność i CTA układamy pod konkretną ofertę, nie pod ogólną wizytówkę."
                cta={{ label: 'Zleć landing page', href: '#formularz' }}
                ctaSecondary={{ label: 'Oferta stron WWW', href: '/uslugi/strony-www' }}
                right={
                    <HeroMedia
                        src="/images/seo/google-ads-audit-hero.png"
                        alt="Landing page pod Google Ads i kampanie reklamowe"
                        label="Kiedy landing page jest potrzebny?"
                        items={signals}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Co musi mieć dobra strona pod reklamy?"
                title="Landing page pod Google Ads działa, gdy usuwa tarcie i nie rozprasza uwagi"
            >
                <NumberedGrid cols={4} items={essentials} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Dla kogo" title="Jedna strona pod reklamę, jedna oferta, jeden ruch użytkownika">
                    <BulletColumns items={useCases} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Proces" title="Projektujemy landing page pod kampanię, nie odwrotnie">
                <NumberedGrid cols={4} items={process} />
                <InlineCTA
                    title="Masz kampanię i potrzebujesz lepszego landing page?"
                    text="Zrobimy stronę pod konkretną frazę, reklamę i konwersję. Bez kopiowania homepage."
                    cta={{ label: 'Poproś o landing page', href: '#formularz' }}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Najczęstsze pytania o landing page pod reklamy" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Landing page pod Google Ads"
                    formSubtitle="Opisz usługę, kampanię i cel konwersji. Przygotujemy landing page, który dopasuje się do reklamy i nie rozproszy użytkownika."
                    subjectPrefix="Landing page Google Ads"
                    serviceOptions={[
                        'landing page pod Google Ads',
                        'landing page pod Meta Ads',
                        'strona pod kampanię performance',
                        'test nowej oferty / nowego komunikatu',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'do 5 000 zł',
                        '5 000 - 10 000 zł',
                        '10 000 - 20 000 zł',
                        'powyżej 20 000 zł',
                        'nie wiem / potrzebuję rekomendacji',
                    ]}
                    messagePlaceholder="Napisz, jaka usługa lub oferta ma być promowana, skąd będzie ruch i jaka konwersja ma się wydarzyć po wejściu na stronę."
                />
            </Section>
        </main>
    );
}
