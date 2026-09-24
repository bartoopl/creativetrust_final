import Eyebrow from './ui/Eyebrow';

const testimonials = [
    { name: 'Anna', text: 'Creativetrust nie robi tylko tego, co jest na briefie. Aktywnie sugerują co zmienić, żeby osiągnąć lepsze wyniki.' },
    { name: 'Marcin', text: 'Nasz sklep na Medusa.js działa szybciej, wygląda lepiej i kosztuje nas mniej miesięcznie niż poprzednia platforma.' },
    { name: 'Karolina', text: 'Automatyzacja marketingu, którą wdrożyli, zmniejszyła nasz czas obsługi leadów o połowę.' },
    { name: 'Tomasz', text: 'Szczerość i bezpośredniość — wiedzą, co mówią, i mówią to wprost.' },
];

export default function TestimonialSection() {
    return (
        <section className="ct-section" style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)' }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
                <Eyebrow>Klienci</Eyebrow>
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}>
                    {testimonials.map((t) => (
                        <figure key={t.name} className="m-0 flex flex-col gap-4" style={{ background: '#fff', border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, padding: 24 }}>
                            <blockquote style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text)' }}>„{t.text}”</blockquote>
                            <figcaption className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>— {t.name}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
