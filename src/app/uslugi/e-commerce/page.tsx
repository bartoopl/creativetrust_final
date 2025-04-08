import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';
import ServicePortfolio from '@/components/ServicePortfolio';
import EcommerceForm from "@/components/EcommerceForm";

export const metadata: Metadata = {
    title: 'E-commerce | Sklepy WooCommerce - CreativeTrust',
    description: 'Tworzenie profesjonalnych sklepów internetowych opartych na WooCommerce. Zwiększamy sprzedaż i konwersję Twojego biznesu online.',
};

export default function EcommercePage() {
    const ecommerceFeatures = [
        {
            title: 'Responsywny design',
            description: 'Sklepy zaprojektowane do idealnego wyświetlania na wszystkich urządzeniach - od komputerów po smartfony.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: 'Szybkość działania',
            description: 'Optymalizacja wydajności, szybkie ładowanie stron i płynne przejścia dla lepszego doświadczenia użytkownika.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            title: 'Bezpieczeństwo',
            description: 'Zaawansowane zabezpieczenia, szyfrowanie SSL i regularne aktualizacje dla ochrony Twoich danych i klientów.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
        {
            title: 'Integracje',
            description: 'Płynna integracja z systemami płatności, dostawcami, CRM, narzędziami analitycznymi i automatyzacją marketingu.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
            ),
        },
        {
            title: 'SEO-friendly',
            description: 'Zoptymalizowane pod kątem wyszukiwarek sklepy z czystym kodem, szybkim ładowaniem i strukturą przyjazną dla SEO.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            title: 'Analityka',
            description: 'Zaawansowane narzędzia analityczne, które pomagają zrozumieć zachowania klientów i podejmować decyzje oparte na danych.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
    ];

    const developmentProcess = [
        {
            number: '01',
            title: 'Analiza i strategia',
            description: 'Określamy Twoje cele biznesowe, analizujemy konkurencję i projektujemy strategię e-commerce, która przyniesie realne rezultaty.',
        },
        {
            number: '02',
            title: 'UX i projektowanie',
            description: 'Tworzymy intuicyjne interfejsy użytkownika i ścieżki zakupowe, które maksymalizują konwersję i zadowolenie klientów.',
        },
        {
            number: '03',
            title: 'Rozwój techniczny',
            description: 'Budujemy sklep na platformie WooCommerce, implementujemy funkcjonalności i integrujemy z niezbędnymi systemami.',
        },
        {
            number: '04',
            title: 'Testowanie i optymalizacja',
            description: 'Przeprowadzamy rygorystyczne testy, aby upewnić się, że sklep działa bezbłędnie na wszystkich urządzeniach i przeglądarkach.',
        },
        {
            number: '05',
            title: 'Wdrożenie i wsparcie',
            description: 'Uruchamiamy sklep, migrujemy dane i zapewniamy ciągłe wsparcie techniczne oraz rozwój funkcjonalności.',
        },
    ];

    const wooCommerceFeatures = [
        "Nieograniczona liczba produktów",
        "Elastyczny system kategorii i atrybutów",
        "Rozbudowane opcje produktów (warianty, ceny, stany magazynowe)",
        "Pełna integracja z WordPress",
        "Wsparcie dla subskrypcji i produktów cyfrowych",
        "Zaawansowane raportowanie sprzedaży",
        "System kuponów i promocji",
        "Zarządzanie klientami i ich danymi",
        "Integracja z popularnymi bramkami płatności",
        "Rozbudowane opcje wysyłki i dostawy"
    ];

    return (
        <main className="min-h-screen">
            {/* Hero sekcja */}
            <section className="w-full py-24 md:py-32 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h6 className="text-gray-500 mb-4 uppercase tracking-wide">E-commerce</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Sklepy WooCommerce, które sprzedają</h1>
                            <p className="text-xl text-gray-600 mb-10">
                                Tworzymy profesjonalne sklepy internetowe na platformie WooCommerce, które nie tylko świetnie wyglądają, ale przede wszystkim generują sprzedaż i ułatwiają zarządzanie biznesem online.
                            </p>
                            <Button href="#kontakt">
                                Stwórzmy Twój sklep
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                                <Image
                                    src="/ecommerce-woocommerce.jpg"
                                    alt="Sklep WooCommerce"
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

            {/* WooCommerce sekcja */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Dlaczego WooCommerce?</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            WooCommerce to najpopularniejsza platforma e-commerce na świecie, napędzająca ponad 28% wszystkich sklepów internetowych. Oferuje elastyczność, skalowalność i pełną kontrolę nad Twoim biznesem online.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <Image
                                src="/woocommerce-dashboard.jpg"
                                alt="WooCommerce Panel"
                                width={600}
                                height={400}
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-medium mb-6">Możliwości WooCommerce</h3>
                            <ul className="space-y-3">
                                {wooCommerceFeatures.map((feature, index) => (
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
                                <div className="text-4xl font-bold mb-2">28%</div>
                                <p className="text-gray-600">wszystkich sklepów na świecie</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl font-bold mb-2">+8M</div>
                                <p className="text-gray-600">aktywnych instalacji</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl font-bold mb-2">+59K</div>
                                <p className="text-gray-600">dostępnych wtyczek i rozszerzeń</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Funkcjonalności */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Funkcjonalności naszych sklepów</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Nasze sklepy WooCommerce łączą atrakcyjny design z zaawansowanymi funkcjonalnościami, które zwiększają sprzedaż i ułatwiają zarządzanie.
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

            {/* Proces */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Jak tworzymy sklepy WooCommerce</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Nasz proces rozwoju e-commerce jest zorientowany na rezultaty. Każdy etap jest starannie zaplanowany, aby dostarczyć sklep, który spełnia Twoje cele biznesowe.
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
                            Zobacz, jak pomagamy firmom rozwijać sprzedaż online dzięki profesjonalnym sklepom WooCommerce dopasowanym do ich potrzeb.
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
                            Sprawdź opinie klientów, dla których stworzyliśmy sklepy WooCommerce, które generują realne wyniki biznesowe.
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
                                "Współpraca z CreativeTrust to była jedna z najlepszych decyzji biznesowych. Nasz sklep WooCommerce nie tylko świetnie wygląda, ale przede wszystkim zwiększył naszą sprzedaż o 43% w ciągu pierwszych 3 miesięcy."
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
                                "Zespół CreativeTrust zrozumiał nasze potrzeby od samego początku. Otrzymaliśmy nie tylko sklep WooCommerce, ale kompleksowe rozwiązanie e-commerce, które zautomatyzowało wiele naszych procesów."
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
                                "Doceniamy nie tylko profesjonalizm w tworzeniu naszego sklepu WooCommerce, ale również ciągłe wsparcie po wdrożeniu. Zespół CreativeTrust jest zawsze dostępny, gdy potrzebujemy pomocy lub chcemy wprowadzić nowe funkcjonalności."
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
                                <p className="text-xl mb-10">
                                    Porozmawiajmy o Twoim projekcie e-commerce. Niezależnie od tego, czy zaczynasz od zera, czy chcesz ulepszyć istniejący sklep, mamy rozwiązania WooCommerce dopasowane do Twoich potrzeb.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/kontakt"
                                        className="group relative inline-flex items-center justify-center gap-2
                bg-white text-black px-8 py-4 rounded-full font-medium
                transition-all duration-300 ease-in-out
                hover:bg-transparent hover:text-white hover:border hover:border-white"
                                    >
                                        <span>Umów bezpłatną konsultację</span>
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
                                        >
                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                            <polyline points="7 7 17 7 17 17"></polyline>
                                        </svg>
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
                            Odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług WooCommerce i procesu tworzenia sklepów internetowych.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jak długo trwa stworzenie sklepu WooCommerce?</h3>
                            <p className="text-gray-600">
                                Czas realizacji zależy od złożoności projektu, ale zwykle trwa od 4 do 8 tygodni. Prosty sklep możemy uruchomić w ciągu miesiąca, podczas gdy bardziej zaawansowane projekty z integracjami i niestandardowymi funkcjami mogą zająć 2 miesiące.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Ile kosztuje stworzenie sklepu WooCommerce?</h3>
                            <p className="text-gray-600">
                                Koszt zależy od wielu czynników: zakresu funkcjonalności, integracji z zewnętrznymi systemami oraz indywidualnych wymagań. Oferujemy rozwiązania dopasowane do różnych budżetów - skontaktuj się z nami, aby otrzymać wycenę.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Czy mogę samodzielnie zarządzać sklepem po wdrożeniu?</h3>
                            <p className="text-gray-600">
                                Tak, wszystkie nasze sklepy WooCommerce są wyposażone w intuicyjny panel administracyjny, który pozwala na samodzielne zarządzanie produktami, zamówieniami, promocjami i treściami. Zapewniamy również szkolenie z obsługi systemu oraz dokumentację.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jakie metody płatności można zintegrować?</h3>
                            <p className="text-gray-600">
                                Integrujemy wszystkie popularne metody płatności, w tym karty kredytowe, przelewy online, BLIK, płatności mobilne, PayPal, Apple Pay, Google Pay oraz systemy płatności ratalnych. WooCommerce oferuje gotowe integracje z większością polskich bramek płatności.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Czy sklep WooCommerce będzie responsywny?</h3>
                            <p className="text-gray-600">
                                Tak, wszystkie nasze sklepy WooCommerce są w pełni responsywne i dostosowują się do każdego urządzenia - od dużych monitorów po smartfony. Projektujemy z myślą o mobile-first, co przekłada się na lepsze doświadczenie użytkownika i wyższe konwersje.
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