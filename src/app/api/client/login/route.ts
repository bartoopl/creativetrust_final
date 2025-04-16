import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyPassword, createJWT, setAuthCookie } from '@/lib/auth-utils';
import { verifyTempAccount } from '@/lib/temp-accounts';

export async function POST(request: Request) {
    try {
        console.log('=== LOGIN ATTEMPT ===');
        
        // Parse request body
        const body = await request.json();
        const { email, password } = body;
        console.log('Login request for email:', email);

        // Basic validation
        if (!email || !password) {
            console.log('Missing required fields');
            return NextResponse.json(
                { success: false, message: 'Email i hasło są wymagane' },
                { status: 400 }
            );
        }

        // Find client by email in Sanity
        console.log('Checking Sanity database for client');
        const clientData = await client.fetch(
            `*[_type == "client" && email == $email][0] {
                _id,
                email,
                name,
                nip,
                password,
                active
            }`,
            { email }
        );
        console.log('Sanity client data found:', !!clientData);
        
        // Check if account exists but is inactive
        if (clientData && clientData.active === false) {
            console.log('Account exists but is inactive');
            return NextResponse.json(
                { success: false, message: 'Konto zostało dezaktywowane. Skontaktuj się z administratorem.' },
                { status: 403 }
            );
        }

        // If client exists in Sanity, authenticate normally
        if (clientData && clientData.active === true) {
            console.log('Verifying password for Sanity client');
            // Verify password
            const isValid = await verifyPassword(password, clientData.password);
            if (!isValid) {
                console.log('Invalid password for Sanity client');
                return NextResponse.json(
                    { success: false, message: 'Nieprawidłowy email lub hasło' },
                    { status: 401 }
                );
            }

            console.log('Creating JWT for Sanity client');
            // Create JWT token
            const token = await createJWT({
                _id: clientData._id,
                email: clientData.email,
                name: clientData.name,
                nip: clientData.nip,
            });

            console.log('Setting auth cookie');
            // Set auth cookie
            try {
                await setAuthCookie(token);
                console.log('Auth cookie set successfully');
            } catch (cookieError) {
                console.error('Error setting auth cookie:', cookieError);
                throw cookieError;
            }

            // Remove sensitive fields from the response
            const { password: _, ...safeClientData } = clientData;

            console.log('Sanity login successful');
            return NextResponse.json({
                success: true,
                message: 'Zalogowano pomyślnie',
                client: safeClientData,
            });
        }

        // Check if there's a temporary account
        console.log('Checking for temporary account');
        const tempAccount = await verifyTempAccount(email, password);
        console.log('Temp account found:', !!tempAccount);
        
        if (tempAccount) {
            console.log('Creating JWT for temporary account');
            // Create JWT token for temporary account
            const tokenData = {
                _id: tempAccount._id,
                email: tempAccount.email,
                name: tempAccount.name,
                nip: tempAccount.nip,
                temporary: true,
            };
            console.log('Token data:', tokenData);
            
            try {
                const token = await createJWT(tokenData);
                console.log('JWT created successfully');
                
                console.log('Setting auth cookie for temp account');
                await setAuthCookie(token);
                console.log('Auth cookie set successfully for temp account');
                
                console.log('Temporary account login successful:', email);
                
                return NextResponse.json({
                    success: true,
                    message: 'Zalogowano pomyślnie (konto tymczasowe)',
                    client: {
                        _id: tempAccount._id,
                        email: tempAccount.email,
                        name: tempAccount.name,
                        temporary: true,
                    },
                });
            } catch (tokenError) {
                console.error('Error with token creation or cookie setting:', tokenError);
                throw tokenError;
            }
        }

        // No account found
        console.log('No account found for:', email);
        return NextResponse.json(
            { success: false, message: 'Nieprawidłowy email lub hasło' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message, error.stack);
        }
        
        return NextResponse.json(
            { 
                success: false, 
                message: 'Wystąpił błąd podczas logowania. Spróbuj ponownie później.',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}