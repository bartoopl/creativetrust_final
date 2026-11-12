import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Websites for brands and companies | Design and build',
    description: 'We design and build websites: company sites, product sites, landing pages and portals. Designed for a specific role in sales, fast and easy to edit. See the scope and pricing.',
    alternates: pageAlternates('/uslugi/strony-www', 'en', SITE_URL),
    openGraph: {
        title: 'Websites for brands and companies | CreativeTrust',
        description: 'Websites designed for sales, SEO and performance. Next.js, headless CMS — one team from design to launch.',
        url: `${SITE_URL}/en/services/websites`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const types = [
    { num: '01', title: 'Company websites', description: 'A brand site with a clear offer and a path to contact. Designed for enquiries and SEO, not just for looks.', tags: ['Headless CMS', 'Next.js', 'Sanity'] },
    { num: '02', title: 'Landing pages', description: 'Pages for campaigns, products and events, tied to analytics and a form. Delivery measured in weeks.', tags: ['Campaigns', 'A/B tests', 'Fast launch'] },
    { num: '03', title: 'Brand sites alongside a store', description: 'A corporate, B2B or investor site next to your e-commerce — consistent with the brand and the store.', tags: ['Brand', 'B2B', 'Investor relations'] },
    { num: '04', title: 'Portals and platforms', description: 'Extensive sites with authentication, a dashboard and business logic.', tags: ['Customer panel', 'Dashboard', 'API'] },
];

const features = [
    { title: 'Performance above 90', description: 'Core Web Vitals and a PageSpeed score > 90. Speed means SEO and conversion — we build for results from the ground up.' },
    { title: 'On-page SEO', description: 'Semantic architecture, meta tags, structured data, sitemap and canonicals set up from day one.' },
    { title: 'Headless CMS', description: 'Sanity, Contentful or Strapi — you edit content without touching the code and without waiting for a developer.' },
    { title: 'Responsive & accessible', description: 'Works properly on every device, in line with WCAG 2.1 AA.' },
    { title: 'Measurement from day one', description: 'Events, forms and enquiry sources in analytics. You know what the site delivers for sales.' },
    { title: 'Post-launch support', description: 'We look after the site after launch. Updates, optimisation and new features.' },
];

const tech = ['Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Figma', 'GTM'];

const process = [
    { num: '01', title: 'Goal and role of the site', description: 'What the site should deliver for sales, and for whom. Analysis of the offer, audience and competitors.' },
    { num: '02', title: 'Design', description: 'Wireframes and UI in Figma. We click through the prototype before a line of code is written.' },
    { num: '03', title: 'Development', description: 'Headless, performant and SEO-ready. AI shortens production; people watch the quality.' },
    { num: '04', title: 'Launch & growth', description: 'Launch, testing, monitoring. After launch we optimise based on data.', featured: true },
];

export default function WebsitesPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Websites', url: `${SITE_URL}/en/services/websites` },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Websites',
        description:
            'Websites, landing pages and web portals designed for conversion, SEO and performance.',
        url: `${SITE_URL}/en/services/websites`,
        serviceType: 'Website design and development',
        inLanguage: 'en',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, serviceSchema]} />

            {/* Hero */}
            <PageHero
                eyebrow="Websites"
                title={<>Websites with a specific role <span style={{ color: 'var(--accent)' }}>in sales.</span></>}
                description="We design and build websites for brands and companies — from a landing page to an extensive portal. Each has a clear job: collect enquiries, support the store or open a new market. Fast, SEO-ready and easy to edit."
                cta={{ label: 'Get a project quote', href: '/en/contact' }}
                ctaSecondary={{ label: 'See pricing', href: '/en/services/website-pricing' }}
            >
                <div className="ct-grid-lines grid-cols-2 sm:grid-cols-4" style={{ marginTop: 16, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {[['150+', 'projects'], ['15+', 'years in business'], ['90+', 'PageSpeed'], ['from PLN 3,500', 'landing page, net']].map(([val, label]) => (
                        <div key={label} className="flex flex-col gap-1.5" style={{ padding: '18px 20px' }}>
                            <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-1px', lineHeight: 1 }}>{val}</span>
                            <span className="ct-meta">{label}</span>
                        </div>
                    ))}
                </div>
            </PageHero>

            {/* Types */}
            <Section id="oferta" eyebrow="Project types" title="What we can build." border={false}>
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2">
                    {types.map(t => (
                        <div key={t.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{t.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{t.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15, flex: 1 }}>{t.description}</p>
                            <div className="flex flex-wrap gap-2" style={{ marginTop: 6 }}>
                                {t.tags.map(tag => <span key={tag} className="ct-pill">{tag}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Features */}
            <Section tint eyebrow="Project standard" title="What you get in every project.">
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

            {/* Stack */}
            <Section eyebrow="Tech stack" title="Technologies we choose for a reason.">
                <div className="flex flex-wrap gap-2.5">
                    {tech.map(t => (
                        <span key={t} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)' }}>{t}</span>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Process" title="From brief to a finished website.">
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
                    title="Is the website part of a larger e-commerce operation?"
                    text="If a store runs alongside the site, start with an e-commerce audit: it shows what will improve sales and margin first."
                    cta={{ label: 'See the e-commerce audit', href: '/en/services/e-commerce-audit' }}
                />
            </Section>

            <CTASection locale="en" />
        </main>
    );
}
