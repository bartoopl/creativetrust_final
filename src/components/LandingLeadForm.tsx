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
            <div className="ct-panel p-8 text-center md:p-10">
                <span className="ct-eyebrow">Wysłano</span>
                <h3 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px', margin: '10px 0 12px' }}>Dziękujemy za wiadomość</h3>
                <p className="ct-body" style={{ fontSize: 15, maxWidth: '52ch', margin: '0 auto 24px' }}>
                    Formularz został wysłany. Skontaktujemy się z Tobą i wrócimy z kolejnym krokiem.
                </p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="ct-ghost"
                >
                    Wyślij kolejne zapytanie
                </button>
            </div>
        );
    }

    return (
        <div className="ct-panel p-6 md:p-10">
            <span className="ct-eyebrow">Formularz</span>
            <h2 className="ct-h2">{formTitle}</h2>
            <p className="ct-body" style={{ fontSize: 15, maxWidth: '64ch', margin: '12px 0 32px' }}>{formSubtitle}</p>

            {error && (
                <div className="mb-6 p-4 text-sm" style={{ border: '1px solid rgba(220,38,38,0.3)', borderRadius: 'var(--radius-sm)', background: 'rgba(220,38,38,0.04)', color: '#b91c1c' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="ct-label">
                            Imię i nazwisko <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="ct-input"
                            placeholder="Jan Kowalski"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="ct-label">
                            Email <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="ct-input"
                            placeholder="jan@firma.pl"
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="ct-label">
                            Firma
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="ct-input"
                            placeholder="Nazwa firmy"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="ct-label">
                            Telefon
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="ct-input"
                            placeholder="+48 123 456 789"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="service" className="ct-label">
                            Zakres <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="ct-input"
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
                        <label htmlFor="budget" className="ct-label">
                            Budżet / skala
                        </label>
                        <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="ct-input"
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
                    <label htmlFor="message" className="ct-label">
                        Wiadomość <span style={{ color: 'var(--accent)' }}>*</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="ct-input"
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

                <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="ct-cta"
                    >
                        {submitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                        <span className="ct-badge" aria-hidden="true">
                            <span className="ct-arrows"><span>→</span><span>→</span></span>
                        </span>
                    </button>
                </div>

                <p className="ct-body" style={{ fontSize: 13, color: 'var(--muted-2)' }}>
                    Wysyłając formularz, zgadzasz się na przetwarzanie danych zgodnie z{' '}
                    <Link href="/polityka-prywatnosci" className="underline">
                        polityką prywatności
                    </Link>.
                </p>
            </form>
        </div>
    );
}
