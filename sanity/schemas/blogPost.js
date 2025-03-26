export default {
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required().min(5).max(100),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: Rule => Rule.required(),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            validation: Rule => Rule.required(),
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'blogCategory' } }],
        },
        {
            name: 'featured',
            title: 'Featured',
            description: 'Set to true if this is a featured article',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'Short summary of the article',
            validation: Rule => Rule.max(200),
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                            description: 'Important for SEO and accessibility.',
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
            ],
        },
        {
            name: 'estimatedReadingTime',
            title: 'Estimated Reading Time (minutes)',
            type: 'number',
            validation: Rule => Rule.integer().positive(),
        },
        {
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Title used for SEO (if different from main title)',
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            description: 'Description used for SEO',
            validation: Rule => Rule.max(160),
        },
    ],
    orderings: [
        {
            title: 'Publication Date, New',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Publication Date, Old',
            name: 'publishedAtAsc',
            by: [{ field: 'publishedAt', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
            date: 'publishedAt',
        },
        prepare(selection) {
            const { author, date } = selection;
            return Object.assign({}, selection, {
                subtitle: author && date ? `by ${author} on ${new Date(date).toLocaleDateString()}` : '',
            });
        },
    },
}