export default {
    name: 'serviceCategory',
    title: 'Kategorie Usług',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Nazwa',
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
            name: 'description',
            title: 'Opis',
            type: 'text',
        }
    ]
}