import type { TextField } from 'payload';
import { slugify } from '../slugify';

/**
 * Unique URL slug. The public URL is built from it, so it is filled from the
 * source field only when left empty — editing a title never moves a live page.
 */
export function slugField(sourceField = 'title'): TextField {
    return {
        name: 'slug',
        label: 'Slug (adres URL)',
        type: 'text',
        required: true,
        unique: true,
        index: true,
        admin: {
            position: 'sidebar',
            description: 'Część adresu strony. Zmiana slugu opublikowanej strony zmienia jej URL — dodaj wtedy przekierowanie.',
        },
        hooks: {
            beforeValidate: [
                ({ value, data }) => {
                    if (typeof value === 'string' && value.trim()) return value.trim();
                    const source = data?.[sourceField];
                    return typeof source === 'string' ? slugify(source) : value;
                },
            ],
        },
    };
}
