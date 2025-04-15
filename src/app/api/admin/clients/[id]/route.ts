import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

// Pobieranie pojedynczej faktury
export async function GET(request: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
    try {
        // Rozpakowywanie Promise z parametrami
        const params = await paramsPromise;
        const { id } = params;

        const invoice = await client.fetch(
            `*[_type == "invoice" && _id == $id][0] {
        _id,
        invoiceNumber,
        "client": client->{
          _id,
          name,
          email,
          nip,
          address
        },
        issueDate,
        dueDate,
        amount,
        vatRate,
        totalAmount,
        status,
        paymentDate,
        items,
        notes,
        attachmentURL,
        sentToClient
      }`,
            { id }
        );

        if (!invoice) {
            return NextResponse.json(
                { success: false, message: 'Faktura nie została znaleziona' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            invoice
        });
    } catch (error) {
        console.error('Error fetching invoice:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas pobierania faktury' },
            { status: 500 }
        );
    }
}

// Aktualizacja faktury
export async function PATCH(request: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
    try {
        // TODO: Dodać weryfikację administratora
        // Rozpakowywanie Promise z parametrami
        const params = await paramsPromise;
        const { id } = params;
        const updates = await request.json();

        // Sprawdź, czy faktura istnieje
        const existingInvoice = await client.fetch(
            `*[_type == "invoice" && _id == $id][0]`,
            { id }
        );

        if (!existingInvoice) {
            return NextResponse.json(
                { success: false, message: 'Faktura nie została znaleziona' },
                { status: 404 }
            );
        }

        // Przygotuj dane do aktualizacji
        const updateData: any = {
            _type: 'invoice',
        };

        // Dodaj pola do aktualizacji, jeśli zostały przesłane
        if (updates.invoiceNumber) updateData.invoiceNumber = updates.invoiceNumber;
        if (updates.issueDate) updateData.issueDate = updates.issueDate;
        if (updates.dueDate) updateData.dueDate = updates.dueDate;
        if (updates.status) updateData.status = updates.status;
        if (updates.paymentDate) updateData.paymentDate = updates.paymentDate;
        if (updates.notes) updateData.notes = updates.notes;
        if (updates.attachmentURL) updateData.attachmentURL = updates.attachmentURL;
        if (updates.sentToClient !== undefined) updateData.sentToClient = updates.sentToClient;

        // Jeśli zmienia się kwota lub stawka VAT, przelicz kwotę brutto
        if (updates.amount || updates.vatRate) {
            const amount = updates.amount || existingInvoice.amount;
            const vatRate = updates.vatRate || existingInvoice.vatRate;
            updateData.amount = amount;
            updateData.vatRate = vatRate;
            updateData.totalAmount = amount * (1 + vatRate / 100);
        }

        // Jeśli przesłano aktualizację pozycji faktury
        if (updates.items) {
            updateData.items = updates.items;
        }

        // Jeśli zmienia się klient
        if (updates.clientId) {
            updateData.client = {
                _type: 'reference',
                _ref: updates.clientId
            };
        }

        // Wykonaj aktualizację
        await client
            .patch(id)
            .set(updateData)
            .commit();

        return NextResponse.json({
            success: true,
            message: 'Faktura została zaktualizowana'
        });
    } catch (error) {
        console.error('Error updating invoice:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas aktualizacji faktury' },
            { status: 500 }
        );
    }
}

// Usunięcie faktury
export async function DELETE(request: Request, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
    try {
        // TODO: Dodać weryfikację administratora
        // Rozpakowywanie Promise z parametrami
        const params = await paramsPromise;
        const { id } = params;

        // Zamiast usuwać, zmieniamy status faktury na anulowany
        await client
            .patch(id)
            .set({ status: 'cancelled' })
            .commit();

        return NextResponse.json({
            success: true,
            message: 'Faktura została anulowana'
        });
    } catch (error) {
        console.error('Error cancelling invoice:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas anulowania faktury' },
            { status: 500 }
        );
    }
}