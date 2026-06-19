import { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'E-commerce — CreativeTrust | Sklepy headless, migracje, WooCommerce, Shopify',
    description: 'Projektujemy i wdrażamy sklepy internetowe, które sprzedają i skalują się bez bólu. Headless e-commerce, migracje platform, integracje ERP i AI-assisted development.',
    alternates: { canonical: `${SITE_URL}/uslugi/e-commerce` },
    openGraph: {
        title: 'E-commerce i sklepy internetowe | CreativeTrust',
        description: 'Sklepy headless i migracje platform. WooCommerce, Shopify, Next.js Commerce — jeden zespół od projektu po wdrożenie.',
        url: `${SITE_URL}/uslugi/e-commerce`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Sklepy headless', description: 'Oddzielamy frontend od backendu. Szybciej, elastyczniej, skalowalniej — bez limitów platformy.', tags: ['Next.js Commerce', 'API-first', 'CMS'] },
    { num: '02', title: 'WooCommerce', description: 'Budujemy i rozbudowujemy sklepy na WooCommerce z Custom checkout, integracjami i pluginami.', tags: ['WooCommerce', 'WordPress', 'PHP'] },
    { num: '03', title: 'Shopify', description: 'Sklepy na Shopify Plus z custom theme, liquid i integracjami z ERP i systemami magazynowymi.', tags: ['Shopify Plus', 'Liquid', 'Apps'] },
    { num: '04', title: 'Migracje platform', description: 'Bezpieczna migracja z dowolnej platformy — z zachowaniem danych, SEO i historii zamówień.', tags: ['Migracja danych', 'SEO redirect', 'Zero downtime'] },
    { num: '05', title: 'Integracje ERP / CRM', description: 'Synchronizacja stanów, zamówień i klientów z Subiektem, Comarch, SAP i innymi systemami.', tags: ['Subiekt', 'Comarch', 'API'] },
    { num: '06', title: 'Optymalizacja konwersji', description: 'CRO, A/B testy i UX improvements na podstawie danych z GA4 i heatmap.', tags: ['CRO', 'A/B tests', 'GA4'] },
];

const stats = [
    { value: '150+', label: 'projektów e-commerce i stron www' },
    { value: '3,2×', label: 'średni wzrost konwersji po redesignie' },
    { value: '90+', label: 'PageSpeed Score w każdym projekcie' },
    { value: '40%', label: 'szybszy czas realizacji dzięki AI' },
];

const platforms = ['Next.js Commerce', 'WooCommerce', 'Shopify', 'Shopify Plus', 'Medusa.js', 'Saleor', 'Subiekt GT', 'Comarch ERP', 'BaseLinker'];

const features = [
    { title: 'Wydajność powyżej 90', description: 'PageSpeed Score > 90 na mobile i desktop. Szybki sklep to wyższe pozycje i niższy bounce rate.' },
    { title: 'SEO e-commerce', description: 'Architektura kategorii, schema Product, breadcrumb, canonical, sitemap i AMP — wszystko od początku.' },
    { title: 'Checkout bez tarcia', description: 'Uproszczony checkout, one-click, Apple Pay, BLIK, Klarna — mniej kroków, mniej porzuceń.' },
    { title: 'Mobile-first', description: 'Projektujemy od smallest screen up. Zakupy mobilne to ponad 60% transakcji — nie możesz tego ignorować.' },
    { title: 'Personalizacja z AI', description: 'Rekomendacje produktów, dynamiczne banery i e-mail automation oparte na zachowaniu klienta.' },
    { title: 'Bezpieczeństwo', description: 'SSL, 2FA dla admina, backup, monitoring i aktualizacje w pakiecie wsparcia.' },
];

const process = [
    { num: '01', title: 'Analiza', description: 'Obecny stan, dane, lejek zakupowy. AI przyspiesza diagnozę i priorytetyzację.' },
    { num: '02', title: 'UX & Design', description: 'Wireframes i UI w Figma. Customer journey od kategorii po potwierdzenie zamówienia.' },
    { num: '03', title: 'Development', description: 'Budujemy lub migrujemy. Integracje, testy i optymalizacja wydajności.' },
    { num: '04', title: 'Wzrost', description: 'CRO, reklamy, automatyzacja. Optymalizujemy na podstawie danych.', featured: true },
];

export default function EcommercePage() {
    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }}>
                <div style={{ maxWidth: 820 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
                        E-COMMERCE
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 78px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px' }}>
                        Sklepy, które sprzedają i <span style={{ color: 'var(--accent)' }}>skalują się.</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 36px' }}>
                        Projektujemy i wdrażamy sklepy e-commerce oparte na danych i AI. Nowe wdrożenia, migracje platform, integracje ERP — szybciej i z lepszym wynikiem niż tradycyjny proces.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <Link href="/kontakt" className="ct-cta">
                            Omów projekt
                            <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                        </Link>
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
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>ZAKRES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Typy projektów e-commerce.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(s => (
                            <div key={s.num} style={{ borderRadius: 20, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 24 }}>{s.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 19, margin: '0 0 10px' }}>{s.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: '0 0 16px' }}>{s.description}</p>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {s.tags.map(t => (
                                        <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 6 }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standard */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>STANDARD</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Co dostajesz w każdym sklepie.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {features.map(f => (
                            <div key={f.title} style={{ borderRadius: 18, padding: '24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 10px' }}>{f.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platforms */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 40 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>TECH STACK</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Platformy i integracje, które obsługujemy.</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {platforms.map(p => (
                            <span key={p} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 14, fontWeight: 500, color: 'var(--text)', border: '1px solid var(--line)', padding: '10px 18px', borderRadius: 10, background: 'var(--panel)' }}>{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>PROCES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Od konceptu do sprzedającego sklepu.</h2>
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
