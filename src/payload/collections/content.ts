import type { CollectionConfig, Field } from 'payload';
import { editorsOnly, publishedOrEditor } from '../access';
import { slugField } from '../fields/slug';
import { revalidateHooks } from '../revalidate';
import { sanityIdField } from './taxonomies';

const drafts = { drafts: { autosave: false }, maxPerDoc: 25 };

const contentAccess = { read: publishedOrEditor, create: editorsOnly, update: editorsOnly, delete: editorsOnly };

const publishedAt = (required: boolean): Field => ({
    name: 'publishedAt',
    label: 'Data publikacji',
    type: 'date',
    required,
    index: true,
    defaultValue: () => new Date().toISOString(),
    admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
});

const seoFields: Field[] = [
    {
        type: 'collapsible',
        label: 'SEO',
        admin: { initCollapsed: true },
        fields: [
            {
                name: 'seoTitle',
                label: 'SEO title',
                type: 'text',
                admin: { description: 'Tytuł w Google, gdy ma się różnić od tytułu (do ~60 znaków).' },
            },
            {
                name: 'seoDescription',
                label: 'SEO description',
                type: 'textarea',
                admin: { description: 'Opis w Google (do ~160 znaków).' },
            },
        ],
    },
];

/** Blog: /blog/<slug> and /blog/<slug>.md. */
export const Posts: CollectionConfig = {
    slug: 'posts',
    labels: { singular: 'Wpis', plural: 'Blog' },
    admin: {
        group: 'Blog',
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishedAt', '_status'],
        preview: (doc) => (doc?.slug ? `/blog/${doc.slug}` : null),
    },
    access: contentAccess,
    versions: drafts,
    hooks: revalidateHooks,
    defaultSort: '-publishedAt',
    fields: [
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        slugField(),
        publishedAt(true),
        { name: 'author', label: 'Autor', type: 'relationship', relationTo: 'authors', required: true, admin: { position: 'sidebar' } },
        {
            name: 'categories',
            label: 'Kategorie',
            type: 'relationship',
            relationTo: 'blog-categories',
            hasMany: true,
            admin: { position: 'sidebar' },
        },
        { name: 'featured', label: 'Wyróżniony', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
        { name: 'mainImage', label: 'Zdjęcie główne', type: 'upload', relationTo: 'media' },
        { name: 'excerpt', label: 'Zajawka', type: 'textarea', maxLength: 300 },
        { name: 'content', label: 'Treść', type: 'richText' },
        { name: 'audioFile', label: 'Plik audio', type: 'upload', relationTo: 'media', filterOptions: { or: [{ mimeType: { contains: 'audio' } }, { mimeType: { equals: 'video/mp4' } }] } },
        { name: 'estimatedReadingTime', label: 'Czas czytania (min)', type: 'number', min: 1, admin: { position: 'sidebar' } },
        ...seoFields,
        sanityIdField,
    ],
};

/** Knowledge base: /baza-wiedzy/<slug>. */
export const KnowledgeBase: CollectionConfig = {
    slug: 'knowledge-base',
    labels: { singular: 'Hasło', plural: 'Baza wiedzy' },
    admin: {
        group: 'Treści',
        useAsTitle: 'title',
        defaultColumns: ['title', 'letter', '_status'],
        preview: (doc) => (doc?.slug ? `/baza-wiedzy/${doc.slug}` : null),
    },
    access: contentAccess,
    versions: drafts,
    hooks: revalidateHooks,
    defaultSort: 'title',
    fields: [
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        slugField(),
        {
            name: 'letter',
            label: 'Litera alfabetu',
            type: 'select',
            required: true,
            index: true,
            options: 'abcdefghijklmnopqrstuvwxyz'.split('').map((value) => ({ label: value.toUpperCase(), value })),
            admin: { position: 'sidebar' },
        },
        publishedAt(true),
        { name: 'shortDescription', label: 'Krótki opis', type: 'textarea', required: true },
        { name: 'content', label: 'Treść', type: 'richText' },
        { name: 'tags', label: 'Tagi', type: 'text', hasMany: true },
        ...seoFields,
        sanityIdField,
    ],
};

/** Portfolio: /portfolio/<slug>. */
export const PortfolioProjects: CollectionConfig = {
    slug: 'portfolio-projects',
    labels: { singular: 'Projekt', plural: 'Portfolio' },
    admin: {
        group: 'Portfolio',
        useAsTitle: 'title',
        defaultColumns: ['title', 'client', 'publishedAt', '_status'],
        preview: (doc) => (doc?.slug ? `/portfolio/${doc.slug}` : null),
    },
    access: contentAccess,
    versions: drafts,
    hooks: revalidateHooks,
    defaultSort: '-publishedAt',
    fields: [
        { name: 'title', label: 'Nazwa projektu', type: 'text', required: true },
        slugField(),
        publishedAt(false),
        { name: 'client', label: 'Klient', type: 'text', required: true },
        {
            name: 'categories',
            label: 'Kategorie usług',
            type: 'relationship',
            relationTo: 'service-categories',
            hasMany: true,
            required: true,
            admin: { position: 'sidebar' },
        },
        {
            name: 'technologies',
            label: 'Technologie',
            type: 'relationship',
            relationTo: 'technologies',
            hasMany: true,
            admin: {
                position: 'sidebar',
                description: 'Na czym zbudowano projekt. Nową technologię dodasz bezpośrednio z tego pola.',
            },
        },
        { name: 'projectUrl', label: 'Adres projektu', type: 'text' },
        { name: 'mainImage', label: 'Zdjęcie główne', type: 'upload', relationTo: 'media', required: true },
        {
            name: 'galleryImages',
            label: 'Galeria',
            type: 'upload',
            relationTo: 'media',
            hasMany: true,
            admin: { description: 'Tekst alternatywny i podpis ustawiasz w samym pliku.' },
        },
        {
            name: 'scopeOfWork',
            label: 'Zakres prac',
            type: 'text',
            hasMany: true,
            required: true,
        },
        { name: 'description', label: 'Opis projektu', type: 'richText', required: true },
        sanityIdField,
    ],
};
