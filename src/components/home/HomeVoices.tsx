import { testimonials } from '../TestimonialSection';

/** Client quotes on flat Tile Gray cards. */
export default function HomeVoices() {
    return (
        <section className="ct-section" aria-labelledby="home-voices-title">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Klienci</span>
                    <h2 id="home-voices-title" className="ct-h2 ct-statement">Mówią wprost. Tak jak my.</h2>
                </div>
                <ul className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {testimonials.map((t) => (
                        <li key={t.name} className="ct-tile">
                            <figure className="m-0 flex h-full flex-col justify-between gap-8" style={{ padding: 24 }}>
                                <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: 'var(--text)' }}>„{t.text}”</blockquote>
                                <figcaption className="ct-mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>— {t.name}</figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
