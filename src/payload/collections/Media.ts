import type { CollectionConfig } from 'payload';
import { anyone, editorsOnly } from '../access';
import { revalidateHooks } from '../revalidate';
import { slugify } from '../slugify';

export function safeFilename(name: string): string {
    const dot = name.lastIndexOf('.');
    const base = dot > 0 ? name.slice(0, dot) : name;
    const ext = dot > 0 ? name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    const slug = slugify(base, 80) || 'plik';
    return ext ? `${slug}.${ext}` : slug;
}

/**
 * Images and audio. Files live on the server's media volume (MEDIA_DIR). Each
 * image is stored with resized WebP variants so pages never ship the original:
 * `urlFor(image).width(n)` in src/lib/cms.ts picks the smallest variant ≥ n.
 */
export const Media: CollectionConfig = {
    slug: 'media',
    labels: { singular: 'Plik', plural: 'Media' },
    admin: { group: 'Treści', useAsTitle: 'filename', defaultColumns: ['filename', 'alt', 'updatedAt'] },
    access: { read: anyone, create: editorsOnly, update: editorsOnly, delete: editorsOnly },
    hooks: {
        ...revalidateHooks,
        // "Zdjęcie główne – Łódź.PNG" → "zdjecie-glowne-lodz.png": plain URLs, no encoding.
        beforeOperation: [
            ({ req, args }) => {
                if (req.file?.name) req.file.name = safeFilename(req.file.name);
                return args;
            },
        ],
    },
    upload: {
        staticDir: process.env.MEDIA_DIR || 'media',
        // Blog audio was uploaded to Sanity partly as .mp4 / .m4a.
        mimeTypes: ['image/*', 'audio/*', 'video/mp4'],
        focalPoint: true,
        imageSizes: [
            { name: 'thumbnail', width: 400, formatOptions: { format: 'webp', options: { quality: 80 } } },
            { name: 'card', width: 800, formatOptions: { format: 'webp', options: { quality: 80 } } },
            { name: 'large', width: 1200, formatOptions: { format: 'webp', options: { quality: 82 } } },
            { name: 'xlarge', width: 1920, formatOptions: { format: 'webp', options: { quality: 82 } } },
            {
                name: 'og',
                width: 1200,
                height: 630,
                fit: 'cover',
                formatOptions: { format: 'jpeg', options: { quality: 82 } },
            },
        ],
        adminThumbnail: 'thumbnail',
    },
    fields: [
        {
            name: 'alt',
            label: 'Tekst alternatywny',
            type: 'text',
            admin: { description: 'Opis obrazu dla osób niewidomych i wyszukiwarek.' },
        },
        { name: 'caption', label: 'Podpis', type: 'text' },
        {
            name: 'sanityAssetId',
            type: 'text',
            index: true,
            admin: { readOnly: true, hidden: true },
        },
    ],
};
