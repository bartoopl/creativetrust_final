"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { ModuleName } from './HeroPipelineScene';

// three.js + the scene load only on the client, only where the 3D is actually shown.
const HeroPipelineScene = dynamic(() => import('./HeroPipelineScene'), { ssr: false });

const POSTER = '/models/hero-pipeline-poster.webp';
const STEP_SELECTOR = '[data-pipeline-step]';

/** 3D is an enhancement: desktop, motion allowed, no data saver, WebGL available. */
function canRender3D(): boolean {
    if (!window.matchMedia('(min-width: 1024px)').matches) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return false;
    try {
        return !!document.createElement('canvas').getContext('webgl2');
    } catch {
        return false;
    }
}

const noopSubscribe = () => () => {};

/**
 * Isometric "pipeline" beside the hero headline. Live canvas where 3D is allowed — modules
 * assemble on load (their arrival *is* the loading state), the token
 * follows scroll, modules lift on hover — mirrored with the step panel below — and the whole
 * scene tilts slightly towards the pointer. Elsewhere (reduced motion, data saver, no WebGL) a
 * static poster of the assembled scene stands in. Decorative: the panel carries the same content.
 */
export default function HeroPipeline3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const enabled = useSyncExternalStore(noopSubscribe, canRender3D, () => false);
    const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
    const [visible, setVisible] = useState(true);

    const progress = useRef(0);
    const pointer = useRef<{ x: number; y: number } | null>(null);
    const panelHover = useRef<ModuleName | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const hero = container?.closest('section');
        if (!enabled || !container || !hero) return;

        // Scroll progress: 0 at the top of the page, 1 when the scene's bottom edge reaches 30% of
        // the viewport — the token completes 01 → 05 while the scene is still in view.
        const onScroll = () => {
            const bottom = container.getBoundingClientRect().bottom + window.scrollY;
            const distance = Math.max(1, bottom - window.innerHeight * 0.3);
            progress.current = Math.min(1, Math.max(0, window.scrollY / distance));
        };
        // Pointer over the hero, normalised around the scene's centre.
        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            const rect = container.getBoundingClientRect();
            pointer.current = {
                x: Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1)),
                y: Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1)),
            };
        };
        const onPointerLeave = () => {
            pointer.current = null;
        };
        // Step panel ↔ 3D: hovering or focusing a step lifts its module.
        const steps = [...document.querySelectorAll<HTMLElement>(STEP_SELECTOR)];
        const stepHandlers = steps.map((step) => {
            const enter = () => {
                panelHover.current = step.dataset.pipelineStep as ModuleName;
            };
            const leave = () => {
                if (panelHover.current === step.dataset.pipelineStep) panelHover.current = null;
            };
            step.addEventListener('pointerenter', enter);
            step.addEventListener('pointerleave', leave);
            step.addEventListener('focusin', enter);
            step.addEventListener('focusout', leave);
            return () => {
                step.removeEventListener('pointerenter', enter);
                step.removeEventListener('pointerleave', leave);
                step.removeEventListener('focusin', enter);
                step.removeEventListener('focusout', leave);
            };
        });
        // Stop rendering while the hero is off screen.
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(container);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        hero.addEventListener('pointermove', onPointerMove);
        hero.addEventListener('pointerleave', onPointerLeave);
        return () => {
            window.removeEventListener('scroll', onScroll);
            hero.removeEventListener('pointermove', onPointerMove);
            hero.removeEventListener('pointerleave', onPointerLeave);
            stepHandlers.forEach((off) => off());
            observer.disconnect();
        };
    }, [enabled]);

    // 3D hover → highlight the matching step in the panel.
    const onModuleHover = (module: ModuleName | null) => {
        document.querySelectorAll<HTMLElement>(STEP_SELECTOR).forEach((step) => {
            if (step.dataset.pipelineStep === module) step.dataset.active = 'true';
            else delete step.dataset.active;
        });
    };

    return (
        <div ref={containerRef} className="relative hidden w-full lg:block" style={{ aspectRatio: '6 / 5' }} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element -- static transparent poster, sized by the container */}
            <img
                src={POSTER}
                alt=""
                width={1200}
                height={1000}
                decoding="async"
                className="absolute inset-0 h-full w-full select-none"
                style={{ opacity: isClient && !enabled ? 1 : 0, transition: 'opacity .4s ease' }}
                draggable={false}
            />
            {enabled && (
                <HeroPipelineScene
                    active={visible}
                    progress={progress}
                    pointer={pointer}
                    panelHover={panelHover}
                    onModuleHover={onModuleHover}
                />
            )}
        </div>
    );
}
