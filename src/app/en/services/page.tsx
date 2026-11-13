import Link from 'next/link';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: { absolute: 'Services: e-commerce audit, stores, websites | CreativeTrust' },
    description: 'E-commerce audit, outsourced e-commerce management, online stores and websites, marketing automation and social media - one team.',
    alternates: pageAlternates('/uslugi', 'en', SITE_URL),
};

const leadServices = [
    { num: '01', title: 'E-commerce audit', href: '/en/services/e-commerce-audit', description: 'Sales, margin, technology and team workflow. A report and roadmap in 5–7 working days, for a fixed fee.', tags: ['Report', 'Roadmap', '5–7 working days'] },
    { num: '02', title: 'E-commerce management', href: '/en/services/e-commerce-management', description: 'We run e-commerce for you as an external team: sales plan, margin, team, suppliers and performance reporting.', tags: ['Monthly retainer', 'Plan and margin', 'One team'] },
];

const services = [
    { num: '03', title: 'Online stores', href: '/en/services/e-commerce', description: 'We design and build stores: headless, WooCommerce, Shopify, migrations and ERP integrations.', tags: ['Headless', 'Migrations', 'Integrations'] },
    { num: '04', title: 'Websites', href: '/en/services/websites', description: 'Company websites, landing pages and portals with a clear role in sales. Fast and ready for SEO.', tags: ['Company websites', 'Landing pages', 'Next.js'] },
    { num: '05', title: 'Marketing Automation', href: '/en/services/marketing-automation', description: 'SALESmanago and scenarios that earn from your customer base: abandoned carts, recommendations, reactivation.', tags: ['SALESmanago', 'Scenarios', 'CRM'] },
    { num: '06', title: 'Social Media', href: '/en/services/social-media', description: 'Content, campaigns and community tied to your sales calendar and offer.', tags: ['Strategy', 'Content', 'Campaigns'] },
];

const landingPages = [
    {
        title: 'WooCommerce to headless migration',
        href: '/en/services/woocommerce-to-headless-migration',
        description: 'For stores that need performance, flexibility and better control over UX.',
    },
    {
        title: 'SALESmanago implementation',
        href: '/en/services/salesmanago-implementation',
        description: 'A landing page for enquiries about a partner and marketing automation implementation.',
    },
    {
        title: 'Website pricing',
        href: '/en/services/website-pricing',
        description: 'Website pricing for people looking for an indicative budget and scope.',
    },
    {
        title: 'Company website cost',
        href: '/en/services/company-website-cost',
        description: 'A landing page for enquiries about the cost and scope of a company website.',
    },
    {
        title: 'Headless WooCommerce',
        href: '/en/services/headless-woocommerce',
        description: 'A landing page for searches related to rebuilding a WooCommerce store.',
    },
];

const process = [
    { num: '01', title: 'Introductory call', description: '15 minutes. We check whether an audit makes business sense in your case.' },
    { num: '02', title: 'Audit', description: 'Interview, data and back-end analysis. A report and roadmap in 5–7 working days.' },
    { num: '03', title: 'Management', description: 'We run e-commerce for you as an external team on a monthly retainer: plan, margin, team, suppliers.' },
    { num: '04', title: 'Build and delivery', description: 'Stores, websites and roadmap changes are delivered by the same team. AI shortens research and production.', featured: true },
];

const faq = [
    { q: 'Where is the best place to start?', a: 'With an e-commerce audit. In 5–7 working days it shows where the store is losing sales, margin and team time, and sets out priorities for what comes next.' },
    { q: 'Do we have to order management to get an audit?', a: 'No. The roadmap stays with you and you can implement it yourselves. If you decide on an ongoing engagement, we deduct the cost of the audit in the first month.' },
    { q: 'Can we order just a store or a website, without an audit?', a: 'Yes. We also design and build online stores and websites as standalone projects. The same goes for marketing automation and social media.' },
    { q: 'What role does AI play in projects?', a: 'AI speeds up research, variant generation, development and optimisation. Decisions stay with people — we know when and where AI genuinely helps.' },
];

