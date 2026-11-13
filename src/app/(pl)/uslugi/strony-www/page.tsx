import { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import { InlineCTA } from '@/components/LandingBlocks';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: { absolute: 'Strony internetowe dla firm, które sprzedają | CreativeTrust' },
    description: 'Strony internetowe dla firm, które mają pracować na sprzedaż: projekt, wdrożenie i SEO. Strona internetowa dla firmy od briefu do startu.',
    alternates: pageAlternates('/uslugi/strony-www', 'pl', SITE_URL),
    openGraph: {
        title: 'Strony internetowe dla firm, które sprzedają | CreativeTrust',
        description: 'Strony internetowe dla firm, które mają pracować na sprzedaż: projekt, wdrożenie i SEO. Strona internetowa dla firmy od briefu do startu.',
        url: `${SITE_URL}/uslugi/strony-www`, siteName: 'CreativeTrust', locale: 'pl_PL', type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Strony internetowe dla firm, które sprzedają | CreativeTrust',
        description: 'Strony internetowe dla firm, które mają pracować na sprzedaż: projekt, wdrożenie i SEO. Strona internetowa dla firmy od briefu do startu.',
    },
};

const proseStyle = { maxWidth: 860 };
const linkStyle = { color: 'var(--accent)', textDecoration: 'underline' };

const types = [
    { num: '01', title: 'Strony firmowe', description: 'Serwis marki z jasną ofertą i ścieżką do kontaktu, projektowany pod zapytania i SEO.' },
    { num: '02', title: 'Landing pages', description: 'Strony pod kampanie, produkty i wydarzenia, spięte z analityką i formularzem.' },
    { num: '03', title: 'Strony marek przy sklepie', description: 'Serwis korporacyjny, B2B albo inwestorski obok e-commerce, spójny z marką i sklepem.' },
    { num: '04', title: 'Portale i platformy', description: 'Rozbudowane serwisy z logowaniem, panelem i logiką biznesową.' },
];

const audience = [
    'firmy usługowe, które sprzedają przez rozmowę i potrzebują, żeby strona przygotowała klienta do tej rozmowy',
    'producenci B2B, którzy muszą pokazać zakres, technologię i realizacje, zanim ktoś napisze',
    'firmy, które mają stronę-wizytówkę i widzą, że nie generuje zapytań',
    'firmy po zmianie oferty, które potrzebują nowej architektury, a nie liftingu grafiki',
];

const difference = [
    'Jedno zadanie zamiast wszystkiego naraz. Każda podstrona ma jasny cel i jedno główne działanie.',
    'Treść z rozmów, nie z broszury. Sekcje powstają z pytań, które klient zadaje w pierwszym kontakcie, a nie z wewnętrznego słownika firmy.',
    'Ścieżka kontaktu bez pułapek. Formularz, telefon i mail widoczne tam, gdzie klient jest gotowy.',
    'Pomiar od pierwszego dnia. Wiemy, skąd przychodzą zapytania i które podstrony je generują.',
    'Edycja bez programisty. Treści zmienia zespół, nie agencja, i nie płaci za każdą poprawkę.',
];

const stackReasons = [
    'Szybkość. Strony budowane na Astro i Next.js ładują się szybciej, bo nie dociągają kodu, którego nie używają. Szybkość przekłada się na SEO i na to, czy ktoś zostaje na stronie.',
    'Brak wtyczek. Nie ma czego aktualizować poza naszym kodem i bibliotekami, którymi faktycznie zarządzamy.',
    'Koszt utrzymania. Hosting i utrzymanie takiej strony są przewidywalne, bo nie płaci się za kolejne dodatki do kreatora.',
    'Kontrola nad treścią. Treści siedzą w panelu, a nie w szablonie. Zmiana sekcji nie wymaga przebudowy całej strony.',
];

const process = [
    { num: '01', title: 'Brief i cel', description: 'Ustalamy, do kogo strona mówi, co ma się stać po wejściu i jak zmierzymy efekt.' },
    { num: '02', title: 'Architektura i treść', description: 'Układamy strukturę podstron i piszemy treść, zanim powstanie projekt graficzny. Najpierw decyzje, potem piksele.' },
    { num: '03', title: 'Projekt UI', description: 'Makiety w Figmie, klikalny prototyp. Klient widzi stronę przed pierwszym dniem kodowania.' },
    { num: '04', title: 'Wdrożenie', description: 'Kod, CMS, SEO techniczne, analityka i testy na urządzeniach.' },
    { num: '05', title: 'Start i opieka', description: 'Publikacja, monitoring i poprawki po starcie. Strona nie kończy się w dniu wdrożenia.' },
];

