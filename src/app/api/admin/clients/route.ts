import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { hashPassword } from '@/lib/auth-utils';

// Endpoint do tworzenia nowego klienta (tylko dla administratorów)
export async function POST(request: Request) {
    try {
        // TODO: Dodać weryfikację administratora

        // Parse request body
        const body = await request.json();
        const { email, name, password, nip, address, phone, contactPerson } = body;

        // Basic validation
        if (!email || !name || !password) {
            return NextResponse.json(
                { success: false, message: 'Email, nazwa i hasło są wymagane' },
                { status: 400 }
            );
        }

        // Check if client with this email already exists
        const existingClient = await client.fetch(
            `*[_type == "client" && email == $email][0]`,
            { email }
        );

        if (existingClient) {
            return NextResponse.json(
                { success: false, message: 'Klient z tym adresem email już istnieje' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new client document
        const newClient = await client.create({
            _type: 'client',
            email,
            name,
            password: hashedPassword,
            nip,
            address,
            phone,
            contactPerson,
            active: true,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: 'Konto klienta zostało utworzone',
            client: {
                _id: newClient._id,
                email: newClient.email,
                name: newClient.name,
            },
        });
    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas tworzenia konta klienta' },
            { status: 500 }
        );
    }
}

// Endpoint do pobierania wszystkich klientów (tylko dla administratorów)
export async function GET() {
    try {
        // TODO: Dodać weryfikację administratora

        const clients = await client.fetch(
            `*[_type == "client"] | order(name asc) {
        _id,
        name,
        email,
        nip,
        phone,
        active,
        createdAt,
        "invoiceCount": count(*[_type == "invoice" && client._ref == ^._id])
      }`
        );

        return NextResponse.json({
            success: true,
            clients,
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas pobierania klientów' },
            { status: 500 }
        );
    }
}