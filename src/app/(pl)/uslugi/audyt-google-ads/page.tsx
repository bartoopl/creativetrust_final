import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import { HeroMedia } from '@/components/LandingBlocks';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/audyt-google-ads`;

const pageTitle = 'Audyt Google Ads - audyt konta i kampanii | CreativeTrust';
const pageDescription =
    'Sprawdzamy pomiar konwersji, strukturę kampanii, słowa kluczowe i landing page. Dostajesz listę błędów z priorytetami i plan naprawy.';

export const metadata: Metadata = {
    title: { absolute: pageTitle },
    description: pageDescription,
    // Polish only (no English twin), so no hreflang pair.
    alternates: { canonical: canonicalUrl },
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

const symptoms = [
    'koszt leada lub sprzedaży rośnie, a nikt nie wie dlaczego',
    'konwersje w Google Ads nie zgadzają się z CRM lub sklepem',
    'budżet zjadają frazy, które nie przynoszą klientów',
    'Performance Max działa jak czarna skrzynka',
    'konto prowadzi agencja, a Ty chcesz niezależnej oceny',
];

const proseStyle = { maxWidth: 860 };
const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' };

const faqs = [
    {
        question: 'Co obejmuje audyt Google Ads?',
        answer:
            'Pomiar konwersji (GA4, GTM, consent mode), strukturę kampanii i strategie stawek, słowa kluczowe i wykluczenia, rozkład budżetu, reklamy oraz stronę docelową. Przy e-commerce dochodzą Merchant Center i Performance Max.',
    },
    {
        question: 'Ile kosztuje audyt konta Google Ads?',
        answer:
            'Cena zależy od liczby kont, kampanii i tego, czy audyt obejmuje pomiar i landing page. Wycenę podajemy po krótkiej rozmowie, przed rozpoczęciem pracy, więc znasz kwotę zanim cokolwiek ruszy.',
    },
    {
        question: 'Czy po audycie trzeba podpisać umowę na prowadzenie kampanii?',
        answer:
            'Nie. Plan naprawy zostaje u Ciebie i możesz go wdrożyć samodzielnie lub z obecną agencją. Możemy pomóc we wdrożeniu, ale nie jest to warunek audytu.',
    },
    {
        question: 'Jakie dostępy są potrzebne?',
        answer:
            'Dostęp do odczytu do konta Google Ads i GA4, a jeśli to możliwe także do Google Tag Managera i Merchant Center. Do tego krótka rozmowa o celach, marżach i definicji wartościowego leada.',
    },
    {
        question: 'Ile trwa audyt?',
        answer:
            'Termin ustalamy przed startem, bo zależy od liczby kont i kampanii oraz od tego, czy w zakresie jest pomiar i strona docelowa. Dostajesz konkretną datę, nie widełki „do dwóch tygodni”.',
    },
    {
        question: 'Czy audyt obejmuje Performance Max?',
        answer:
            'Tak. Sprawdzamy, co kampania faktycznie kupuje, jakie sygnały dostaje i czy nie zabiera ruchu kampaniom markowym. Przy e-commerce dochodzi Merchant Center, bo błędy w feedzie psują wyniki niezależnie od budżetu.',
    },
];

export default function GoogleAdsAuditPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Audyt Google Ads', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Audyt Google Ads',
        description:
            'Audyt konta i kampanii Google Ads: pomiar konwersji, struktura kampanii, słowa kluczowe i wykluczenia, budżet, reklamy i landing page. Wynik: lista błędów z priorytetami i plan naprawy.',
        url: canonicalUrl,
        serviceType: 'Audyt Google Ads',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />
            <SchemaScript schema={serviceSchema} />
            <SchemaScript schema={faqSchema} />

            <PageHero
                eyebrow="Audyt Google Ads"
                title="Audyt Google Ads: sprawdzamy, gdzie ucieka budżet"
                description="Sprawdzamy konto Google Ads od pomiaru konwersji, przez strukturę kampanii i słowa kluczowe, po stronę docelową. Dostajesz listę błędów z priorytetami i plan naprawy, a nie ogólne rekomendacje."
                cta={{ label: 'Zamów audyt Google Ads', href: '#formularz' }}
                ctaSecondary={{ label: 'Co sprawdzamy', href: '#zakres' }}
                right={
                    <HeroMedia
                        src="/google-ads.jpg"
                        alt="Audyt konta i kampanii Google Ads"
                        label="Kiedy warto zrobić audyt?"
                        items={symptoms}
                    />
                }
            />

            <Section id="zakres" border={false} title="Co sprawdza audyt konta Google Ads">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Zaczynamy od pomiaru konwersji, bo bez niego reszta liczb jest zgadywaniem. Sprawdzamy GA4, Google Tag Manager, consent mode i import konwersji: czy kampania uczy się na leadach i sprzedaży, czy na kliknięciach, które nic nie znaczą. Dopiero potem patrzymy na strukturę konta: podział kampanii i grup reklam, strategie stawek, Performance Max, Merchant Center i to, czy kampanie nie nakładają się na siebie.
                    </p>
                    <p className="ct-body">
                        Trzeci blok to słowa kluczowe. Raport wyszukiwanych haseł pokazuje, za co płacisz naprawdę, a lista wykluczeń - ile z tego nigdy nie miało szansy sprzedać. Na końcu budżet, komunikaty reklam i strona docelowa, bo najdroższy błąd w Google Ads często leży poza kontem.
                    </p>
                </div>
            </Section>

            <Section tint title="Jak wygląda raport z audytu">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Dostajesz listę błędów, nie prezentację ogólników. Każdy punkt ma opis problemu, wpływ na koszt i wynik oraz priorytet: od rzeczy, które zatrzymują sprzedaż dziś, po porządki, które mogą poczekać. Do tego plan naprawy w kolejności wdrażania, żeby było jasne, co robić najpierw, a co dopiero po poprawieniu pomiaru.
                    </p>
                    <p className="ct-body">
                        Raport czyta osoba, która będzie wdrażać zmiany, nie tylko ta, która zamawiała audyt. Jeśli kampanie prowadzi agencja, to lista argumentów do rozmowy o konkretach, a nie o wrażeniach.
                    </p>
                </div>
            </Section>

            <Section title="Ile trwa audyt i czego potrzebujemy na start">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Termin ustalamy przed startem i zależy on od liczby kont, kampanii oraz tego, czy audyt obejmuje pomiar i stronę docelową. Do pracy potrzebujemy dostępu do odczytu do konta Google Ads i GA4, a jeśli to możliwe także do Google Tag Managera i Merchant Center. Reszta to krótka rozmowa o celach, marżach i o tym, co w Twojej firmie jest wartościowym leadem albo sprzedażą.
                    </p>
                    <p className="ct-body">
                        Nie potrzebujemy dostępu do zapisu. Audyt nie zmienia niczego w koncie bez Twojej decyzji.
                    </p>
                </div>
            </Section>

            <Section tint title="Co dostajesz po audycie">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Trzy rzeczy: listę błędów z priorytetami, plan naprawy i omówienie wyników. Omówienie jest częścią pracy, nie dodatkiem - przechodzimy przez raport i odpowiadamy na pytania zespołu, który będzie wdrażał poprawki. Po rozmowie wiesz, które zmiany zrobić w tym tygodniu, a które po sezonie.
                    </p>
                    <p className="ct-body">
                        Plan zostaje u Ciebie. Możesz go wdrożyć samodzielnie, z obecną agencją albo z nami - decyzja nie jest częścią audytu.
                    </p>
                </div>
            </Section>

            <Section title="Kiedy audyt ma sens, a kiedy wystarczy optymalizacja">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Audyt ma sens, gdy rosną koszty pozyskania, a nikt nie umie wskazać przyczyny. Gdy konwersje w Google Ads nie zgadzają się z CRM lub sklepem, gdy Performance Max działa jak czarna skrzynka albo gdy firma chce niezależnej oceny przed zmianą agencji lub przejęciem konta do środka.
                    </p>
                    <p className="ct-body">
                        Jeśli problem jest wąski i znany, na przykład jedna kampania przepala budżet na frazy bez intencji zakupowej, wystarczy krótsza analiza wskazanego obszaru. Warto to powiedzieć na starcie: audyt całego konta nie jest odpowiedzią na każde pytanie.
                    </p>
                </div>
            </Section>

            <Section tint title="Dla kogo jest ten audyt">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Dla firm B2B, które płacą za leady słabej jakości, sklepów e-commerce z kampaniami produktowymi i Performance Max, firm usługowych, którym rośnie koszt klienta, i zespołów przechodzących zmianę. Wspólnym mianownikiem nie jest branża, a sytuacja: płacisz, ale nie wiesz dokładnie, za co.
                    </p>
                    <p className="ct-body">
                        Jeśli podejrzewasz, że problem zaczyna się wcześniej - w samym sklepie, marży albo koszcie wszystkich kanałów - zacznij od{' '}
                        <Link href="/uslugi/audyt-e-commerce" style={linkStyle}>
                            audytu e-commerce
                        </Link>
                        . Reklamy to często ostatnie ogniwo, nie pierwsze.
                    </p>
                </div>
            </Section>

            <Section title="Co dalej">
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Po audycie najczęściej wchodzi jedno z dwóch: wdrożenie poprawek i dalsze prowadzenie kampanii w ramach{' '}
                        <Link href="/uslugi/marketing-automation" style={linkStyle}>
                            marketing automation
                        </Link>{' '}
                        i pracy na bazie klientów albo porządkowanie pomiaru, żeby każdy kolejny kanał był rozliczalny. Podstawy pojęć, których używamy w raporcie, znajdziesz w bazie wiedzy:{' '}
                        <Link href="/baza-wiedzy/google-ads" style={linkStyle}>
                            Google Ads
                        </Link>
                        . Wyniki projektów, w tym kont reklamowych, opisujemy w{' '}
                        <Link href="/portfolio" style={linkStyle}>
                            portfolio
                        </Link>
                        .
                    </p>
                </div>
            </Section>

            <Section eyebrow="FAQ" title="Pytania o audyt Google Ads" maxWidth={1100}>
                <FAQAccordion items={faqs} />
                <p className="mt-6" style={{ fontSize: 15, color: 'var(--muted)' }}>
                    Więcej o cenie:{' '}
                    <Link href="/blog/ile-kosztuje-audyt-google-ads" className="ct-contact-link">
                        ile kosztuje audyt Google Ads
                    </Link>
                    .
                </p>
            </Section>

            <Section id="formularz" tint maxWidth={1100}>
                <LandingLeadForm
                    formTitle="Audyt Google Ads"
                    formSubtitle="Napisz, jakie kampanie prowadzicie i co dziś nie działa. Wrócimy z zakresem i wyceną audytu."
                    subjectPrefix="Audyt Google Ads"
                    serviceOptions={[
                        'audyt konta Google Ads',
                        'audyt pomiaru konwersji (GA4, GTM)',
                        'audyt Performance Max i Merchant Center',
                        'audyt i pomoc we wdrożeniu poprawek',
                        'nie wiem, potrzebuję rekomendacji',
                    ]}
                    budgetOptions={[
                        'do 5 000 zł miesięcznie',
                        '5 000 - 20 000 zł miesięcznie',
                        '20 000 - 50 000 zł miesięcznie',
                        'powyżej 50 000 zł miesięcznie',
                        'nie wiem',
                    ]}
                    messagePlaceholder="Jakie kampanie prowadzicie, jaki jest miesięczny budżet reklamowy, co jest konwersją i co Was niepokoi w wynikach?"
                />
            </Section>
        </main>
    );
}
