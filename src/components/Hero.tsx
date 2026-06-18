"use client";

import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

const highlights = [
    'Branding i komunikacja',
    'Strony WWW i landing pages',
    'E-commerce i migracje',
    'Social media i automation',
];

const metrics = [
    { value: '4', label: 'główne filary oferty' },
    { value: '150+', label: 'zrealizowanych projektów' },
    { value: '1 zespół', label: 'od strategii do wdrożenia' },
];

const Hero = () => {
    return (
        <section className="w-full px-6 py-16 md:py-24 lg:py-28">
            <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="max-w-3xl">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        CreativeTrust
                    </p>
                    <h1 className="max-w-4xl text-4xl font-medium leading-[1.02] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
                        Projektujemy strony, e-commerce i komunikację, które pomagają rosnąć.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                        Łączymy strategię marki, design, development i automatyzację marketingu.
                        Pracujemy jak partner produktowy: od diagnozy, przez projekt, po wdrożenie i rozwój.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button href="/kontakt">Umów rozmowę</Button>
                        <Link
                            href="/uslugi"
                            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-900"
                        >
                            Zobacz zakres usług
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
                        {metrics.map((metric) => (
                            <div key={metric.label}>
                                <div className="text-3xl font-medium text-slate-950">{metric.value}</div>
                                <div className="mt-1 text-sm text-slate-500">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 rounded-[24px] border border-slate-200 bg-slate-50/60" />
                    <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                        <div className="relative aspect-[4/5]">
                            <Image
                                src="/web-development.jpg"
                                alt="Zespół projektujący stronę internetową"
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 42vw"
                            />
                        </div>

                        <div className="border-t border-slate-200 p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                        Zakres pracy
                                    </p>
                                    <p className="mt-2 text-lg font-medium text-slate-950">
                                        Strategia, UX, content, performance, automation.
                                    </p>
                                </div>
                                <Link
                                    href="/o-nas"
                                    className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-950 transition-colors hover:border-slate-950"
                                    aria-label="Poznaj nas"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M7 17L17 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 7H17V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
