import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { client } from './sanity';

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

export async function createJWT(clientData: ClientData): Promise<string> {
    return sign(
        {
            _id: clientData._id,
            email: clientData.email,
            name: clientData.name,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    );
}

export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
        sameSite: 'strict',
    });
}

export async function removeAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

export async function verifyAuth(): Promise<{ authenticated: boolean; client?: ClientData }> {
    const token = await getAuthToken();
    if (!token) {
        return { authenticated: false };
    }

    try {
        const decoded = verify(token, JWT_SECRET) as ClientData;

        // Check if client still exists in database
        const clientExists = await client.fetch(
            `*[_type == "client" && _id == $id && active == true][0]`,
            { id: decoded._id }
        );

        if (!clientExists) {
            await removeAuthCookie();
            return { authenticated: false };
        }

        return {
            authenticated: true,
            client: decoded,
        };
    } catch (error) {
        await removeAuthCookie();
        return { authenticated: false };
    }
}