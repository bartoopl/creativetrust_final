import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { BulletColumns, InlineCTA, NumberedGrid, SplitLayout } from '@/components/LandingBlocks';
import { experience } from '@/lib/experience';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';


const canonicalUrl = `${SITE_URL}/uslugi/audyt-strony-internetowej`;

/** Published website audit fee, kept in `publishedPrices` too. */
const AUDIT_NAME = 'Audyt strony internetowej';
const AUDIT_PRICE = '1 500 zł netto';
const AUDIT_HREF = '/uslugi/audyt-strony-internetowej';
const WEBSITES_HREF = '/uslugi/strony-www';

export const metadata: Metadata = {
    title: { absolute: 'Audyt strony internetowej: co blokuje zapytania' },
    description:
        'Audyt strony internetowej: treść, konwersja, Core Web Vitals, SEO i widoczność w AI. Raport z priorytetami i planem przebudowy.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
        title: 'Audyt strony internetowej: co blokuje zapytania',
        description:
            'Audyt strony internetowej: treść, konwersja, Core Web Vitals, SEO i widoczność w AI. Raport z priorytetami i planem przebudowy.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Audyt strony internetowej: co blokuje zapytania',
        description:
            'Audyt strony internetowej: treść, konwersja, Core Web Vitals, SEO i widoczność w AI. Raport z priorytetami i planem przebudowy.',
    },
};

const proseStyle = { maxWidth: 860 };
const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' };

const heroFacts = [
    { label: 'Wynik', value: 'raport, plan przebudowy i wycena zakresu' },
    { label: 'Cena', value: AUDIT_PRICE },
    { label: 'Czas realizacji', value: '5 dni roboczych' },
    { label: 'Twój czas', value: 'jedna rozmowa o ofercie i sprzedaży' },
];

const contentPoints = [
    'czy pierwszy ekran mówi, co firma robi i dla kogo',
    'czy język jest językiem klienta, a nie wewnętrznym językiem firmy',
    'czy strona odpowiada na pytania, które klient zadaje w rozmowie handlowej',
    'czy oferta jest opisana korzyścią i zakresem, a nie listą technologii',
    'czy nie ma miejsc, w których treść obiecuje więcej, niż firma dowozi',
];

const conversionPoints = [
    'czy na każdej podstronie wiadomo, co zrobić dalej',
    'ile kliknięć dzieli użytkownika od formularza lub telefonu',
    'czy formularz prosi o minimum danych i czy działa na telefonie',
    'czy strona ma sygnały zaufania: realizacje, zakres, sposób pracy',
    'czy mierzymy, skąd przychodzą zapytania i które sekcje są czytane',
];

const techPoints = [
    'czas ładowania i stabilność układu na telefonie i komputerze',
    'Core Web Vitals: LCP, INP i CLS, czyli to, co Google mierzy jako jakość doświadczenia',
    'poprawność nagłówków, danych strukturalnych i mapy strony',
    'działanie na starszych telefonach i przy słabym zasięgu',
    'dostępność: kontrast, obsługa klawiaturą, opisy obrazów',
];

const seoPoints = [
    'czy strona odpowiada na intencje, z którymi ludzie naprawdę szukają usługi',
    'czy tytuły i opisy stron są napisane pod kliknięcie, a nie pod nazwę wewnętrzną',
    'czy treść ma szansę być cytowana w AI Overviews i odpowiedziach asystentów',
    'czy nie ma duplikacji i kanibalizacji między podstronami',
    'czy linkowanie wewnętrzne prowadzi od artykułu do zapytania',
];

const deliverables = [
    {
        title: 'Raport z priorytetami',
        text: 'Lista problemów ułożona według wpływu na liczbę zapytań, a nie według kolejności naprawiania. Każdy punkt ma opis, skutek i sposób naprawy.',
    },
    {
        title: 'Plan przebudowy',
        text: 'Etapy prac z podziałem na to, co robimy najpierw, co może poczekać i co wymaga decyzji biznesowej, a nie technicznej.',
    },
    {
        title: 'Wycena zakresu',
        text: 'Kwota dla wariantu minimalnego, czyli naprawy tego, co blokuje zapytania, oraz dla wariantu przebudowy.',
    },
];

const preparation = [
    'Cel strony: jedno zdanie, co strona ma dawać sprzedaży.',
    'Dostępy: analityka, panel strony, ewentualnie panel reklam. Read-only wystarczy.',
    'Osoba do rozmowy: ktoś, kto zna ofertę i najczęstsze pytania klientów.',
    'Lista pytań od klientów: nawet z maili i notatek z rozmów. To najlepsze źródło treści.',
    'Kontekst: co już próbowaliście i co nie zadziałało.',
];

