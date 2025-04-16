import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { hashPassword } from '@/lib/auth-utils';
import { addTempAccount, tempAccountExists } from '@/lib/temp-accounts';

export async function POST(request: Request) {
    try {
        // Parse request body
        const body = await request.json();
        const { 
            email, 
            password, 
            name, 
            nip, 
            address, 
            phone, 
            contactPerson 
        } = body;

        console.log('Registration attempt:', { email, name, nip });

        // Basic validation
        if (!email || !password || !name || !nip) {
            return NextResponse.json(
                { success: false, message: 'Brakujące wymagane pola' },
                { status: 400 }
            );
        }

        // Validate NIP format
        const nipClean = nip.replace(/[^0-9]/g, '');
        if (nipClean.length !== 10) {
            return NextResponse.json(
                { success: false, message: 'NIP musi składać się z 10 cyfr' },
                { status: 400 }
            );
        }

        // Check if temp account already exists
        if (tempAccountExists(email)) {
            return NextResponse.json(
                { success: false, message: 'Ten adres email jest już zarejestrowany' },
                { status: 400 }
            );
        }

        // Check if client exists in Sanity
        const clientExists = await client.fetch(
            `*[_type == "client" && (email == $email || nip == $nip)][0]`,
            { email, nip: nipClean }
        );

        if (clientExists) {
            // If client exists and has password, it's already registered
            if (clientExists.password) {
                return NextResponse.json(
                    { success: false, message: 'Konto z tym adresem email lub NIP już istnieje' },
                    { status: 400 }
                );
            }

            // If client exists but doesn't have password, create temporary account
            // and log info for admin to update manually
            console.log('EXISTING CLIENT REGISTRATION:');
            console.log(`Client ID: ${clientExists._id}`);
            console.log(`Client email: ${email}`);
            console.log(`Client NIP: ${nipClean}`);
            console.log(`Client name: ${name}`);
            console.log('Admin should update this client in Sanity Studio with password');
        } else {
            // New client, log info for admin to create it
            console.log('NEW CLIENT REGISTRATION:');
            console.log(`Client email: ${email}`);
            console.log(`Client NIP: ${nipClean}`);
            console.log(`Client name: ${name}`);
            console.log('Admin should create this client in Sanity Studio');
        }

        // Create temporary account
        await addTempAccount(email, password, name, nipClean);

        return NextResponse.json({
            success: true,
            message: 'Rejestracja zakończona pomyślnie. Możesz się teraz zalogować, ale dostęp do niektórych funkcji może być ograniczony do czasu weryfikacji przez administratora.',
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.',
                error: error instanceof Error ? error.message : 'Nieznany błąd'
            },
            { status: 500 }
        );
    }
}