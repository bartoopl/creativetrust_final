import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import CTASection from '@/components/CTASection';
import { NumberedGrid } from '@/components/LandingBlocks';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';
import { EXPERIENCE_SENTENCE_EN, experienceEn } from '@/lib/experience';

export const metadata: Metadata = {
    title: 'About us | A team built on e-commerce audit and management',
    description: 'CreativeTrust audits online stores and runs brands’ e-commerce as an external team. E-commerce experience across many industries, including 5.10.15, Quiosque and the Monnari capital group. In the market since 2010.',
    alternates: pageAlternates('/o-nas', 'en', SITE_URL),
    openGraph: {
        title: 'About us | A team built on e-commerce audit and management | CreativeTrust',
        description: 'CreativeTrust audits online stores and runs brands’ e-commerce as an external team. In the market since 2010.',
        url: `${SITE_URL}/en/about`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};


const values = [
    { title: 'Results before scope', description: 'We start with sales, margin and team time. We choose technology and actions to fit what needs to improve.' },
    { title: 'Numbers on the table', description: 'We agree goals, priorities and responsibilities at the start. We report what changed the result — not a list of completed tasks.' },
    { title: 'Part of the client’s team', description: 'We work like an e-commerce department on your side, not like a detached subcontractor.' },
];

const milestones = [
    { year: '2010', title: 'Agency launch', description: 'We built our first campaigns and communications for brands that needed a simpler path to the customer.' },
    { year: '2016', title: 'Web & e-commerce', description: 'We added website and online store design so we could control the whole funnel, not just a fragment of it.' },
    { year: '2024', title: 'SALESmanago partner', description: 'We strengthened our automation practice and our work with marketing data.' },
    { year: '2025', title: 'AI in the process', description: 'AI woven into research, analytics and development. A shorter time from diagnosis to delivery.' },
    { year: '2026', title: 'E-commerce audit and management', description: 'Alongside building stores and websites, we now offer store audits and outsourced e-commerce management — in the same team.' },
];

const stats = [
    ['15+', 'years in the market'],
    ['3', 'nationwide Polish clothing brands in the team’s experience'],
    ['150+', 'projects delivered'],
    ['5–7', 'working days for an e-commerce audit'],
];

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <PageHero
                eyebrow="ABOUT US"
                title="A team that knows e-commerce from the management side."
                description="We audit online stores and run brands’ e-commerce as an external team. We also design and build online stores and websites. We draw on experience building growing brands in the Polish market."
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

            <Section
                eyebrow="EXPERIENCE"
                title="Growing brands in the Polish market."
                description={EXPERIENCE_SENTENCE_EN}
                border={false}
            >
                <NumberedGrid cols={3} numbered={false} items={experienceEn.map((item) => ({ title: item.brand, text: item.text }))} />
            </Section>

            <Section eyebrow="WHAT GUIDES US" title="The principles that keep a collaboration on track." tint>
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

            <Section eyebrow="OUR JOURNEY" title="We built expertise where the market was growing.">
                <div className="ct-grid-lines grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
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
