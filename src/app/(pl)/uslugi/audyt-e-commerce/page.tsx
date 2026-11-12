import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { EXPERIENCE_SENTENCE, MANAGEMENT_HREF, experience } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const canonicalUrl = `${SITE_URL}/uslugi/audyt-e-commerce`;

/** The audit fee is quoted on the intro call, never published (see webmcp.test.mjs). */
const AUDIT_NAME = 'Audyt e-commerce';

export const metadata: Metadata = {
    title: { absolute: 'Audyt e-commerce: sprzedaż i marża | CreativeTrust' },
    description: 'Audyt e-commerce w 5-7 dni roboczych: pokazujemy, gdzie sklep traci sprzedaż, marżę i czas zespołu. Stała kwota znana z góry.',
    alternates: pageAlternates('/uslugi/audyt-e-commerce', 'pl', SITE_URL),
    openGraph: {
        title: 'Audyt e-commerce: sprzedaż i marża | CreativeTrust',
        description: 'Audyt e-commerce w 5-7 dni roboczych: pokazujemy, gdzie sklep traci sprzedaż, marżę i czas zespołu. Stała kwota znana z góry.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Audyt e-commerce: sprzedaż i marża | CreativeTrust',
        description: 'Audyt e-commerce w 5-7 dni roboczych: pokazujemy, gdzie sklep traci sprzedaż, marżę i czas zespołu. Stała kwota znana z góry.',
    },
};

const heroFacts = [
    { label: 'Wynik', value: 'raport i roadmapa z priorytetami' },
    { label: 'Rozliczenie', value: 'stała kwota, znana z góry' },
    { label: 'Czas realizacji', value: '5–7 dni roboczych' },
    { label: 'Twój czas', value: '2 godziny wywiadu' },
];

const areas = [
    {
        title: 'Sprzedaż i oferta',
        text: 'Lejek, oferta, kanały i ścieżka zakupowa. Wskazujemy dźwignie, które realnie podnoszą przychód sklepu, a nie tylko generują ruch.',
    },
    {
        title: 'Marża',
        text: 'Marżowość na poziomie produktu, kategorii i kanału. Sprawdzamy, czy jest liczona na bieżąco, czy w arkuszu raz w miesiącu.',
    },
    {
        title: 'Technologia i dane',
        text: 'Platforma, integracje, ERP i analityka. Szukamy długu technologicznego, który spowalnia rozwój sklepu i obniża konwersję.',
    },
    {
        title: 'Operacje i czas zespołu',
        text: 'Ręczna praca, raportowanie, procedury wdrażania zmian. Liczymy, ile roboczogodzin ucieka na to, co da się zautomatyzować.',
    },
];

