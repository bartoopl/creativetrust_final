import Link from 'next/link';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildFaqSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Usługi — CreativeTrust | WWW, e-commerce, AI i automatyzacja',
    description: 'Web design, e-commerce, marketing automation i AI — w jednym zespole. Pracujemy od diagnozy po wdrożenie i rozwój. Wyniki, nie obietnice.',
    alternates: { canonical: `${SITE_URL}/uslugi` },
};

const services = [
    { num: '01', title: 'Strony WWW', href: '/uslugi/strony-www', description: 'Strony i landing pages zaprojektowane pod konwersję, SEO i szybkość.', tags: ['Strony firmowe', 'Landing pages', 'Next.js'] },
    { num: '02', title: 'E-commerce', href: '/uslugi/e-commerce', description: 'Sklepy headless i migracje, które sprzedają i skalują się bez bólu.', tags: ['Headless', 'Migracje', 'Integracje'] },
    { num: '03', title: 'Social Media', href: '/uslugi/social-media', description: 'Komunikacja pod zasięg, spójność i sprzedaż — nie tylko pod publikacje.', tags: ['Strategia', 'Content', 'Analityka'] },
    { num: '04', title: 'Marketing Automation', href: '/uslugi/marketing-automation', description: 'Lejki, CRM i kampanie sterowane danymi i AI. Działają, kiedy śpisz.', tags: ['SALESmanago', 'Lead nurturing', 'AI'] },
];

const landingPages = [
    {
        title: 'Migracja WooCommerce do headless',
        href: '/uslugi/migracja-woocommerce-do-headless',
        description: 'Fraza dla sklepów, które potrzebują wydajności, elastyczności i lepszej kontroli nad UX.',
    },
    {
        title: 'Wdrożenie SALESmanago',
        href: '/uslugi/wdrozenie-salesmanago',
        description: 'Landing pod zapytania o partnera i implementację marketing automation.',
    },
    {
        title: 'Tworzenie stron WWW cennik',
        href: '/uslugi/tworzenie-stron-www-cennik',
        description: 'Wycena strony WWW dla osób szukających orientacyjnego budżetu i zakresu.',
    },
    {
        title: 'Strona firmowa cena',
        href: '/uslugi/strona-firmowa-cena',
        description: 'Landing pod zapytania o koszt i zakres strony firmowej.',
    },
    {
        title: 'Headless WooCommerce',
        href: '/uslugi/headless-woocommerce',
        description: 'Landing pod frazy związane z przebudową sklepu WooCommerce.',
    },
];

const process = [
    { num: '01', title: 'Diagnoza', description: 'Audyt, dane, cele. AI przyspiesza research i analizę konkurencji.' },
    { num: '02', title: 'Projekt', description: 'Strategia i design. Warianty generujemy i testujemy szybciej niż kiedykolwiek.' },
    { num: '03', title: 'Wdrożenie', description: 'Development z asystą AI. Krótszy time-to-market, mniej błędów.' },
    { num: '04', title: 'Rozwój', description: 'Optymalizacja w pętli. Modele uczą się na Twoich danych i wynikach.', featured: true },
];

const faq = [
    { q: 'Od czego najlepiej zacząć?', a: 'Najczęściej od diagnozy: marka, strona, sklep albo automatyzacja. Wybór zależy od tego, gdzie dziś tracisz najwięcej potencjału.' },
    { q: 'Czy łączycie kilka usług w jednym projekcie?', a: 'Tak. To zwykle lepszy model niż oddzielne zamawianie WWW, e-commerce i komunikacji u różnych wykonawców.' },
    { q: 'Jak wygląda rola AI w projektach?', a: 'AI przyspiesza research, generowanie wariantów, development i optymalizację. Decyzje zostają po stronie ludzi — wiemy, kiedy i gdzie AI realnie pomaga.' },
    { q: 'Czy możecie zacząć od audytu?', a: 'Tak. Audyt jest dobrym punktem startowym, jeśli potrzebujesz decyzji, co robić dalej i w jakiej kolejności.' },
];

export default function ServicesPage() {
    const faqSchema = buildFaqSchema(faq.map(({ q, a }) => ({ question: q, answer: a })));

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={faqSchema} />
            <PageHero
                eyebrow="Usługi"
                title="Jeden zespół. Pełen zakres."
                description="Strategia, design, development i automatyzacja AI w jednym procesie — bez przekazywania pałeczki między agencjami."
                cta={{ label: 'Umów konsultację', href: '/kontakt' }}
                ctaSecondary={{ label: 'Zobacz zakres usług', href: '#zakres' }}
                right={
                    <div className="ct-grid-lines grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {[['Priorytet', 'Jasny przekaz i sprawny proces'], ['Efekt', 'Mniej tarcia, więcej wyniku'], ['Model', 'Strategia + wdrożenie'], ['Zakres', 'Brand, web, commerce, AI']].map(([label, val]) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.5 }}>{val}</span>
                            </div>
                        ))}
                    </div>
                }
            />

            <Section id="zakres" eyebrow="Zakres usług" title="Moduły, które można uruchamiać osobno lub łączyć." border={false}>
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
                                    <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.4px', color: 'var(--text)' }}>{s.title}</span>
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

            <Section tint eyebrow="Landing pages SEO" title="Strony pod konkretne frazy i intencje zakupowe.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {landingPages.map((page) => (
                        <Link key={page.href} href={page.href} className="ct-card-hover flex items-start justify-between gap-6 no-underline" style={{ padding: 24, background: '#fff', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}>
                            <div className="flex flex-col gap-2">
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px' }}>{page.title}</h3>
                                <p className="ct-body" style={{ fontSize: 15, maxWidth: '52ch' }}>{page.description}</p>
                            </div>
                            <span className="ct-mono" style={{ fontSize: 18, color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true">→</span>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Jak pracujemy" title="Proces napędzany przez AI.">
                <ol className="ct-grid-lines grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {process.map((step) => (
                        <li key={step.num} className="flex flex-col gap-2.5" style={{ padding: '28px 24px', background: step.featured ? 'var(--panel)' : undefined }}>
                            <span className="ct-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)', marginBottom: 24 }}>{step.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{step.title}</h3>
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
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.q}</h3>
                            <p className="ct-body">{item.a}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTASection />
        </main>
    );
}
