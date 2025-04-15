"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Invoice {
    _id: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    amount: number;
    totalAmount: number;
    status: 'issued' | 'paid' | 'overdue' | 'cancelled';
    paymentDate?: string;
    attachmentURL?: string;
}

interface ClientProfile {
    _id: string;
    name: string;
    email: string;
    nip?: string;
    phone?: string;
}

export default function Dashboard() {
    const [latestInvoices, setLatestInvoices] = useState<Invoice[]>([]);
    const [profile, setProfile] = useState<ClientProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Fetch invoices
                const invoicesResponse = await fetch('/api/client/invoices');
                if (!invoicesResponse.ok) {
                    throw new Error('Nie udało się pobrać faktur');
                }
                const invoicesData = await invoicesResponse.json();

                // Fetch profile
                const profileResponse = await fetch('/api/client/profile');
                if (!profileResponse.ok) {
                    throw new Error('Nie udało się pobrać danych profilu');
                }
                const profileData = await profileResponse.json();

                // Set data
                setLatestInvoices(invoicesData.invoices.slice(0, 5));
                setProfile(profileData.profile);

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
    };

    // Status badge based on invoice status
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Opłacona</span>;
            case 'issued':
                return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Wystawiona</span>;
            case 'overdue':
                return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Po terminie</span>;
            case 'cancelled':
                return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Anulowana</span>;
            default:
                return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                <p className="font-medium">Wystąpił błąd</p>
                <p>{error}</p>
                <button
                    className="mt-2 text-sm underline"
                    onClick={() => window.location.reload()}
                >
                    Odśwież stronę
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-medium mb-8">Witaj, {profile?.name || 'Kliencie'}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Podsumowanie płatności</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-gray-500">Do zapłaty:</div>
                        <div className="text-xl font-medium">
                            {latestInvoices
                                .filter(inv => inv.status === 'issued' || inv.status === 'overdue')
                                .reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0)
                                .toFixed(2)} zł
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Faktury</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-gray-500">Wszystkich faktur:</div>
                        <div className="text-xl font-medium">{latestInvoices.length}</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Twój profil</h3>
                    <div className="text-gray-500 mb-2">
                        {profile?.email}
                    </div>
                    <Link
                        href="/panel-klienta/profil"
                        className="text-sm text-black underline hover:text-gray-700"
                    >
                        Zobacz swój profil
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Ostatnie faktury</h2>
                    <Link
                        href="/panel-klienta/faktury"
                        className="text-sm text-black hover:text-gray-700"
                    >
                        Zobacz wszystkie faktury
                    </Link>
                </div>

                {latestInvoices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Numer faktury
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data wystawienia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Termin płatności
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kwota
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Akcje
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {latestInvoices.map((invoice) => (
                                <tr key={invoice._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {invoice.invoiceNumber}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(invoice.issueDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(invoice.dueDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {(invoice.totalAmount || invoice.amount || 0).toFixed(2)} zł
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(invoice.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {invoice.attachmentURL ? (
                                            <a
                                                href={invoice.attachmentURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-black hover:text-gray-700"
                                            >
                                                Pobierz PDF
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Brak PDF</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        Nie masz jeszcze żadnych faktur.
                    </div>
                )}
            </div>
        </div>
    );
}