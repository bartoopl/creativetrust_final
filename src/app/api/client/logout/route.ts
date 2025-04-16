import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper function to handle cookies safely
async function deleteCookie(name: string) {
    const cookieStore = await cookies();
    
    // Delete the cookie
    cookieStore.delete(name);
    
    // Also set it with expired time as a fallback
    cookieStore.set({
        name: name,
        value: 'deleted',
        expires: new Date(0),
        path: '/',
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
}

export async function POST() {
    try {
        console.log('Logout endpoint called');
        
        // Create a response
        const response = NextResponse.json({
            success: true,
            message: 'Wylogowano pomyślnie',
        });
        
        // Remove the auth cookie
        await deleteCookie('client_auth_token');
        
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