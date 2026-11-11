import NotchedButton from './ui/NotchedButton';
import type { Locale } from '@/lib/i18n';

const defaults = {
    pl: {
        eyebrow: 'Pierwszy krok',
        title: 'Zacznij od rozmowy o swoim e-commerce.',
        description: '15 minut wystarczy, żeby sprawdzić, czy audyt albo zarządzanie e-commerce z zewnątrz ma w Twoim przypadku sens.',
        cta: { label: 'Umów rozmowę', href: '/kontakt' },
    },
    en: {
        eyebrow: 'The first step',
        title: 'Start with a conversation about your e-commerce.',
        description: '15 minutes is enough to check whether an audit or outsourced e-commerce management makes sense in your case.',
        cta: { label: 'Book a call', href: '/en/contact' },
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
