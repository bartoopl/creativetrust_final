import NotchedButton from './ui/NotchedButton';

interface CTASectionProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: { label: string; href: string };
}

export default function CTASection({
    eyebrow = 'Łączymy myślenie biznesowe z prędkością AI',
    title = 'Zacznij budować digitalnie.',
    description = 'Senior specjaliści i narzędzia AI — realizujemy projekty szybciej bez obniżania poprzeczki.',
    cta = { label: 'Umów bezpłatną konsultację', href: '/kontakt' },
}: CTASectionProps) {
    return (
        <section id="kontakt" style={{ padding: 'var(--pad-y-xl) var(--pad-x)', textAlign: 'center', borderTop: '1px solid var(--line)' }}>
            <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5" style={{ padding: 'clamp(40px, 6vw, 56px) clamp(20px, 5vw, 40px)' }}>
                <span className="ct-eyebrow">{eyebrow}</span>
                <h2 className="ct-h2 ct-statement" style={{ margin: 0 }}>
                    {title}
                </h2>
                <p className="ct-body" style={{ fontSize: 15 }}>{description}</p>
                <div style={{ marginTop: 8 }}>
                    <NotchedButton href={cta.href}>{cta.label}</NotchedButton>
                </div>
            </div>
        </section>
    );
}
