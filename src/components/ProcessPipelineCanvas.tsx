"use client";

import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    ai: boolean;
    energy: number;
    phase: number;
}

interface Signal {
    p: number;
    active: boolean;
}

export default function ProcessPipelineCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let W = 0;
        const H = 220;
        let cy = 0;
        let nodeX: number[] = [];
        let nodes: Node[] = [];
        let raf = 0;
        let t = 0;

        const isAI = [false, true, false, true, false];
        const sigState: Signal[] = [0, 1, 2, 3].map((i) => ({
            p: -i * 0.25,
            active: Math.random() > 0.3,
        }));

        const setup = () => {
            const parent = canvas.parentElement;
            W = parent ? parent.clientWidth : 1296;
            canvas.width = W;
            canvas.height = H;
            cy = H * 0.42;
            nodeX = [0.1, 0.3, 0.5, 0.7, 0.9].map((p) => W * p);
            nodes = nodeX.map((x, i) => ({ x, y: cy, ai: isAI[i], energy: 0, phase: i * 0.7 }));
        };

        setup();
        window.addEventListener('resize', setup);

        const draw = () => {
            t += 0.012;
            ctx.clearRect(0, 0, W, H);
            nodes.forEach((n) => { n.energy = Math.max(0, n.energy - 0.013); });

            sigState.forEach((sig, i) => {
                sig.p += 0.007;
                if (sig.p > 1.4) {
                    sig.p = -0.25;
                    sig.active = Math.random() > 0.25;
                }

                const ax = nodeX[i];
                const bx = nodeX[i + 1];

                ctx.beginPath();
                ctx.moveTo(ax, cy);
                ctx.lineTo(bx, cy);
                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                ctx.lineWidth = 1;
                ctx.stroke();

                if (sig.p >= 0 && sig.p <= 1) {
                    const sx = ax + (bx - ax) * sig.p;
                    const ts = ax + (bx - ax) * Math.max(0, sig.p - 0.18);

                    const grad = ctx.createLinearGradient(ts, cy, sx, cy);
                    grad.addColorStop(0, 'rgba(202,255,4,0)');
                    grad.addColorStop(1, `rgba(202,255,4,${sig.active ? 0.85 : 0.4})`);
                    ctx.beginPath();
                    ctx.moveTo(ts, cy);
                    ctx.lineTo(sx, cy);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = sig.active ? 2 : 1;
                    ctx.stroke();

                    ctx.save();
                    ctx.shadowBlur = sig.active ? 16 : 6;
                    ctx.shadowColor = '#CAFF04';
                    ctx.beginPath();
                    ctx.arc(sx, cy, sig.active ? 3.8 : 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(202,255,4,${sig.active ? 1 : 0.55})`;
                    ctx.fill();
                    ctx.restore();

                    if (sig.p > 0.9) nodes[i + 1].energy = Math.min(1, nodes[i + 1].energy + 0.06);
                }
            });

            nodes.forEach((n) => {
                const pulse = 1 + Math.sin(t * 1.4 + n.phase) * (n.ai ? 0.10 : 0.04);
                const r = (n.ai ? 13 : 9) * pulse;

                if (n.ai) {
                    ctx.beginPath();
                    ctx.arc(n.x, cy, r * 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(202,255,4,0.03)';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(n.x, cy, r * 1.55, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(202,255,4,${0.10 + n.energy * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                ctx.save();
                ctx.shadowBlur = n.ai ? 22 + n.energy * 14 : 8 + n.energy * 16;
                ctx.shadowColor = n.ai ? '#CAFF04' : 'rgba(255,255,255,0.6)';
                ctx.beginPath();
                ctx.arc(n.x, cy, r, 0, Math.PI * 2);
                ctx.fillStyle = n.ai
                    ? `rgba(202,255,4,${0.65 + n.energy * 0.35})`
                    : `rgba(255,255,255,${0.28 + n.energy * 0.5})`;
                ctx.fill();
                ctx.restore();

                ctx.beginPath();
                ctx.arc(n.x, cy, n.ai ? 3.5 : 2.5, 0, Math.PI * 2);
                ctx.fillStyle = n.ai ? '#000' : 'rgba(255,255,255,0.8)';
                ctx.fill();
            });

            if (!reduced) raf = requestAnimationFrame(draw);
        };

        if (reduced) {
            draw();
        } else {
            raf = requestAnimationFrame(draw);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', setup);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 220, pointerEvents: 'none' }}
        />
    );
}
