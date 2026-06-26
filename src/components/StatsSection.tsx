"use client";

import { useEffect, useRef, useState } from 'react';

interface Stat {
    value: number;
    decimals?: number;
    suffix?: string;
    label: string;
}

const stats: Stat[] = [
    { value: 150, suffix: '+', label: 'zrealizowanych projektów' },
    { value: 15, suffix: '', label: 'lat doświadczenia' },
    { value: 3.2, decimals: 1, suffix: '×', label: 'średni wzrost konwersji' },
    { value: 40, suffix: '%', label: 'szybciej dzięki AI' },
];

function useCountUp(target: number, decimals = 0, active: boolean) {
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!active) return;
        const dur = 1400;
        const t0 = performance.now();
        const step = (now: number) => {
            let p = Math.min(1, (now - t0) / dur);
            p = 1 - Math.pow(1 - p, 3);
            setVal(target * p);
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [active, target]);

    const fmt = (v: number) => {
        let s = v.toFixed(decimals);
        if (decimals > 0) s = s.replace('.', ',');
        return s;
    };

    return fmt(val);
}

function StatItem({ stat }: { stat: Stat }) {
    const ref = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);
    const display = useCountUp(stat.value, stat.decimals ?? 0, active);

    useEffect(() => {
        const el = ref.current;
        if (!el || !('IntersectionObserver' in window)) {
            setActive(true);
            return;
        }

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setActive(true);
                obs.disconnect();
            }
        }, { threshold: 0.6 });

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                border: '0.5px solid rgba(255,255,255,0.08)',
                padding: '32px 24px',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.02)',
            }}
        >
            <div
                style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontWeight: 500,
                    fontSize: 'clamp(28px, 3.4vw, 43px)',
                    letterSpacing: '-1.44px',
                    lineHeight: 1,
                    color: '#fff',
                }}
            >
                {display}{stat.suffix ?? ''}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 1.45 }}>
                {stat.label}
            </div>
        </div>
    );
}

export default function StatsSection() {
    return (
        <section style={{ background: '#000000', color: '#ffffff', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '112px 72px 120px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 80, alignItems: 'end', marginBottom: 80 }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                            Dowody
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(34px, 4vw, 43.1px)', lineHeight: '48.4px', letterSpacing: '-1.76px', margin: 0, color: '#ffffff' }}>
                            Wyniki, które da się policzyć.
                        </h2>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', maxWidth: '44ch', margin: 0 }}>
                        Łączymy strategię, projekt i wdrożenie w jednym procesie, więc szybciej przechodzimy od decyzji do efektu.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatItem key={stat.label} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
