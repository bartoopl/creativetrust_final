import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import SceneWithLegend from '@/components/scene3d/SceneWithLegend';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Sklepy internetowe | Projekt, wdrożenie, migracje i integracje ERP',
    description: 'Projektujemy i budujemy sklepy internetowe: headless, WooCommerce, Shopify, migracje platform i integracje ERP. Z perspektywy zespołu, który zarządza e-commerce — pod sprzedaż, marżę i pracę zespołu.',
    alternates: { canonical: `${SITE_URL}/uslugi/e-commerce` },
    openGraph: {
        title: 'Sklepy internetowe i wdrożenia e-commerce | CreativeTrust',
        description: 'Sklepy headless, migracje platform i integracje ERP. Buduje je zespół, który zna e-commerce od strony zarządzania.',
        url: `${SITE_URL}/uslugi/e-commerce`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Sklepy headless', description: 'Storefront oddzielony od zaplecza. Zmiany w ofercie, promocjach i treściach wchodzą szybko, bez czekania na wydanie całej platformy.', tags: ['Medusa.js', 'Next.js', 'API-first'] },
    { num: '02', title: 'WooCommerce', description: 'Budujemy i rozbudowujemy sklepy na WooCommerce: własny checkout, integracje i wtyczki. Dobry wybór, gdy liczy się czas startu i koszt utrzymania.', tags: ['WooCommerce', 'WordPress', 'PHP'] },
    { num: '03', title: 'Shopify', description: 'Sklepy na Shopify Plus z własnym motywem i integracjami z ERP oraz systemami magazynowymi.', tags: ['Shopify Plus', 'Liquid', 'Apps'] },
    { num: '04', title: 'Migracje platform', description: 'Przenosimy sklep z zachowaniem danych, SEO i historii zamówień. Plan przekierowań i test sprzedaży powstają przed przełączeniem.', tags: ['Migracja danych', 'Przekierowania SEO', 'Bez przestoju'] },
    { num: '05', title: 'Integracje ERP / CRM', description: 'Stany, ceny, zamówienia i klienci zsynchronizowani z Subiektem, Comarch, SAP i innymi systemami. Koniec z przeklejaniem danych.', tags: ['Subiekt', 'Comarch', 'API'] },
    { num: '06', title: 'Optymalizacja konwersji', description: 'Testy i poprawki ścieżki zakupowej na podstawie danych: karta produktu, koszyk, checkout, płatności.', tags: ['CRO', 'Testy A/B', 'GA4'] },
];

const facts = [
    { label: 'Punkt wyjścia', value: 'cel sprzedażowy i marża, nie lista funkcji' },
    { label: 'Technologia', value: 'open source, bez vendor lock-in' },
    { label: 'Migracje', value: 'z zachowaniem SEO, danych i historii zamówień' },
    { label: 'Po starcie', value: 'rozwój sklepu albo zarządzanie e-commerce' },
];

const platforms = ['Next.js Commerce', 'WooCommerce', 'Shopify', 'Shopify Plus', 'Medusa.js', 'Saleor', 'Subiekt GT', 'Comarch ERP', 'BaseLinker'];

const features = [
    { title: 'Wydajność powyżej 90', description: 'PageSpeed Score > 90 na mobile i desktop. Szybki sklep to wyższe pozycje i mniej porzuconych sesji.' },
    { title: 'SEO e-commerce', description: 'Architektura kategorii, schema Product, breadcrumb, canonical i sitemap — ustawione od początku, nie po starcie.' },
    { title: 'Checkout bez tarcia', description: 'Uproszczony checkout, one-click, Apple Pay, BLIK, Klarna — mniej kroków, mniej porzuceń.' },
    { title: 'Mobile-first', description: 'Projektujemy od najmniejszego ekranu, bo tam odbywa się większość zakupów.' },
    { title: 'Zaplecze dla zespołu', description: 'Panel, w którym zespół sam zmienia ofertę, promocje i treści. Bez zgłoszenia do developera przy każdej kampanii.' },
    { title: 'Bezpieczeństwo', description: 'SSL, 2FA dla admina, backup, monitoring i aktualizacje w pakiecie wsparcia.' },
];

const process = [
    { num: '01', title: 'Analiza', description: 'Liczby, lejek zakupowy i zaplecze. Ustalamy, co ma się poprawić, zanim wybierzemy technologię.' },
    { num: '02', title: 'UX i design', description: 'Makiety i UI w Figmie. Ścieżka klienta od kategorii po potwierdzenie zamówienia.' },
    { num: '03', title: 'Development', description: 'Budujemy lub migrujemy. Integracje, testy i optymalizacja wydajności.' },
    { num: '04', title: 'Rozwój', description: 'Po starcie optymalizujemy konwersję i rozwijamy sklep na podstawie danych.', featured: true },
];

export default function EcommercePage() {
    const serviceSchema = buildServiceSchema({
        name: 'Sklepy internetowe i wdrożenia e-commerce',
        description:
            'Sklepy headless, migracje platform, integracje ERP i optymalizacja konwersji dla e-commerce.',
        url: `${SITE_URL}/uslugi/e-commerce`,
        serviceType: 'E-commerce i headless commerce',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={serviceSchema} />
            <PageHero
                eyebrow="Sklepy internetowe"
                title={<>Budujemy sklepy tak, jak sami chcielibyśmy nimi <span style={{ color: 'var(--accent)' }}>zarządzać.</span></>}
                description="Projektujemy i wdrażamy sklepy internetowe, migracje i integracje. Robi to zespół, który zna e-commerce od strony zarządzania — dlatego liczy się to, ile sklep zarabia, jak szybko zespół wprowadza zmiany i czy dane między systemami się zgadzają."
                cta={{ label: 'Omów projekt sklepu', href: '/kontakt' }}
                ctaSecondary={{ label: 'Zobacz realizacje', href: '/portfolio' }}
                right={<SceneWithLegend id="ecommerce-layers" label="Warstwy sklepu headless" />}
            />

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

            <Section id="oferta" eyebrow="Zakres" title="Co projektujemy i wdrażamy.">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(s => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{s.title}</h3>
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
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{f.title}</h3>
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

            <Section eyebrow="Proces" title="Od liczb do sprzedającego sklepu.">
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
                    title="Nie wiesz, czy zmieniać platformę?"
                    text="Audyt e-commerce w 5–7 dni roboczych pokazuje, czy nowy sklep lub migracja to właściwa inwestycja — czy lepszy wynik da praca na obecnym systemie."
                    cta={{ label: 'Zobacz audyt e-commerce', href: '/uslugi/audyt-e-commerce' }}
                />
            </Section>

            <CTASection />
        </main>
    );
}
