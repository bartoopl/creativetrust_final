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
    description: string;
    publishedAt: string;
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