import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { EXPERIENCE_SENTENCE_EN, MANAGEMENT_HREF_EN, experienceEn } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const canonicalUrl = `${SITE_URL}/en/services/e-commerce-audit`;

/** The audit fee is quoted on the intro call, never published (see webmcp.test.mjs). */
const AUDIT_NAME = 'E-commerce audit';

export const metadata: Metadata = {
    title: 'E-commerce audit | Sales, margin and store technology',
    description:
        'An e-commerce audit for stores that are growing faster than their processes. In 5–7 working days we show where your store loses sales, margin and team time. A fixed fee known upfront, deducted from any ongoing collaboration.',
    alternates: pageAlternates('/uslugi/audyt-e-commerce', 'en', SITE_URL),
    openGraph: {
        title: 'E-commerce audit | CreativeTrust',
        description:
            'Sales, margin, technology and team workload. A report and roadmap in 5–7 working days, for a fixed fee.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'E-commerce audit | CreativeTrust',
        description:
            'An audit from the perspective of e-commerce management: sales, margin, dashboards and architecture. A report and roadmap in 5–7 working days.',
    },
};

const heroFacts = [
    { label: 'Outcome', value: 'a report and a prioritised roadmap' },
    { label: 'Pricing', value: 'fixed fee, known upfront' },
    { label: 'Turnaround', value: '5–7 working days' },
    { label: 'Your time', value: '2 hours of interviews' },
];

const areas = [
    {
        title: 'Sales and offer',
        text: 'Funnel, offer, channels and purchase path. We point to the levers that genuinely raise the store\'s revenue, not only the ones that generate traffic.',
    },
    {
        title: 'Margin',
        text: 'Margin at product, category and channel level. We check whether it is calculated continuously or in a spreadsheet once a month.',
    },
    {
        title: 'Technology and data',
        text: 'Platform, integrations, ERP and analytics. We look for the technical debt that slows the store down and lowers conversion.',
    },
    {
        title: 'Operations and team time',
        text: 'Manual work, reporting and the process for releasing changes. We count how many working hours go on what could be automated.',
    },
];

const symptoms = [
    'sales are growing, while margin stays flat or falls',
    'you report margin manually, in spreadsheets, with a delay',
    'the e-commerce team loses hours every week on repetitive work',
    'there is no single operational dashboard, and everyone looks at different numbers',
    'you are considering a platform change as the cure for your results',
    'every change released to the store is a risk to sales',
];

const deliverables = [
    {
        title: 'A map of lost time',
        text: 'A list of the places where the e-commerce team loses working hours to manual work: missing automation, manual margin reporting, copying data between systems.',
    },
    {
        title: 'A technical debt audit',
        text: 'The bottlenecks in infrastructure, integrations and analytics that slow the store down and lower conversion.',
    },
    {
        title: 'A remediation roadmap',
        text: 'A 2–3 page document: the critical areas in order of impact on profit and team time, with a quote for fixing them in an ongoing collaboration.',
    },
];

const auditFacts = [
    { label: 'Pricing', value: 'fixed fee, deducted from the retainer' },
    { label: 'Turnaround', value: '5–7 working days' },
    { label: 'Team involvement', value: '2 hours of interviews' },
    { label: 'Access', value: 'read-only to analytics and back office for 3 days' },
];

const steps = [
    {
        title: 'Introductory call',
        text: '15 minutes with our lead architect. We check whether an audit makes business sense in your case. No obligation.',
    },
    {
        title: 'Audit',
        text: 'Interviews, analysis of your data and back office, a report and roadmap in 5–7 working days. For a fixed fee known upfront.',
    },
    {
        title: 'Management and implementation',
        text: 'We deliver the roadmap and run your e-commerce from outside on a monthly retainer. We deduct the cost of the audit in the first month.',
    },
];

