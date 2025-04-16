// Tymczasowe rozwiązanie do omijania problemów z autoryzacją
import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { createJWT, setAuthCookie } from '@/lib/auth-utils';

export async function POST(request: Request) {
    try {
        // Odbierz dane
        const body = await request.json();
        const { email, secret } = body;
        
        // Sprawdź sekret (prosty mechanizm zabezpieczający)
        if (secret !== 'creativetrust123') {
            return NextResponse.json(
                { success: false, message: 'Błąd autoryzacji' },
                { status: 401 }
            );
        }
        
        // Znajdź klienta w Sanity
        const clientData = await client.fetch(
            `*[_type == "client" && email == $email && active == true][0] {
                _id,
                email,
                name,
                nip
            }`,
            { email }
        );
        
        if (!clientData) {
            return NextResponse.json(
                { success: false, message: 'Nie znaleziono klienta o podanym adresie email' },
                { status: 404 }
            );
        }
        
        // Utwórz token JWT
        const token = await createJWT({
            _id: clientData._id,
            email: clientData.email,
            name: clientData.name,
            nip: clientData.nip || '',
        });
        
        // Ustaw cookie
        await setAuthCookie(token);
        
        return NextResponse.json({
            success: true,
            message: 'Zalogowano pomyślnie',
            client: clientData,
        });
    } catch (error) {
        console.error('Auth bypass error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Wystąpił błąd podczas logowania awaryjnego',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}