import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { hashPassword } from '@/lib/auth-utils';

// Pobieranie danych pojedynczego klienta
export async function GET(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const clientData = await client.fetch(
            `*[_type == "client" && _id == $id][0] {
        _id,
        name,
        email,
        nip,
        address,
        phone,
        contactPerson,
        active,
        createdAt,
        "invoices": *[_type == "invoice" && client._ref == ^._id] | order(issueDate desc) {
          _id,
          invoiceNumber,
          issueDate,
          dueDate,
          amount,
          totalAmount,
          status
        }
      }`,
            { id }
        );

        if (!clientData) {
            return NextResponse.json(
                { success: false, message: 'Klient nie został znaleziony' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            client: clientData
        });
    } catch (error) {
        console.error('Error fetching client:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas pobierania danych klienta' },
            { status: 500 }
        );
    }
}

// Aktualizacja danych klienta
export async function PATCH(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const updates = await request.json();

        // Sprawdź, czy klient istnieje
        const existingClient = await client.fetch(
            `*[_type == "client" && _id == $id][0]`,
            { id }
        );

        if (!existingClient) {
            return NextResponse.json(
                { success: false, message: 'Klient nie został znaleziony' },
                { status: 404 }
            );
        }

        // Przygotuj dane do aktualizacji
        const updateData: any = {
            _type: 'client',
        };

        // Dodaj pola do aktualizacji, jeśli zostały przesłane
        if (updates.name) updateData.name = updates.name;
        if (updates.email) updateData.email = updates.email;
        if (updates.nip) updateData.nip = updates.nip;
        if (updates.address) updateData.address = updates.address;
        if (updates.phone) updateData.phone = updates.phone;
        if (updates.contactPerson) updateData.contactPerson = updates.contactPerson;
        if (updates.active !== undefined) updateData.active = updates.active;

        // Jeśli przesłano nowe hasło, haszuj je
        if (updates.password) {
            updateData.password = await hashPassword(updates.password);
        }

        // Wykonaj aktualizację
        await client
            .patch(id)
            .set(updateData)
            .commit();

        return NextResponse.json({
            success: true,
            message: 'Dane klienta zostały zaktualizowane'
        });
    } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas aktualizacji danych klienta' },
            { status: 500 }
        );
    }
}

// Usunięcie klienta (dezaktywacja)
export async function DELETE(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        // Zamiast usuwać, dezaktywujemy konto
        await client
            .patch(id)
            .set({ active: false })
            .commit();

        return NextResponse.json({
            success: true,
            message: 'Konto klienta zostało dezaktywowane'
        });
    } catch (error) {
        console.error('Error deactivating client:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas dezaktywacji konta klienta' },
            { status: 500 }
        );
    }
}