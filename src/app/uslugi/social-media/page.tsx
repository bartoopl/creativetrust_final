import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Social Media Marketing — CreativeTrust | Strategia, content, wyniki',
    description: 'Budujemy obecność w Social Media, która sprzedaje — nie tylko buduje zasięg. Strategia, content plan, community management i analityka w jednym procesie.',
    alternates: { canonical: `${SITE_URL}/uslugi/social-media` },
    openGraph: {
        title: 'Social Media Marketing | CreativeTrust',
        description: 'Strategia, content, analityka i wyniki. Social media jako kanał sprzedaży — nie tylko prestiżu.',
        url: `${SITE_URL}/uslugi/social-media`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Strategia social media', description: 'Audyt, pozycjonowanie, harmonogram i cele — zanim pojawi się pierwszy post.' },
    { num: '02', title: 'Content plan i produkcja', description: 'Grafiki, wideo, copywriting i reels tworzone systemowo, nie ad hoc.' },
    { num: '03', title: 'Community management', description: 'Odpowiadamy, angażujemy i budujemy relacje z odbiorcami marki.' },
    { num: '04', title: 'Płatne kampanie', description: 'Meta Ads, LinkedIn Ads — targetowanie, kreacje i optymalizacja pod wynik.' },
    { num: '05', title: 'Analityka i raportowanie', description: 'Co tydzień wiesz, co działa. Decyzje oparte na danych, nie intuicji.' },
    { num: '06', title: 'AI w produkcji contentu', description: 'Szybciej, więcej wariantów, lepsza personalizacja. AI jako narzędzie, nie zamiennik kreacji.' },
];

const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'X (Twitter)', 'Pinterest', 'Threads'];

const results = [
    { value: '2–5×', label: 'średni wzrost zasięgu organicznego po wdrożeniu strategii' },
    { value: '60%', label: 'wyższe zaangażowanie przy systemowym content planie' },
    { value: '30%', label: 'niższy koszt pozyskania klienta przez płatne kampanie' },
    { value: '15+', label: 'lat w budowaniu marek i ich komunikacji' },
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
                title={<>Social media, które <span style={{ color: 'var(--accent)' }}>sprzedają.</span></>}
                description="Budujemy obecność w mediach społecznościowych jako kanał sprzedaży i budowania marki — nie tylko jako obowiązek. Strategia, content, kampanie i analityka w jednym procesie."
                cta={{ label: 'Umów konsultację', href: '/kontakt' }}
            />

            {/* Results */}
            <Section border={false}>
                <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {results.map(r => (
                        <div key={r.value} className="flex flex-col gap-2.5" style={{ padding: '24px 24px 28px' }}>
                            <span style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, letterSpacing: '-1.2px', lineHeight: 1 }}>{r.value}</span>
                            <span className="ct-body" style={{ fontSize: 13 }}>{r.label}</span>
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
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{s.title}</h3>
                            <p className="ct-body">{s.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Platforms */}
            <Section tint eyebrow="Platformy" title="Gdzie budujemy Twoją obecność.">
                <div className="flex flex-wrap gap-2.5">
                    {platforms.map(p => (
                        <span key={p} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)', background: '#fff' }}>{p}</span>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Proces" title="Od diagnozy do wyników.">
                <ol className="ct-grid-lines grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {process.map(step => (
                        <li key={step.num} className="flex flex-col gap-2.5" style={{ padding: '28px 24px', background: step.featured ? 'var(--panel)' : undefined }}>
                            <span className="ct-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', marginBottom: 24 }}>{step.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{step.title}</h3>
                            <p className="ct-body">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <CTASection />
        </main>
    );
}
