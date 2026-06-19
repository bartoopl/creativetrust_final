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
                border: '1px solid var(--line)',
                borderRadius: 16,
                padding: '16px 16px 14px',
                background: 'color-mix(in srgb, var(--panel) 88%, transparent)',
                minHeight: 124,
            }}
        >
            <div
                style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(24px, 3.2vw, 36px)',
                    letterSpacing: '-0.045em',
                    lineHeight: 1,
                    color: 'var(--text)',
                }}
            >
                {display}{stat.suffix ?? ''}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 12, lineHeight: 1.45 }}>
                {stat.label}
            </div>
        </div>
    );
}

export default function StatsSection() {
    return (
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 32px 80px' }} className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                        Dowody
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 2.9vw, 32px)', letterSpacing: '-0.045em', margin: 0, lineHeight: 1.04 }}>
                        Wyniki, które da się policzyć.
                    </h2>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: '42ch', margin: 0, lineHeight: 1.55 }}>
                    Łączymy strategię, projekt i wdrożenie w jednym procesie, więc szybciej przechodzimy od decyzji do efektu.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <StatItem key={stat.label} stat={stat} />
                ))}
            </div>
        </section>
    );
}
