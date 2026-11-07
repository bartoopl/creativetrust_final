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
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/woocommerce-to-headless-migration`;

export const metadata: Metadata = {
    title: 'WooCommerce to headless migration | Next.js e-commerce',
    description:
        'Migrating WooCommerce to a headless architecture: a Next.js storefront, APIs, better performance, SEO and control over store UX.',
    alternates: pageAlternates('/uslugi/migracja-woocommerce-do-headless', 'en', SITE_URL),
    openGraph: {
        title: 'WooCommerce to headless migration | CreativeTrust',
        description:
            'Find out when it is worth moving a WooCommerce store to headless and how to plan the migration without chaos in sales.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'WooCommerce to headless migration | CreativeTrust',
        description:
            'A Next.js storefront for WooCommerce, better Core Web Vitals, APIs and a controlled migration plan.',
    },
};

const symptoms = [
    'the theme and plugins slow the store down as traffic grows',
    'every checkout or cart change is risky',
    'Core Web Vitals and mobile UX limit campaign results',
    'the store frontend is hard to connect to a CMS, PIM, ERP or automation',
    'the marketing team needs to test landing pages and content faster',
];

const migrationSteps = [
    {
        number: '01',
        title: 'Audit of your current WooCommerce',
        description:
            'We review the catalogue, checkout, plugins, data, SEO, tracking and the places where the monolith blocks growth.',
    },
    {
        number: '02',
        title: 'Target architecture',
        description:
            'We decide whether WooCommerce stays as the backend or whether Medusa, Saleor or Shopify Plus is the better fit.',
    },
    {
        number: '03',
        title: 'Next.js storefront',
        description:
            'We build a fast frontend with control over product lists, product pages, the cart, checkout and content.',
    },
    {
        number: '04',
        title: 'Phased migration',
        description:
            'We roll out without a sudden hit to sales: staging, tests, redirects, tracking and post-launch monitoring.',
    },
];

const outcomes = [
    'a faster frontend and better Core Web Vitals',
    'more freedom in UX design without theme limitations',
    'less risky changes to the presentation layer',
    'easier connection of the store to CMS, ERP, PIM and marketing automation',
    'a better foundation for SEO, paid campaigns and conversion experiments',
    'a clearer split of responsibilities between the commerce backend and the storefront',
];

const faqs = [
    {
        question: 'Can a WooCommerce to headless migration happen without losing SEO?',
        answer: 'Yes, provided that before launch we prepare a URL map, 301 redirects, canonicals, a sitemap, structured data and a post-launch monitoring plan.',
    },
    {
        question: 'Do we have to migrate the whole store at once?',
        answer: 'No. In many cases a phased rollout is safer, for example the storefront or checkout first and the remaining areas of the store afterwards.',
    },
    {
        question: 'When is headless not the best choice?',
        answer: 'When the store is simple and has no performance problems or complex integrations. In that case an audit may point to a cheaper optimisation of your current setup.',
    },
];

export default function WooCommerceHeadlessMigrationPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'WooCommerce to headless migration', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'WooCommerce to headless migration',
        description: 'Migrating WooCommerce to a headless architecture with a plan to preserve SEO, data and sales.',
        url: canonicalUrl,
        serviceType: 'E-commerce migration',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="WooCommerce → Headless"
                title="Migrating WooCommerce to a headless Next.js storefront"
                description="We separate the store frontend from the limits of the WordPress theme while keeping control over data, SEO and sales. This is the way forward for e-commerce that has outgrown a simple plugin-based store."
                cta={{ label: 'Discuss your store migration', href: '#formularz' }}
                ctaSecondary={{ label: 'See our e-commerce services', href: '/en/services/e-commerce' }}
                right={
                    <HeroMedia
                        src="/images/seo/headless-woocommerce-hero.png"
                        alt="Headless WooCommerce and online store architecture"
                        label="When does it make sense?"
                        items={symptoms}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Migration process"
                title="Headless starts not with code but with an architecture decision"
            >
                <NumberedGrid
                    cols={4}
                    items={migrationSteps.map((step) => ({ title: step.title, text: step.description }))}
                />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Business outcomes" title="A migration should improve sales, not just the technology stack">
                    <BulletColumns items={outcomes} />
                </SplitLayout>
            </Section>

            <Section>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col gap-5">
                        <SectionHeader title="Not every WooCommerce store should go headless" />
                        <p className="ct-body" style={{ fontSize: 16 }}>
                            If the store is small, has a simple catalogue and no traffic problems, a full migration
                            may be overkill. That is why we start with an audit and also recommend intermediate
                            options: optimising your current store, rebuilding the checkout or a gradual storefront.
                        </p>
                        <p className="ct-body" style={{ fontSize: 16 }}>
                            When the problem is scale, complex integrations and the cost of every UX change, headless
                            gives you more control over the frontend, performance and the growth of new channels.
                        </p>
                        <div className="pt-2">
                            <NotchedButton href="#formularz">Check whether headless makes sense</NotchedButton>
                        </div>
                    </div>
                    <div className="ct-panel" style={{ padding: '24px 28px 8px' }}>
                        <p className="ct-meta" style={{ margin: '0 0 12px' }}>Possible scenarios</p>
                        {[
                            {
                                title: 'WooCommerce as the backend',
                                text: 'Products and orders stay in WooCommerce, while Next.js takes over the frontend.',
                            },
                            {
                                title: 'Migration to a new engine',
                                text: 'At larger scale we consider Medusa, Saleor or Shopify Plus as the commerce foundation.',
                            },
                            {
                                title: 'Phased, checkout first',
                                text: 'We start with the most critical part of the purchase path before touching the catalogue.',
                            },
                        ].map((scenario, i) => (
                            <div key={scenario.title} className="flex gap-4" style={{ padding: '18px 0', borderTop: '1px solid var(--line)' }}>
                                <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)', paddingTop: 4 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <h3 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 500 }}>{scenario.title}</h3>
                                    <p className="ct-body">{scenario.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section tint>
                <SplitLayout eyebrow="SEO in a migration" title="A migration plan protects visibility only when it is part of the implementation.">
                    <div className="flex flex-col items-start gap-6">
                        <p className="ct-body" style={{ fontSize: 16 }}>Before changing technology we agree which URLs to keep, the redirect map, canonicals, the sitemap, structured data and measurement. After launch we check indexing, 404 errors and the key pages and queries.</p>
                        <Link href="/blog/migracja-sklepu-bez-utraty-seo" hrefLang="pl" className="ct-ghost" style={{ whiteSpace: 'normal' }}>
                            See the checklist for migrating a store without losing SEO (in Polish)
                        </Link>
                    </div>
                </SplitLayout>
            </Section>

            <Section eyebrow="FAQ" title="Questions about migrating WooCommerce to headless" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Let’s talk about your WooCommerce migration"
                    formSubtitle="Describe your current store, your sales scale and the problem. We will assess whether headless makes sense or whether optimisation or an intermediate step is the better choice."
                    subjectPrefix="[EN] Migracja WooCommerce do headless"
                    serviceOptions={[
                        'audit of the current WooCommerce',
                        'WooCommerce as the backend + a Next.js storefront',
                        'migration to Medusa / Saleor / Shopify Plus',
                        'checkout first / phased migration',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 25,000',
                        'PLN 25,000 – 50,000',
                        'PLN 50,000 – 100,000',
                        'over PLN 100,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us what the store runs on, how many products it has, which integrations are critical and what blocks growth the most today."
                />
            </Section>
        </main>
    );
}
