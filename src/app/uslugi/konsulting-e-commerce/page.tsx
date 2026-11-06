import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/konsulting-e-commerce`;

/** Published in `publishedPrices` (site-services.ts); a test keeps the two in sync. */
const DIAGNOSIS_PRICE = '2 900 zł netto';
const DIAGNOSIS_NAME = 'Diagnoza Wąskich Gardeł i Architektury eCommerce';

export const metadata: Metadata = {
    title: 'Konsulting e-commerce | Sprzedaż, marża i architektura sklepu',
    description:
        'Konsulting e-commerce dla sklepów, które rosną szybciej niż ich procesy. Zaczynamy od płatnej Diagnozy Wąskich Gardeł i Architektury eCommerce: 5–7 dni, 2 900 zł netto, koszt odliczany od współpracy.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Konsulting e-commerce | CreativeTrust',
        description:
            'Budowa sprzedaży, sterowanie marżą i architektura danych w e-commerce. Pierwszy krok: Diagnoza Wąskich Gardeł w 5–7 dni.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Konsulting e-commerce | CreativeTrust',
        description:
            'Know-how z dużych e-commerce\'ów: sprzedaż, marża, dashboardy i architektura. Zaczynamy od Diagnozy, nie od abonamentu w ciemno.',
    },
};

const heroFacts = [
    { label: 'Pierwszy krok', value: 'Diagnoza wąskich gardeł' },
    { label: 'Cena', value: DIAGNOSIS_PRICE },
    { label: 'Czas realizacji', value: '5–7 dni roboczych' },
    { label: 'Twój czas', value: '2 godziny wywiadu' },
];

const expertise = [
    {
        title: 'Budowa sprzedaży',
        text: 'Lejek, oferta, kanały i ścieżka zakupowa. Wiemy, które dźwignie realnie podnoszą przychód sklepu, a które tylko generują ruch.',
    },
    {
        title: 'Sterowanie marżą',
        text: 'Marżowość na poziomie produktu, kategorii i kanału, liczona na bieżąco — nie w arkuszu raz w miesiącu.',
    },
    {
        title: 'Architektura danych i IT',
        text: 'Platforma, integracje, ERP i analityka ułożone tak, żeby sklep mógł rosnąć bez dokładania ludzi do ręcznej pracy.',
    },
    {
        title: 'Operacje i czas zespołu',
        text: 'Automatyzacje, dashboardy operacyjne i bezpieczne procedury wdrażania zmian, także w szczycie sezonu.',
    },
];

const symptoms = [
    'marżowość raportujecie ręcznie, w arkuszach, z opóźnieniem',
    'zespół e-commerce traci godziny tygodniowo na powtarzalną pracę',
    'nie ma jednego dashboardu operacyjnego, każdy patrzy na inne liczby',
    'rozważacie zmianę platformy jako lekarstwo na spadającą marżę',
    'każde wdrożenie zmian w sklepie to ryzyko dla sprzedaży',
    'sprzedaż rośnie szybciej niż infrastruktura i procesy',
];

const deliverables = [
    {
        title: 'Mapa uciekającego czasu',
        text: 'Lista miejsc, w których zespół e-commerce traci roboczogodziny na ręczną pracę: brak automatyzacji, ręczne raportowanie marżowości, przeklejanie danych między systemami.',
    },
    {
        title: 'Audyt długu technologicznego',
        text: 'Wąskie gardła infrastruktury, integracji i analityki, które spowalniają rozwój sklepu i obniżają konwersję.',
    },
    {
        title: 'Roadmapa naprawcza',
        text: 'Dokument na 2–3 strony: krytyczne obszary w kolejności wpływu na zysk i czas zespołu, z wyceną ich naprawy w stałej współpracy.',
    },
];

const diagnosisFacts = [
    { label: 'Cena', value: DIAGNOSIS_PRICE },
    { label: 'Czas realizacji', value: '5–7 dni roboczych' },
    { label: 'Zaangażowanie zespołu', value: '2 godziny wywiadu' },
    { label: 'Dostępy', value: 'read-only do analityki i zaplecza na 3 dni' },
];

const steps = [
    {
        title: 'Rozmowa wstępna',
        text: '15 minut z naszym głównym architektem. Sprawdzamy, czy Diagnoza ma w Waszym przypadku sens biznesowy. Bez zobowiązań.',
    },
    {
        title: 'Diagnoza',
        text: 'Wywiad, analiza danych i zaplecza, raport i roadmapa w 5–7 dni roboczych. Za stałą, znaną z góry kwotę.',
    },
    {
        title: 'Stała współpraca',
        text: 'Naprawiamy wskazane punkty i rozwijamy sklep w miesięcznym abonamencie. Koszt Diagnozy odliczamy w pierwszym miesiącu.',
    },
];

const faqs = [
    {
        question: 'Czym różni się konsulting e-commerce od zlecenia dla software house\'u?',
        answer:
            'Zaczynamy od wyniku biznesowego, nie od listy funkcji. Patrzymy na sprzedaż, marżę i czas pracy zespołu, a technologię dobieramy dopiero do tego, co ma się poprawić. Te same osoby doradzają i wdrażają.',
    },
    {
        question: 'Dlaczego Diagnoza jest płatna?',
        answer:
            `To konkretna praca analityczna z konkretnym wynikiem: mapą straconego czasu, audytem długu technologicznego i roadmapą. ${DIAGNOSIS_PRICE} to kwota, która zwykle mieści się w budżecie operacyjnym dyrektora e-commerce i nie wymaga akceptacji zarządu.`,
    },
    {
        question: 'Co się dzieje z kosztem Diagnozy, jeśli zdecydujemy się na współpracę?',
        answer:
            'Odliczamy go w pierwszym miesiącu stałej współpracy. Jeśli zdecydujecie się wdrażać rekomendacje samodzielnie, roadmapa zostaje u Was i możecie z niej korzystać bez nas.',
    },
    {
        question: 'Ile czasu zajmie to naszemu zespołowi?',
        answer:
            'Około 2 godzin wywiadu oraz nadanie dostępu read-only do analityki i zaplecza sklepu na 3 dni. Resztę pracy wykonujemy po naszej stronie.',
    },
    {
        question: 'Dla jakich sklepów jest ta usługa?',
        answer:
            'Dla marek, które sprzedają już na dużą skalę i czują, że procesy oraz infrastruktura nie nadążają za wzrostem — najczęściej z branży beauty, dom i ogród oraz retail.',
    },
    {
        question: 'Czy musimy zmieniać platformę sklepu?',
        answer:
            'Zwykle nie. Sama zmiana platformy rzadko ratuje marżę; częściej robi to dobra architektura danych, integracje i dashboardy. Jeśli migracja ma sens, Diagnoza to pokaże.',
    },
];

export default function EcommerceConsultingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Konsulting e-commerce', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Konsulting e-commerce',
        description:
            `Konsulting e-commerce: budowa sprzedaży, sterowanie marżą, architektura danych i operacje sklepu. Pierwszy krok: ${DIAGNOSIS_NAME} (${DIAGNOSIS_PRICE}, 5–7 dni roboczych).`,
        url: canonicalUrl,
        serviceType: 'Konsulting e-commerce',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="Konsulting e-commerce"
                title={<>Sprzedaż i marża w e-commerce <span style={{ color: 'var(--accent)' }}>pod kontrolą.</span></>}
                description="Wiemy, jak budować sprzedaż i sterować marżą, bo przez lata pracowaliśmy w dużych e-commerce'ach. Zaczynamy od płatnej Diagnozy: w tydzień pokazujemy, gdzie Wasz sklep traci pieniądze i czas zespołu — zanim zaproponujemy stałą współpracę."
                cta={{ label: 'Zamów Diagnozę', href: '#formularz' }}
                ctaSecondary={{ label: 'Co obejmuje Diagnoza', href: '#diagnoza' }}
                right={
                    <div className="ct-grid-lines grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {heroFacts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                }
            />

            <Section
                border={false}
                eyebrow="Na czym się znamy"
                title="Doradzamy z perspektywy zysku, strat i czasu pracy managerów"
            >
                <NumberedGrid cols={4} items={expertise} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Kiedy warto porozmawiać" title="Sklep rośnie, a zespół coraz więcej czasu spędza na gaszeniu pożarów">
                    <BulletColumns items={symptoms} />
                </SplitLayout>
            </Section>

            <Section
                id="diagnoza"
                eyebrow="Pierwszy krok"
                title={DIAGNOSIS_NAME}
                description="Zamiast sprzedawać stałą obsługę w ciemno, najpierw udowadniamy wartość. Diagnoza mapuje problemy, które potem rozwiązujemy w ramach stałej współpracy — albo Wy z naszą roadmapą."
            >
                <div className="flex flex-col gap-8">
                    <NumberedGrid cols={3} items={deliverables} />
                    <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {diagnosisFacts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section tint eyebrow="Model współpracy" title="Małe ryzyko na starcie, konkretny plan na dalej">
                <NumberedGrid cols={3} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="Koszt Diagnozy odliczamy w pierwszym miesiącu współpracy"
                        text="Roadmapa kończy się konkretną propozycją: które punkty naprawiamy, jakie dashboardy wdrażamy i ile kosztuje to miesięcznie w stałym abonamencie."
                        cta={{ label: 'Umów 15-minutową rozmowę', href: '#formularz' }}
                    />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o konsulting e-commerce i Diagnozę" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Zamów Diagnozę lub rozmowę wstępną"
                    formSubtitle="Opisz sklep, skalę sprzedaży i to, co dziś najbardziej spowalnia zespół. Odezwiemy się, żeby umówić 15-minutową rozmowę z głównym architektem."
                    subjectPrefix="Konsulting e-commerce"
                    serviceOptions={[
                        `${DIAGNOSIS_NAME} (${DIAGNOSIS_PRICE})`,
                        'rozmowa wstępna (15 min)',
                        'stała współpraca konsultingowo-wdrożeniowa',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'na start tylko Diagnoza',
                        'do 10 000 zł miesięcznie',
                        '10 000 - 20 000 zł miesięcznie',
                        'powyżej 20 000 zł miesięcznie',
                        'nie wiem / potrzebuję rekomendacji',
                    ]}
                    messagePlaceholder="Na jakiej platformie działa sklep, jaki jest orientacyjny obrót, co dziś robicie ręcznie i gdzie widzicie największe wąskie gardło?"
                />
            </Section>
        </main>
    );
}
