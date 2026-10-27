import Link from 'next/link';
import { services } from '@/lib/site-services';

const details: Record<string, string[]> = {
    'strony-www': ['Projekt pod cel biznesowy', 'UX, który konwertuje', 'Next.js i performance'],
    'e-commerce': ['Headless / Medusa.js', 'Migracje bez utraty SEO', 'Integracje ERP, CRM, marketplace'],
    'marketing-automation': ['Wdrożenia SALESmanago', 'Lejki, scoring, segmentacja', 'E-mail, SMS, push'],
    'social-media': ['Strategia i harmonogram', 'Content i kampanie', 'Raportowanie wyników'],
};

/** Four pale service tiles under a centered statement; the service name is the one Electric link. */
export default function HomeServices() {
    return (
        <section id="uslugi" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Od projektu do wyniku</span>
                    <h2 className="ct-h2 ct-statement">Wszystko, czego potrzebujesz, żeby <span className="ct-electric">rosnąć</span> w digital.</h2>
                </div>
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
            </div>
        </section>
    );
}
