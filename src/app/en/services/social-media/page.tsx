import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: { absolute: 'Social media for brands: strategy, campaigns | CreativeTrust' },
    description: 'We run brands\' social media for sales: strategy, content, campaigns and community planned with your sales calendar and offer.',
    alternates: pageAlternates('/uslugi/social-media', 'en', SITE_URL),
    openGraph: {
        title: 'Social media for brands: strategy, campaigns | CreativeTrust',
        description: 'We run brands\' social media for sales: strategy, content, campaigns and community planned with your sales calendar and offer.',
        url: `${SITE_URL}/en/services/social-media`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Social media strategy', description: 'Audit, positioning, schedule and goals — tied to your sales calendar before the first post goes live.' },
    { num: '02', title: 'Content plan and production', description: 'Graphics, video, copywriting and reels created systematically, around launches, seasons and promotions.' },
    { num: '03', title: 'Community management', description: 'We respond, engage and build relationships with your brand\'s audience. Product questions do not go unanswered.' },
    { num: '04', title: 'Paid campaigns', description: 'Meta Ads, LinkedIn Ads — targeting, creatives and optimisation for sales and acquisition cost.' },
    { num: '05', title: 'Analytics and reporting', description: 'Every week you know what works. The report shows sales and cost, not just reach.' },
    { num: '06', title: 'AI in content production', description: 'Faster and with more variants. AI as a tool, not a replacement for creativity.' },
];

const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'X (Twitter)', 'Pinterest', 'Threads'];

const facts = [
    { label: 'Goal', value: 'sales and customer base, not reach alone' },
    { label: 'Plan', value: 'one calendar with the offer and promotions' },
    { label: 'Report', value: 'weekly: sales, cost, reach' },
    { label: 'Scope', value: 'strategy, content, campaigns, community' },
];

const process = [
    { num: '01', title: 'Audit and diagnosis', description: 'We analyse your presence, competitors and audience. AI speeds up research.' },
    { num: '02', title: 'Strategy', description: 'Positioning, tone of voice, schedule and formats for every channel.' },
    { num: '03', title: 'Production', description: 'Content, graphics, video. We plan months ahead, not weeks.' },
    { num: '04', title: 'Growth', description: 'Campaigns, optimisation and iteration based on data.', featured: true },
];

export default function SocialMediaPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: `${SITE_URL}/en` },
        { name: 'Services', url: `${SITE_URL}/en/services` },
        { name: 'Social media', url: `${SITE_URL}/en/services/social-media` },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Social Media',
        description:
            'Social media strategy, content, paid campaigns and analytics geared to business results.',
        url: `${SITE_URL}/en/services/social-media`,
        serviceType: 'Social media marketing',
        inLanguage: 'en',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, serviceSchema]} />

            {/* Hero */}
            <PageHero
                eyebrow="Social Media"
                title={<>Social media tied to <span style={{ color: 'var(--accent)' }}>online sales.</span></>}
                description="We run brand communication so that it works for the store and for sales: content, campaigns and community planned together with your sales calendar, offer and customer base."
                cta={{ label: 'Book a conversation', href: '/en/contact' }}
            />

            {/* Results */}
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
            <Section id="oferta" eyebrow="Scope" title="What the collaboration covers.">
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

            {/* Platforms */}
            <Section tint eyebrow="Platforms" title="Where we build your presence.">
                <div className="flex flex-wrap gap-2.5">
                    {platforms.map(p => (
                        <span key={p} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)', background: 'transparent' }}>{p}</span>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Process" title="From diagnosis to results.">
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
                    title="Social media is one of your sales channels"
                    text="An e-commerce audit shows which channels really earn and where extra budget will have the greatest effect."
                    cta={{ label: 'See the e-commerce audit', href: '/en/services/e-commerce-audit' }}
                />
            </Section>

            <CTASection locale="en" />
        </main>
    );
}
