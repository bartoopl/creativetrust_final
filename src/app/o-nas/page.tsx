import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
    title: 'O nas - CreativeTrust | Agencja Marketingowa',
    description: 'Poznaj CreativeTrust - agencję marketingową specjalizującą się w tworzeniu skutecznych strategii marketingowych, stron www i aplikacji e-commerce.',
};

interface Value {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface Milestone {
    year: string;
    title: string;
    description: string;
}

export default function AboutPage() {
    const values: Value[] = [
        {
            id: 1,
            title: 'Skuteczność',
            description: 'Tworzymy strategie, które przynoszą wymierne rezultaty. Każde nasze działanie jest zorientowane na osiągnięcie konkretnych celów biznesowych.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            id: 2,
            title: 'Innowacyjność',
            description: 'Stale śledzimy trendy i nowości w branży, aby dostarczać rozwiązania wykorzystujące najnowsze technologie i podejścia marketingowe.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            )
        },
        {
            id: 3,
            title: 'Transparentność',
            description: 'Wierzymy w szczerą i otwartą komunikację. Nasi klienci zawsze dokładnie wiedzą, na czym stoją i jakie rezultaty osiągają ich kampanie.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            id: 4,
            title: 'Partnerstwo',
            description: 'Nie jesteśmy tylko wykonawcami. Jesteśmy partnerami w rozwoju Twojego biznesu, zaangażowanymi w Twój sukces tak samo jak Ty.',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    const milestones: Milestone[] = [
        {
            year: '2016',
            title: 'Rozpoczęcie działalności',
            description: 'CreativeTrust rozpoczyna działalność jako agencja marketingu cyfrowego, specjalizująca się w kampaniach PPC i mediach społecznościowych.'
        },
        {
            year: '2018',
            title: 'Rozszerzenie usług',
            description: 'Wzbogacenie oferty o kompleksowe usługi projektowania i wdrażania stron internetowych oraz sklepów e-commerce.'
        },
        {
            year: '2024',
            title: 'Partnerstwo z Sales Manago',
            description: 'Zostaliśmy oficjalnym partnerem Sales Manago, rozszerzając nasze usługi o marketing automation i spersonalizowane strategie komunikacji.'
        },
        {
            year: '2024',
            title: 'Otwarcie nowego biura',
            description: 'Przeprowadzka do nowej, większej siedziby w centrum Gorzowa Wielkopolskiego, umożliwiająca dalszy rozwój zespołu.'
        },
        {
            year: '2025',
            title: 'Rozwój zespołu',
            description: 'Powiększenie zespołu o specjalistów z branży UI/UX i Performance Marketingu, umożliwiające realizację jeszcze bardziej kompleksowych projektów.'
        }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero sekcja */}
            <section className="w-full py-24 md:py-32 px-6 bg-black text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h6 className="text-gray-400 mb-4 uppercase tracking-wide">O nas</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Łączymy strategie z kreatywnością</h1>
                            <p className="text-xl text-gray-300 mb-10">
                                Jesteśmy agencją marketingową, która tworzy skuteczne i kreatywne rozwiązania cyfrowe dla firm chcących rozwijać swój biznes online.
                            </p>
                            <Button href="#team" className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black font-medium">
                                Poznaj nas
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-800 relative">
                                <Image
                                    src="/about-hero.jpg"
                                    alt="Zespół CreativeTrust"
                                    fill
                                    className="object-cover opacity-70"
                                />
                            </div>

                            <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-white -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nasza historia */}
            <section id="team" className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-8 text-center">Nasza historia</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
                            Od 2016 roku nieustannie się rozwijamy, pracując z klientami z różnych branż i dostarczając rozwiązania, które przynoszą realne efekty biznesowe.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Linia czasu */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200"></div>

                        <div className="space-y-8 md:space-y-0">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex flex-col md:flex-row md:gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="md:w-1/2 pb-8 md:pb-24">
                                        <div className={`bg-white p-8 rounded-xl shadow-sm border border-gray-100 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                                            <div className="text-3xl font-bold mb-4">{milestone.year}</div>
                                            <h3 className="text-xl font-medium mb-3">{milestone.title}</h3>
                                            <p className="text-gray-600">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2"></div>

                                    {/* Punkt na linii czasu */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-black border-4 border-white"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Nasze wartości */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-8 text-center">Nasze wartości</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
                            Nasze kluczowe wartości definiują to, kim jesteśmy jako firma i jak współpracujemy z klientami. Są podstawą wszystkiego, co robimy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value) => (
                            <div key={value.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Liczby */}
            <section className="w-full py-16 md:py-24 px-6 bg-black text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-8 text-center">CreativeTrust w liczbach</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-8">
                            <div className="text-6xl font-bold mb-3">7+</div>
                            <div className="text-xl text-gray-300">lat na rynku</div>
                        </div>

                        <div className="text-center p-8">
                            <div className="text-6xl font-bold mb-3">150+</div>
                            <div className="text-xl text-gray-300">zrealizowanych projektów</div>
                        </div>

                        <div className="text-center p-8">
                            <div className="text-6xl font-bold mb-3">98%</div>
                            <div className="text-xl text-gray-300">zadowolonych klientów</div>
                        </div>

                        <div className="text-center p-8">
                            <div className="text-6xl font-bold mb-3">10+</div>
                            <div className="text-xl text-gray-300">członków zespołu</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lokalizacja i kontakt */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium mb-8">Znajdź nas</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Nasza siedziba znajduje się w centrum Gorzowa Wielkopolskiego. Zapraszamy do odwiedzenia nas lub kontaktu online.
                            </p>

                            <div className="space-y-6">
                                <div className="flex">
                                    <div className="mr-4">
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Adres</h3>
                                        <p className="text-gray-600">
                                            M34 Business Center<br />
                                            ul. Kombatantów 34/500<br />
                                            66-400 Gorzów Wielkopolski
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mr-4">
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Email</h3>
                                        <p className="text-gray-600">
                                            <a href="mailto:office@creativetrust.pl" className="hover:text-black transition-colors">
                                                office@creativetrust.pl
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="mr-4">
                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Telefon</h3>
                                        <p className="text-gray-600">
                                            <a href="tel:+48570526421" className="hover:text-black transition-colors">
                                                +48 570 526 421
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Button href="/kontakt">
                                    Skontaktuj się z nami
                                </Button>
                            </div>
                        </div>

                        <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/office-map.jpg"
                                alt="Mapa biura CreativeTrust"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-100">
                <div className="max-w-[1800px] mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-medium mb-8">Gotowy na współpracę?</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                        Skontaktuj się z nami, aby porozmawiać o tym, jak możemy pomóc w osiągnięciu Twoich celów biznesowych za pomocą skutecznych strategii marketingowych.
                    </p>
                    <Button href="/kontakt">
                        Umów bezpłatną konsultację!
                    </Button>
                </div>
            </section>
        </main>
    );
}