import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyAuth } from '@/lib/auth-utils';

/**
 * Pobiera kampanie reklamowe przypisane do zalogowanego klienta
 */
export async function GET() {
    try {
        // Weryfikacja autentykacji klienta
        const auth = await verifyAuth();
        if (!auth.authenticated || !auth.client) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const clientId = auth.client._id;

        // Pobierz kampanie reklamowe klienta z Sanity wraz z najnowszymi metrykami
        const campaigns = await client.fetch(`
            *[_type == "adsCampaign" && client._ref == $clientId] {
                _id,
                name,
                platform,
                status,
                startDate,
                endDate,
                budget,
                currency,
                lastUpdated,
                "metrics": *[_type == "adsMetrics" && campaign._ref == ^._id] | order(date desc)[0] {
                    date,
                    impressions,
                    clicks,
                    ctr,
                    averageCpc,
                    cost,
                    conversions,
                    conversionValue,
                    costPerConversion,
                    roas
                }
            }
        `, { clientId });

        return NextResponse.json({
            success: true,
            campaigns: campaigns || []
        });
    } catch (error) {
        console.error('Error fetching client campaigns:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Wystąpił błąd podczas pobierania danych kampanii' 
            },
            { status: 500 }
        );
    }
}