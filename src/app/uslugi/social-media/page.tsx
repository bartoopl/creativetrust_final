import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import NotchedButton from '@/components/ui/NotchedButton';
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
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(60px, 8vw, 96px) 32px 80px' }}>
                <div style={{ maxWidth: 820 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--lime-ink)', textTransform: 'uppercase', marginBottom: 16 }}>
                        SOCIAL MEDIA
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5.2vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.045em', margin: '0 0 18px' }}>
                        Social media, które <span style={{ color: 'var(--lime-ink)' }}>sprzedają.</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 28px' }}>
                        Budujemy obecność w mediach społecznościowych jako kanał sprzedaży i budowania marki — nie tylko jako obowiązek. Strategia, content, kampanie i analityka w jednym procesie.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <NotchedButton href="/kontakt" variant="primary-light">
                            Umów konsultację
                        </NotchedButton>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px' }}>
                    <div style={{ display: 'grid', gap: 24 }} className="grid-cols-2 md:grid-cols-4">
                        {results.map(r => (
                            <div key={r.value} style={{ borderLeft: '1px solid var(--line)', paddingLeft: 20 }}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--lime-ink)' }}>{r.value}</div>
                                <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 10 }}>{r.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="oferta" style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime-ink)', textTransform: 'uppercase', marginBottom: 14 }}>ZAKRES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Co obejmuje współpraca.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(s => (
                            <div key={s.num} style={{ borderRadius: 20, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--lime-ink)', marginBottom: 28 }}>{s.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 17, margin: '0 0 10px' }}>{s.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platforms */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 40 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime-ink)', textTransform: 'uppercase', marginBottom: 14 }}>PLATFORMY</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Gdzie budujemy Twoją obecność.</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {platforms.map(p => (
                            <span key={p} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 14, fontWeight: 500, color: 'var(--text)', border: '1px solid var(--line)', padding: '10px 18px', borderRadius: 10, background: 'var(--panel)' }}>{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime-ink)', textTransform: 'uppercase', marginBottom: 14 }}>PROCES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>
                            Od diagnozy do wyników.
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map(step => (
                            <div key={step.num} style={{ borderRadius: 18, padding: '28px 24px', background: step.featured ? 'linear-gradient(160deg, color-mix(in srgb, var(--lime) 16%, var(--panel)), var(--panel))' : 'var(--panel)', border: step.featured ? '1px solid color-mix(in srgb, var(--lime) 40%, var(--line))' : '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--lime-ink)', marginBottom: 48 }}>{step.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 8px' }}>{step.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
