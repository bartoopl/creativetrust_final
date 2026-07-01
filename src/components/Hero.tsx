import HeroCanvas from './HeroCanvas';
import NotchedButton from './ui/NotchedButton';

const signals = [
    'Strony www',
    'Ecommerce headless',
    'Marketing automation',
];

export default function Hero() {
    return (
        <section
            className="relative overflow-hidden border-b border-[rgba(255,255,255,0.08)]"
            style={{
                background: '#000000',
            } as React.CSSProperties}
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_60%_50%,rgba(20,20,20,0.6)_0%,rgba(0,0,0,1)_70%)]"
            />

            <div className="relative mx-auto grid min-h-[640px] max-w-[1440px] grid-cols-1 lg:min-h-[900px] lg:grid-cols-[1fr_700px]">
                <div className="relative min-h-[560px] lg:min-h-[900px]">
                    <div className="absolute left-4 right-4 top-8 flex max-w-[620px] flex-col gap-6 sm:left-6 sm:right-6 lg:left-[72px] lg:top-auto lg:bottom-[120px] lg:gap-8">
                        <div className="flex flex-wrap items-center gap-2 text-[12px] font-medium leading-[18px] tracking-[-0.24px] text-[rgba(255,255,255,0.4)]">
                            {signals.map((signal, index) => (
                                <span key={signal} className="inline-flex items-center gap-2">
                                    <span>{signal}</span>
                                    {index < signals.length - 1 && <span aria-hidden="true">•</span>}
                                </span>
                            ))}
                        </div>

                        <h1
                            style={{
                                fontFamily: 'var(--font-space), sans-serif',
                                fontWeight: 500,
                                fontSize: 'clamp(38px, 4.2vw, 60.8px)',
                                lineHeight: '1.09',
                                letterSpacing: '-2.4px',
                                margin: 0,
                                maxWidth: '12ch',
                                color: '#ffffff',
                            }}
                        >
                            Projekty cyfrowe, które<br />działają biznesowo.
                        </h1>

                        <p style={{
                            fontSize: '17px',
                            lineHeight: '27px',
                            letterSpacing: '-0.36px',
                            color: 'rgba(255,255,255,0.6)',
                            maxWidth: '42ch',
                            margin: 0,
                        }}>
                            Projektujemy i wdrażamy systemy cyfrowe w jednym procesie. AI skraca research, produkcję i testy, a zespół pilnuje decyzji, jakości i wyniku.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                            <NotchedButton href="/kontakt" variant="primary-dark">
                                Umów konsultację
                            </NotchedButton>
                            <NotchedButton href="#uslugi" variant="ghost-dark">
                                Jak możemy pomóc
                            </NotchedButton>
                        </div>
                    </div>
                </div>

                <div className="relative hidden items-start justify-end lg:flex">
                    <div
                        style={{
                            width: 700,
                            height: 900,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <HeroCanvas />
                    </div>
                </div>
            </div>
        </section>
    );
}
