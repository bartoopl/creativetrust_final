import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { AUDIT_HREF_EN, EXPERIENCE_SENTENCE_EN, experienceEn } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const canonicalUrl = `${SITE_URL}/en/services/e-commerce-management`;

/** The monthly fee is quoted after the audit, never published (see webmcp.test.mjs). */
const SERVICE_NAME = 'E-commerce management';

export const metadata: Metadata = {
    title: 'Outsourced e-commerce management | E-commerce manager on a retainer',
    description:
        'We run brands\' e-commerce from outside: sales plan, margin, team, suppliers and performance reporting. We start with an audit, then a steady monthly collaboration with one accountable team.',
    alternates: pageAlternates('/uslugi/zarzadzanie-e-commerce', 'en', SITE_URL),
    openGraph: {
        title: 'Outsourced e-commerce management | CreativeTrust',
        description:
            'An e-commerce manager and an implementation team in one retainer. Plan, margin, suppliers and results under one accountability.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Outsourced e-commerce management | CreativeTrust',
        description:
            'Running e-commerce from outside: sales plan, margin, team, suppliers and results. We start with an audit.',
    },
};

const heroFacts = [
    { label: 'Model', value: 'a steady monthly retainer' },
    { label: 'Start', value: 'with an e-commerce audit' },
    { label: 'Accountability', value: 'one team: decisions and delivery' },
    { label: 'Audit cost', value: 'deducted in the first month' },
];

const scope = [
    {
        title: 'Sales plan and priorities',
        text: 'Goals, budget and the order of actions for the quarter. The team knows what matters now and what can wait.',
    },
    {
        title: 'Margin and offer',
        text: 'Margin by product, category and channel, plus promotion and returns policy. Decisions based on numbers, not on instinct.',
    },
    {
        title: 'Team and suppliers',
        text: 'We coordinate the people on your side as well as agencies, software houses and tool vendors. One task list, one accountability.',
    },
    {
        title: 'Technology and data',
        text: 'A roadmap for the platform, integrations and analytics. An operational dashboard that everyone reads the same way.',
    },
    {
        title: 'Marketing and CRM',
        text: 'Acquisition channels, marketing automation and work with the customer base, all tied to the sales plan.',
    },
    {
        title: 'Performance reporting',
        text: 'A steady rhythm of reviews and a summary for the board: what we did, what result it brought and what comes next.',
    },
];

const situations = [
    'e-commerce is growing, but nobody is accountable for it as a whole',
    'you are looking for an e-commerce manager, and recruitment is taking long or has failed',
    'the board needs a partner who speaks the language of results and margin',
    'several agencies are doing their own thing, but nobody ties it into one plan',
    'the team is good operationally and needs direction and priorities',
    'you are planning a platform or sales model change and need someone to lead it',
];

const steps = [
    {
        title: 'E-commerce audit',
        text: 'In 5–7 working days we get to know the numbers, the back office and the team. You get a report and a roadmap with priorities.',
    },
    {
        title: 'Plan and scope',
        text: 'We agree goals, the scope of responsibility and the monthly retainer. We deduct the cost of the audit in the first month.',
    },
    {
        title: 'Day-to-day management',
        text: 'We deliver the roadmap: we manage priorities, the team and suppliers, and we implement changes with our own people or with yours.',
    },
    {
        title: 'Performance reviews',
        text: 'We regularly show results against the plan and correct course. No reports for the sake of reporting.',
    },
];

