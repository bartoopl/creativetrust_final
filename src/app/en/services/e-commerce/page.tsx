import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import SceneWithLegend from '@/components/scene3d/SceneWithLegend';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'E-commerce | Headless stores, migrations, WooCommerce, Shopify',
    description: 'We design and build online stores that sell and scale without the pain. Headless e-commerce, platform migrations, ERP integrations and AI-assisted development.',
    alternates: pageAlternates('/uslugi/e-commerce', 'en', SITE_URL),
    openGraph: {
        title: 'E-commerce and online stores | CreativeTrust',
        description: 'Headless stores and platform migrations. WooCommerce, Shopify, Next.js Commerce — one team from design to launch.',
        url: `${SITE_URL}/en/services/e-commerce`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Headless stores', description: 'We separate the frontend from the backend. Faster, more flexible, more scalable — with no platform limits.', tags: ['Next.js Commerce', 'API-first', 'CMS'] },
    { num: '02', title: 'WooCommerce', description: 'We build and extend WooCommerce stores with custom checkout, integrations and plugins.', tags: ['WooCommerce', 'WordPress', 'PHP'] },
    { num: '03', title: 'Shopify', description: 'Shopify Plus stores with custom themes, Liquid and integrations with ERP and warehouse systems.', tags: ['Shopify Plus', 'Liquid', 'Apps'] },
    { num: '04', title: 'Platform migrations', description: 'A safe migration from any platform — preserving your data, SEO and order history.', tags: ['Data migration', 'SEO redirects', 'Zero downtime'] },
    { num: '05', title: 'ERP / CRM integrations', description: 'Synchronisation of stock, orders and customers with Subiekt, Comarch, SAP and other systems.', tags: ['Subiekt', 'Comarch', 'API'] },
    { num: '06', title: 'Conversion optimisation', description: 'CRO, A/B tests and UX improvements based on GA4 and heatmap data.', tags: ['CRO', 'A/B tests', 'GA4'] },
];

const stats = [
    { value: '150+', label: 'e-commerce and website projects' },
    { value: '3,2×', label: 'average conversion uplift after a redesign' },
    { value: '90+', label: 'PageSpeed score in every project' },
    { value: '40%', label: 'faster delivery thanks to AI' },
];

const platforms = ['Next.js Commerce', 'WooCommerce', 'Shopify', 'Shopify Plus', 'Medusa.js', 'Saleor', 'Subiekt GT', 'Comarch ERP', 'BaseLinker'];

const features = [
    { title: 'Performance above 90', description: 'PageSpeed score > 90 on mobile and desktop. A fast store means higher rankings and a lower bounce rate.' },
    { title: 'E-commerce SEO', description: 'Category architecture, Product schema, breadcrumbs, canonicals, sitemap and AMP — all from the start.' },
    { title: 'Frictionless checkout', description: 'Streamlined checkout, one-click, Apple Pay, BLIK, Klarna — fewer steps, fewer abandoned baskets.' },
    { title: 'Mobile-first', description: 'We design from the smallest screen up. Mobile shopping accounts for over 60% of transactions — you cannot ignore it.' },
    { title: 'AI personalisation', description: 'Product recommendations, dynamic banners and email automation based on customer behaviour.' },
    { title: 'Security', description: 'SSL, admin 2FA, backups, monitoring and updates included in the support package.' },
];

const process = [
    { num: '01', title: 'Analysis', description: 'Current state, data, purchase funnel. AI speeds up diagnosis and prioritisation.' },
    { num: '02', title: 'UX & Design', description: 'Wireframes and UI in Figma. The customer journey from category page to order confirmation.' },
    { num: '03', title: 'Development', description: 'We build or migrate. Integrations, testing and performance optimisation.' },
    { num: '04', title: 'Growth', description: 'CRO, advertising, automation. We optimise based on data.', featured: true },
];

export default function EcommercePage() {
    const serviceSchema = buildServiceSchema({
        name: 'E-commerce',
        description:
            'Headless stores, platform migrations, ERP integrations and conversion optimisation for e-commerce.',
        url: `${SITE_URL}/en/services/e-commerce`,
        serviceType: 'E-commerce and headless commerce',
        inLanguage: 'en',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={serviceSchema} />
            <PageHero
                eyebrow="E-commerce"
                title={<>Stores that sell and <span style={{ color: 'var(--accent)' }}>scale.</span></>}
                description="We design and build data- and AI-driven e-commerce stores. New builds, platform migrations, ERP integrations — faster and with better results than a traditional process."
                cta={{ label: 'Discuss your project', href: '/en/contact' }}
                right={<SceneWithLegend id="ecommerce-layers" label="Headless store layers" locale="en" />}
            />

            <Section border={false}>
                <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {stats.map(s => (
                        <div key={s.value} className="flex flex-col gap-2.5" style={{ padding: '24px 24px 28px' }}>
                            <span style={{ fontSize: 'clamp(28px, 3.1vw, 40px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</span>
                            <span className="ct-body" style={{ fontSize: 13 }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="oferta" eyebrow="Scope" title="Types of e-commerce projects.">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(s => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{s.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15, flex: 1 }}>{s.description}</p>
                            <div className="flex flex-wrap gap-2" style={{ marginTop: 6 }}>
                                {s.tags.map(t => <span key={t} className="ct-pill">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section tint eyebrow="Standard" title="What you get in every store.">
                <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
                    {features.map(f => (
                        <div key={f.title} className="flex flex-col gap-2" style={{ padding: '20px 0', borderTop: '1px solid var(--line-strong)' }}>
                            <div className="flex items-center gap-2.5">
                                <span className="ct-bullet" aria-hidden="true" />
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{f.title}</h3>
                            </div>
                            <p className="ct-body" style={{ fontSize: 15 }}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Tech stack" title="Platforms and integrations we work with.">
                <div className="flex flex-wrap gap-2.5">
                    {platforms.map(p => (
                        <span key={p} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)' }}>{p}</span>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Process" title="From concept to a store that sells.">
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

            <CTASection locale="en" />
        </main>
    );
}
