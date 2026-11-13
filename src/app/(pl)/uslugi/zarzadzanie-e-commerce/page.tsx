import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { AUDIT_HREF, experience } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const canonicalUrl = `${SITE_URL}/uslugi/zarzadzanie-e-commerce`;

/** The monthly fee is quoted after the audit, never published (see webmcp.test.mjs). */
const SERVICE_NAME = 'Zarządzanie e-commerce';

const pageTitle = 'Agencja e-commerce i outsourcing sklepu | CreativeTrust';
const pageDescription =
    'Prowadzimy e-commerce marek z zewnątrz: sprzedaż, marżę, zespół, dostawców i raportowanie. Start od audytu w 5-7 dni roboczych, potem stały abonament.';

export const metadata: Metadata = {
    title: { absolute: 'Agencja e-commerce i outsourcing sklepu | CreativeTrust' },
    description:
        'Prowadzimy e-commerce marek z zewnątrz: sprzedaż, marżę, zespół, dostawców i raportowanie. Start od audytu w 5-7 dni roboczych, potem stały abonament.',
    alternates: pageAlternates('/uslugi/zarzadzanie-e-commerce', 'pl', SITE_URL),
    openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
    },
};

const proseStyle = { maxWidth: 860 };
const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' };

const heroFacts = [
    { label: 'Model', value: 'stały miesięczny abonament' },
    { label: 'Start', value: 'od audytu e-commerce' },
    { label: 'Odpowiedzialność', value: 'jeden zespół: decyzje i wykonanie' },
    { label: 'Koszt audytu', value: 'odliczany w pierwszym miesiącu' },
];

const scope = [
    {
        title: 'Plan sprzedaży i priorytety',
        text: 'Cele, budżet i kolejność działań na kwartał. Jedna lista priorytetów zamiast pięciu równoległych projektów.',
    },
    {
        title: 'Marża i oferta',
        text: 'Marżowość produktów, kategorii i kanałów, polityka promocji i zwrotów. Sprawdzamy, czy wzrost przychodu przekłada się na zysk, a nie tylko na obrót.',
    },
    {
        title: 'Zespół i dostawcy',
        text: "Koordynacja ludzi po stronie klienta oraz agencji, software house'u i dostawców narzędzi. Zespół, który działa dobrze, zostaje i dostaje jasny zakres.",
    },
    {
        title: 'Technologia i dane',
        text: 'Roadmapa platformy, integracji i analityki. Jeden dashboard operacyjny zamiast raportów z pięciu systemów.',
    },
    {
        title: 'Marketing i CRM',
        text: 'Kanały pozyskania, marketing automation i praca z bazą klientów spięte z planem sprzedaży, a nie prowadzone obok niego.',
    },
    {
        title: 'Raportowanie wyników',
        text: 'Stały rytm przeglądów i podsumowanie dla zarządu w języku wyniku i marży, nie w języku wdrożonych zadań.',
    },
];

const situations = [
    'e-commerce rośnie, ale nikt nie odpowiada za niego w całości',
    'rekrutacja e-commerce managera trwa albo się nie udała',
    'zarząd potrzebuje partnera, który mówi językiem wyniku i marży',
    'kilka agencji robi swoje, ale nikt nie spina tego w jeden plan',
    'zespół jest dobry operacyjnie i potrzebuje kierunku oraz priorytetów',
    'firma planuje zmianę platformy lub modelu sprzedaży i potrzebuje kogoś, kto to poprowadzi',
];

const steps = [
    {
        title: 'Audyt e-commerce',
        text: '5-7 dni roboczych, raport i roadmapa z priorytetami. Szczegóły na stronie audytu.',
    },
    {
        title: 'Plan i zakres',
        text: 'Cele, zakres odpowiedzialności i miesięczny abonament. Koszt audytu jest odliczany w pierwszym miesiącu.',
    },
    {
        title: 'Prowadzenie',
        text: 'Realizacja roadmapy: zarządzanie priorytetami, zespołem i dostawcami oraz wdrażanie zmian.',
    },
    {
        title: 'Przeglądy wyników',
        text: 'Regularne porównanie wyniku z planem i korekta kursu.',
    },
];

