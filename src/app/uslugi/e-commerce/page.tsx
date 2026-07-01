import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import NotchedButton from '@/components/ui/NotchedButton';
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
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                        E-COMMERCE
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: '0 0 18px', maxWidth: '12ch' }}>
                        Sklepy, które sprzedają i <span style={{ color: 'var(--lime)' }}>skalują się.</span>
                    </h1>
                    <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(255,255,255,0.6)', maxWidth: '54ch', margin: '0 0 28px' }}>
                        Projektujemy i wdrażamy sklepy e-commerce oparte na danych i AI. Nowe wdrożenia, migracje platform, integracje ERP — szybciej i z lepszym wynikiem niż tradycyjny proces.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        <NotchedButton href="/kontakt" variant="primary-dark">
                            Omów projekt
                        </NotchedButton>
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#000', color: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-sm">
                    <div style={{ display: 'grid', gap: 24 }} className="grid-cols-2 md:grid-cols-4">
                        {stats.map(s => (
                            <div key={s.value} style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 20 }}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(28px, 3.1vw, 43.1px)', letterSpacing: '-1.44px', lineHeight: 1, color: '#fff' }}>{s.value}</div>
                                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 10 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="oferta" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>ZAKRES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0 }}>Typy projektów e-commerce.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {services.map(s => (
                            <div key={s.num} style={{ borderRadius: 4, padding: '28px 24px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', marginBottom: 22 }}>{s.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 10px', letterSpacing: '-0.8px' }}>{s.title}</h3>
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: '0 0 16px' }}>{s.description}</p>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {s.tags.map(t => (
                                        <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,0,0,0.08)', padding: '4px 10px', borderRadius: 4 }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>STANDARD</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0 }}>Co dostajesz w każdym sklepie.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {features.map(f => (
                            <div key={f.title} style={{ borderRadius: 4, padding: '24px', background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 10px', letterSpacing: '-0.8px' }}>{f.title}</h3>
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0 }}>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ marginBottom: 40 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>TECH STACK</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0 }}>Platformy i integracje, które obsługujemy.</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {platforms.map(p => (
                            <span key={p} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, fontWeight: 500, color: '#000', border: '1px solid rgba(0,0,0,0.08)', padding: '9px 14px', borderRadius: 4, background: '#fff' }}>{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>PROCES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0 }}>Od konceptu do sprzedającego sklepu.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map(step => (
                            <div key={step.num} style={{ borderRadius: 4, padding: '28px 24px', background: step.featured ? 'rgba(0,0,0,0.04)' : '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', marginBottom: 38 }}>{step.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 8px', letterSpacing: '-0.8px' }}>{step.title}</h3>
                                <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0 }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