const faqs = [
    {
        question: 'Czym audyt strony różni się od audytu SEO?',
        answer:
            'Audyt SEO odpowiada na pytanie, czy strona jest widoczna w wyszukiwarce. Audyt strony patrzy szerzej: treść, ścieżka kontaktu, technika i widoczność. SEO jest jednym z czterech obszarów, bo sama widoczność bez działającej ścieżki kontaktu nie daje zapytań.',
    },
    {
        question: 'Czy audyt obejmuje też treść i copy?',
        answer:
            'Tak. Oceniamy, czy pierwszy ekran mówi, co firma robi i dla kogo, czy język jest zrozumiały i czy strona odpowiada na pytania z rozmów handlowych. Wskazujemy, które sekcje przepisać i co w nich zmienić.',
    },
    {
        question: 'Ile trwa audyt i co jest potrzebne do startu?',
        answer:
            '5 dni roboczych od dostępu. Potrzebujemy analityki, panelu strony i jednej rozmowy z osobą, która zna ofertę.',
    },
    {
        question: 'Ile kosztuje audyt strony internetowej?',
        answer:
            '1 500 zł netto. Kwota jest stała i ustalana przed startem, po rozmowie o celu i zakresie. Jeśli klient wchodzi w przebudowę, koszt audytu jest odliczany od projektu.',
    },
    {
        question: 'Czy audyt oznacza, że trzeba robić nową stronę?',
        answer:
            'Nie zawsze. Część stron wymaga poprawy pierwszego ekranu, formularza i szybkości, a nie nowego projektu. Audyt pokazuje, czy problem jest w treści, w strukturze, czy w technice, i dopiero na tej podstawie wybieramy wariant.',
    },
    {
        question: 'Czy audyt obejmuje widoczność w ChatGPT i AI Overviews?',
        answer:
            'Sprawdzamy, czy treść strony ma szansę być cytowana w odpowiedziach AI: czy odpowiada na konkretne pytania, czy ma czytelną strukturę i czy jest technicznie dostępna dla robotów. To nowy obszar i traktujemy go jako uzupełnienie SEO, nie zamiennik.',
    },
];

