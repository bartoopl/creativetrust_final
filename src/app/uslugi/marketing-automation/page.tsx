import { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Marketing Automation dla Firm — CreativeTrust | AI, SALESmanago, lejki, CRM',
    description: 'Automatyzacja marketingu oparta na danych i AI. Wdrażamy SALESmanago, budujemy lejki, integrujemy CRM i ustawiamy kampanie, które działają bez Twojej obecności.',
    alternates: { canonical: `${SITE_URL}/uslugi/marketing-automation` },
    openGraph: {
        title: 'Marketing Automation dla Firm | CreativeTrust',
        description: 'SALESmanago, lejki, lead nurturing, automatyczne kampanie. Działają, kiedy śpisz.',
        url: `${SITE_URL}/uslugi/marketing-automation`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Wdrożenie SALESmanago', description: 'Konfiguracja platformy, integracje, segmentacja i pierwsze automatyzacje gotowe do działania.' },
    { num: '02', title: 'Lead nurturing', description: 'Lejki, sekwencje e-mail i scoring leadów — kontakty dojrzewają do zakupu bez Twojej obecności.' },
    { num: '03', title: 'Personalizacja w czasie rzeczywistym', description: 'Treści na stronie i w e-mailach dopasowane do zachowań i segmentu odbiorcy.' },
    { num: '04', title: 'AI w kampaniach', description: 'Optymalizacja czasu wysyłki, predykcyjny scoring i generowanie treści wspomagane AI.' },
    { num: '05', title: 'Integracje CRM', description: 'Pipedrive, HubSpot, Salesforce — dane marketingowe trafiają tam, gdzie pracuje sprzedaż.' },
    { num: '06', title: 'Analityka i reporting', description: 'Dashboardy z metrykami, które mają znaczenie — nie tylko otwarcia i kliknięcia.' },
];

const stats = [
    { value: '3,2×', label: 'średni wzrost konwersji po wdrożeniu automatyzacji' },
    { value: '40%', label: 'leadów, które nie byłyby obsłużone ręcznie' },
    { value: '24/7', label: 'kampanie działają bez Twojego udziału' },
    { value: '15+', label: 'lat doświadczenia w marketingu B2B i B2C' },
];

const usecases = [
    { title: 'E-commerce', description: 'Koszyk porzucony, rekomendacje produktowe, reaktywacja klientów i cross-sell.' },
    { title: 'B2B / SaaS', description: 'Lead scoring, nurturing przed rozmową handlową, onboarding i retencja.' },
    { title: 'Usługi lokalne', description: 'Przypomnienia, upsell po wizycie, zbieranie opinii i kampanie sezonowe.' },
    { title: 'Edukacja i szkolenia', description: 'Automatyczny onboarding kursantów, przypomnienia i kampanie upsell.' },
];

const process = [
    { num: '01', title: 'Audyt', description: 'Mapujemy obecny stack, dane, lejki i punkty styku. Identyfikujemy największe straty.' },
    { num: '02', title: 'Architektura', description: 'Projektujemy lejki, segmentację i logikę automatyzacji — zanim ktokolwiek kliknie "uruchom".' },
    { num: '03', title: 'Wdrożenie', description: 'Konfigurujemy platformę, integrujemy CRM i uruchamiamy pierwsze automatyzacje.' },
    { num: '04', title: 'Optymalizacja', description: 'Testujemy, mierzymy i rozbudowujemy. Pętla danych → decyzja → wynik.', featured: true },
];

export default function MarketingAutomationPage() {
    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }}>
                <div style={{ display: 'grid', gap: 64, alignItems: 'start' }} className="grid-cols-1 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
                            MARKETING AUTOMATION
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px' }}>
                            Kampanie, które działają <span style={{ color: 'var(--accent)' }}>kiedy śpisz.</span>
                        </h1>
                        <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 36px' }}>
                            Wdrażamy SALESmanago i budujemy automatyzacje oparte na danych i AI. Lejki, lead nurturing, personalizacja, integracje CRM — działają bez Twojego udziału.
                        </p>
                        <Link href="/kontakt" className="ct-cta">
                            Omów projekt
                            <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                        </Link>
                    </div>
                    <div style={{ borderRadius: 20, border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--line))', background: 'color-mix(in srgb, var(--accent) 7%, var(--panel))', padding: 32 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>// status: active</div>
                        {['lead scoring', 'email nurturing', 'CRM sync', 'AI content', 'behavioral triggers', 'real-time personalization'].map((item, i) => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 5 ? '1px solid var(--line)' : 'none' }}>
                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--glow)', flexShrink: 0, animation: `ctpulse 2s ease-in-out ${i * 0.3}s infinite` }} />
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 14, color: 'var(--text)' }}>{item}</span>
                                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)' }}>running</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px' }}>
                    <div style={{ display: 'grid', gap: 24 }} className="grid-cols-2 md:grid-cols-4">
                        {stats.map(s => (
                            <div key={s.value} style={{ borderLeft: '1px solid var(--line)', paddingLeft: 20 }}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 3.5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--accent)' }}>{s.value}</div>
                                <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 10 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>CO ROBIMY</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Zakres automatyzacji.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(s => (
                            <div key={s.num} style={{ borderRadius: 20, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 28 }}>{s.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 19, margin: '0 0 10px' }}>{s.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use cases */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>ZASTOSOWANIA</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Dla kogo to działa.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2">
                        {usecases.map(u => (
                            <div key={u.title} style={{ borderRadius: 18, padding: '24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 10px' }}>{u.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>{u.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>PROCES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Od audytu do automatyzacji.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map(step => (
                            <div key={step.num} style={{ borderRadius: 18, padding: '28px 24px', background: step.featured ? 'linear-gradient(160deg, color-mix(in srgb, var(--accent) 16%, var(--panel)), var(--panel))' : 'var(--panel)', border: step.featured ? '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))' : '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 48 }}>{step.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 8px' }}>{step.title}</h3>
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
