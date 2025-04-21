import React from 'react';
import Image from 'next/image';
import ServicePortfolio from '@/components/ServicePortfolio';
import SigningProcess from "@/components/SigningProcessComponent";

export const metadata = {
    title: 'Strony WWW | Twoja Agencja',
    description: 'Profesjonalne strony internetowe tworzone z pasją i dbałością o skuteczność marketingową. Wykorzystujemy najnowsze technologie dla Twojego sukcesu.',
};

export default function WebsitesServicePage() {
    return (
        <main className="min-h-screen pt-24">
            {/* Hero sekcja */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col md:flex-row items-start gap-12">
                        <div className="w-full md:w-1/2">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
                                Strony WWW, które<br />
                                <span className="text-gray-400">przyciągają klientów</span>
                            </h1>
                            <p className="text-lg mb-8 text-gray-700">
                                Od 7 lat tworzymy strony internetowe, które nie tylko świetnie wyglądają, ale przede wszystkim realizują cele biznesowe naszych klientów.
                            </p>
                            <div className="flex items-center space-x-8 mb-8">
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold">7+</span>
                                    <span className="text-sm text-gray-500">lat doświadczenia</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold">150+</span>
                                    <span className="text-sm text-gray-500">zadowolonych klientów</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold">98%</span>
                                    <span className="text-sm text-gray-500">poziom satysfakcji</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                            <Image
                                src="/images/web-development.jpg"
                                alt="Tworzenie stron internetowych"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja technologie */}
            <section className="w-full py-16 bg-gray-50 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl font-medium mb-12 text-center">Technologie, które wykorzystujemy</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-4 relative">
                                <Image src="/wordpress.svg" alt="WordPress" fill className="object-contain" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">WordPress</h3>
                            <p className="text-sm text-gray-600">Najpopularniejszy CMS na świecie, oferujący elastyczność i łatwość zarządzania treścią.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-4 relative">
                                <Image src="/react.svg" alt="React" fill className="object-contain" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">React</h3>
                            <p className="text-sm text-gray-600">Nowoczesna biblioteka JavaScript do tworzenia interaktywnych interfejsów użytkownika.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-4 relative">
                                <Image src="/nextjs.svg" alt="Next.js" fill className="object-contain" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Next.js</h3>
                            <p className="text-sm text-gray-600">Framework React z zaawansowanymi funkcjami, wspierający SEO i wydajność.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                            <div className="w-16 h-16 mb-4 relative">
                                <Image src="/elementor.svg" alt="Elementor" fill className="object-contain" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Elementor</h3>
                            <p className="text-sm text-gray-600">Intuicyjny kreator stron dla WordPress, umożliwiający projektowanie bez znajomości kodu.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja podejście */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl font-medium mb-12">Nasze kompleksowe podejście</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div>
                            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <span className="text-xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-medium mb-3">Analiza i strategia</h3>
                            <p className="text-gray-700">
                                Zaczynamy od zrozumienia Twoich celów biznesowych i grupy docelowej. Tworzymy strategię, która określa, jak strona internetowa wpisze się w Twój lejek marketingowy.
                            </p>
                        </div>
                        <div>
                            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <span className="text-xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-medium mb-3">Projektowanie i UX</h3>
                            <p className="text-gray-700">
                                Projektujemy intuicyjne interfejsy, które nie tylko wyglądają atrakcyjnie, ale przede wszystkim prowadzą użytkownika do pożądanych działań i konwersji.
                            </p>
                        </div>
                        <div>
                            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                                <span className="text-xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-medium mb-3">Rozwój i optymalizacja</h3>
                            <p className="text-gray-700">
                                Implementujemy stronę z wykorzystaniem odpowiednich technologii, dbając o szybkość ładowania, SEO i kompatybilność z różnymi urządzeniami.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <SigningProcess />
            {/* Sekcja korzyści */}
            <section className="w-full py-16 bg-gray-50 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl font-medium mb-12 text-center">Dlaczego warto z nami współpracować?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Strona jako element lejka marketingowego</h3>
                            <p className="text-gray-700">
                                Projektujemy strony, które nie są tylko wizytówką, ale aktywnym narzędziem marketingowym, przyciągającym i konwertującym potencjalnych klientów.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Optymalizacja pod SEO</h3>
                            <p className="text-gray-700">
                                Dbamy o to, aby Twoja strona była widoczna w wynikach wyszukiwania, stosując najlepsze praktyki SEO już na etapie projektowania.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Responsywność i szybkość</h3>
                            <p className="text-gray-700">
                                Nasze strony doskonale wyglądają na każdym urządzeniu i ładują się błyskawicznie, co przekłada się na lepsze doświadczenie użytkownika i wyższe pozycje w Google.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium mb-4">Wsparcie po wdrożeniu</h3>
                            <p className="text-gray-700">
                                Oferujemy kompleksowe wsparcie techniczne, regularne aktualizacje i pomoc w rozwijaniu strony wraz z rozwojem Twojego biznesu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja portfolio */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl font-medium mb-12">Nasze realizacje</h2>
                    <ServicePortfolio categorySlug="strony-www" />
                </div>
            </section>


        </main>
    );
}