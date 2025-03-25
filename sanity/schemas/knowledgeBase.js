// schemas/knowledgeBase.js
export default {
    name: 'knowledgeBase',
    title: 'Baza wiedzy',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tytuł',
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
            name: 'letter',
            title: 'Litera alfabetu',
            type: 'string',
            options: {
                list: [
                    {title: 'A', value: 'a'},
                    {title: 'B', value: 'b'},
                    {title: 'C', value: 'c'},
                    {title: 'D', value: 'd'},
                    {title: 'E', value: 'e'},
                    {title: 'F', value: 'f'},
                    {title: 'G', value: 'g'},
                    {title: 'H', value: 'h'},
                    {title: 'I', value: 'i'},
                    {title: 'J', value: 'j'},
                    {title: 'K', value: 'k'},
                    {title: 'L', value: 'l'},
                    {title: 'M', value: 'm'},
                    {title: 'N', value: 'n'},
                    {title: 'O', value: 'o'},
                    {title: 'P', value: 'p'},
                    {title: 'Q', value: 'q'},
                    {title: 'R', value: 'r'},
                    {title: 'S', value: 's'},
                    {title: 'T', value: 't'},
                    {title: 'U', value: 'u'},
                    {title: 'V', value: 'v'},
                    {title: 'W', value: 'w'},
                    {title: 'X', value: 'x'},
                    {title: 'Y', value: 'y'},
                    {title: 'Z', value: 'z'},
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'shortDescription',
            title: 'Krótki opis',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required().max(160)
                .warning('Krótki opis powinien być zwięzły i nie przekraczać 160 znaków dla optymalnego SEO')
        },
        {
            name: 'content',
            title: 'Treść',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'H2', value: 'h2'},
                        {title: 'H3', value: 'h3'},
                        {title: 'H4', value: 'h4'},
                    ],
                    lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
                    marks: {
                        decorators: [
                            {title: 'Strong', value: 'strong'},
                            {title: 'Emphasis', value: 'em'},
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
                                        title: 'Otwórz w nowej karcie',
                                        name: 'blank',
                                        type: 'boolean'
                                    }
                                ]
                            }
                        ]
                    }
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
                            title: 'Tekst alternatywny',
                            validation: Rule => Rule.required().warning('Tekst alternatywny jest wymagany dla SEO')
                        }
                    ]
                }
            ]
        },
        {
            name: 'tags',
            title: 'Tagi',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            validation: Rule => Rule.max(60).warning('SEO Title nie powinien przekraczać 60 znaków')
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.max(160).warning('SEO Description nie powinien przekraczać 160 znaków')
        },
        {
            name: 'publishedAt',
            title: 'Data publikacji',
            type: 'datetime',
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'title',
            letter: 'letter',
        },
        prepare(selection) {
            const {title, letter} = selection
            return {
                title: title,
                subtitle: `Litera: ${letter?.toUpperCase()}`
            }
        }
    },
    orderings: [
        {
            title: 'Alfabetycznie wg litery',
            name: 'letterAsc',
            by: [
                {field: 'letter', direction: 'asc'}
            ]
        },
        {
            title: 'Alfabetycznie wg tytułu',
            name: 'titleAsc',
            by: [
                {field: 'title', direction: 'asc'}
            ]
        },
        {
            title: 'Data publikacji, od najnowszych',
            name: 'publishedAtDesc',
            by: [
                {field: 'publishedAt', direction: 'desc'}
            ]
        }
    ]
}