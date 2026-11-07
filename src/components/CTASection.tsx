import NotchedButton from './ui/NotchedButton';
import type { Locale } from '@/lib/i18n';

const defaults = {
    pl: {
        eyebrow: 'Łączymy myślenie biznesowe z prędkością AI',
        title: 'Zacznij budować digitalnie.',
        description: 'Senior specjaliści i narzędzia AI — realizujemy projekty szybciej bez obniżania poprzeczki.',
        cta: { label: 'Umów bezpłatną konsultację', href: '/kontakt' },
    },
    en: {
        eyebrow: 'Business thinking at the speed of AI',
        title: 'Start building digitally.',
        description: 'Senior specialists and AI tools — we deliver projects faster without lowering the bar.',
        cta: { label: 'Book a free consultation', href: '/en/contact' },
    },
};

interface CTASectionProps {
    locale?: Locale;
    eyebrow?: string;
    title?: string;
    description?: string;
    cta?: { label: string; href: string };
}

export default function CTASection({
    locale = 'pl',
    eyebrow = defaults[locale].eyebrow,
    title = defaults[locale].title,
    description = defaults[locale].description,
    cta = defaults[locale].cta,
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
