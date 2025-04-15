import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyAuth } from '@/lib/auth-utils';

export async function GET() {
    try {
        // Verify authentication
        const auth = await verifyAuth();

        if (!auth.authenticated || !auth.client) {
            return NextResponse.json(
                { success: false, message: 'Nieautoryzowany dostęp' },
                { status: 401 }
            );
        }

        // Fetch complete client profile from Sanity
        const clientProfile = await client.fetch(
            `*[_type == "client" && _id == $clientId][0] {
        _id,
        email,
        name,
        nip,
        address,
        phone,
        contactPerson,
        createdAt
      }`,
            { clientId: auth.client._id }
        );

        if (!clientProfile) {
            return NextResponse.json(
                { success: false, message: 'Profil klienta nie został znaleziony' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            profile: clientProfile,
        });
    } catch (error) {
        console.error('Fetch profile error:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas pobierania profilu' },
            { status: 500 }
        );
    }
}