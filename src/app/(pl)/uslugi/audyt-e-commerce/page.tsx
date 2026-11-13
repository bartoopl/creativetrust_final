import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { MANAGEMENT_HREF, experience } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

const canonicalUrl = `${SITE_URL}/uslugi/audyt-e-commerce`;

/** Published audit fee, kept in `publishedPrices` too (see site-services.ts and webmcp.test.mjs). */
const AUDIT_NAME = 'Audyt e-commerce';
const AUDIT_PRICE = '3 000 zł netto';

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

const proseStyle = { maxWidth: 860 };
const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' };

const heroFacts = [
    { label: 'Wynik', value: 'raport i roadmapa z priorytetami' },
    { label: 'Cena', value: AUDIT_PRICE },
    { label: 'Czas realizacji', value: '5-7 dni roboczych' },
    { label: 'Twój czas', value: '2 godziny wywiadu' },
];

const areas = [
    {
        title: 'Sprzedaż i oferta',
        text: 'Lejek sprzedaży, struktura oferty, kanały pozyskania i ścieżka zakupowa. Szukamy dźwigni, które realnie podnoszą przychód, a nie kolejnych optymalizacji kosmetycznych.',
    },
    {
        title: 'Marża',
        text: 'Marżowość na poziomie produktu, kategorii i kanału. Sprawdzamy, czy jest liczona na bieżąco, czy w arkuszu raz w miesiącu, i czy wlicza koszt zwrotów oraz pozyskania klienta.',
    },
    {
        title: 'Technologia i dane',
        text: 'Platforma, integracje, ERP i analityka. Dług technologiczny, który spowalnia rozwój sklepu i obniża konwersję. Sprawdzamy też, czy dane z reklam zgadzają się ze stanem magazynu i zamówień.',
    },
    {
        title: 'Operacje i czas zespołu',
        text: 'Ręczna praca, raportowanie i procedury wdrażania zmian. Roboczogodziny, które da się odzyskać automatyzacją, oraz miejsca, w których każda zmiana to ryzyko dla sprzedaży.',
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
        text: 'Miejsca, w których zespół traci roboczogodziny na ręczną pracę: brak automatyzacji, ręczne raportowanie marżowości, przeklejanie danych między systemami.',
    },
    {
        title: 'Audyt długu technologicznego',
        text: 'Wąskie gardła infrastruktury, integracji i analityki, które spowalniają rozwój sklepu i obniżają konwersję.',
    },
    {
        title: 'Roadmapa naprawcza',
        text: 'Dokument na 2-3 strony z obszarami krytycznymi w kolejności wpływu na zysk i czas zespołu oraz wyceną ich naprawy w stałej współpracy.',
    },
];

const auditFacts = [
    { label: 'Cena', value: AUDIT_PRICE },
    { label: 'Czas realizacji', value: '5-7 dni roboczych' },
    { label: 'Zaangażowanie zespołu', value: '2 godziny wywiadu' },
    { label: 'Dostępy', value: 'read-only do analityki i zaplecza na 3 dni' },
];

const preparation = [
    'Dostępy read-only: Google Analytics 4, Google Search Console, panel sklepu i panel reklam. Na 3 dni, bez prawa zapisu.',
    'Osoba do wywiadu: ktoś, kto zna procesy sprzedaży, obsługi zamówień i raportowania. Dwie godziny rozmowy.',
    'Lista systemów: ERP, magazyn, system zgłoszeń, narzędzia do maila i automatyzacji. Chodzi o mapę, nie o hasła.',
    'Jedno pytanie na start: co dziś najbardziej boli, sprzedaż, marża czy czas zespołu. Odpowiedź ustawia kolejność analizy.',
];

