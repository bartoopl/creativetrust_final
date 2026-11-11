import Link from 'next/link';
import { BUILD_SERVICE_SLUGS, LEAD_SERVICE_SLUGS, servicesFor, type Service } from '@/lib/site-services';
import type { Locale } from '@/lib/i18n';
import { homeCopy } from './home-copy';

/** Polish tile copy for the four main offers: audit, management, stores, websites. */
const tileCopy: Record<string, { lead: string; points: string[]; cta: string }> = {
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
};

function Tile({ service, label }: { service: Service | undefined; label: string }) {
    const text = service && tileCopy[service.slug];
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

/** Polish: four equal tiles — audit, management, stores, websites — then the supporting services as a row of links. */
function PolishServices({ services }: { services: Service[] }) {
    const find = (slug: string) => services.find((s) => s.slug === slug);
    const supporting = services.filter((s) => !LEAD_SERVICE_SLUGS.includes(s.slug) && !BUILD_SERVICE_SLUGS.includes(s.slug));
    return (
        <div className="flex w-full flex-col gap-1">
            <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {LEAD_SERVICE_SLUGS.map((slug, i) => <Tile key={slug} service={find(slug)} label={`0${i + 1} · Audyt i zarządzanie`} />)}
                {BUILD_SERVICE_SLUGS.map((slug, i) => <Tile key={slug} service={find(slug)} label={`0${i + 3} · Projektujemy i budujemy`} />)}
            </ul>

            <ul className="ct-tile grid grid-cols-1 gap-x-8 sm:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 'clamp(12px, 2vw, 20px) clamp(24px, 3vw, 40px)' }}>
                {supporting.map((service) => (
                    <li key={service.slug} className="flex flex-col gap-1" style={{ padding: '16px 0' }}>
                        <Link href={service.href} className="ct-v2-service-link" style={{ fontSize: 18 }}>{service.title} <span aria-hidden="true">→</span></Link>
                        <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{service.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** English: pale service tiles; the service name is the one Electric link. */
function ServiceTiles({ services, details }: { services: Service[]; details: Record<string, string[]> }) {
    return (
        <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {services.map((service) => (
                <li key={service.slug} className="ct-tile flex flex-col gap-5" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
                    <div className="flex items-baseline justify-between gap-4">
                        <Link href={service.href} className="ct-v2-service-link">{service.title} <span aria-hidden="true">→</span></Link>
                        <span className="ct-mono" style={{ fontSize: 12, color: 'var(--muted-2)' }}>{service.accent}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: 'var(--text)' }}>{service.description}</p>
                    <ul className="flex flex-wrap gap-1" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {(details[service.slug] ?? []).map((item) => (
                            <li key={item} style={{ fontSize: 13, padding: '4px 10px', borderRadius: 200, background: 'var(--bg)', color: 'var(--muted)' }}>{item}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

export default function HomeServices({ locale }: { locale: Locale }) {
    const t = homeCopy[locale].services;
    const services = servicesFor(locale);
    return (
        <section id="uslugi" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">{t.eyebrow}</span>
                    <h2 className="ct-h2 ct-statement">{t.title[0]}<span className="ct-electric">{t.title[1]}</span>{t.title[2]}</h2>
                </div>
                {locale === 'pl' ? <PolishServices services={services} /> : <ServiceTiles services={services} details={t.details} />}
            </div>
        </section>
    );
}
