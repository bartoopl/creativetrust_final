const clients = [
    'Monnari',
    'Quisque',
    '5.10.15',
    'Kliniki Ziemlewski',
    'Katarzyna Batkowska',
    'Sulphur Busko Zdrój',
    'ZIPH',
    'Selfia',
    'Kaskat',
];

const line = clients.map((c) => c.toUpperCase()).join('  ·  ');

export default function ClientLogos() {
    return (
        <section
            aria-label="Nasi klienci"
            className="ct-marquee overflow-hidden"
            style={{ padding: '40px var(--pad-x)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
        >
            <div className="ct-marquee-track">
                {[0, 1].map((i) => (
                    <span
                        key={i}
                        aria-hidden={i > 0}
                        className="ct-mono"
                        style={{ fontWeight: 600, fontSize: 15, color: 'rgba(17,24,39,0.35)', whiteSpace: 'pre' }}
                    >
                        {line}
                    </span>
                ))}
            </div>
        </section>
    );
}
