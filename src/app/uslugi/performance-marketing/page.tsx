import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
    title: 'Performance Marketing | Skuteczne kampanie - CreativeTrust',
    description: 'Zwiększ sprzedaż i ROI dzięki naszym usługom performance marketingu. Specjalizujemy się w Google Ads, Facebook Ads i kampaniach nastawionych na efekty.',
};

export default function PerformanceMarketingPage() {
    const adPlatforms = [
        {
            name: 'Google Ads',
            description: 'Precyzyjne kampanie PPC, które docierają do klientów aktywnie poszukujących Twoich produktów i usług.',
            icon: '/google-ads-icon.png',
            color: 'bg-blue-50',
            stats: '73% użytkowników internetu korzysta z wyszukiwarki Google',
        },
        {
            name: 'Facebook & Instagram',
            description: 'Targetowane kampanie w mediach społecznościowych, które budują świadomość i generują konwersje.',
            icon: '/facebook-ads-icon.png',
            color: 'bg-indigo-50',
            stats: '2.8 miliarda aktywnych użytkowników miesięcznie',
        },
        {
            name: 'LinkedIn Ads',
            description: 'Profesjonalne kampanie B2B, które docierają do decydentów i specjalistów w Twojej branży.',
            icon: '/linkedin-ads-icon.png',
            color: 'bg-blue-50',
            stats: '4 na 5 użytkowników LinkedIn decyduje o zakupach B2B',
        },
        {
            name: 'Remarketing',
            description: 'Zaawansowane kampanie remarketingowe, które przywracają potencjalnych klientów na Twoją stronę.',
            icon: '/remarketing-icon.png',
            color: 'bg-green-50',
            stats: 'Zwiększa konwersję o 43% w porównaniu do standardowych kampanii',
        },
    ];

    const marketingServices = [
        {
            title: 'Audyt marketingowy',
            description: 'Kompleksowa analiza obecnych działań marketingowych, identyfikacja szans i rekomendacje dalszych kroków.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
        },
        {
            title: 'Kampanie Google Ads',
            description: 'Precyzyjnie targetowane kampanie w sieci wyszukiwania, zakupowej, wideo i display, które generują ruch i konwersje.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            title: 'Social Media Ads',
            description: 'Zaawansowane kampanie reklamowe w mediach społecznościowych, precyzyjnie kierowane do Twojej grupy docelowej.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: 'SEO',
            description: 'Optymalizacja strony pod kątem wyszukiwarek, budowa linków i kreowanie treści, które przyciągają organiczny ruch.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
        {
            title: 'Analityka i raportowanie',
            description: 'Zaawansowana analityka i przejrzyste raporty, które pokazują efektywność kampanii i ułatwiają podejmowanie decyzji.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: 'Optymalizacja konwersji',
            description: 'Testowanie i optymalizacja lejków sprzedażowych i stron docelowych, aby zwiększyć współczynnik konwersji.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
            ),
        },
    ];

    const results = [
        {
            value: '+127%',
            label: 'Średni wzrost ruchu',
            color: 'from-blue-400 to-blue-600'
        },
        {
            value: '+58%',
            label: 'Wzrost konwersji',
            color: 'from-green-400 to-green-600'
        },
        {
            value: '-32%',
            label: 'Niższy koszt konwersji',
            color: 'from-red-400 to-red-600'
        },
        {
            value: '8.2x',
            label: 'Średni zwrot z inwestycji (ROI)',
            color: 'from-purple-400 to-purple-600'
        },
    ];

    const casestudies = [
        {
            title: 'E-commerce fashion',
            results: 'Wzrost przychodów o 143% w 6 miesięcy',
            image: '/case-study-fashion.jpg',
            color: 'from-pink-400 to-red-500'
        },
        {
            title: 'B2B SaaS',
            results: '189 kwalifikowanych leadów miesięcznie',
            image: '/case-study-saas.jpg',
            color: 'from-blue-400 to-indigo-500'
        },
        {
            title: 'Deweloper nieruchomości',
            results: 'Koszt pozyskania klienta niższy o 47%',
            image: '/case-study-realestate.jpg',
            color: 'from-green-400 to-teal-500'
        },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero sekcja */}
            <section className="w-full py-24 md:py-32 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h6 className="text-gray-300 mb-4 uppercase tracking-wide">Performance Marketing</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Marketing zorientowany na rezultaty</h1>
                            <p className="text-xl text-gray-300 mb-10">
                                Tworzymy i optymalizujemy kampanie marketingowe, które przynoszą mierzalne efekty biznesowe: zwiększają sprzedaż, pozyskują leady i maksymalizują ROI.
                            </p>
                            <Button href="#kontakt" className="bg-white text-black hover:bg-transparent hover:text-white hover:border-white">
                                Zwiększ swoje wyniki
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="w-3/4 h-3/4 bg-gradient-to-tr from-black/70 to-black/50 backdrop-blur-sm p-8 rounded-xl text-white">
                                        <h3 className="text-3xl font-bold mb-3">Skuteczny marketing</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-center">
                                                <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex-shrink-0"></div>
                                                <span>Kampanie oparte na danych</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                                                <span>Precyzyjne targetowanie</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-5 h-5 rounded-full bg-purple-500 mr-3 flex-shrink-0"></div>
                                                <span>Ciągła optymalizacja</span>
                                            </li>
                                            <li className="flex items-center">
                                                <div className="w-5 h-5 rounded-full bg-red-500 mr-3 flex-shrink-0"></div>
                                                <span>Mierzalne rezultaty</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Image
                                    src="/performance-marketing-hero.jpg"
                                    alt="Performance Marketing analityka"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platformy reklamowe */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Platformy reklamowe</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Specjalizujemy się w prowadzeniu kampanii w najpopularniejszych platformach reklamowych, docierając precyzyjnie do Twojej grupy docelowej.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {adPlatforms.map((platform, index) => (
                            <div key={index} className={`p-8 rounded-xl shadow-sm ${platform.color} border border-gray-100 h-full flex flex-col justify-between`}>
                                <div>
                                    <div className="w-16 h-16 relative mb-4">
                                        <Image
                                            src={platform.icon}
                                            alt={platform.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <h3 className="text-xl font-medium mb-3">{platform.name}</h3>
                                    <p className="text-gray-600 mb-6">{platform.description}</p>
                                </div>
                                <div className="text-sm font-medium bg-white bg-opacity-50 p-3 rounded-lg">
                                    {platform.stats}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nasze usługi */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Kompleksowe usługi marketingowe</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Oferujemy pełen zakres usług performance marketingu, które wspierają realizację Twoich celów biznesowych.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {marketingServices.map((service, index) => (
                            <div key={index} className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="text-black mb-4">{service.icon}</div>
                                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Jak działamy */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium mb-8">Jak pracujemy?</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Nasze podejście do performance marketingu opiera się na danych, ciągłej optymalizacji i transparentności. Każda kampania jest dokładnie zaplanowana i regularnie udoskonalana, aby osiągnąć najlepsze możliwe wyniki.
                            </p>

                            <div className="space-y-8">
                                <div className="flex">
                                    <div className="mr-4 w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">01</div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Analiza i strategia</h3>
                                        <p className="text-gray-600">Dogłębnie badamy Twoją branżę, konkurencję i grupę docelową, aby stworzyć strategię, która przyniesie najlepsze efekty.</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mr-4 w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">02</div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Precyzyjne targetowanie</h3>
                                        <p className="text-gray-600">Definiujemy i docieramy do idealnych odbiorców, którzy są najbardziej zainteresowani Twoją ofertą.</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mr-4 w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">03</div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Testowanie i optymalizacja</h3>
                                        <p className="text-gray-600">Ciągle testujemy różne wersje reklam, landing page'y i grup docelowych, aby osiągnąć najwyższą możliwą konwersję.</p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mr-4 w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">04</div>
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">Raportowanie i analityka</h3>
                                        <p className="text-gray-600">Zapewniamy przejrzyste raporty i wnikliwą analizę wyników, które pozwalają zrozumieć efektywność kampanii.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src="/performance-marketing-process.jpg"
                                    alt="Proces performance marketingu"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-gray-900 p-6 rounded-xl text-white">
                                    <div className="text-4xl font-bold mb-2">+237%</div>
                                    <p className="text-gray-300">średni wzrost ROAS</p>
                                </div>
                                <div className="bg-gray-900 p-6 rounded-xl text-white">
                                    <div className="text-4xl font-bold mb-2">-42%</div>
                                    <p className="text-gray-300">niższy koszt konwersji</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Osiągane rezultaty */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-900 text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Rezultaty, które osiągamy</h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Performance marketing to mierzalne wyniki. Oto średnie rezultaty, które osiągamy dla naszych klientów.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {results.map((result, index) => (
                            <div key={index} className="p-8 rounded-xl bg-gradient-to-r bg-opacity-10 border border-gray-800 hover:border-gray-700 transition-colors duration-300">
                                <div className={`text-5xl font-bold mb-4 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                                    {result.value}
                                </div>
                                <p className="text-gray-300">{result.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case studies */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Nasze sukcesy</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Poznaj przykłady skutecznych kampanii, które przeprowadziliśmy dla naszych klientów.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {casestudies.map((casestudy, index) => (
                            <div key={index} className="rounded-xl overflow-hidden shadow-lg group relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-10"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <h3 className="text-xl font-medium text-white mb-2">{casestudy.title}</h3>
                                    <p className="text-white">{casestudy.results}</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-25 transition-opacity duration-300 z-10 to-black">
                                </div>
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={casestudy.image}
                                        alt={casestudy.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button href="/portfolio" className="inline-block">
                            Zobacz więcej projektów
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Najczęściej zadawane pytania</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Odpowiedzi na najczęściej zadawane pytania dotyczące performance marketingu.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Co to jest performance marketing?</h3>
                            <p className="text-gray-600">
                                Performance marketing to strategia marketingowa skupiona na mierzalnych rezultatach, takich jak konwersje, sprzedaż czy generowanie leadów. W przeciwieństwie do tradycyjnych form marketingu, płacisz głównie za konkretne efekty (np. kliknięcia, wypełnione formularze), a nie za sam zasięg reklamy.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jaki budżet powinienem przeznaczyć na kampanie?</h3>
                            <p className="text-gray-600">
                                Budżet na kampanie zależy od wielu czynników: branży, konkurencji, celów biznesowych i skali działania. Doradzamy rozpoczęcie od mniejszego budżetu testowego (kilka tysięcy złotych miesięcznie) i stopniowe zwiększanie go w miarę osiągania dobrych wyników.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jak szybko zobaczę wyniki kampanii?</h3>
                            <p className="text-gray-600">
                                Pierwsze wyniki kampanii PPC i social media są widoczne niemal natychmiast, jednak ich pełna optymalizacja i osiągnięcie najlepszych efektów zajmuje zwykle 2-3 miesiące. W przypadku działań SEO, pierwsze znaczące rezultaty widoczne są po około 3-6 miesiącach.
                            </p>
                        </div>

                        <div className="p-8 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Jak mierzycie efektywność kampanii?</h3>
                            <p className="text-gray-600">
                                Efektywność kampanii mierzymy za pomocą kluczowych wskaźników (KPI) dostosowanych do Twoich celów biznesowych. Mogą to być: współczynnik konwersji, koszt pozyskania klienta (CAC), zwrot z inwestycji (ROI), ROAS (zwrot z wydatków na reklamę) oraz inne metryki specyficzne dla Twojej branży.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kontakt */}
            <section id="kontakt" className="w-full py-16 md:py-32 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-medium mb-8">
                                Gotowy na zwiększenie efektywności marketingu?
                            </h2>
                            <p className="text-xl mb-10 text-gray-600">
                                Skontaktuj się z nami, aby omówić, jak nasze usługi performance marketingu mogą pomóc w osiągnięciu Twoich celów biznesowych.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/kontakt"
                                    className="group relative inline-flex items-center justify-center gap-2
                    bg-black text-white px-8 py-4 rounded-full font-medium
                    transition-all duration-300 ease-in-out
                    hover:bg-transparent hover:text-black hover:border hover:border-black"
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
                    border border-gray-300 text-gray-800 px-8 py-4 rounded-full font-medium
                    transition-all duration-300 ease-in-out
                    hover:bg-gray-100"
                                >
                                    <span>+48 570 526 421</span>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                            <h3 className="text-2xl font-medium mb-6">Potrzebujesz więcej informacji?</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Imię i nazwisko <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Twoje imię i nazwisko"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Twój adres email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                        Firma
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Nazwa Twojej firmy"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-1">
                                        Czego potrzebujesz? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="needs"
                                        name="needs"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        required
                                    >
                                        <option value="" disabled selected>Wybierz...</option>
                                        <option value="google-ads">Kampanie Google Ads</option>
                                        <option value="social-media">Kampanie w mediach społecznościowych</option>
                                        <option value="seo">Pozycjonowanie SEO</option>
                                        <option value="analytics">Analityka i raportowanie</option>
                                        <option value="audit">Audyt marketingowy</option>
                                        <option value="comprehensive">Kompleksowa obsługa marketingowa</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Wiadomość <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Opisz krótko swoje potrzeby"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                        Miesięczny budżet reklamowy
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                    >
                                        <option value="" disabled selected>Wybierz zakres...</option>
                                        <option value="small">1,000 - 5,000 PLN</option>
                                        <option value="medium">5,000 - 15,000 PLN</option>
                                        <option value="large">15,000 - 50,000 PLN</option>
                                        <option value="enterprise">Powyżej 50,000 PLN</option>
                                        <option value="unsure">Nie wiem / Potrzebuję porady</option>
                                    </select>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Wyślij zapytanie
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500 mt-4">
                                    Wysyłając ten formularz, zgadzasz się na przetwarzanie Twoich danych osobowych zgodnie z naszą <a href="/polityka-prywatnosci" className="underline hover:text-black">polityką prywatności</a>.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certyfikacje i narzędzia */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Certyfikacje i narzędzia</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Wykorzystujemy najnowsze technologie i posiadamy certyfikacje od liderów branży, aby zapewnić najwyższą jakość naszych usług.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center">
                            <div className="w-20 h-20 relative mb-4">
                                <Image
                                    src="/google-partner-badge.png"
                                    alt="Google Partner"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-center text-lg font-medium mb-1">Google Partner</h3>
                            <p className="text-center text-sm text-gray-500">Certyfikowany Partner Google</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center">
                            <div className="w-20 h-20 relative mb-4">
                                <Image
                                    src="/facebook-marketing-partner.png"
                                    alt="Facebook Marketing Partner"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-center text-lg font-medium mb-1">Meta Partner</h3>
                            <p className="text-center text-sm text-gray-500">Facebook & Instagram Marketing</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center">
                            <div className="w-20 h-20 relative mb-4">
                                <Image
                                    src="/hubspot-partner.png"
                                    alt="HubSpot Partner"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-center text-lg font-medium mb-1">HubSpot Partner</h3>
                            <p className="text-center text-sm text-gray-500">Certyfikowany Partner HubSpot</p>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center">
                            <div className="w-20 h-20 relative mb-4">
                                <Image
                                    src="/semrush-partner.png"
                                    alt="SEMrush Partner"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-center text-lg font-medium mb-1">SEMrush Partner</h3>
                            <p className="text-center text-sm text-gray-500">Expert w zakresie SEO</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}