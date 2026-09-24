import Section from './ui/Section';

const reasons = [
    { title: 'Jesteśmy w biznesie, nie tylko obok niego', text: 'Każda decyzja projektowa jest dla nas decyzją biznesową, nie estetyczną.' },
    { title: 'Ludzka decyzja + tempo AI', text: 'Doświadczenie biznesowe i wdrożenia przyspieszone przez AI — bez utraty jakości.' },
    { title: 'Kompleksowa obsługa', text: 'Strony, sklepy, marketing automation i social media pod jednym dachem.' },
    { title: 'Open source, sprawdzone technologie', text: 'Medusa.js, Next.js, React. Zero vendor lock-in, pełna kontrola nad kodem.' },
];

export default function WhyUsSection() {
    return (
        <Section
            tint
            eyebrow="Dlaczego Creativetrust"
            title="Nie jesteśmy agencją od ładnych rzeczy. Jesteśmy partnerem, który wdraża szybko."
        >
            <div className="ct-grid-lines" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {reasons.map((reason, i) => (
                    <div key={reason.title} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                        <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{reason.title}</h3>
                        <p className="ct-body">{reason.text}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
