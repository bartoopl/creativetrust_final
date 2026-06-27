import Link from 'next/link';

const primaryServices = [
    { href: '/uslugi/strony-www', title: 'Web & UX design', desc: 'Interfejsy, które są czytelne dla zespołu, klienta i business case’u.', meta: '01' },
    { href: '/uslugi/marketing-automation', title: 'Automatyzacja marketingu', desc: 'Lejki, CRM i sekwencje, które pracują po godzinach i spinają sprzedaż z danymi.', meta: '02' },
    { href: '/uslugi/e-commerce', title: 'Web & e-commerce', desc: 'Serwisy i sklepy projektowane pod szybkość, skalę i realną konwersję.', meta: '03' },
    { href: '/uslugi/social-media', title: 'Social media', desc: 'Komunikacja pod zasięg, spójność i sprzedaż — nie tylko pod publikacje.', meta: '04' },
];

export default function Services() {
    return (
        <section id="uslugi" style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#ffffff' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-xl">
                <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between" style={{ marginBottom: 80 }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                            From foundation to action
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0, color: '#ffffff', maxWidth: '14ch' }}>
                            Everything you need to ship at AI speed.
                        </h2>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: '40ch', margin: 0, lineHeight: '27px', letterSpacing: '-0.36px' }}>
                        Strategia, projekt i wdrożenie są u nas zszyte w jeden proces, a nie przekazywane między podwykonawcami.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
                    {primaryServices.map((service) => (
                        <Link key={service.href} href={service.href} className="ct-card-hover" style={{ textDecoration: 'none', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: 24, padding: '32px 24px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: service.meta === '01' ? 'rgba(255,255,255,0.04)' : 'transparent' }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', fontWeight: 400, textTransform: 'uppercase' }}>
                                {service.title === 'Automatyzacja marketingu' ? 'Infrastructure' : service.title === 'Web & e-commerce' ? 'Adoption' : service.title === 'Social media' ? 'Governance' : 'Engineering'}
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: '15.4px', letterSpacing: '-0.32px', margin: 0, lineHeight: '24px' }}>
                                {service.title}
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', margin: 0 }}>
                                {service.desc}
                            </p>
                            <div style={{ marginTop: 4, fontFamily: 'var(--font-mono), monospace', fontSize: 13.2, letterSpacing: '.1px', color: '#fff', fontWeight: 500 }}>
                                Zobacz →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
