import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import FAQAccordion from '@/components/FAQAccordion';
import Card from '@/components/ui/Card';
import PageHero from '@/components/ui/PageHero';
import SceneWithLegend from '@/components/scene3d/SceneWithLegend';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Marketing Automation dla e-commerce i firm | SALESmanago, scenariusze, CRM',
    description: 'Wdrażamy SALESmanago i scenariusze, które pracują na bazie klientów: odzyskiwanie porzuconych zakupów, rekomendacje, reaktywacja, lead nurturing. Mierzone przychodem, nie liczbą wysyłek.',
    alternates: { canonical: `${SITE_URL}/uslugi/marketing-automation` },
    openGraph: {
        title: 'Marketing Automation dla e-commerce i firm | CreativeTrust',
        description: 'SALESmanago, scenariusze sprzedażowe, segmentacja i integracje CRM. Automatyzacja mierzona przychodem.',
        url: `${SITE_URL}/uslugi/marketing-automation`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Wdrożenie SALESmanago', description: 'Konfiguracja platformy, tracking, integracja ze sklepem i CRM, segmenty i pierwsze scenariusze gotowe do działania.' },
    { num: '02', title: 'Scenariusze e-commerce', description: 'Porzucony koszyk, porzucone przeglądanie, rekomendacje, cross-sell i reaktywacja klientów, którzy przestali kupować.' },
    { num: '03', title: 'Lead nurturing', description: 'Sekwencje i scoring dla sprzedaży B2B i usług: kontakt trafia do handlowca wtedy, gdy jest gotowy na rozmowę.' },
    { num: '04', title: 'Segmentacja i personalizacja', description: 'Treści na stronie i w wiadomościach dopasowane do zachowań, historii zakupów i wartości klienta.' },
    { num: '05', title: 'Integracje CRM', description: 'Pipedrive, HubSpot, Salesforce — dane marketingowe trafiają tam, gdzie pracuje sprzedaż.' },
    { num: '06', title: 'Analityka i raportowanie', description: 'Przychód z automatyzacji, a nie tylko otwarcia i kliknięcia.' },
];

const facts = [
    { label: 'Platforma', value: 'partner SALESmanago od 2024 roku' },
    { label: 'Kanały', value: 'e-mail, SMS, web push' },
    { label: 'Punkt wyjścia', value: 'dane, zgody i segmenty' },
    { label: 'Miara sukcesu', value: 'przychód z bazy klientów' },
];

const usecases = [
    { title: 'E-commerce', description: 'Koszyk porzucony, rekomendacje produktowe, reaktywacja klientów i cross-sell.' },
    { title: 'B2B / SaaS', description: 'Lead scoring, nurturing przed rozmową handlową, onboarding i retencja.' },
    { title: 'Usługi lokalne', description: 'Przypomnienia, upsell po wizycie, zbieranie opinii i kampanie sezonowe.' },
    { title: 'Edukacja i szkolenia', description: 'Automatyczny onboarding kursantów, przypomnienia i kampanie upsell.' },
];

const process = [
    { num: '01', title: 'Audyt', description: 'Mapujemy obecny stack, dane, lejki i punkty styku. Identyfikujemy największe straty.' },
    { num: '02', title: 'Architektura', description: 'Projektujemy lejki, segmentację i logikę automatyzacji — zanim ktokolwiek kliknie "uruchom".' },
    { num: '03', title: 'Wdrożenie', description: 'Konfigurujemy platformę, integrujemy CRM i uruchamiamy pierwsze automatyzacje.' },
    { num: '04', title: 'Optymalizacja', description: 'Testujemy, mierzymy i rozbudowujemy. Pętla danych → decyzja → wynik.', featured: true },
];

const faqs = [
    {
        question: 'Od czego zacząć wdrożenie marketing automation?',
        answer: 'Od audytu danych, źródeł leadów, zgód i procesu sprzedaży. Dopiero potem wybieramy scenariusze oraz konfigurację platformy.',
    },
    {
        question: 'Czy marketing automation ma sens w B2B?',
        answer: 'Tak, szczególnie przy dłuższym procesie sprzedaży. Pomaga segmentować zapytania, prowadzić lead nurturing i przekazywać sprzedaży lepiej przygotowane kontakty.',
    },
    {
        question: 'Czy możecie wdrożyć SALESmanago?',
        answer: 'Tak. Wdrażamy tracking, segmentację, scenariusze, integracje CRM oraz raportowanie, a następnie rozwijamy automatyzacje na podstawie danych.',
    },
];

