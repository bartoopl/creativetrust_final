"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    // Obsługa klawiszy strzałek i Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrevious();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Blokowanie scrollowania strony gdy lightbox jest otwarty
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, currentIndex, images.length]);

    // Przejście do następnego zdjęcia
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    // Przejście do poprzedniego zdjęcia
    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Zamknięcie lightboxa po kliknięciu w tło
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 md:p-10"
                    onClick={handleBackdropClick}
                >
                    {/* Przycisk zamknięcia */}
                    <button
                        className="absolute top-6 right-6 text-white z-10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
                        onClick={onClose}
                        aria-label="Zamknij"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Przyciski nawigacji */}
                    {images.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
                                onClick={handlePrevious}
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
                                className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
                                onClick={handleNext}
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
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Główne zdjęcie */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="max-w-full max-h-full"
                        >
                            <img
                                src={urlFor(currentImage).width(1200).url()}
                                alt={currentImage.alt || `Zdjęcie ${currentIndex + 1}`}
                                className="max-w-full max-h-[85vh] object-contain"
                            />

                            {/* Podpis zdjęcia */}
                            {currentImage.caption && (
                                <div className="mt-4 text-center text-white bg-black bg-opacity-50 p-3 rounded-lg max-w-lg mx-auto">
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