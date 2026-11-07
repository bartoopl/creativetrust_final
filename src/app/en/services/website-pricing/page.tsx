import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, PriceGrid, SplitLayout } from '@/components/LandingBlocks';
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/website-pricing`;

export const metadata: Metadata = {
    title: 'Website cost | Web design pricing',
    description:
        'How much does a company website cost? See indicative ranges: landing page, company website, CMS-based site, SEO and integrations.',
    alternates: pageAlternates('/uslugi/tworzenie-stron-www-cennik', 'en', SITE_URL),
    openGraph: {
        title: 'Website cost | CreativeTrust',
        description:
            'Indicative website pricing: from a landing page to an extensive company site with a CMS, SEO and integrations.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Website cost | CreativeTrust',
        description:
            'See what drives the cost of a website and which scope to choose for your company.',
    },
};

const packages = [
    {
        name: 'Landing page',
        price: 'from PLN 3,500 net',
        description: 'A single page for a campaign, a service or a specific offer.',
        features: ['a conversion-focused structure', 'copy for the sales sections', 'a contact form', 'basic SEO'],
    },
    {
        name: 'Company website',
        price: 'from PLN 7,500 net',
        description: 'Several subpages for a company that needs a credible online presence.',
        features: ['information architecture', 'UI design', 'a CMS for editing content', 'technical SEO and analytics'],
    },
    {
        name: 'Extended website',
        price: 'individual quote',
        description: 'A larger site with a blog, a knowledge base, integrations or custom logic.',
        features: ['a workshop and discovery', 'API/CRM integrations', 'custom components', 'an SEO growth plan'],
    },
];

const costDrivers = [
    'the number of page types and sections',
    'whether the content is ready or has to be created from scratch',
    'the scope of the CMS and editorial permissions',
    'integrations: CRM, newsletter, analytics, payments, automation',
    'the level of UI design and animation',
    'SEO, performance and migration requirements for an existing site',
];

const comparisons = [
    {
        label: 'A cheap template site',
        text: 'Fine as a quick brochure, but usually harder to extend and to stand out with in a competitive industry.',
    },
    {
        label: 'A site designed for your company',
        text: 'Better when the site has to work as part of your sales: collecting leads, explaining your offer and supporting campaigns.',
    },
    {
        label: 'A site as a content platform',
        text: 'The best direction when you plan SEO, a blog, a knowledge base, multiple services or further scaling of your marketing.',
    },
];

const faqs = [
    {
        question: 'How much does a website for a company cost?',
        answer: 'It depends on the scope. A simple site starts at a few thousand zloty, while larger sites with a CMS and integrations are priced individually.',
    },
    {
        question: 'Does the price list mean a fixed price?',
        answer: 'No. It is an indicative starting point that helps match the scope to your business goal and budget.',
    },
    {
        question: 'Does such a landing page help with SEO?',
        answer: 'Yes, if it answers a specific search intent, has a good structure, loads quickly and leads to contact.',
    },
];

export default function WebsitePricingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Website pricing', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Website pricing',
        description:
            'Indicative website pricing: from a landing page to an extensive company site with a CMS, SEO and integrations.',
        url: canonicalUrl,
        serviceType: 'Website price list',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Website pricing"
                title="How much does a website for a company cost?"
                description="The price of a website depends on the scope, content, CMS, integrations and business goal. Below we show realistic project scopes that are meant to sell, not just look like a brochure."
                cta={{ label: 'Request a website quote', href: '#formularz' }}
                ctaSecondary={{ label: 'See our website services', href: '/en/services/websites' }}
                right={
                    <HeroMedia
                        src="/images/seo/website-pricing-hero.png"
                        alt="Designing a website and planning the scope of a quote"
                        label="The most important rule"
                    >
                        <div style={{ borderTop: '1px solid var(--line)', padding: '16px 0 14px' }}>
                            <p style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: 1.25 }}>
                                The cheapest website is rarely the cheapest decision.
                            </p>
                            <p className="ct-body" style={{ fontSize: 15 }}>
                                If a site does not load quickly, has no good content and does not measure
                                conversion, it costs you twice: first at launch, then in burnt campaign
                                budgets and lost enquiries.
                            </p>
                        </div>
                    </HeroMedia>
                }
            />

            <Section
                border={false}
                eyebrow="Indicative ranges"
                title="We treat the price list as a starting point for a conversation"
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
                <SplitLayout eyebrow="What does the price depend on?" title="What matters most is not the number of pixels but the scope of decisions">
                    <BulletColumns items={costDrivers} />
                </SplitLayout>
            </Section>

            <Section>
                <NumberedGrid cols={3} items={comparisons.map((item) => ({ title: item.label, text: item.text }))} />
                <InlineCTA
                    title="Want a real quote?"
                    text="Send a short description of your company, the purpose of the site and what users should do once they land on it. We will come back with a recommended scope, not just a figure."
                    cta={{ label: 'Get a website quote', href: '#formularz' }}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Frequently asked questions about website pricing" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Get a website quote"
                    formSubtitle="Tell us the type of site, its purpose and scope. We will reply with which option makes sense and what the cost will depend on."
                    subjectPrefix="[EN] Wycena strony WWW"
                    serviceOptions={[
                        'landing page',
                        'company website',
                        'extended site with a CMS',
                        'rebuilding an existing website',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 5,000',
                        'PLN 5,000 – 10,000',
                        'PLN 10,000 – 25,000',
                        'over PLN 25,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us what your company does, how many subpages you expect and what the site should do: collect leads, sell, educate or support campaigns?"
                />
            </Section>
        </main>
    );
}