export default function ServicesPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
    ]);
    const faqSchema = buildFaqSchema(faq.map(({ q, a }) => ({ question: q, answer: a })));

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, faqSchema]} />
            <PageHero
                eyebrow="Services"
                title="We audit, run and build e‑commerce."
                description="We audit online stores and run brands' e-commerce as an external team. We also design and build online stores and websites — as standalone projects or as delivery of the roadmap from an audit."
                cta={{ label: 'Order an e-commerce audit', href: '/en/services/e-commerce-audit#form' }}
                ctaSecondary={{ label: 'See our services', href: '#zakres' }}
                right={
                    <div className="ct-grid-lines grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {[['First step', 'E-commerce audit in 5–7 working days'], ['Ongoing work', 'External e-commerce management'], ['Build', 'Online stores and websites'], ['Experience', 'Many industries, incl. 5.10.15, Quiosque, Monnari Capital Group']].map(([label, val]) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{val}</span>
                            </div>
                        ))}
                    </div>
                }
            />

            <Section id="zakres" eyebrow="Audit and management" title="Two services that most engagements start with." border={false}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {leadServices.map((s) => (
                        <Link key={s.href} href={s.href} className="ct-card-hover flex flex-col gap-6 no-underline" style={{ padding: 'clamp(24px, 3vw, 36px)', background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)' }}>{s.num}</span>
                            <div className="flex flex-col gap-3">
                                <h3 style={{ margin: 0, fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{s.title}</h3>
                                <p className="ct-body" style={{ fontSize: 16, maxWidth: '48ch' }}>{s.description}</p>
                            </div>
                            <div className="mt-auto flex flex-wrap items-center gap-2">
                                {s.tags.map(t => <span key={t} className="ct-pill">{t}</span>)}
                                <span className="ct-mono ml-auto" style={{ fontSize: 18, color: 'var(--accent)' }} aria-hidden="true">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section id="wdrozenia" eyebrow="We design and build" title="Online stores and websites — also as standalone projects." className="scroll-mt-20">
                <div className="flex flex-col" style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {services.map((s, i) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="ct-service-row flex flex-col gap-4 bg-white p-6 text-[var(--text)] no-underline lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-7"
                            style={{ borderTop: i > 0 ? '1px solid var(--line)' : undefined }}
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-6">
                                <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)', flexShrink: 0 }}>{s.num}</span>
                                <div className="flex flex-col gap-1">
                                    <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.4px', color: 'var(--text)' }}>{s.title}</span>
                                    <span className="ct-body" style={{ fontSize: 15 }}>{s.description}</span>
                                </div>
                            </div>
                            <div className="flex flex-shrink-0 flex-wrap gap-2 lg:ml-auto">
                                {s.tags.map(t => <span key={t} className="ct-pill">{t}</span>)}
                            </div>
                            <span className="ct-mono" style={{ fontSize: 18, color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section tint eyebrow="Specific needs" title="The stores and websites people ask about most.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {landingPages.map((page) => (
                        <Link key={page.href} href={page.href} className="ct-card-hover flex items-start justify-between gap-6 no-underline" style={{ padding: 24, background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}>
                            <div className="flex flex-col gap-2">
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, letterSpacing: '-0.3px' }}>{page.title}</h3>
                                <p className="ct-body" style={{ fontSize: 15, maxWidth: '52ch' }}>{page.description}</p>
                            </div>
                            <span className="ct-mono" style={{ fontSize: 18, color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="How we work" title="From a first conversation to ongoing collaboration.">
                <ol className="ct-grid-lines grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {process.map((step) => (
                        <li key={step.num} className="flex flex-col gap-2.5" style={{ padding: '28px 24px', background: step.featured ? 'var(--panel)' : undefined }}>
                            <span className="ct-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', marginBottom: 24 }}>{step.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{step.title}</h3>
                            <p className="ct-body">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            {/* FAQ */}
            <Section tint eyebrow="FAQ" title="Frequently asked questions.">
                <div className="ct-grid-lines grid-cols-1 lg:grid-cols-2">
                    {faq.map(item => (
                        <div key={item.q} className="flex flex-col gap-2.5" style={{ padding: '24px 28px' }}>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{item.q}</h3>
                            <p className="ct-body">{item.a}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTASection locale="en" />
        </main>
    );
}
