import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
    const clientAuthCookie = request.cookies.get('client_auth_token');
    const path = request.nextUrl.pathname;

    // Protect client panel routes
    if (path.startsWith('/panel-klienta')) {
        // If there's no auth cookie, redirect to login
        if (!clientAuthCookie) {
            return NextResponse.redirect(new URL('/logowanie-klienta', request.url));
        }
    }

    // If user is already logged in and tries to access login page, redirect to dashboard
    if (path === '/logowanie-klienta' && clientAuthCookie) {
        return NextResponse.redirect(new URL('/panel-klienta', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/panel-klienta/:path*', '/logowanie-klienta'],
};