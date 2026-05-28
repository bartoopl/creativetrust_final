import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Obsługa Social Media dla Firm | Agencja Social Media',
    description: 'Profesjonalna obsługa social media dla firm. Tworzymy angażujące treści, budujemy społeczności i zwiększamy sprzedaż przez Instagram, Facebook, LinkedIn i TikTok.',
    alternates: {
        canonical: `${SITE_URL}/uslugi/social-media`,
    },
    openGraph: {
        title: 'Obsługa Social Media dla Firm | CreativeTrust',
        description: 'Agencja social media, która buduje marki w internecie. Strategia, content, community management i analityka.',
        url: `${SITE_URL}/uslugi/social-media`,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Obsługa Social Media dla Firm | CreativeTrust',
        description: 'Agencja social media, która buduje marki w internecie. Strategia, content, community management i analityka.',
    },
};

export default function SocialMediaPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="w-full py-24 md:py-32 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2">
                            <h6 className="text-gray-600 mb-2">Social Media Marketing</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">
                                Obsługa Social Media dla Firm
                            </h1>
                            <p className="text-xl text-gray-700 mb-10">
                                Budujemy obecność Twojej marki w mediach społecznościowych, która
                                przekłada się na realne wyniki biznesowe. Strategia, content,
                                community management i analityka — wszystko w jednym miejscu.
                            </p>
                            <Button href="#kontakt">
                                Umów bezpłatną konsultację
                            </Button>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { platform: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500', icon: (
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    )},
                                    { platform: 'Facebook', color: 'bg-blue-600', icon: (
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    )},
                                    { platform: 'LinkedIn', color: 'bg-blue-700', icon: (
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                    )},
                                    { platform: 'TikTok', color: 'bg-black', icon: (
                                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                                    )},
                                ].map(({ platform, color, icon }) => (
                                    <div key={platform} className={`${color} rounded-2xl p-8 flex flex-col items-center justify-center gap-3`}>
                                        {icon}
                                        <span className="text-white font-medium text-lg">{platform}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Social media w liczbach
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="text-5xl font-bold text-black mb-4">27 mln</div>
                            <p className="text-xl">Polaków korzysta z mediów społecznościowych każdego miesiąca</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="text-5xl font-bold text-black mb-4">73%</div>
                            <p className="text-xl">Konsumentów kupuje produkt po zobaczeniu go w social media</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                            <div className="text-5xl font-bold text-black mb-4">5x</div>
                            <p className="text-xl">Wyższe zaangażowanie generuje treść video niż statyczne posty</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center">
                        Co wchodzi w skład obsługi social media?
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        Kompleksowe prowadzenie social media — od strategii, przez tworzenie treści, po analizę wyników.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Strategia i planowanie',
                                desc: 'Opracowujemy strategię social media dopasowaną do Twoich celów biznesowych — grupy docelowej, tonu komunikacji i kalendarza publikacji.',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
                            },
                            {
                                title: 'Tworzenie treści',
                                desc: 'Projektujemy grafiki, piszemy copy i produkujemy video — spójne z identyfikacją wizualną marki i angażujące Twoją społeczność.',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
                            },
                            {
                                title: 'Community management',
                                desc: 'Reagujemy na komentarze i wiadomości, budujemy relacje z obserwującymi i dbamy o pozytywny wizerunek marki w sieci.',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
                            },
                            {
                                title: 'Analityka i raportowanie',
                                desc: 'Co miesiąc dostajesz przejrzysty raport z wynikami: zasięg, zaangażowanie, wzrost obserwujących i przełożenie na ruch na stronie.',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                            },
                            {
                                title: 'Obsługa profili',
                                desc: 'Prowadzimy i optymalizujemy Twoje profile na Instagramie, Facebooku, LinkedInie i TikToku — od opisu, przez highlights, po pinned posts.',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />,
                            },
                            {
                                title: 'Kampanie organiczne',
                                desc: 'Planujemy akcje, konkursy i kampanie organiczne, które zwiększają zasięg bez budżetu reklamowego — viralowy content i współprace z markami.',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
                            },
                        ].map(({ title, desc, icon }) => (
                            <div key={title} className="bg-white p-8 rounded-xl shadow-sm">
                                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                                        {icon}
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-medium mb-4">{title}</h3>
                                <p className="text-gray-700">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platforms */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center">
                        Platformy, na których działamy
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                        Dobieramy kanały do Twojej grupy docelowej — nie marnujemy budżetu na platformy, które nie przynoszą wyników.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                name: 'Instagram',
                                desc: 'Ideał dla marek lifestyle\'owych, e-commerce i B2C. Reels, Stories, shopping tags i współprace z influencerami.',
                                best: 'B2C, e-commerce, moda, beauty, gastronomia',
                            },
                            {
                                name: 'Facebook',
                                desc: 'Najszersza baza użytkowników w Polsce. Grupy, wydarzenia, sklep i zaawansowane możliwości targetowania.',
                                best: 'Usługi lokalne, e-commerce, B2C 35+',
                            },
                            {
                                name: 'LinkedIn',
                                desc: 'Niezbędny dla firm B2B. Budowanie ekspertyzy, pozyskiwanie leadów i rekrutacja przez content thought leadership.',
                                best: 'B2B, SaaS, usługi profesjonalne, HR',
                            },
                            {
                                name: 'TikTok',
                                desc: 'Najszybciej rosnąca platforma w Polsce. Autentyczny content video i ogromne zasięgi organiczne dla odważnych marek.',
                                best: 'B2C, marki young adult, e-commerce, rozrywka',
                            },
                        ].map(({ name, desc, best }) => (
                            <div key={name} className="border border-gray-200 p-8 rounded-xl">
                                <h3 className="text-2xl font-medium mb-3">{name}</h3>
                                <p className="text-gray-700 mb-4">{desc}</p>
                                <p className="text-sm text-gray-500"><span className="font-medium">Najlepiej dla:</span> {best}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="w-full py-16 md:py-24 px-6 bg-gray-50">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Jak wygląda współpraca?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Audyt i strategia', desc: 'Analizujemy Twoją obecność online, konkurencję i grupę docelową. Opracowujemy strategię i harmonogram.' },
                            { step: '02', title: 'Onboarding', desc: 'Ustalamy tone of voice, styl graficzny i procesy akceptacji treści. Przygotowujemy szablony graficzne.' },
                            { step: '03', title: 'Produkcja i publikacja', desc: 'Tworzymy i publikujemy treści zgodnie z harmonogramem. Zarządzamy komentarzami i wiadomościami.' },
                            { step: '04', title: 'Analiza i optymalizacja', desc: 'Co miesiąc raportujemy wyniki i optymalizujemy strategię na podstawie danych i trendów.' },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="relative">
                                <div className="text-6xl font-bold text-gray-100 mb-4">{step}</div>
                                <h3 className="text-xl font-medium mb-3">{title}</h3>
                                <p className="text-gray-700">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="w-full py-16 md:py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Najczęstsze pytania o obsługę social media
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                q: 'Ile kosztuje prowadzenie social media?',
                                a: 'Koszt zależy od liczby platform, częstotliwości publikacji i zakresu usług. Przygotowujemy indywidualną wycenę po poznaniu Twoich potrzeb. Skontaktuj się z nami po bezpłatną wycenę.',
                            },
                            {
                                q: 'Jak szybko zobaczę efekty?',
                                a: 'Pierwsze wymierne efekty organiczne widać zwykle po 3–6 miesiącach regularnej działalności. Wzrost zasięgu i zaangażowania jest stopniowy, ale trwały w przeciwieństwie do reklam płatnych.',
                            },
                            {
                                q: 'Czy muszę mieć zdjęcia do postów?',
                                a: 'Nie musisz — dostarczamy kompleksową produkcję contentu, w tym grafiki i materiały wideo. Jeśli masz własne zdjęcia, chętnie z nich skorzystamy.',
                            },
                            {
                                q: 'Na ilu platformach możecie prowadzić social media?',
                                a: 'Prowadzimy profile na Instagramie, Facebooku, LinkedInie i TikToku. Rekomendujemy skupienie się na 2–3 platformach zamiast być wszędzie przeciętnie.',
                            },
                        ].map(({ q, a }) => (
                            <div key={q} className="border border-gray-200 p-8 rounded-xl">
                                <h3 className="text-lg font-medium mb-3">{q}</h3>
                                <p className="text-gray-700">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="kontakt" className="w-full py-16 md:py-32 px-6 bg-black text-white">
                <div className="max-w-[1800px] mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-medium mb-8">
                        Gotowy na social media, które przynoszą wyniki?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Umów bezpłatną konsultację. Przejrzymy Twoje profile i powiemy wprost,
                        co można poprawić i jaki potencjał drzemie w Twojej marce.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/kontakt"
                            className="group inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-gray-100"
                        >
                            <span>Umów konsultację</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform duration-300 group-hover:rotate-45">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </Link>
                        <Link
                            href="mailto:office@creativetrust.pl"
                            className="inline-flex items-center justify-center gap-2 border border-gray-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:border-gray-400"
                        >
                            Napisz do nas
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
