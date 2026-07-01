import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import NotchedButton from '@/components/ui/NotchedButton';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Tworzenie stron internetowych — CreativeTrust | Szybkie, skuteczne, AI-assisted',
    description: 'Projektujemy i wdrażamy strony WWW, które generują leady i sprzedają. Headless, Next.js, performance. Krótszy time-to-market dzięki AI. Sprawdź zakres.',
    alternates: { canonical: `${SITE_URL}/uslugi/strony-www` },
    openGraph: {
        title: 'Tworzenie stron internetowych dla firm | CreativeTrust',
        description: 'Strony WWW zaprojektowane pod konwersję, SEO i performance. Headless, Next.js, UX — jeden zespół od konceptu po wdrożenie.',
        url: `${SITE_URL}/uslugi/strony-www`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const types = [
    { num: '01', title: 'Strony firmowe', description: 'Wizytówka marki zaprojektowana pod konwersję i SEO. Pracuje przez całą dobę.', tags: ['Headless CMS', 'Next.js', 'Sanity'] },
    { num: '02', title: 'Landing pages', description: 'Strony pod kampanie, produkty i eventy. Czas do wdrożenia: tygodnie, nie miesiące.', tags: ['High conversion', 'A/B ready', 'Szybkie'] },
    { num: '03', title: 'Portale i platformy', description: 'Rozbudowane serwisy z autentykacją, dashboardem i logiką biznesową.', tags: ['SaaS', 'Dashboard', 'API'] },
    { num: '04', title: 'Strony produktowe', description: 'Showcase produktu lub usługi, który sprzedaje — storytelling + CTA.', tags: ['Storytelling', 'Video', 'CTA'] },
];

const features = [
    { title: 'Wydajność powyżej 90', description: 'Core Web Vitals i PageSpeed Score > 90. Szybkość to SEO i konwersja — budujemy od podstaw pod wyniki.' },
    { title: 'SEO on-page', description: 'Architektura semantyczna, meta tagi, schemat org, sitemap i canonicale ustawione od pierwszego dnia.' },
    { title: 'Headless CMS', description: 'Sanity, Contentful lub Strapi — treści edytujesz bez dotykania kodu. Oddzielamy logikę od designu.' },
    { title: 'Responsive & accessible', description: 'Wygląda świetnie na każdym urządzeniu. WCAG 2.1 AA. Dostępność nie jest opcją.' },
    { title: 'AI-assisted development', description: 'Generujemy i testujemy komponenty szybciej. Time-to-market skrócony o 30–40% względem tradycyjnego procesu.' },
    { title: 'Wsparcie po wdrożeniu', description: 'Opiekujemy się stroną po starcie. Aktualizacje, optymalizacje, rozbudowa.' },
];

const tech = ['Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Figma', 'GTM'];

const process = [
    { num: '01', title: 'Discovery', description: 'Analiza celów, grupy docelowej i konkurencji. AI przyspiesza research.' },
    { num: '02', title: 'Design', description: 'Wireframes i UI w Figma. Prototyp klikamy zanim napiszemy linię kodu.' },
    { num: '03', title: 'Development', description: 'Headless, performant, SEO-ready. AI-assisted coding — szybciej i mniej błędów.' },
    { num: '04', title: 'Launch & wzrost', description: 'Wdrożenie, testy, monitoring. Optymalizujemy po starcie na podstawie danych.', featured: true },
];

export default function WebsitesPage() {
    return (
        <main style={{ minHeight: '100vh' }}>

            {/* Hero */}
            <section style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }}>
                <div style={{ maxWidth: 820 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 20 }}>
                        STRONY WWW
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5.2vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.045em', margin: '0 0 18px' }}>
                        Strony, które przyciągają klientów i <span style={{ color: 'var(--lime)' }}>konwertują.</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--muted)', maxWidth: '54ch', margin: '0 0 32px' }}>
                        Projektujemy i wdrażamy strony WWW oparte na danych — od landing page po rozbudowany portal. Headless, szybkie, SEO-ready. Czas realizacji skrócony o 30–40% dzięki AI.
                    </p>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
                        <NotchedButton href="/kontakt" variant="primary-light">
                            Wycena projektu
                        </NotchedButton>
                    </div>
                    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                        {[['150+', 'stron'], ['15', 'lat'], ['90+', 'PageSpeed'], ['30-40%', 'szybciej']].map(([val, label]) => (
                            <div key={label}>
                                <div style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--lime)' }}>{val}</div>
                                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Types */}
            <section id="oferta" style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 14 }}>TYPY PROJEKTÓW</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Co możemy zbudować.</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 md:grid-cols-2">
                        {types.map(t => (
                            <div key={t.num} style={{ borderRadius: 20, padding: '28px 24px', background: 'var(--panel)', border: '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--lime)', marginBottom: 28 }}>{t.num}</div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, margin: '0 0 10px' }}>{t.title}</h3>
                                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, margin: '0 0 20px' }}>{t.description}</p>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {t.tags.map(tag => (
                                        <span key={tag} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--muted)', border: '1px solid var(--line)', padding: '4px 10px', borderRadius: 6 }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 14 }}>STANDARD PROJEKTU</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Co dostajesz w każdym projekcie.</h2>
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

            {/* Stack */}
            <section style={{ borderTop: '1px solid var(--line)', background: 'var(--panel2)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 40 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 14 }}>TECH STACK</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>Technologie, które wybieramy z powodu.</h2>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {tech.map(t => (
                            <span key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 14, fontWeight: 500, color: 'var(--text)', border: '1px solid var(--line)', padding: '10px 18px', borderRadius: 10, background: 'var(--panel)' }}>{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section style={{ borderTop: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
                    <div style={{ marginBottom: 48 }}>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: 14 }}>PROCES</div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.06 }}>
                            Od briefu do gotowej strony.
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gap: 18 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map(step => (
                            <div key={step.num} style={{ borderRadius: 18, padding: '28px 24px', background: step.featured ? 'linear-gradient(160deg, color-mix(in srgb, var(--lime) 16%, var(--panel)), var(--panel))' : 'var(--panel)', border: step.featured ? '1px solid color-mix(in srgb, var(--lime) 40%, var(--line))' : '1px solid var(--line)' }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--lime)', marginBottom: 48 }}>{step.num}</div>
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
