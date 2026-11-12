import Link from 'next/link';
import Wordmark from './ui/Wordmark';
import TrustpilotReviewCollector from './TrustpilotReviewCollector';
import { LEGAL_NAME, POSTAL_CITY, STREET_ADDRESS, TAX_ID } from '@/lib/schema';
import type { Locale } from '@/lib/i18n';

type FooterLink = { href: string; label: string; hrefLang?: string };

const copy: Record<Locale, {
    home: string; homeLabel: string; lead: string; servicesTitle: string; companyTitle: string;
    services: FooterLink[]; company: FooterLink[]; rights: string; taxId: string;
    privacy: FooterLink; terms: FooterLink;
}> = {
    pl: {
        home: '/',
        homeLabel: 'CreativeTrust — strona główna',
        lead: 'Audytujemy i prowadzimy e-commerce z zewnątrz. Projektujemy i budujemy sklepy oraz strony internetowe.',
        servicesTitle: 'Usługi',
        companyTitle: 'Firma',
        services: [
            { href: '/uslugi/audyt-e-commerce', label: 'Audyt e-commerce' },
            { href: '/uslugi/zarzadzanie-e-commerce', label: 'Zarządzanie e-commerce' },
            { href: '/uslugi/e-commerce', label: 'Sklepy internetowe' },
            { href: '/uslugi/strony-www', label: 'Strony internetowe' },
            { href: '/uslugi/marketing-automation', label: 'Marketing automation' },
            { href: '/uslugi/social-media', label: 'Social media' },
        ],
        company: [
            { href: '/o-nas', label: 'O nas' },
            { href: '/portfolio', label: 'Case studies' },
            { href: '/blog', label: 'Blog' },
            { href: '/baza-wiedzy', label: 'Baza wiedzy' },
            { href: '/kontakt', label: 'Kontakt' },
        ],
        rights: 'Wszelkie prawa zastrzeżone.',
        taxId: 'NIP',
        privacy: { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
        terms: { href: '/regulamin', label: 'Regulamin' },
    },
    en: {
        home: '/en',
        homeLabel: 'CreativeTrust — home',
        lead: 'We audit and manage e-commerce from the outside. We also design and build online stores and websites.',
        servicesTitle: 'Services',
        companyTitle: 'Company',
        services: [
            { href: '/en/services/e-commerce-audit', label: 'E-commerce audit' },
            { href: '/en/services/e-commerce-management', label: 'E-commerce management' },
            { href: '/en/services/e-commerce', label: 'Online stores' },
            { href: '/en/services/websites', label: 'Websites' },
            { href: '/en/services/marketing-automation', label: 'Marketing automation' },
            { href: '/en/services/social-media', label: 'Social media' },
        ],
        company: [
            { href: '/en/about', label: 'About' },
            { href: '/en/portfolio', label: 'Case studies' },
            { href: '/blog', label: 'Blog (PL)', hrefLang: 'pl' },
            { href: '/baza-wiedzy', label: 'Knowledge base (PL)', hrefLang: 'pl' },
            { href: '/en/contact', label: 'Contact' },
        ],
        rights: 'All rights reserved.',
        taxId: 'VAT ID PL',
        privacy: { href: '/en/privacy-policy', label: 'Privacy policy' },
        terms: { href: '/en/terms', label: 'Terms' },
    },
};

function FooterColumn({ title, items }: { title: string; items: FooterLink[] }) {
    return (
        <div className="flex flex-col gap-2.5">
            <span className="ct-meta">{title}</span>
            {items.map((item) => (
                <Link key={item.href + item.label} href={item.href} hrefLang={item.hrefLang} className="ct-nav-link ct-footer-link" style={{ fontWeight: 400 }}>
                    {item.label}
                </Link>
            ))}
        </div>
    );
}

export default function Footer({ locale }: { locale: Locale }) {
    const t = copy[locale];
    const year = new Date().getFullYear();

    return (
        <footer className="ct-footer" style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)', padding: '56px var(--pad-x) 32px' }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
                <div className="flex flex-wrap justify-between gap-10">
                    <div className="flex flex-col gap-3" style={{ maxWidth: 320 }}>
                        <Link href={t.home} aria-label={t.homeLabel}><Wordmark /></Link>
                        <p className="ct-body ct-footer-lead" style={{ fontSize: 13 }}>
                            {t.lead}
                        </p>
                        <TrustpilotReviewCollector locale={locale} />
                    </div>
                    <div className="flex flex-wrap gap-16">
                        <FooterColumn title={t.servicesTitle} items={t.services} />
                        <FooterColumn title={t.companyTitle} items={t.company} />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between gap-3" style={{ paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
                        © {year} CreativeTrust. {t.rights}
                        <br />
                        {LEGAL_NAME}, {STREET_ADDRESS}, {POSTAL_CITY}{TAX_ID ? `, ${t.taxId} ${TAX_ID}` : ''}
                    </p>
                    <div className="flex gap-5">
                        <Link href={t.privacy.href} className="ct-contact-link" style={{ fontSize: 12, color: 'var(--muted)' }}>{t.privacy.label}</Link>
                        <Link href={t.terms.href} className="ct-contact-link" style={{ fontSize: 12, color: 'var(--muted)' }}>{t.terms.label}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
