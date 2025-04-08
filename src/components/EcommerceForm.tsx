"use client";

import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    projectType: string;
    budget?: string;
    message: string;
}

const EcommerceForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        message: ''
    });

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    subject: `E-commerce - ${formData.projectType}`,
                    message: `Zapytanie o E-commerce:
Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Firma: ${formData.company || 'Nie podano'}
Telefon: ${formData.phone || 'Nie podano'}
Typ projektu: ${formData.projectType}
Budżet: ${formData.budget || 'Nie podano'}
Wiadomość: ${formData.message}`
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Wystąpił błąd podczas wysyłania formularza');
            }

            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                projectType: '',
                budget: '',
                message: ''
            });
        } catch (err) {
            console.error('Błąd podczas wysyłania formularza:', err);
            setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-green-500 mb-6"
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
                <h3 className="text-2xl font-medium mb-4">Dziękujemy!</h3>
                <p className="mb-6 text-gray-600">
                    Twoja wiadomość została wysłana. Skontaktujemy się z Tobą wkrótce.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                    Wyślij kolejną wiadomość
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-2xl font-medium mb-6">Formularz kontaktowy</h3>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Imię i nazwisko <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Twoje imię i nazwisko"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Twój adres email"
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Firma
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Nazwa Twojej firmy"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Numer telefonu"
                    />
                </div>

                <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                        Typ projektu <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    >
                        <option value="" disabled>Wybierz typ projektu...</option>
                        <option value="woocommerce">Sklep WooCommerce</option>
                        <option value="shopify">Sklep Shopify</option>
                        <option value="prestashop">Sklep PrestaShop</option>
                        <option value="migration">Migracja sklepu</option>
                        <option value="optimization">Optymalizacja istniejącego sklepu</option>
                        <option value="other">Inny typ projektu</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                        Szacowany budżet projektu
                    </label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    >
                        <option value="" disabled>Wybierz zakres budżetu...</option>
                        <option value="small">5,000 - 15,000 PLN</option>
                        <option value="medium">15,000 - 50,000 PLN</option>
                        <option value="large">50,000 - 100,000 PLN</option>
                        <option value="enterprise">Powyżej 100,000 PLN</option>
                        <option value="unsure">Nie jestem pewien</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Dodatkowe informacje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Opisz szczegóły swojego projektu e-commerce"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`
                            w-full px-6 py-3 rounded-full font-medium
                            ${submitting
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'}
                            transition-all
                        `}
                    >
                        {submitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center">
                    Wysyłając ten formularz, zgadzasz się na przetwarzanie Twoich danych osobowych zgodnie z naszą {' '}
                    <a href="/polityka-prywatnosci" className="underline hover:text-black">
                        polityką prywatności
                    </a>.
                </p>
            </form>
        </div>
    );
};

export default EcommerceForm;