const faqs = [
    {
        question: 'How is outsourced e-commerce management different from working with an agency?',
        answer:
            'An agency is responsible for its own channel or brief. We are responsible for e-commerce as a whole: the plan, margin, priorities and the work of suppliers. If you already have agencies that work well, they stay, and we coordinate them.',
    },
    {
        question: 'Do you replace our e-commerce team?',
        answer:
            'We don\'t have to. We can take over the e-commerce manager role where it is missing, or strengthen an existing team with management, analytics and implementation. We agree the scope after the audit.',
    },
    {
        question: 'Why do you start with an audit?',
        answer:
            'To take responsibility for a result, we need to know the numbers, the back office and the team. The audit takes 5–7 working days, costs a fixed fee agreed upfront and is deducted in the first month of collaboration.',
    },
    {
        question: 'How much does outsourced e-commerce management cost?',
        answer:
            'It is a monthly retainer that depends on the scope of responsibility and the scale of the store. You receive a concrete proposal together with the roadmap after the audit.',
    },
    {
        question: 'Which companies is this service for?',
        answer:
            'For brands that sell online at scale or are quickly reaching it, most often in fashion, beauty, home and garden, and retail, and that want experienced e-commerce management on their side without building a whole department from scratch.',
    },
    {
        question: 'Do you also implement changes in the store?',
        answer:
            'Yes. Stores, integrations, marketing automation and websites are delivered by the same team, so recommendations do not wait for a contractor. If you have your own IT department or a software house, we work with them.',
    },
];

export default function EcommerceManagementPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: SERVICE_NAME, url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Outsourced e-commerce management',
        description:
            'Running e-commerce from outside in a steady monthly collaboration: sales plan, margin, team and suppliers, technology, marketing and performance reporting. We start with an e-commerce audit.',
        url: canonicalUrl,
        serviceType: 'E-commerce management',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="Outsourced e-commerce management"
                title={<>E-commerce run <span style={{ color: 'var(--accent)' }}>like a business,</span> not like a project.</>}
                description="We take responsibility for e-commerce as a whole: sales plan, margin, team, suppliers and results. You get experienced management and an implementation team in one retainer."
                cta={{ label: 'Book a call', href: '#form' }}
                ctaSecondary={{ label: 'What we take on', href: '#scope' }}
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
                eyebrow="Experience"
                title="We know e-commerce management from practice"
                description={EXPERIENCE_SENTENCE_EN}
            >
                <NumberedGrid cols={3} numbered={false} items={experienceEn.map((item) => ({ title: item.brand, text: item.text }))} />
            </Section>

            <Section id="scope" tint eyebrow="What we take on" title="Six areas under one accountability">
                <NumberedGrid cols={3} items={scope} />
            </Section>

            <Section>
                <SplitLayout eyebrow="When it makes sense" title="E-commerce is too big to run on the side">
                    <BulletColumns items={situations} />
                </SplitLayout>
            </Section>

            <Section tint eyebrow="How it works" title="From the audit to a steady working rhythm">
                <NumberedGrid cols={4} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="The first step is an e-commerce audit"
                        text="5–7 working days, a fixed fee known upfront, 2 hours of your team's time. At the end you have a roadmap and a proposal for an ongoing collaboration."
                        cta={{ label: 'See what the audit covers', href: AUDIT_HREF_EN }}
                    />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Questions about outsourced e-commerce management" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="form" tint maxWidth={1100}>
                <LandingLeadForm
                    locale="en"
                    formTitle="Let's talk about running your e-commerce"
                    formSubtitle="Describe your store, your sales scale and who is responsible for e-commerce today. We will get in touch to arrange a 15-minute call."
                    subjectPrefix="[EN] Zarządzanie e-commerce"
                    serviceOptions={[
                        'outsourced e-commerce management',
                        'e-commerce audit to start',
                        'introductory call (15 min)',
                        "I don't know, I need a recommendation",
                    ]}
                    budgetOptions={[
                        'audit only to start',
                        'up to PLN 10,000 per month',
                        'PLN 10,000 – 20,000 per month',
                        'over PLN 20,000 per month',
                        "I don't know / I need a recommendation",
                    ]}
                    messagePlaceholder="What platform does the store run on, what is your approximate turnover, what does the team look like and what would you like to hand over for management?"
                />
            </Section>
        </main>
    );
}
