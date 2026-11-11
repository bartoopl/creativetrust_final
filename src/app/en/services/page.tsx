import Link from 'next/link';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildFaqSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Services | Websites, e-commerce, AI and automation',
    description: 'Web design, e-commerce, marketing automation and AI — in one team. We work from diagnosis through to launch and growth. Results, not promises.',
    alternates: pageAlternates('/uslugi', 'en', SITE_URL),
};

const services = [
    { num: '01', title: 'Websites', href: '/en/services/websites', description: 'Websites and landing pages designed for conversion, SEO and speed.', tags: ['Company websites', 'Landing pages', 'Next.js'] },
    { num: '02', title: 'E-commerce', href: '/en/services/e-commerce', description: 'Headless stores and migrations that sell and scale without the pain.', tags: ['Headless', 'Migrations', 'Integrations'] },
    { num: '03', title: 'Social Media', href: '/en/services/social-media', description: 'Communication built for reach, consistency and sales — not just for publishing.', tags: ['Strategy', 'Content', 'Analytics'] },
    { num: '04', title: 'Marketing Automation', href: '/en/services/marketing-automation', description: 'Funnels, CRM and campaigns driven by data and AI. They work while you sleep.', tags: ['SALESmanago', 'Lead nurturing', 'AI'] },
    { num: '05', title: 'E-commerce consulting', href: '/en/services/e-commerce-consulting', description: 'Sales, margin and store architecture. We start with a paid Bottleneck Diagnosis.', tags: ['Diagnosis', 'Margins', 'Dashboards'] },
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
    { num: '01', title: 'Diagnosis', description: 'Audit, data, goals. AI speeds up research and competitor analysis.' },
    { num: '02', title: 'Design', description: 'Strategy and design. We generate and test variants faster than ever.' },
    { num: '03', title: 'Implementation', description: 'AI-assisted development. Shorter time-to-market, fewer bugs.' },
    { num: '04', title: 'Growth', description: 'Optimisation in a loop. Models learn from your data and results.', featured: true },
];

const faq = [
    { q: 'Where is the best place to start?', a: 'Most often with a diagnosis: brand, website, store or automation. The choice depends on where you are losing the most potential today.' },
    { q: 'Do you combine several services in one project?', a: 'Yes. It is usually a better model than commissioning websites, e-commerce and communication separately from different suppliers.' },
    { q: 'What role does AI play in projects?', a: 'AI speeds up research, variant generation, development and optimisation. Decisions stay with people — we know when and where AI genuinely helps.' },
    { q: 'Can you start with an audit?', a: 'Yes. An audit is a good starting point if you need to decide what to do next and in what order. For online stores we offer the Bottleneck and eCommerce Architecture Diagnosis as part of e-commerce consulting.' },
];

export default function ServicesPage() {
    const faqSchema = buildFaqSchema(faq.map(({ q, a }) => ({ question: q, answer: a })));

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={faqSchema} />
            <PageHero
                eyebrow="Services"
                title="One team. Full range."
                description="Strategy, design, development and AI automation in one process — no handing the baton between agencies."
                cta={{ label: 'Book a consultation', href: '/en/contact' }}
                ctaSecondary={{ label: 'See what we offer', href: '#zakres' }}
                right={
                    <div className="ct-grid-lines grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {[['Priority', 'A clear message and a smooth process'], ['Outcome', 'Less friction, more results'], ['Model', 'Strategy + delivery'], ['Scope', 'Brand, web, commerce, AI']].map(([label, val]) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{val}</span>
                            </div>
                        ))}
                    </div>
                }
            />

            <Section id="zakres" eyebrow="Our services" title="Modules you can launch separately or combine." border={false}>
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

            <Section tint eyebrow="SEO landing pages" title="Pages for specific search phrases and buying intent.">
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
            <Section eyebrow="How we work" title="A process powered by AI.">
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
