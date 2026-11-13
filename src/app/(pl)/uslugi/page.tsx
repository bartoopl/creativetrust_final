import Link from 'next/link';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: { absolute: 'Audyt e-commerce, sklepy, strony internetowe | CreativeTrust' },
    description: 'Audyt i zarządzanie e-commerce, projekt i budowa sklepów oraz stron internetowych, marketing automation i social media - w jednym zespole.',
    alternates: pageAlternates('/uslugi', 'pl', SITE_URL),
};

const leadServices = [
    { num: '01', title: 'Audyt e-commerce', href: '/uslugi/audyt-e-commerce', description: 'Sprzedaż, marża, technologia i praca zespołu. Raport i roadmapa w 5–7 dni roboczych, za stałą kwotę.', tags: ['Raport', 'Roadmapa', '5–7 dni roboczych'] },
    { num: '02', title: 'Zarządzanie e-commerce', href: '/uslugi/zarzadzanie-e-commerce', description: 'Prowadzimy e-commerce z zewnątrz: plan sprzedaży, marża, zespół, dostawcy i raportowanie wyników.', tags: ['Abonament', 'Plan i marża', 'Jeden zespół'] },
];

const services = [
    { num: '03', title: 'Sklepy internetowe', href: '/uslugi/e-commerce', description: 'Projektujemy i budujemy sklepy: headless, WooCommerce, Shopify, migracje i integracje z ERP.', tags: ['Headless', 'Migracje', 'Integracje'] },
    { num: '04', title: 'Strony internetowe', href: '/uslugi/strony-www', description: 'Strony firmowe, landing pages i portale z konkretną rolą w sprzedaży. Szybkie i gotowe pod SEO.', tags: ['Strony firmowe', 'Landing pages', 'Next.js'] },
    { num: '05', title: 'Marketing Automation', href: '/uslugi/marketing-automation', description: 'SALESmanago i scenariusze, które zarabiają na bazie klientów: koszyki, rekomendacje, reaktywacja.', tags: ['SALESmanago', 'Scenariusze', 'CRM'] },
    { num: '06', title: 'Social Media', href: '/uslugi/social-media', description: 'Content, kampanie i społeczność spięte z kalendarzem sprzedaży i ofertą.', tags: ['Strategia', 'Content', 'Kampanie'] },
];

const landingPages = [
    {
        title: 'Migracja WooCommerce do headless',
        href: '/uslugi/migracja-woocommerce-do-headless',
        description: 'Dla sklepów, które potrzebują wydajności, elastyczności i lepszej kontroli nad UX.',
    },
    {
        title: 'Wdrożenie SALESmanago',
        href: '/uslugi/wdrozenie-salesmanago',
        description: 'Zakres wdrożenia marketing automation z partnerem SALESmanago.',
    },
    {
        title: 'Tworzenie stron WWW cennik',
        href: '/uslugi/tworzenie-stron-www-cennik',
        description: 'Orientacyjny budżet i zakres strony WWW.',
    },
    {
        title: 'Strona firmowa cena',
        href: '/uslugi/strona-firmowa-cena',
        description: 'Koszt i zakres strony firmowej.',
    },
    {
        title: 'Headless WooCommerce',
        href: '/uslugi/headless-woocommerce',
        description: 'Przebudowa sklepu WooCommerce na nowy storefront.',
    },
];

const process = [
    { num: '01', title: 'Rozmowa wstępna', description: '15 minut. Sprawdzamy, czy audyt ma w Twoim przypadku sens biznesowy.' },
    { num: '02', title: 'Audyt', description: 'Wywiad, analiza danych i zaplecza. Raport i roadmapa w 5–7 dni roboczych.' },
    { num: '03', title: 'Zarządzanie', description: 'Prowadzimy e-commerce z zewnątrz w miesięcznym abonamencie: plan, marża, zespół, dostawcy.' },
    { num: '04', title: 'Budowa i wdrożenia', description: 'Sklepy, strony i zmiany z roadmapy realizuje ten sam zespół. AI skraca research i produkcję.', featured: true },
];

const faq = [
    { q: 'Od czego najlepiej zacząć?', a: 'Od audytu e-commerce. W 5–7 dni roboczych pokazuje, gdzie sklep traci sprzedaż, marżę i czas zespołu, i układa priorytety na dalej.' },
    { q: 'Czy musimy zamawiać zarządzanie, żeby zrobić audyt?', a: 'Nie. Roadmapa zostaje u Was i możecie wdrażać ją samodzielnie. Jeśli zdecydujecie się na stałą współpracę, koszt audytu odliczamy w pierwszym miesiącu.' },
    { q: 'Czy można zamówić sam sklep albo stronę, bez audytu?', a: 'Tak. Sklepy i strony internetowe projektujemy i budujemy także jako osobne projekty. To samo dotyczy marketing automation i social mediów.' },
    { q: 'Jak wygląda rola AI w projektach?', a: 'AI przyspiesza research, generowanie wariantów, development i optymalizację. Decyzje zostają po stronie ludzi — wiemy, kiedy i gdzie AI realnie pomaga.' },
];

