"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { ImageWithCaption } from '@/types'

interface LightboxProps {
    images: ImageWithCaption[];
    initialIndex?: number;
    onClose: () => void;
    isOpen: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose, isOpen }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [wasOpen, setWasOpen] = useState(isOpen);
    const dialogRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // Each time the lightbox opens, start from the image that was clicked.
    if (isOpen !== wasOpen) {
        setWasOpen(isOpen);
        if (isOpen) setCurrentIndex(initialIndex);
    }

    const count = images.length;
    const showNext = () => setCurrentIndex((prev) => (prev + 1) % count);
    const showPrevious = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

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
    }, [isOpen]);

    // Zamknięcie lightboxa po kliknięciu w tło
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const controlStyle: React.CSSProperties = {
        width: 44, height: 44, borderRadius: 'var(--radius-pill)', background: '#fff',
        border: '1px solid var(--line-strong)', color: 'var(--text)', cursor: 'pointer',
    };

    const currentImage = images[currentIndex];

    // Always rendered so AnimatePresence can play the exit when isOpen turns false.
    return (
        <AnimatePresence>
            {isOpen && currentImage && (
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

                    {/* Przyciski nawigacji */}
                    {count > 1 && (
                        <>
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
                        </>
                    )}

                    {/* Licznik zdjęć */}
                    <div className="ct-pill absolute bottom-6 left-1/2 -translate-x-1/2" aria-live="polite">
                        {currentIndex + 1} / {count}
                    </div>

                    {/* Główne zdjęcie */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            key={currentIndex}
                            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                            className="max-w-full max-h-full"
                        >
                            <img
                                src={urlFor(currentImage).width(1200).url()}
                                alt={currentImage.alt || `Zdjęcie ${currentIndex + 1}`}
                                className="max-w-full max-h-[80vh] object-contain"
                                style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', background: '#fff' }}
                            />

                            {/* Podpis zdjęcia */}
                            {currentImage.caption && (
                                <div className="ct-body mt-4 text-center max-w-lg mx-auto"
                                    style={{ padding: '10px 14px', background: '#fff', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)' }}>
                                    {currentImage.caption}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
