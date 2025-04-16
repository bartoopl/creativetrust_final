import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

/**
 * Endpoint do pobierania wszystkich kampanii reklamowych
 */
export async function GET() {
    try {
        // Weryfikacja dostępu admin (tutaj można dodać bardziej zaawansowaną weryfikację)
        
        // Pobierz wszystkie kampanie z Sanity
        const campaigns = await client.fetch(`
            *[_type == "adsCampaign"] {
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
                client->{_id, name, email}
            }
        `);

        return NextResponse.json({
            success: true,
            campaigns
        });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Error fetching campaigns' 
            },
            { status: 500 }
        );
    }
}

/**
 * Endpoint do tworzenia nowej kampanii reklamowej
 */
export async function POST(request: Request) {
    try {
        // Weryfikacja dostępu admin
        
        // Odczytaj dane z żądania
        const body = await request.json();
        const { 
            name, 
            platform, 
            status, 
            startDate, 
            endDate, 
            budget, 
            currency, 
            externalId, 
            clientId 
        } = body;
        
        // Walidacja
        if (!name || !platform || !externalId || !clientId) {
            return NextResponse.json(
                { success: false, message: 'Brakuje wymaganych pól' },
                { status: 400 }
            );
        }
        
        // Sprawdź czy klient istnieje
        const clientExists = await client.fetch(
            `*[_type == "client" && _id == $clientId][0]._id`,
            { clientId }
        );
        
        if (!clientExists) {
            return NextResponse.json(
                { success: false, message: 'Klient nie istnieje' },
                { status: 400 }
            );
        }
        
        // Sprawdź czy kampania o takim externalId już istnieje
        const campaignExists = await client.fetch(
            `*[_type == "adsCampaign" && externalId == $externalId][0]._id`,
            { externalId }
        );
        
        if (campaignExists) {
            return NextResponse.json(
                { success: false, message: 'Kampania o takim ID już istnieje' },
                { status: 400 }
            );
        }
        
        // Utwórz nową kampanię
        const newCampaign = await client.create({
            _type: 'adsCampaign',
            name,
            platform,
            status: status || 'active',
            startDate,
            endDate,
            budget,
            currency: currency || 'PLN',
            externalId,
            lastUpdated: new Date().toISOString(),
            client: {
                _type: 'reference',
                _ref: clientId
            }
        });
        
        return NextResponse.json({
            success: true,
            message: 'Kampania została utworzona',
            campaign: newCampaign
        });
    } catch (error) {
        console.error('Error creating campaign:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Error creating campaign' 
            },
            { status: 500 }
        );
    }
}