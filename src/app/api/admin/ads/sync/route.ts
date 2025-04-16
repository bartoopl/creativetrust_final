import { NextResponse } from 'next/server';
import { syncGoogleAdsData } from '@/lib/google-ads-api';

/**
 * Endpoint do ręcznej synchronizacji danych z Google Ads
 * Docelowo można go też używać w schedulerze (np. cron)
 */
export async function POST(request: Request) {
    try {
        const { headers } = request;
        const apiKey = headers.get('x-api-key');
        
        // Prosta weryfikacja API key - można to rozbudować
        if (apiKey !== process.env.ADS_SYNC_API_KEY) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }
        
        // Synchronizuj dane z Google Ads
        await syncGoogleAdsData();
        
        return NextResponse.json({
            success: true,
            message: 'Google Ads data synced successfully'
        });
    } catch (error) {
        console.error('Error syncing ads data:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Error occurred while syncing ads data',
                error: error instanceof Error ? error.message : 'Unknown error' 
            },
            { status: 500 }
        );
    }
}