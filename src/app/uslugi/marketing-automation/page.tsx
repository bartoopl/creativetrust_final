import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import AutomationChart from '@/components/AutomationChart';
import ContactFormAutomation from '@/components/ContactFormAutomation';

export const metadata: Metadata = {
    title: 'Marketing Automation | Creativetrust - Partner Sales Manago',
    description: 'Zwiększ skuteczność swoich działań marketingowych dzięki kompleksowym rozwiązaniom marketing automation. Jako oficjalny partner Sales Manago dostarczamy narzędzia, które automatyzują procesy, personalizują komunikację i zwiększają konwersję.',
};

export default function MarketingAutomationPage() {
    return (
        <main className="min-h-screen">
            {/* Hero section */}
            <section className="w-full py-24 md:py-32 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <h6 className="text-gray-600 mb-2">Zwiększ efektywność swojego marketingu</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Marketing Automation</h1>
                            <p className="text-xl text-gray-700 mb-10">
                                Automatyzacja marketingu to nie tylko trend, ale konieczność w erze cyfrowej.
                                Jako oficjalny partner <strong>Sales Manago</strong>, pomagamy firmom zwiększać konwersje,
                                lojalizować klientów i maksymalizować ROI dzięki personalizowanej komunikacji na dużą skalę.
                            </p>
                            <Button href="#kontakt">
                                Umów bezpłatną konsultację
                            </Button>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <Image
                                src="/marketing-automation-hero.jpg"
                                alt="Marketing Automation"
                                width={800}
                                height={600}
                                className="rounded-xl shadow-xl object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics section */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Marketing Automation w liczbach
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="text-5xl font-bold text-black mb-4">+77%</div>
                            <p className="text-xl">Wzrost konwersji dzięki personalizacji komunikacji</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="text-5xl font-bold text-black mb-4">12,2x</div>
                            <p className="text-xl">Średni zwrot z inwestycji w marketing automation</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="text-5xl font-bold text-black mb-4">67%</div>
                            <p className="text-xl">Firm osiągnęło swoje cele marketingowe dzięki automatyzacji</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits section */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Dlaczego warto zainwestować w Marketing Automation?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium mb-4">Zwiększenie efektywności</h3>
                            <p className="text-gray-700">
                                Automatyzacja rutynowych zadań marketingowych pozwala Twojemu zespołowi skupić
                                się na strategicznych inicjatywach, które napędzają rozwój biznesu.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium mb-4">Personalizacja na dużą skalę</h3>
                            <p className="text-gray-700">
                                Docieraj do tysięcy klientów z komunikacją dopasowaną do ich zachowań,
                                preferencji i etapu ścieżki zakupowej.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 text-black rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium mb-4">Lepsze wyniki kampanii</h3>
                            <p className="text-gray-700">
                                Zwiększ współczynniki otwarć, kliknięć i konwersji dzięki
                                precyzyjnemu targetowaniu i komunikacji w odpowiednim momencie.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 text-black rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium mb-4">Optymalizacja budżetu</h3>
                            <p className="text-gray-700">
                                Zmniejsz koszty pozyskania klienta (CAC) i zwiększ lifetime value (LTV)
                                dzięki lepszemu nurturowaniu leadów i programom lojalnościowym.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 text-black rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium mb-4">Bezpieczeństwo danych</h3>
                            <p className="text-gray-700">
                                Platformy Marketing Automation, takie jak Sales Manago, zapewniają
                                zgodność z przepisami RODO i bezpieczeństwo danych klientów.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 text-black rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-medium mb-4">Mierzalne rezultaty</h3>
                            <p className="text-gray-700">
                                Zyskaj pełną przejrzystość efektów swoich działań marketingowych
                                dzięki zaawansowanej analityce i raportowaniu w czasie rzeczywistym.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chart section */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-medium mb-8">
                                Skuteczność Marketing Automation w biznesie
                            </h2>
                            <p className="text-xl text-gray-700 mb-6">
                                Badania pokazują, że firmy wykorzystujące marketing automation osiągają znacząco
                                lepsze wyniki w porównaniu do firm polegających wyłącznie na ręcznych kampaniach.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Automatyzacja pozwala na lepsze lead nurturing, skuteczniejsze kampanie
                                e-mail marketingowe oraz bardziej precyzyjne targetowanie. To przekłada się
                                na lepsze wyniki sprzedażowe i zwiększenie ROI.
                            </p>
                            <p className="text-gray-700">
                                Jako partner Sales Manago, oferujemy kompleksowe rozwiązania marketing
                                automation dostosowane do specyfiki Twojego biznesu i potrzeb Twoich klientów.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <AutomationChart />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sales Manago Partnership */}
            <section className="w-full py-16 md:py-24 px-6 bg-blue-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <Image
                                src="/sales-manago-partnership.jpg"
                                alt="Creativetrust - partner Sales Manago"
                                width={700}
                                height={500}
                                className="rounded-xl shadow-xl object-cover"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-medium mb-8">
                                Oficjalny partner Sales Manago
                            </h2>
                            <p className="text-xl text-gray-700 mb-6">
                                Creativetrust to certyfikowany partner technologiczny Sales Manago -
                                wiodącej europejskiej platformy marketing automation.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Współpraca z Sales Manago pozwala nam oferować klientom najnowocześniejsze
                                rozwiązania marketingowe, które generują realne i mierzalne rezultaty.
                            </p>
                            <p className="text-gray-700 mb-10">
                                Nasze doświadczenie w implementacji i optymalizacji kampanii marketing
                                automation sprawia, że możemy zaoferować nie tylko narzędzia, ale też
                                wsparcie strategiczne i całościowe podejście do automatyzacji działań marketingowych.
                            </p>
                            <Button href="#kontakt">
                                Dowiedz się więcej
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case study section */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Historie sukcesu naszych klientów
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    ES
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium">E-commerce - Sklep Sportowy</h3>
                                    <p className="text-gray-500">Branża retail / e-commerce</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Dzięki wdrożeniu Sales Manago i wsparciu Creativetrust, zwiększyliśmy
                                nasze konwersje o 38% w ciągu pierwszych 3 miesięcy. Personalizacja
                                oferty na podstawie zachowania użytkowników przyniosła spektakularne efekty."
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">Dyrektor Marketingu</p>
                                <div className="flex">
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                    FT
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium">Fintech Corp</h3>
                                    <p className="text-gray-500">Branża finansowa</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Automatyzacja kampanii email pozwoliła nam skrócić cykl sprzedażowy
                                o 45% i zwiększyć wartość średniego koszyka o 23%. Zespół Creativetrust
                                pomógł nam zoptymalizować ścieżkę klienta i zwiększyć skuteczność lead nurturingu."
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">Head of Digital</p>
                                <div className="flex">
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                    <div className="text-yellow-500">★</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA section */}
            <section id="kontakt" className="w-full py-16 md:py-32 px-6 bg-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-medium mb-8">
                                Gotowy na automatyzację swojego marketingu?
                            </h2>
                            <p className="text-xl mb-10 text-gray-700">
                                Skontaktuj się z nami, aby umówić bezpłatną konsultację.
                                Omówimy Twoje potrzeby i zaproponujemy rozwiązania,
                                które pomogą Ci osiągnąć Twoje cele biznesowe.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/kontakt"
                                    className="group relative inline-flex items-center justify-center gap-2
            bg-black text-white px-8 py-4 rounded-full font-medium
            transition-all duration-300 ease-in-out
            hover:bg-black"
                                >
                                    <span>Umów konsultację</span>
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
                                    href="mailto:office@creativetrust.pl"
                                    className="group relative inline-flex items-center justify-center gap-2
            border border-gray-300 text-gray-800 px-8 py-4 rounded-full font-medium
            transition-all duration-300 ease-in-out
            hover:bg-gray-50"
                                >
                                    <span>Napisz do nas</span>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                                <h3 className="text-2xl font-medium mb-6">Bezpłatny audyt marketingowy</h3>
                                <p className="mb-6 text-gray-700">
                                    Zostaw swoje dane, a nasz ekspert skontaktuje się z Tobą,
                                    aby przeprowadzić bezpłatny audyt i zaproponować rozwiązania
                                    marketing automation dla Twojego biznesu.
                                </p>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">Imię i nazwisko</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="Jan Kowalski"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="jan@firma.pl"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium mb-1 text-gray-700">Firma</label>
                                        <input
                                            type="text"
                                            id="company"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="Nazwa firmy"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">Telefon</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                            placeholder="+48 123 456 789"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black transition-colors"
                                        >
                                            Poproś o bezpłatny audyt
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}