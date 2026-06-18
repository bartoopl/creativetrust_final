import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Button from '@/components/Button';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'O nas - CreativeTrust | Strategia i wykonanie',
    description: 'CreativeTrust łączy strategię marki, web design, e-commerce i automatyzację marketingu w jednym procesie.',
    alternates: {
        canonical: `${SITE_URL}/o-nas`,
    },
};

const values = [
    {
        title: 'Skuteczność',
        description: 'Każde działanie ma wspierać wynik biznesowy, nie tylko poprawiać wygląd.',
    },
    {
        title: 'Transparentność',
        description: 'Ustalamy zakres, priorytety i odpowiedzialność na początku współpracy.',
    },
    {
        title: 'Partnerstwo',
        description: 'Pracujemy jak część zespołu klienta, a nie jak odłączony podwykonawca.',
    },
];

const milestones = [
    {
        year: '2016',
        title: 'Start jako agencja digital',
        description: 'Budowaliśmy pierwsze kampanie i komunikację dla marek, które potrzebowały prostszej ścieżki do klienta.',
    },
    {
        year: '2018',
        title: 'Rozszerzenie o WWW i e-commerce',
        description: 'Dołożyliśmy projektowanie stron i sklepów, żeby kontrolować cały lejek, a nie tylko fragment.',
    },
    {
        year: '2024',
        title: 'SALESmanago partner',
        description: 'Wzmocniliśmy obszar automatyzacji i pracy z danymi marketingowymi.',
    },
    {
        year: '2025',
        title: 'Więcej projektów strategicznych',
        description: 'Pracujemy częściej jako partner wdrożeniowy dla marek, które potrzebują spójnego systemu komunikacji.',
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <section className="w-full px-6 py-16 md:py-24 lg:py-28">
                <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            O nas
                        </p>
                        <h1 className="mt-4 text-4xl font-medium leading-[1.02] text-slate-950 md:text-6xl lg:text-7xl">
                            Łączymy strategię z wykonaniem, żeby komunikacja miała realny wpływ na biznes.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                            CreativeTrust działa jak studio, które potrafi przejść od marki do wdrożenia bez rozbijania projektu
                            na przypadkowe etapy. Dzięki temu projekty są spójne, szybsze i prostsze w rozwijaniu.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button href="/kontakt">Porozmawiajmy</Button>
                            <Link
                                href="/uslugi"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                            >
                                Zobacz usługi
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-slate-100">
                            <div className="relative aspect-[4/5]">
                                <Image
                                    src="/about-hero.jpg"
                                    alt="Zespół CreativeTrust"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Co nas prowadzi
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Zasady, które trzymają projekt w ryzach.
                        </h2>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
                        {values.map((value) => (
                            <div key={value.title} className="bg-white p-6 md:p-8">
                                <h3 className="text-2xl font-medium text-slate-950">{value.title}</h3>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full px-6 py-16 md:py-24">
                <div className="mx-auto max-w-[1800px] border-t border-slate-200 pt-6">
                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Nasza droga
                        </p>
                        <h2 className="mt-2 text-3xl font-medium text-slate-950 md:text-4xl">
                            Rozwijaliśmy ofertę w tę samą stronę, w którą dziś prowadzimy projekty klientów.
                        </h2>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-4">
                        {milestones.map((milestone) => (
                            <div key={milestone.year} className="bg-white p-6">
                                <p className="text-sm font-medium text-slate-500">{milestone.year}</p>
                                <h3 className="mt-3 text-xl font-medium text-slate-950">{milestone.title}</h3>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-slate-950 px-6 py-16 text-white md:py-24">
                <div className="mx-auto max-w-[1800px]">
                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                            W liczbach
                        </p>
                        <h2 className="mt-2 text-3xl font-medium md:text-4xl">
                            Skala, która ma znaczenie tylko wtedy, gdy wspiera jakość pracy.
                        </h2>
                    </div>

                    <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ['9+', 'lat na rynku'],
                            ['150+', 'zrealizowanych projektów'],
                            ['98%', 'zadowolonych klientów'],
                            ['10+', 'obsługiwanych branż'],
                        ].map(([value, label]) => (
                            <div key={label} className="bg-slate-950 p-6">
                                <div className="text-5xl font-medium">{value}</div>
                                <p className="mt-3 text-sm text-white/65">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
