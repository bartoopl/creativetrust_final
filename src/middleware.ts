import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || request.nextUrl.host;
    if (host?.startsWith('www.')) {
        const url = request.nextUrl.clone();
        url.host = host.replace(/^www\./, '');
        return NextResponse.redirect(url, 308);
    }

    console.log('Middleware executing for path:', request.nextUrl.pathname);
    const clientAuthCookie = request.cookies.get('client_auth_token');
    console.log('Auth cookie exists:', !!clientAuthCookie);
    
    const path = request.nextUrl.pathname;

    // Log cookie value for debugging
    if (clientAuthCookie) {
        const valueLength = clientAuthCookie.value.length;
        console.log(`Auth cookie found with value length: ${valueLength}`);
    }

    // Protect client panel routes
    if (path.startsWith('/panel-klienta')) {
        // If there's no auth cookie, redirect to login
        if (!clientAuthCookie) {
            console.log('No auth cookie found, redirecting to login');
            return NextResponse.redirect(new URL('/logowanie-klienta', request.url));
        }
        console.log('Auth cookie found, allowing access to panel');
    }

    // If user is already logged in and tries to access login or registration page, redirect to dashboard
    if ((path === '/logowanie-klienta' || path === '/rejestracja-klienta') && clientAuthCookie) {
        console.log('User already logged in, redirecting to panel');
        return NextResponse.redirect(new URL('/panel-klienta', request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};