import { GoogleAdsApi } from 'google-ads-api';
import { client as sanityClient } from './sanity';

// Konfiguracja z zmiennych środowiskowych lub bezpośrednio z konfiguracji
interface GoogleAdsConfig {
  client_id: string;
  client_email: string;
  private_key: string;
  developer_token: string;
  customer_id: string;
}

// Konfiguracja z zmiennych środowiskowych
const googleAdsConfig: GoogleAdsConfig = {
  client_id: process.env.GOOGLE_ADS_CLIENT_ID || '',
  client_email: process.env.GOOGLE_ADS_CLIENT_EMAIL || '',
  private_key: process.env.GOOGLE_ADS_PRIVATE_KEY || '',
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
};

// Inicjalizacja klienta Google Ads
let googleAdsClient: any = null;

try {
  // Inicjalizacja klienta tylko gdy są dostępne potrzebne zmienne środowiskowe
  if (googleAdsConfig.client_id && googleAdsConfig.private_key && googleAdsConfig.developer_token) {
    const googleAdsApi = new GoogleAdsApi({
      client_id: googleAdsConfig.client_id,
      client_secret: googleAdsConfig.private_key,
      developer_token: googleAdsConfig.developer_token,
    });

    if (googleAdsConfig.customer_id) {
      googleAdsClient = googleAdsApi.getClient({
        customer_id: googleAdsConfig.customer_id,
        login_customer_id: googleAdsConfig.customer_id,
      });
    } else {
      console.log('Brak ID klienta Google Ads - klient nie został zainicjalizowany');
    }
  } else {
    console.log('Brak wymaganych zmiennych środowiskowych dla Google Ads API');
  }
} catch (error) {
  console.error('Błąd inicjalizacji Google Ads API:', error);
}

/**
 * Pobiera dane kampanii dla określonego klienta
 */
export async function fetchCampaignsForClient(clientId: string): Promise<any[]> {
  if (!googleAdsClient) {
    console.log('Google Ads API Client nie jest zainicjalizowany');
    
    // W środowisku produkcyjnym lub testowym zwracamy pustą tablicę
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      return [];
    }
    
    // W trybie deweloperskim możemy zwrócić testowe dane
    return [
      {
        campaign: {
          id: 'test-campaign-1',
          name: 'Testowa Kampania 1',
          status: 'ENABLED',
          start_date: '2025-01-01',
          end_date: '2025-12-31'
        },
        metrics: {
          impressions: '1000',
          clicks: '50',
          ctr: '5.0',
          average_cpc: '2000000', // 2.0 PLN w mikro-jednostkach
          cost_micros: '100000000', // 100.0 PLN w mikro-jednostkach
          conversions: '3',
          conversions_value: '1500',
          cost_per_conversion: '33333333' // 33.33 PLN w mikro-jednostkach
        }
      }
    ];
  }

  try {
    // Pobierz ID konta reklamowego klienta z Sanity
    const clientData = await sanityClient.fetch(
      `*[_type == "client" && _id == $clientId][0]{
        "adsCampaigns": *[_type == "adsCampaign" && references(^._id) && platform == "google_ads"]{
          externalId
        }
      }`,
      { clientId }
    );

    if (!clientData || !clientData.adsCampaigns || clientData.adsCampaigns.length === 0) {
      console.log('Nie znaleziono kampanii Google Ads dla klienta w Sanity');
      return [];
    }

    // Mapuj ID kampanii
    const campaignIds = clientData.adsCampaigns.map((campaign: any) => campaign.externalId);

    // Pobierz dane kampanii z Google Ads API
    const query = `
      SELECT 
        campaign.id, 
        campaign.name, 
        campaign.status, 
        campaign.start_date, 
        campaign.end_date, 
        campaign.bidding_strategy_type, 
        metrics.impressions, 
        metrics.clicks, 
        metrics.ctr, 
        metrics.average_cpc, 
        metrics.cost_micros, 
        metrics.conversions, 
        metrics.conversions_value, 
        metrics.cost_per_conversion 
      FROM campaign 
      WHERE campaign.id IN (${campaignIds.join(',')})
    `;

    const response = await googleAdsClient.query(query);
    return response;
  } catch (error) {
    console.error('Błąd pobierania danych z Google Ads API:', error);
    return [];
  }
}

/**
 * Funkcja odpowiedzialna za codzienną aktualizację danych z Google Ads.
 * Można ją wywołać z cron job.
 */
export async function syncGoogleAdsData(): Promise<void> {
  // Sprawdź czy klient API jest dostępny
  if (!googleAdsClient) {
    console.log('Google Ads API Client nie jest zainicjalizowany - pomijanie synchronizacji');
    return;
  }
  try {
    // 1. Pobierz wszystkie kampanie Google Ads z Sanity
    const campaigns = await sanityClient.fetch(
      `*[_type == "adsCampaign" && platform == "google_ads"]{
        _id,
        externalId,
        client->{_id}
      }`
    );

    if (!campaigns || campaigns.length === 0) {
      console.log('Nie znaleziono kampanii Google Ads w Sanity');
      return;
    }

    // Grupuj kampanie według klientów, aby zminimalizować liczbę zapytań do API
    const clientCampaigns = campaigns.reduce((acc: any, campaign: any) => {
      if (!acc[campaign.client._id]) {
        acc[campaign.client._id] = [];
      }
      acc[campaign.client._id].push(campaign);
      return acc;
    }, {});

    // Dla każdego klienta, pobierz dane kampanii i zapisz je w Sanity
    for (const clientId in clientCampaigns) {
      const adsData = await fetchCampaignsForClient(clientId);
      
      // Przetwórz otrzymane dane i zapisz je w Sanity
      for (const campaignData of adsData) {
        const campaign = campaigns.find((c: any) => c.externalId === campaignData.campaign.id);
        
        if (campaign) {
          // Zapisz metryki w Sanity
          await sanityClient.createOrReplace({
            _type: 'adsMetrics',
            campaign: {
              _type: 'reference',
              _ref: campaign._id
            },
            date: new Date().toISOString().split('T')[0],
            impressions: parseInt(campaignData.metrics.impressions) || 0,
            clicks: parseInt(campaignData.metrics.clicks) || 0,
            ctr: parseFloat(campaignData.metrics.ctr) || 0,
            averageCpc: parseFloat(campaignData.metrics.average_cpc) / 1000000 || 0, // Convert from micros
            cost: parseFloat(campaignData.metrics.cost_micros) / 1000000 || 0, // Convert from micros
            conversions: parseFloat(campaignData.metrics.conversions) || 0,
            conversionValue: parseFloat(campaignData.metrics.conversions_value) || 0,
            costPerConversion: parseFloat(campaignData.metrics.cost_per_conversion) / 1000000 || 0, // Convert from micros
            roas: parseFloat(campaignData.metrics.conversions_value) / (parseFloat(campaignData.metrics.cost_micros) / 1000000) || 0
          });
          
          // Aktualizuj kampanię w Sanity
          await sanityClient.patch(campaign._id)
            .set({
              name: campaignData.campaign.name,
              status: campaignData.campaign.status.toLowerCase(),
              startDate: campaignData.campaign.start_date,
              endDate: campaignData.campaign.end_date || null,
              lastUpdated: new Date().toISOString()
            })
            .commit();
        }
      }
    }

    console.log('Synchronizacja danych z Google Ads zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas synchronizacji danych z Google Ads:', error);
  }
}