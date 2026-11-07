import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/ad-landing-page`;

export const metadata: Metadata = {
    title: 'Landing page for ads | A page for performance campaigns',
    description:
        'Landing pages for ads and performance campaigns. A page for Google Ads, Meta Ads and lead generation. Designed for conversion, not as a generic company brochure.',
    alternates: pageAlternates('/uslugi/landing-page-pod-reklamy', 'en', SITE_URL),
    openGraph: {
        title: 'Landing page for ads | CreativeTrust',
        description:
            'We design landing pages for paid ads, performance campaigns and conversion.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Landing page for ads | CreativeTrust',
        description:
            'A page for Google Ads, Meta Ads and lead generation campaigns.',
    },
    robots: {
        index: false,
        follow: true,
    },
};

const signals = [
    'a paid campaign needs a page with a single offer',
    'ad traffic drops off quickly if the message drifts',
    'a landing page must be fast and simple',
    'the page should lead to a single CTA',
    'the copy and the ad must speak the same language',
];

const essentials = [
    'one promise and one CTA',
    'a short path from landing to contact',
    'copy matched to the ad',
    'loading speed and mobile-first design',
    'conversion measurement and variant testing',
];

const useCases = [
    'a Google Ads campaign for a single service',
    'Meta Ads for lead acquisition',
    'promoting a seasonal offer',
    'testing a new sales message',
];

const faqs = [
    {
        question: 'How is a landing page for ads different from a Google Ads landing page?',
        answer: 'The scope is broader, because the page can serve various performance campaigns, not just one ad platform.',
    },
    {
        question: 'Does such a landing page make sense with a small budget?',
        answer: 'Yes, if the campaign has one offer and you need the shortest possible route to contact.',
    },
    {
        question: 'Do you help match the content to the ad?',
        answer: 'Yes. We match the headline, sections and CTA so that ad traffic does not land in a mess of mixed messages.',
    },
];

export default function LandingPageAdsPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Landing page for ads', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Landing page for ads',
        description:
            'A page for performance and lead generation campaigns, designed around one promise and one CTA.',
        url: canonicalUrl,
        serviceType: 'Performance landing page',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Performance"
                title="A landing page for ads that lifts conversion instead of diluting it"
                description="This is a page for a paid campaign, not a generic services subpage. We shape the message, speed and CTA so that ad traffic has a simple route to an enquiry."
                cta={{ label: 'Order a landing page', href: '#formularz' }}
                ctaSecondary={{ label: 'Website services', href: '/en/services/websites' }}
                right={
                    <HeroMedia
                        src="/images/seo/google-ads-audit-hero.png"
                        alt="A landing page for ads and performance campaigns"
                        label="When is it worth it?"
                        items={signals}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="Landing page must-haves"
                title="A landing page for ads should be simple, fast and frictionless"
            >
                <NumberedGrid cols={5} items={essentials.map((item) => ({ text: item }))} />
            </Section>

            <Section tint>
                <SplitLayout
                    eyebrow="Who it is for"
                    title="For campaigns that are meant to sell a specific offer, not a general image"
                >
                    <BulletColumns items={useCases} />
                </SplitLayout>
            </Section>

            <Section eyebrow="What we do" title="A design for the ad, from message to CTA">
                <NumberedGrid
                    cols={4}
                    items={[
                        'research and user intent',
                        'copy and section structure',
                        'design and fast launch',
                        'measurement and iteration',
                    ].map((item) => ({
                        title: item,
                        text: 'We build the page so that ad traffic has one path and one decision to make.',
                    }))}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Frequently asked questions about pages for ads" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="A landing page for ads"
                    formSubtitle="Describe the campaign, the offer and the conversion goal. We will build a page for your ads that does not distract and does not muddle the message."
                    subjectPrefix="[EN] Landing page pod reklamy"
                    serviceOptions={[
                        'landing page for Google Ads',
                        'landing page for Meta Ads',
                        'a page for lead generation',
                        'testing a new campaign',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 5,000',
                        'PLN 5,000 – 10,000',
                        'PLN 10,000 – 20,000',
                        'over PLN 20,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us which offer is to be promoted, where the traffic will come from and what conversion should happen once someone lands on the page."
                />
            </Section>
        </main>
    );
}
