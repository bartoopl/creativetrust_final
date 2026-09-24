import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'O nas — CreativeTrust | AI-native partner produktowy',
    description: 'CreativeTrust to AI-native partner produktowy. Łączymy strategię, design, development i automatyzację AI w jednym procesie. 15 lat doświadczenia, 150+ projektów.',
    alternates: { canonical: `${SITE_URL}/o-nas` },
};

const values = [
    { title: 'Skuteczność', description: 'Każde działanie ma wspierać wynik biznesowy, nie tylko poprawiać wygląd.' },
    { title: 'Transparentność', description: 'Ustalamy zakres, priorytety i odpowiedzialność na początku współpracy.' },
    { title: 'Partnerstwo', description: 'Pracujemy jak część zespołu klienta, a nie jak odłączony podwykonawca.' },
];

const milestones = [
    { year: '2010', title: 'Start agencji', description: 'Budowaliśmy pierwsze kampanie i komunikację dla marek, które potrzebowały prostszej ścieżki do klienta.' },
    { year: '2016', title: 'Web & e-commerce', description: 'Dołożyliśmy projektowanie stron i sklepów, żeby kontrolować cały lejek, a nie tylko fragment.' },
    { year: '2024', title: 'SALESmanago partner', description: 'Wzmocniliśmy obszar automatyzacji i pracy z danymi marketingowymi.' },
    { year: '2025', title: 'AI-native', description: 'AI wplecione w każdy etap pracy — od researchu po development. Krótszy time-to-market, wyższy wynik.' },
];

const stats = [
    ['15+', 'lat doświadczenia'],
    ['150+', 'projektów'],
    ['3,2×', 'średni wzrost konwersji'],
    ['40%', 'szybciej dzięki AI'],
];

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <PageHero
                eyebrow="O NAS"
                title="AI-native partner produktowy."
                description="Łączymy strategię marki, design, development i automatyzację AI w jednym procesie. Pracujemy jak partner, nie podwykonawca — od diagnozy po wynik."
                cta={{ label: 'Porozmawiajmy', href: '/kontakt' }}
                ctaSecondary={{ label: 'Zobacz usługi', href: '/uslugi' }}
            />

            <section style={{ padding: '0 var(--pad-x)', background: 'var(--panel)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
                    {stats.map(([val, label], i) => (
                        <div
                            key={label}
                            className={`${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
                            style={{ borderColor: 'var(--line)', padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)' }}
                        >
                            <div style={{ fontWeight: 600, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-1.2px', lineHeight: 1, color: 'var(--text)' }}>{val}</div>
                            <div className="ct-meta" style={{ marginTop: 10 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Section eyebrow="CO NAS PROWADZI" title="Zasady, które trzymają projekt w ryzach." border={false}>
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-3" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {values.map((v, i) => (
                        <div key={v.title} className="flex flex-col gap-3" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, color: 'var(--accent)' }}>0{i + 1}</span>
                            <h3 style={{ fontWeight: 600, fontSize: 18, margin: '12px 0 0', letterSpacing: '-0.3px' }}>{v.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{v.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="NASZA DROGA" title="Budowaliśmy kompetencje tam, gdzie rósł rynek." tint>
                <div className="ct-grid-lines grid-cols-1 sm:grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {milestones.map((m) => (
                        <div key={m.year} className="flex flex-col gap-3" style={{ padding: '24px 22px' }}>
                            <span className="ct-meta" style={{ color: 'var(--accent)' }}>{m.year}</span>
                            <h3 style={{ fontWeight: 600, fontSize: 18, margin: '12px 0 0', letterSpacing: '-0.3px' }}>{m.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{m.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTASection />
        </main>
    );
}
