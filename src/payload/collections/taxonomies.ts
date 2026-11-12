import type { CollectionConfig, Field } from 'payload';
import { anyone, editorsOnly } from '../access';
import { slugField } from '../fields/slug';
import { revalidateHooks } from '../revalidate';

/** Sanity document id, kept so the import script can re-run and update instead of duplicating. */
export const sanityIdField: Field = {
    name: 'sanityId',
    type: 'text',
    unique: true,
    index: true,
    admin: { readOnly: true, hidden: true },
};

const publicRead = { read: anyone, create: editorsOnly, update: editorsOnly, delete: editorsOnly };

export const Users: CollectionConfig = {
    slug: 'users',
    labels: { singular: 'Użytkownik', plural: 'Użytkownicy' },
    admin: { group: 'Ustawienia', useAsTitle: 'email' },
    auth: true,
    fields: [{ name: 'name', label: 'Imię i nazwisko', type: 'text' }],
};

export const Authors: CollectionConfig = {
    slug: 'authors',
    labels: { singular: 'Autor', plural: 'Autorzy' },
    admin: { group: 'Blog', useAsTitle: 'name' },
    access: publicRead,
    hooks: revalidateHooks,
    fields: [
        { name: 'name', label: 'Imię i nazwisko', type: 'text', required: true },
        slugField('name'),
        { name: 'image', label: 'Zdjęcie', type: 'upload', relationTo: 'media' },
        { name: 'role', label: 'Stanowisko', type: 'text' },
        { name: 'bio', label: 'Bio', type: 'richText' },
        {
            name: 'socialLinks',
            label: 'Profile społecznościowe',
            type: 'group',
            fields: [
                { name: 'linkedin', label: 'LinkedIn', type: 'text' },
                { name: 'twitter', label: 'Twitter / X', type: 'text' },
                { name: 'instagram', label: 'Instagram', type: 'text' },
            ],
        },
        sanityIdField,
    ],
};

export const BlogCategories: CollectionConfig = {
    slug: 'blog-categories',
    labels: { singular: 'Kategoria bloga', plural: 'Kategorie bloga' },
    admin: { group: 'Blog', useAsTitle: 'title' },
    access: publicRead,
    hooks: revalidateHooks,
    fields: [
        { name: 'title', label: 'Nazwa', type: 'text', required: true },
        slugField(),
        { name: 'description', label: 'Opis', type: 'textarea' },
        {
            name: 'color',
            label: 'Kolor etykiety',
            type: 'select',
            options: ['blue', 'green', 'red', 'purple', 'yellow', 'gray'].map((value) => ({ label: value, value })),
        },
        sanityIdField,
    ],
};

export const ServiceCategories: CollectionConfig = {
    slug: 'service-categories',
    labels: { singular: 'Kategoria usług', plural: 'Kategorie usług' },
    admin: { group: 'Portfolio', useAsTitle: 'title' },
    access: publicRead,
    hooks: revalidateHooks,
    fields: [
        { name: 'title', label: 'Nazwa', type: 'text', required: true },
        slugField(),
        { name: 'description', label: 'Opis', type: 'textarea' },
        sanityIdField,
    ],
};

export const TECHNOLOGY_GROUPS = [
    { label: 'Platforma e-commerce', value: 'ecommerce' },
    { label: 'CMS', value: 'cms' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend / infrastruktura', value: 'backend' },
    { label: 'Marketing automation / CRM', value: 'marketing' },
    { label: 'Analityka i reklama', value: 'analytics' },
    { label: 'Integracje i inne', value: 'other' },
] as const;

/** Technologies used in projects (WooCommerce, Next.js, SALESmanago…), attached to portfolio projects. */
export const Technologies: CollectionConfig = {
    slug: 'technologies',
    labels: { singular: 'Technologia', plural: 'Technologie' },
    admin: { group: 'Portfolio', useAsTitle: 'title', defaultColumns: ['title', 'group', 'updatedAt'] },
    access: publicRead,
    hooks: revalidateHooks,
    defaultSort: 'title',
    fields: [
        { name: 'title', label: 'Nazwa', type: 'text', required: true },
        slugField(),
        { name: 'group', label: 'Grupa', type: 'select', options: [...TECHNOLOGY_GROUPS] },
        { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media' },
        { name: 'website', label: 'Strona technologii', type: 'text' },
        { name: 'description', label: 'Krótki opis', type: 'textarea' },
        {
            name: 'projects',
            label: 'Projekty z tą technologią',
            type: 'join',
            collection: 'portfolio-projects',
            on: 'technologies',
        },
    ],
};
