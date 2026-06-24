const clients = ['NORDIC', 'Volta', 'FORMA', 'kasa.io', 'Monnari', 'Quiosque', '51015kids', 'EB-GABINET', 'Dr Pazera', 'PARK', 'Wave'];

export default function ClientLogos() {
    const doubled = [...clients, ...clients];

    return (
        <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '18px 0', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto 12px', padding: '0 32px', fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }} className="px-4 sm:px-6 lg:px-8">
                Used by teams like
            </div>
            <div style={{ display: 'flex', width: 'max-content', animation: 'ctmarquee 32s linear infinite', willChange: 'transform' }}>
                {doubled.map((name, i) => (
                    <span
                        key={i}
                        style={{
                            display: 'inline-block',
                            marginRight: 56,
                            fontFamily: i % 3 === 1 ? 'var(--font-mono), monospace' : 'var(--font-space), sans-serif',
                            fontWeight: i % 4 === 0 ? 700 : i % 4 === 1 ? 500 : 600,
                            fontSize: i % 3 === 1 ? 15 : 17,
                            color: 'var(--muted)',
                            opacity: 0.72,
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