export default function MarketingAutomationPage() {
    const serviceSchema = buildServiceSchema({
        name: 'Marketing Automation',
        description:
            'Automatyzacja marketingu, SALESmanago, lejki, CRM i kampanie oparte na danych.',
        url: `${SITE_URL}/uslugi/marketing-automation`,
        serviceType: 'Marketing automation',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[serviceSchema, faqSchema]} />

            {/* Hero */}
            <PageHero
                eyebrow="Marketing Automation"
                title={<>Automatyzacja, która zarabia na <span style={{ color: 'var(--accent)' }}>bazie klientów.</span></>}
                description="Wdrażamy SALESmanago i scenariusze, które pracują na klientach, których już masz: porzucone koszyki, rekomendacje, reaktywacja, lead nurturing. Mierzymy je przychodem, a nie liczbą wysłanych wiadomości."
                cta={{ label: 'Omów wdrożenie', href: '/kontakt' }}
                right={
                    <>
                    <SceneWithLegend id="automation-flow" label="Automatyzacje w procesie" />
                    <div className="ct-panel lg:hidden" style={{ padding: 'clamp(24px, 3vw, 32px)' }}>
                        <div className="ct-meta" style={{ color: 'var(--accent)', marginBottom: 16 }}>{'// status: active'}</div>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {['lead scoring', 'email nurturing', 'CRM sync', 'AI content', 'behavioral triggers', 'real-time personalization'].map((item, i) => (
                                <li key={item} className="flex items-center gap-3" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                    <span className="ct-bullet" aria-hidden="true" style={{ animation: `ctpulse 2s ease-in-out ${i * 0.3}s infinite` }} />
                                    <span className="ct-mono" style={{ fontSize: 14, color: 'var(--text)' }}>{item}</span>
                                    <span className="ct-mono" style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)' }}>running</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </>
                }
            />

            {/* Stats */}
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

            {/* Services */}
            <Section id="oferta" eyebrow="Co robimy" title="Zakres automatyzacji.">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(s => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500 }}>{s.title}</h3>
                            <p className="ct-body">{s.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Use cases */}
            <Section tint eyebrow="Zastosowania" title="Dla kogo to działa.">
                <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                    {usecases.map(u => (
                        <div key={u.title} className="flex flex-col gap-2" style={{ padding: '20px 0', borderTop: '1px solid var(--line-strong)' }}>
                            <div className="flex items-center gap-2.5">
                                <span className="ct-bullet" aria-hidden="true" />
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{u.title}</h3>
                            </div>
                            <p className="ct-body" style={{ fontSize: 15 }}>{u.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Process */}
            <Section eyebrow="Proces" title="Od audytu do automatyzacji.">
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

            <Section tint eyebrow="Wiedza i wdrożenie" title="Zobacz, jak połączyć automation z procesem sprzedaży.">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card
                        href="/blog/wdrozenie-marketing-automation-krok-po-kroku"
                        title="Wdrożenie marketing automation krok po kroku"
                        description="Przeczytaj, jak uporządkować dane, zgody, segmenty i pierwsze scenariusze."
                    />
                    <Card
                        href="/uslugi/wdrozenie-salesmanago"
                        title="Wdrożenie SALESmanago"
                        description="Poznaj zakres wdrożenia — od trackingu i integracji po lead nurturing."
                    />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o marketing automation.">
                <div style={{ maxWidth: 840 }}>
                    <FAQAccordion items={faqs} />
                </div>
            </Section>

            <Section tint>
                <InlineCTA
                    title="Automatyzacja to jeden z elementów wyniku sklepu"
                    text="Audyt e-commerce pokazuje, ile sprzedaży i marży ucieka w całym lejku — i czy marketing automation jest pierwszą rzeczą do zrobienia."
                    cta={{ label: 'Zobacz audyt e-commerce', href: '/uslugi/audyt-e-commerce' }}
                />
            </Section>

            <CTASection />
        </main>
    );
}
