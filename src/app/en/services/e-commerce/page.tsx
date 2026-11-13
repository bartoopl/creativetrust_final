import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import SceneWithLegend from '@/components/scene3d/SceneWithLegend';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: { absolute: 'Online stores: design, build, integrations | CreativeTrust' },
    description: 'We design and build online stores: headless, WooCommerce, Shopify, migrations and ERP integrations - for sales, margin and the way your team works.',
    alternates: pageAlternates('/uslugi/e-commerce', 'en', SITE_URL),
    openGraph: {
        title: 'Online stores: design, build, integrations | CreativeTrust',
        description: 'We design and build online stores: headless, WooCommerce, Shopify, migrations and ERP integrations - for sales, margin and the way your team works.',
        url: `${SITE_URL}/en/services/e-commerce`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Headless stores', description: 'A storefront separated from the back end. Changes to the offer, promotions and content go live quickly, without waiting for a release of the whole platform.', tags: ['Medusa.js', 'Next.js', 'API-first'] },
    { num: '02', title: 'WooCommerce', description: 'We build and extend WooCommerce stores: custom checkout, integrations and plugins. A good choice when time to launch and running costs matter.', tags: ['WooCommerce', 'WordPress', 'PHP'] },
    { num: '03', title: 'Shopify', description: 'Shopify Plus stores with a custom theme and integrations with ERP and warehouse systems.', tags: ['Shopify Plus', 'Liquid', 'Apps'] },
    { num: '04', title: 'Platform migrations', description: 'We move your store while preserving data, SEO and order history. A redirect plan and a sales test are done before the switch.', tags: ['Data migration', 'SEO redirects', 'Zero downtime'] },
    { num: '05', title: 'ERP / CRM integrations', description: 'Stock, prices, orders and customers synchronised with Subiekt, Comarch, SAP and other systems. No more copying data by hand.', tags: ['Subiekt', 'Comarch', 'API'] },
    { num: '06', title: 'Conversion optimisation', description: 'Tests and fixes to the purchase journey based on data: product page, basket, checkout, payments.', tags: ['CRO', 'A/B tests', 'GA4'] },
];

const facts = [
    { label: 'Starting point', value: 'sales goal and margin, not a feature list' },
    { label: 'Technology', value: 'open source, no vendor lock-in' },
    { label: 'Migrations', value: 'preserving SEO, data and order history' },
    { label: 'After launch', value: 'store development or e-commerce management' },
];

const platforms = ['Next.js Commerce', 'WooCommerce', 'Shopify', 'Shopify Plus', 'Medusa.js', 'Saleor', 'Subiekt GT', 'Comarch ERP', 'BaseLinker'];

const features = [
    { title: 'Performance above 90', description: 'PageSpeed score > 90 on mobile and desktop. A fast store means higher rankings and fewer abandoned sessions.' },
    { title: 'E-commerce SEO', description: 'Category architecture, Product schema, breadcrumbs, canonicals and sitemap — set up from the start, not after launch.' },
    { title: 'Frictionless checkout', description: 'Streamlined checkout, one-click, Apple Pay, BLIK, Klarna — fewer steps, fewer abandoned baskets.' },
    { title: 'Mobile-first', description: 'We design from the smallest screen up, because that is where most shopping happens.' },
    { title: 'Back end for your team', description: 'A panel where your team changes the offer, promotions and content itself. No ticket to a developer for every campaign.' },
    { title: 'Security', description: 'SSL, admin 2FA, backups, monitoring and updates included in the support package.' },
];

const process = [
    { num: '01', title: 'Analysis', description: 'Numbers, purchase funnel and back end. We agree what needs to improve before we choose the technology.' },
    { num: '02', title: 'UX & design', description: 'Wireframes and UI in Figma. The customer journey from category page to order confirmation.' },
    { num: '03', title: 'Development', description: 'We build or migrate. Integrations, testing and performance optimisation.' },
    { num: '04', title: 'Growth', description: 'After launch we optimise conversion and develop the store based on data.', featured: true },
];

export default function EcommercePage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'E-commerce', url: `${SITE_URL}/en/services/e-commerce` },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Online stores and e-commerce builds',
        description:
            'Headless stores, platform migrations, ERP integrations and conversion optimisation for e-commerce.',
        url: `${SITE_URL}/en/services/e-commerce`,
        serviceType: 'E-commerce and headless commerce',
        inLanguage: 'en',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, serviceSchema]} />
            <PageHero
                eyebrow="Online stores"
                title={<>We build stores the way we would want to <span style={{ color: 'var(--accent)' }}>manage them.</span></>}
                description="We design and build online stores, migrations and integrations. The work is done by a team that knows e-commerce from the management side — so what matters is how much the store earns, how quickly your team can make changes and whether data between systems adds up."
                cta={{ label: 'Discuss your store project', href: '/en/contact' }}
                ctaSecondary={{ label: 'See our work', href: '/en/portfolio' }}
                right={<SceneWithLegend id="ecommerce-layers" label="Headless store layers" locale="en" />}
            />

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

            <Section id="oferta" eyebrow="Scope" title="What we design and build.">
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

            <Section eyebrow="Process" title="From numbers to a store that sells.">
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

            <Section tint>
                <InlineCTA
                    title="Not sure whether to change platform?"
                    text="An e-commerce audit in 5–7 working days shows whether a new store or a migration is the right investment — or whether working on your current system will give a better result."
                    cta={{ label: 'See the e-commerce audit', href: '/en/services/e-commerce-audit' }}
                />
            </Section>

            <CTASection locale="en" />
        </main>
    );
}
