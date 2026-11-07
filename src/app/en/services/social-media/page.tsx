import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Social Media Marketing | Strategy, content, results',
    description: 'We build a social media presence that sells — not just one that builds reach. Strategy, content plan, community management and analytics in one process.',
    alternates: pageAlternates('/uslugi/social-media', 'en', SITE_URL),
    openGraph: {
        title: 'Social Media Marketing | CreativeTrust',
        description: 'Strategy, content, analytics and results. Social media as a sales channel — not just a prestige one.',
        url: `${SITE_URL}/en/services/social-media`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Social media strategy', description: 'Audit, positioning, schedule and goals — before the first post goes live.' },
    { num: '02', title: 'Content plan and production', description: 'Graphics, video, copywriting and reels created systematically, not ad hoc.' },
    { num: '03', title: 'Community management', description: 'We respond, engage and build relationships with your brand\'s audience.' },
    { num: '04', title: 'Paid campaigns', description: 'Meta Ads, LinkedIn Ads — targeting, creatives and optimisation for results.' },
    { num: '05', title: 'Analytics and reporting', description: 'Every week you know what works. Decisions based on data, not intuition.' },
    { num: '06', title: 'AI in content production', description: 'Faster, more variants, better personalisation. AI as a tool, not a replacement for creativity.' },
];

const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'X (Twitter)', 'Pinterest', 'Threads'];

const results = [
    { value: '2–5×', label: 'average growth in organic reach after implementing a strategy' },
    { value: '60%', label: 'higher engagement with a systematic content plan' },
    { value: '30%', label: 'lower customer acquisition cost through paid campaigns' },
    { value: '15+', label: 'years building brands and their communication' },
];

const process = [
    { num: '01', title: 'Audit and diagnosis', description: 'We analyse your presence, competitors and audience. AI speeds up research.' },
    { num: '02', title: 'Strategy', description: 'Positioning, tone of voice, schedule and formats for every channel.' },
    { num: '03', title: 'Production', description: 'Content, graphics, video. We plan months ahead, not weeks.' },
    { num: '04', title: 'Growth', description: 'Campaigns, optimisation and iteration based on data.', featured: true },
];

export default function SocialMediaPage() {
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
            <SchemaScript schema={serviceSchema} />

            {/* Hero */}
            <PageHero
                eyebrow="Social Media"
                title={<>Social media that <span style={{ color: 'var(--accent)' }}>sells.</span></>}
                description="We build your social media presence as a sales and brand-building channel — not just an obligation. Strategy, content, campaigns and analytics in one process."
                cta={{ label: 'Book a consultation', href: '/en/contact' }}
            />

            {/* Results */}
            <Section border={false}>
                <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {results.map(r => (
                        <div key={r.value} className="flex flex-col gap-2.5" style={{ padding: '24px 24px 28px' }}>
                            <span style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{r.value}</span>
                            <span className="ct-body" style={{ fontSize: 13 }}>{r.label}</span>
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

            <CTASection locale="en" />
        </main>
    );
}
