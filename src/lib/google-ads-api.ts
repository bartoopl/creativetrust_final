import { GoogleAdsApi, GoogleAdsApiClient } from 'google-ads-api';
import { client as sanityClient } from './sanity';

// Konfiguracja z zmiennych środowiskowych lub bezpośrednio z konfiguracji
interface GoogleAdsConfig {
  client_id: string;
  client_email: string;
  private_key: string;
  developer_token: string;
  customer_id: string;
}

// Konfiguracja z kluczy serwisowych
const googleAdsConfig: GoogleAdsConfig = {
  client_id: "100321284149936925533",
  client_email: "creativetrustapp@creativetrust.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuD5XMamiH272i\n0Xrfx35XAGQ89ru6vvPouxwccJCupMcyF9EenXysFRAz34dgkn1PY4l+PoUgMGM8\nGUKxViGNd8LEAEeOQpIU256UWvFEXVznw7yIFq+6XXB+gcOr9woxJXUvIZzXamdW\npNV8HjRtwhna8DeTApmj3wV9kOsJHkhqFslg9sJ19Npi5XmEDV46hq1RpOkcGhsM\nEmavc4rNDfr4TcQi69Wzd3cpj+YKka3TW/cES+8vwaxcBbbkPIfG1u+1uiTzhWqF\nU/l23Guvl6PcVL38DasWN2A5x7lIYVbnF5K+xqcOcBlSkCW5LjBHSpjy2PoCfI17\nFPafW58PAgMBAAECggEAGqcPSIWeAPj1q5SeVzLHFo+xnvYm89GhK+iuxW9lGsuS\nJt+nvqOIf28a6TPX7m0v8UlBY0qJJvnR0CuMCfcxhxB+CyDXKXeUbSDd7O3qALkN\nF1NiWdz4xorf8AxzB7DPEjcf9PoVd+ohQw6qvpPUx7O6MstSry5C6WlRKr4shzDS\naab0l4DiweCtX6eGPFIP0ftWcIkhbHmCopuMeOIc9RrDckDHzIxeUDfZ89vwrODm\n/nSc+zxf1Z7fHzbQny//yOvAsp9p1b2pgvJZKApBT0cz8HDV9AzZcQ7kbv+0SGo+\nFUkvfGYLwPRmOoKamuEQgZou4uAX+oXS2yF+2Gn3LQKBgQDUZnI1bxmvL3X64Zut\nZDGuhjWjY4hcI98uSJnl83+r1Y3hlnAl2jnkSPjKoply63mmgd5aITP/EmbCxvdc\noqO0AKKaNcLIqfag6Vnf6KkHjIK6BLxp7JhmCvFi+AXa4MLBFiByOnFcpNWKAsPV\n2WFwoQbpc/WGe155dy9qx7+RHQKBgQDRymwjgC+g4Wmp0ZSLmaHm5iWZ3MaG2UeF\nF0r3CAjt9QDUzlNN72ehfoqtKfExlf23zVg6p7JMhYVpH30//ksi6MC+bDBOBwOl\n4jOshemDUGM8u/Ot3R9wx4+BglzjOjgRYyuzd4AsgG56RJ25GJkvz0jL39YrHBB5\nzWxY9KzFGwKBgGegC7xyFc/YkfDyvScdKPgC1ox+dPqvLaXBGgSMhg9pwyz6XoC5\nNWFhELCcH81ngRRxa/ABHwMlESmaNPjnCIM7hBlEfWG1OnRLJOQO+NiL/wOOZ/Yt\nzjSKxjYI16Jv4dSeXPod9UzDxsLskmr1AYsXpO2k+3a/HdqZAXNRPO8pAoGAehPI\niX/2Ny/0RJVoUzO7OpmCF96Yx694JsI/JTDPwWhoa20EnL1LGHaCS/G0IJ6fXW1o\ngflDj7PCxkFEqRBYuJ+oSSa7lSwPu1+9og7qqzcECDt2uR2LRh1aLIqncrJWHggP\nTgej1kGGCDAVd7gQq/l66uf9wGg8TiRzf/Ag+TECgYBcN5bHVuSMQF9X562CQlSD\nXVP2/NXnv7fYjzAhqNDR2HI2nGfv0TmRtz2DixSaHiFSBZAZ8DfUz/btLuXe72ap\nAAIUK2+El1Pzxt1MFMjuofy2b0trv2odKAgppWrw9RLseb68th3+ZabyUyZ99zxQ\nstKeKL1Wz2q5CybutlmXjA==\n-----END PRIVATE KEY-----\n",
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '', // Należy ustawić w zmiennych środowiskowych
  customer_id: process.env.GOOGLE_ADS_CLIENT_ID || '', // ID Klienta Ads (Customer ID)
};

// Inicjalizacja klienta Google Ads
let googleAdsClient: GoogleAdsApiClient | null = null;

try {
  const googleAdsApi = new GoogleAdsApi({
    client_id: googleAdsConfig.client_id,
    client_secret: googleAdsConfig.private_key,
    developer_token: googleAdsConfig.developer_token,
  });

  googleAdsClient = googleAdsApi.getClient({
    customer_id: googleAdsConfig.customer_id,
    login_customer_id: googleAdsConfig.customer_id,
  });
} catch (error) {
  console.error('Błąd inicjalizacji Google Ads API:', error);
}

/**
 * Pobiera dane kampanii dla określonego klienta
 */
export async function fetchCampaignsForClient(clientId: string): Promise<any[]> {
  if (!googleAdsClient) {
    console.error('Google Ads API Client nie jest zainicjalizowany');
    return [];
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