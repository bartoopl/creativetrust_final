import Link from 'next/link';
import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Usługi — CreativeTrust | Branding, WWW, e-commerce, AI i automatyzacja',
    description: 'Strategia marki, web design, e-commerce, marketing automation i AI — w jednym zespole. Pracujemy od diagnozy po wdrożenie i rozwój. Wyniki, nie obietnice.',
    alternates: { canonical: `${SITE_URL}/uslugi` },
};

const services = [
    { num: '01', title: 'Branding', href: '/uslugi/branding', description: 'Pozycjonowanie, narracja i identyfikacja wizualna, które się bronią.', tags: ['Strategia marki', 'Logo', 'Rebranding'] },
    { num: '02', title: 'Strony WWW', href: '/uslugi/strony-www', description: 'Strony i landing pages zaprojektowane pod konwersję, SEO i szybkość.', tags: ['Strony firmowe', 'Landing pages', 'Next.js'] },
    { num: '03', title: 'E-commerce', href: '/uslugi/e-commerce', description: 'Sklepy headless i migracje, które sprzedają i skalują się bez bólu.', tags: ['Headless', 'Migracje', 'Integracje'] },
    { num: '04', title: 'Social Media', href: '/uslugi/social-media', description: 'Komunikacja pod zasięg, spójność i sprzedaż — nie tylko pod publikacje.', tags: ['Strategia', 'Content', 'Analityka'] },
    { num: '05', title: 'Marketing Automation', href: '/uslugi/marketing-automation', description: 'Lejki, CRM i kampanie sterowane danymi i AI. Działają, kiedy śpisz.', tags: ['SALESmanago', 'Lead nurturing', 'AI'] },
];

const process = [
    { num: '01', title: 'Diagnoza', description: 'Audyt, dane, cele. AI przyspiesza research i analizę konkurencji.' },
    { num: '02', title: 'Projekt', description: 'Strategia i design. Warianty generujemy i testujemy szybciej niż kiedykolwiek.' },
    { num: '03', title: 'Wdrożenie', description: 'Development z asystą AI. Krótszy time-to-market, mniej błędów.' },
    { num: '04', title: 'Rozwój', description: 'Optymalizacja w pętli. Modele uczą się na Twoich danych i wynikach.', featured: true },
];

const faq = [
    { q: 'Od czego najlepiej zacząć?', a: 'Najczęściej od diagnozy: marka, strona, sklep albo automatyzacja. Wybór zależy od tego, gdzie dziś tracisz najwięcej potencjału.' },
    { q: 'Czy łączycie kilka usług w jednym projekcie?', a: 'Tak. To zwykle lepszy model niż oddzielne zamawianie brandingu, WWW i komunikacji u różnych wykonawców.' },
    { q: 'Jak wygląda rola AI w projektach?', a: 'AI przyspiesza research, generowanie wariantów, development i optymalizację. Decyzje zostają po stronie ludzi — wiemy, kiedy i gdzie AI realnie pomaga.' },
    { q: 'Czy możecie zacząć od audytu?', a: 'Tak. Audyt jest dobrym punktem startowym, jeśli potrzebujesz decyzji, co robić dalej i w jakiej kolejności.' },
];

export default function ServicesPage() {
    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: 64, alignItems: 'end' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>USŁUGI</div>
                        <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px' }}>
                            Jeden zespół. Pełen zakres.
                        </h1>
                        <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 36px' }}>
                            Strategia, design, development i automatyzacja AI w jednym procesie — bez przekazywania pałeczki między agencjami.
                        </p>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                            <Link href="/kontakt" className="ct-cta">
                                Umów konsultację
                                <span className="ct-badge"><span className="ct-arrows"><span>→</span><span>→</span></span></span>
                            </Link>
                            <Link href="#zakres" className="ct-ghost">
                                <span className="ct-dot" />
                                Zobacz zakres
                                <span className="ct-tail">↓</span>
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, overflow: 'hidden', borderRadius: 20, border: '1px solid var(--line)' }}>
                        {[['Priorytet', 'Jasny przekaz i sprawny proces'], ['Efekt', 'Mniej tarcia, więcej wyniku'], ['Model', 'Strategia + wdrożenie'], ['Zakres', 'Brand, web, commerce, AI']].map(([label, val]) => (
                            <div key={label} style={{ background: 'var(--panel)', padding: '20px 22px' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>{val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services list */}
            <section id="zakres" style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>ZAKRES USŁUG</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Moduły, które można uruchamiać osobno lub łączyć.</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {services.map((s) => (
                            <Link key={s.href} href={s.href} className="ct-service-row" style={{ borderRadius: 18, border: '1px solid var(--line)', background: 'var(--panel)', padding: '24px 28px', textDecoration: 'none', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1, minWidth: 0 }}>
                                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', flexShrink: 0 }}>{s.num}</span>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 22, marginBottom: 4 }}>{s.title}</div>
                                        <div style={{ color: 'var(--muted)', fontSize: 15 }}>{s.description}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
                                    {s.tags.map(t => (
                                        <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 6 }}>{t}</span>
                                    ))}
                                </div>
                                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 18, color: 'var(--accent)', flexShrink: 0 }}>→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>JAK PRACUJEMY</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Proces napędzany przez AI.</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
                        {process.map((step) => (
                            <div key={step.num} style={{ borderRadius: 18, padding: '28px 24px', background: step.featured ? 'linear-gradient(160deg, color-mix(in srgb, var(--accent) 16%, var(--panel)), var(--panel))' : 'var(--panel)', border: step.featured ? '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))' : '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', marginBottom: 48 }}>{step.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, margin: '0 0 8px' }}>{step.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>FAQ</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Najczęstsze pytania.</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
                        {faq.map(item => (
                            <div key={item.q} style={{ borderRadius: 18, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 12px' }}>{item.q}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: 0 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection />
        </main>
    );
}
