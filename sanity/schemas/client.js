export default {
    name: 'client',
    title: 'Klienci',
    type: 'document',
    fields: [
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.required().email(),
        },
        {
            name: 'password',
            title: 'Hasło (zaszyfrowane)',
            type: 'string',
            hidden: true, // Ukryte w interfejsie Sanity
        },
        {
            name: 'name',
            title: 'Nazwa firmy / Imię i nazwisko',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'nip',
            title: 'NIP',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Adres',
            type: 'object',
            fields: [
                {name: 'street', title: 'Ulica i numer', type: 'string'},
                {name: 'postalCode', title: 'Kod pocztowy', type: 'string'},
                {name: 'city', title: 'Miasto', type: 'string'},
                {name: 'country', title: 'Kraj', type: 'string', initialValue: 'Polska'},
            ]
        },
        {
            name: 'phone',
            title: 'Telefon',
            type: 'string',
        },
        {
            name: 'contactPerson',
            title: 'Osoba kontaktowa',
            type: 'string',
        },
        {
            name: 'createdAt',
            title: 'Data utworzenia',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        },
        {
            name: 'active',
            title: 'Aktywny',
            type: 'boolean',
            initialValue: true,
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
        }
    }
}