import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { verifyAuth } from '@/lib/auth-utils';

export async function GET() {
    try {
        // Verify authentication
        const auth = await verifyAuth();

        if (!auth.authenticated || !auth.client) {
            return NextResponse.json(
                { success: false, message: 'Nieautoryzowany dostęp' },
                { status: 401 }
            );
        }

        // Fetch client invoices from Sanity
        const invoices = await client.fetch(
            `*[_type == "invoice" && client._ref == $clientId] | order(issueDate desc) {
        _id,
        invoiceNumber,
        issueDate,
        dueDate,
        amount,
        totalAmount,
        status,
        paymentDate,
        attachmentURL
      }`,
            { clientId: auth.client._id }
        );

        return NextResponse.json({
            success: true,
            invoices,
        });
    } catch (error) {
        console.error('Fetch invoices error:', error);
        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas pobierania faktur' },
            { status: 500 }
        );
    }
}