import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Website design and development | Fast, effective, AI-assisted',
    description: 'We design and build websites that generate leads and sell. Headless, Next.js, performance. Shorter time-to-market thanks to AI. See what is included.',
    alternates: pageAlternates('/uslugi/strony-www', 'en', SITE_URL),
    openGraph: {
        title: 'Website design and development for companies | CreativeTrust',
        description: 'Websites designed for conversion, SEO and performance. Headless, Next.js, UX — one team from concept to launch.',
        url: `${SITE_URL}/en/services/websites`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const types = [
    { num: '01', title: 'Company websites', description: 'A brand showcase designed for conversion and SEO. It works around the clock.', tags: ['Headless CMS', 'Next.js', 'Sanity'] },
    { num: '02', title: 'Landing pages', description: 'Pages for campaigns, products and events. Time to launch: weeks, not months.', tags: ['High conversion', 'A/B ready', 'Fast'] },
    { num: '03', title: 'Portals and platforms', description: 'Extensive websites with authentication, dashboards and business logic.', tags: ['SaaS', 'Dashboard', 'API'] },
    { num: '04', title: 'Product pages', description: 'A product or service showcase that sells — storytelling + CTA.', tags: ['Storytelling', 'Video', 'CTA'] },
];

const features = [
    { title: 'Performance above 90', description: 'Core Web Vitals and a PageSpeed score > 90. Speed means SEO and conversion — we build for results from the ground up.' },
    { title: 'On-page SEO', description: 'Semantic architecture, meta tags, organisation schema, sitemap and canonicals set up from day one.' },
    { title: 'Headless CMS', description: 'Sanity, Contentful or Strapi — you edit content without touching the code. We separate logic from design.' },
    { title: 'Responsive & accessible', description: 'Looks great on every device. WCAG 2.1 AA. Accessibility is not optional.' },
    { title: 'AI-assisted development', description: 'We generate and test components faster. Time-to-market cut by 30–40% compared with a traditional process.' },
    { title: 'Post-launch support', description: 'We look after the site after launch. Updates, optimisation and new features.' },
];

const tech = ['Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Figma', 'GTM'];

const process = [
    { num: '01', title: 'Discovery', description: 'Analysis of goals, audience and competitors. AI speeds up the research.' },
    { num: '02', title: 'Design', description: 'Wireframes and UI in Figma. We click through the prototype before writing a line of code.' },
    { num: '03', title: 'Development', description: 'Headless, performant, SEO-ready. AI-assisted coding — faster and with fewer bugs.' },
    { num: '04', title: 'Launch & growth', description: 'Launch, testing, monitoring. We optimise after launch based on data.', featured: true },
];

export default function WebsitesPage() {
    const serviceSchema = buildServiceSchema({
        name: 'Websites',
        description:
            'Websites, landing pages and web platforms designed for conversion, SEO and performance.',
        url: `${SITE_URL}/en/services/websites`,
        serviceType: 'Website design and development',
        inLanguage: 'en',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={serviceSchema} />

            {/* Hero */}
            <PageHero
                eyebrow="Websites"
                title={<>Websites that attract customers and <span style={{ color: 'var(--accent)' }}>convert.</span></>}
                description="We design and build data-driven websites — from a landing page to an extensive portal. Headless, fast, SEO-ready. Delivery time cut by 30–40% thanks to AI."
                cta={{ label: 'Get a project quote', href: '/en/contact' }}
            >
                <div className="ct-grid-lines grid-cols-2 sm:grid-cols-4" style={{ marginTop: 16, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {[['150+', 'websites'], ['15', 'years'], ['90+', 'PageSpeed'], ['30-40%', 'faster']].map(([val, label]) => (
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

            <CTASection locale="en" />
        </main>
    );
}
