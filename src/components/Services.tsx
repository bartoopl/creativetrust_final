"use client";

import Link from 'next/link';
import { useRef, useState } from 'react';
import SectionHeader from './ui/SectionHeader';

const services = [
    {
        eyebrow: 'Strony www',
        title: 'Buduj szybką',
        subtitle: 'ścieżkę do klienta',
        items: ['Projekty oparte o cel biznesowy', 'Wdrożenie przyspieszone przez AI', 'UX, który konwertuje'],
        href: '/uslugi/strony-www',
    },
    {
        eyebrow: 'Ecommerce',
        title: 'Skaluj bez',
        subtitle: 'ograniczeń platformy',
        items: ['Architektura headless / Medusa.js', 'Pełna kontrola — zero vendor lock-in', 'Integracje z ERP, CRM, marketplace'],
        href: '/uslugi/e-commerce',
    },
    {
        eyebrow: 'Marketing automation',
        title: 'Automatyzuj',
        subtitle: 'co powtarzalne',
        items: ['Sekwencje e-mail, SMS, push', 'Segmentacja i lead scoring', 'Raportowanie w czasie rzeczywistym'],
        href: '/uslugi/marketing-automation',
    },
    {
        eyebrow: 'Social media',
        title: 'Obecność, która',
        subtitle: 'sprzedaje',
        items: ['Strategia i harmonogram contentowy', 'Tworzenie treści i grafik', 'Community management i reklamy'],
        href: '/uslugi/social-media',
    },
];

export default function Services() {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const last = services.length - 1;
        const next = {
            ArrowDown: activeIdx === last ? 0 : activeIdx + 1,
            ArrowRight: activeIdx === last ? 0 : activeIdx + 1,
            ArrowUp: activeIdx === 0 ? last : activeIdx - 1,
            ArrowLeft: activeIdx === 0 ? last : activeIdx - 1,
            Home: 0,
            End: last,
        }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        setActiveIdx(next);
        tabRefs.current[next]?.focus();
    };

    return (
        <section id="uslugi" className="ct-section" style={{ scrollMarginTop: 80 }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
                <SectionHeader eyebrow="Od projektu do wyniku" title="Wszystko czego potrzebujesz, żeby rosnąć w digital." maxWidth="none" />

                <div className="grid grid-cols-1 overflow-hidden md:grid-cols-[280px_1fr]" style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8 }}>
                    <div role="tablist" aria-label="Usługi" aria-orientation="vertical" className="flex flex-col border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(17,24,39,0.1)' }}>
                        {services.map((service, i) => {
                            const active = i === activeIdx;
                            return (
                                <button
                                    key={service.eyebrow}
                                    type="button"
                                    role="tab"
                                    id={`service-tab-${i}`}
                                    ref={(el) => { tabRefs.current[i] = el; }}
                                    aria-selected={active}
                                    aria-controls={`service-panel-${i}`}
                                    tabIndex={active ? 0 : -1}
                                    onClick={() => setActiveIdx(i)}
                                    onKeyDown={onKeyDown}
                                    style={{
                                        width: '100%', padding: '20px 24px', textAlign: 'left', cursor: 'pointer',
                                        fontFamily: 'inherit', border: 'none',
                                        borderLeft: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                                        borderTop: i > 0 ? '1px solid var(--line)' : 'none',
                                        background: active ? 'var(--panel)' : '#fff',
                                        color: active ? 'var(--text)' : 'var(--muted)',
                                        transition: 'background .15s ease, color .15s ease, border-color .15s ease',
                                    }}
                                >
                                    <span className="ct-mono" style={{ display: 'block', marginBottom: 4, fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.3px', color: active ? 'var(--accent)' : undefined }}>
                                        {service.eyebrow}
                                    </span>
                                    <span style={{ display: 'block', fontSize: 15, fontWeight: 600 }}>
                                        {service.title} {service.subtitle}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {services.map((service, i) => (
                        <div
                            key={service.eyebrow}
                            id={`service-panel-${i}`}
                            role="tabpanel"
                            aria-labelledby={`service-tab-${i}`}
                            hidden={i !== activeIdx}
                            className="ct-fade flex-col gap-5"
                            style={{ display: i === activeIdx ? 'flex' : undefined, padding: 'clamp(24px, 4vw, 40px)', background: 'var(--panel)' }}
                        >
                            <span className="ct-meta" style={{ color: 'var(--accent)' }}>{service.eyebrow}</span>
                            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px' }}>
                                {service.title} {service.subtitle}
                            </h3>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {service.items.map((item) => (
                                    <li key={item} className="flex items-center gap-2.5" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                                        <span className="ct-bullet" aria-hidden="true" />
                                        <span style={{ fontSize: 14, color: 'var(--text-2)' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <Link href={service.href} className="ct-link">Zobacz usługę →</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