const steps = [
    {
        title: 'Rozmowa wstępna',
        text: '15 minut z naszym głównym architektem. Sprawdzamy, czy audyt ma w Waszym przypadku sens biznesowy. Bez zobowiązań.',
    },
    {
        title: 'Audyt',
        text: 'Wywiad, analiza danych i zaplecza, raport i roadmapa w 5-7 dni roboczych. Za stałą, znaną z góry kwotę.',
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
            'To konkretna praca analityczna z konkretnym wynikiem: mapą straconego czasu, audytem długu technologicznego i roadmapą. Kwotę znasz z góry i nie ma dopłat za dodatkowe ustalenia.',
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
            'Dla marek, które sprzedają już na dużą skalę i czują, że procesy oraz infrastruktura nie nadążają za wzrostem, najczęściej z branży fashion, beauty, dom i ogród oraz retail.',
    },
    {
        question: 'Czy po audycie musimy zmieniać platformę sklepu?',
        answer:
            'Zwykle nie. Sama zmiana platformy rzadko ratuje marżę; częściej robi to dobra architektura danych, integracje i dashboardy. Jeśli migracja ma sens, audyt to pokaże.',
    },
    {
        question: 'Jakie dostępy są potrzebne do audytu e-commerce?',
        answer:
            'Read-only do analityki, zaplecza sklepu, panelu reklam i Google Search Console, na 3 dni. Nie potrzebujemy prawa zapisu ani haseł do systemów finansowych. Listę ustalamy przed startem.',
    },
    {
        question: 'Czy audyt e-commerce jest możliwy dla sklepu na platformie SaaS?',
        answer:
            'Tak. Większość sklepów działa na platformie SaaS i właśnie tam najczęściej widać dług technologiczny. Pracujemy na dostępach read-only, bez ingerencji w kod i bez zmian w sklepie w trakcie audytu.',
    },
    {
        question: 'Co się stanie, jeśli nie wdrożymy rekomendacji od razu?',
        answer:
            'Roadmapa jest ułożona w kolejności wpływu na zysk, więc pierwsze punkty można wdrożyć samodzielnie. Dokument zostaje u klienta. Jeśli wdrożenia mają robić inni, roadmapa jest na tyle konkretna, żeby mogli z niej pracować.',
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
            'Audyt e-commerce: sprzedaż, marża, technologia i dane oraz operacje sklepu. Raport i roadmapa w 5-7 dni roboczych, za stałą kwotę znaną z góry.',
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
                description="Audyt e-commerce to przegląd sklepu z perspektywy zarządzania: sprzedaży, marży, technologii i czasu pracy zespołu. Trwa 5-7 dni roboczych i kończy się raportem z roadmapą, czyli listą napraw w kolejności wpływu na zysk."
                cta={{ label: 'Pierwsza rozmowa 15 minut', href: '/kontakt' }}
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

            <Section border={false}>
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Koszt audytu to stała kwota ustalana z góry na rozmowie wstępnej, odliczana w pierwszym miesiącu stałej współpracy. Klient nie musi zmieniać platformy ani wchodzić w abonament, żeby dostać plan.
                    </p>
                </div>
            </Section>

            <Section title="Czym jest audyt e-commerce">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Audyt e-commerce to analiza sklepu prowadzona z perspektywy osoby, która odpowiada za wynik, a nie za jeden kanał. Szukamy miejsc, w których sklep traci sprzedaż, marżę i czas zespołu, a potem układamy je w kolejności naprawy.
                    </p>
                    <p className="ct-body">
                        Audyt nie jest listą błędów UX ani przeglądem SEO. Te elementy wchodzą do środka, ale jako środek do wyniku. Decyzja o tym, co robić najpierw, zapada na podstawie wpływu na zysk i kosztu wdrożenia.
                    </p>
                </div>
            </Section>

            <Section id="zakres" tint title="Co obejmuje audyt e-commerce">
                <NumberedGrid cols={4} items={areas} />
            </Section>

            <Section title="Ile trwa audyt e-commerce">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Audyt trwa 5-7 dni roboczych od momentu, w którym dostajemy dostępy. Po stronie klienta oznacza to dwie godziny wywiadu oraz nadanie dostępu read-only do analityki i zaplecza sklepu na 3 dni.
                    </p>
                    <p className="ct-body">
                        Termin liczymy od dostępu, nie od podpisania umowy. Jeśli dostępy są gotowe, audyt kończy się w jednym tygodniu roboczym.
                    </p>
                </div>
            </Section>

            <Section id="cena" tint title="Ile kosztuje audyt e-commerce">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5" style={proseStyle}>
                        <p className="ct-body">
                            Audyt kosztuje {AUDIT_PRICE}. Kwota jest stała i ustalana z góry na rozmowie wstępnej, po ustaleniu zakresu. Klient zna ją przed startem prac i nie ma rozliczania godzin ani dopłat za dodatkowe ustalenia.
                        </p>
                        <p className="ct-body">
                            Koszt audytu jest odliczany w pierwszym miesiącu stałej współpracy. Jeśli klient wdraża rekomendacje samodzielnie, roadmapa zostaje u niego i nie ma dalszych zobowiązań.
                        </p>
                    </div>
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
                description="Zamiast sprzedawać stałą obsługę w ciemno, najpierw udowadniamy wartość. Audyt mapuje problemy, które potem rozwiązujemy w ramach stałej współpracy albo Wy z naszą roadmapą."
            >
                <NumberedGrid cols={3} items={deliverables} />
                <div className="mt-10">
                    <p className="ct-body" style={{ maxWidth: 860 }}>
                        Wszystkie trzy dokumenty są pisane tak, żeby dało się z nimi pracować bez nas. To świadoma decyzja: audyt ma zostawić plan, nie uzależnienie. Wdrożenia z roadmapy, w tym migracje i rozwój sklepu, prowadzimy w ramach{' '}
                        <Link href="/uslugi/e-commerce" style={linkStyle}>e-commerce</Link>.
                    </p>
                </div>
            </Section>

            <Section title="Jak się przygotować do audytu">
                <BulletColumns items={preparation} />
            </Section>

            <Section tint>
                <SplitLayout
                    eyebrow="Doświadczenie"
                    title="Audytujemy z doświadczeniem w zarządzaniu e-commerce"
                >
                    <p className="ct-body">
                        Zespół CreativeTrust ma doświadczenie w e-commerce marek z wielu branż: moda, automotive, kosmetologia, farmacja, telefony. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.
                    </p>
                </SplitLayout>
                <div className="mt-10">
                    <NumberedGrid cols={3} numbered={false} items={experience.map((item) => ({ title: item.brand, text: item.text }))} />
                </div>
            </Section>

            <Section eyebrow="Model współpracy" title="Małe ryzyko na starcie, konkretny plan na dalej">
                <NumberedGrid cols={3} items={steps} />
                <div className="mt-10">
                    <InlineCTA
                        title="Po audycie możemy poprowadzić e-commerce z zewnątrz"
                        text="Roadmapa kończy się konkretną propozycją: które punkty naprawiamy, jakie dashboardy wdrażamy i jaki jest miesięczny abonament w stałej współpracy."
                        cta={{ label: 'Zarządzanie e-commerce', href: MANAGEMENT_HREF }}
                    />
                </div>
                <div className="mt-8">
                    <p className="ct-body" style={{ maxWidth: 860 }}>
                        Więcej o stałej współpracy: <Link href={MANAGEMENT_HREF} style={linkStyle}>outsourcing e-commerce</Link>.
                    </p>
                </div>
            </Section>

            <Section tint eyebrow="FAQ" title="Pytania o audyt e-commerce" maxWidth={1100}>
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
