"use client";

import { useEffect, useRef } from 'react';

const C1 = '#845cff';
const C2 = '#ff5ca8';

function hexA(hex: string, a: number): string {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function bezier(p0: {x:number,y:number}, c: {x:number,y:number}, p1: {x:number,y:number}, t: number) {
    const u = 1 - t;
    return { x: u*u*p0.x + 2*u*t*c.x + t*t*p1.x, y: u*u*p0.y + 2*u*t*c.y + t*t*p1.y };
}

export default function NeuralBridgeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let bw = 0, bh = 0;

        const resize = () => {
            const p = cv.parentElement;
            if (!p) return;
            bw = p.clientWidth; bh = p.clientHeight;
            cv.width = bw * dpr; cv.height = bh * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        const parts = Array.from({ length: 26 }, (_, i) => ({
            curve: i % 5, t: Math.random(),
            sp: 0.0016 + Math.random() * 0.0028,
            dir: Math.random() > 0.45 ? 1 : -1,
            sz: 1.4 + Math.random() * 2.0,
        }));

        let raf = 0;

        const draw = (ts: number) => {
            if (!bw) return;
            ctx.clearRect(0, 0, bw, bh);

            const L = { x: bw * 0.27, y: bh * 0.5 };
            const R = { x: bw * 0.73, y: bh * 0.5 };
            const mid = (L.x + R.x) / 2;
            const amp = Math.min(bh * 0.34, 150);
            const offs = [-1, -0.5, 0, 0.5, 1];
            const curves = offs.map(k => ({ p0: L, c: { x: mid, y: bh * 0.5 + k * amp }, p1: R }));

            // synapses
            for (const cu of curves) {
                ctx.beginPath();
                ctx.moveTo(cu.p0.x, cu.p0.y);
                ctx.quadraticCurveTo(cu.c.x, cu.c.y, cu.p1.x, cu.p1.y);
                ctx.strokeStyle = hexA('#ffffff', 0.06);
                ctx.lineWidth = 1; ctx.stroke();
            }

            ctx.globalCompositeOperation = 'lighter';

            // data particles
            for (const pt of parts) {
                pt.t += pt.sp * pt.dir;
                if (pt.t > 1) pt.t = 0;
                if (pt.t < 0) pt.t = 1;
                const cu = curves[pt.curve];
                const pos = bezier(cu.p0, cu.c, cu.p1, pt.t);
                const col = pt.dir > 0 ? C1 : C2;
                const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, pt.sz * 5);
                g.addColorStop(0, hexA(col, 0.9));
                g.addColorStop(1, hexA(col, 0));
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(pos.x, pos.y, pt.sz * 5, 0, 6.2832); ctx.fill();
                ctx.fillStyle = hexA('#ffffff', 0.85);
                ctx.beginPath(); ctx.arc(pos.x, pos.y, pt.sz * 0.7, 0, 6.2832); ctx.fill();
            }

            ctx.globalCompositeOperation = 'source-over';

            const tnow = ts * 0.001;

            // left node — organic rings
            for (let i = 0; i < 3; i++) {
                const ph = (tnow * 0.5 + i / 3) % 1;
                const rr = 16 + ph * 46;
                ctx.beginPath(); ctx.arc(L.x, L.y, rr, 0, 6.2832);
                ctx.strokeStyle = hexA(C2, 0.4 * (1 - ph));
                ctx.lineWidth = 1.5; ctx.stroke();
            }
            const lg = ctx.createRadialGradient(L.x, L.y, 0, L.x, L.y, 30);
            lg.addColorStop(0, hexA(C2, 0.95)); lg.addColorStop(1, hexA(C2, 0));
            ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(L.x, L.y, 30, 0, 6.2832); ctx.fill();
            ctx.fillStyle = C2; ctx.beginPath(); ctx.arc(L.x, L.y, 6, 0, 6.2832); ctx.fill();

            // right node — rotating hexagon
            ctx.save();
            ctx.translate(R.x, R.y);
            ctx.rotate(tnow * 0.4);
            ctx.strokeStyle = hexA(C1, 0.5); ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * 6.2832, rr = 26;
                const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath(); ctx.stroke();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * 6.2832, rr = 26;
                ctx.fillStyle = C1;
                ctx.beginPath(); ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr, 2.4, 0, 6.2832); ctx.fill();
            }
            ctx.restore();
            const rg = ctx.createRadialGradient(R.x, R.y, 0, R.x, R.y, 26);
            rg.addColorStop(0, hexA(C1, 0.95)); rg.addColorStop(1, hexA(C1, 0));
            ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(R.x, R.y, 26, 0, 6.2832); ctx.fill();
            ctx.fillStyle = C1; ctx.beginPath(); ctx.arc(R.x, R.y, 6, 0, 6.2832); ctx.fill();
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
