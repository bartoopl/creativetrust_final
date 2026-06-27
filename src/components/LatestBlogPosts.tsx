const testimonials = [
    {
        name: 'Anna Kowalska',
        role: 'CEO, XYZ Sp. z o.o.',
        text: 'Creativetrust nie robi tylko tego, co jest na briefie. Aktywnie sugerują co zmienić, żeby osiągnąć lepsze wyniki.',
    },
    {
        name: 'Marcin Nowak',
        role: 'Founder, Brand ABC',
        text: 'Nasz sklep na Medusa.js działa szybciej, wygląda lepiej i kosztuje nas mniej miesięcznie niż poprzednia platforma.',
    },
    {
        name: 'Karolina Wiśniewska',
        role: 'Marketing Manager',
        text: 'Automatyzacja marketingu, którą wdrożyli, zmniejszyła nasz czas obsługi leadów o połowę.',
    },
    {
        name: 'Tomasz Dąbrowski',
        role: 'CEO, Startup DEF',
        text: 'Szczerość i bezpośredniość - wiedzą, co mówią, i mówią to wprost. Z takim partnerem dobrze się pracuje.',
    },
];

export default function LatestBlogPosts() {
    return (
        <section style={{ background: '#fff', padding: '80px 72px' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 80 }}>
                    <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px', lineHeight: '18px' }}>Klienci</span>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(34px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '48.4px', letterSpacing: '-1.76px', color: '#000', margin: 0, textAlign: 'center' }}>
                        Co mówią firmy, z którymi pracujemy
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(0,0,0,0.08)', borderRadius: 4, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)' }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    {testimonials.map((item) => (
                        <div key={item.name} style={{ background: '#fff', display: 'flex', flexDirection: 'column', minHeight: 497 }}>
                            <div style={{ height: 120, borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 32px' }}>
                                <div style={{ width: 32, height: 32, borderRadius: 4, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>CT</span>
                                </div>
                            </div>
                            <div style={{ flex: 1, borderBottom: '1px solid rgba(0,0,0,0.08)', padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(0,0,0,0.15)">
                                    <path d="M 1.333 0 L 13.333 0 L 14.667 0 L 14.667 1.333 L 14.667 8 L 13.333 8 L 5.333 8 L 4 8 L 4 6.667 L 4 5.333 L 4 4 L 5.333 4 L 12 4 L 12 5.333 L 5.333 5.333 L 5.333 6.667 L 13.333 6.667 L 13.333 1.333 L 1.333 1.333 L 1.333 9.333 L 13.333 9.333 L 13.333 10.667 L 1.333 10.667 L 0 10.667 L 0 9.333 L 0 1.333 L 0 0 L 1.333 0 Z" fillRule="evenodd" />
                                </svg>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: '#000', margin: 0 }}>
                                    {item.text}
                                </p>
                            </div>
                            <div style={{ height: 80, padding: '0 32px 0 52px', display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000', margin: 0 }}>{item.name}</p>
                                    <p style={{ fontSize: 11.4, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
