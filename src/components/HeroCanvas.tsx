"use client";

import { useEffect, useRef } from 'react';

const ACCENT = '#56C4DB';
const BG = '#08080c';

function hexA(hex: string, a: number): string {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

interface Node3D {
    ox: number;
    oy: number;
    oz: number;
    energy: number;
    baseR: number;
    phase: number;
}

interface Edge3D {
    a: number;
    b: number;
}

interface Signal3D {
    a: number;
    b: number;
    p: number;
    sp: number;
}

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let w = 0;
        let h = 0;
        let raf = 0;
        let lt = 0;
        let spawnAcc = 0;
        let t = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            w = parent.clientWidth;
            h = parent.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        const nodes: Node3D[] = [];
        const edges: Edge3D[] = [];
        const signals: Signal3D[] = [];

        const W = 700;
        const H = 900;
        const CX = W * 0.5;
        const CY = H * 0.46;
        const FOV = 750;
        const CAM_Z = 550;
        const SPHERE_R = 295;
        const SPHERE_SPREAD = 50;
        const INTERIOR_R = 240;
        const CONNECT_DIST = 140;
        const MAX_CONNECTIONS = 6;
        const ROTATION_Y = 0.19;
        const WOBBLE_X = 0.09;
        const SIGNAL_CHANCE = 0.20;
        const SIGNAL_SPEED_MIN = 0.016;
        const SIGNAL_SPEED_MAX = 0.034;
        const ENERGY_DECAY = 0.022;
        const CASCADE_CHANCE = 0.35;

        for (let i = 0; i < 120; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = SPHERE_R + (Math.random() - 0.5) * SPHERE_SPREAD;
            nodes.push({
                ox: r * Math.sin(phi) * Math.cos(theta),
                oy: r * Math.sin(phi) * Math.sin(theta) * 0.82,
                oz: r * Math.cos(phi),
                energy: 0,
                baseR: Math.random() * 1.4 + 0.8,
                phase: Math.random() * Math.PI * 2,
            });
        }

        for (let i = 0; i < 55; i++) {
            const r = Math.cbrt(Math.random()) * INTERIOR_R;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            nodes.push({
                ox: r * Math.sin(phi) * Math.cos(theta),
                oy: r * Math.sin(phi) * Math.sin(theta) * 0.82,
                oz: r * Math.cos(phi),
                energy: 0,
                baseR: Math.random() * 1.1 + 0.5,
                phase: Math.random() * Math.PI * 2,
            });
        }

        const connCount = new Array(nodes.length).fill(0);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (connCount[i] >= MAX_CONNECTIONS || connCount[j] >= MAX_CONNECTIONS) continue;
                const dx = nodes[i].ox - nodes[j].ox;
                const dy = nodes[i].oy - nodes[j].oy;
                const dz = nodes[i].oz - nodes[j].oz;
                if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST && Math.random() > 0.32) {
                    edges.push({ a: i, b: j });
                    connCount[i]++;
                    connCount[j]++;
                }
            }
        }

        const project = (ox: number, oy: number, oz: number, ry: number, rx: number) => {
            const x1 = ox * Math.cos(ry) - oz * Math.sin(ry);
            const z1 = ox * Math.sin(ry) + oz * Math.cos(ry);
            const y2 = oy * Math.cos(rx) - z1 * Math.sin(rx);
            const z2 = oy * Math.sin(rx) + z1 * Math.cos(rx);
            const sc = FOV / (FOV + z2 + CAM_Z);
            return { px: CX + x1 * sc, py: CY + y2 * sc, sc, z: z2 };
        };

        const draw = (ts: number) => {
            const dt = Math.min(48, ts - (lt || ts));
            lt = ts;
            t += 0.0055;
            const ry = t * ROTATION_Y;
            const rx = Math.sin(t * WOBBLE_X) * 0.13;

            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, W, H);

            spawnAcc += dt;
            while (spawnAcc > 7) {
                spawnAcc -= 7;
                if (signals.length < 360) {
                    const edge = edges[Math.floor(Math.random() * edges.length)];
                    signals.push({
                        a: edge.a,
                        b: edge.b,
                        p: 0,
                        sp: SIGNAL_SPEED_MIN + Math.random() * (SIGNAL_SPEED_MAX - SIGNAL_SPEED_MIN),
                    });
                }
            }

            nodes.forEach((node) => {
                node.energy = Math.max(0, node.energy - ENERGY_DECAY);
                node.phase += 0.011;
            });

            if (Math.random() < SIGNAL_CHANCE && edges.length > 0) {
                const edge = edges[Math.floor(Math.random() * edges.length)];
                signals.push({
                    a: edge.a,
                    b: edge.b,
                    p: 0,
                    sp: SIGNAL_SPEED_MIN + Math.random() * (SIGNAL_SPEED_MAX - SIGNAL_SPEED_MIN),
                });
            }

            for (let i = signals.length - 1; i >= 0; i--) {
                const signal = signals[i];
                signal.p += signal.sp;
                if (signal.p >= 1) {
                    nodes[signal.b].energy = 1;
                    if (Math.random() < CASCADE_CHANCE) {
                        const next = edges.find((edge) => edge.a === signal.b || edge.b === signal.b);
                        if (next) {
                            signals.push({
                                a: signal.b,
                                b: next.a === signal.b ? next.b : next.a,
                                p: 0,
                                sp: SIGNAL_SPEED_MIN + Math.random() * (SIGNAL_SPEED_MAX - SIGNAL_SPEED_MIN),
                            });
                        }
                    }
                    signals.splice(i, 1);
                }
            }

            const projected = nodes.map((node) => project(node.ox, node.oy, node.oz, ry, rx));

            ctx.globalCompositeOperation = 'lighter';

            edges
                .map((edge) => ({ ...edge, dz: (projected[edge.a].z + projected[edge.b].z) * 0.5 }))
                .sort((a, b) => a.dz - b.dz)
                .forEach(({ a, b, dz }) => {
                    const df = Math.max(0, Math.min(1, dz / 380 + 0.55));
                    ctx.beginPath();
                    ctx.moveTo(projected[a].px, projected[a].py);
                    ctx.lineTo(projected[b].px, projected[b].py);
                    ctx.strokeStyle = hexA(ACCENT, 0.025 + df * 0.095);
                    ctx.lineWidth = 0.4 + df * 0.6;
                    ctx.stroke();
                });

            signals.forEach(({ a, b, p }) => {
                const pa = projected[a];
                const pb = projected[b];
                const sx = pa.px + (pb.px - pa.px) * p;
                const sy = pa.py + (pb.py - pa.py) * p;
                const avgSc = (pa.sc + pb.sc) * 0.5;

                const g = ctx.createLinearGradient(pa.px, pa.py, sx, sy);
                g.addColorStop(0, hexA(ACCENT, 0));
                g.addColorStop(1, hexA(ACCENT, Math.min(1, 0.55 * avgSc * 3)));
                ctx.beginPath();
                ctx.moveTo(pa.px, pa.py);
                ctx.lineTo(sx, sy);
                ctx.strokeStyle = g;
                ctx.lineWidth = 1.8 * avgSc;
                ctx.stroke();

                ctx.save();
                ctx.shadowBlur = 16;
                ctx.shadowColor = hexA(ACCENT, 0.9);
                ctx.beginPath();
                ctx.arc(sx, sy, Math.max(0.5, 2.8 * avgSc), 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(160,230,255,0.95)';
                ctx.fill();
                ctx.restore();
            });

            projected
                .map((p, i) => ({ ...p, i }))
                .sort((a, b) => a.z - b.z)
                .forEach(({ px, py, sc, z, i }) => {
                    const node = nodes[i];
                    const df = Math.max(0, Math.min(1, z / 380 + 0.55));
                    const en = node.energy;
                    const r = Math.max(0.4, (node.baseR + en * 2.8) * sc * 1.9);
                    const al = 0.18 + df * 0.52 + en * 0.28;

                    if (en > 0.15) {
                        ctx.save();
                        ctx.shadowBlur = 18 + en * 14;
                        ctx.shadowColor = hexA(ACCENT, 0.88);
                        ctx.beginPath();
                        ctx.arc(px, py, r * (1.8 + en), 0, Math.PI * 2);
                        ctx.fillStyle = hexA(ACCENT, en * 0.12);
                        ctx.fill();
                        ctx.restore();
                    }

                    ctx.beginPath();
                    ctx.arc(px, py, r, 0, Math.PI * 2);
                    ctx.fillStyle = en > 0.18 ? hexA(ACCENT, Math.min(1, al + en * 0.45)) : hexA('#ffffff', al * 0.6);
                    ctx.fill();
                });

            const grd = ctx.createRadialGradient(CX, CY, 260, CX, CY, 430);
            grd.addColorStop(0, hexA(ACCENT, 0));
            grd.addColorStop(0.6, hexA(ACCENT, 0.04 + 0.015 * Math.sin(t * 0.7)));
            grd.addColorStop(1, hexA(ACCENT, 0));
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, W, H);

            ctx.globalCompositeOperation = 'source-over';

            if (!reduced) {
                raf = requestAnimationFrame(draw);
            }
        };

        if (reduced) {
            draw(0);
        } else {
            raf = requestAnimationFrame(draw);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />;
}