export default function ServicesPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
    ]);
    const faqSchema = buildFaqSchema(faq.map(({ q, a }) => ({ question: q, answer: a })));

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, faqSchema]} />
            <PageHero
                eyebrow="Usługi"
                title="Audytujemy, prowadzimy i budujemy e‑commerce."
                description="Audytujemy sklepy internetowe i prowadzimy e-commerce marek z zewnątrz. Projektujemy też i budujemy sklepy oraz strony internetowe — jako osobne projekty albo wykonanie roadmapy z audytu."
                cta={{ label: 'Zamów audyt e-commerce', href: '/uslugi/audyt-e-commerce#formularz' }}
                ctaSecondary={{ label: 'Zobacz zakres usług', href: '#zakres' }}
                right={
                    <div className="ct-grid-lines grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {[['Pierwszy krok', 'Audyt e-commerce w 5–7 dni roboczych'], ['Stała współpraca', 'Zarządzanie e-commerce z zewnątrz'], ['Budowa', 'Sklepy i strony internetowe'], ['Doświadczenie', 'Wiele branż, m.in. 5.10.15, Quiosque, Grupa Kapitałowa Monnari']].map(([label, val]) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{val}</span>
                            </div>
                        ))}
                    </div>
                }
            />

            <Section id="zakres" eyebrow="Audyt i zarządzanie" title="Dwie usługi, od których zaczyna się większość współprac." border={false}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {leadServices.map((s) => (
                        <Link key={s.href} href={s.href} className="ct-card-hover flex flex-col gap-6 no-underline" style={{ padding: 'clamp(24px, 3vw, 36px)', background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)' }}>{s.num}</span>
                            <div className="flex flex-col gap-3">
                                <h3 style={{ margin: 0, fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{s.title}</h3>
                                <p className="ct-body" style={{ fontSize: 16, maxWidth: '48ch' }}>{s.description}</p>
                            </div>
                            <div className="mt-auto flex flex-wrap items-center gap-2">
                                {s.tags.map(t => <span key={t} className="ct-pill">{t}</span>)}
                                <span className="ct-mono ml-auto" style={{ fontSize: 18, color: 'var(--accent)' }} aria-hidden="true">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section id="wdrozenia" eyebrow="Projektujemy i budujemy" title="Sklepy i strony internetowe — także jako osobne projekty." className="scroll-mt-20">
                <div className="flex flex-col" style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {services.map((s, i) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="ct-service-row flex flex-col gap-4 bg-white p-6 text-[var(--text)] no-underline lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-7"
                            style={{ borderTop: i > 0 ? '1px solid var(--line)' : undefined }}
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-6">
                                <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)', flexShrink: 0 }}>{s.num}</span>
                                <div className="flex flex-col gap-1">
                                    <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.4px', color: 'var(--text)' }}>{s.title}</span>
                                    <span className="ct-body" style={{ fontSize: 15 }}>{s.description}</span>
                                </div>
                            </div>
                            <div className="flex flex-shrink-0 flex-wrap gap-2 lg:ml-auto">
                                {s.tags.map(t => <span key={t} className="ct-pill">{t}</span>)}
                            </div>
                            <span className="ct-mono" style={{ fontSize: 18, color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>
            </Section>

            <Section tint eyebrow="Konkretne potrzeby" title="Sklepy i strony, o które pytacie najczęściej.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {landingPages.map((page) => (
                        <Link key={page.href} href={page.href} className="ct-card-hover flex items-start justify-between gap-6 no-underline" style={{ padding: 24, background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}>
                            <div className="flex flex-col gap-2">
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, letterSpacing: '-0.3px' }}>{page.title}</h3>
                                <p className="ct-body" style={{ fontSize: 15, maxWidth: '52ch' }}>{page.description}</p>
                            </div>
                            <span className="ct-mono" style={{ fontSize: 18, color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Jak pracujemy" title="Od rozmowy do stałej współpracy.">
                <ol className="ct-grid-lines grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {process.map((step) => (
                        <li key={step.num} className="flex flex-col gap-2.5" style={{ padding: '28px 24px', background: step.featured ? 'var(--panel)' : undefined }}>
                            <span className="ct-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', marginBottom: 24 }}>{step.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{step.title}</h3>
                            <p className="ct-body">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            {/* FAQ */}
            <Section tint eyebrow="FAQ" title="Najczęstsze pytania.">
                <div className="ct-grid-lines grid-cols-1 lg:grid-cols-2">
                    {faq.map(item => (
                        <div key={item.q} className="flex flex-col gap-2.5" style={{ padding: '24px 28px' }}>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{item.q}</h3>
                            <p className="ct-body">{item.a}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTASection />
        </main>
    );
}
