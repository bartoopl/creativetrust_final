const clients = ['NORDIC', 'Volta', 'FORMA', 'kasa.io', 'Monnari', 'Quiosque', '51015kids', 'EB-GABINET', 'Dr Pazera', 'PARK', 'Wave'];

export default function ClientLogos() {
    const doubled = [...clients, ...clients];

    return (
        <section style={{ height: 64, overflow: 'hidden', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="lg:!h-[72px]">
            <div style={{ display: 'flex', width: 'max-content', height: '100%', alignItems: 'center', animation: 'ctmarquee 28s linear infinite', willChange: 'transform' }}>
                {doubled.map((name, i) => (
                    <span
                        key={i}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginRight: 56,
                            fontFamily: 'var(--font-space), sans-serif',
                            fontWeight: 500,
                            fontSize: 13,
                            letterSpacing: '-0.245px',
                            lineHeight: '21px',
                            color: 'rgba(255,255,255,0.6)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {name}
                    </span>
                ))}
            </div>
        </section>
    );
}
