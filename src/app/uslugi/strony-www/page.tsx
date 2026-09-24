import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';

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
    const serviceSchema = buildServiceSchema({
        name: 'Strony WWW',
        description:
            'Strony internetowe, landing pages i serwisy projektowane pod konwersję, SEO i wydajność.',
        url: `${SITE_URL}/uslugi/strony-www`,
        serviceType: 'Projektowanie stron WWW',
    });

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={serviceSchema} />

            {/* Hero */}
            <PageHero
                eyebrow="Strony WWW"
                title={<>Strony, które przyciągają klientów i <span style={{ color: 'var(--accent)' }}>konwertują.</span></>}
                description="Projektujemy i wdrażamy strony WWW oparte na danych — od landing page po rozbudowany portal. Headless, szybkie, SEO-ready. Czas realizacji skrócony o 30–40% dzięki AI."
                cta={{ label: 'Wycena projektu', href: '/kontakt' }}
            >
                <div className="ct-grid-lines grid-cols-2 sm:grid-cols-4" style={{ marginTop: 16, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {[['150+', 'stron'], ['15', 'lat'], ['90+', 'PageSpeed'], ['30-40%', 'szybciej']].map(([val, label]) => (
                        <div key={label} className="flex flex-col gap-1.5" style={{ padding: '18px 20px' }}>
                            <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-1px', lineHeight: 1 }}>{val}</span>
                            <span className="ct-meta">{label}</span>
                        </div>
                    ))}
                </div>
            </PageHero>

            {/* Types */}
            <Section id="oferta" eyebrow="Typy projektów" title="Co możemy zbudować." border={false}>
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2">
                    {types.map(t => (
                        <div key={t.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{t.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{t.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15, flex: 1 }}>{t.description}</p>
                            <div className="flex flex-wrap gap-2" style={{ marginTop: 6 }}>
                                {t.tags.map(tag => <span key={tag} className="ct-pill">{tag}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Features */}
            <Section tint eyebrow="Standard projektu" title="Co dostajesz w każdym projekcie.">
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

            {/* Stack */}
            <Section eyebrow="Tech stack" title="Technologie, które wybieramy z powodu.">
                <div className="flex flex-wrap gap-2.5">
                    {tech.map(t => (
                        <span key={t} className="ct-pill" style={{ fontSize: 12, padding: '8px 14px', color: 'var(--text)' }}>{t}</span>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Proces" title="Od briefu do gotowej strony.">
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
