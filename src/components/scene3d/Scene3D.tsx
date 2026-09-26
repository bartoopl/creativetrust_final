"use client";

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { scenes, type SceneId } from '@/lib/scenes3d';

// three.js + the canvas load only on the client, only where 3D is actually shown.
const Scene3DCanvas = dynamic(() => import('./Scene3DCanvas'), { ssr: false });

/** Page elements that mirror a scene target: hovering one lifts the 3D piece, and vice versa. */
const TARGET_SELECTOR = '[data-scene-target]';

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
 * Isometric scene built in Blender (see src/lib/scenes3d.ts). Live canvas where 3D is allowed:
 * the pieces assemble on load (their arrival *is* the loading state), scroll drives the scene's
 * scroll clip, hovering a piece lifts it — mirrored with `[data-scene-target]` elements in the
 * same section — and the scene tilts slightly towards the pointer. Elsewhere (reduced motion,
 * data saver, no WebGL) a static poster stands in. Decorative: the page carries the content.
 */
export default function Scene3D({ id, className = '' }: { id: SceneId; className?: string }) {
    const scene = scenes[id];
    const containerRef = useRef<HTMLDivElement>(null);
    const enabled = useSyncExternalStore(noopSubscribe, canRender3D, () => false);
    const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
    const [visible, setVisible] = useState(true);

    const progress = useRef(0);
    const pointer = useRef<{ x: number; y: number } | null>(null);
    const pageHover = useRef<string | null>(null);

    const targets = () => {
        const section = containerRef.current?.closest('section');
        return section ? [...section.querySelectorAll<HTMLElement>(TARGET_SELECTOR)] : [];
    };

    useEffect(() => {
        const container = containerRef.current;
        const section = container?.closest('section');
        if (!enabled || !container || !section) return;

        // Scroll progress: 0 at the top of the page, 1 when the scene's bottom edge reaches 30% of
        // the viewport — the scroll clip completes while the scene is still in view.
        const onScroll = () => {
            const bottom = container.getBoundingClientRect().bottom + window.scrollY;
            const distance = Math.max(1, bottom - window.innerHeight * 0.3);
            progress.current = Math.min(1, Math.max(0, window.scrollY / distance));
        };
        // Pointer over the section, normalised around the scene's centre.
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
        // Page → 3D: hovering or focusing a mirrored element lifts its piece.
        const offs = targets().map((el) => {
            const enter = () => {
                pageHover.current = el.dataset.sceneTarget ?? null;
            };
            const leave = () => {
                if (pageHover.current === el.dataset.sceneTarget) pageHover.current = null;
            };
            el.addEventListener('pointerenter', enter);
            el.addEventListener('pointerleave', leave);
            el.addEventListener('focusin', enter);
            el.addEventListener('focusout', leave);
            return () => {
                el.removeEventListener('pointerenter', enter);
                el.removeEventListener('pointerleave', leave);
                el.removeEventListener('focusin', enter);
                el.removeEventListener('focusout', leave);
            };
        });
        // Stop rendering while the scene is off screen.
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
        observer.observe(container);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        section.addEventListener('pointermove', onPointerMove);
        section.addEventListener('pointerleave', onPointerLeave);
        return () => {
            window.removeEventListener('scroll', onScroll);
            section.removeEventListener('pointermove', onPointerMove);
            section.removeEventListener('pointerleave', onPointerLeave);
            offs.forEach((off) => off());
            observer.disconnect();
        };
    }, [enabled]);

    // 3D → page: highlight the mirrored element.
    const onTargetHover = (node: string | null) => {
        targets().forEach((el) => {
            if (el.dataset.sceneTarget === node) el.dataset.active = 'true';
            else delete el.dataset.active;
        });
    };

    return (
        <div ref={containerRef} className={`relative w-full ${className}`} style={{ aspectRatio: '6 / 5' }} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element -- static transparent poster, sized by the container */}
            <img
                src={scene.poster}
                alt=""
                width={1200}
                height={1000}
                decoding="async"
                className="absolute inset-0 h-full w-full select-none"
                style={{ opacity: isClient && !enabled ? 1 : 0, transition: 'opacity .4s ease' }}
                draggable={false}
            />
            {enabled && (
                <Scene3DCanvas
                    scene={scene}
                    active={visible}
                    progress={progress}
                    pointer={pointer}
                    pageHover={pageHover}
                    onTargetHover={onTargetHover}
                />
            )}
        </div>
    );
}