const faqs = [
    {
        question: 'How is this audit different from a UX or SEO audit?',
        answer:
            'We look at the store from a management perspective: sales, margin and the team\'s working time. UX, SEO and technology are a means to a result, not a separate list of remarks. You get priorities ranked by their impact on profit.',
    },
    {
        question: 'Why is the audit paid?',
        answer:
            'It is concrete analytical work with a concrete result: a map of lost time, a technical debt audit and a roadmap. We agree the fee upfront on the introductory call. It usually fits within an e-commerce director\'s operating budget and does not need board approval.',
    },
    {
        question: 'What happens to the cost of the audit if we decide to work together?',
        answer:
            'We deduct it in the first month of the ongoing collaboration. If you decide to implement the recommendations yourselves, the roadmap stays with you and you can use it without us.',
    },
    {
        question: 'How much of our team\'s time will it take?',
        answer:
            'About 2 hours of interviews and read-only access to your analytics and store back office for 3 days. We do the rest of the work on our side.',
    },
    {
        question: 'Which stores is the e-commerce audit for?',
        answer:
            'For brands that already sell at scale and feel their processes and infrastructure are not keeping up with growth, most often in fashion, beauty, home and garden, and retail.',
    },
    {
        question: 'Do we have to change our store platform after the audit?',
        answer:
            'Usually not. Changing platform alone rarely rescues margin; good data architecture, integrations and dashboards do that more often. If a migration makes sense, the audit will show it.',
    },
];

export default function EcommerceAuditPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: AUDIT_NAME, url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: AUDIT_NAME,
        description:
            'E-commerce audit: sales, margin, technology and data, and store operations. A report and roadmap in 5–7 working days, for a fixed fee agreed upfront.',
        url: canonicalUrl,
        serviceType: 'E-commerce audit',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="E-commerce audit"
                title={<>See where your store loses sales, margin and <span style={{ color: 'var(--accent)' }}>team time.</span></>}
                description="We audit e-commerce from a management perspective, not from a single specialism. In 5–7 working days you get a report and a roadmap: what to fix first, what it will deliver and what it costs."
                cta={{ label: 'Order the audit', href: '#form' }}
                ctaSecondary={{ label: 'What the audit covers', href: '#scope' }}
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
                eyebrow="Where this comes from"
                title="We audit with experience in e-commerce management"
                description={EXPERIENCE_SENTENCE_EN}
            >
                <NumberedGrid cols={3} numbered={false} items={experienceEn.map((item) => ({ title: item.brand, text: item.text }))} />
            </Section>

            <Section
                id="scope"
                tint
                eyebrow="What we check"
                title="Four areas that decide a store's profit"
            >
                <NumberedGrid cols={4} items={areas} />
            </Section>

            <Section>
                <SplitLayout eyebrow="When to order an audit" title="The store is growing, and the team spends more and more time firefighting">
                    <BulletColumns items={symptoms} />
                </SplitLayout>
            </Section>

            <Section
                id="outcome"
                tint
                eyebrow="What you get"
                title="Three documents you can start working with straight away"
                description="Instead of selling an ongoing service blind, we prove our value first. The audit maps the problems that we then solve as part of an ongoing collaboration, or that you solve yourselves with our roadmap."
            >
                <div className="flex flex-col gap-8">
                    <NumberedGrid cols={3} items={deliverables} />
                    <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {auditFacts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section eyebrow="How we work together" title="Low risk at the start, a concrete plan for what comes next">
                <NumberedGrid cols={3} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="After the audit, we can run your e-commerce from outside"
                        text="The roadmap ends with a concrete proposal: which issues we fix, which dashboards we implement and what it costs per month on an ongoing retainer."
                        cta={{ label: 'E-commerce management', href: MANAGEMENT_HREF_EN }}
                    />
                </div>
            </Section>

            <Section tint eyebrow="FAQ" title="Questions about the e-commerce audit" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="form" maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Order the audit or an introductory call"
                    formSubtitle="Describe your store, your sales scale and what is slowing your results down the most today. We will get in touch to arrange a 15-minute call with our lead architect."
                    subjectPrefix="[EN] Audyt e-commerce"
                    serviceOptions={[
                        AUDIT_NAME,
                        'introductory call (15 min)',
                        'outsourced e-commerce management',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'audit only to start',
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
