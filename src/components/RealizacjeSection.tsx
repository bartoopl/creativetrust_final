import Link from 'next/link';

const cases = [
    {
        category: 'Case Study · Ecommerce',
        title: 'Sklep headless na Medusa.js dla klienta z branży fashion',
        description: 'Migracja z WooCommerce na architekturę headless - pełna kontrola nad UX, 40% szybsze ładowanie strony produktu.',
        image: '/design-handoff-v7/ad20e828e5fd5e59.png',
    },
    {
        category: 'Case Study · Marketing automation',
        title: 'Wdrożenie automatyzacji dla firmy B2B - 3× więcej kwalifikowanych leadów',
        description: 'Zbudowaliśmy system lead nurturing, który działa 24/7 - od pierwszego kontaktu po zamknięcie sprzedaży.',
        image: '/design-handoff-v7/4d6f580d2fcd21dc.png',
    },
];

export default function RealizacjeSection() {
    return (
        <section style={{ background: '#fff', padding: '72px 16px' }} className="lg:px-[72px] lg:py-[120px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(28px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-1.76px', color: '#000', margin: '0 0 40px', textAlign: 'center' }} className="lg:mb-16">
                    Jak to wygląda w praktyce
                </h2>

                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    {cases.map((item) => (
                        <div key={item.title} className="flex-1 overflow-hidden rounded-[4px] border border-[rgba(0,0,0,0.06)]">
                            <div style={{ height: 280, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: 32 }}>
                                <p style={{ fontSize: 11.4, fontWeight: 400, color: 'rgba(0,0,0,0.4)', lineHeight: '18px', margin: '0 0 12px' }}>
                                    {item.category}
                                </p>
                                <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 21.8, fontWeight: 500, lineHeight: '26.4px', letterSpacing: '-0.88px', color: '#000', margin: '0 0 12px' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
                    <Link href="/portfolio" style={{ fontSize: 13.2, color: 'rgba(0,0,0,0.6)', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontWeight: 500 }}>
                        Wszystkie realizacje →
                    </Link>
                </div>
            </div>
        </section>
    );
}
