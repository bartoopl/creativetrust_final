import { Metadata } from 'next';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import Card from '@/components/ui/Card';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Marketing Automation dla Firm — CreativeTrust | AI, SALESmanago, lejki, CRM',
    description: 'Automatyzacja marketingu oparta na danych i AI. Wdrażamy SALESmanago, budujemy lejki, integrujemy CRM i ustawiamy kampanie, które działają bez Twojej obecności.',
    alternates: { canonical: `${SITE_URL}/uslugi/marketing-automation` },
    openGraph: {
        title: 'Marketing Automation dla Firm | CreativeTrust',
        description: 'SALESmanago, lejki, lead nurturing, automatyczne kampanie. Działają, kiedy śpisz.',
        url: `${SITE_URL}/uslugi/marketing-automation`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const services = [
    { num: '01', title: 'Wdrożenie SALESmanago', description: 'Konfiguracja platformy, integracje, segmentacja i pierwsze automatyzacje gotowe do działania.' },
    { num: '02', title: 'Lead nurturing', description: 'Lejki, sekwencje e-mail i scoring leadów — kontakty dojrzewają do zakupu bez Twojej obecności.' },
    { num: '03', title: 'Personalizacja w czasie rzeczywistym', description: 'Treści na stronie i w e-mailach dopasowane do zachowań i segmentu odbiorcy.' },
    { num: '04', title: 'AI w kampaniach', description: 'Optymalizacja czasu wysyłki, predykcyjny scoring i generowanie treści wspomagane AI.' },
    { num: '05', title: 'Integracje CRM', description: 'Pipedrive, HubSpot, Salesforce — dane marketingowe trafiają tam, gdzie pracuje sprzedaż.' },
    { num: '06', title: 'Analityka i reporting', description: 'Dashboardy z metrykami, które mają znaczenie — nie tylko otwarcia i kliknięcia.' },
];

const stats = [
    { value: '3,2×', label: 'średni wzrost konwersji po wdrożeniu automatyzacji' },
    { value: '40%', label: 'leadów, które nie byłyby obsłużone ręcznie' },
    { value: '24/7', label: 'kampanie działają bez Twojego udziału' },
    { value: '15+', label: 'lat doświadczenia w marketingu B2B i B2C' },
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
                title={<>Kampanie, które działają <span style={{ color: 'var(--accent)' }}>kiedy śpisz.</span></>}
                description="Wdrażamy SALESmanago i budujemy automatyzacje oparte na danych i AI. Lejki, lead nurturing, personalizacja, integracje CRM — działają bez Twojego udziału."
                cta={{ label: 'Omów projekt', href: '/kontakt' }}
                right={
                    <div className="ct-panel" style={{ padding: 'clamp(24px, 3vw, 32px)' }}>
                        <div className="ct-meta" style={{ color: 'var(--accent)', marginBottom: 16 }}>// status: active</div>
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
                }
            />

            {/* Stats */}
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

            {/* Services */}
            <Section id="oferta" eyebrow="Co robimy" title="Zakres automatyzacji.">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(s => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>{s.title}</h3>
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
                                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{u.title}</h3>
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
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{step.title}</h3>
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

            <CTASection />
        </main>
    );
}
