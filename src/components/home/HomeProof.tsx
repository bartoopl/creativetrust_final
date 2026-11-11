import { clients } from '../ClientLogos';
import { stats } from '../StatsSection';

/** The numbers as quiet display figures, then client names in a band of pale tiles. */
export default function HomeProof() {
    return (
        <section className="ct-section" aria-label="CreativeTrust w liczbach i klienci">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <dl className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3" style={{ margin: 0 }}>
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                            <dt className="order-2" style={{ fontSize: 15, color: 'var(--muted)', maxWidth: '24ch' }}>{stat.label}</dt>
                            <dd className="order-1" style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text)' }}>
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
                <div className="flex w-full flex-col items-center gap-6">
                    <span className="ct-eyebrow text-center">Zaufali nam m.in.</span>
                    <ul className="grid w-full grid-cols-2 gap-1 sm:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {clients.map((client) => (
                            <li key={client} className="ct-tile flex items-center justify-center text-center" style={{ minHeight: 88, padding: '4px 12px' }}>
                                <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--muted-2)' }}>{client}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
