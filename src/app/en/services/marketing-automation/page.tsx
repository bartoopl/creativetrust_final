import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import FAQAccordion from '@/components/FAQAccordion';
import Card from '@/components/ui/Card';
import PageHero from '@/components/ui/PageHero';
import SceneWithLegend from '@/components/scene3d/SceneWithLegend';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Marketing Automation for e-commerce and business | SALESmanago, scenarios, CRM',
    description: 'We implement SALESmanago and scenarios that work on your customer base: abandoned-basket recovery, recommendations, reactivation, lead nurturing. Measured in revenue, not in messages sent.',
    alternates: pageAlternates('/uslugi/marketing-automation', 'en', SITE_URL),
    openGraph: {
        title: 'Marketing Automation for e-commerce and business | CreativeTrust',
        description: 'SALESmanago, sales scenarios, segmentation and CRM integrations. Automation measured in revenue.',
        url: `${SITE_URL}/en/services/marketing-automation`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const services = [
    { num: '01', title: 'SALESmanago implementation', description: 'Platform configuration, tracking, integration with your store and CRM, segments and the first scenarios ready to run.' },
    { num: '02', title: 'E-commerce scenarios', description: 'Abandoned basket, abandoned browsing, recommendations, cross-sell and reactivation of customers who have stopped buying.' },
    { num: '03', title: 'Lead nurturing', description: 'Sequences and scoring for B2B and service sales: a contact reaches a salesperson when they are ready to talk.' },
    { num: '04', title: 'Segmentation and personalisation', description: 'Content on your site and in messages tailored to behaviour, purchase history and customer value.' },
    { num: '05', title: 'CRM integrations', description: 'Pipedrive, HubSpot, Salesforce — marketing data lands where sales works.' },
    { num: '06', title: 'Analytics and reporting', description: 'Revenue from automation, not just opens and clicks.' },
];

const facts = [
    { label: 'Platform', value: 'SALESmanago partner since 2024' },
    { label: 'Channels', value: 'email, SMS, web push' },
    { label: 'Starting point', value: 'data, consents and segments' },
    { label: 'Measure of success', value: 'revenue from the customer base' },
];

const usecases = [
    { title: 'E-commerce', description: 'Abandoned baskets, product recommendations, customer reactivation and cross-sell.' },
    { title: 'B2B / SaaS', description: 'Lead scoring, nurturing before the sales call, onboarding and retention.' },
    { title: 'Local services', description: 'Reminders, post-visit upsell, review collection and seasonal campaigns.' },
    { title: 'Education and training', description: 'Automated learner onboarding, reminders and upsell campaigns.' },
];

const process = [
    { num: '01', title: 'Audit', description: 'We map your current stack, data, funnels and touchpoints. We identify the biggest losses.' },
    { num: '02', title: 'Architecture', description: 'We design funnels, segmentation and automation logic — before anyone clicks "launch".' },
    { num: '03', title: 'Implementation', description: 'We configure the platform, integrate your CRM and launch the first automations.' },
    { num: '04', title: 'Optimisation', description: 'We test, measure and expand. A loop of data → decision → result.', featured: true },
];

const faqs = [
    {
        question: 'Where should a marketing automation implementation start?',
        answer: 'With an audit of your data, lead sources, consents and sales process. Only then do we choose the scenarios and configure the platform.',
    },
    {
        question: 'Does marketing automation make sense in B2B?',
        answer: 'Yes, especially with a longer sales process. It helps segment enquiries, run lead nurturing and hand better-prepared contacts to sales.',
    },
    {
        question: 'Can you implement SALESmanago?',
        answer: 'Yes. We implement tracking, segmentation, scenarios, CRM integrations and reporting, then develop the automations further based on data.',
    },
];

export default function MarketingAutomationPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Marketing automation', url: `${SITE_URL}/en/services/marketing-automation` },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Marketing Automation',
        description:
            'Marketing automation, SALESmanago, funnels, CRM and data-driven campaigns.',
        url: `${SITE_URL}/en/services/marketing-automation`,
        serviceType: 'Marketing automation',
        inLanguage: 'en',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            {/* Hero */}
            <PageHero
                eyebrow="Marketing Automation"
                title={<>Automation that earns from your <span style={{ color: 'var(--accent)' }}>customer base.</span></>}
                description="We implement SALESmanago and scenarios that work on the customers you already have: abandoned baskets, recommendations, reactivation, lead nurturing. We measure them in revenue, not in the number of messages sent."
                cta={{ label: 'Discuss an implementation', href: '/en/contact' }}
                right={
                    <>
                    <SceneWithLegend id="automation-flow" label="Automations in the process" locale="en" />
                    <div className="ct-panel lg:hidden" style={{ padding: 'clamp(24px, 3vw, 32px)' }}>
                        <div className="ct-meta" style={{ color: 'var(--accent)', marginBottom: 16 }}>{'// status: active'}</div>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {['lead scoring', 'email nurturing', 'CRM sync', 'AI content', 'behavioral triggers', 'real-time personalisation'].map((item, i) => (
                                <li key={item} className="flex items-center gap-3" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                    <span className="ct-bullet" aria-hidden="true" style={{ animation: `ctpulse 2s ease-in-out ${i * 0.3}s infinite` }} />
                                    <span className="ct-mono" style={{ fontSize: 14, color: 'var(--text)' }}>{item}</span>
                                    <span className="ct-mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>running</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </>
                }
            />

            {/* Stats */}
            <Section border={false}>
                <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {facts.map(f => (
                        <div key={f.label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                            <span className="ct-meta">{f.label}</span>
                            <span style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4 }}>{f.value}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Services */}
            <Section id="oferta" eyebrow="What we do" title="The scope of automation.">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(s => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500 }}>{s.title}</h3>
                            <p className="ct-body">{s.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Use cases */}
            <Section tint eyebrow="Use cases" title="Who it works for.">
                <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                    {usecases.map(u => (
                        <div key={u.title} className="flex flex-col gap-2" style={{ padding: '20px 0', borderTop: '1px solid var(--line-strong)' }}>
                            <div className="flex items-center gap-2.5">
                                <span className="ct-bullet" aria-hidden="true" />
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{u.title}</h3>
                            </div>
                            <p className="ct-body" style={{ fontSize: 15 }}>{u.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Process" title="From audit to automation.">
                <ol className="ct-grid-lines grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {process.map(step => (
                        <li key={step.num} className="flex flex-col gap-2.5" style={{ padding: '28px 24px', background: step.featured ? 'var(--panel)' : undefined }}>
                            <span className="ct-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', marginBottom: 24 }}>{step.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{step.title}</h3>
                            <p className="ct-body">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section tint eyebrow="Knowledge and implementation" title="See how to connect automation with your sales process.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card
                        href="/blog/wdrozenie-marketing-automation-krok-po-kroku"
                        title="Implementing marketing automation step by step (in Polish)"
                        description="Read how to organise your data, consents, segments and first scenarios."
                    />
                    <Card
                        href="/en/services/salesmanago-implementation"
                        title="SALESmanago implementation"
                        description="See the scope of the implementation — from tracking and integrations to lead nurturing."
                    />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Questions about marketing automation.">
                <div style={{ maxWidth: 840 }}>
                    <FAQAccordion items={faqs} />
                </div>
            </Section>

            <Section tint>
                <InlineCTA
                    title="Automation is one element of a store's results"
                    text="An e-commerce audit shows how much sales and margin leak across the whole funnel — and whether marketing automation is the first thing to do."
                    cta={{ label: 'See the e-commerce audit', href: '/en/services/e-commerce-audit' }}
                />
            </Section>

            <CTASection locale="en" />
        </main>
    );
}