const faqs = [
    {
        question: 'Czym outsourcing e-commerce różni się od pracy z agencją performance?',
        answer:
            'Agencja performance odpowiada za swój kanał: kampanie i budżet. Outsourcing e-commerce obejmuje całe prowadzenie sklepu: plan sprzedaży, marżę, zespół, dostawców i raportowanie. Agencje, które działają dobrze, zostają. My je koordynujemy i spinamy w jeden plan.',
    },
    {
        question: 'Czy agencja e-commerce zastępuje wewnętrzny zespół sklepu?',
        answer:
            'Nie musi. Możemy przejąć rolę e-commerce managera tam, gdzie jej brakuje, albo wzmocnić istniejący zespół o zarządzanie, analitykę i wdrożenia. Zakres ustalamy po audycie, na podstawie tego, co zespół już robi dobrze.',
    },
    {
        question: 'Ile kosztuje prowadzenie e-commerce w abonamencie?',
        answer:
            'To stała miesięczna kwota zależna od zakresu i skali sklepu. Propozycję podajemy po audycie, razem z roadmapą.',
    },
    {
        question: 'Jak szybko zobaczymy pierwsze efekty?',
        answer:
            'Pierwsze decyzje o priorytetach zapadają po audycie, czyli po 5-7 dniach roboczych od startu. Dalej pracujemy w miesięcznym rytmie przeglądów. Konkretnego wzrostu nie obiecujemy przed poznaniem danych sklepu.',
    },
    {
        question: 'Czy pracujecie z naszym software house\'em i obecnymi agencjami?',
        answer:
            'Tak. Jeśli klient ma własny dział IT, software house lub agencję, pracujemy z nimi i dzielimy zakres. Naszą rolą jest dopilnowanie, żeby wszystkie strony grały do tego samego planu.',
    },
    {
        question: 'Czy można zacząć od samego audytu?',
        answer:
            'Tak. Audyt jest osobną usługą i nie zobowiązuje do dalszej współpracy. Roadmapa zostaje u klienta, nawet jeśli wdrożenia robi sam.',
    },
];

