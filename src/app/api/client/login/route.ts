import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyPassword, createJWT, setAuthCookie } from '@/lib/auth-utils';

export async function POST(request: Request) {
    try {
        // Parse request body
        const body = await request.json();
        const { email, password } = body;

        // Basic validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email i hasło są wymagane' },
                { status: 400 }
            );
        }

        // Find client by email
        const clientData = await client.fetch(
            `*[_type == "client" && email == $email && active == true][0] {
        _id,
        email,
        name,
        nip,
        password
      }`,
            { email }
        );

        // Client not found or invalid credentials
        if (!clientData) {
            return NextResponse.json(
                { success: false, message: 'Nieprawidłowy email lub hasło' },
                { status: 401 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(password, clientData.password);
        if (!isValid) {
            return NextResponse.json(
                { success: false, message: 'Nieprawidłowy email lub hasło' },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = await createJWT({
            _id: clientData._id,
            email: clientData.email,
            name: clientData.name,
            nip: clientData.nip,
        });

        // Set auth cookie
        setAuthCookie(token);

        // Remove sensitive fields from the response
        const { password: _, ...safeClientData } = clientData;

        return NextResponse.json({
            success: true,
            message: 'Zalogowano pomyślnie',
            client: safeClientData,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas logowania. Spróbuj ponownie później.' },
            { status: 500 }
        );
    }
}