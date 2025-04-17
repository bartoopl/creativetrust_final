// sanity/schemas/portfolioProject.js
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
            name: 'galleryImages',
            title: 'Galeria Zdjęć',
            description: 'Dodatkowe zdjęcia projektu do wyświetlenia w galerii',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Tekst alternatywny',
                            type: 'string',
                            options: {
                                isHighlighted: true
                            },
                            validation: Rule => Rule.required()
                        },
                        {
                            name: 'caption',
                            title: 'Podpis',
                            type: 'string',
                            options: {
                                isHighlighted: true
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: 'projectUrl',
            title: 'Adres projektu',
            description: 'Link do zrealizowanego projektu (opcjonalnie)',
            type: 'url',
        },
        {
            name: 'scopeOfWork',
            title: 'Zakres prac',
            description: 'Lista rzeczy, które zostały wykonane w ramach projektu',
            type: 'array',
            of: [{ type: 'string' }],
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
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'H2', value: 'h2'},
                        {title: 'H3', value: 'h3'},
                        {title: 'H4', value: 'h4'}
                    ],
                    marks: {
                        decorators: [
                            {title: 'Strong', value: 'strong'},
                            {title: 'Emphasis', value: 'em'},
                            {title: 'Underline', value: 'underline'}
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL'
                                    },
                                    {
                                        name: 'blank',
                                        type: 'boolean',
                                        title: 'Open in new tab',
                                        initialValue: true
                                    }
                                ]
                            }
                        ]
                    },
                    lists: [
                        {title: 'Bullet', value: 'bullet'},
                        {title: 'Number', value: 'number'}
                    ]
                },
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative Text',
                            description: 'Opis dla osób niewidomych i wyszukiwarek'
                        }
                    ]
                }
            ],
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