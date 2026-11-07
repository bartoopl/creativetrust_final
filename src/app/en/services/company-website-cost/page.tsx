import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, NumberedGrid, PriceGrid, SplitLayout } from '@/components/LandingBlocks';
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/company-website-cost`;

export const metadata: Metadata = {
    title: 'Company website cost | How much does a business website cost',
    description:
        'How much does a company website cost? A landing page for searches such as company website cost, business website price and website quote. See realistic scopes.',
    alternates: pageAlternates('/uslugi/strona-firmowa-cena', 'en', SITE_URL),
    openGraph: {
        title: 'Company website cost | CreativeTrust',
        description:
            'Pricing a company website: what drives the cost, how to choose the scope and what should be part of the project.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Company website cost | CreativeTrust',
        description:
            'Learn the indicative scopes and the elements that affect the price of a company website.',
    },
};

const ranges = [
    {
        name: 'Simple company website',
        price: 'from PLN 7,500 net',
        text: 'Good when you need a credible online presence and a clear presentation of your offer.',
    },
    {
        name: 'Company website with CMS',
        price: 'from PLN 10,000 net',
        text: 'Better when the content is going to change and your team needs to manage it independently.',
    },
    {
        name: 'Sales website',
        price: 'individual quote',
        text: 'When the site has to collect leads, support campaigns and work as a sales tool.',
    },
];

const drivers = [
    'the number of subpages and section types',
    'whether the content has to be prepared from scratch',
    'CMS, forms, integrations and analytics',
    'the level of UX/UI design',
    'SEO and performance requirements',
    'the schedule and number of iterations',
];

const checklist = [
    'a clear information architecture',
    'sections that answer customers’ most common questions',
    'fast loading and good Core Web Vitals',
    'a form or another conversion path',
    'basic SEO and result measurement',
];

const faqs = [
    {
        question: 'What does the price of a company website depend on most?',
        answer: 'On the scope, content, CMS, integrations, the level of design and whether the site is meant to sell or only present the company.',
    },
    {
        question: 'Is this page a good SEO landing page?',
        answer: 'Yes, if the visitor is looking for a quote and wants to quickly understand the budget range and the factors that affect the cost.',
    },
    {
        question: 'Is the price from the form final?',
        answer: 'No. The form is used to diagnose the scope, and the quote depends on real needs and project decisions.',
    },
];

export default function CompanyWebsitePricingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Company website cost', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Company website cost',
        description:
            'A landing page for searches such as company website cost, business website price and website quote.',
        url: canonicalUrl,
        serviceType: 'Company website quote',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Company website"
                title="Company website cost: what a good business website really costs"
                description="This landing page is for people looking for a company website quote who want to understand what drives the cost, which scope makes sense and where it is worth paying more and where it is not."
                cta={{ label: 'Request a quote', href: '#formularz' }}
                ctaSecondary={{ label: 'See our website services', href: '/en/services/websites' }}
                right={
                    <HeroMedia
                        src="/images/seo/website-pricing-hero.png"
                        alt="Pricing a company website and the project scope"
                        label="What affects the price?"
                        items={drivers}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Indicative ranges"
                title="The price of a company website depends on what it has to achieve for the business, not on the number of subpages alone"
            >
                <PriceGrid items={ranges} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="A good company website should have" title="A scope matched to the company, not a project that is too small to start with">
                    <BulletColumns items={checklist} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Quoting process" title="Scope first, then budget. Not the other way round">
                <NumberedGrid
                    cols={4}
                    items={[
                        'Diagnosing your needs and goal',
                        'A proposed scope and architecture',
                        'A quote with options',
                        'An implementation plan and deadline',
                    ].map((item) => ({
                        title: item,
                        text: 'We organise the decisions so you know where budget makes a difference and where there is no need to burn it.',
                    }))}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Frequently asked questions about company website cost" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Company website quote"
                    formSubtitle="Describe your company, the purpose of the site and what should happen once a user lands on it. We will come back with a recommended scope and budget."
                    subjectPrefix="[EN] Strona firmowa cena"
                    serviceOptions={[
                        'company website',
                        'company website with a CMS',
                        'rebuilding an existing website',
                        'a new site built to sell',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 10,000',
                        'PLN 10,000 – 20,000',
                        'PLN 20,000 – 40,000',
                        'over PLN 40,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us how many subpages you need, whether the content is ready and whether the site should collect leads, sell or simply present the company well."
                />
            </Section>
        </main>
    );
}
