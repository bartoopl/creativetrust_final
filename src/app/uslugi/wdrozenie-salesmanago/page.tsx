import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
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

            <PageHero
                eyebrow="Marketing Automation"
                title="Wdrożenie SALESmanago, które faktycznie pracuje na sprzedaż"
                description="Projektujemy wdrożenie SALESmanago pod realne procesy firmy: integracje, segmentację, scenariusze i raportowanie. Bez przypadkowych automatyzacji i bez zgadywania."
                cta={{ label: 'Omów wdrożenie SALESmanago', href: '#formularz' }}
                ctaSecondary={{ label: 'Zobacz ofertę automation', href: '/uslugi/marketing-automation' }}
                right={
                    <HeroMedia
                        src="/sales-manago-partnership.jpg"
                        alt="Wdrożenie SALESmanago i automatyzacje marketingowe"
                        label="Kiedy to ma sens?"
                        items={symptoms}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Co wdrażamy"
                title="Wdrożenie SALESmanago zaczyna się od procesu, nie od klikania w panel"
            >
                <NumberedGrid cols={4} items={deliverables.map((item) => ({ title: item.title, text: item.text }))} />
            </Section>

            <Section tint>
                <SplitLayout
                    eyebrow="Dla kogo"
                    title="Landing pod frazę wdrożenie SALESmanago ma przyciągać firmy, które chcą automatyzować sprzedaż"
                >
                    <BulletColumns items={useCases} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Efekt biznesowy" title="Dobre wdrożenie nie wygląda efektownie. Ono dowozi wynik">
                <NumberedGrid cols={2} items={benefits.map((item) => ({ text: item }))} />
                <InlineCTA
                    title="Chcesz wdrożyć SALESmanago bez chaosu?"
                    text="Pokażemy, jak ułożyć automatyzacje, żeby firma zyskała uporządkowany proces i realny wzrost, a nie tylko kolejne reguły w systemie."
                    cta={{ label: 'Poproś o wdrożenie', href: '#formularz' }}
                />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
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
            </Section>
        </main>
    );
}
