import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyAuth } from '@/lib/auth-utils';

/**
 * Pobiera metryki kampanii reklamowych dla zalogowanego klienta w określonym zakresie czasu
 */
export async function GET(request: Request) {
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
        
        // Pobierz parametry zapytania
        const { searchParams } = new URL(request.url);
        const campaignId = searchParams.get('campaignId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];
        
        // Jeśli nie podano kampanii, pobierz zagregowane dane dla wszystkich kampanii klienta
        if (!campaignId) {
            // Pobierz wszystkie kampanie klienta
            const metrics = await client.fetch(`
                *[_type == "adsCampaign" && client._ref == $clientId] {
                    _id,
                    name,
                    platform,
                    "metrics": *[_type == "adsMetrics" && campaign._ref == ^._id && date >= $startDate && date <= $endDate] | order(date asc) {
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
            `, { 
                clientId, 
                startDate: startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0], 
                endDate 
            });
            
            return NextResponse.json({
                success: true,
                metrics
            });
        }
        
        // Pobierz metryki dla konkretnej kampanii
        const metrics = await client.fetch(`
            *[_type == "adsMetrics" && campaign._ref == $campaignId && date >= $startDate && date <= $endDate] | order(date asc) {
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
        `, { 
            campaignId, 
            startDate: startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0], 
            endDate 
        });

        return NextResponse.json({
            success: true,
            metrics
        });
    } catch (error) {
        console.error('Error fetching client campaign metrics:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Wystąpił błąd podczas pobierania metryk kampanii' 
            },
            { status: 500 }
        );
    }
}