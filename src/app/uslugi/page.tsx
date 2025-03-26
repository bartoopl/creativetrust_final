import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
    title: 'Usługi - CreativeTrust | Kompleksowe rozwiązania cyfrowe',
    description: 'Oferujemy szeroki zakres usług: projektowanie stron internetowych, e-commerce, branding, marketing automation i performance marketing. Sprawdź nasze rozwiązania.',
};

// Definicja usług
const services = [
    {
        id: 'strony-www',
        title: 'Strony WWW',
        description: 'Projektujemy i wdrażamy nowoczesne strony internetowe, które wyróżniają się na tle konkurencji i skutecznie realizują cele biznesowe.',
        image: '/websites-service.jpg',
        features: ['Responsywne strony internetowe', 'Strony firmowe', 'Landing page', 'Blogi', 'Strony produktowe'],
        color: 'from-blue-400 to-blue-600',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        )
    },
    {
        id: 'e-commerce',
        title: 'E-commerce',
        description: 'Tworzymy sklepy internetowe, które nie tylko świetnie wyglądają, ale przede wszystkim zapewniają wysoką konwersję i łatwość zarządzania.',
        image: '/ecommerce-service.jpg',
        features: ['Sklepy WooCommerce', 'Sklepy Shopify', 'Sklepy PrestaShop', 'Integracje płatności', 'Optymalizacja konwersji'],
        color: 'from-green-400 to-green-600',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        )
    },
    {
        id: 'branding',
        title: 'Branding',
        description: 'Budujemy silne marki, które pozostają w pamięci klientów i wyróżniają się na tle konkurencji, dzięki spójnej identyfikacji wizualnej i strategii.',
        image: '/branding-service.jpg',
        features: ['Projektowanie logo', 'Identyfikacja wizualna', 'Strategia marki', 'Brand guidelines', 'Rebranding'],
        color: 'from-purple-400 to-purple-600',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        )
    },
    {
        id: 'marketing-automation',
        title: 'Marketing Automation',
        description: 'Automatyzujemy procesy marketingowe, aby zwiększyć efektywność działań, lepiej nurturować leady i budować długotrwałe relacje z klientami.',
        image: '/marketing-automation-service.jpg',
        features: ['Email marketing', 'Lead nurturing', 'Personalizacja', 'Scoring leadów', 'Integracje z CRM'],
        color: 'from-yellow-400 to-yellow-600',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        id: 'performance-marketing',
        title: 'Performance Marketing',
        description: 'Tworzymy i optymalizujemy kampanie reklamowe nastawione na konkretne rezultaty, które zwiększają sprzedaż i przynoszą mierzalny zwrot z inwestycji.',
        image: '/performance-marketing-service.jpg',
        features: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'SEO', 'Analityka'],
        color: 'from-red-400 to-red-600',
        icon: (
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    }
];

// Proces współpracy
const workProcess = [
    {
        step: '01',
        title: 'Konsultacja',
        description: 'Poznajemy Twoje potrzeby, cele biznesowe i oczekiwania. Analizujemy rynek i konkurencję, aby zaproponować najlepsze rozwiązania.'
    },
    {
        step: '02',
        title: 'Strategia',
        description: 'Opracowujemy strategię działania dostosowaną do Twoich potrzeb, definiujemy kluczowe etapy, terminy i oczekiwane rezultaty.'
    },
    {
        step: '03',
        title: 'Realizacja',
        description: 'Wdrażamy zaplanowane działania, stale informując Cię o postępach i wprowadzając niezbędne korekty w trakcie realizacji.'
    },
    {
        step: '04',
        title: 'Optymalizacja',
        description: 'Monitorujemy efekty naszych działań i wprowadzamy ulepszenia, które maksymalizują skuteczność i zwrot z inwestycji.'
    }
];

