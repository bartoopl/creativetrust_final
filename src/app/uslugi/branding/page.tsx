import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
    title: 'Branding | Tworzenie i rozwój marek - CreativeTrust',
    description: 'Profesjonalne usługi brandingowe dla firm. Projektowanie logo, identyfikacji wizualnej i strategii marki, które wyróżnią Twój biznes na tle konkurencji.',
};

export default function BrandingPage() {
    const brandStats = [
        { id: 1, stat: '59%', description: 'konsumentów preferuje zakupy od marek, które znają' },
        { id: 2, stat: '81%', description: 'wymaga od marki zaufania przed dokonaniem zakupu' },
        { id: 3, stat: '77%', description: 'kupuje produkty ze względu na markę, a nie tylko nazwę' },
        { id: 4, stat: '39x', description: 'większa szansa, że będziesz wybrany spośród konkurencji' },
    ];

    const brandElements = [
        {
            icon: '✦',
            title: 'Strategia marki',
            description: 'Definiujemy Twoją markę od podstaw: misję, wizję, wartości, osobowość i pozycjonowanie na rynku.'
        },
        {
            icon: '◎',
            title: 'Identyfikacja wizualna',
            description: 'Tworzymy spójny system wizualny: logo, kolorystykę, typografię i elementy graficzne reprezentujące Twoją markę.'
        },
        {
            icon: '◈',
            title: 'Komunikacja marki',
            description: 'Opracowujemy tone of voice, storytelling i kluczowe komunikaty, które przemówią do Twoich odbiorców.'
        },
        {
            icon: '⟁',
            title: 'Materiały brandingowe',
            description: 'Projektujemy wizytówki, papier firmowy, prezentacje, materiały cyfrowe i wszystko, czego potrzebuje Twoja marka.'
        },
        {
            icon: '⬢',
            title: 'Brand guidelines',
            description: 'Tworzymy księgę znaku i wskazówki dotyczące używania elementów marki, zapewniając spójność we wszystkich kanałach.'
        },
        {
            icon: '⦿',
            title: 'Rebranding',
            description: 'Odświeżamy istniejące marki, zachowując ich wartość i rozpoznawalność, jednocześnie dostosowując je do współczesnych standardów.'
        },
    ];

    const brandingProcess = [
        {
            number: '01',
            title: 'Odkrycie',
            description: 'Przeprowadzamy wywiady, warsztaty i badania, aby poznać Twoją firmę, wartości, odbiorców i konkurencję. To fundament do stworzenia unikalnej marki.',
        },
        {
            number: '02',
            title: 'Strategia',
            description: 'Definiujemy pozycjonowanie marki, osobowość, propozycję wartości i kluczowe komunikaty. To drogowskaz dla wszystkich elementów brandingu.',
        },
        {
            number: '03',
            title: 'Kreatywność',
            description: 'Projektujemy logotyp, system wizualny i język komunikacji. Eksperymentujemy z różnymi kierunkami kreatywnymi, aby znaleźć ten idealny.',
        },
        {
            number: '04',
            title: 'Implementacja',
            description: 'Wdrażamy markę we wszystkich punktach styku z klientem. Tworzymy materiały brandingowe i przygotowujemy brand guidelines.',
        },
        {
            number: '05',
            title: 'Ewaluacja',
            description: 'Analizujemy, jak marka funkcjonuje w prawdziwym świecie. Zbieramy dane i opinie, aby upewnić się, że marka spełnia swoje cele.',
        },
    ];

    return (
        <main className="min-h-screen">
            {/* Hero sekcja */}
            <section className="w-full py-24 md:py-32 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h6 className="text-gray-500 mb-4 uppercase tracking-wide">Branding</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Budujemy marki, które pozostają w pamięci</h1>
                            <p className="text-xl text-gray-600 mb-10">
                                Dobry branding to więcej niż logo. To spójna historia, która przemawia do Twoich odbiorców, buduje zaufanie i wyróżnia Cię na tle konkurencji.
                            </p>
                            <Button href="#kontakt">
                                Porozmawiajmy o Twojej marce
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-10">
                                    <div className="rounded-lg bg-black"></div>
                                    <div className="rounded-lg bg-white shadow-sm"></div>
                                    <div className="rounded-lg bg-white shadow-sm"></div>
                                    <div className="rounded-lg bg-black"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl font-bold">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-400">CT</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-gray-200 -z-10"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gray-200 -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statystyki */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Dlaczego branding ma znaczenie?</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            W dzisiejszym konkurencyjnym świecie, silna marka jest kluczowa dla sukcesu. Oto kilka powodów, dlaczego warto inwestować w profesjonalny branding:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {brandStats.map((item) => (
                            <div key={item.id} className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="text-4xl md:text-5xl font-bold mb-4">{item.stat}</div>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Elementy brandingu */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium mb-6">Co składa się na kompleksowy branding?</h2>
                            <p className="text-lg text-gray-600">
                                Skuteczny branding to znacznie więcej niż samo logo. To kompleksowy system, który komunikuje wartości Twojej marki na każdym poziomie kontaktu z klientem.
                            </p>
                        </div>
                        <div className="aspect-video relative rounded-xl overflow-hidden">
                            <Image
                                src="/branding-elements.jpg"
                                alt="Elementy brandingu"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {brandElements.map((element, index) => (
                            <div key={index} className="p-8 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow duration-300">
                                <div className="text-4xl mb-4">{element.icon}</div>
                                <h3 className="text-xl font-medium mb-3">{element.title}</h3>
                                <p className="text-gray-600">{element.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proces brandingowy */}
            <section className="w-full py-16 md:py-24 px-6 bg-black text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Nasz proces brandingowy</h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Tworzymy marki w oparciu o sprawdzony proces, który gwarantuje skuteczne rezultaty. Każdy etap jest kluczowy dla budowy silnej i spójnej marki.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {brandingProcess.map((step, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                                <div className="md:col-span-1">
                                    <div className="text-6xl md:text-8xl font-bold text-gray-800">{step.number}</div>
                                </div>
                                <div className="md:col-span-1">
                                    <div className="text-2xl font-medium">{step.title}</div>
                                </div>
                                <div className="md:col-span-3">
                                    <p className="text-gray-300">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Branże */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium mb-6">Branding dla każdej branży</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Specjalizujemy się w tworzeniu marek dla różnych branż, rozumiejąc specyfikę każdej z nich. Niezależnie od tego, czy działasz w sektorze B2B, B2C, czy w branży kreatywnej, pomożemy Ci stworzyć markę, która przemówi do Twoich odbiorców.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-3">✓</span>
                                    <span>Startupy i nowe biznesy</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-3">✓</span>
                                    <span>E-commerce i handel detaliczny</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-3">✓</span>
                                    <span>Usługi profesjonalne i B2B</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-3">✓</span>
                                    <span>Branża technologiczna i IT</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-3">✓</span>
                                    <span>Gastronomia i hotelarstwo</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-3">✓</span>
                                    <span>Edukacja i organizacje non-profit</span>
                                </li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square relative rounded-xl overflow-hidden">
                                <Image
                                    src="/branding-industry-1.jpg"
                                    alt="Branding dla startupu"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                            <div className="aspect-square relative rounded-xl overflow-hidden mt-8">
                                <Image
                                    src="/branding-industry-2.jpg"
                                    alt="Branding dla e-commerce"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                            <div className="aspect-square relative rounded-xl overflow-hidden -mt-16">
                                <Image
                                    src="/branding-industry-3.jpg"
                                    alt="Branding dla usług profesjonalnych"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                            <div className="aspect-square relative rounded-xl overflow-hidden -mt-8">
                                <Image
                                    src="/branding-industry-4.jpg"
                                    alt="Branding dla branży technologicznej"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Przykłady brandingu */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Nasze podejście do brandingu</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Każda marka, którą tworzymy, jest unikalna i dopasowana do specyficznych potrzeb klienta. Zawsze stawiamy na połączenie estetyki, strategii i funkcjonalności.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Przykład 1 */}
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">01</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Branding oparty na badaniach</h3>
                            <p className="text-gray-600">
                                Nie zgadujemy, co zadziała. Opieramy nasze decyzje na solidnych badaniach rynku, konkurencji i grupy docelowej.
                            </p>
                        </div>

                        {/* Przykład 2 */}
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">02</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Branding z charakterem</h3>
                            <p className="text-gray-600">
                                Tworzymy marki, które mają osobowość i charakter. Marki, które są autentyczne i rezonują z odbiorcami na poziomie emocjonalnym.
                            </p>
                        </div>

                        {/* Przykład 3 */}
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="aspect-video relative rounded-lg overflow-hidden mb-4 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">03</div>
                                </div>
                            </div>
                            <h3 className="text-xl font-medium mb-2">Branding zorientowany na przyszłość</h3>
                            <p className="text-gray-600">
                                Projektujemy marki, które będą aktualne przez lata. Elastyczne, adaptowalne i gotowe na przyszłe wyzwania.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formularz kontaktowy */}
            <section id="kontakt" className="w-full py-16 md:py-32 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium mb-6">Gotowy na stworzenie wyjątkowej marki?</h2>
                        <p className="text-lg text-gray-600 mb-10">
                            Niezależnie od tego, czy rozpoczynasz nowy biznes, odświeżasz istniejącą markę, czy potrzebujesz całkowitego rebrandingu, jesteśmy tutaj, aby pomóc. Skontaktuj się z nami, aby rozpocząć rozmowę o Twojej marce.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="mt-1 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-1">Email</h3>
                                    <a href="mailto:office@creativetrust.pl" className="text-gray-600 hover:text-black transition-colors">
                                        office@creativetrust.pl
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-1">Telefon</h3>
                                    <a href="tel:+48570526421" className="text-gray-600 hover:text-black transition-colors">
                                        +48 570 526 421
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center text-black font-medium hover:text-gray-700 transition-colors"
                            >
                                Przejdź do strony kontaktowej
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2"
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

                    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-2xl font-medium mb-6">Szybki kontakt</h3>
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
                                        subject: 'Zapytanie o usługę brandingu',
                                        message: `Zapytanie ze strony brandingu:
Imię i nazwisko: ${formValues.name}
Email: ${formValues.email}
${formValues.company ? `Firma: ${formValues.company}` : ''}
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
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Wiadomość <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                    placeholder="Jak możemy pomóc z Twoim brandingiem?"
                                    required
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Wyślij wiadomość
                                </button>
                            </div>

                            <p className="text-sm text-gray-500 mt-4">
                                Wysyłając ten formularz, zgadzasz się na przetwarzanie Twoich danych osobowych zgodnie z naszą <a href="/polityka-prywatnosci" className="underline hover:text-black">polityką prywatności</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}