import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/landing-page-pod-reklamy`;

export const metadata: Metadata = {
    title: 'Landing page pod reklamy | Strona pod kampanie performance',
    description:
        'Landing page pod reklamy i kampanie performance. Strona pod Google Ads, Meta Ads i lead generation. Projekt pod konwersję, nie pod ogólną wizytówkę.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Landing page pod reklamy | CreativeTrust',
        description:
            'Projektujemy landing pages pod reklamy płatne, kampanie performance i konwersję.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Landing page pod reklamy | CreativeTrust',
        description:
            'Strona pod kampanie Google Ads, Meta Ads i lead generation.',
    },
    robots: {
        index: false,
        follow: true,
    },
};

const signals = [
    'kampania płatna potrzebuje strony z jedną ofertą',
    'ruch z reklam szybko odpada, jeśli komunikat się rozjeżdża',
    'landing page musi być szybki i prosty',
    'strona ma prowadzić do jednego CTA',
    'copy i reklama muszą mówić tym samym językiem',
];

const essentials = [
    'jedna obietnica i jedno CTA',
    'krótka ścieżka od wejścia do kontaktu',
    'copy dopasowane do reklamy',
    'szybkość ładowania i mobile-first',
    'pomiar konwersji i testy wariantów',
];

const useCases = [
    'kampania Google Ads na jedną usługę',
    'Meta Ads do pozyskiwania leadów',
    'promocja oferty sezonowej',
    'testowanie nowego komunikatu sprzedażowego',
];

const faqs = [
    {
        question: 'Czym landing page pod reklamy różni się od landing page Google Ads?',
        answer: 'Zakres jest szerszy, bo strona może obsługiwać różne kampanie performance, nie tylko jedną platformę reklamową.',
    },
    {
        question: 'Czy taki landing ma sens przy małym budżecie?',
        answer: 'Tak, jeśli kampania ma jedną ofertę i potrzebujesz maksymalnie krótkiej drogi do kontaktu.',
    },
    {
        question: 'Czy pomagacie dopasować treść do reklamy?',
        answer: 'Tak. Dopasowujemy headline, sekcje i CTA tak, aby ruch z reklam nie trafiał na komunikacyjny chaos.',
    },
];

export default function LandingPageAdsPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Landing page pod reklamy', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Landing page pod reklamy',
        description:
            'Strona pod kampanie performance i lead generation, projektowana pod jedną obietnicę i jedno CTA.',
        url: canonicalUrl,
        serviceType: 'Landing page performance',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Performance"
                title="Landing page pod reklamy, który zwiększa konwersję zamiast ją rozmywać"
                description="To strona pod kampanię płatną, nie ogólna podstrona usług. Układamy komunikat, szybkość i CTA tak, żeby ruch z reklam miał prostą drogę do zapytania."
                cta={{ label: 'Zleć landing page', href: '#formularz' }}
                ctaSecondary={{ label: 'Oferta stron WWW', href: '/uslugi/strony-www' }}
                right={
                    <HeroMedia
                        src="/images/seo/google-ads-audit-hero.png"
                        alt="Landing page pod reklamy i kampanie performance"
                        label="Kiedy warto?"
                        items={signals}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Must-have landing page"
                title="Landing pod reklamy powinien być prosty, szybki i bez tarcia"
            >
                <NumberedGrid cols={5} items={essentials.map((item) => ({ text: item }))} />
            </Section>

            <Section tint>
                <SplitLayout
                    eyebrow="Dla kogo"
                    title="Dla kampanii, które mają sprzedawać konkretną ofertę, a nie ogólny wizerunek"
                >
                    <BulletColumns items={useCases} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Co robimy" title="Projekt pod reklamę, od komunikatu po CTA">
                <NumberedGrid
                    cols={4}
                    items={[
                        'research i intencja użytkownika',
                        'copy i struktura sekcji',
                        'projekt i szybkie wdrożenie',
                        'pomiar i iteracja',
                    ].map((item) => ({
                        title: item,
                        text: 'Budujemy stronę tak, aby ruch z reklamy miał jedną drogę i jedną decyzję do podjęcia.',
                    }))}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Najczęstsze pytania o strony pod reklamy" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Landing page pod reklamy"
                    formSubtitle="Opisz kampanię, ofertę i cel konwersji. Zrobimy stronę pod reklamy, która nie rozprasza i nie miesza komunikatu."
                    subjectPrefix="Landing page pod reklamy"
                    serviceOptions={[
                        'landing page pod Google Ads',
                        'landing page pod Meta Ads',
                        'strona pod lead generation',
                        'test nowej kampanii',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'do 5 000 zł',
                        '5 000 - 10 000 zł',
                        '10 000 - 20 000 zł',
                        'powyżej 20 000 zł',
                        'nie wiem / potrzebuję rekomendacji',
                    ]}
                    messagePlaceholder="Napisz, jaka oferta ma być promowana, skąd będzie ruch i jaka konwersja ma się wydarzyć po wejściu na stronę."
                />
            </Section>
        </main>
    );
}
