import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'About us | AI-native product partner',
    description: 'CreativeTrust is an AI-native product partner. We combine strategy, design, development and AI automation in a single process. 15 years of experience, 150+ projects.',
    alternates: pageAlternates('/o-nas', 'en', SITE_URL),
    openGraph: {
        title: 'About us | AI-native product partner | CreativeTrust',
        description: 'CreativeTrust is an AI-native product partner. We combine strategy, design, development and AI automation in a single process.',
        url: `${SITE_URL}/en/about`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const values = [
    { title: 'Effectiveness', description: 'Every action should support a business result, not just improve how things look.' },
    { title: 'Transparency', description: 'We agree scope, priorities and responsibilities at the very start of the collaboration.' },
    { title: 'Partnership', description: 'We work as part of the client’s team, not as a detached subcontractor.' },
];

const milestones = [
    { year: '2010', title: 'Agency launch', description: 'We built our first campaigns and communications for brands that needed a simpler path to the customer.' },
    { year: '2016', title: 'Web & e-commerce', description: 'We added website and online shop design so we could control the whole funnel, not just a fragment of it.' },
    { year: '2024', title: 'SALESmanago partner', description: 'We strengthened our automation practice and our work with marketing data.' },
    { year: '2025', title: 'AI-native', description: 'AI woven into every stage of the work — from research to development. Shorter time-to-market, better results.' },
];

const stats = [
    ['15+', 'years of experience'],
    ['150+', 'projects'],
    ['3.2×', 'average conversion uplift'],
    ['40%', 'faster thanks to AI'],
];

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <PageHero
                eyebrow="ABOUT US"
                title="An AI-native product partner."
                description="We combine brand strategy, design, development and AI automation in a single process. We work as a partner, not a subcontractor — from diagnosis to results."
                cta={{ label: 'Let’s talk', href: '/en/contact' }}
                ctaSecondary={{ label: 'See our services', href: '/en/services' }}
            />

            <section style={{ padding: '0 var(--pad-x)', background: 'var(--panel)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
                    {stats.map(([val, label], i) => (
                        <div
                            key={label}
                            className={`${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
                            style={{ borderColor: 'var(--line)', padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)' }}
                        >
                            <div style={{ fontWeight: 500, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text)' }}>{val}</div>
                            <div className="ct-meta" style={{ marginTop: 10 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Section eyebrow="WHAT GUIDES US" title="The principles that keep a project on track." border={false}>
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-3" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {values.map((v, i) => (
                        <div key={v.title} className="flex flex-col gap-3" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, color: 'var(--accent)' }}>0{i + 1}</span>
                            <h3 style={{ fontWeight: 500, fontSize: 18, margin: '12px 0 0', letterSpacing: '-0.3px' }}>{v.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{v.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="OUR JOURNEY" title="We built expertise where the market was growing." tint>
                <div className="ct-grid-lines grid-cols-1 sm:grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {milestones.map((m) => (
                        <div key={m.year} className="flex flex-col gap-3" style={{ padding: '24px 22px' }}>
                            <span className="ct-meta" style={{ color: 'var(--accent)' }}>{m.year}</span>
                            <h3 style={{ fontWeight: 500, fontSize: 18, margin: '12px 0 0', letterSpacing: '-0.3px' }}>{m.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{m.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTASection locale="en" />
        </main>
    );
}
