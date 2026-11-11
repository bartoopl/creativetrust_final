import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/audyt-google-ads`;

export const metadata: Metadata = {
    title: 'Audyt Google Ads – audyt konta i kampanii',
    description:
        'Audyt konta Google Ads: konwersje, struktura kampanii, słowa kluczowe, budżet i landing page. Dostajesz listę błędów z priorytetami i plan naprawy.',
    // Polish only (no English twin), so no hreflang pair.
    alternates: { canonical: canonicalUrl },
    openGraph: {
        title: 'Audyt Google Ads | CreativeTrust',
        description:
            'Sprawdzamy konto Google Ads od pomiaru konwersji po landing page i pokazujemy, gdzie budżet pracuje, a gdzie ucieka.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Audyt Google Ads | CreativeTrust',
        description:
            'Audyt konta Google Ads: lista błędów z priorytetami, szacunek wpływu i plan naprawy zamiast ogólnych rekomendacji.',
    },
};

const symptoms = [
    'koszt leada lub sprzedaży rośnie, a nikt nie wie dlaczego',
    'konwersje w Google Ads nie zgadzają się z CRM lub sklepem',
    'budżet zjadają frazy, które nie przynoszą klientów',
    'Performance Max działa jak czarna skrzynka',
    'konto prowadzi agencja, a Ty chcesz niezależnej oceny',
];

const scope = [
    {
        title: 'Pomiar konwersji',
        text: 'GA4, Google Tag Manager, consent mode i import konwersji. Sprawdzamy, czy kampania uczy się na leadach i sprzedaży, a nie na przypadkowych kliknięciach.',
    },
    {
        title: 'Struktura kampanii',
        text: 'Podział kampanii i grup reklam, strategie stawek, Performance Max, Merchant Center i nakładanie się kampanii na siebie.',
    },
    {
        title: 'Słowa kluczowe i wykluczenia',
        text: 'Raport wyszukiwanych haseł, dopasowania, listy wykluczeń i frazy, które kosztują, ale nie sprzedają.',
    },
    {
        title: 'Budżet, reklamy i landing page',
        text: 'Rozkład budżetu, komunikaty i zasoby reklam oraz strona docelowa: czy odpowiada na intencję zapytania i nie gubi konwersji.',
    },
];

const deliverables = [
    {
        title: 'Lista błędów z priorytetami',
        text: 'Każdy problem z opisem, wpływem na koszt i wynik oraz pilnością. Najpierw to, co najszybciej odzyskuje budżet.',
    },
    {
        title: 'Plan naprawy',
        text: 'Konkretne zmiany w koncie, pomiarze i stronie docelowej, w kolejności wdrażania. Możesz wdrożyć je samodzielnie lub z nami.',
    },
    {
        title: 'Omówienie wyników',
        text: 'Rozmowa, na której przechodzimy przez raport i odpowiadamy na pytania Twojego zespołu lub obecnej agencji.',
    },
];

const audience = [
    'firmy B2B, które płacą za leady słabej jakości',
    'sklepy e-commerce z kampaniami produktowymi i Performance Max',
    'firmy usługowe, którym rośnie koszt pozyskania klienta',
    'zespoły przed zmianą agencji lub przejęciem konta in-house',
];

const faqs = [
    {
        question: 'Co obejmuje audyt Google Ads?',
        answer:
            'Pomiar konwersji (GA4, GTM, consent mode), strukturę kampanii i strategie stawek, słowa kluczowe i wykluczenia, rozkład budżetu, reklamy oraz stronę docelową. Przy e-commerce dochodzą Merchant Center i Performance Max.',
    },
    {
        question: 'Czego potrzebujecie, żeby zrobić audyt konta Google Ads?',
        answer:
            'Dostępu do odczytu do konta Google Ads oraz GA4, a jeśli to możliwe także do Google Tag Managera i Merchant Center. Do tego krótkiej rozmowy o celach, marżach i tym, co uznajecie za wartościowego leada lub sprzedaż.',
    },
    {
        question: 'Ile kosztuje audyt Google Ads?',
        answer:
            'Cena zależy od liczby kont, kampanii i tego, czy audyt obejmuje pomiar i landing page. Wycenę podajemy po krótkiej rozmowie, przed rozpoczęciem pracy. Od czego zależy koszt audytu, opisujemy w artykule o kosztach audytu Google Ads.',
    },
    {
        question: 'Czy po audycie musimy podpisać umowę na prowadzenie kampanii?',
        answer:
            'Nie. Plan naprawy zostaje u Was i możecie wdrożyć go samodzielnie lub z obecną agencją. Jeśli chcecie, pomożemy we wdrożeniu poprawek.',
    },
    {
        question: 'Czym audyt Google Ads różni się od audytu e-commerce?',
        answer:
            'Audyt Google Ads dotyczy jednego kanału: konta reklamowego, pomiaru konwersji i budżetu. Audyt e-commerce obejmuje cały sklep: sprzedaż, marżę, technologię i pracę zespołu, w tym koszty wszystkich kanałów. Jeśli problem nie kończy się na reklamach, zacznij od audytu e-commerce.',
    },
];

export default function GoogleAdsAuditPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Audyt Google Ads', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Audyt Google Ads',
        description:
            'Audyt konta i kampanii Google Ads: pomiar konwersji, struktura kampanii, słowa kluczowe i wykluczenia, budżet, reklamy i landing page. Wynik: lista błędów z priorytetami i plan naprawy.',
        url: canonicalUrl,
        serviceType: 'Audyt Google Ads',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="Audyt Google Ads"
                title="Audyt Google Ads, który pokazuje, gdzie ucieka budżet"
                description="Sprawdzamy konto Google Ads od pomiaru konwersji, przez strukturę kampanii i słowa kluczowe, po stronę docelową. Dostajesz listę błędów z priorytetami i plan naprawy, a nie ogólne rekomendacje."
                cta={{ label: 'Zamów audyt Google Ads', href: '#formularz' }}
                ctaSecondary={{ label: 'Co sprawdzamy', href: '#zakres' }}
                right={
                    <HeroMedia
                        src="/google-ads.jpg"
                        alt="Audyt konta i kampanii Google Ads"
                        label="Kiedy warto zrobić audyt?"
                        items={symptoms}
                    />
                }
            />

            <Section
                id="zakres"
                border={false}
                eyebrow="Zakres audytu"
                title="Audyt konta Google Ads: od pomiaru po stronę docelową"
            >
                <NumberedGrid cols={4} items={scope} />
            </Section>

            <Section tint eyebrow="Co dostajesz" title="Wynik audytu, z którym da się od razu pracować">
                <NumberedGrid cols={3} items={deliverables} />
            </Section>

            <Section>
                <SplitLayout eyebrow="Dla kogo" title="Dla firm, które wydają na Google Ads i chcą wiedzieć, co z tego mają">
                    <BulletColumns items={audience} />
                </SplitLayout>
            </Section>

            <Section tint eyebrow="Zanim zamówisz" title="Chcesz najpierw sprawdzić konto samodzielnie?">
                <InlineCTA
                    title="Checklista audytu konta Google Ads"
                    text="Opisaliśmy krok po kroku, co sprawdzić w koncie przed audytem. Jeśli lista pokaże więcej problemów, niż macie czas naprawić, zrobimy to razem."
                    cta={{ label: 'Otwórz checklistę', href: '/blog/audyt-konta-google-ads-checklista' }}
                />
            </Section>

            <Section eyebrow="FAQ" title="Pytania o audyt Google Ads" maxWidth={1100}>
                <FAQAccordion items={faqs} />
                <p className="mt-6" style={{ fontSize: 15, color: 'var(--muted)' }}>
                    Więcej o cenie:{' '}
                    <Link href="/blog/ile-kosztuje-audyt-google-ads" className="ct-contact-link">
                        ile kosztuje audyt Google Ads
                    </Link>
                    .
                </p>
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Audyt Google Ads"
                    formSubtitle="Napisz, jakie kampanie prowadzicie i co dziś nie działa. Wrócimy z zakresem i wyceną audytu."
                    subjectPrefix="Audyt Google Ads"
                    serviceOptions={[
                        'audyt konta Google Ads',
                        'audyt pomiaru konwersji (GA4, GTM)',
                        'audyt Performance Max i Merchant Center',
                        'audyt i pomoc we wdrożeniu poprawek',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'do 5 000 zł miesięcznie',
                        '5 000 - 20 000 zł miesięcznie',
                        '20 000 - 50 000 zł miesięcznie',
                        'powyżej 50 000 zł miesięcznie',
                        'nie wiem',
                    ]}
                    messagePlaceholder="Jakie kampanie prowadzicie, jaki jest miesięczny budżet reklamowy, co jest konwersją i co Was niepokoi w wynikach?"
                />
            </Section>
        </main>
    );
}
