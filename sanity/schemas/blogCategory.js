export default {
    name: 'blogCategory',
    title: 'Blog Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
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
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'color',
            title: 'Color',
            description: 'Color for category labels',
            type: 'string',
            options: {
                list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Red', value: 'red' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Gray', value: 'gray' },
                ],
            },
        },
    ],
}