import type { Metadata } from 'next';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, HeroMedia, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { pageAlternates } from '@/lib/i18n';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/en/services/google-ads-landing-page`;

export const metadata: Metadata = {
    title: 'Google Ads landing page | A page for campaigns and ads',
    description:
        'Landing pages for Google Ads, Meta Ads and performance marketing. A page for your ads that lifts conversion and supports SEO. Designed around sales queries.',
    alternates: pageAlternates('/uslugi/landing-page-google-ads', 'en', SITE_URL),
    openGraph: {
        title: 'Google Ads landing page | CreativeTrust',
        description:
            'We build landing pages for paid campaigns, ads and lead generation. Fast, clear and built for conversion.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Google Ads landing page | CreativeTrust',
        description:
            'A page for Google Ads and performance campaigns. Designed for clicks, leads and results.',
    },
    robots: {
        index: false,
        follow: true,
    },
};

const signals = [
    'a high CPC demands higher conversion after the click',
    'paid campaign traffic needs a clear path to the CTA',
    'the homepage is not always the best place for a campaign',
    'every second of loading time affects campaign results',
    'the landing page should speak the same language as the ad',
];

const essentials = [
    {
        title: 'One promise',
        text: 'The landing page answers one query and leads to one specific action.',
    },
    {
        title: 'Fast loading',
        text: 'We optimise performance, because every extra second lowers campaign effectiveness.',
    },
    {
        title: 'Content matched to intent',
        text: 'We shape the copy to answer the question of the person who clicked the ad, rather than describe the company in general terms.',
    },
    {
        title: 'Conversion measurement',
        text: 'We connect analytics so you know which message and which CTA deliver results.',
    },
];

const useCases = [
    'a Google Ads campaign for a specific service',
    'a lead generation ad for B2B',
    'Meta Ads leading to a single offer',
    'testing new sales messages',
];

const process = [
    {
        title: 'Research and intent',
        text: 'We examine the keyword, the competition and the user’s goal. A landing page without this layer usually burns budget.',
    },
    {
        title: 'Wireframe and message',
        text: 'We structure the sections so that the ad and the page speak the same language.',
    },
    {
        title: 'Design and launch',
        text: 'We make the page light, fast and clear. For a campaign that matters more than flashy effects.',
    },
    {
        title: 'Testing and optimisation',
        text: 'After launch we measure user behaviour and improve the content, layout and CTA.',
    },
];

const faqs = [
    {
        question: 'Should a Google Ads landing page be a separate page?',
        answer: 'Yes, if the campaign has one offer and one conversion goal. A separate page usually matches the message better than the homepage.',
    },
    {
        question: 'How is it different from an ordinary service page?',
        answer: 'A landing page has a shorter path, fewer distractions and a stronger CTA. A service page is broader and less specialised.',
    },
    {
        question: 'Do you also help with the SEO of such a landing page?',
        answer: 'Yes, in a technical and content sense: intent, meta tags, headings, performance and internal linking. We do not do classic campaign SEO.',
    },
];

export default function GoogleAdsLandingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Google Ads landing page', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Google Ads landing page',
        description:
            'A page for Google Ads and performance marketing campaigns, designed around one offer and one conversion.',
        url: canonicalUrl,
        serviceType: 'Landing page for ads',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Performance landing page"
                title="A Google Ads landing page that turns clicks into enquiries"
                description="We design pages for paid ads that have one role: to increase conversion. We shape the copy, UX, performance and CTA around a specific offer, not a generic company brochure."
                cta={{ label: 'Order a landing page', href: '#formularz' }}
                ctaSecondary={{ label: 'Website services', href: '/en/services/websites' }}
                right={
                    <HeroMedia
                        src="/images/seo/google-ads-audit-hero.png"
                        alt="A landing page for Google Ads and advertising campaigns"
                        label="When do you need a landing page?"
                        items={signals}
                    />
                }
            />

            <Section
                border={false}
                eyebrow="What must a good page for ads have?"
                title="A Google Ads landing page works when it removes friction and does not distract"
            >
                <NumberedGrid cols={4} items={essentials} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Who it is for" title="One page per ad, one offer, one user action">
                    <BulletColumns items={useCases} />
                </SplitLayout>
            </Section>

            <Section eyebrow="Process" title="We design the landing page around the campaign, not the other way round">
                <NumberedGrid cols={4} items={process} />
                <InlineCTA
                    title="Have a campaign and need a better landing page?"
                    text="We will build a page for a specific keyword, ad and conversion. No copying the homepage."
                    cta={{ label: 'Request a landing page', href: '#formularz' }}
                />
            </Section>

            <Section tint eyebrow="FAQ" title="Frequently asked questions about landing pages for ads" maxWidth={1100}>
                <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="A landing page for Google Ads"
                    formSubtitle="Describe the service, the campaign and the conversion goal. We will prepare a landing page that matches the ad and does not distract the user."
                    subjectPrefix="[EN] Landing page Google Ads"
                    serviceOptions={[
                        'landing page for Google Ads',
                        'landing page for Meta Ads',
                        'a page for a performance campaign',
                        'testing a new offer / new message',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'up to PLN 5,000',
                        'PLN 5,000 – 10,000',
                        'PLN 10,000 – 20,000',
                        'over PLN 20,000',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="Tell us which service or offer is to be promoted, where the traffic will come from and what conversion should happen once someone lands on the page."
                />
            </Section>
        </main>
    );
}
