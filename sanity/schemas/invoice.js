export default {
    name: 'invoice',
    title: 'Faktury',
    type: 'document',
    fields: [
        {
            name: 'invoiceNumber',
            title: 'Numer faktury',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'client',
            title: 'Klient',
            type: 'reference',
            to: [{type: 'client'}],
            validation: Rule => Rule.required(),
        },
        {
            name: 'issueDate',
            title: 'Data wystawienia',
            type: 'date',
            validation: Rule => Rule.required(),
        },
        {
            name: 'dueDate',
            title: 'Termin płatności',
            type: 'date',
            validation: Rule => Rule.required(),
        },
        {
            name: 'amount',
            title: 'Kwota (netto)',
            type: 'number',
            validation: Rule => Rule.required().positive(),
        },
        {
            name: 'vatRate',
            title: 'Stawka VAT (%)',
            type: 'number',
            initialValue: 23,
            validation: Rule => Rule.required().min(0).max(100),
        },
        {
            name: 'totalAmount',
            title: 'Kwota brutto',
            type: 'number',
            readOnly: true,
            options: {
                // Wartość obliczana przy zapisie dokumentu
            },
        },
        {
            name: 'status',
            title: 'Status płatności',
            type: 'string',
            options: {
                list: [
                    {title: 'Wystawiona', value: 'issued'},
                    {title: 'Opłacona', value: 'paid'},
                    {title: 'Po terminie', value: 'overdue'},
                    {title: 'Anulowana', value: 'cancelled'}
                ],
            },
            initialValue: 'issued',
            validation: Rule => Rule.required(),
        },
        {
            name: 'paymentDate',
            title: 'Data płatności',
            type: 'date',
            hidden: ({document}) => document?.status !== 'paid',
        },
        {
            name: 'items',
            title: 'Pozycje faktury',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'description', title: 'Opis', type: 'string', validation: Rule => Rule.required()},
                        {name: 'quantity', title: 'Ilość', type: 'number', initialValue: 1, validation: Rule => Rule.required().positive()},
                        {name: 'unitPrice', title: 'Cena jednostkowa (netto)', type: 'number', validation: Rule => Rule.required().positive()},
                    ],
                    preview: {
                        select: {
                            title: 'description',
                            subtitle: 'unitPrice',
                            quantity: 'quantity'
                        },
                        prepare({title, subtitle, quantity}) {
                            return {
                                title,
                                subtitle: `${quantity} x ${subtitle} PLN`
                            }
                        }
                    }
                }
            ],
            validation: Rule => Rule.required().min(1)
        },
        {
            name: 'notes',
            title: 'Uwagi',
            type: 'text',
        },
        {
            name: 'attachmentURL',
            title: 'Link do faktury (PDF)',
            type: 'url',
        },
        {
            name: 'sentToClient',
            title: 'Wysłana do klienta',
            type: 'boolean',
            initialValue: false,
        }
    ],
    preview: {
        select: {
            title: 'invoiceNumber',
            subtitle: 'client.name',
            status: 'status',
            amount: 'totalAmount'
        },
        prepare({title, subtitle, status, amount}) {
            const statusMap = {
                issued: '⌛ Wystawiona',
                paid: '✓ Opłacona',
                overdue: '⚠️ Po terminie',
                cancelled: '❌ Anulowana'
            }
            return {
                title: `Faktura ${title}`,
                subtitle: `${statusMap[status] || status} - ${subtitle}, ${amount || 0} PLN`
            }
        }
    }
}