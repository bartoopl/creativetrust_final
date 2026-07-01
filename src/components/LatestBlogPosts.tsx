const testimonials = [
    {
        name: 'Anna',
        text: 'Creativetrust nie robi tylko tego, co jest na briefie. Aktywnie sugerują co zmienić, żeby osiągnąć lepsze wyniki.',
    },
    {
        name: 'Marcin',
        text: 'Nasz sklep na Medusa.js działa szybciej, wygląda lepiej i kosztuje nas mniej miesięcznie niż poprzednia platforma.',
    },
    {
        name: 'Karolina',
        text: 'Automatyzacja marketingu, którą wdrożyli, zmniejszyła nasz czas obsługi leadów o połowę.',
    },
    {
        name: 'Tomasz',
        text: 'Szczerość i bezpośredniość - wiedzą, co mówią, i mówią to wprost. Z takim partnerem dobrze się pracuje.',
    },
];

export default function LatestBlogPosts() {
    return (
        <section style={{ background: 'linear-gradient(180deg, #fbfbf8 0%, #fff 100%)', padding: '64px 16px' }} className="lg:px-[72px] lg:py-[80px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 48 }} className="lg:mb-20">
                    <span style={{ fontSize: 12.9, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.48px', lineHeight: '18px' }}>Klienci</span>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(34px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '48.4px', letterSpacing: '-1.76px', color: '#000', margin: 0, textAlign: 'center' }}>
                        Co mówią firmy, z którymi pracujemy
                    </h2>
                    <div aria-hidden="true" style={{ width: '100%', maxWidth: 260, height: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', animation: 'ctmarquee 10s linear infinite', whiteSpace: 'nowrap', color: 'rgba(0,0,0,0.28)', fontSize: 18, lineHeight: 1, letterSpacing: '20px' }}>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                        </div>
                    </div>
                </div>

                <div style={{ gap: 1, background: 'rgba(0,0,0,0.06)', borderRadius: 6, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    {testimonials.map((item) => (
                        <div key={item.name} style={{ background: '#fff', display: 'flex', flexDirection: 'column', minHeight: 420 }} className="lg:min-h-[497px]">
                            <div style={{ height: 96, borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', padding: '0 24px' }} className="lg:h-[120px] lg:px-8">
                                <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(0,0,0,0.22)', fontSize: 20, letterSpacing: '8px' }}>
                                    <span style={{ animation: 'ctpulse 2.6s ease-in-out infinite' }}>·</span>
                                    <span style={{ animation: 'ctpulse 2.6s ease-in-out infinite 0.15s' }}>·</span>
                                    <span style={{ animation: 'ctpulse 2.6s ease-in-out infinite 0.3s' }}>·</span>
                                </div>
                            </div>
                            <div style={{ flex: 1, borderBottom: '1px solid rgba(0,0,0,0.08)', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }} className="lg:p-8 lg:gap-8">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(0,0,0,0.15)">
                                    <path d="M 1.333 0 L 13.333 0 L 14.667 0 L 14.667 1.333 L 14.667 8 L 13.333 8 L 5.333 8 L 4 8 L 4 6.667 L 4 5.333 L 4 4 L 5.333 4 L 12 4 L 12 5.333 L 5.333 5.333 L 5.333 6.667 L 13.333 6.667 L 13.333 1.333 L 1.333 1.333 L 1.333 9.333 L 13.333 9.333 L 13.333 10.667 L 1.333 10.667 L 0 10.667 L 0 9.333 L 0 1.333 L 0 0 L 1.333 0 Z" fillRule="evenodd" />
                                </svg>
                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: '#000', margin: 0 }}>
                                    {item.text}
                                </p>
                            </div>
                            <div style={{ height: 72, padding: '0 24px 0 44px', display: 'flex', alignItems: 'center', position: 'relative' }} className="lg:h-20 lg:pl-[52px] lg:pr-8">
                                <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', width: 8, height: 8, borderRadius: '50%', background: 'var(--lime)' }} />
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 500, lineHeight: '21px', letterSpacing: '-0.245px', color: '#000', margin: 0 }}>{item.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
