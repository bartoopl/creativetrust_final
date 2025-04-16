import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyPassword, createJWT, setAuthCookie } from '@/lib/auth-utils';
import { verifyTempAccount } from '@/lib/temp-accounts';
import { cookies } from 'next/headers';

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
        
        // Debug client data structure
        if (clientData) {
            console.log('Client data structure:', JSON.stringify(clientData, null, 2));
            console.log('Password type:', typeof clientData.password);
            console.log('Password value:', clientData.password);
        }
        
        // Check if account exists but is inactive
        if (clientData && clientData.active === false) {
            console.log('Account exists but is inactive');
            return NextResponse.json(
                { success: false, message: 'Konto zostało dezaktywowane. Skontaktuj się z administratorem.' },
                { status: 403 }
            );
        }

        // If client exists in Sanity, but password is null - try to use temp account first
        if (clientData && clientData.active === true && clientData.password === null) {
            console.log('Sanity account found but has null password - checking temp account');
            
            // Check if there's a temporary account
            console.log('Checking for temporary account');
            const tempAccount = await verifyTempAccount(email, password);
            console.log('Temp account found with matching password:', !!tempAccount);
            
            if (tempAccount) {
                console.log('Using temp account credentials for Sanity account with null password');
                
                const token = await createJWT({
                    _id: clientData._id,  // Use Sanity account ID
                    email: clientData.email,
                    name: clientData.name,
                    nip: clientData.nip,
                });
                
                // Create a response with the data
                const response = NextResponse.json({
                    success: true,
                    message: 'Zalogowano pomyślnie',
                    client: {
                        _id: clientData._id,
                        email: clientData.email,
                        name: clientData.name,
                        nip: clientData.nip,
                    },
                });

                // Set the cookie in the response
                const cookieStore = cookies();
                cookieStore.set({
                    name: 'client_auth_token',
                    value: token,
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                });

                console.log('Auth cookie set in response for Sanity account using temp credentials');
                return response;
            } else {
                console.log('No matching temp account found');
                return NextResponse.json(
                    { success: false, message: 'Nieprawidłowy email lub hasło' },
                    { status: 401 }
                );
            }
        }
        
        // If client exists in Sanity with password, authenticate normally
        if (clientData && clientData.active === true && clientData.password !== null) {
            console.log('Verifying password for Sanity client');
            
            // Debug password before verification
            if (typeof clientData.password !== 'string') {
                console.log('Password is not a string. Trying to extract string value...');
                
                // Check if it's a Sanity reference with _value
                if (clientData.password && typeof clientData.password === 'object' && clientData.password._value) {
                    clientData.password = clientData.password._value;
                } else if (clientData.password && typeof clientData.password.toString === 'function') {
                    clientData.password = clientData.password.toString();
                } else {
                    console.error('Cannot convert password to string');
                    return NextResponse.json(
                        { success: false, message: 'Błąd weryfikacji hasła. Skontaktuj się z administratorem.' },
                        { status: 500 }
                    );
                }
            }
            
            // Verify password with string value
            const isValid = await verifyPassword(password, clientData.password);
            if (!isValid) {
                console.log('Invalid password for Sanity client');
                return NextResponse.json(
                    { success: false, message: 'Nieprawidłowy email lub hasło' },
                    { status: 401 }
                );
            }
            
            console.log('Password verified successfully for Sanity client');
            
            // Create JWT token
            const token = await createJWT({
                _id: clientData._id,
                email: clientData.email,
                name: clientData.name,
                nip: clientData.nip,
            });

            // Create a response with the data
            const response = NextResponse.json({
                success: true,
                message: 'Zalogowano pomyślnie',
                client: {
                    _id: clientData._id,
                    email: clientData.email,
                    name: clientData.name,
                    nip: clientData.nip,
                },
            });

            // Set the cookie in the response
            const cookieStore = cookies();
            cookieStore.set({
                name: 'client_auth_token',
                value: token,
                path: '/',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });

            console.log('Auth cookie set in response for regular Sanity account');
            return response;
        }

        // If we reached here, Sanity account doesn't exist or is inactive
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
            
            const token = await createJWT(tokenData);
            console.log('JWT created successfully');
            
            // Create a response with the data
            const response = NextResponse.json({
                success: true,
                message: 'Zalogowano pomyślnie (konto tymczasowe)',
                client: {
                    _id: tempAccount._id,
                    email: tempAccount.email,
                    name: tempAccount.name,
                    temporary: true,
                },
            });

            // Set the cookie in the response
            const cookieStore = cookies();
            cookieStore.set({
                name: 'client_auth_token',
                value: token,
                path: '/',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });

            console.log('Auth cookie set in response for temp account');
            return response;
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