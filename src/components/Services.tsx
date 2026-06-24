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
        <section id="uslugi" style={{ background: '#ffffff', borderTop: '1px solid var(--line)' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: '84px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
                            Services
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04, color: 'var(--text)' }}>
                            Jeden zespół. Jeden kierunek.
                        </h2>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: '40ch', margin: 0, lineHeight: 1.55 }}>
                        Strategia, projekt i wdrożenie są u nas zszyte w jeden proces, a nie przekazywane między podwykonawcami.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
                    {primaryServices.map((service) => (
                        <Link key={service.href} href={service.href} className="ct-card-hover" style={{ textDecoration: 'none', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: 12, padding: 24, borderRadius: 18, border: '1px solid var(--line)', background: '#ffffff', boxShadow: '0 14px 36px rgba(17,24,39,0.04)' }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--accent)', fontWeight: 600 }}>
                                {service.meta}
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 18, letterSpacing: '-0.03em', margin: 0, lineHeight: 1.2 }}>
                                {service.title}
                            </h3>
                            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                                {service.desc}
                            </p>
                            <div style={{ marginTop: 4, fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
                                Explore →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
