export default {
    name: 'portfolioProject',
    title: 'Projekty Portfolio',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Nazwa Projektu',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'client',
            title: 'Nazwa Klienta',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'mainImage',
            title: 'Zdjęcie Główne',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'categories',
            title: 'Kategorie Usług',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'serviceCategory' } }],
            validation: Rule => Rule.required().min(1)
        },
        {
            name: 'description',
            title: 'Opis Projektu',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            name: 'publishedAt',
            title: 'Data Publikacji',
            type: 'datetime',
            initialValue: (new Date()).toISOString()
        }
    ],
    preview: {
        select: {
            title: 'title',
            client: 'client',
            media: 'mainImage'
        },
        prepare(selection) {
            const { title, client, media } = selection
            return {
                title,
                subtitle: `Klient: ${client || 'Brak informacji o kliencie'}`,
                media
            }
        }
    }
}