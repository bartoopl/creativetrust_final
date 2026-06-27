const services = [
    {
        eyebrow: 'Strony www',
        title: 'Buduj szybką',
        subtitle: 'ścieżkę do klienta',
        items: ['Projekty oparte o cel biznesowy', 'Wdrożenie przyspieszone przez AI', 'UX, który konwertuje'],
        active: true,
    href: '/uslugi/strony-www',
    },
    {
        eyebrow: 'Ecommerce',
        title: 'Skaluj bez',
        subtitle: 'ograniczeń platformy',
        items: ['Architektura headless / Medusa.js', 'Pełna kontrola - zero vendor lock-in', 'Integracje z ERP, CRM, marketplace'],
        href: '/uslugi/e-commerce',
    },
    {
        eyebrow: 'Marketing automation',
        title: 'Automatyzuj',
        subtitle: 'co powtarzalne',
        items: ['Sekwencje e-mail, SMS, push', 'Segmentacja i lead scoring', 'Raportowanie w czasie rzeczywistym'],
        href: '/uslugi/marketing-automation',
    },
    {
        eyebrow: 'Social media',
        title: 'Obecność, która',
        subtitle: 'sprzedaje',
        items: ['Strategia i harmonogram contentowy', 'Tworzenie treści i grafik', 'Community management i reklamy'],
        href: '/uslugi/social-media',
    },
];

function Bullet() {
    return (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="rgba(255,255,255,0.4)">
            <rect width="8" height="8" />
        </svg>
    );
}

export default function Services() {
    return (
        <section style={{ background: '#000', padding: '112px 72px 120px' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <span style={{ fontSize: 12.2, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.36px', lineHeight: '20px' }}>
                            OD PROJEKTU DO WYNIKU
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(34px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '48.4px', letterSpacing: '-1.76px', color: '#fff', margin: 0 }}>
                            Wszystko czego potrzebujesz,<br />
                            żeby rosnąć w digital.
                        </h2>
                    </div>

                    <div style={{ display: 'flex', gap: 32 }}>
                        {services.map((service) => (
                            <div key={service.eyebrow} style={{ flex: 1, borderRadius: 4, border: service.active ? '1px solid rgba(255,255,255,0.16)' : '1px solid rgba(255,255,255,0.08)', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24, background: service.active ? 'rgba(255,255,255,0.04)' : 'transparent' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <span style={{ fontSize: 11.4, fontWeight: 400, color: 'rgba(255,255,255,0.4)', lineHeight: '18px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {service.eyebrow}
                                    </span>
                                    <p style={{ fontSize: 15.4, fontWeight: 500, lineHeight: '22px', letterSpacing: '-0.32px', color: '#fff', margin: 0 }}>
                                    {service.title}
                                    <br />
                                    {service.subtitle}
                                </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {service.items.map((item) => (
                                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                            <Bullet />
                                            <span style={{ fontSize: 12.2, fontWeight: 400, color: 'rgba(255,255,255,0.6)', lineHeight: '18px' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
