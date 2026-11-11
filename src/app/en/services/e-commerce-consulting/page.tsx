import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const canonicalUrl = `${SITE_URL}/en/services/e-commerce-consulting`;

/** The Diagnosis fee is quoted on the intro call, never published (see webmcp.test.mjs). */
const DIAGNOSIS_NAME = 'Bottleneck and eCommerce Architecture Diagnosis';

export const metadata: Metadata = {
    title: 'E-commerce consulting | Sales, margin and store architecture',
    description:
        'E-commerce consulting for stores that are growing faster than their processes. We start with a paid Bottleneck and eCommerce Architecture Diagnosis: 5–7 working days, a fixed fee known upfront, deducted from any ongoing collaboration.',
    alternates: pageAlternates('/uslugi/audyt-e-commerce', 'en', SITE_URL),
    openGraph: {
        title: 'E-commerce consulting | CreativeTrust',
        description:
            'Building sales, managing margin and data architecture in e-commerce. First step: the Bottleneck Diagnosis in 5–7 days.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'E-commerce consulting | CreativeTrust',
        description:
            'Know-how from large e-commerce businesses: sales, margin, dashboards and architecture. We start with a Diagnosis, not a retainer signed blind.',
    },
};

const heroFacts = [
    { label: 'First step', value: 'Bottleneck Diagnosis' },
    { label: 'Pricing', value: 'fixed fee, known upfront' },
    { label: 'Turnaround', value: '5–7 working days' },
    { label: 'Your time', value: '2 hours of interviews' },
];

const expertise = [
    {
        title: 'Building sales',
        text: 'Funnel, offer, channels and purchase path. We know which levers genuinely raise a store\'s revenue and which only generate traffic.',
    },
    {
        title: 'Managing margin',
        text: 'Margin at product, category and channel level, calculated continuously — not in a spreadsheet once a month.',
    },
    {
        title: 'Data and IT architecture',
        text: 'Platform, integrations, ERP and analytics arranged so the store can grow without adding people to do manual work.',
    },
    {
        title: 'Operations and team time',
        text: 'Automations, operational dashboards and safe procedures for rolling out changes, even at peak season.',
    },
];

const symptoms = [
    'you report margin manually, in spreadsheets, with a delay',
    'your e-commerce team loses hours every week on repetitive work',
    'there is no single operational dashboard, everyone looks at different numbers',
    'you are considering a platform change as a cure for falling margin',
    'every change rolled out in the store is a risk to sales',
    'sales are growing faster than your infrastructure and processes',
];

const deliverables = [
    {
        title: 'Map of lost time',
        text: 'A list of the places where your e-commerce team loses working hours to manual work: missing automation, manual margin reporting, copying data between systems.',
    },
    {
        title: 'Technical debt audit',
        text: 'Bottlenecks in infrastructure, integrations and analytics that slow the store\'s growth and lower conversion.',
    },
    {
        title: 'Remediation roadmap',
        text: 'A 2–3 page document: critical areas ranked by their impact on profit and team time, with a quote for fixing them as part of ongoing collaboration.',
    },
];

const diagnosisFacts = [
    { label: 'Pricing', value: 'fixed fee, deducted from the retainer' },
    { label: 'Turnaround', value: '5–7 working days' },
    { label: 'Team involvement', value: '2 hours of interviews' },
    { label: 'Access', value: 'read-only access to analytics and back office for 3 days' },
];

const steps = [
    {
        title: 'Introductory call',
        text: '15 minutes with our lead architect. We check whether the Diagnosis makes business sense in your case. No obligation.',
    },
    {
        title: 'Diagnosis',
        text: 'Interviews, data and back-office analysis, a report and a roadmap within 5–7 working days. For a fixed fee known upfront.',
    },
    {
        title: 'Ongoing collaboration',
        text: 'We fix the identified issues and develop the store on a monthly retainer. We deduct the cost of the Diagnosis in the first month.',
    },
];

