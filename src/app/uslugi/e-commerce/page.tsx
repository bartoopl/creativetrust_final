import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';

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
    const serviceSchema = buildServiceSchema({
        name: 'E-commerce',
        description:
            'Sklepy headless, migracje platform, integracje ERP i optymalizacja konwersji dla e-commerce.',
        url: `${SITE_URL}/uslugi/e-commerce`,
        serviceType: 'E-commerce i headless commerce',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={serviceSchema} />
            <PageHero
                eyebrow="E-commerce"
                title={<>Sklepy, które sprzedają i <span style={{ color: 'var(--accent)' }}>skalują się.</span></>}
                description="Projektujemy i wdrażamy sklepy e-commerce oparte na danych i AI. Nowe wdrożenia, migracje platform, integracje ERP — szybciej i z lepszym wynikiem niż tradycyjny proces."
                cta={{ label: 'Omów projekt', href: '/kontakt' }}
            />

            <Section border={false}>
                <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {stats.map(s => (
                        <div key={s.value} className="flex flex-col gap-2.5" style={{ padding: '24px 24px 28px' }}>
                            <span style={{ fontSize: 'clamp(28px, 3.1vw, 40px)', fontWeight: 600, letterSpacing: '-1.2px', lineHeight: 1 }}>{s.value}</span>
                            <span className="ct-body" style={{ fontSize: 13 }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="oferta" eyebrow="Zakres" title="Typy projektów e-commerce.">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(s => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{s.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15, flex: 1 }}>{s.description}</p>
                            <div className="flex flex-wrap gap-2" style={{ marginTop: 6 }}>
                                {s.tags.map(t => <span key={t} className="ct-pill">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section tint eyebrow="Standard" title="Co dostajesz w każdym sklepie.">
                <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
                    {features.map(f => (
                        <div key={f.title} className="flex flex-col gap-2" style={{ padding: '20px 0', borderTop: '1px solid var(--line-strong)' }}>
                            <div className="flex items-center gap-2.5">
                                <span className="ct-bullet" aria-hidden="true" />
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{f.title}</h3>
                            </div>
                            <p className="ct-body" style={{ fontSize: 15 }}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Tech stack" title="Platformy i integracje, które obsługujemy.">
                <div className="flex flex-wrap gap-2.5">
                    {platforms.map(p => (
                        <span key={p} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)' }}>{p}</span>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Proces" title="Od konceptu do sprzedającego sklepu.">
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
