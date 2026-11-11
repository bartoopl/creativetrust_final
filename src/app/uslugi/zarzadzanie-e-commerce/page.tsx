import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { AUDIT_HREF, EXPERIENCE_SENTENCE, experience } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/zarzadzanie-e-commerce`;

/** The monthly fee is quoted after the audit, never published (see webmcp.test.mjs). */
const SERVICE_NAME = 'Zarządzanie e-commerce';

export const metadata: Metadata = {
    title: 'Zarządzanie e-commerce z zewnątrz | E-commerce manager na abonament',
    description:
        'Prowadzimy e-commerce marek z zewnątrz: plan sprzedaży, marża, zespół, dostawcy i raportowanie wyników. Start od audytu, stała miesięczna współpraca, jeden odpowiedzialny zespół.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Zarządzanie e-commerce z zewnątrz | CreativeTrust',
        description:
            'E-commerce manager i zespół wdrożeniowy w jednym abonamencie. Plan, marża, dostawcy i wyniki pod jedną odpowiedzialnością.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Zarządzanie e-commerce z zewnątrz | CreativeTrust',
        description:
            'Prowadzenie e-commerce z zewnątrz: plan sprzedaży, marża, zespół, dostawcy i wyniki. Start od audytu.',
    },
};

const heroFacts = [
    { label: 'Model', value: 'stały miesięczny abonament' },
    { label: 'Start', value: 'od audytu e-commerce' },
    { label: 'Odpowiedzialność', value: 'jeden zespół: decyzje i wykonanie' },
    { label: 'Koszt audytu', value: 'odliczany w pierwszym miesiącu' },
];

const scope = [
    {
        title: 'Plan sprzedaży i priorytety',
        text: 'Cele, budżet i kolejność działań na kwartał. Zespół wie, co jest ważne teraz, a co może poczekać.',
    },
    {
        title: 'Marża i oferta',
        text: 'Marżowość produktów, kategorii i kanałów, polityka promocji i zwrotów. Decyzje na liczbach, nie na przeczuciu.',
    },
    {
        title: 'Zespół i dostawcy',
        text: 'Koordynujemy ludzi po Waszej stronie oraz agencje, software house i dostawców narzędzi. Jedna lista zadań, jedna odpowiedzialność.',
    },
    {
        title: 'Technologia i dane',
        text: 'Roadmapa platformy, integracji i analityki. Dashboard operacyjny, na który wszyscy patrzą tak samo.',
    },
    {
        title: 'Marketing i CRM',
        text: 'Kanały pozyskania, marketing automation i praca z bazą klientów spięte z planem sprzedaży.',
    },
    {
        title: 'Raportowanie wyników',
        text: 'Stały rytm przeglądów i podsumowanie dla zarządu: co zrobiliśmy, jaki to dało wynik i co dalej.',
    },
];

const situations = [
    'e-commerce rośnie, ale nikt nie odpowiada za niego w całości',
    'szukacie e-commerce managera, a rekrutacja trwa albo się nie udała',
    'zarząd potrzebuje partnera, który mówi językiem wyniku i marży',
    'kilka agencji robi swoje, ale nikt nie spina tego w jeden plan',
    'zespół jest dobry operacyjnie i potrzebuje kierunku oraz priorytetów',
    'planujecie zmianę platformy lub modelu sprzedaży i potrzebujecie kogoś, kto to poprowadzi',
];

const steps = [
    {
        title: 'Audyt e-commerce',
        text: 'W 5–7 dni roboczych poznajemy liczby, zaplecze i zespół. Dostajecie raport i roadmapę z priorytetami.',
    },
    {
        title: 'Plan i zakres',
        text: 'Ustalamy cele, zakres odpowiedzialności i miesięczny abonament. Koszt audytu odliczamy w pierwszym miesiącu.',
    },
    {
        title: 'Prowadzenie',
        text: 'Realizujemy roadmapę: zarządzamy priorytetami, zespołem i dostawcami, a zmiany wdrażamy własnymi siłami lub z Waszymi ludźmi.',
    },
    {
        title: 'Przeglądy wyników',
        text: 'Regularnie pokazujemy wynik względem planu i korygujemy kurs. Bez raportów dla samego raportowania.',
    },
];

const faqs = [
    {
        question: 'Czym zarządzanie e-commerce z zewnątrz różni się od obsługi agencyjnej?',
        answer:
            'Agencja odpowiada za swój kanał lub zlecenie. My odpowiadamy za e-commerce jako całość: plan, marżę, priorytety i pracę dostawców. Jeśli macie już agencje, które działają dobrze, zostają — koordynujemy je.',
    },
    {
        question: 'Czy zastępujecie nasz zespół e-commerce?',
        answer:
            'Nie musimy. Możemy przejąć rolę e-commerce managera tam, gdzie jej brakuje, albo wzmocnić istniejący zespół o zarządzanie, analitykę i wdrożenia. Zakres ustalamy po audycie.',
    },
    {
        question: 'Dlaczego zaczynacie od audytu?',
        answer:
            'Żeby brać odpowiedzialność za wynik, musimy znać liczby, zaplecze i zespół. Audyt trwa 5–7 dni roboczych, kosztuje stałą kwotę ustalaną z góry i jest odliczany w pierwszym miesiącu współpracy.',
    },
    {
        question: 'Ile kosztuje zarządzanie e-commerce z zewnątrz?',
        answer:
            'To miesięczny abonament zależny od zakresu odpowiedzialności i skali sklepu. Konkretną propozycję dostajecie razem z roadmapą po audycie.',
    },
    {
        question: 'Dla jakich firm jest ta usługa?',
        answer:
            'Dla marek, które sprzedają online na dużą skalę lub szybko do niej dochodzą — najczęściej fashion, beauty, dom i ogród oraz retail — i chcą mieć po swojej stronie doświadczone zarządzanie e-commerce bez budowania całego działu od zera.',
    },
    {
        question: 'Czy wdrażacie także zmiany w sklepie?',
        answer:
            'Tak. Sklepy, integracje, marketing automation i strony wdraża ten sam zespół, więc rekomendacje nie czekają na wykonawcę. Jeśli macie własny dział IT lub software house, pracujemy z nimi.',
    },
];

export default function EcommerceManagementPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: SERVICE_NAME, url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Zarządzanie e-commerce z zewnątrz',
        description:
            'Prowadzenie e-commerce z zewnątrz w stałej miesięcznej współpracy: plan sprzedaży, marża, zespół i dostawcy, technologia, marketing i raportowanie wyników. Start od audytu e-commerce.',
        url: canonicalUrl,
        serviceType: 'Zarządzanie e-commerce',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="Zarządzanie e-commerce z zewnątrz"
                title={<>E-commerce prowadzony <span style={{ color: 'var(--accent)' }}>jak biznes,</span> nie jak projekt.</>}
                description="Bierzemy odpowiedzialność za e-commerce jako całość: plan sprzedaży, marżę, zespół, dostawców i wynik. Dostajesz doświadczone zarządzanie i zespół wdrożeniowy w jednym abonamencie."
                cta={{ label: 'Umów rozmowę', href: '#formularz' }}
                ctaSecondary={{ label: 'Co bierzemy na siebie', href: '#zakres' }}
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
                eyebrow="Doświadczenie"
                title="Zarządzanie e-commerce znamy z praktyki"
                description={EXPERIENCE_SENTENCE}
            >
                <NumberedGrid cols={3} numbered={false} items={experience.map((item) => ({ title: item.brand, text: item.text }))} />
            </Section>

            <Section id="zakres" tint eyebrow="Co bierzemy na siebie" title="Sześć obszarów pod jedną odpowiedzialnością">
                <NumberedGrid cols={3} items={scope} />
            </Section>

            <Section>
                <SplitLayout eyebrow="Kiedy to ma sens" title="E-commerce jest za duży, żeby prowadzić go przy okazji">
                    <BulletColumns items={situations} />
                </SplitLayout>
            </Section>

            <Section tint eyebrow="Jak to działa" title="Od audytu do stałego rytmu pracy">
                <NumberedGrid cols={4} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="Pierwszym krokiem jest audyt e-commerce"
                        text="5–7 dni roboczych, stała kwota znana z góry, 2 godziny Waszego zespołu. Na koniec macie roadmapę i propozycję stałej współpracy."
                        cta={{ label: 'Zobacz zakres audytu', href: AUDIT_HREF }}
                    />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o zarządzanie e-commerce z zewnątrz" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Porozmawiajmy o prowadzeniu Twojego e-commerce"
                    formSubtitle="Opisz sklep, skalę sprzedaży i to, kto dziś odpowiada za e-commerce. Odezwiemy się, żeby umówić 15-minutową rozmowę."
                    subjectPrefix="Zarządzanie e-commerce"
                    serviceOptions={[
                        'zarządzanie e-commerce z zewnątrz',
                        'audyt e-commerce na start',
                        'rozmowa wstępna (15 min)',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'na start tylko audyt',
                        'do 10 000 zł miesięcznie',
                        '10 000 - 20 000 zł miesięcznie',
                        'powyżej 20 000 zł miesięcznie',
                        'nie wiem / potrzebuję rekomendacji',
                    ]}
                    messagePlaceholder="Na jakiej platformie działa sklep, jaki jest orientacyjny obrót, jak wygląda zespół i co chcielibyście oddać w zarządzanie?"
                />
            </Section>
        </main>
    );
}
