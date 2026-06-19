"use client";

import Link from 'next/link';

export default function Services() {
    return (
        <section id="uslugi" style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 32px 96px' }} className="px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 lg:mb-11 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>
                        USŁUGI
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', letterSpacing: '-0.025em', margin: 0, lineHeight: 1.04 }}>
                        Jeden zespół. Pełen zakres.
                    </h2>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: '38ch', margin: 0 }}>
                    Od pierwszej diagnozy po rozwój produktu — bez przekazywania pałeczki między agencjami.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">

                {/* AI featured card */}
                <div style={{
                    position: 'relative', overflow: 'hidden', borderRadius: 20, padding: 34,
                    background: 'linear-gradient(140deg, color-mix(in srgb, var(--accent) 26%, var(--panel)) 0%, var(--panel) 55%)',
                    border: '1px solid color-mix(in srgb, var(--accent) 40%, var(--line))',
                    minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    transition: 'transform .3s, box-shadow .3s',
                }} className="col-span-full p-6 md:col-span-7 md:p-8"
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 24px 60px var(--glow)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, var(--glow) 0%, transparent 70%)', animation: 'ctfloat 6s ease-in-out infinite' }} />
                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)', border: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)', padding: '5px 11px', borderRadius: 999, textTransform: 'uppercase' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)', animation: 'ctpulse 1.6s infinite' }} />
                            nasza przewaga
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em', margin: '22px 0 12px' }}>Sztuczna inteligencja</h3>
                        <p style={{ color: 'var(--text)', opacity: 0.85, fontSize: 16, lineHeight: 1.55, maxWidth: '42ch', margin: 0 }}>
                            Agenci, generatywny content, automatyzacje i analiza danych — wplecione w każdy etap projektu. Nie dokładamy AI „na siłę". Wiemy, gdzie realnie skraca czas i podnosi wynik.
                        </p>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
                        {['AI research', 'generative design', 'agenci & automatyzacje'].map(tag => (
                            <span key={tag} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--muted)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: 8 }}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* right stacked */}
                <div className="col-span-full flex flex-col gap-4 md:col-span-5">
                    {[
                        { href: '/uslugi/branding', title: 'Strategia marki', desc: 'Pozycjonowanie, narracja i architektura komunikacji, która się broni.' },
                        { href: '/uslugi/marketing-automation', title: 'Automatyzacja marketingu', desc: 'Lejki, CRM i kampanie sterowane danymi — działają, kiedy śpisz.' },
                    ].map(card => (
                        <Link key={card.href} href={card.href} style={{
                            flex: 1, borderRadius: 20, padding: 28,
                            background: 'var(--panel)', border: '1px solid var(--line)',
                            textDecoration: 'none', color: 'var(--text)',
                            transition: 'transform .3s, border-color .3s',
                        }} className="p-6 md:p-7"
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 21, letterSpacing: '-0.01em', margin: '0 0 8px' }}>{card.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* bottom row */}
                {[
                    { num: '01', href: '/uslugi/e-commerce', title: 'Web & e-commerce', desc: 'Sklepy i serwisy, które sprzedają i skalują się bez bólu.' },
                    { num: '02', href: '/uslugi/strony-www', title: 'Product & UX design', desc: 'Interfejsy projektowane wokół konwersji, nie tylko estetyki.' },
                    { num: '03', href: '/uslugi/branding', title: 'Development', desc: 'Wydajny, skalowalny kod. Headless, Jamstack, integracje.' },
                ].map(card => (
                    <Link key={card.num} href={card.href} style={{
                        borderRadius: 20, padding: 28, background: 'var(--panel)', border: '1px solid var(--line)',
                        minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        textDecoration: 'none', color: 'var(--text)',
                        transition: 'transform .3s, border-color .3s',
                    }} className="col-span-full p-6 md:col-span-4 md:p-7"
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)' }}>{card.num}</div>
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 21, margin: '0 0 8px' }}>{card.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
