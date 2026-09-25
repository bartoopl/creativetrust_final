"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { ImageWithCaption } from '@/types'
import { VelocityTracker, pickSwipeTarget, resistEdges, rubberband, shouldDismiss } from '@/lib/gesture';

interface LightboxProps {
    images: ImageWithCaption[];
    initialIndex?: number;
    onClose: () => void;
    isOpen: boolean;
}

/** Movement (px) before a press becomes a drag, so taps on the image or controls stay taps. */
const DRAG_THRESHOLD = 10;

type Drag = {
    pointerId: number;
    startX: number;
    startY: number;
    /** Track position when grabbed — a drag started mid-animation continues from where the image is. */
    originX: number;
    originY: number;
    axis: 'x' | 'y' | null;
};

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose, isOpen }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [wasOpen, setWasOpen] = useState(isOpen);
    const [width, setWidth] = useState(0);
    const dialogRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // The whole strip of images moves on one horizontal value; vertical drag (dismiss) is a separate spring.
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const dismissScale = useTransform(y, [0, 400], [1, 0.85], { clamp: true });
    const dragRef = useRef<Drag | null>(null);
    const didDragRef = useRef(false);
    const trackerRef = useRef(new VelocityTracker());

    // Each time the lightbox opens, start from the image that was clicked.
    if (isOpen !== wasOpen) {
        setWasOpen(isOpen);
        if (isOpen) setCurrentIndex(initialIndex);
    }

    const count = images.length;

    // Settle the strip on a page, carrying the finger's velocity into the spring so there is no seam.
    const goTo = (target: number, velocity = 0) => {
        const clamped = Math.max(0, Math.min(count - 1, target));
        setCurrentIndex(clamped);
        const to = -clamped * width;
        if (reduceMotion || !width) {
            x.set(to);
            return;
        }
        // Overshoot only when a flick put momentum into the gesture.
        const bounce = Math.abs(velocity) > 500 ? 0.2 : 0;
        animate(x, to, { type: 'spring', bounce, duration: 0.4, velocity });
    };
    const showNext = () => goTo(currentIndex + 1);
    const showPrevious = () => goTo(currentIndex - 1);

    // Keep the strip aligned with the page size (open, resize, rotation).
    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        if (!isOpen || !viewport) return;
        const measure = () => setWidth(viewport.clientWidth);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        return () => observer.disconnect();
    }, [isOpen]);

    useLayoutEffect(() => {
        if (!dragRef.current) x.set(-currentIndex * width);
        // Only re-align on open/resize; index changes animate through goTo().
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, isOpen]);

    // Latest handlers for the keyboard listener, so it never acts on a stale index or onClose.
    const handlersRef = useRef({ onClose, showNext, showPrevious });
    useEffect(() => {
        handlersRef.current = { onClose, showNext, showPrevious };
    });

    useEffect(() => {
        if (!isOpen) return;
        const opener = document.activeElement as HTMLElement | null;
        document.body.style.overflow = 'hidden';
        dialogRef.current?.focus({ preventScroll: true });
        y.set(0);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handlersRef.current.onClose();
            else if (e.key === 'ArrowRight') handlersRef.current.showNext();
            else if (e.key === 'ArrowLeft') handlersRef.current.showPrevious();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            // Hand focus back to whatever opened the lightbox.
            opener?.focus?.({ preventScroll: true });
        };
    }, [isOpen, y]);

    // ----- Direct manipulation: 1:1 drag, momentum projection, rubber-banding -----

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!e.isPrimary || e.button !== 0) return;
        // Grabbing a moving strip stops it where it is (interruptible), and the drag continues from there.
        x.stop();
        y.stop();
        dragRef.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, originX: x.get(), originY: y.get(), axis: null };
        didDragRef.current = false;
        trackerRef.current.reset();
        trackerRef.current.add(e.timeStamp, e.clientX, e.clientY);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== e.pointerId) return;
        trackerRef.current.add(e.timeStamp, e.clientX, e.clientY);
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;

        if (!drag.axis) {
            if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
            drag.axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
            didDragRef.current = true;
            // Keep tracking even if the finger leaves the image.
            e.currentTarget.setPointerCapture(e.pointerId);
        }

        if (drag.axis === 'x') {
            const pageOffset = drag.originX + currentIndex * width + dx;
            x.set(-currentIndex * width + resistEdges(pageOffset, currentIndex, count, width));
        } else {
            const next = drag.originY + dy;
            // Down follows the finger (dismiss); up has nowhere to go, so it resists.
            y.set(next > 0 ? next : rubberband(next, window.innerHeight));
        }
    };

    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== e.pointerId) return;
        dragRef.current = null;
        if (!drag.axis) return;
        const velocity = trackerRef.current.velocity();

        if (drag.axis === 'x') {
            const offset = x.get() + currentIndex * width;
            goTo(pickSwipeTarget({ offset, velocity: velocity.x, width, index: currentIndex, count }), velocity.x);
        } else if (shouldDismiss(y.get(), velocity.y, window.innerHeight)) {
            onClose();
        } else {
            animate(y, 0, reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.4, velocity: velocity.y });
        }
    };

    // Taps on empty space around the image close it; the tail of a drag never counts as a tap.
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (didDragRef.current) {
            didDragRef.current = false;
            return;
        }
        const target = e.target as HTMLElement;
        if (target === e.currentTarget || target.dataset.slide !== undefined) {
            onClose();
        }
    };

    const controlStyle: React.CSSProperties = {
        width: 44, height: 44, borderRadius: 'var(--radius-pill)', background: '#fff',
        border: '1px solid var(--line-strong)', color: 'var(--text)', cursor: 'pointer',
    };

    // Render the current image and its neighbours only.
    const visible = images
        .map((image, index) => ({ image, index }))
        .filter(({ index }) => Math.abs(index - currentIndex) <= 1);

    // Always rendered so AnimatePresence can play the exit when isOpen turns false.
    return (
        <AnimatePresence>
            {isOpen && count > 0 && (
                <motion.div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Galeria — zdjęcie ${currentIndex + 1} z ${count}`}
                    tabIndex={-1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ct-lightbox fixed inset-0 z-50 flex items-center justify-center p-4 outline-none md:p-10"
                    onClick={handleBackdropClick}
                >
                    {/* Przycisk zamknięcia */}
                    <button
                        className="ct-card-hover absolute top-6 right-6 z-10 flex items-center justify-center"
                        style={controlStyle}
                        onClick={onClose}
                        aria-label="Zamknij"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Przyciski nawigacji — hidden at the ends, matching the swipe's rubber-banded edges */}
                    {currentIndex > 0 && (
                        <button
                            className="ct-card-hover absolute left-4 md:left-10 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center"
                            style={controlStyle}
                            onClick={showPrevious}
                            aria-label="Poprzednie zdjęcie"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    {currentIndex < count - 1 && (
                        <button
                            className="ct-card-hover absolute right-4 md:right-10 top-1/2 z-10 -translate-y-1/2 flex items-center justify-center"
                            style={controlStyle}
                            onClick={showNext}
                            aria-label="Następne zdjęcie"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Licznik zdjęć */}
                    <div className="ct-pill absolute bottom-6 left-1/2 -translate-x-1/2" aria-live="polite">
                        {currentIndex + 1} / {count}
                    </div>

                    {/* Główne zdjęcie — swipe sideways to browse, down to close */}
                    <div
                        ref={viewportRef}
                        className="relative h-full w-full overflow-hidden"
                        style={{ touchAction: 'none', cursor: count > 1 ? 'grab' : undefined }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                    >
                        <motion.div className="absolute inset-0" style={{ x, y, scale: dismissScale }}>
                            {visible.map(({ image, index }) => (
                                <div
                                    key={index}
                                    data-slide=""
                                    className="absolute inset-y-0 flex flex-col items-center justify-center"
                                    style={{ left: index * width, width: width || '100%' }}
                                >
                                    <img
                                        src={urlFor(image).width(1200).url()}
                                        alt={image.alt || `Zdjęcie ${index + 1}`}
                                        draggable={false}
                                        className="max-w-full max-h-[80vh] select-none object-contain"
                                        style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', background: '#fff' }}
                                    />

                                    {/* Podpis zdjęcia */}
                                    {image.caption && (
                                        <div className="ct-body mt-4 text-center max-w-lg mx-auto"
                                            style={{ padding: '10px 14px', background: '#fff', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)' }}>
                                            {image.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