export default function EcommerceManagementPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: SERVICE_NAME, url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: SERVICE_NAME,
        description:
            'Outsourcing e-commerce: plan sprzedaży, marża, zespół i dostawcy, technologia, marketing i raportowanie wyników. Start od audytu e-commerce.',
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
                eyebrow="Agencja e-commerce"
                title={<>Agencja e-commerce: outsourcing, który bierze <span style={{ color: 'var(--accent)' }}>odpowiedzialność za wynik</span></>}
                description="CreativeTrust prowadzi e-commerce marek z zewnątrz. Bierzemy odpowiedzialność za plan sprzedaży, marżę, pracę zespołu i dostawców oraz raportowanie do zarządu. Nie jesteśmy kolejnym podwykonawcą od kampanii."
                cta={{ label: 'Pierwsza rozmowa 15 minut', href: '/kontakt' }}
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

            <Section border={false}>
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Prowadzimy sklep jako całość i odpowiadamy za kolejność decyzji. Zaczynamy od{' '}
                        <Link href={AUDIT_HREF} style={linkStyle}>audytu e-commerce</Link>. W 5-7 dni roboczych klient dostaje raport i roadmapę, a koszt audytu jest odliczany w pierwszym miesiącu stałej współpracy. Zakres i miesięczny abonament ustalamy po audycie, kiedy znamy liczby, zaplecze i ludzi.
                    </p>
                </div>
            </Section>

            <Section id="outsourcing" tint title="Czym jest outsourcing e-commerce">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Outsourcing e-commerce to przekazanie zewnętrznemu zespołowi odpowiedzialności za prowadzenie sklepu: cele sprzedażowe, marżę, koordynację zespołu i dostawców oraz raportowanie do zarządu. Firma nie kupuje pojedynczego zlecenia, tylko stałą funkcję zarządczą, którą trudno utrzymać w środku organizacji.
                    </p>
                    <p className="ct-body">
                        Różnica wobec klasycznej agencji jest w zakresie odpowiedzialności. Agencja performance odpowiada za swój kanał: kampanie, budżet, wskaźniki z panelu. Agencja e-commerce w modelu outsourcingu odpowiada za całość: czy wzrost sprzedaży nie zjada marży, czy zespół ma priorytety, czy dostawcy robią to, co trzeba, i czy zarząd widzi stan sklepu bez czekania na miesięczny arkusz.
                    </p>
                    <p className="ct-body">
                        To model dla firm, w których e-commerce jest już zbyt duży, żeby prowadzić go przy okazji, a jeszcze za mały, żeby utrzymywać pełny dział z dyrektorem e-commerce.
                    </p>
                    <p className="ct-body">
                        Outsourcing nie jest odpowiedzią na każdy problem. Jeśli sklep robi kilkanaście zamówień dziennie i wystarcza mu jedna osoba, taniej wyjdzie zatrudnienie specjalisty niż abonament. Jeśli problemem jest wyłącznie jakość kampanii, wystarczy zmiana agencji. Outsourcing ma sens wtedy, gdy problem jest systemowy: nikt nie widzi całości, decyzje zapadają w różnych miejscach, a marża nie jest liczona na bieżąco.
                    </p>
                </div>
            </Section>

            <Section id="zakres" title="Co robimy jako agencja e-commerce">
                <NumberedGrid cols={3} items={scope} />
                <div className="mt-10">
                    <p className="ct-body" style={{ maxWidth: 860 }}>
                        Wdrożenia techniczne, sklepy i migracje prowadzi ten sam zespół: zobacz{' '}
                        <Link href="/uslugi/e-commerce" style={linkStyle}>e-commerce i rozwój sklepu</Link>.
                    </p>
                </div>
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Dla kogo prowadzimy e-commerce" title="E-commerce jest za duży, żeby prowadzić go przy okazji">
                    <BulletColumns items={situations} />
                </SplitLayout>
            </Section>

            <Section id="wspolpraca" title="Jak wygląda współpraca">
                <NumberedGrid cols={4} items={steps} />
                <div className="mt-10">
                    <p className="ct-body" style={{ maxWidth: 860 }}>
                        Szczegóły pierwszego kroku opisuje strona{' '}
                        <Link href={AUDIT_HREF} style={linkStyle}>audytu e-commerce</Link>: zakres, czas i wynik, który zostaje u klienta.
                    </p>
                </div>
            </Section>

            <Section tint title="Model rozliczenia">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Pracujemy w stałym miesięcznym abonamencie. Jego wysokość zależy od zakresu odpowiedzialności i skali sklepu: czy przejmujemy tylko zarządzanie, czy także wdrożenia, marketing automation i analitykę. Konkretną propozycję klient dostaje razem z roadmapą po audycie, więc nie kupuje liczby godzin w ciemno.
                    </p>
                    <p className="ct-body">
                        Model jest celowo prosty: jedna faktura, jeden zespół, jedna osoba odpowiedzialna za wynik. Bez rozliczania każdej godziny i bez listy zadań, która rośnie szybciej niż sprzedaż.
                    </p>
                </div>
            </Section>

            <Section title="Co mierzymy">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Współpraca ma sens tylko wtedy, gdy da się ją rozliczyć. Dlatego na starcie ustalamy zestaw wskaźników widocznych w jednym dashboardzie: przychód i liczbę zamówień, średni koszyk, marżę po zwrotach, koszt pozyskania zamówienia dla nowego i powracającego klienta oraz udział zamówień od klientów, którzy kupili wcześniej.
                    </p>
                    <p className="ct-body">
                        Te liczby pokazują, czy wzrost przychodu nie dzieje się kosztem marży. Nie raportujemy liczby wdrożonych zadań, bo zadania nie są wynikiem. Przegląd odbywa się w stałym, miesięcznym rytmie, a między nimi decyzje operacyjne zapadają na bieżąco.
                    </p>
                </div>
            </Section>

            <Section tint>
                <SplitLayout
                    eyebrow="Doświadczenie"
                    title="Doświadczenie, na którym opieramy się w każdym projekcie"
                >
                    <div className="flex flex-col gap-5">
                        <p className="ct-body">
                            Zespół CreativeTrust ma doświadczenie w e-commerce marek z wielu branż: moda, automotive, kosmetologia, farmacja, telefony. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.
                        </p>
                        <p className="ct-body">
                            Ta praktyka przekłada się na decyzje, nie na listę referencji. Wiemy, jak wygląda marża w modzie przy wysokim odsetku zwrotów, gdzie w kosmetykach ukrywa się koszt pozyskania klienta i dlaczego w farmacji każda zmiana w koszyku wymaga sprawdzenia regulacji. Dlatego plan na kwartał ma mniej punktów, ale każdy jest wykonalny.
                        </p>
                    </div>
                </SplitLayout>
                <div className="mt-10">
                    <NumberedGrid cols={3} numbered={false} items={experience.map((item) => ({ title: item.brand, text: item.text }))} />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o prowadzenie e-commerce z zewnątrz" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <CTASection
                title="Pierwsza rozmowa trwa 15 minut i jest bez zobowiązań"
                description="Ustalamy na niej, czy audyt jest w tym momencie potrzebny i co ma objąć."
                cta={{ label: 'Pierwsza rozmowa 15 minut', href: '/kontakt' }}
            />
        </main>
    );
}
