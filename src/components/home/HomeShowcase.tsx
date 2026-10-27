import NotchedButton from '../ui/NotchedButton';
import Scene3D from '../scene3d/Scene3D';
import { pipeline } from '../Hero';

/** Centered statement + action pair, resolved by a broad product-workspace frame of how a project runs. */
export default function HomeShowcase() {
    return (
        <section className="ct-section" style={{ paddingTop: 'var(--pad-y-xl)' }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 text-center">
                <span className="ct-eyebrow">AI-native partner produktowy</span>
                <h2 className="ct-h2 ct-statement">
                    AI skraca research i produkcję. <span className="ct-electric">Zespół</span> pilnuje decyzji, jakości i wyniku.
                </h2>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <NotchedButton href="/kontakt">Umów konsultację</NotchedButton>
                    <NotchedButton href="#uslugi" variant="ghost">Zobacz usługi</NotchedButton>
                </div>

                <div className="ct-frame mt-10 w-full text-left" aria-label="Przykładowy przebieg wdrożenia">
                    <div className="flex items-center justify-between gap-4" style={{ padding: '10px 16px', borderBottom: '1px solid var(--line)' }}>
                        <span className="ct-mono" style={{ fontSize: 12, color: 'var(--muted)' }}>creativetrust / wdrożenie</span>
                        <span className="ct-mono" style={{ fontSize: 12, color: 'var(--accent)' }}>● AI w procesie</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                        <ol className="flex flex-col" style={{ listStyle: 'none', margin: 0, padding: 8 }}>
                            {pipeline.map((step) => (
                                <li key={step.num} data-scene-target={step.module} className="ct-v2-step grid grid-cols-[40px_1fr_auto] items-baseline gap-3">
                                    <span className="ct-mono" style={{ fontSize: 13, color: 'var(--accent)' }}>{step.num}</span>
                                    <span className="flex flex-col gap-1">
                                        <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text)' }}>{step.title}</span>
                                        <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{step.text}</span>
                                    </span>
                                    <span className="ct-mono" style={{ fontSize: 12, color: 'var(--muted-2)' }}>{step.status}</span>
                                </li>
                            ))}
                        </ol>
                        <div className="hidden border-l lg:block" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
                            <Scene3D id="hero-pipeline" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
