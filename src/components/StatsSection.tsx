"use client";

import { useEffect, useRef, useState } from 'react';

interface Stat {
    value: number;
    decimals?: number;
    suffix?: string;
    label: string;
    accent?: boolean;
}

const stats: Stat[] = [
    { value: 150, suffix: '+', label: 'zrealizowanych projektów' },
    { value: 15, label: 'lat doświadczenia' },
    { value: 3.2, decimals: 1, suffix: '×', label: 'średni wzrost konwersji', accent: true },
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
        if (!el || !('IntersectionObserver' in window)) { setActive(true); return; }
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.6 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ borderLeft: '1px solid var(--line)', paddingLeft: 20 }}>
            <div style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(38px, 4.5vw, 58px)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: stat.accent ? 'var(--accent)' : 'var(--text)',
            }}>
                {display}{stat.suffix ?? ''}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 10 }}>{stat.label}</div>
        </div>
    );
}

export default function StatsSection() {
    return (
        <section style={{ maxWidth: 1240, margin: '0 auto', padding: '88px 32px' }} className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {stats.map((stat) => <StatItem key={stat.label} stat={stat} />)}
            </div>
        </section>
    );
}
