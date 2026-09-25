const stats = [
    { value: '50+', label: 'Zrealizowanych projektów' },
    { value: '3×', label: 'Szybciej z AI w procesie' },
    { value: '100%', label: 'Projektów z mierzalnym celem' },
];

export default function StatsSection() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-3" aria-label="CreativeTrust w liczbach">
            {stats.map((stat, i) => (
                <div
                    key={stat.label}
                    className={`flex flex-col gap-1.5 ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''}`}
                    style={{ padding: '40px clamp(16px, 4vw, 48px)', borderColor: 'var(--line)' }}
                >
                    <span style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 600, letterSpacing: '-0.023em', color: 'var(--text)', lineHeight: 1.1 }}>
                        {stat.value}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{stat.label}</span>
                </div>
            ))}
        </section>
    );
}
