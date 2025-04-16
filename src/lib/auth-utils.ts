import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { client } from './sanity';
import { getTempAccountByEmail } from './temp-accounts';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const COOKIE_NAME = 'client_auth_token';

export interface ClientData {
    _id: string;
    email: string;
    name: string;
    nip?: string;
}

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
}

export async function createJWT(clientData: ClientData & { temporary?: boolean }): Promise<string> {
    const payload = {
        _id: clientData._id,
        email: clientData.email,
        name: clientData.name,
    } as any;
    
    // Add temporary flag if present
    if (clientData.temporary) {
        payload.temporary = true;
    }
    
    console.log('Creating JWT with payload:', payload);
    return sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function setAuthCookie(token: string): Promise<void> {
    try {
        console.log('Setting auth cookie, token length:', token.length);
        const cookieStore = await cookies();
        
        // First delete any existing cookie
        cookieStore.delete(COOKIE_NAME);
        
        // Simplified cookie settings to resolve issues
        cookieStore.set({
            name: COOKIE_NAME,
            value: token,
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            httpOnly: true,
        });
        
        console.log('Auth cookie set successfully');
    } catch (error) {
        console.error('Error setting auth cookie:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message, error.stack);
        }
        throw error;
    }
}

export async function removeAuthCookie(): Promise<void> {
    try {
        console.log('Removing auth cookie:', COOKIE_NAME);
        const cookieStore = await cookies();
        
        // Simple delete first
        cookieStore.delete(COOKIE_NAME);
        
        // Also set the cookie with expired date as redundant approach
        cookieStore.set({
            name: COOKIE_NAME,
            value: 'deleted',
            expires: new Date(0),
            path: '/',
            maxAge: 0,
        });
        
        console.log('Auth cookie deletion complete');
    } catch (error) {
        console.error('Error removing auth cookie:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message, error.stack);
        }
        throw error;
    }
}

export async function getAuthToken(): Promise<string | undefined> {
    try {
        console.log('Getting auth token from cookies');
        const cookieStore = await cookies();
        const cookie = cookieStore.get(COOKIE_NAME);
        
        console.log('Auth cookie found:', !!cookie);
        if (cookie) {
            console.log('Auth cookie value length:', cookie.value.length);
        }
        
        return cookie?.value;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return undefined;
    }
}

export async function verifyAuth(): Promise<{ authenticated: boolean; client?: ClientData; temporary?: boolean }> {
    const token = await getAuthToken();
    if (!token) {
        console.log('No auth token found');
        return { authenticated: false };
    }

    try {
        console.log('Verifying JWT token');
        const decoded = verify(token, JWT_SECRET) as ClientData & { temporary?: boolean };
        console.log('JWT decoded successfully for:', decoded.email);

        // First check if the user exists in Sanity by EMAIL (not ID)
        // This takes priority over temporary accounts
        console.log('Checking if user exists in Sanity by email');
        const clientExistsByEmail = await client.fetch(
            `*[_type == "client" && email == $email && active == true][0] {
                _id, email, name, nip
            }`,
            { email: decoded.email }
        );

        // If user exists in Sanity by email, always use that account
        if (clientExistsByEmail) {
            console.log('User found in Sanity by email, using Sanity account');
            return {
                authenticated: true,
                client: {
                    _id: clientExistsByEmail._id,
                    email: clientExistsByEmail.email,
                    name: clientExistsByEmail.name,
                    nip: clientExistsByEmail.nip
                }
            };
        }

        // If it's a temporary account, check if it still exists in our temp storage
        if (decoded.temporary) {
            console.log('Token has temporary flag, checking temp storage');
            const tempAccount = getTempAccountByEmail(decoded.email);
            if (!tempAccount) {
                console.log('Temp account not found in storage, removing cookie');
                await removeAuthCookie();
                return { authenticated: false };
            }
            
            console.log('Temp account found, authenticating as temporary');
            return {
                authenticated: true,
                client: decoded,
                temporary: true
            };
        }

        // For regular accounts, check if client still exists in Sanity database by ID
        console.log('Checking if user exists in Sanity by ID');
        const clientExistsById = await client.fetch(
            `*[_type == "client" && _id == $id && active == true][0]`,
            { id: decoded._id }
        );

        if (!clientExistsById) {
            console.log('User not found in Sanity by ID');
            // As a fallback, check if this might be a temp account 
            // even though it's not marked as such
            const tempAccount = getTempAccountByEmail(decoded.email);
            if (tempAccount) {
                console.log('Found matching temp account, authenticating as temporary');
                return {
                    authenticated: true,
                    client: decoded,
                    temporary: true
                };
            }
            
            console.log('No matching account found, removing cookie');
            await removeAuthCookie();
            return { authenticated: false };
        }

        console.log('User found in Sanity by ID, authenticating as regular account');
        return {
            authenticated: true,
            client: decoded,
        };
    } catch (error) {
        console.error('JWT verification error:', error);
        await removeAuthCookie();
        return { authenticated: false };
    }
}