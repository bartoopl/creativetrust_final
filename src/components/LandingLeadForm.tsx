"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HONEYPOT_FIELD_NAME } from '@/lib/antispam';

type LandingLeadFormProps = {
    formTitle: string;
    formSubtitle: string;
    subjectPrefix: string;
    serviceOptions: string[];
    budgetOptions?: string[];
    messagePlaceholder: string;
};

type FormData = {
    name: string;
    email: string;
    company: string;
    phone: string;
    service: string;
    budget: string;
    message: string;
};

export default function LandingLeadForm({
    formTitle,
    formSubtitle,
    subjectPrefix,
    serviceOptions,
    budgetOptions = [
        'do 5 000 zł',
        '5 000 - 15 000 zł',
        '15 000 - 50 000 zł',
        'powyżej 50 000 zł',
        'nie wiem / potrzebuję rekomendacji',
    ],
    messagePlaceholder,
}: LandingLeadFormProps) {
    const formStartTime = useRef<number>(Date.now());
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        formStartTime.current = Date.now();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const form = event.currentTarget;
            const honeypotValue = (form.elements.namedItem(HONEYPOT_FIELD_NAME) as HTMLInputElement | null)?.value ?? '';
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    [HONEYPOT_FIELD_NAME]: honeypotValue,
                    subject: `${subjectPrefix} - ${formData.service}`,
                    message: `${subjectPrefix}
Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Firma: ${formData.company || 'Nie podano'}
Telefon: ${formData.phone || 'Nie podano'}
Zakres: ${formData.service}
Budżet: ${formData.budget || 'Nie podano'}
Wiadomość: ${formData.message}`,
                    formTimestamp: formStartTime.current,
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
                service: '',
                budget: '',
                message: '',
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas wysyłania formularza');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-center">
                <h3 className="text-2xl font-medium text-green-900 mb-3">Dziękujemy za wiadomość</h3>
                <p className="text-green-800 mb-6">
                    Formularz został wysłany. Skontaktujemy się z Tobą i wrócimy z kolejnym krokiem.
                </p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-full border border-green-300 bg-white px-6 py-3 font-medium text-green-900 hover:bg-green-100 transition-colors"
                >
                    Wyślij kolejne zapytanie
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-medium mb-3">{formTitle}</h2>
            <p className="text-gray-600 mb-8">{formSubtitle}</p>

            {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Imię i nazwisko <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                            placeholder="Jan Kowalski"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                            placeholder="jan@firma.pl"
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Firma
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                            placeholder="Nazwa firmy"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                            placeholder="+48 123 456 789"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                            Zakres <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                        >
                            <option value="" disabled>Wybierz zakres</option>
                            {serviceOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                            Budżet / skala
                        </label>
                        <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                        >
                            <option value="" disabled>Wybierz zakres</option>
                            {budgetOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
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
                        rows={5}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-black"
                        placeholder={messagePlaceholder}
                    />
                </div>

                <input
                    type="text"
                    name={HONEYPOT_FIELD_NAME}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                        position: 'absolute',
                        left: '-9999px',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden',
                        opacity: 0,
                        pointerEvents: 'none',
                    }}
                    aria-hidden="true"
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full rounded-full px-6 py-3 font-medium transition-colors ${
                        submitting
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                    }`}
                >
                    {submitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                </button>

                <p className="text-sm text-gray-500">
                    Wysyłając formularz, zgadzasz się na przetwarzanie danych zgodnie z{' '}
                    <Link href="/polityka-prywatnosci" className="underline hover:text-black">
                        polityką prywatności
                    </Link>.
                </p>
            </form>
        </div>
    );
}
