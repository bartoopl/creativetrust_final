"use client";

import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    company: string;
    phone: string;
}

export default function ContactFormAutomation() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        phone: ''
    });

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        // Przygotuj wiadomość dla API
        const apiMessageData = {
            ...formData,
            subject: 'Marketing Automation - Zapytanie',
            message: `Prośba o kontakt w sprawie Marketing Automation.
            
Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Firma: ${formData.company}
Telefon: ${formData.phone}`,
            type: 'automation'
        };

        try {
            console.log('Wysyłanie formularza automatyzacji:', apiMessageData);
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiMessageData),
            });

            const data = await response.json();
            console.log('Odpowiedź z API (automatyzacja):', data);

            if (!response.ok) {
                throw new Error(data.message || 'Wystąpił błąd podczas wysyłania formularza');
            }

            setSuccess(data.message);
            setSubmitted(true);

            // Resetujemy formularz
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: ''
            });
        } catch (err) {
            console.error('Błąd wysyłania formularza automatyzacji:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-900 p-8 rounded-xl text-white">
            {submitted ? (
                <div className="text-center py-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-green-400 mb-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-2xl font-medium mb-4">Dziękujemy za przesłanie formularza!</h3>
                    <p className="mb-6">
                        {success || 'Nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin, aby omówić szczegóły bezpłatnego audytu.'}
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                        Wypełnij formularz ponownie
                    </button>
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-medium mb-6">Bezpłatny audyt marketingowy</h3>
                    <p className="mb-6">
                        Zostaw swoje dane, a nasz ekspert skontaktuje się z Tobą,
                        aby przeprowadzić bezpłatny audyt i zaproponować rozwiązania
                        marketing automation dla Twojego biznesu.
                    </p>
                    {error && (
                        <div className="mb-6 bg-red-900 border border-red-800 text-white p-4 rounded-lg">
                            {error}
                        </div>
                    )}
                    {success && !submitted && (
                        <div className="mb-6 bg-green-900 border border-green-800 text-white p-4 rounded-lg">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Imię i nazwisko</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-white"
                                placeholder="Jan Kowalski"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-white"
                                placeholder="jan@firma.pl"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium mb-1">Firma</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-white"
                                placeholder="Nazwa firmy"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-white"
                                placeholder="+48 123 456 789"
                            />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`
                                    w-full px-6 py-3 rounded-full font-medium
                                    ${submitting
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-black hover:bg-gray-800'} 
                                    transition-colors
                                `}
                            >
                                {submitting ? 'Wysyłanie...' : 'Poproś o bezpłatny audyt'}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}