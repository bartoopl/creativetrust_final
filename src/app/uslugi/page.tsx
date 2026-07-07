import Link from 'next/link';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

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
        title: 'Landing page Google Ads',
        href: '/uslugi/landing-page-google-ads',
        description: 'Strona pod kampanie płatne, reklamy i konkretne zapytania sprzedażowe.',
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
        title: 'Landing page pod reklamy',
        href: '/uslugi/landing-page-pod-reklamy',
        description: 'Strona pod kampanie płatne i lead generation.',
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
    return (
        <main style={{ minHeight: '100vh' }}>
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>Usługi</div>
                        <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: '0 0 18px', maxWidth: '12ch' }}>
                            Jeden zespół. Pełen zakres.
                        </h1>
                        <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(255,255,255,0.6)', maxWidth: '54ch', margin: '0 0 28px' }}>
                            Strategia, design, development i automatyzacja AI w jednym procesie — bez przekazywania pałeczki między agencjami.
                        </p>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                            <Link href="/kontakt" style={{ height: 40, display: 'inline-flex', alignItems: 'center', padding: 5, borderRadius: 4, background: '#fff', boxShadow: 'inset 0 0 0 1px #fff', color: '#202124', textDecoration: 'none', fontSize: 13.2, fontWeight: 500 }}>
                                Umów konsultację
                                <span style={{ width: 30, height: 30, marginLeft: 12, borderRadius: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)' }}>→</span>
                            </Link>
                            <Link href="#zakres" style={{ height: 40, display: 'inline-flex', alignItems: 'center', padding: '0 18px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.3)', color: '#fff', textDecoration: 'none', fontSize: 13.2, fontWeight: 500 }}>
                                Zobacz zakres usług
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4 }}>
                        {[['Priorytet', 'Jasny przekaz i sprawny proces'], ['Efekt', 'Mniej tarcia, więcej wyniku'], ['Model', 'Strategia + wdrożenie'], ['Zakres', 'Brand, web, commerce, AI']].map(([label, val]) => (
                            <div key={label} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px 22px', borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="last:border-r-0 last:border-b-0">
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 15.4, lineHeight: '24px', letterSpacing: '-0.32px' }}>{val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="zakres" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>ZAKRES USŁUG</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0 }}>Moduły, które można uruchamiać osobno lub łączyć.</h2>
                    </div>
                    <div className="flex flex-col gap-0">
                        {services.map((s) => (
                            <Link key={s.href} href={s.href} className="ct-service-row flex flex-col gap-4 border border-[rgba(0,0,0,0.08)] bg-white p-6 text-[var(--text)] no-underline lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:p-7" style={{ borderRadius: 4, marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1, minWidth: 0 }}>
                                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, color: 'rgba(0,0,0,0.4)', flexShrink: 0 }}>{s.num}</span>
                                    <div>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, marginBottom: 4, letterSpacing: '-0.8px' }}>{s.title}</div>
                                        <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px' }}>{s.description}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }} className="lg:ml-auto">
                                    {s.tags.map(t => (
                                        <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,0,0,0.08)', padding: '4px 10px', borderRadius: 4 }}>{t}</span>
                                    ))}
                                </div>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 18, color: '#000', flexShrink: 0 }}>→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>LANDING PAGES SEO</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0 }}>Strony pod konkretne frazy i intencje zakupowe.</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {landingPages.map((page) => (
                            <Link key={page.href} href={page.href} className="ct-service-row rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 no-underline transition-all hover:bg-white" style={{ marginBottom: 0 }}>
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, margin: '0 0 8px', letterSpacing: '-0.8px', color: 'var(--text)' }}>{page.title}</h3>
                                        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0, maxWidth: '52ch' }}>{page.description}</p>
                                    </div>
                                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 18, color: '#000', flexShrink: 0 }}>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>JAK PRACUJEMY</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.06 }}>Proces napędzany przez AI.</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {process.map((step) => (
                            <div key={step.num} style={{ borderRadius: 18, padding: '28px 24px', background: step.featured ? 'linear-gradient(160deg, color-mix(in srgb, var(--accent) 16%, var(--panel)), var(--panel))' : 'var(--panel)', border: step.featured ? '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))' : '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)', marginBottom: 38 }}>{step.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 8px' }}>{step.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '76px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.06 }}>Najczęstsze pytania.</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {faq.map(item => (
                            <div key={item.q} style={{ borderRadius: 18, padding: '24px 20px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 16, margin: '0 0 10px' }}>{item.q}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
