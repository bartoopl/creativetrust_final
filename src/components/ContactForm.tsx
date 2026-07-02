"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HONEYPOT_FIELD_NAME } from '@/lib/antispam';
import NotchedButton from './ui/NotchedButton';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 4,
    border: '1px solid rgba(0,0,0,0.12)',
    fontSize: 15.1,
    letterSpacing: '-0.32px',
    color: '#000',
    background: '#fff',
    fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12.2,
    fontWeight: 500,
    color: 'rgba(0,0,0,0.6)',
    letterSpacing: '-0.36px',
    marginBottom: 6,
};

export default function ContactForm() {
    const formStartTime = useRef<number>(Date.now());

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

    useEffect(() => {
        formStartTime.current = Date.now();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const form = e.target as HTMLFormElement;
            const honeypotValue = (form.elements.namedItem(HONEYPOT_FIELD_NAME) as HTMLInputElement | null)?.value ?? '';
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    [HONEYPOT_FIELD_NAME]: honeypotValue,
                    formTimestamp: formStartTime.current,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Wystąpił błąd podczas wysyłania formularza');
            }

            setSuccess(data.message);
            setSubmitted(true);

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div style={{ padding: 32 }} className="lg:p-10">
                <div style={{ borderLeft: '2px solid var(--lime)', paddingLeft: 20 }}>
                    <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 21.8, letterSpacing: '-0.88px', color: '#000', margin: '0 0 8px' }}>
                        Dziękujemy za wiadomość!
                    </h3>
                    <p style={{ fontSize: 15.1, lineHeight: '24px', letterSpacing: '-0.32px', color: 'rgba(0,0,0,0.6)', margin: '0 0 20px' }}>
                        {success || 'Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe.'}
                    </p>
                    <NotchedButton variant="ghost-light" onClick={() => setSubmitted(false)}>
                        Wyślij nową wiadomość
                    </NotchedButton>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 32 }} className="lg:p-10">
            <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 21.8, letterSpacing: '-0.88px', color: '#000', margin: '0 0 24px' }}>
                Napisz do nas
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                    <label htmlFor="name" style={labelStyle}>Imię i nazwisko *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="Twoje imię i nazwisko"
                    />
                </div>

                <div>
                    <label htmlFor="email" style={labelStyle}>Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                        placeholder="Twój adres email"
                    />
                </div>

                <div>
                    <label htmlFor="subject" style={labelStyle}>Temat *</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={inputStyle}
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
                    <label htmlFor="message" style={labelStyle}>Wiadomość *</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        placeholder="Twoja wiadomość..."
                    />
                </div>

                {/* Honeypot field - hidden from users but visible to bots */}
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
                        pointerEvents: 'none'
                    }}
                    aria-hidden="true"
                />

                {error && (
                    <div style={{ padding: 14, borderRadius: 4, border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.04)', color: '#b91c1c', fontSize: 13.5 }}>
                        {error}
                    </div>
                )}

                <NotchedButton type="submit" variant="primary-light" disabled={submitting} className="self-start">
                    {submitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </NotchedButton>

                <p style={{ fontSize: 12.2, color: 'rgba(0,0,0,0.4)', lineHeight: 1.6, margin: 0 }}>
                    Wysyłając ten formularz, zgadzasz się na przetwarzanie Twoich danych osobowych zgodnie z naszą{' '}
                    <a href="/polityka-prywatnosci" style={{ color: 'rgba(0,0,0,0.6)', textDecoration: 'underline' }}>polityką prywatności</a>.
                </p>
            </form>
        </div>
    );
}
