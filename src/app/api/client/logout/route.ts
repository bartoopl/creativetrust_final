import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth-utils';

export async function POST() {
    try {
        // Remove the auth cookie
        removeAuthCookie();

        return NextResponse.json({
            success: true,
            message: 'Wylogowano pomyślnie',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas wylogowania' },
            { status: 500 }
        );
    }
}