export default function WebsiteAuditPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: AUDIT_NAME, url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: AUDIT_NAME,
        description:
            'Audyt strony internetowej: treść, konwersja, Core Web Vitals, SEO i widoczność w AI. Raport z priorytetami i planem przebudowy w 5 dni roboczych, za 1 500 zł netto.',
        url: canonicalUrl,
        serviceType: 'Audyt strony internetowej',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Audyt strony internetowej"
                title={<>Audyt strony internetowej: sprawdzamy, czy strona pracuje <span style={{ color: 'var(--accent)' }}>na sprzedaż</span></>}
                description="Audyt strony internetowej to przegląd prowadzony pod jedno pytanie: czy osoba, która wchodzi na stronę, rozumie ofertę i zostawia zapytanie. Patrzymy na treść, ścieżkę kontaktu, technikę i widoczność w Google oraz w odpowiedziach AI."
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
                        Szukamy miejsc, w których strona traci zapytania, a nie tylko błędów do naprawy. Klient dostaje trzy rzeczy: raport z listą problemów w kolejności wpływu na sprzedaż, plan przebudowy z podziałem na etapy i wycenę zakresu. To pierwszy krok przebudowy, a nie samo sprawdzanie błędów.
                    </p>
                </div>
            </Section>

            <Section id="definicja" title="Czym jest audyt strony internetowej">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Audyt strony internetowej to uporządkowany przegląd strony firmowej, produktowej lub landing page pod kątem tego, czy spełnia swoje zadanie. Zadaniem strony biznesowej prawie nigdy nie jest „być”, tylko doprowadzić konkretną osobę do konkretnego działania: zapytania, rozmowy, pobrania oferty.
                    </p>
                    <p className="ct-body">
                        Dlatego audyt zaczyna się od celu, a nie od listy błędów. Najpierw ustalamy, do kogo strona mówi i co ma się stać po wejściu. Dopiero potem sprawdzamy, czy treść, układ i technika temu służą. Strona może mieć ładny projekt i jednocześnie nie odpowiadać na pytanie, które klient ma w głowie w pierwszej minucie.
                    </p>
                </div>
            </Section>

            <Section id="zakres" tint title="Co obejmuje audyt strony internetowej">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div>
                        <h3 style={{ margin: '0 0 16px', fontSize: 19, fontWeight: 500 }}>Treść i komunikacja</h3>
                        <BulletColumns items={contentPoints} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 16px', fontSize: 19, fontWeight: 500 }}>Konwersja i ścieżka kontaktu</h3>
                        <BulletColumns items={conversionPoints} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 16px', fontSize: 19, fontWeight: 500 }}>Technika i Core Web Vitals</h3>
                        <BulletColumns items={techPoints} />
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 16px', fontSize: 19, fontWeight: 500 }}>SEO i widoczność w AI</h3>
                        <BulletColumns items={seoPoints} />
                    </div>
                </div>
            </Section>

            <Section title="Ile trwa audyt strony internetowej">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Audyt trwa 5 dni roboczych. Po stronie klienta potrzebujemy dwóch rzeczy: dostępu do analityki i panelu strony oraz jednej rozmowy z osobą, która zna ofertę i proces sprzedaży.
                    </p>
                </div>
            </Section>

            <Section id="cena" tint title="Ile kosztuje audyt strony internetowej">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5" style={proseStyle}>
                        <p className="ct-body">
                            Audyt kosztuje {AUDIT_PRICE}. Jest usługą płatną, bo to konkretna praca analityczna z konkretnym wynikiem. Kwota jest stała i ustalana przed startem, po rozmowie o celu strony i zakresie.
                        </p>
                        <p className="ct-body">
                            Jeśli po audycie klient decyduje się na przebudowę u nas, koszt audytu jest odliczany od projektu. Audyt nie zobowiązuje do przebudowy: raport, plan i wycena zostają u klienta.
                        </p>
                    </div>
                    <div className="ct-grid-lines grid-cols-2 md:grid-cols-4" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        {[
                            { label: 'Cena', value: AUDIT_PRICE },
                            { label: 'Czas realizacji', value: '5 dni roboczych' },
                            { label: 'Twój czas', value: 'jedna rozmowa o ofercie' },
                            { label: 'Dostępy', value: 'read-only do analityki i panelu strony' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col gap-2" style={{ padding: '20px 22px' }}>
                                <span className="ct-meta">{label}</span>
                                <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="wynik" title="Co dostajesz po audycie">
                <NumberedGrid cols={3} items={deliverables} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Pierwszy etap przebudowy" title="Audyt ma sens także wtedy, gdy wiadomo, że strona wymaga większej zmiany">
                    <div className="flex flex-col gap-5">
                        <p className="ct-body">
                            Wtedy nie jest osobnym projektem, tylko pierwszym etapem: zamiast zgadywać, co przebudować, klient dostaje kolejność i zakres.
                        </p>
                        <p className="ct-body">
                            Taka kolejność chroni budżet. Część stron nie potrzebuje nowego projektu, wystarczy poprawa pierwszego ekranu, formularza i szybkości. Część wymaga nowej architektury, bo problem jest w strukturze oferty, a nie w wyglądzie. Audyt rozstrzyga, który wariant jest realny, zanim ktokolwiek zacznie projektować.
                        </p>
                        <p className="ct-body">
                            Jeśli przebudowa jest potrzebna, prowadzimy ją w ramach{' '}
                            <Link href={WEBSITES_HREF} style={linkStyle}>stron internetowych dla firm</Link>. Gdy pytanie dotyczy sklepu, a nie strony firmowej, właściwym pierwszym krokiem jest{' '}
                            <Link href="/uslugi/audyt-e-commerce" style={linkStyle}>audyt e-commerce</Link>.
                        </p>
                    </div>
                </SplitLayout>
            </Section>

            <Section title="Jak się przygotować do audytu">
                <BulletColumns items={preparation} />
            </Section>

            <Section tint>
                <SplitLayout eyebrow="Doświadczenie" title="Audytujemy z doświadczeniem w zarządzaniu e-commerce i budowie stron">
                    <p className="ct-body">
                        Zespół CreativeTrust ma doświadczenie w e-commerce marek z wielu branż i w budowie stron firmowych na własnym kodzie. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.
                    </p>
                </SplitLayout>
                <div className="mt-10">
                    <NumberedGrid cols={3} numbered={false} items={experience.map((item) => ({ title: item.brand, text: item.text }))} />
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o audyt strony internetowej" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <div className="mx-auto max-w-[1100px] px-6 pb-4">
                <InlineCTA
                    title="Napisz, co strona ma dawać sprzedaży"
                    text="Odpowiemy zakresem audytu i kwotą. Jeśli strona wymaga większej zmiany, audyt jest pierwszym etapem, a nie osobnym projektem."
                    cta={{ label: 'Zobacz, jak budujemy strony', href: WEBSITES_HREF }}
                />
            </div>

            <CTASection
                title="Napisz, co strona ma dawać sprzedaży i czego dziś brakuje"
                description="Odpowiemy zakresem audytu i kwotą."
                cta={{ label: 'Pierwsza rozmowa 15 minut', href: '/kontakt' }}
            />
        </main>
    );
}
