import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LandingLeadForm from '@/components/LandingLeadForm';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, buildBreadcrumbSchema } from '@/lib/schema';

const canonicalUrl = `${SITE_URL}/uslugi/landing-page-pod-reklamy`;

export const metadata: Metadata = {
    title: 'Landing page pod reklamy | Strona pod kampanie performance',
    description:
        'Landing page pod reklamy i kampanie performance. Strona pod Google Ads, Meta Ads i lead generation. Projekt pod konwersję, nie pod ogólną wizytówkę.',
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        title: 'Landing page pod reklamy | CreativeTrust',
        description:
            'Projektujemy landing pages pod reklamy płatne, kampanie performance i konwersję.',
        url: canonicalUrl,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Landing page pod reklamy | CreativeTrust',
        description:
            'Strona pod kampanie Google Ads, Meta Ads i lead generation.',
    },
};

const signals = [
    'kampania płatna potrzebuje strony z jedną ofertą',
    'ruch z reklam szybko odpada, jeśli komunikat się rozjeżdża',
    'landing page musi być szybki i prosty',
    'strona ma prowadzić do jednego CTA',
    'copy i reklama muszą mówić tym samym językiem',
];

const essentials = [
    'jedna obietnica i jedno CTA',
    'krótka ścieżka od wejścia do kontaktu',
    'copy dopasowane do reklamy',
    'szybkość ładowania i mobile-first',
    'pomiar konwersji i testy wariantów',
];

const useCases = [
    'kampania Google Ads na jedną usługę',
    'Meta Ads do pozyskiwania leadów',
    'promocja oferty sezonowej',
    'testowanie nowego komunikatu sprzedażowego',
];

export default function LandingPageAdsPage() {
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Strona główna', url: SITE_URL },
        { name: 'Usługi', url: `${SITE_URL}/uslugi` },
        { name: 'Landing page pod reklamy', url: canonicalUrl },
    ]);

    return (
        <main className="min-h-screen bg-white">
            <SchemaScript schema={breadcrumbSchema} />

            <section className="bg-black px-6 py-20 text-white md:py-28">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/40">
                            Performance
                        </p>
                        <h1 className="mb-8 text-3xl font-medium leading-tight md:text-5xl">
                            Landing page pod reklamy, który zwiększa konwersję zamiast ją rozmywać
                        </h1>
                        <p className="mb-10 max-w-3xl text-xl text-white/70">
                            To strona pod kampanię płatną, nie ogólna podstrona usług. Układamy komunikat,
                            szybkość i CTA tak, żeby ruch z reklam miał prostą drogę do zapytania.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="#formularz"
                                className="inline-flex items-center justify-center rounded-full border border-white bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
                            >
                                Zleć landing page
                            </Link>
                            <Link
                                href="/uslugi/strony-www"
                                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
                            >
                                Oferta stron WWW
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                            <Image
                                src="/images/seo/google-ads-audit-hero.png"
                                alt="Landing page pod reklamy i kampanie performance"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
                            <p className="mb-6 text-white/40">Kiedy warto?</p>
                            <div className="space-y-4">
                                {signals.map((item) => (
                                    <div key={item} className="flex gap-4">
                                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                                        <p className="text-lg text-white/90">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3 text-gray-500">Must-have landing page</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Landing pod reklamy powinien być prosty, szybki i bez tarcia
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                        {essentials.map((item) => (
                            <div key={item} className="rounded-3xl border border-gray-200 p-8">
                                <p className="text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                    <div>
                        <p className="mb-3 text-gray-500">Dla kogo</p>
                        <h2 className="text-2xl font-medium leading-tight md:text-4xl">
                            Dla kampanii, które mają sprzedawać konkretną ofertę, a nie ogólny wizerunek
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {useCases.map((item) => (
                            <div key={item} className="rounded-2xl bg-white p-6 shadow-sm">
                                <p className="text-gray-800">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-12 max-w-4xl">
                        <p className="mb-3 text-gray-500">Co robimy</p>
                        <h2 className="text-2xl font-medium md:text-4xl">
                            Projekt pod reklamę, od komunikatu po CTA
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            'research i intencja użytkownika',
                            'copy i struktura sekcji',
                            'projekt i szybkie wdrożenie',
                            'pomiar i iteracja',
                        ].map((item, index) => (
                            <div key={item} className="rounded-3xl bg-black p-8 text-white">
                                <div className="mb-8 text-3xl font-bold text-white/20">0{index + 1}</div>
                                <h3 className="mb-4 text-xl font-medium">{item}</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Budujemy stronę tak, aby ruch z reklamy miał jedną drogę i jedną decyzję do podjęcia.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="formularz" className="bg-gray-50 px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1100px]">
                    <LandingLeadForm
                        formTitle="Landing page pod reklamy"
                        formSubtitle="Opisz kampanię, ofertę i cel konwersji. Zrobimy stronę pod reklamy, która nie rozprasza i nie miesza komunikatu."
                        subjectPrefix="Landing page pod reklamy"
                        serviceOptions={[
                            'landing page pod Google Ads',
                            'landing page pod Meta Ads',
                            'strona pod lead generation',
                            'test nowej kampanii',
                            'nie wiem, potrzebuję rekomendacji',
                        ]}
                        budgetOptions={[
                            'do 5 000 zł',
                            '5 000 - 10 000 zł',
                            '10 000 - 20 000 zł',
                            'powyżej 20 000 zł',
                            'nie wiem / potrzebuję rekomendacji',
                        ]}
                        messagePlaceholder="Napisz, jaka oferta ma być promowana, skąd będzie ruch i jaka konwersja ma się wydarzyć po wejściu na stronę."
                    />
                </div>
            </section>
        </main>
    );
}