const standard = [
    { title: 'Wydajność powyżej 90', description: 'Core Web Vitals i PageSpeed Score powyżej 90. Szybkość to SEO i konwersja, więc budujemy od podstaw pod wyniki.' },
    { title: 'SEO on-page', description: 'Architektura semantyczna, meta tagi, dane strukturalne, sitemap i canonicale ustawione od pierwszego dnia.' },
    { title: 'Headless CMS', description: 'Sanity, Contentful lub Strapi, czyli treści edytowane bez dotykania kodu.' },
    { title: 'Responsywność i dostępność', description: 'Poprawne działanie na każdym urządzeniu, zgodność z WCAG 2.1 AA.' },
    { title: 'Pomiar od pierwszego dnia', description: 'Zdarzenia, formularze i źródła zapytań w analityce.' },
    { title: 'Wsparcie po wdrożeniu', description: 'Aktualizacje, optymalizacje i rozbudowa strony po starcie.' },
];

const tech = ['Astro', 'Next.js', 'React', 'Sanity CMS', 'TypeScript', 'Tailwind CSS', 'Vercel / Netlify', 'Figma', 'Google Tag Manager'];

const faqs = [
    {
        question: 'Ile kosztuje strona internetowa?',
        answer:
            'Landing page od 3 500 zł netto, strona firmowa od 7 500 zł netto, strona firmowa z CMS od 10 000 zł netto. Rozbudowane serwisy wyceniamy indywidualnie. Szczegóły w cenniku stron WWW.',
    },
    {
        question: 'Czy będę mógł sam edytować treści?',
        answer:
            'Tak. Wdrażamy headless CMS, w którym zespół edytuje treści bez dotykania kodu. Zmiana tekstu, dodanie realizacji czy wpisu nie wymaga zlecenia do agencji.',
    },
    {
        question: 'Jak szybka będzie moja strona?',
        answer:
            'Standard to PageSpeed powyżej 90 punktów i dobre Core Web Vitals. Budujemy od podstaw pod wydajność, bo szybkość wpływa na SEO i na to, czy klient zostaje na stronie.',
    },
    {
        question: 'Dlaczego nie wystarczy kreator?',
        answer:
            'Kreator działa, dopóki strona jest prosta. Przy większej liczbie sekcji, integracji i treści pojawiają się wtyczki, spadek szybkości i koszt utrzymania. Własny kod daje kontrolę nad tym, co się ładuje i jak strona się zmienia.',
    },
    {
        question: 'Czy robicie też sklepy internetowe?',
        answer:
            'Sklepy prowadzimy jako osobną usługę e-commerce. Strona firmowa i sklep to dwa różne projekty, inne decyzje i inny sposób pomiaru.',
    },
    {
        question: 'Czy opiekujecie się stroną po wdrożeniu?',
        answer:
            'Tak. Po starcie zajmujemy się aktualizacjami, optymalizacją i rozbudową. Zakres opieki ustalamy przy wdrożeniu, żeby nikt nie zgadywał, kto reaguje, gdy coś przestanie działać.',
    },
];