const faqs = [
    {
        question: 'How does e-commerce consulting differ from commissioning a software house?',
        answer:
            'We start from the business outcome, not a list of features. We look at sales, margin and team working time, and choose the technology only once we know what needs to improve. The same people advise and implement.',
    },
    {
        question: 'Why is the Diagnosis paid?',
        answer:
            `It is concrete analytical work with a concrete result: a map of lost time, a technical debt audit and a roadmap. We agree the fee upfront on the introductory call — it usually fits within an e-commerce director\'s operating budget and does not need board approval.`,
    },
    {
        question: 'What happens to the cost of the Diagnosis if we decide to work together?',
        answer:
            'We deduct it in the first month of ongoing collaboration. If you decide to implement the recommendations yourselves, the roadmap stays with you and you can use it without us.',
    },
    {
        question: 'How much of our team\'s time will this take?',
        answer:
            'About 2 hours of interviews, plus granting read-only access to your analytics and store back office for 3 days. We do the rest of the work on our side.',
    },
    {
        question: 'Which stores is this service for?',
        answer:
            'For brands that already sell at scale and feel that their processes and infrastructure are not keeping up with growth — most often in beauty, home and garden, and retail.',
    },
    {
        question: 'Do we have to change our store platform?',
        answer:
            'Usually not. Changing platform alone rarely rescues margin; good data architecture, integrations and dashboards do that more often. If a migration makes sense, the Diagnosis will show it.',
    },
];

export default function EcommerceConsultingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'E-commerce consulting', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'E-commerce consulting',
        description:
            `E-commerce consulting: building sales, managing margin, data architecture and store operations. First step: ${DIAGNOSIS_NAME} (5–7 working days).`,
        url: canonicalUrl,
        serviceType: 'E-commerce consulting',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="E-commerce consulting"
                title={<>E-commerce sales and margin <span style={{ color: 'var(--accent)' }}>under control.</span></>}
                description="We know how to build sales and manage margin because we spent years working in large e-commerce businesses. We start with a paid Diagnosis: within a week we show where your store is losing money and team time — before we propose ongoing collaboration."
                cta={{ label: 'Order the Diagnosis', href: '#formularz' }}
                ctaSecondary={{ label: 'What the Diagnosis includes', href: '#diagnoza' }}
                right={
                    <div className="ct-grid-lines grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {heroFacts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                }
            />

            <Section
                border={false}
                eyebrow="What we know"
                title="We advise from the perspective of profit, loss and managers' working time"
            >
                <NumberedGrid cols={4} items={expertise} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="When to talk to us" title="The store is growing, and the team spends more and more time firefighting">
                    <BulletColumns items={symptoms} />
                </SplitLayout>
            </Section>

            <Section
                id="diagnoza"
                eyebrow="First step"
                title={DIAGNOSIS_NAME}
                description="Instead of selling an ongoing service blind, we prove our value first. The Diagnosis maps the problems that we then solve as part of ongoing collaboration — or that you solve yourselves with our roadmap."
            >
                <div className="flex flex-col gap-8">
                    <NumberedGrid cols={3} items={deliverables} />
                    <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {diagnosisFacts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section tint eyebrow="How we work together" title="Low risk at the start, a concrete plan for what comes next">
                <NumberedGrid cols={3} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="We deduct the cost of the Diagnosis in the first month of collaboration"
                        text="The roadmap ends with a concrete proposal: which issues we fix, which dashboards we implement and what it costs per month on an ongoing retainer."
                        cta={{ label: 'Book a 15-minute call', href: '#formularz' }}
                    />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Questions about e-commerce consulting and the Diagnosis" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Order the Diagnosis or an introductory call"
                    formSubtitle="Describe your store, your sales scale and what is slowing your team down the most today. We will get in touch to arrange a 15-minute call with our lead architect."
                    subjectPrefix="[EN] Konsulting e-commerce"
                    serviceOptions={[
                        DIAGNOSIS_NAME,
                        'introductory call (15 min)',
                        'ongoing consulting and implementation',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'Diagnosis only to start',
                        'up to PLN 10,000 per month',
                        'PLN 10,000 – 20,000 per month',
                        'over PLN 20,000 per month',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="What platform does the store run on, what is your approximate turnover, what do you do manually today and where do you see the biggest bottleneck?"
                />
            </Section>
        </main>
    );
}
