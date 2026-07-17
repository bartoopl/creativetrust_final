import type { Metadata } from 'next';
import Image from 'next/image';
import LandingLeadForm from '@/components/LandingLeadForm';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import NotchedButton from '@/components/ui/NotchedButton';
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/landing-page-google-ads`;

export const metadata: Metadata = {
    title: 'Landing page Google Ads | Strona pod kampanie i reklamy',
    description:
        'Landing page Google Ads, Meta Ads i performance marketing. Strona pod reklamy, która zwiększa konwersję i wspiera SEO. Projektujemy pod zapytania sprzedażowe.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Landing page Google Ads | CreativeTrust',
        description:
            'Tworzymy landing page pod kampanie płatne, reklamy i lead generation. Szybko, czytelnie i pod konwersję.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Landing page Google Ads | CreativeTrust',
        description:
            'Strona pod reklamy Google Ads i kampanie performance. Projekt pod kliknięcia, leady i wynik.',
    },
    robots: {
        index: false,
        follow: true,
    },
};

const signals = [
    'wysoki CPC wymaga wyższej konwersji po kliknięciu',
    'ruch z kampanii płatnych potrzebuje jasnej ścieżki do CTA',
    'strona główna nie zawsze jest najlepszym miejscem na kampanię',
    'każda sekunda ładowania wpływa na wynik kampanii',
    'landing page powinien mówić jednym językiem z reklamą',
];

const essentials = [
    {
        title: 'Jedna obietnica',
        text: 'Landing page odpowiada na jedno zapytanie i prowadzi do jednego konkretnego działania.',
    },
    {
        title: 'Szybkie ładowanie',
        text: 'Optymalizujemy wydajność, bo każda dodatkowa sekunda obniża skuteczność kampanii.',
    },
    {
        title: 'Treść pod intencję',
        text: 'Układamy copy tak, żeby odpowiadało na pytanie użytkownika z reklamy, a nie ogólnie opisywało firmę.',
    },
    {
        title: 'Pomiar konwersji',
        text: 'Podpinamy analitykę, żeby wiedzieć, który komunikat i które CTA daje wynik.',
    },
];

const useCases = [
    'kampania Google Ads na konkretną usługę',
    'reklama lead generation dla B2B',
    'Meta Ads kierujące do jednej oferty',
    'testowanie nowych komunikatów sprzedażowych',
];

const process = [
    {
        title: 'Research i intencja',
        text: 'Sprawdzamy frazę, konkurencję i cel użytkownika. Landing bez tej warstwy zwykle przepala budżet.',
    },
    {
        title: 'Wireframe i komunikat',
        text: 'Budujemy strukturę sekcji tak, żeby reklama i strona mówiły tym samym językiem.',
    },
    {
        title: 'Design i wdrożenie',
        text: 'Robimy stronę lekką, szybą i czytelną. Dla kampanii to ważniejsze niż efekciarstwo.',
    },
    {
        title: 'Test i optymalizacja',
        text: 'Po starcie mierzymy zachowanie użytkowników i poprawiamy treść, układ i CTA.',
    },
];

const faqs = [
    {
        question: 'Czy landing page pod Google Ads powinien być osobną stroną?',
        answer: 'Tak, jeśli kampania ma jedną ofertę i jeden cel konwersji. Osobna strona zwykle lepiej dopasowuje komunikat niż homepage.',
    },
    {
        question: 'Czym różni się od zwykłej strony usługowej?',
        answer: 'Landing ma krótszą ścieżkę, mniej rozpraszaczy i mocniejsze CTA. Strona usługowa jest szersza i mniej wyspecjalizowana.',
    },
    {
        question: 'Czy pomagacie też z SEO takiego landinga?',
        answer: 'Tak, ale w sensie technicznym i treściowym: intencja, meta, nagłówki, wydajność i linkowanie. Nie robimy klasycznego SEO kampanijnego.',
    },
];

export default function GoogleAdsLandingPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Landing page Google Ads', url: canonicalUrl },
    ]);
    const serviceSchema = buildServiceSchema({
        name: 'Landing page Google Ads',
        description:
            'Strona pod kampanie Google Ads i performance marketing, projektowana pod jedną ofertę i jedną konwersję.',
        url: canonicalUrl,
        serviceType: 'Landing page pod reklamy',
    });
    const faqSchema = buildFaqSchema(faqs.map(({ question, answer }) => ({ question, answer })));

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={[breadcrumbSchema, serviceSchema, faqSchema]} />

            <section className="bg-black px-6 py-20 text-white md:py-28">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="mb-6 text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--lime-ink)' }}>
                            Performance landing page
                        </p>
                        <h1 className="mb-8 text-3xl font-medium leading-tight md:text-5xl">
                            Landing page Google Ads, która zamienia kliknięcia w zapytania
                        </h1>
                        <p className="mb-10 max-w-3xl text-xl text-white/70">
                            Projektujemy strony pod reklamy płatne, które mają jedną rolę: zwiększyć konwersję.
                            Copy, UX, wydajność i CTA układamy pod konkretną ofertę, nie pod ogólną wizytówkę.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <NotchedButton href="#formularz" variant="primary-dark">
                                Zleć landing page
                            </NotchedButton>
                            <NotchedButton href="/uslugi/strony-www" variant="ghost-dark">
                                Oferta stron WWW
                            </NotchedButton>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/images/seo/google-ads-audit-hero.png"
                                alt="Landing page pod Google Ads i kampanie reklamowe"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
                            <p className="mb-6 text-white/40">Kiedy landing page jest potrzebny?</p>
                            <div className="space-y-4">
                                {signals.map((item) => (
                                    <div key={item} className="flex gap-4">
                                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                                        <p className="text-lg text-white/90">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Co musi mieć dobra strona pod reklamy?</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Landing page pod Google Ads działa, gdy usuwa tarcie i nie rozprasza uwagi
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {essentials.map((item) => (
                            <div key={item.title} className="rounded-3xl border border-gray-200 p-8">
                                <h3 className="mb-4 text-xl font-medium">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Dla kogo</p>
                        <h2 className="text-2xl font-medium leading-tight md:text-4xl">
                            Jedna strona pod reklamę, jedna oferta, jeden ruch użytkownika
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {useCases.map((item) => (
                            <div key={item} className="rounded-2xl bg-white p-6 shadow-sm">
                                <p className="text-gray-800">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>Proces</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Projektujemy landing page pod kampanię, nie odwrotnie
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {process.map((item, index) => (
                            <div key={item.title} className="rounded-3xl bg-black p-8 text-white">
                                <div className="mb-8 text-3xl font-bold text-white/20">
                                    0{index + 1}
                                </div>
                                <h3 className="mb-4 text-xl font-medium">{item.title}</h3>
                                <p className="text-white/70 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 rounded-3xl bg-gray-50 p-8 md:p-12">
                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <h2 className="mb-4 text-3xl font-medium">Masz kampanię i potrzebujesz lepszego landing page?</h2>
                                <p className="max-w-2xl text-gray-600">
                                    Zrobimy stronę pod konkretną frazę, reklamę i konwersję. Bez kopiowania homepage.
                                </p>
                            </div>
                            <NotchedButton href="#formularz" variant="primary-light">
                                Poproś o landing page
                            </NotchedButton>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <div className="mb-10 max-w-3xl">
                        <p className="mb-3" style={{ color: 'var(--lime-ink)' }}>FAQ</p>
                        <h2 className="text-2xl font-medium md:text-4xl">Najczęstsze pytania o landing page pod reklamy</h2>
                    </div>
                    <FAQAccordion items={faqs.map(({ question, answer }) => ({ question, answer }))} />
                </div>
            </section>

            <section id="formularz" className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <LandingLeadForm
                        formTitle="Landing page pod Google Ads"
                        formSubtitle="Opisz usługę, kampanię i cel konwersji. Przygotujemy landing page, który dopasuje się do reklamy i nie rozproszy użytkownika."
                        subjectPrefix="Landing page Google Ads"
                        serviceOptions={[
                            'landing page pod Google Ads',
                            'landing page pod Meta Ads',
                            'strona pod kampanię performance',
                            'test nowej oferty / nowego komunikatu',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 5 000 zł',
                            '5 000 - 10 000 zł',
                            '10 000 - 20 000 zł',
                            'powyżej 20 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, jaka usługa lub oferta ma być promowana, skąd będzie ruch i jaka konwersja ma się wydarzyć po wejściu na stronę."
                    />
                </div>
            </section>
        </main>
    );
}
