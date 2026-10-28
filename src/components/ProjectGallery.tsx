"use client";

import { createContext, useContext, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import Lightbox from '@/components/Lightbox';
import { ImageWithCaption } from '@/types';

/**
 * Interactive layer of a portfolio project page. The page and its images are
 * server-rendered (crawlers see them without JavaScript); this only opens the
 * lightbox when an image is clicked. Image 0 is the main image, then the gallery.
 */
const GalleryContext = createContext<((index: number) => void) | null>(null);

export function ProjectGallery({ images, children }: { images: ImageWithCaption[]; children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const open = (next: number) => {
        setIndex(next);
        setIsOpen(true);
    };

    return (
        <GalleryContext.Provider value={open}>
            {children}
            {/* Stays mounted so the lightbox can animate its exit. */}
            {images.length > 0 && <Lightbox images={images} initialIndex={index} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        </GalleryContext.Provider>
    );
}

export function GalleryTrigger({ index, label, className, style, children }: { index: number; label: string; className?: string; style?: CSSProperties; children: ReactNode }) {
    const open = useContext(GalleryContext);
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open?.(index);
        }
    };
    return (
        <div role="button" tabIndex={0} aria-label={label} className={className} style={style} onClick={() => open?.(index)} onKeyDown={onKeyDown}>
            {children}
        </div>
    );
}