// Pytania FAQ
const faqItems = [
    {
        question: 'Ile kosztuje realizacja projektu?',
        answer: 'Koszt projektu zależy od wielu czynników: zakresu prac, wybranych technologii, stopnia zaawansowania i specyficznych wymagań. Każdą ofertę przygotowujemy indywidualnie, dostosowując ją do potrzeb i budżetu klienta. Skontaktuj się z nami, aby otrzymać bezpłatną wycenę.'
    },
    {
        question: 'Jak długo trwa realizacja projektu?',
        answer: 'Czas realizacji projektu zależy od jego złożoności. Proste strony internetowe możemy dostarczyć w ciągu 2-4 tygodni, bardziej zaawansowane projekty e-commerce mogą zająć 1-3 miesięcy, a kompleksowe kampanie marketingowe często wymagają ciągłej pracy i optymalizacji. Zawsze ustalamy realistyczny harmonogram na początku współpracy.'
    },
    {
        question: 'Czy zajmujecie się utrzymaniem i obsługą po wdrożeniu?',
        answer: 'Tak, oferujemy pełne wsparcie powdrożeniowe. Możemy zarządzać Twoją stroną, sklepem lub kampaniami marketingowymi, zajmować się aktualizacjami, bezpieczeństwem i rozwojem. Oferujemy różne pakiety wsparcia dostosowane do indywidualnych potrzeb.'
    },
    {
        question: 'Dla kogo są Wasze usługi?',
        answer: 'Nasze usługi są skierowane zarówno do małych i średnich firm, jak i do dużych korporacji. Pracujemy z klientami z różnych branż: e-commerce, usługi profesjonalne, edukacja, zdrowie, nieruchomości, technologia i wiele innych. Nieważne, czy dopiero zaczynasz biznes, czy chcesz rozwinąć istniejącą firmę - mamy dla Ciebie odpowiednie rozwiązania.'
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            {/* Hero section */}
            <section className="w-full py-24 md:py-32 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h6 className="text-gray-500 mb-4 uppercase tracking-wide">Nasze usługi</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Kompleksowe rozwiązania cyfrowe</h1>
                            <p className="text-xl text-gray-600 mb-10">
                                Specjalizujemy się w tworzeniu efektywnych rozwiązań cyfrowych, które pomagają firmom przyciągać klientów, budować rozpoznawalność i zwiększać sprzedaż.
                            </p>
                            <Button href="#uslugi">
                                Zobacz nasze usługi
                            </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/service-image-1.jpg"
                                        alt="Tworzenie stron internetowych"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/service-image-2.jpg"
                                        alt="E-commerce"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6 mt-12">
                                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/service-image-3.jpg"
                                        alt="Branding"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/service-image-4.jpg"
                                        alt="Marketing"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services section */}
            <section id="uslugi" className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Nasze usługi</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Oferujemy kompleksowy zakres usług, które pomagają Twojej firmie zaistnieć w internecie, przyciągnąć klientów i zwiększyć sprzedaż.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${service.color} mb-6`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-medium mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <ul className="mb-8 space-y-2">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 rounded-full bg-black"></span>
                      </span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <Link
                                        href={`/uslugi/${service.id}`}
                                        className="inline-flex items-center text-black font-medium group"
                                    >
                                        Dowiedz się więcej
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-2 transform transition-transform group-hover:translate-x-1"
                                        >
                                            <path
                                                d="M5 12H19"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M12 5L19 12L12 19"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-lg text-gray-600 mb-8">
                            Nie znalazłeś tego, czego szukasz? Skontaktuj się z nami, aby omówić indywidualne potrzeby Twojego biznesu.
                        </p>
                        <Button href="/kontakt">
                            Skontaktuj się z nami
                        </Button>
                    </div>
                </div>
            </section>

            {/* How we work */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Jak pracujemy</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Nasz proces pracy jest przejrzysty i zorientowany na rezultaty. Na każdym etapie dbamy o komunikację i zaangażowanie klienta.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {workProcess.map((step, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-6">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium mb-8">Dlaczego warto z nami współpracować?</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Nasz zespół to doświadczeni specjaliści, którzy rozumieją biznes i technologię. Łączymy wiedzę z różnych dziedzin, aby zapewnić kompleksowe rozwiązania.
                            </p>

                            <div className="space-y-8">
                                <div className="flex">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Skuteczność</h3>
                                        <p className="text-gray-600">Nasze rozwiązania są zorientowane na konkretne efekty biznesowe. Mierzymy rezultaty i stale optymalizujemy nasze działania.</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Doświadczenie</h3>
                                        <p className="text-gray-600">Pracujemy dla klientów z różnych branż od wielu lat. Nasza wiedza i doświadczenie pozwalają unikać błędów i dostarczać najlepsze rozwiązania.</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Bezpieczeństwo</h3>
                                        <p className="text-gray-600">Dbamy o bezpieczeństwo danych i zgodność z przepisami. Wszystkie nasze rozwiązania są tworzone z myślą o najwyższych standardach bezpieczeństwa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/team-work.jpg"
                                    alt="Zespół CreativeTrust"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-8 -right-8 w-64 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <div className="text-3xl font-bold text-black mb-2">98%</div>
                                <p className="text-gray-700">zadowolonych klientów</p>
                            </div>

                            <div className="absolute -top-8 -left-8 w-48 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <div className="text-3xl font-bold text-black mb-2">7+</div>
                                <p className="text-gray-700">lat doświadczenia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Najczęściej zadawane pytania</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług i procesu współpracy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqItems.map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                                <h3 className="text-xl font-medium mb-4">{item.question}</h3>
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <p className="text-lg text-gray-600 mb-8">
                            Nie znalazłeś odpowiedzi na swoje pytanie? Skontaktuj się z nami!
                        </p>
                        <Button href="/kontakt">
                            Zadaj pytanie
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full py-16 md:py-32 px-6 bg-black text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-medium mb-8">
                                Gotowy na transformację cyfrową?
                            </h2>
                            <p className="text-xl mb-10 text-gray-300">
                                Skontaktuj się z nami już dziś, aby omówić, jak nasze usługi mogą pomóc w rozwoju Twojego biznesu.
                            </p>
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
                        </div>
                        <div>
                            <div className="grid grid-cols-2 gap-8">
                                {services.slice(0, 4).map((service) => (
                                    <Link key={service.id} href={`/uslugi/${service.id}`} className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${service.color} mb-4`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-lg font-medium mb-2 text-white">{service.title}</h3>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm text-gray-400">Sprawdź</span>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-gray-400"
                                            >
                                                <path
                                                    d="M5 12H19"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 5L19 12L12 19"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}