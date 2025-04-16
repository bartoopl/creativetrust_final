import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth-utils';

export async function GET() {
    try {
        const auth = await verifyAuth();

        if (!auth.authenticated) {
            return NextResponse.json({
                authenticated: false,
            });
        }

        return NextResponse.json({
            authenticated: true,
            client: auth.client,
            temporary: auth.temporary
        });
    } catch (error) {
        console.error('Auth status error:', error);
        return NextResponse.json(
            { success: false, message: 'Błąd weryfikacji autentykacji' },
            { status: 500 }
        );
    }
}