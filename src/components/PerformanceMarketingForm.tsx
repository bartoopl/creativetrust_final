"use client";

import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    company?: string;
    needs: string;
    budget?: string;
    message: string;
}

const PerformanceMarketingForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        needs: '',
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
                    subject: `Performance Marketing - ${formData.needs}`,
                    message: `Zapytanie o Performance Marketing:
Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Firma: ${formData.company || 'Nie podano'}
Potrzeby: ${formData.needs}
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
                needs: '',
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
                    <label htmlFor="needs" className="block text-sm font-medium text-gray-700 mb-1">
                        Czego potrzebujesz? <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="needs"
                        name="needs"
                        value={formData.needs}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black"
                    >
                        <option value="" disabled className="text-black">Wybierz...</option>
                        <option value="google-ads">Kampanie Google Ads</option>
                        <option value="social-media">Kampanie w mediach społecznościowych</option>
                        <option value="seo">Pozycjonowanie SEO</option>
                        <option value="analytics">Analityka i raportowanie</option>
                        <option value="audit">Audyt marketingowy</option>
                        <option value="comprehensive">Kompleksowa obsługa marketingowa</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                        Miesięczny budżet reklamowy
                    </label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black"
                    >
                        <option value="" disabled className="text-black">Wybierz zakres...</option>
                        <option value="small">1,000 - 5,000 PLN</option>
                        <option value="medium">5,000 - 15,000 PLN</option>
                        <option value="large">15,000 - 50,000 PLN</option>
                        <option value="enterprise">Powyżej 50,000 PLN</option>
                        <option value="unsure">Nie wiem / Potrzebuję porady</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Wiadomość <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        placeholder="Opisz krótko swoje potrzeby"
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

export default PerformanceMarketingForm;