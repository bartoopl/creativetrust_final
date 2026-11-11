import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Social Media dla marek | Strategia, content, kampanie',
    description: 'Prowadzimy social media marek tak, żeby pracowały na sprzedaż: strategia, content, kampanie i społeczność zaplanowane razem z kalendarzem sprzedaży i ofertą.',
    alternates: pageAlternates('/uslugi/social-media', 'pl', SITE_URL),
    openGraph: {
        title: 'Social Media dla marek | CreativeTrust',
        description: 'Strategia, content, kampanie i analityka. Social media spięte ze sprzedażą online.',
        url: `${SITE_URL}/uslugi/social-media`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Strategia social media', description: 'Audyt, pozycjonowanie, harmonogram i cele — spięte z kalendarzem sprzedaży, zanim pojawi się pierwszy post.' },
    { num: '02', title: 'Content plan i produkcja', description: 'Grafiki, wideo, copywriting i reels tworzone systemowo, pod premiery, sezon i promocje.' },
    { num: '03', title: 'Community management', description: 'Odpowiadamy, angażujemy i budujemy relacje z odbiorcami marki. Pytania o produkt nie zostają bez odpowiedzi.' },
    { num: '04', title: 'Płatne kampanie', description: 'Meta Ads, LinkedIn Ads — targetowanie, kreacje i optymalizacja pod sprzedaż i koszt pozyskania.' },
    { num: '05', title: 'Analityka i raportowanie', description: 'Co tydzień wiesz, co działa. W raporcie jest sprzedaż i koszt, nie tylko zasięg.' },
    { num: '06', title: 'AI w produkcji contentu', description: 'Szybciej i w większej liczbie wariantów. AI jako narzędzie, nie zamiennik kreacji.' },
];

const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'X (Twitter)', 'Pinterest', 'Threads'];

const facts = [
    { label: 'Cel', value: 'sprzedaż i baza klientów, nie same zasięgi' },
    { label: 'Plan', value: 'jeden kalendarz z ofertą i promocjami' },
    { label: 'Raport', value: 'co tydzień: sprzedaż, koszt, zasięg' },
    { label: 'Zakres', value: 'strategia, content, kampanie, społeczność' },
];

const process = [
    { num: '01', title: 'Audyt i diagnoza', description: 'Analizujemy obecność, konkurencję i odbiorców. AI przyspiesza research.' },
    { num: '02', title: 'Strategia', description: 'Pozycjonowanie, tone of voice, harmonogram i formaty dla każdego kanału.' },
    { num: '03', title: 'Produkcja', description: 'Content, grafiki, wideo. Planujemy miesiące, nie tygodnie.' },
    { num: '04', title: 'Wzrost', description: 'Kampanie, optymalizacja i iteracja na podstawie danych.', featured: true },
];

export default function SocialMediaPage() {
    const serviceSchema = buildServiceSchema({
        name: 'Social Media',
        description:
            'Strategia social media, content, kampanie płatne i analityka pod wynik biznesowy.',
        url: `${SITE_URL}/uslugi/social-media`,
        serviceType: 'Social media marketing',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={serviceSchema} />

            {/* Hero */}
            <PageHero
                eyebrow="Social Media"
                title={<>Social media spięte ze <span style={{ color: 'var(--accent)' }}>sprzedażą online.</span></>}
                description="Prowadzimy komunikację marek tak, żeby pracowała na sklep i sprzedaż: content, kampanie i społeczność zaplanowane razem z kalendarzem sprzedaży, ofertą i bazą klientów."
                cta={{ label: 'Umów rozmowę', href: '/kontakt' }}
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
            <Section id="oferta" eyebrow="Zakres" title="Co obejmuje współpraca.">
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
            <Section tint eyebrow="Platformy" title="Gdzie budujemy Twoją obecność.">
                <div className="flex flex-wrap gap-2.5">
                    {platforms.map(p => (
                        <span key={p} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)', background: 'transparent' }}>{p}</span>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Proces" title="Od diagnozy do wyników.">
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
                    title="Social media to jeden z kanałów sprzedaży"
                    text="Audyt e-commerce pokazuje, które kanały realnie zarabiają i gdzie dołożenie budżetu da największy efekt."
                    cta={{ label: 'Zobacz audyt e-commerce', href: '/uslugi/audyt-e-commerce' }}
                />
            </Section>

            <CTASection />
        </main>
    );
}
