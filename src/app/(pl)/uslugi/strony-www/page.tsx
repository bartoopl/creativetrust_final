import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Strony internetowe dla marek i firm | Projekt i wdrożenie',
    description: 'Projektujemy i wdrażamy strony internetowe: firmowe, produktowe, landing pages i portale. Zaprojektowane pod konkretną rolę w sprzedaży, szybkie i łatwe w edycji. Sprawdź zakres i cennik.',
    alternates: pageAlternates('/uslugi/strony-www', 'pl', SITE_URL),
    openGraph: {
        title: 'Strony internetowe dla marek i firm | CreativeTrust',
        description: 'Strony WWW zaprojektowane pod sprzedaż, SEO i wydajność. Next.js, headless CMS — jeden zespół od projektu po wdrożenie.',
        url: `${SITE_URL}/uslugi/strony-www`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const types = [
    { num: '01', title: 'Strony firmowe', description: 'Serwis marki z jasną ofertą i ścieżką do kontaktu. Projektowany pod zapytania i SEO, nie pod sam wygląd.', tags: ['Headless CMS', 'Next.js', 'Sanity'] },
    { num: '02', title: 'Landing pages', description: 'Strony pod kampanie, produkty i wydarzenia, spięte z analityką i formularzem. Wdrożenie liczone w tygodniach.', tags: ['Kampanie', 'Testy A/B', 'Szybkie wdrożenie'] },
    { num: '03', title: 'Strony marek przy sklepie', description: 'Serwis korporacyjny, B2B albo inwestorski obok e-commerce — spójny z marką i sklepem.', tags: ['Brand', 'B2B', 'Relacje inwestorskie'] },
    { num: '04', title: 'Portale i platformy', description: 'Rozbudowane serwisy z logowaniem, panelem i logiką biznesową.', tags: ['Panel klienta', 'Dashboard', 'API'] },
];

const features = [
    { title: 'Wydajność powyżej 90', description: 'Core Web Vitals i PageSpeed Score > 90. Szybkość to SEO i konwersja — budujemy od podstaw pod wyniki.' },
    { title: 'SEO on-page', description: 'Architektura semantyczna, meta tagi, dane strukturalne, sitemap i canonicale ustawione od pierwszego dnia.' },
    { title: 'Headless CMS', description: 'Sanity, Contentful lub Strapi — treści edytujesz bez dotykania kodu i bez czekania na developera.' },
    { title: 'Responsywność i dostępność', description: 'Poprawnie na każdym urządzeniu, zgodnie z WCAG 2.1 AA.' },
    { title: 'Pomiar od pierwszego dnia', description: 'Zdarzenia, formularze i źródła zapytań w analityce. Wiadomo, co strona daje sprzedaży.' },
    { title: 'Wsparcie po wdrożeniu', description: 'Opiekujemy się stroną po starcie. Aktualizacje, optymalizacje, rozbudowa.' },
];

const tech = ['Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Figma', 'GTM'];

const process = [
    { num: '01', title: 'Cel i rola strony', description: 'Co strona ma dawać sprzedaży i komu. Analiza oferty, odbiorców i konkurencji.' },
    { num: '02', title: 'Design', description: 'Makiety i UI w Figmie. Prototyp klikamy, zanim powstanie linia kodu.' },
    { num: '03', title: 'Development', description: 'Headless, wydajnie i pod SEO. AI skraca produkcję, ludzie pilnują jakości.' },
    { num: '04', title: 'Start i rozwój', description: 'Wdrożenie, testy, monitoring. Po starcie optymalizujemy na podstawie danych.', featured: true },
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
                title={<>Strony internetowe z konkretną rolą <span style={{ color: 'var(--accent)' }}>w sprzedaży.</span></>}
                description="Projektujemy i wdrażamy strony dla marek i firm — od landing page po rozbudowany portal. Każda ma jasne zadanie: zbierać zapytania, wspierać sklep albo otwierać nowy rynek. Szybkie, gotowe pod SEO i łatwe w edycji."
                cta={{ label: 'Wycena projektu', href: '/kontakt' }}
                ctaSecondary={{ label: 'Zobacz cennik', href: '/uslugi/tworzenie-stron-www-cennik' }}
            >
                <div className="ct-grid-lines grid-cols-2 sm:grid-cols-4" style={{ marginTop: 16, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {[['150+', 'projektów'], ['15+', 'lat na rynku'], ['90+', 'PageSpeed'], ['od 3 500 zł', 'landing page, netto']].map(([val, label]) => (
                        <div key={label} className="flex flex-col gap-1.5" style={{ padding: '18px 20px' }}>
                            <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-1px', lineHeight: 1 }}>{val}</span>
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
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{t.title}</h3>
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
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{f.title}</h3>
                            </div>
                            <p className="ct-body" style={{ fontSize: 15 }}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Stack */}
            <Section eyebrow="Tech stack" title="Technologie, które wybieramy nie bez powodu.">
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
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{step.title}</h3>
                            <p className="ct-body">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section tint>
                <InlineCTA
                    title="Strona to część większego e-commerce?"
                    text="Jeśli obok strony działa sklep, zacznij od audytu e-commerce: pokazuje, co w pierwszej kolejności poprawi sprzedaż i marżę."
                    cta={{ label: 'Zobacz audyt e-commerce', href: '/uslugi/audyt-e-commerce' }}
                />
            </Section>

            <CTASection />
        </main>
    );
}
