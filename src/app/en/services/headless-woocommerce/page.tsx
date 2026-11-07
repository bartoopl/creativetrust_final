import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { HeroMedia, NumberedGrid } from '@/components/LandingBlocks';
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/headless-woocommerce`;

export const metadata: Metadata = {
    title: 'Headless WooCommerce | A store without WordPress limits',
    description:
        'Headless WooCommerce for stores that want a faster frontend, better UX and more control over growth. A long-tail SEO landing page for migrations.',
    alternates: pageAlternates('/uslugi/headless-woocommerce', 'en', SITE_URL),
    openGraph: {
        title: 'Headless WooCommerce | CreativeTrust',
        description:
            'We build headless WooCommerce with a Next.js storefront, better performance and full control over UX.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Headless WooCommerce | CreativeTrust',
        description:
            'A Next.js storefront, better Core Web Vitals and control over how your store evolves.',
    },
};

const signals = [
    'WooCommerce slows down at larger scale',
    'every theme change blocks development',
    'you need a faster frontend and better UX',
    'the store has to grow together with integrations and automation',
    'SEO and performance matter more than a theme built from plugins',
];

const benefits = [
    'a faster frontend and better Core Web Vitals',
    'more freedom to develop the checkout and product pages',
    'easier connection of the store to CMS, ERP and CRM',
    'fewer limits when testing and optimising',
    'a better foundation for SEO and paid campaigns',
];

const approaches = [
    {
        title: 'WooCommerce as the backend',
        text: 'Products and orders stay in WooCommerce, while Next.js takes over the frontend.',
    },
    {
        title: 'Migration to a new engine',
        text: 'At larger scale we consider Medusa, Saleor or Shopify Plus as the commerce foundation.',
    },
    {
        title: 'A phased change',
        text: 'We change the storefront first and the rest of the architecture afterwards, so sales are never put at risk.',
    },
];

const faqs = [
    {
        question: 'Does headless WooCommerce mean migrating the whole store?',
        answer: 'Not always. Sometimes we change only the frontend first and the backend stays in WooCommerce.',
    },
    {
        question: 'When does headless make the most sense?',
        answer: 'When the theme and plugins limit growth, performance or the testing of new shopping experiences.',
    },
    {
        question: 'Does headless improve a store’s SEO?',
        answer: 'It can strengthen the technical foundations of SEO thanks to speed and a better architecture, but it also needs sensible content and internal linking.',
    },
];

export default function HeadlessWooCommercePage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Headless WooCommerce', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Headless WooCommerce',
        description:
            'Headless WooCommerce with a Next.js storefront for stores that need better performance and more UX freedom.',
        url: canonicalUrl,
        serviceType: 'Headless e-commerce',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="E-commerce"
                title="Headless WooCommerce for a store that needs more freedom"
                description="This landing page is for searches around headless WooCommerce, store migration and control over the frontend. If your theme is blocking growth, this direction makes sense."
                cta={{ label: 'Discuss headless WooCommerce', href: '#formularz' }}
                ctaSecondary={{ label: 'See our e-commerce services', href: '/en/services/e-commerce' }}
                right={
                    <HeroMedia
                        src="/images/seo/headless-woocommerce-hero.png"
                        alt="Headless WooCommerce and a new storefront"
                        label="When does it make sense?"
                        items={signals}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="What you gain"
                title="Headless WooCommerce gives you more freedom where a classic theme already gets in the way"
            >
                <NumberedGrid cols={5} items={benefits.map((item) => ({ text: item }))} />
            </Section>

            <Section tint eyebrow="Implementation models" title="Not every store has to migrate everything at once">
                <NumberedGrid cols={3} items={approaches} />
            </Section>

            <Section eyebrow="Process" title="The architecture decision first, then the implementation">
                <NumberedGrid
                    cols={4}
                    items={[
                        'a WooCommerce and pain-point audit',
                        'a decision on the target architecture',
                        'building the Next.js storefront',
                        'phased migration and monitoring',
                    ].map((item) => ({
                        title: item,
                        text: 'We run the project so that speed, UX and room to grow improve without disrupting sales.',
                    }))}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Frequently asked questions about headless WooCommerce" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Headless WooCommerce"
                    formSubtitle="Describe your store, your traffic and the problem that is blocking growth. We will come back with a recommendation: headless, a phased approach or optimisation."
                    subjectPrefix="[EN] Headless WooCommerce"
                    serviceOptions={[
                        'WooCommerce store audit',
                        'headless WooCommerce with Next.js',
                        'migrating the store to a new architecture',
                        'checkout rebuild',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 25,000',
                        'PLN 25,000 – 50,000',
                        'PLN 50,000 – 100,000',
                        'over PLN 100,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us what store you have, what works badly, how many products, which integrations and what blocks growth the most."
                />
            </Section>
        </main>
    );
}
