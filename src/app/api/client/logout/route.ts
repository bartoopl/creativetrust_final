import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        console.log('Logout endpoint called');
        
        // Create a response
        const response = NextResponse.json({
            success: true,
            message: 'Wylogowano pomyślnie',
        });
        
        // Remove the auth cookie directly
        const cookieStore = cookies();
        
        // Delete the cookie
        cookieStore.delete('client_auth_token');
        
        // Also set it with expired time as a fallback
        cookieStore.set({
            name: 'client_auth_token',
            value: 'deleted',
            expires: new Date(0),
            path: '/',
            maxAge: 0,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        
        console.log('Auth cookie removed successfully');

        return response;
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