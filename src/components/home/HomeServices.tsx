import Link from 'next/link';
import { BUILD_SERVICE_SLUGS, LEAD_SERVICE_SLUGS, servicesFor, type Service } from '@/lib/site-services';
import type { Locale } from '@/lib/i18n';
import { homeCopy } from './home-copy';

type TileCopy = { lead: string; points: string[]; cta: string };

/** Tile copy for the four main offers: audit, management, stores, websites. */
const tiles: Record<Locale, { lead: string; build: string; supportingLabel: string; copy: Record<string, TileCopy> }> = {
    pl: {
        lead: 'Audyt i zarządzanie',
        build: 'Projektujemy i budujemy',
        supportingLabel: 'Pozostałe usługi',
        copy: {
            'audyt-e-commerce': {
                lead: 'Sprawdzamy sprzedaż, marżę, technologię i pracę zespołu. Dostajesz raport i roadmapę z priorytetami — do wdrożenia z nami albo samodzielnie.',
                points: ['5–7 dni roboczych', 'Stała kwota, znana z góry', '2 godziny Twojego zespołu'],
                cta: 'Zobacz zakres audytu',
            },
            'zarzadzanie-e-commerce': {
                lead: 'Przejmujemy rolę e-commerce managera lub wzmacniamy Twój zespół: plan sprzedaży, marża, dostawcy, priorytety i raportowanie wyników.',
                points: ['Miesięczny abonament', 'Start od audytu', 'Jeden odpowiedzialny zespół'],
                cta: 'Zobacz, jak to działa',
            },
            'e-commerce': {
                lead: 'Projektujemy i budujemy sklepy: headless, WooCommerce, Shopify, migracje platform i integracje z ERP. Pod sprzedaż, marżę i wygodę zespołu.',
                points: ['Medusa.js, Next.js', 'Migracje bez utraty SEO', 'Integracje ERP i marketplace'],
                cta: 'Zobacz sklepy internetowe',
            },
            'strony-www': {
                lead: 'Strony firmowe, landing pages i portale z konkretną rolą w sprzedaży. Szybkie, gotowe pod SEO i łatwe w edycji.',
                points: ['Next.js i headless CMS', 'PageSpeed powyżej 90', 'Landing page od 3 500 zł netto'],
                cta: 'Zobacz strony internetowe',
            },
        },
    },
    en: {
        lead: 'Audit and management',
        build: 'We design and build',
        supportingLabel: 'Other services',
        copy: {
            'audyt-e-commerce': {
                lead: 'We review sales, margin, technology and how your team works. You get a report and a prioritised roadmap — to deliver with us or on your own.',
                points: ['5–7 working days', 'A fixed fee, agreed upfront', '2 hours of your team’s time'],
                cta: 'See the audit scope',
            },
            'zarzadzanie-e-commerce': {
                lead: 'We take on the e-commerce manager role or strengthen your team: sales plan, margin, suppliers, priorities and performance reporting.',
                points: ['Monthly retainer', 'Starts with an audit', 'One accountable team'],
                cta: 'See how it works',
            },
            'e-commerce': {
                lead: 'We design and build stores: headless, WooCommerce, Shopify, platform migrations and ERP integrations. Built for sales, margin and an easy life for your team.',
                points: ['Medusa.js, Next.js', 'Migrations without losing SEO', 'ERP and marketplace integrations'],
                cta: 'See online stores',
            },
            'strony-www': {
                lead: 'Company websites, landing pages and portals with a clear job in your sales. Fast, SEO-ready and easy to edit.',
                points: ['Next.js and headless CMS', 'PageSpeed above 90', 'Landing page from PLN 3,500 net'],
                cta: 'See websites',
            },
        },
    },
};

function Tile({ service, label, copy }: { service: Service | undefined; label: string; copy: Record<string, TileCopy> }) {
    const text = service && copy[service.slug];
    if (!service || !text) return null;
    return (
        <li className="ct-tile flex flex-col gap-6" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
            <span className="ct-mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>{label}</span>
            <div className="flex flex-col gap-3">
                <h3 style={{ margin: 0, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{service.title}</h3>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: 'var(--text)', maxWidth: '46ch' }}>{text.lead}</p>
            </div>
            <ul className="flex flex-wrap gap-1" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {text.points.map((point) => (
                    <li key={point} style={{ fontSize: 13, padding: '4px 10px', borderRadius: 200, background: 'var(--bg)', color: 'var(--muted)' }}>{point}</li>
                ))}
            </ul>
            <div className="mt-auto pt-2">
                <Link href={service.href} className="ct-ghost">{text.cta}</Link>
            </div>
        </li>
    );
}

/** Four equal tiles — audit, management, stores, websites — then the supporting services as a row of links. */
export default function HomeServices({ locale }: { locale: Locale }) {
    const t = homeCopy[locale].services;
    const labels = tiles[locale];
    const services = servicesFor(locale);
    const find = (slug: string) => services.find((s) => s.slug === slug);
    const supporting = services.filter((s) => !LEAD_SERVICE_SLUGS.includes(s.slug) && !BUILD_SERVICE_SLUGS.includes(s.slug));
    return (
        <section id="uslugi" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">{t.eyebrow}</span>
                    <h2 className="ct-h2 ct-statement">{t.title[0]}<span className="ct-electric">{t.title[1]}</span>{t.title[2]}</h2>
                </div>

                <div className="flex w-full flex-col gap-1">
                    <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {LEAD_SERVICE_SLUGS.map((slug, i) => <Tile key={slug} service={find(slug)} copy={labels.copy} label={`0${i + 1} · ${labels.lead}`} />)}
                        {BUILD_SERVICE_SLUGS.map((slug, i) => <Tile key={slug} service={find(slug)} copy={labels.copy} label={`0${i + 3} · ${labels.build}`} />)}
                    </ul>

                    <ul className="ct-tile grid grid-cols-1 gap-x-8 sm:grid-cols-2" aria-label={labels.supportingLabel} style={{ listStyle: 'none', margin: 0, padding: 'clamp(12px, 2vw, 20px) clamp(24px, 3vw, 40px)' }}>
                        {supporting.map((service) => (
                            <li key={service.slug} className="flex flex-col gap-1" style={{ padding: '16px 0' }}>
                                <Link href={service.href} className="ct-v2-service-link" style={{ fontSize: 18 }}>{service.title} <span aria-hidden="true">→</span></Link>
                                <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{service.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
