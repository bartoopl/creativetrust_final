export default {
  name: 'adsMetrics',
  title: 'Statystyki kampanii',
  type: 'document',
  fields: [
    {
      name: 'campaign',
      title: 'Kampania',
      type: 'reference',
      to: [{ type: 'adsCampaign' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Data',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'impressions',
      title: 'Wyświetlenia',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'clicks',
      title: 'Kliknięcia',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'ctr',
      title: 'CTR (%)',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'averageCpc',
      title: 'Średni CPC',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'cost',
      title: 'Koszt',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'conversions',
      title: 'Konwersje',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'conversionValue',
      title: 'Wartość konwersji',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'costPerConversion',
      title: 'Koszt na konwersję',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'roas',
      title: 'ROAS',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'campaign.name',
      subtitle: 'date'
    }
  }
}