"use client";

import { useEffect, useRef } from 'react';

interface Pulse {
    r: number;
    life: number;
}

export default function CTAPulseCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let W = 0;
        let H = 0;
        let cx = 0;
        let cy = 0;
        let raf = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            W = parent ? parent.clientWidth : 1440;
            H = parent ? parent.clientHeight : 600;
            canvas.width = W;
            canvas.height = H;
            cx = W / 2;
            cy = H * 0.42;
        };

        resize();
        window.addEventListener('resize', resize);

        const pulses: Pulse[] = [];
        let lastPulse = 0;

        const draw = () => {
            const now = Date.now();
            ctx.clearRect(0, 0, W, H);

            if (now - lastPulse > 1800) {
                pulses.push({ r: 0, life: 1 });
                lastPulse = now;
            }

            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].r += 4;
                pulses[i].life -= 0.007;
                if (pulses[i].life <= 0) {
                    pulses.splice(i, 1);
                    continue;
                }
                const { r, life } = pulses[i];
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(202,255,4,${life * 0.22})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            ctx.save();
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#CAFF04';
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(202,255,4,0.5)';
            ctx.fill();
            ctx.restore();

            if (!reduced) raf = requestAnimationFrame(draw);
        };

        if (reduced) {
            draw();
        } else {
            raf = requestAnimationFrame(draw);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6, pointerEvents: 'none' }}
        />
    );
}
