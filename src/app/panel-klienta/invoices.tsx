"use client";

import React, { useState, useEffect } from 'react';

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

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('date-desc');

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                setLoading(true);

                const response = await fetch('/api/client/invoices');
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać faktur');
                }

                const data = await response.json();
                setInvoices(data.invoices || []);

            } catch (err) {
                console.error('Error fetching invoices:', err);
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
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
                return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Opłacona</span>;
            case 'issued':
                return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Wystawiona</span>;
            case 'overdue':
                return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Po terminie</span>;
            case 'cancelled':
                return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Anulowana</span>;
            default:
                return <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    // Filter invoices based on status
    const filteredInvoices = invoices.filter(invoice => {
        if (statusFilter === 'all') return true;
        return invoice.status === statusFilter;
    });

    // Sort invoices
    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
        switch (sortOption) {
            case 'date-asc':
                return new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
            case 'date-desc':
                return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
            case 'amount-asc':
                return (a.totalAmount || a.amount) - (b.totalAmount || b.amount);
            case 'amount-desc':
                return (b.totalAmount || b.amount) - (a.totalAmount || a.amount);
            case 'number-asc':
                return a.invoiceNumber.localeCompare(b.invoiceNumber);
            case 'number-desc':
                return b.invoiceNumber.localeCompare(a.invoiceNumber);
            default:
                return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
        }
    });

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
            <h1 className="text-3xl font-medium mb-6">Faktury</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="status-filter"
                                className="block w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Wszystkie</option>
                                <option value="issued">Wystawione</option>
                                <option value="paid">Opłacone</option>
                                <option value="overdue">Po terminie</option>
                                <option value="cancelled">Anulowane</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sort-option" className="block text-sm font-medium text-gray-700 mb-1">
                                Sortuj według
                            </label>
                            <select
                                id="sort-option"
                                className="block w-full md:w-auto p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="date-desc">Data (najnowsze)</option>
                                <option value="date-asc">Data (najstarsze)</option>
                                <option value="amount-desc">Kwota (najwyższa)</option>
                                <option value="amount-asc">Kwota (najniższa)</option>
                                <option value="number-desc">Numer faktury (malejąco)</option>
                                <option value="number-asc">Numer faktury (rosnąco)</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 self-end">
                        Znaleziono faktur: {filteredInvoices.length}
                    </div>
                </div>

                {filteredInvoices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Numer faktury
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data wystawienia
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Termin płatności
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kwota
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dokument
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {sortedInvoices.map((invoice) => (
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
                    <div className="text-center py-10">
                        <p className="text-gray-500">Nie znaleziono faktur dla wybranych kryteriów</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Wystawione faktury</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-medium">
                            {invoices.filter(inv => inv.status === 'issued').length}
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-medium">
                                {invoices
                                    .filter(inv => inv.status === 'issued')
                                    .reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0)
                                    .toFixed(2)} zł
                            </div>
                            <div className="text-xs text-gray-500">Łączna kwota</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Po terminie</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-medium text-red-600">
                            {invoices.filter(inv => inv.status === 'overdue').length}
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-medium text-red-600">
                                {invoices
                                    .filter(inv => inv.status === 'overdue')
                                    .reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0)
                                    .toFixed(2)} zł
                            </div>
                            <div className="text-xs text-gray-500">Łączna kwota</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium mb-2">Opłacone faktury</h3>
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-medium text-green-600">
                            {invoices.filter(inv => inv.status === 'paid').length}
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-medium text-green-600">
                                {invoices
                                    .filter(inv => inv.status === 'paid')
                                    .reduce((sum, inv) => sum + (inv.totalAmount || inv.amount || 0), 0)
                                    .toFixed(2)} zł
                            </div>
                            <div className="text-xs text-gray-500">Łączna kwota</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}