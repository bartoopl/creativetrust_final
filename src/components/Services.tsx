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
        <section id="uslugi" style={{ background: '#f4f1ea', borderTop: '1px solid rgba(12,14,18,0.08)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 32px 84px' }} className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: '#5b6472', textTransform: 'uppercase', marginBottom: 10 }}>
                        Usługi
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(26px, 3.4vw, 42px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: '#11131a' }}>
                        Jeden zespół. Jeden kierunek.
                    </h2>
                </div>
                <p style={{ color: '#5b6472', fontSize: 14, maxWidth: '40ch', margin: 0, lineHeight: 1.55 }}>
                    Pracujemy jak studio produktowe: strategia, projekt i wdrożenie są u nas zszyte w jeden proces, a nie przekazywane między podwykonawcami.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
                <div
                    className="lg:col-span-5"
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 20,
                    border: '1px solid rgba(12, 14, 18, 0.10)',
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
                            background: 'radial-gradient(circle, rgba(165, 107, 255, 0.22) 0%, rgba(165, 107, 255, 0.02) 68%, transparent 74%)',
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

                <div className="lg:col-span-7 grid gap-4">
                    <div
                        style={{
                            borderRadius: 18,
                            padding: 20,
                            background: 'rgba(255,255,255,0.78)',
                            border: '1px solid rgba(12, 14, 18, 0.10)',
                            boxShadow: '0 10px 30px rgba(12, 14, 18, 0.05)',
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: '#5b6472', textTransform: 'uppercase', marginBottom: 10 }}>
                            Zakres
                        </div>
                        <p style={{ margin: 0, color: '#11131a', fontSize: 15, lineHeight: 1.55, fontWeight: 500, maxWidth: '52ch' }}>
                            Projektujemy systemy, które są jednocześnie czytelne dla zespołu i skuteczne dla biznesu.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {primaryServices.map((service) => (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="ct-card-hover grid grid-cols-1 gap-3 lg:grid-cols-[56px_minmax(0,1fr)_auto] lg:gap-4"
                                style={{
                                    borderRadius: 18,
                                    padding: 20,
                                    background: 'rgba(255,255,255,0.82)',
                                    border: '1px solid rgba(12, 14, 18, 0.10)',
                                    boxShadow: '0 10px 30px rgba(12, 14, 18, 0.04)',
                                    textDecoration: 'none',
                                    color: '#11131a',
                                    minHeight: 150,
                                    alignItems: 'start',
                                }}
                            >
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: '#5b6472', paddingTop: 2 }}>
                                    {service.meta}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 17, letterSpacing: '-0.03em', margin: '0 0 8px' }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ color: '#5b6472', fontSize: 13.5, lineHeight: 1.55, margin: 0, maxWidth: '56ch' }}>
                                        {service.desc}
                                    </p>
                                </div>
                                <div className="flex items-center justify-start gap-2 lg:flex-col lg:items-end lg:justify-start" style={{ paddingTop: 2 }}>
                                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                                        explore
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 18, color: 'var(--accent)', lineHeight: 1 }}>→</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
