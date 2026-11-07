import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/salesmanago-implementation`;

export const metadata: Metadata = {
    title: 'SALESmanago implementation | Marketing automation for companies',
    description:
        'SALESmanago implementation, automation, segmentation and lead nurturing. A landing page for searches such as SALESmanago implementation, SALESmanago partner and marketing automation.',
    alternates: pageAlternates('/uslugi/wdrozenie-salesmanago', 'en', SITE_URL),
    openGraph: {
        title: 'SALESmanago implementation | CreativeTrust',
        description:
            'We design and implement SALESmanago: CRM integrations, scenarios and campaign personalisation.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SALESmanago implementation | CreativeTrust',
        description:
            'Lead nurturing, segmentation and data-driven automation. SALESmanago implemented without chaos.',
    },
};

const symptoms = [
    'leads land in the CRM, but there is no process behind them',
    'the team sends too many manual follow-ups',
    'email campaigns are not segmented or personalised',
    'the website, ads and CRM are not consistent with each other',
    'a marketing automation system is in place, but it does not work for sales',
];

const deliverables = [
    {
        title: 'Audit and architecture',
        text: 'We review the data, lead sources, integrations and the place where automation will return the most.',
    },
    {
        title: 'SALESmanago configuration',
        text: 'We set up the account, tracking, segments, events and basic scoring rules.',
    },
    {
        title: 'Scenarios and funnels',
        text: 'We build welcome flows, lead nurturing, contact recovery and campaigns that run on their own.',
    },
    {
        title: 'Measurement and growth',
        text: 'We connect reporting, tests and optimisation, so automation is not a one-off implementation.',
    },
];

const useCases = [
    'B2B with a long sales cycle',
    'e-commerce with abandoned carts and cross-sell',
    'service companies that want to automate follow-up',
    'teams that need segmentation and personalisation',
];

const benefits = [
    'less manual work for sales and marketing',
    'better lead closing thanks to sequences and scoring',
    'more relevant communication thanks to segmentation',
    'higher data quality between the website, CRM and campaigns',
];

export default function SalesmanagoImplementationPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'SALESmanago implementation', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <PageHero
                eyebrow="Marketing Automation"
                title="A SALESmanago implementation that actually works for sales"
                description="We design the SALESmanago implementation around your company’s real processes: integrations, segmentation, scenarios and reporting. No random automations and no guesswork."
                cta={{ label: 'Discuss a SALESmanago implementation', href: '#formularz' }}
                ctaSecondary={{ label: 'See our automation services', href: '/en/services/marketing-automation' }}
                right={
                    <HeroMedia
                        src="/sales-manago-partnership.jpg"
                        alt="SALESmanago implementation and marketing automation"
                        label="When does it make sense?"
                        items={symptoms}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="What we implement"
                title="A SALESmanago implementation starts with the process, not with clicking through the panel"
            >
                <NumberedGrid cols={4} items={deliverables.map((item) => ({ title: item.title, text: item.text }))} />
            </Section>

            <Section tint>
                <SplitLayout
                    eyebrow="Who it is for"
                    title="This page is for companies that want to automate sales with a SALESmanago implementation"
                >
                    <BulletColumns items={useCases} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Business outcome" title="A good implementation does not look flashy. It delivers results">
                <NumberedGrid cols={2} items={benefits.map((item) => ({ text: item }))} />
                <InlineCTA
                    title="Want to implement SALESmanago without chaos?"
                    text="We will show you how to arrange the automations so your company gains an orderly process and real growth, not just more rules in the system."
                    cta={{ label: 'Request an implementation', href: '#formularz' }}
                />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="SALESmanago implementation"
                    formSubtitle="Describe your current CRM, lead sources and what should work automatically. We will come back with a recommended implementation scope."
                    subjectPrefix="[EN] Wdrożenie SALESmanago"
                    serviceOptions={[
                        'audit and automation architecture',
                        'SALESmanago implementation from scratch',
                        'CRM integrations and tracking',
                        'lead nurturing scenarios',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 10,000',
                        'PLN 10,000 – 25,000',
                        'PLN 25,000 – 50,000',
                        'over PLN 50,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us what lead sources you have, which CRM, what is manual today and which automations you want to launch first."
                />
            </Section>
        </main>
    );
}
