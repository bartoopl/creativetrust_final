import type { PortableTextBlock } from '@/lib/markdown/portable-text';

// Typy dla portfolio
export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    client: string;
    mainImage: any;
    galleryImages?: any[];
    projectUrl?: string;
    scopeOfWork: string[];
    categories: Category[];
    technologies?: Technology[];
    /** Portable Text (converted from the CMS rich text); plain text in a few old entries. */
    description: PortableTextBlock[] | string;
    publishedAt: string;
}

export interface Technology {
    _id: string;
    title: string;
    slug: { current: string };
    group?: string | null;
    website?: string | null;
    logo?: unknown;
}

export interface Category {
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
}

// Typy dla Lightbox
export interface ImageWithCaption {
    _key?: string;
    alt?: string;
    caption?: string;
    [key: string]: any; // dla pozostałych pól Sanity
}