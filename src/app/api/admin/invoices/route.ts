import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

// Pobieranie wszystkich faktur
export async function GET() {
    try {
        // TODO: Dodać weryfikację administratora

        const invoices = await client.fetch(
            `*[_type == "invoice"] | order(issueDate desc) {
        _id,
        invoiceNumber,
        issueDate,
        dueDate,
        amount,
        totalAmount,
        status,
        "clientName": client->name,
        "clientId": client->_id
      }`
        );

        return NextResponse.json({
            success: true,
            invoices,
        });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas pobierania faktur' },
            { status: 500 }
        );
    }
}

// Dodawanie nowej faktury
export async function POST(request: Request) {
    try {
        // TODO: Dodać weryfikację administratora

        const body = await request.json();
        const {
            invoiceNumber,
            clientId,
            issueDate,
            dueDate,
            amount,
            vatRate,
            items,
            notes,
            attachmentURL
        } = body;

        // Podstawowa walidacja
        if (!invoiceNumber || !clientId || !issueDate || !dueDate || !amount) {
            return NextResponse.json(
                { success: false, message: 'Brakuje wymaganych pól' },
                { status: 400 }
            );
        }

        // Sprawdź, czy klient istnieje
        const clientExists = await client.fetch(
            `*[_type == "client" && _id == $clientId][0]._id`,
            { clientId }
        );

        if (!clientExists) {
            return NextResponse.json(
                { success: false, message: 'Wybrany klient nie istnieje' },
                { status: 400 }
            );
        }

        // Oblicz kwotę brutto
        const totalAmount = amount * (1 + (vatRate || 23) / 100);

        // Utwórz nową fakturę
        const newInvoice = await client.create({
            _type: 'invoice',
            invoiceNumber,
            client: {
                _type: 'reference',
                _ref: clientId
            },
            issueDate,
            dueDate,
            amount,
            vatRate: vatRate || 23,
            totalAmount,
            status: 'issued',
            items: items || [],
            notes,
            attachmentURL,
            sentToClient: false
        });

        return NextResponse.json({
            success: true,
            message: 'Faktura została utworzona',
            invoice: {
                _id: newInvoice._id,
                invoiceNumber: newInvoice.invoiceNumber
            }
        });
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas tworzenia faktury' },
            { status: 500 }
        );
    }
}