"use client";

import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [usedFallback, setUsedFallback] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);
        setUsedFallback(false);

        try {
            // Najpierw próbujemy wysłać przez API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                cache: 'no-store'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Wystąpił błąd podczas wysyłania formularza');
            }

            setSuccess(data.message);
            setSubmitted(true);

            // Resetujemy formularz
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            console.error('Błąd wysyłania formularza przez API:', err);

            try {
                // Fallback: wysyłamy formularz przez natywny Netlify Forms
                // W tym celu tworzymy ukryty formularz i wysyłamy go programowo
                const netlifyForm = document.createElement('form');
                netlifyForm.setAttribute('method', 'POST');
                netlifyForm.setAttribute('name', 'contact');
                netlifyForm.setAttribute('data-netlify', 'true');
                netlifyForm.setAttribute('netlify-honeypot', 'bot-field');
                netlifyForm.style.display = 'none';

                // Dodajemy pole honeypot (przeciw botom)
                const honeypotField = document.createElement('input');
                honeypotField.setAttribute('name', 'bot-field');
                netlifyForm.appendChild(honeypotField);

                // Dodajemy pola formularza
                for (const key in formData) {
                    const input = document.createElement('input');
                    input.setAttribute('name', key);
                    input.setAttribute('value', formData[key as keyof FormData]);
                    netlifyForm.appendChild(input);
                }

                // Dodajemy ukryty input dla nazwy formularza (wymagane przez Netlify)
                const formNameInput = document.createElement('input');
                formNameInput.setAttribute('name', 'form-name');
                formNameInput.setAttribute('value', 'contact');
                netlifyForm.appendChild(formNameInput);

                // Dodajemy formularz do dokumentu, wysyłamy i usuwamy
                document.body.appendChild(netlifyForm);
                netlifyForm.submit();

                // Ustawiamy flagę, że użyliśmy fallbacku
                setUsedFallback(true);
                setSuccess('Dziękujemy za wiadomość! Skontaktujemy się z Tobą najszybciej jak to możliwe.');
                setSubmitted(true);

                // Resetujemy formularz
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } catch (fallbackErr) {
                console.error('Błąd podczas korzystania z fallbacku:', fallbackErr);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
                }
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-6">Napisz do nas</h2>

            {submitted ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-green-800 mb-2">Dziękujemy za wiadomość!</h3>
                    <p className="text-green-700">
                        {success || 'Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe.'}
                    </p>
                    {usedFallback && (
                        <p className="text-green-700 mt-2 text-sm">
                            Wiadomość została wysłana alternatywną metodą z powodu problemów technicznych.
                        </p>
                    )}
                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-4 px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                        Wyślij nową wiadomość
                    </button>
                </div>
            ) : (
                <>
                    {/* Widoczny formularz dla użytkownika */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
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
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Temat <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                >
                                    <option value="" disabled>Wybierz temat</option>
                                    <option value="general">Zapytanie ogólne</option>
                                    <option value="cooperation">Współpraca</option>
                                    <option value="project">Wycena projektu</option>
                                    <option value="support">Wsparcie techniczne</option>
                                    <option value="other">Inny</option>
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
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                    placeholder="Twoja wiadomość..."
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
                                {error}
                            </div>
                        )}

                        {success && !submitted && (
                            <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-green-700">
                                {success}
                            </div>
                        )}

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
                                {submitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            Wysyłając ten formularz, zgadzasz się na przetwarzanie Twoich danych osobowych zgodnie z naszą <a href="/polityka-prywatnosci" className="underline hover:text-black">polityką prywatności</a>.
                        </p>
                    </form>

                    {/* Ukryty formularz dla Netlify Forms */}
                    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
                        <input type="text" name="name" />
                        <input type="email" name="email" />
                        <input type="text" name="subject" />
                        <textarea name="message"></textarea>
                    </form>
                </>
            )}
        </div>
    );
}