import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

/**
 * Endpoint do pobierania szczegółów kampanii
 */
export async function GET(request: Request) {
    try {
        // Parsuj ID kampanii z URL
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const campaignId = pathSegments[pathSegments.length - 1];
        
        // Pobierz kampanię z Sanity
        const campaign = await client.fetch(`
            *[_type == "adsCampaign" && _id == $campaignId][0] {
                _id,
                name,
                platform,
                status,
                startDate,
                endDate,
                budget,
                currency,
                externalId,
                lastUpdated,
                client->{_id, name, email},
                "metrics": *[_type == "adsMetrics" && campaign._ref == ^._id] | order(date desc)[0..30] {
                    _id,
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
        `, { campaignId });
        
        if (!campaign) {
            return NextResponse.json(
                { success: false, message: 'Kampania nie została znaleziona' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            campaign
        });
    } catch (error) {
        console.error('Error fetching campaign:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Error fetching campaign' 
            },
            { status: 500 }
        );
    }
}

/**
 * Endpoint do aktualizacji kampanii
 */
export async function PATCH(request: Request) {
    try {
        // Parsuj ID kampanii z URL
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const campaignId = pathSegments[pathSegments.length - 1];
        
        // Odczytaj dane z żądania
        const body = await request.json();
        const { 
            name, 
            status, 
            startDate, 
            endDate, 
            budget, 
            currency
        } = body;
        
        // Sprawdź czy kampania istnieje
        const campaignExists = await client.fetch(
            `*[_type == "adsCampaign" && _id == $campaignId][0]._id`,
            { campaignId }
        );
        
        if (!campaignExists) {
            return NextResponse.json(
                { success: false, message: 'Kampania nie istnieje' },
                { status: 404 }
            );
        }
        
        // Aktualizuj kampanię
        const updatedCampaign = await client
            .patch(campaignId)
            .set({
                name: name,
                status: status,
                startDate: startDate,
                endDate: endDate,
                budget: budget,
                currency: currency,
                lastUpdated: new Date().toISOString()
            })
            .commit();
        
        return NextResponse.json({
            success: true,
            message: 'Kampania została zaktualizowana',
            campaign: updatedCampaign
        });
    } catch (error) {
        console.error('Error updating campaign:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Error updating campaign' 
            },
            { status: 500 }
        );
    }
}

/**
 * Endpoint do usuwania kampanii
 */
export async function DELETE(request: Request) {
    try {
        // Parsuj ID kampanii z URL
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const campaignId = pathSegments[pathSegments.length - 1];
        
        // Sprawdź czy kampania istnieje
        const campaignExists = await client.fetch(
            `*[_type == "adsCampaign" && _id == $campaignId][0]._id`,
            { campaignId }
        );
        
        if (!campaignExists) {
            return NextResponse.json(
                { success: false, message: 'Kampania nie istnieje' },
                { status: 404 }
            );
        }
        
        // Usuń powiązane metryki
        await client.delete({
            query: `*[_type == "adsMetrics" && campaign._ref == $campaignId]`,
            params: { campaignId }
        });
        
        // Usuń kampanię
        await client.delete(campaignId);
        
        return NextResponse.json({
            success: true,
            message: 'Kampania i powiązane metryki zostały usunięte'
        });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Error deleting campaign' 
            },
            { status: 500 }
        );
    }
}