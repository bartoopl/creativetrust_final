import Link from 'next/link';
import { LEAD_SERVICE_SLUGS, services } from '@/lib/site-services';

const leadCopy: Record<string, { lead: string; points: string[]; cta: string }> = {
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
};

/** Three pillars: two lead offers as large tiles, implementation services as one row of links. */
export default function HomeServices() {
    const lead = services.filter((s) => LEAD_SERVICE_SLUGS.includes(s.slug));
    const implementation = services.filter((s) => !LEAD_SERVICE_SLUGS.includes(s.slug));

    return (
        <section id="uslugi" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Co robimy</span>
                    <h2 className="ct-h2 ct-statement">Najpierw diagnoza. Potem <span className="ct-electric">odpowiedzialność</span> za wynik.</h2>
                </div>

                <div className="flex w-full flex-col gap-1">
                    <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {lead.map((service, i) => {
                            const copy = leadCopy[service.slug];
                            return (
                                <li key={service.slug} className="ct-tile flex flex-col gap-6" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
                                    <span className="ct-mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>{String(i + 1).padStart(2, '0')} · {service.accent}</span>
                                    <div className="flex flex-col gap-3">
                                        <h3 style={{ margin: 0, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{service.title}</h3>
                                        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: 'var(--text)', maxWidth: '46ch' }}>{copy.lead}</p>
                                    </div>
                                    <ul className="flex flex-wrap gap-1" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                        {copy.points.map((point) => (
                                            <li key={point} style={{ fontSize: 13, padding: '4px 10px', borderRadius: 200, background: 'var(--bg)', color: 'var(--muted)' }}>{point}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-auto pt-2">
                                        <Link href={service.href} className="ct-ghost">{copy.cta}</Link>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="ct-tile flex flex-col gap-6" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
                        <div className="flex flex-col gap-3">
                            <span className="ct-mono" style={{ fontSize: 13, color: 'var(--muted-2)' }}>03 · Wdrożenia</span>
                            <h3 style={{ margin: 0, fontSize: 'clamp(22px, 2.2vw, 26px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.25 }}>Rekomendacje wdraża ten sam zespół.</h3>
                        </div>
                        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {implementation.map((service) => (
                                <li key={service.slug} className="flex flex-col gap-1" style={{ padding: '16px 0', borderTop: '1px solid var(--line)' }}>
                                    <Link href={service.href} className="ct-v2-service-link" style={{ fontSize: 18 }}>{service.title} <span aria-hidden="true">→</span></Link>
                                    <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--muted)' }}>{service.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