export default function WebsitesPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Strony internetowe', url: `${SITE_URL}/uslugi/strony-www` },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Strony WWW',
        description:
            'Strony internetowe dla firm usługowych i producentów B2B: treść, konwersja, Astro i Next.js, headless CMS, SEO i pomiar.',
        url: `${SITE_URL}/uslugi/strony-www`,
        serviceType: 'Projektowanie stron WWW',
    });
    const faqSchema = buildFaqSchema(faqs);

    return (
        <main style={{ minHeight: '100vh' }}>
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <PageHero
                eyebrow="Strony WWW"
                title={<>Strony internetowe z konkretną rolą <span style={{ color: 'var(--accent)' }}>w sprzedaży.</span></>}
                description="Strona firmowa ma jedno zadanie: doprowadzić właściwą osobę do zapytania. Projektujemy i wdrażamy strony dla firm usługowych i producentów B2B, którzy potrzebują serwisu tłumaczącego ofertę, a nie kolejnej wizytówki. Każdy element ma powód: pierwszy ekran, kolejność sekcji, formularz i sposób pomiaru."
                cta={{ label: 'Wycena projektu', href: '/kontakt' }}
                ctaSecondary={{ label: 'Zobacz cennik', href: '/uslugi/tworzenie-stron-www-cennik' }}
            >
                <div className="ct-grid-lines grid-cols-2 sm:grid-cols-4" style={{ marginTop: 16, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {[['150+', 'projektów'], ['15+', 'lat na rynku'], ['90+', 'PageSpeed'], ['od 3 500 zł', 'landing page, netto']].map(([val, label]) => (
                        <div key={label} className="flex flex-col gap-1.5" style={{ padding: '18px 20px' }}>
                            <span style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-1px', lineHeight: 1 }}>{val}</span>
                            <span className="ct-meta">{label}</span>
                        </div>
                    ))}
                </div>
            </PageHero>

            <Section border={false}>
                <div className="flex flex-col gap-5" style={proseStyle}>
                    <p className="ct-body">
                        Pracujemy na własnym kodzie, nie na kreatorze. Dzięki temu strona jest szybka, nie zbiera wtyczek i nie zaskakuje kosztem utrzymania po dwóch latach. Treści klient edytuje sam, w panelu, bez wchodzenia w kod.
                    </p>
                </div>
            </Section>

            <Section id="oferta" eyebrow="Typy projektów" title="Jakie strony budujemy">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2">
                    {types.map((t) => (
                        <div key={t.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{t.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{t.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15, flex: 1 }}>{t.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section tint title="Dla kogo pracujemy">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {audience.map((item) => (
                            <li key={item} className="flex items-start gap-3" style={{ padding: '14px 0', borderTop: '1px solid var(--line)' }}>
                                <span className="ct-bullet" aria-hidden="true" style={{ marginTop: 8 }} />
                                <span className="ct-body" style={{ fontSize: 15.5 }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-5">
                        <p className="ct-body">
                            Nie robimy sklepów internetowych na tej stronie. E-commerce prowadzimy jako osobną usługę, bo sklep rządzi się innymi zasadami: koszykiem, płatnościami, logistyką i marżą.{' '}
                            <Link href="/uslugi/e-commerce" style={linkStyle}>Zobacz sklepy internetowe</Link>.
                        </p>
                        <p className="ct-body">
                            Czego nie robimy: nie sprzedajemy gotowych szablonów i nie rozliczamy projektu od godziny. Nie obiecujemy też pozycji w Google, bo na wynik wpływa konkurencja, treść i linki, a nie sam projekt. Odpowiadamy za to, co kontrolujemy: strukturę, treść, szybkość, pomiar i to, czy strona prowadzi do kontaktu.
                        </p>
                    </div>
                </div>
            </Section>

            <Section title="Czym różni się strona pod biznes od wizytówki">
                <div className="flex flex-col gap-8" style={proseStyle}>
                    <p className="ct-body">
                        Wizytówka mówi, że firma istnieje. Strona pod biznes prowadzi rozmowę: odpowiada na pytania, które klient i tak zadałby w mailu, i usuwa powody, żeby napisać do kogoś innego.
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {difference.map((item) => (
                            <li key={item} className="flex items-start gap-3" style={{ padding: '14px 0', borderTop: '1px solid var(--line)' }}>
                                <span className="ct-bullet" aria-hidden="true" style={{ marginTop: 8 }} />
                                <span className="ct-body" style={{ fontSize: 15.5 }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>

            <Section tint title="Dlaczego Astro i Next.js, a nie kreator">
                <div className="flex flex-col gap-8" style={proseStyle}>
                    <p className="ct-body">
                        Kreator jest dobry na start, gdy strona ma po prostu być. Problem pojawia się później: każda funkcja to wtyczka, każda wtyczka to obciążenie, a aktualizacje potrafią zepsuć układ. Po dwóch latach strona zwalnia, a koszt utrzymania rośnie.
                    </p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {stackReasons.map((item) => (
                            <li key={item} className="flex items-start gap-3" style={{ padding: '14px 0', borderTop: '1px solid var(--line)' }}>
                                <span className="ct-bullet" aria-hidden="true" style={{ marginTop: 8 }} />
                                <span className="ct-body" style={{ fontSize: 15.5 }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>

            <Section eyebrow="Proces" title="Proces od briefu do wdrożenia">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {process.map((s) => (
                        <div key={s.num} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 12 }}>{s.num}</span>
                            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{s.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15, flex: 1 }}>{s.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section tint eyebrow="Standard projektu" title="Standard każdej strony">
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {standard.map((f) => (
                        <div key={f.title} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500 }}>{f.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Tech stack" title="Technologie">
                <div className="flex flex-wrap gap-2">
                    {tech.map((t) => (
                        <span key={t} className="ct-pill">{t}</span>
                    ))}
                </div>
                <div className="mt-8">
                    <p className="ct-body" style={{ maxWidth: 860 }}>
                        Projekty są autorskie, na Astro albo Next.js, w zależności od tego, czy strona ma być głównie treścią, czy aplikacją. Nie dokładamy technologii, których nie utrzymamy.
                    </p>
                </div>
            </Section>

            <Section tint eyebrow="FAQ" title="Pytania o strony internetowe" maxWidth={1100}>
                <FAQAccordion items={faqs} />
            </Section>

            <div className="mx-auto max-w-[1100px] px-6 pb-4">
                <InlineCTA
                    title="Masz stronę, która nie generuje zapytań?"
                    text="Zacznij od audytu: pokaże, czy problem jest w treści, strukturze czy technice i czy potrzebna jest przebudowa."
                    cta={{ label: 'Audyt strony internetowej', href: '/uslugi/audyt-strony-internetowej' }}
                />
            </div>

            <CTASection
                title="Napisz, co ma robić Twoja strona i kto ma na nią trafiać"
                description="Odpowiemy zakresem i terminem, a nie samą kwotą."
                cta={{ label: 'Pierwsza rozmowa 15 minut', href: '/kontakt' }}
            />
        </main>
    );
}
