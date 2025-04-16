export default {
  name: 'adsCampaign',
  title: 'Kampanie reklamowe',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nazwa kampanii',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'client',
      title: 'Klient',
      type: 'reference',
      to: [{ type: 'client' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'platform',
      title: 'Platforma',
      type: 'string',
      options: {
        list: [
          { title: 'Google Ads', value: 'google_ads' },
          { title: 'Meta Ads', value: 'meta_ads' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'externalId',
      title: 'ID kampanii w systemie zewnętrznym',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aktywna', value: 'active' },
          { title: 'Wstrzymana', value: 'paused' },
          { title: 'Zakończona', value: 'ended' }
        ]
      }
    },
    {
      name: 'startDate',
      title: 'Data rozpoczęcia',
      type: 'date'
    },
    {
      name: 'endDate',
      title: 'Data zakończenia',
      type: 'date'
    },
    {
      name: 'budget',
      title: 'Budżet',
      type: 'number'
    },
    {
      name: 'currency',
      title: 'Waluta',
      type: 'string',
      initialValue: 'PLN'
    },
    {
      name: 'lastUpdated',
      title: 'Ostatnia aktualizacja danych',
      type: 'datetime',
      readOnly: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'platform'
    }
  }
}