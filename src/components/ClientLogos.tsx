const clients = [
    'Monnari',
    'Quisque',
    '5.10.15',
    'Kliniki Ziemlewski',
    'Katarzyna Batkowska',
    'Sulphur Busko Zdrój',
    'Zachodnia Izba Przemysłowo-Handlowa',
    'Selfia',
    'Kaskat',
];

export default function ClientLogos() {
    const rows = [clients, clients];

    return (
        <section style={{ background: 'rgba(0,0,0,0.8)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', height: 56, overflow: 'hidden', display: 'flex', alignItems: 'center' }} className="lg:!h-[72px]">
            <div style={{ display: 'flex', animation: 'ctmarquee 28s linear infinite', whiteSpace: 'nowrap' }}>
                {rows.map((row, i) => (
                    <div key={i} aria-hidden={i > 0} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px' }} className="lg:gap-4 lg:px-8">
                        {row.map((name, index) => (
                            <span key={name} style={{ display: 'inline-flex', alignItems: 'center', flex: '0 0 auto', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em' }}>
                                {name}
                                {index < row.length - 1 && <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.28)' }}>·</span>}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
