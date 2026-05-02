import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';
import ServicePortfolio from '@/components/ServicePortfolio';
import EcommerceForm from "@/components/EcommerceForm";
import EcommerceDemoSection from '@/components/ecommerce-demo/EcommerceDemoSection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'E-commerce & headless commerce | CreativeTrust → Monkydot',
    description:
        'E-commerce w CreativeTrust realizujemy w Monkydot: headless Next.js, Shopify Plus, Medusa, Saleor, migracje z monolitu, B2B i wysoki ruch. Odejście od nowych projektów na WooCommerce na rzecz architektur headless.',
    alternates: {
        canonical: `${SITE_URL}/uslugi/e-commerce`,
    },
    openGraph: {
        title: 'E-commerce & headless commerce | CreativeTrust',
        description: 'Headless e-commerce, Shopify Plus, Medusa, Saleor, B2B i migracje sklepów w partnerstwie z Monkydot.',
        url: `${SITE_URL}/uslugi/e-commerce`,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'E-commerce & headless commerce | CreativeTrust',
        description: 'Headless e-commerce, Shopify Plus, Medusa, Saleor, B2B i migracje sklepów w partnerstwie z Monkydot.',
    },
};

const MONKYDOT_URL = 'https://monkydot.com';

export default function EcommercePage() {
    const monkydotPillars = [
        {
            title: 'Headless e-commerce',
            description:
                'Storefronty oparte o Next.js (ISR, edge, caching) połączone z silnikami: Shopify Plus, Medusa, Saleor. Architektura pod duży ruch, konwersję i integrację z CMS (np. Sanity), ERP i płatnościami — tak jak w praktyce enterprise.',
            tagline: 'Shopify Plus · Medusa · Saleor · Next.js',
        },
        {
            title: 'B2B i marketplace',
            description:
                'Portale B2B, hurt, multi-vendor i złożone cenniki — od kont organizacji po workflow zamówień i integracje z magazynem oraz OMS. Dla operacji, gdzie sam „sklep na szablonie” nie wystarcza.',
            tagline: 'Medusa · Shopify Plus · Next.js · Algolia',
        },
        {
            title: 'Platformy i narzędzia wewnętrzne',
            description:
                'Panele back-office, dashboardy i narzędzia operacyjne w Next.js / GraphQL / PostgreSQL, gdy trzeba połączyć fragmentaryczne procesy w jeden spójny interfejs pod Twój P&L.',
            tagline: 'Next.js · GraphQL · Postgres · Cloud',
        },
    ];

    const ecommerceFeatures = [
        {
            title: 'Wydajność i skala',
            description:
                'Front w Next.js (ISR, cache), edge tam, gdzie ma sens, oraz monitoring — żeby architektura trzymała obciążenie i nie blokowała rozwoju.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            title: 'Bezpieczeństwo i zgodność',
            description:
                'Szyfrowanie, bezpieczne sesje, uprawnienia do API oraz praktyki zgodne z wymaganiami płatności i danych osobowych — w headless łatwiej egzekwować politykę bezpieczeństwa.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
        {
            title: 'Integracje oprogramowania',
            description:
                'Warstwa danych handlowych połączona z PIM, ERP, OMS, płatnościami (np. Stripe), CDP / automatyzacją — projektowana kontraktami API, nie „klejem w motywie”.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
            ),
        },
        {
            title: 'SEO i doświadczenie w storefront',
            description:
                'Semantyka, wydajność Core Web Vitals, struktura URL i treści z CMS (np. Sanity) — w headless pełna kontrola nad frontem, a nie tylko nad motywem.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            title: 'Dane i analityka',
            description:
                'Zdarzenia, lejki, testy A/B, powiązanie z analityką produktową — możliwość mierzenia tego, co wpływa na P&L, a nie tylko na odsłony.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: 'Kanały i responsywność',
            description:
                'Jeden system treści i zamówień, spójny UI na desktop i mobile, gotowy pod dalsze kanały (B2B, partnerzy) bez przebudowy monolitu.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    const developmentProcess = [
        {
            number: '01',
            title: 'Commerce discovery',
            description:
                'Audyt platformy, operacji i ruchu: wąskie gardła, ścieżka migracji z monolitu (np. WooCommerce) lub legacy, docelowa architektura i zakres fazy.',
        },
        {
            number: '02',
            title: 'Warstwa API i kontrakty',
            description:
                'Definicja modelu danych handlowych, integracje z CMS, ERP, płatnościami, auth, usługami trzecimi — specyfikacje zanim powstanie pierwszy ekran.',
        },
        {
            number: '03',
            title: 'Inżynieria platformy',
            description:
                'Budowa storefrontu i narzędzi w Next.js, caching (ISR, edge), UI dopasowane do marki, testy i jakość wdrożenia.',
        },
        {
            number: '04',
            title: 'Launch i eksploatacja',
            description:
                'Wdrożenie z CI/CD, monitorowanie, skalowanie. Utrzymanie i rozwój: optymalizacja kosztów, wydajności i długu technicznego — bez lock-inu na „jedną wtyczkę”.',
        },
    ];

    const ecommerceCapabilities = [
        'Odrębny front (Next.js) i silnik e-commerce (API) — szybkość, niezależne wdrożenia, mniej ryzyka przy zmianach',
        'Sklepy pod duży ruch: cache, plan skalowania, integracje z płatnościami i magazynem',
        'Headless CMS (np. Sanity, Contentful) do treści i merchandisingu spójnego z katalogiem',
        'B2B: konta, cenniki, workflow zamówień, powiązania z ERP / OMS',
        'Checkout i koszyk dopasowane do marki — pełna kontrola nad UX',
        'Migracje z monolitu (w tym WooCommerce) w kierunku headless, z mniejszą utratą danych i SEO',
        'Observability: logi, metryki, alerty — mniej „cichych” awarii w szczycie',
        'Kody rabatowe, programy lojalnościowe, subskrypcje — w zależności od silnika (Shopify, Medusa, itd.)',
        'Dane klienta i zgody pod automatyzację marketingu (np. SALESmanago) tam, gdzie to część strategii',
        'Strategia TCO: model kosztów platformy jasny z góry, bez nieograniczonego roszenia wtyczek',
    ];

    return (
        <main className="min-h-screen">
            {/* Monkydot — informacja o marce w ramach CreativeTrust */}
            <div className="w-full border-b border-gray-200 bg-white px-6 py-5">
                <div className="max-w-[1800px] mx-auto space-y-2">
                    <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                        <span className="font-medium">E-commerce w CreativeTrust</span> rozwijamy w ramach{' '}
                        <span className="font-semibold">Monkydot</span> — pracowni platform handlowych (headless, duży ruch, integracje z ERP/OMS).
                        Oferta, case studies i dedykowany kontakt:{' '}
                        <a
                            href={MONKYDOT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-black underline underline-offset-2 hover:text-gray-600"
                        >
                            monkydot.com
                        </a>
                        .
                    </p>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        <span className="font-medium text-gray-800">Kierunek technologiczny:</span> nowe projekty e-commerce u nas budujemy przede wszystkim w architekturach{' '}
                        <span className="whitespace-nowrap">headless (Next.js + API)</span> — np. Medusa, Saleor, Shopify Plus jako silnik, zamiast rozwijania sklepów opartych o motywy WooCommerce, które w dużej skali często rosną w dług techniczny.
                    </p>
                </div>
            </div>

            {/* Hero sekcja */}
            <section className="w-full py-24 md:py-32 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h6 className="text-gray-500 mb-4 uppercase tracking-wide">Monkydot × CreativeTrust</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Headless commerce pod Twój ruch i integracje</h1>
                            <p className="text-xl text-gray-600 mb-6">
                        Monkydot to zespół, który projektuje i dowozi platformy e-commerce w Next.js z silnikami typu{' '}
                        <span className="whitespace-nowrap">Shopify Plus, Medusa, Saleor</span> — z naciskiem na wydajność przy szczytach, kontrakty API i realną pracę z legacy (migracje z monolitu, m.in. z WooCommerce), a nie tylko „ładny szablon”.
                            </p>
                            <p className="text-base text-gray-600 mb-10 border-l-4 border-black pl-4">
                                Pełen opis oferty, metodyki delivery (m.in. fazy discovery → API → engineering → launch) i ekosystem współpracy zobaczysz na stronie Monkydot — poniżej skrót zakresu.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                                <a
                                    href={MONKYDOT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out bg-black text-white hover:bg-gray-800"
                                >
                                    <span>Przejdź do Monkydot</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transform transition-transform duration-300 group-hover:rotate-45"
                                        aria-hidden
                                    >
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </a>
                                <Button href="#kontakt" className="!bg-white !text-black border border-gray-300 hover:!bg-gray-100">
                                    Formularz na tej stronie
                                </Button>
                                <Link
                                    href="/uslugi/migracja-woocommerce-do-headless"
                                    className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 font-medium text-black hover:bg-black hover:text-white transition-colors"
                                >
                                    Migracja WooCommerce
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                                <Image
                                    src="/ecommerce-woocommerce.jpg"
                                    alt="Wizualizacja sklepu online — artykuł poglądowy"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zakres Monkydot — zgodnie z monkydot.com */}
            <section className="w-full py-16 md:py-24 px-6 bg-white border-t border-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-14 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-medium mb-4">Zakres Monkydot</h2>
                        <p className="text-lg text-gray-600">
                            Trzy filary, wokół których pracujemy — od storefrontu headless po złożony B2B i narzędzia operacyjne. Szczegóły, case studies i stack:{' '}
                            <a href={MONKYDOT_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-black underline underline-offset-2 hover:text-gray-600">
                                monkydot.com
                            </a>
                            .
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {monkydotPillars.map((pillar) => (
                            <div
                                key={pillar.title}
                                className="p-8 rounded-xl border border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-xl font-medium mb-3">{pillar.title}</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">{pillar.description}</p>
                                <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">{pillar.tagline}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Możliwości e-commerce */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Co daje architektura headless u nas</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Zestaw możliwości, który w praktyce odróżnia stack oparty o Next.js i API od rozbudowy sklepu wyłącznie w ekosystemie motywów i wtyczek — szczególnie gdy rośnie ruch, liczba integracji albo zespół produktowy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <Image
                                src="/woocommerce-dashboard.jpg"
                                alt="Panel operacyjny e-commerce — ilustracja"
                                width={600}
                                height={400}
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-medium mb-6">Kluczowe elementy</h3>
                            <ul className="space-y-3">
                                {ecommerceCapabilities.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="text-2xl md:text-3xl font-bold mb-2">Next.js</div>
                                <p className="text-gray-600">storefront, ISR, edge — pełna kontrola nad UX i wydajnością</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-2xl md:text-3xl font-bold mb-2">Silniki API</div>
                                <p className="text-gray-600">Medusa, Saleor, Shopify Plus — dobór pod skalę i model B2C/B2B</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-2xl md:text-3xl font-bold mb-2">Integracje</div>
                                <p className="text-gray-600">ERP, OMS, PIM, płatności, CDP — kontraktami, nie „na oko”</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Funkcjonalności */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Warstwa produktowa i techniczna</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            To, co musi być spójne w headless: wydajność, bezpieczeństwo, integracje i mierzalność — żeby platforma dała się rozwijać latami, a nie tylko „uruchomić i utknąć w wtyczkach”.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ecommerceFeatures.map((feature, index) => (
                            <div key={index} className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="text-black mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Komponenty e-commerce (demo) */}
            <EcommerceDemoSection />

            {/* Proces */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Od discovery do eksploatacji</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Proces zbliżony do tego, który Monkydot stosuje przy platformach pod duży ruch: najpierw rozumiemy operacje i ruch, potem projektujemy warstwę danych i API, dopiero na końcu budujemy front i utrzymanie.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {developmentProcess.map((step, index) => (
                            <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                        {step.number}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Realzacje */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Nasze realizacje e-commerce</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Wybrane case’y portfolio CreativeTrust — szerszy katalog projektów platformowych i migracji znajdziesz na Monkydot.
                        </p>
                    </div>

                    <ServicePortfolio categorySlug="e-commerce" />
                </div>
            </section>

            {/* Opinie klientów */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Co mówią nasi klienci</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Sprawdź opinie klientów, dla których zbudowaliśmy sklepy internetowe generujące realne wyniki sprzedażowe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Opinia 1 */}
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative mr-4">
                                    <Image
                                        src="/testimonial-1.jpg"
                                        alt="Zdjęcie klienta"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">Anna</h3>
                                    <p className="text-gray-500 text-sm">Dyrektor E-commerce</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                "Współpraca z CreativeTrust to była jedna z najlepszych decyzji biznesowych. Nasz sklep nie tylko świetnie wygląda, ale przede wszystkim zwiększył naszą sprzedaż o 43% w ciągu pierwszych 3 miesięcy."
                            </p>
                            <div className="flex text-yellow-400">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                        </div>

                        {/* Opinia 2 */}
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative mr-4">
                                    <Image
                                        src="/testimonial-2.jpg"
                                        alt="Zdjęcie klienta"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">Marek</h3>
                                    <p className="text-gray-500 text-sm">Właściciel</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                "Zespół CreativeTrust zrozumiał nasze potrzeby od samego początku. Otrzymaliśmy nie tylko sklep, ale kompleksowe rozwiązanie e-commerce, które zautomatyzowało wiele naszych procesów."
                            </p>
                            <div className="flex text-yellow-400">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                        </div>

                        {/* Opinia 3 */}
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden relative mr-4">
                                    <Image
                                        src="/testimonial-3.jpg"
                                        alt="Zdjęcie klienta"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium">Katarzyna</h3>
                                    <p className="text-gray-500 text-sm">Marketing Manager</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                "Doceniamy nie tylko profesjonalizm w tworzeniu naszego sklepu, ale również ciągłe wsparcie po wdrożeniu. Zespół CreativeTrust jest zawsze dostępny, gdy potrzebujemy pomocy lub chcemy wprowadzić nowe funkcjonalności."
                            </p>
                            <div className="flex text-yellow-400">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja kontaktowa */}
            <section id="kontakt" className="w-full py-16 md:py-32 px-6 bg-black text-white">
                    <div className="max-w-[1800px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-medium mb-8">
                                    Gotowy na zwiększenie sprzedaży online?
                                </h2>
                                <p className="text-xl mb-6">
                                    Nowe wdrożenia i duże migracje (w tym z WooCommerce do headless) prowadzimy stroną Monkydot. Poniżej możesz zostawić szybkie zapytanie — albo od razu przejdź na monkydot.com po pełny opis oferty i kalendarz rozmów.
                                </p>
                                <p className="text-base text-gray-300 mb-10 border-l-2 border-white/40 pl-4">
                                    Pełna oferta sklepów headless, B2B i konsultacji architektury jest na{' '}
                                    <a
                                        href={MONKYDOT_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white font-medium underline underline-offset-2 hover:text-gray-200"
                                    >
                                        monkydot.com
                                    </a>
                                    — Monkydot jest częścią CreativeTrust, więc pracujesz z tym samym zespołem i standardem jakości.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={MONKYDOT_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center justify-center gap-2
                bg-white text-black px-8 py-4 rounded-full font-medium
                transition-all duration-300 ease-in-out
                hover:bg-transparent hover:text-white border border-white"
                                    >
                                        <span>Monkydot — oferta e-commerce</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transform transition-transform duration-300 group-hover:rotate-45"
                                            aria-hidden
                                        >
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
                                    </a>
                                    <Link
                                        href="/kontakt"
                                        className="group relative inline-flex items-center justify-center gap-2
                border border-gray-300 text-gray-300 px-8 py-4 rounded-full font-medium
                transition-all duration-300 ease-in-out
                hover:bg-white hover:text-black"
                                    >
                                        <span>Kontakt CreativeTrust</span>
                                    </Link>
                                    <Link
                                        href="tel:+48570526421"
                                        className="group relative inline-flex items-center justify-center gap-2
                border border-gray-300 text-gray-300 px-8 py-4 rounded-full font-medium
                transition-all duration-300 ease-in-out
                hover:bg-white hover:text-black"
                                    >
                                        <span>+48 570 526 421</span>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <EcommerceForm />
                            </div>
                        </div>
                    </div>
            </section>

            {/* FAQ */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Najczęściej zadawane pytania</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług e-commerce i procesu tworzenia sklepów internetowych.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Czy nadal budujecie sklepy na WooCommerce?</h3>
                            <p className="text-gray-600">
                                <span className="font-medium">Nowe projekty</span> — stawiamy na headless (Next.js + silnik API: Medusa, Saleor, Shopify Plus itd.), bo lepiej skalują się i unikają długu wynikającego z rosnącej liczby wtyczek. Istniejące sklepy WooCommerce często{' '}
                                <span className="font-medium">migrujemy warstwowo</span> do architektury headless; utrzymanie typowego „mallu wtyczkowego” nie jest już naszym głównym kierunkiem rozwoju produktowego.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jak długo trwa projekt headless lub migracja?</h3>
                            <p className="text-gray-600">
                                Zależy od zakresu: pierwsze widoczne efekty (np. wybrany flow, migracja katalogu) bywają po kilku tygodniach; pełne platformy z wieloma integracjami — rzędu kilku miesięcy. Monkydot pracuje fazami (discovery → API → engineering → launch), z jasnym harmonogramem.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Ile kosztuje platforma headless?</h3>
                            <p className="text-gray-600">
                                Zależy od silnika (Shopify Plus, open source, hosting), integracji (ERP, płatności) i zespołu. Wycena jest łatwiejsza po krótkim discovery i oszacowaniu TCO w porównaniu do monolitu — zaproponuj rozmowę na{' '}
                                <a href={MONKYDOT_URL} className="font-medium text-black underline underline-offset-2" target="_blank" rel="noopener noreferrer">monkydot.com</a>.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Czy mogę samodzielnie zarządzać sklepem po wdrożeniu?</h3>
                            <p className="text-gray-600">
                                Tak. Każdy sklep ma panel do zarządzania produktami, zamówieniami, promocjami i treściami. Dostosowujemy go do wybranej platformy i zapewniamy szkolenie oraz dokumentację.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jakie metody płatności można zintegrować?</h3>
                            <p className="text-gray-600">
                                Integrujemy m.in. Stripe, PayU, Przelewy24, BLIK, PayPal, Apple Pay, Google Pay oraz płatności ratalne. Wybór zależy od platformy i rynku – pomagamy dobrać optymalną konfigurację.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Czy sklep będzie responsywny?</h3>
                            <p className="text-gray-600">
                                Tak. Wszystkie nasze sklepy są responsywne i projektowane w podejściu mobile-first, co poprawia doświadczenie użytkownika i konwersje na urządzeniach mobilnych.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Czy oferujecie wsparcie po wdrożeniu?</h3>
                            <p className="text-gray-600">
                                Oczywiście! Oferujemy różne pakiety wsparcia technicznego i rozwoju, które obejmują aktualizacje, poprawki bezpieczeństwa, optymalizację wydajności i dodawanie nowych funkcjonalności. Jesteśmy z Tobą na każdym etapie rozwoju Twojego e-biznesu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}