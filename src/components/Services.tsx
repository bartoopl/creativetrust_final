"use client";

import Link from 'next/link';

const primaryServices = [
    {
        href: '/uslugi/branding',
        title: 'Strategia marki',
        desc: 'Pozycjonowanie, narracja i system komunikacji, który porządkuje decyzje i skraca chaos.',
        meta: '01',
    },
    {
        href: '/uslugi/marketing-automation',
        title: 'Automatyzacja marketingu',
        desc: 'Lejki, CRM i sekwencje, które pracują po godzinach i spinają sprzedaż z danymi.',
        meta: '02',
    },
    {
        href: '/uslugi/e-commerce',
        title: 'Web & e-commerce',
        desc: 'Serwisy i sklepy projektowane pod szybkość, skalę i realną konwersję.',
        meta: '03',
    },
    {
        href: '/uslugi/strony-www',
        title: 'Product & UX design',
        desc: 'Interfejsy, które są czytelne dla zespołu, klienta i business case’u.',
        meta: '04',
    },
];

export default function Services() {
    return (
        <section id="uslugi" style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 32px 84px' }} className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
                        Usługi
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 42px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04 }}>
                        Jeden zespół. Jeden kierunek.
                    </h2>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: '40ch', margin: 0, lineHeight: 1.55 }}>
                    Pracujemy jak studio produktowe: strategia, projekt i wdrożenie są u nas zszyte w jeden proces, a nie przekazywane między podwykonawcami.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
                <div
                    className="lg:col-span-7"
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 20,
                        border: '1px solid var(--line)',
                        background: 'linear-gradient(180deg, #151821 0%, #0f1116 100%)',
                        color: 'var(--text)',
                        padding: 24,
                        minHeight: 300,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 'auto -10% -20% auto',
                            width: 280,
                            height: 280,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255, 106, 61, 0.20) 0%, rgba(255, 106, 61, 0.02) 68%, transparent 74%)',
                            pointerEvents: 'none',
                        }}
                    />
                    <div style={{ position: 'relative', display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
                        <div>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
                                Nasza przewaga
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.045em', margin: '0 0 10px', lineHeight: 1.05, maxWidth: '14ch' }}>
                                AI bez efektu „sztucznego dodatku”.
                            </h3>
                            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, maxWidth: '46ch', margin: 0 }}>
                                Wpinamy automatyzacje, analizę i generatywne procesy tam, gdzie realnie oszczędzają czas, porządkują decyzje i poprawiają wynik.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {['AI research', 'systemy design', 'automatyzacje', 'optymalizacja'].map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        fontFamily: 'var(--font-mono), monospace',
                                        fontSize: 11,
                                        color: 'var(--muted)',
                                        border: '1px solid var(--line)',
                                        padding: '6px 10px',
                                        borderRadius: 999,
                                        background: 'rgba(255,255,255,0.02)',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 grid gap-4">
                    <div
                        style={{
                            borderRadius: 18,
                            padding: 20,
                            background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
                            border: '1px solid var(--line)',
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>
                            Zakres
                        </div>
                        <p style={{ margin: 0, color: 'var(--text)', fontSize: 15, lineHeight: 1.55, fontWeight: 500 }}>
                            Projektujemy systemy, które są jednocześnie czytelne dla zespołu i skuteczne dla biznesu.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {primaryServices.slice(0, 2).map((service) => (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="ct-card-hover"
                                style={{
                                    borderRadius: 16,
                                    padding: 18,
                                    background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
                                    border: '1px solid var(--line)',
                                    textDecoration: 'none',
                                    color: 'var(--text)',
                                    minHeight: 170,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)' }}>
                                    {service.meta}
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 17, letterSpacing: '-0.03em', margin: '0 0 8px' }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.55, margin: 0 }}>
                                        {service.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {primaryServices.slice(2).map((service) => (
                        <Link
                            key={service.href}
                            href={service.href}
                            className="ct-card-hover lg:col-span-6"
                            style={{
                                borderRadius: 16,
                                padding: 18,
                                background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
                                border: '1px solid var(--line)',
                                textDecoration: 'none',
                                color: 'var(--text)',
                                minHeight: 160,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)' }}>
                                    {service.meta}
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                                    explore
                                </div>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 18, letterSpacing: '-0.03em', margin: '0 0 8px' }}>
                                    {service.title}
                                </h3>
                                <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.55, margin: 0, maxWidth: '46ch' }}>
                                    {service.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
