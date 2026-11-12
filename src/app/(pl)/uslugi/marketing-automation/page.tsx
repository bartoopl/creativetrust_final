import { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { InlineCTA } from '@/components/LandingBlocks';
import FAQAccordion from '@/components/FAQAccordion';
import PageHero from '@/components/ui/PageHero';
import SceneWithLegend from '@/components/scene3d/SceneWithLegend';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const pageTitle = 'Marketing automation dla e-commerce | SALESmanago';
const pageDescription =
    'Wdrażamy SALESmanago: porzucone koszyki, rekomendacje, reaktywacja i lead nurturing. Efekt mierzymy przychodem, nie liczbą wysyłek.';

export const metadata: Metadata = {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: pageAlternates('/uslugi/marketing-automation', 'pl', SITE_URL),
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${SITE_URL}/uslugi/marketing-automation`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
};

const facts = [
    { label: 'Platforma', value: 'partner SALESmanago od 2024 roku' },
    { label: 'Kanały', value: 'e-mail, SMS, web push' },
    { label: 'Punkt wyjścia', value: 'dane, zgody i segmenty' },
    { label: 'Miara sukcesu', value: 'przychód z bazy klientów' },
];

const proseStyle = { maxWidth: 860 };
const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' };

const faqs = [
    {
        question: 'Od czego zacząć wdrożenie marketing automation?',
        answer: 'Od audytu danych, źródeł leadów, zgód i procesu sprzedaży. Dopiero potem wybieramy scenariusze i konfigurację platformy. Start od kampanii kończy się wysyłką do bazy, której nikt nie zweryfikował.',
    },
    {
        question: 'Czy marketing automation ma sens w B2B?',
        answer: 'Tak, zwłaszcza przy dłuższym procesie sprzedaży. Pomaga segmentować zapytania, prowadzić nurturing i przekazywać handlowcom kontakty z kontekstem. Warunek jest jeden: CRM musi być źródłem prawdy o etapie sprzedaży.',
    },
    {
        question: 'Czy wdrażacie SALESmanago?',
        answer: 'Tak, jesteśmy partnerem SALESmanago od 2024 roku. Wdrażamy tracking, segmentację, scenariusze, integracje CRM i raportowanie, a potem rozwijamy automatyzacje na podstawie danych.',
    },
    {
        question: 'Z jakimi CRM integrujecie automatyzację?',
        answer: 'Z Pipedrive, HubSpot i Salesforce. Zakres integracji zależy od tego, które dane marketingowe mają trafiać do sprzedaży i kto ma je czytać.',
    },
    {
        question: 'Ile kosztuje wdrożenie marketing automation?',
        answer: 'Koszt zależy od platformy, liczby integracji i liczby scenariuszy na start. Wycenę podajemy po audycie, gdy wiadomo, na jakich danych pracujemy.',
    },
    {
        question: 'Czy automatyzacja zastąpi pracę zespołu?',
        answer: 'Nie. Przejmuje powtarzalne wysyłki i porządkowanie kontaktów, ale treść, oferta i decyzje zostają po stronie ludzi. Źle zaprojektowany scenariusz szkodzi szybciej niż brak scenariusza.',
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
                title="Marketing automation, który pracuje na klientach, których już masz"
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

            <Section id="oferta" title="Co wchodzi w zakres wdrożenia">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Wdrażamy SALESmanago: konfigurację platformy, tracking, integrację ze sklepem i CRM, segmenty oraz pierwsze scenariusze. Kanały to e-mail, SMS i web push, bo klient nie czyta tylko poczty. Zakres zależy od tego, co masz dziś: inną platformę, arkusz z bazą czy CRM bez historii zakupowej.
                    </p>
                    <p className="ct-body">
                        Punktem wyjścia są dane, zgody i segmenty, nie lista pomysłów na kampanie. Jeśli baza jest nieposprzątana, pierwszy miesiąc idzie na porządek, bo automatyzacja na złych danych po prostu szybciej wysyła złe wiadomości.
                    </p>
                </div>
            </Section>

            <Section tint title="Jakie scenariusze działają w e-commerce">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Najczęściej wdrażane: porzucony koszyk i porzucone przeglądanie, rekomendacje produktowe, cross-sell po zakupie i reaktywacja klientów, którzy przestali kupować. Każdy scenariusz ma własną logikę wyjścia, żeby klient nie dostawał trzech maili o tym samym w ciągu doby.
                    </p>
                    <p className="ct-body">
                        Scenariusze projektujemy pod marżę, nie pod liczbę wiadomości. Rabat w porzuconym koszyku bywa najdroższą literą w całym lejku, jeśli wysyła się go także tym, którzy i tak by kupili.
                    </p>
                </div>
            </Section>

            <Section title="Lead nurturing i scoring w B2B">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Przy dłuższym procesie sprzedaży automatyzacja robi dwie rzeczy: prowadzi kontakt do momentu, w którym rozmowa ma sens, i porządkuje go tak, żeby handlowiec nie dzwonił do osób, które tylko pobrały checklistę. Scoring opieramy na zachowaniu: jakie treści czyta, ile razy wraca, jaka jest jego rola w firmie.
                    </p>
                    <p className="ct-body">
                        Efekt jest taki, że sprzedaż dostaje kontakt z kontekstem, a nie sam numer telefonu. To skraca pierwszą rozmowę i zmniejsza liczbę leadów, które i tak by nie kupiły.
                    </p>
                </div>
            </Section>

            <Section tint title="Integracje z CRM">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Integrujemy Pipedrive, HubSpot i Salesforce, żeby dane marketingowe trafiały tam, gdzie pracuje sprzedaż. Bez tego automatyzacja żyje w osobnym świecie: wie, kto kliknął, ale nie wie, kto kupił, więc nie potrafi policzyć przychodu.
                    </p>
                    <p className="ct-body">
                        Integracja to też ustalenie, które pole jest źródłem prawdy. Jeśli sklep mówi jedno, a CRM drugie, raport zawsze wyjdzie tak, jak ktoś chce go przeczytać.
                    </p>
                </div>
            </Section>

            <Section title="Jak wygląda wdrożenie krok po kroku">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Cztery etapy. Audyt: mapa obecnego stacku, danych, lejków i punktów styku, czyli miejsc, w których dziś tracimy klienta. Architektura: projekt lejków, segmentacji i logiki automatyzacji, zanim ktokolwiek kliknie „uruchom”. Wdrożenie: konfiguracja platformy, integracja CRM i start pierwszych scenariuszy. Optymalizacja: testy i rozbudowa w pętli dane, decyzja, wynik.
                    </p>
                    <p className="ct-body">
                        Kolejność jest istotna. Scenariusz uruchomiony bez architektury działa, ale zwykle wysyła do wszystkich wszystko i po miesiącu nikt nie wie, który element zarabia.
                    </p>
                </div>
            </Section>

            <Section tint title="Jak mierzymy efekt automatyzacji">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Przychodem z automatyzacji, a nie liczbą wysłanych wiadomości. Otwarcia i kliknięcia są wskaźnikami pomocniczymi: pokazują, czy komunikat jest czytany, ale nie mówią, czy klient kupił. Dlatego raportujemy przychód, koszt kontaktu i udział bazy w sprzedaży.
                    </p>
                    <p className="ct-body">
                        Jeśli automatyzacja ma być opłacalna, musi być wpięta w pomiar całego sklepu. Dlatego przy e-commerce zaczynamy od{' '}
                        <Link href="/uslugi/audyt-e-commerce" style={linkStyle}>
                            audytu e-commerce
                        </Link>{' '}
                        albo od razu łączymy wdrożenie z pracą nad{' '}
                        <Link href="/uslugi/e-commerce" style={linkStyle}>
                            e-commerce
                        </Link>
                        . Szczegóły platformy:{' '}
                        <Link href="/uslugi/wdrozenie-salesmanago" style={linkStyle}>
                            wdrożenie SALESmanago
                        </Link>
                        , podstawy pojęć:{' '}
                        <Link href="/baza-wiedzy/marketing-automation" style={linkStyle}>
                            marketing automation
                        </Link>
                        .
                    </p>
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
