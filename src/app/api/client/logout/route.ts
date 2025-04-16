import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/auth-utils';

export async function POST() {
    try {
        console.log('Logout endpoint called');
        
        // Remove the auth cookie
        await removeAuthCookie();
        console.log('Auth cookie removed successfully');

        return NextResponse.json({
            success: true,
            message: 'Wylogowano pomyślnie',
        });
    } catch (error) {
        console.error('Logout error:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message, error.stack);
        }
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas wylogowania' },
            { status: 500 }
        );
    }
}