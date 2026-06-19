"use client";

import { useEffect, useRef } from 'react';

const ACCENT = '#845cff';
const ACCENT2 = '#ff5ca8';
const BG = '#08080c';

function hexA(hex: string, a: number): string {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    age: number; life: number;
    seed: number; sz: number;
    glyph: string | null;
}

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let w = 0, h = 0;

        const resize = () => {
            const p = cv.parentElement;
            if (!p) return;
            w = p.clientWidth; h = p.clientHeight;
            cv.width = w * dpr; cv.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const plume: Particle[] = [];
        let spawnAcc = 0;
        let lt = 0;
        let raf = 0;

        const draw = (ts: number) => {
            const dt = Math.min(48, ts - (lt || ts));
            lt = ts;
            const baseX = w * 0.6, baseY = h * 0.99;

            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, w, h);

            spawnAcc += dt;
            while (spawnAcc > 7) {
                spawnAcc -= 7;
                if (plume.length < 360) {
                    const r = Math.random();
                    plume.push({
                        x: baseX + (Math.random() - 0.5) * 26,
                        y: baseY,
                        vx: (Math.random() - 0.5) * 0.012 * w / 600,
                        vy: -(0.12 + Math.random() * 0.12) * h / 600,
                        age: 0,
                        life: 1600 + Math.random() * 2200,
                        seed: Math.random() * 6.28,
                        glyph: r < 0.22 ? (Math.random() < 0.5 ? '0' : '1') : null,
                        sz: 1.4 + Math.random() * 2.6,
                    });
                }
            }

            ctx.globalCompositeOperation = 'lighter';

            // core beam
            const beamH = h * 0.85;
            const bg = ctx.createLinearGradient(0, baseY, 0, baseY - beamH);
            bg.addColorStop(0, hexA(ACCENT, 0.22));
            bg.addColorStop(0.4, hexA(ACCENT, 0.10));
            bg.addColorStop(1, hexA(ACCENT, 0));
            ctx.fillStyle = bg;
            ctx.beginPath();
            ctx.moveTo(baseX - 16, baseY);
            ctx.lineTo(baseX + 16, baseY);
            ctx.lineTo(baseX + 72, baseY - beamH);
            ctx.lineTo(baseX - 72, baseY - beamH);
            ctx.closePath(); ctx.fill();

            // engine flare
            const fl = ctx.createRadialGradient(baseX, baseY - 8, 0, baseX, baseY - 8, 150);
            fl.addColorStop(0, hexA('#ffffff', 0.5));
            fl.addColorStop(0.3, hexA(ACCENT, 0.35));
            fl.addColorStop(1, hexA(ACCENT, 0));
            ctx.fillStyle = fl;
            ctx.beginPath(); ctx.arc(baseX, baseY - 8, 150, 0, 6.2832); ctx.fill();

            // particles
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            for (let i = plume.length - 1; i >= 0; i--) {
                const p = plume[i];
                p.age += dt;
                const t = p.age / p.life;
                if (t >= 1) { plume.splice(i, 1); continue; }
                p.vy *= (1 + 0.00035 * dt);
                const turb = Math.sin(p.age * 0.004 + p.seed) * 0.03 * (0.3 + t);
                p.x += (p.vx + turb) * dt * (1 + t * 1.2);
                p.y += p.vy * dt;
                const a = Math.pow(1 - t, 0.7) * Math.min(1, p.age / 100);
                if (p.glyph) {
                    ctx.font = `${9 + p.sz * 2}px "JetBrains Mono", monospace`;
                    ctx.fillStyle = hexA(t < 0.3 ? '#ffffff' : ACCENT2, a * 0.9);
                    ctx.fillText(p.glyph, p.x, p.y);
                } else {
                    const col = t < 0.18 ? '#ffffff' : ACCENT;
                    const r = p.sz * (2.5 + t * 4);
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
                    g.addColorStop(0, hexA(col, a * 0.8));
                    g.addColorStop(1, hexA(col, 0));
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fill();
                    if (t < 0.5) {
                        ctx.fillStyle = hexA('#ffffff', a * 0.7);
                        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz * 0.7, 0, 6.2832); ctx.fill();
                    }
                }
            }

            ctx.globalCompositeOperation = 'source-over';
            ctx.textBaseline = 'alphabetic';
        };

        if (reduced) {
            draw(0);
        } else {
            const loop = (ts: number) => { draw(ts); raf = requestAnimationFrame(loop); };
            raf = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
    );
}
