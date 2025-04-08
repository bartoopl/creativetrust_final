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
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M22.6083 10.4235L19.2483 5.0435C18.6283 4.0535 17.3883 3.7935 16.4083 4.4235C15.8883 4.7635 15.5683 5.3035 15.5483 5.8835L15.4283 20.7735C15.4283 21.4435 15.8683 22.0435 16.5183 22.2735C16.6983 22.3335 16.8783 22.3635 17.0683 22.3635C17.5683 22.3635 18.0483 22.1335 18.3483 21.7235L22.5883 15.2935C23.2983 14.2235 23.3583 12.8335 22.7483 11.7035L22.6083 10.4235Z" fill="#FBBC04"/>
                    <path d="M13.3483 19.5636L9.8483 3.5936C9.6883 2.8836 9.0283 2.3936 8.2983 2.3936C8.1783 2.3936 8.0583 2.4036 7.9383 2.4336C7.0683 2.6136 6.5283 3.4836 6.7083 4.3536L10.2083 20.3136C10.3683 21.0236 11.0283 21.5136 11.7583 21.5136C11.8783 21.5136 11.9983 21.5036 12.1183 21.4736C12.9883 21.2836 13.5283 20.4236 13.3483 19.5636Z" fill="#4285F4"/>
                    <path d="M5.79832 21.7535C6.09832 22.1735 6.59832 22.4035 7.09832 22.4035C7.28832 22.4035 7.47832 22.3735 7.65832 22.3035C8.30832 22.0635 8.74832 21.4735 8.74832 20.7935V5.90347C8.74832 5.32347 8.42832 4.79347 7.91832 4.45347C6.93832 3.82347 5.69832 4.08347 5.07832 5.06347L1.71832 10.4535L1.57832 11.7335C0.968317 12.8535 1.02832 14.2535 1.73832 15.3235L5.79832 21.7535Z" fill="#34A853"/>
                </svg>
            ),
            color: 'bg-blue-50',
            stats: '73% użytkowników internetu korzysta z wyszukiwarki Google',
        },
        {
            name: 'Facebook & Instagram',
            description: 'Targetowane kampanie w mediach społecznościowych, które budują świadomość i generują konwersje.',
            icon: (
                <div className="flex space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2" className="w-1/2 h-full">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-1/2 h-full">
                        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F58529" />
                            <stop offset="50%" stopColor="#DD2A7B" />
                            <stop offset="100%" stopColor="#8134AF" />
                        </linearGradient>
                        <path fill="url(#instagram-gradient)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                </div>
            ),
            color: 'bg-indigo-50',
            stats: '2.8 miliarda aktywnych użytkowników miesięcznie',
        },
        {
            name: 'LinkedIn Ads',
            description: 'Profesjonalne kampanie B2B, które docierają do decydentów i specjalistów w Twojej branży.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" className="w-full h-full">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
            color: 'bg-blue-50',
            stats: '4 na 5 użytkowników LinkedIn decyduje o zakupach B2B',
        },
        {
            name: 'Remarketing',
            description: 'Zaawansowane kampanie remarketingowe, które przywracają potencjalnych klientów na Twoją stronę.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                    <circle cx="16" cy="6" r="2" fill="#34A853" />
                    <circle cx="8" cy="12" r="2" fill="#34A853" />
                    <circle cx="16" cy="18" r="2" fill="#34A853" />
                </svg>
            ),
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
                            {/* Poprawiony przycisk z czarnym tekstem */}
                            <Button href="#kontakt" className="bg-white !text-black hover:bg-transparent hover:!text-white hover:border-white">
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
                                        {platform.icon}
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
                            <form className="space-y-4" onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target as HTMLFormElement);
                                const formValues = Object.fromEntries(formData.entries());

                                try {
                                    const response = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            name: formValues.name,
                                            email: formValues.email,
                                            subject: `Zapytanie o usługę Performance Marketing (${formValues.needs})`,
                                            message: `Zapytanie ze strony Performance Marketing:
Imię i nazwisko: ${formValues.name}
Email: ${formValues.email}
Firma: ${formValues.company || 'Nie podano'}
Czego potrzebuje: ${formValues.needs}
Budżet: ${formValues.budget || 'Nie podano'}
Wiadomość: ${formValues.message}`
                                        }),
                                    });

                                    const data = await response.json();

                                    if (!response.ok) {
                                        throw new Error(data.message || 'Wystąpił błąd podczas wysyłania formularza');
                                    }

                                    // Wyświetl informację o sukcesie i wyczyść formularz
                                    alert('Wiadomość została wysłana. Dziękujemy za kontakt!');
                                    (e.target as HTMLFormElement).reset();

                                } catch (error) {
                                    console.error('Błąd podczas wysyłania formularza:', error);
                                    alert('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
                                }
                            }}>
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
        </main>
    );
}