const symptoms = [
    'sprzedaż rośnie, a marża stoi w miejscu albo spada',
    'marżowość raportujecie ręcznie, w arkuszach, z opóźnieniem',
    'zespół e-commerce traci godziny tygodniowo na powtarzalną pracę',
    'nie ma jednego dashboardu operacyjnego, każdy patrzy na inne liczby',
    'rozważacie zmianę platformy jako lekarstwo na wyniki',
    'każde wdrożenie zmian w sklepie to ryzyko dla sprzedaży',
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

const auditFacts = [
    { label: 'Rozliczenie', value: 'stała kwota, odliczana od abonamentu' },
    { label: 'Czas realizacji', value: '5–7 dni roboczych' },
    { label: 'Zaangażowanie zespołu', value: '2 godziny wywiadu' },
    { label: 'Dostępy', value: 'read-only do analityki i zaplecza na 3 dni' },
];

const steps = [
    {
        title: 'Rozmowa wstępna',
        text: '15 minut z naszym głównym architektem. Sprawdzamy, czy audyt ma w Waszym przypadku sens biznesowy. Bez zobowiązań.',
    },
    {
        title: 'Audyt',
        text: 'Wywiad, analiza danych i zaplecza, raport i roadmapa w 5–7 dni roboczych. Za stałą, znaną z góry kwotę.',
    },
    {
        title: 'Zarządzanie i wdrożenia',
        text: 'Realizujemy roadmapę i prowadzimy e-commerce z zewnątrz w miesięcznym abonamencie. Koszt audytu odliczamy w pierwszym miesiącu.',
    },
];

const faqs = [
    {
        question: 'Czym ten audyt różni się od audytu UX albo SEO?',
        answer:
            'Patrzymy na sklep z perspektywy zarządzania: sprzedaży, marży i czasu pracy zespołu. UX, SEO i technologia są w nim środkiem do wyniku, a nie osobną listą uwag. Dostajesz priorytety ułożone według wpływu na zysk.',
    },
    {
        question: 'Dlaczego audyt jest płatny?',
        answer:
            'To konkretna praca analityczna z konkretnym wynikiem: mapą straconego czasu, audytem długu technologicznego i roadmapą. Kwotę ustalamy z góry na rozmowie wstępnej — zwykle mieści się w budżecie operacyjnym dyrektora e-commerce i nie wymaga akceptacji zarządu.',
    },
    {
        question: 'Co się dzieje z kosztem audytu, jeśli zdecydujemy się na współpracę?',
        answer:
            'Odliczamy go w pierwszym miesiącu stałej współpracy. Jeśli zdecydujecie się wdrażać rekomendacje samodzielnie, roadmapa zostaje u Was i możecie z niej korzystać bez nas.',
    },
    {
        question: 'Ile czasu zajmie to naszemu zespołowi?',
        answer:
            'Około 2 godzin wywiadu oraz nadanie dostępu read-only do analityki i zaplecza sklepu na 3 dni. Resztę pracy wykonujemy po naszej stronie.',
    },
    {
        question: 'Dla jakich sklepów jest audyt e-commerce?',
        answer:
            'Dla marek, które sprzedają już na dużą skalę i czują, że procesy oraz infrastruktura nie nadążają za wzrostem — najczęściej z branży fashion, beauty, dom i ogród oraz retail.',
    },
    {
        question: 'Czy po audycie musimy zmieniać platformę sklepu?',
        answer:
            'Zwykle nie. Sama zmiana platformy rzadko ratuje marżę; częściej robi to dobra architektura danych, integracje i dashboardy. Jeśli migracja ma sens, audyt to pokaże.',
    },
];

export default function EcommerceAuditPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: AUDIT_NAME, url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: AUDIT_NAME,
        description:
            'Audyt e-commerce: sprzedaż, marża, technologia i dane oraz operacje sklepu. Raport i roadmapa w 5–7 dni roboczych, za stałą kwotę ustalaną z góry.',
        url: canonicalUrl,
        serviceType: 'Audyt e-commerce',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="Audyt e-commerce"
                title={<>Zobacz, gdzie sklep traci sprzedaż, marżę i <span style={{ color: 'var(--accent)' }}>czas zespołu.</span></>}
                description="Audytujemy e-commerce z perspektywy zarządzania, nie pojedynczej specjalizacji. W 5–7 dni roboczych dostajesz raport i roadmapę: co naprawić najpierw, ile to da i ile kosztuje."
                cta={{ label: 'Zamów audyt', href: '#formularz' }}
                ctaSecondary={{ label: 'Co obejmuje audyt', href: '#zakres' }}
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
                eyebrow="Skąd to wiemy"
                title="Audytujemy z doświadczeniem w zarządzaniu e-commerce"
                description={EXPERIENCE_SENTENCE}
            >
                <NumberedGrid cols={3} numbered={false} items={experience.map((item) => ({ title: item.brand, text: item.text }))} />
            </Section>

            <Section
                id="zakres"
                tint
                eyebrow="Co sprawdzamy"
                title="Cztery obszary, które decydują o zysku sklepu"
            >
                <NumberedGrid cols={4} items={areas} />
            </Section>

            <Section>
                <SplitLayout eyebrow="Kiedy warto zamówić audyt" title="Sklep rośnie, a zespół coraz więcej czasu spędza na gaszeniu pożarów">
                    <BulletColumns items={symptoms} />
                </SplitLayout>
            </Section>

            <Section
                id="wynik"
                tint
                eyebrow="Co dostajesz"
                title="Trzy dokumenty, z którymi można od razu pracować"
                description="Zamiast sprzedawać stałą obsługę w ciemno, najpierw udowadniamy wartość. Audyt mapuje problemy, które potem rozwiązujemy w ramach stałej współpracy — albo Wy z naszą roadmapą."
            >
                <div className="flex flex-col gap-8">
                    <NumberedGrid cols={3} items={deliverables} />
                    <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {auditFacts.map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section eyebrow="Model współpracy" title="Małe ryzyko na starcie, konkretny plan na dalej">
                <NumberedGrid cols={3} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="Po audycie możemy poprowadzić e-commerce z zewnątrz"
                        text="Roadmapa kończy się konkretną propozycją: które punkty naprawiamy, jakie dashboardy wdrażamy i ile kosztuje to miesięcznie w stałym abonamencie."
                        cta={{ label: 'Zarządzanie e-commerce', href: MANAGEMENT_HREF }}
                    />
                </div>
            </Section>

            <Section tint eyebrow="FAQ" title="Pytania o audyt e-commerce" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="formularz" maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Zamów audyt lub rozmowę wstępną"
                    formSubtitle="Opisz sklep, skalę sprzedaży i to, co dziś najbardziej hamuje wynik. Odezwiemy się, żeby umówić 15-minutową rozmowę z głównym architektem."
                    subjectPrefix="Audyt e-commerce"
                    serviceOptions={[
                        AUDIT_NAME,
                        'rozmowa wstępna (15 min)',
                        'zarządzanie e-commerce z zewnątrz',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'na start tylko audyt',
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
