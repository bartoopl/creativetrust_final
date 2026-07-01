import NotchedButton from './ui/NotchedButton';

const lanes = [
    {
        label: 'Strony www',
        kicker: 'Projektowanie i wdrożenie z myślą o wynikach',
        title: 'Strony, które pracują na Twój biznes',
        text: 'Nie robimy stron dla samego robienia stron. Każdy projekt zaczynamy od zrozumienia Twojego biznesu - a kończymy na wdrożeniu, które generuje wyniki.',
        items: [
            'Strony wizytówkowe i landing page',
            'Rozbudowane platformy contentowe',
            'Redesign i migracje',
            'UX i optymalizacja konwersji',
        ],
        button: 'Strony www',
        href: '/uslugi/strony-www',
        image: '/design-handoff-v7/f8a02b73f518f6ea.jpg',
    },
    {
        label: 'Ecommerce',
        kicker: 'Headless ecommerce bez kompromisów',
        title: 'Sklep, który skaluje razem z Twoim biznesem',
        text: 'Medusa.js daje Ci pełną kontrolę nad kodem, danymi i UX - bez comiesięcznych opłat za platformę i bez ograniczeń, gdy chcesz rosnąć.',
        items: [
            'Sklepy headless na Medusa.js',
            'Integracje z ERP, CRM, WMS',
            'E-commerce management',
            'Migracje z Shopify, WooCommerce',
        ],
        button: 'Ecommerce headless',
        href: '/uslugi/e-commerce',
        image: '/design-handoff-v3/tech-ecommerce.svg',
    },
    {
        label: 'Marketing automation',
        kicker: 'Procesy, które pracują za Ciebie',
        title: 'Automatyzacja, która przekłada się na sprzedaż',
        text: 'Konfigurujemy automatyzacje, które oszczędzają czas i zwiększają przychody - od welcome sequence po zaawansowany lead scoring i wielokanałowe kampanie.',
        items: [
            'Wdrożenie narzędzi automatyzacji',
            'Budowa sekwencji i scenariuszy',
            'Segmentacja i personalizacja',
            'Raportowanie i optymalizacja',
        ],
        button: 'Marketing automation',
        href: '/uslugi/marketing-automation',
        image: '/design-handoff-v3/tech-automation.svg',
    },
    {
        label: 'Social media',
        kicker: 'Content z głową, nie dla samego contentu',
        title: 'Social media, które buduje markę i sprzedaje',
        text: 'Nie robimy postów dla postów. Każdy content jest podporządkowany strategii i mierzalnym celom biznesowym - zasięg, konwersja, lojalność.',
        items: [
            'Strategia i harmonogram contentowy',
            'Tworzenie treści - tekst, grafika, video',
            'Community management',
            'Reklamy w social media',
        ],
        button: 'Social media',
        href: '/uslugi/social-media',
        image: '/design-handoff-v3/tech-social.svg',
    },
];

function Bullet() {
    return (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="var(--lime)">
            <rect width="8" height="8" />
        </svg>
    );
}

export default function ProcessSection() {
    return (
        <section style={{ background: '#fff', padding: '72px 16px 0' }} className="lg:px-[72px] lg:pt-[120px]">
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(28px, 4vw, 43.1px)', fontWeight: 500, lineHeight: '1.15', letterSpacing: '-1.76px', color: '#000', margin: '0 0 40px' }} className="lg:mb-20">
                    Wybierz, od czego chcesz<br />
                    zacząć. My ogarniemy resztę.
                </h2>

                <div className="flex items-start gap-8">
                    <div className="sticky top-24 hidden w-[224px] flex-none flex-col gap-1 lg:flex">
                        {lanes.map((lane, index) => (
                            <div key={lane.label} style={{ padding: '12px 0 12px 12px', fontSize: 12.2, fontWeight: 500, color: index === 0 ? '#000' : 'rgba(0,0,0,0.4)', letterSpacing: '-0.36px', lineHeight: '20px', borderLeft: index === 0 ? '2px solid var(--lime)' : '2px solid transparent' }}>
                                {lane.label}
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 flex flex-col gap-16 pb-16 lg:gap-20 lg:pb-24">
                        {lanes.map((lane, index) => (
                            <div key={lane.label} className="flex flex-col gap-8 lg:flex-row lg:gap-[120px]">
                                <div className="flex w-full flex-none flex-col gap-6 lg:w-[416px] lg:gap-10">
                                    <div className="flex flex-col gap-2">
                                        <span style={{ fontSize: 12.2, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '-0.36px', lineHeight: '20px' }}>
                                            {lane.kicker}
                                        </span>
                                        <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 35.6, fontWeight: 500, lineHeight: '39.6px', letterSpacing: '-1.44px', color: '#000', margin: 0 }}>
                                            {lane.title}
                                        </h3>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                        <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                                            {lane.text}
                                        </p>

                                        {index === 0 && (
                                            <div style={{ borderLeft: '2px solid var(--lime)', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: '#000', margin: 0 }}>
                                                    Firmy z dobrze zaprojektowanym UX konwertują nawet 3× lepiej.
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.28px', color: 'rgba(0,0,0,0.4)' }}>
                                                        Forrester Research / UX ROI Study
                                                    </span>
                                                    <svg width="11" height="11" viewBox="0 0 10.667 10.667" fill="rgb(0,0,0)">
                                                        <path d="M 9.333 0 L 9.333 10.667 L 10.667 10.667 L 10.667 0 L 9.333 0 Z M 0 4.667 L 0 6 L 5.333 6 L 5.333 7.333 L 4 7.333 L 4 8.667 L 5.333 8.667 L 5.333 7.333 L 6.667 7.333 L 6.667 6 L 8 6 L 8 4.667 L 6.667 4.667 L 6.667 3.333 L 5.333 3.333 L 5.333 2 L 4 2 L 4 3.333 L 5.333 3.333 L 5.333 4.667 L 0 4.667 Z" fillRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(0,0,0,0.08)', borderRight: '1px solid rgba(0,0,0,0.08)', borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
                                        {lane.items.map((item) => (
                                            <div key={item} style={{ minHeight: 62, borderBottom: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 20, padding: '12px 16px' }} className="lg:h-[62px] lg:py-0">
                                                <Bullet />
                                                <span style={{ fontSize: 13, fontWeight: 500, color: '#000', letterSpacing: '-0.245px', lineHeight: '21px' }}>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <NotchedButton href={lane.href} variant="primary-light" className="self-start">
                                        {lane.button}
                                    </NotchedButton>
                                </div>

                                <div className="flex-1 overflow-hidden rounded-[4px] bg-[rgba(0,0,0,0.04)] min-h-[220px] lg:min-h-[400px]">
                                    {lane.image ? (
                                        <img src={lane.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.2)', fontFamily: 'monospace', fontSize: 12 }}>
                                            zdjęcie / screenshoty projektu
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
