import { reasons } from '../WhyUsSection';

/** Why-us as a bento: Graphite feature cards punctuate the pale page, Tile Gray cards fill the rest. */
export default function HomeWhyUs() {
    return (
        <section className="ct-section">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Dlaczego CreativeTrust</span>
                    <h2 className="ct-h2 ct-statement">Nie agencja od ładnych rzeczy. <span className="ct-electric">Partner</span>, który wdraża szybko.</h2>
                </div>
                <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-5" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {reasons.map((reason, i) => {
                        const dark = i === 0 || i === 3;
                        return (
                            <li
                                key={reason.title}
                                className={`${dark ? 'ct-bento' : 'ct-tile'} flex flex-col justify-between gap-10 ${i === 0 || i === 3 ? 'md:col-span-3' : 'md:col-span-2'}`}
                                style={{ padding: 'clamp(24px, 3vw, 36px)', minHeight: 240 }}
                            >
                                <span className="ct-mono" style={{ fontSize: 13, color: dark ? '#9a9a9a' : 'var(--muted-2)' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="flex flex-col gap-3">
                                    <h3 style={{ margin: 0, fontSize: 'clamp(22px, 2.2vw, 26px)', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.02em' }}>{reason.title}</h3>
                                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: dark ? '#b5b5b5' : 'var(--muted)', maxWidth: '44ch' }}>{reason.text}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
