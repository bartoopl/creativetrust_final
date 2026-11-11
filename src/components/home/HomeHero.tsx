import Link from 'next/link';
import NotchedButton from '../ui/NotchedButton';
import type { Locale } from '@/lib/i18n';
import {
    AUDIT_FORM_HREF,
    AUDIT_FORM_HREF_EN,
    MANAGEMENT_HREF,
    MANAGEMENT_HREF_EN,
    experience,
    experienceEn,
} from '@/lib/experience';

const copy = {
    pl: {
        eyebrow: 'Audyt, zarządzanie i budowa e-commerce',
        title: ['Prowadzimy e‑commerce marek, które chcą rosnąć ', 'z zyskiem.'],
        lead: 'Audytujemy sklepy i prowadzimy e-commerce z zewnątrz. Projektujemy też i budujemy sklepy oraz strony internetowe — tak, jak sami chcielibyśmy nimi zarządzać.',
        audit: { href: AUDIT_FORM_HREF, label: 'Zamów audyt e-commerce' },
        management: { href: MANAGEMENT_HREF, label: 'Jak zarządzamy e-commerce' },
        buildsLead: 'Budujemy też:',
        stores: { href: '/uslugi/e-commerce', label: 'sklepy internetowe →' },
        websites: { href: '/uslugi/strony-www', label: 'strony internetowe →' },
        experienceLabel: 'Doświadczenie, na którym opieramy pracę',
        experience,
    },
    en: {
        eyebrow: 'E-commerce audits, management and builds',
        title: ['We run e‑commerce for brands that want to grow ', 'profitably.'],
        lead: 'We audit online stores and manage e-commerce from the outside. We also design and build online stores and websites — the way we would want to manage them ourselves.',
        audit: { href: AUDIT_FORM_HREF_EN, label: 'Order an e-commerce audit' },
        management: { href: MANAGEMENT_HREF_EN, label: 'How we manage e-commerce' },
        buildsLead: 'We also build:',
        stores: { href: '/en/services/e-commerce', label: 'online stores →' },
        websites: { href: '/en/services/websites', label: 'websites →' },
        experienceLabel: 'The experience our work rests on',
        experience: experienceEn,
    },
};

/** Homepage hero: what we do, the first step, and the experience it rests on. */
export default function HomeHero({ locale }: { locale: Locale }) {
    const t = copy[locale];
    return (
        <section className="ct-home-hero" aria-labelledby="home-hero-title">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 text-center">
                <p className="ct-eyebrow" style={{ margin: 0 }}>{t.eyebrow}</p>
                <h1 id="home-hero-title" className="ct-h1 ct-home-hero-title">
                    {t.title[0]}<span className="ct-electric">{t.title[1]}</span>
                </h1>
                <p className="ct-lead" style={{ maxWidth: '56ch' }}>{t.lead}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <NotchedButton href={t.audit.href}>{t.audit.label}</NotchedButton>
                    <NotchedButton href={t.management.href} variant="ghost">{t.management.label}</NotchedButton>
                </div>
                <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)' }}>
                    {t.buildsLead}{' '}
                    <Link href={t.stores.href} className="ct-home-hero-link">{t.stores.label}</Link>{' '}
                    <Link href={t.websites.href} className="ct-home-hero-link">{t.websites.label}</Link>
                </p>

                <div className="mt-10 flex w-full flex-col gap-4">
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-2)' }}>{t.experienceLabel}</p>
                    <ul className="grid w-full grid-cols-1 gap-1 text-left md:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {t.experience.map((item) => (
                            <li key={item.brand} className="ct-tile flex flex-col gap-6" style={{ padding: 'clamp(20px, 2.4vw, 28px)' }}>
                                <span style={{ fontSize: 13, color: 'var(--muted-2)' }}>{item.role}</span>
                                <div className="flex flex-col gap-2">
                                    <span style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text)' }}>{item.brand}</span>
                                    <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{item.text}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
