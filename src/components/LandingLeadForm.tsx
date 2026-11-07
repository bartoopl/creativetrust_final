"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { HONEYPOT_FIELD_NAME } from '@/lib/antispam';
import { trackLead } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: {
        budgetOptions: ['do 5 000 zł', '5 000 - 15 000 zł', '15 000 - 50 000 zł', 'powyżej 50 000 zł', 'nie wiem / potrzebuję rekomendacji'],
        failed: 'Wystąpił błąd podczas wysyłania formularza',
        sentEyebrow: 'Wysłano',
        sentTitle: 'Dziękujemy za wiadomość',
        sentBody: 'Formularz został wysłany. Skontaktujemy się z Tobą i wrócimy z kolejnym krokiem.',
        again: 'Wyślij kolejne zapytanie',
        eyebrow: 'Formularz',
        name: 'Imię i nazwisko',
        namePlaceholder: 'Jan Kowalski',
        email: 'Email',
        emailPlaceholder: 'jan@firma.pl',
        company: 'Firma',
        companyPlaceholder: 'Nazwa firmy',
        phone: 'Telefon',
        phonePlaceholder: '+48 123 456 789',
        scope: 'Zakres',
        choose: 'Wybierz zakres',
        budget: 'Budżet / skala',
        budgetLabel: 'Budżet',
        notGiven: 'Nie podano',
        message: 'Wiadomość',
        sending: 'Wysyłanie...',
        submit: 'Wyślij zapytanie',
        consent: 'Wysyłając formularz, zgadzasz się na przetwarzanie danych zgodnie z',
        policy: { href: '/polityka-prywatnosci', label: 'polityką prywatności' },
    },
    en: {
        budgetOptions: ['up to PLN 5,000', 'PLN 5,000 – 15,000', 'PLN 15,000 – 50,000', 'over PLN 50,000', "I don't know / I need a recommendation"],
        failed: 'Something went wrong while sending the form',
        sentEyebrow: 'Sent',
        sentTitle: 'Thank you for your message',
        sentBody: "Your form has been sent. We'll get in touch and come back with the next step.",
        again: 'Send another enquiry',
        eyebrow: 'Form',
        name: 'Full name',
        namePlaceholder: 'Jane Smith',
        email: 'Email',
        emailPlaceholder: 'jane@company.com',
        company: 'Company',
        companyPlaceholder: 'Company name',
        phone: 'Phone',
        phonePlaceholder: '+44 20 1234 5678',
        scope: 'Scope',
        choose: 'Choose a scope',
        budget: 'Budget / scale',
        budgetLabel: 'Budget',
        notGiven: 'Not provided',
        message: 'Message',
        sending: 'Sending...',
        submit: 'Send enquiry',
        consent: 'By sending the form, you agree to the processing of your data in line with our',
        policy: { href: '/en/privacy-policy', label: 'privacy policy' },
    },
};

type LandingLeadFormProps = {
    locale?: Locale;
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
    locale = 'pl',
    formTitle,
    formSubtitle,
    subjectPrefix,
    serviceOptions,
    budgetOptions = copy[locale].budgetOptions,
    messagePlaceholder,
}: LandingLeadFormProps) {
    const t = copy[locale];
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
                    locale,
                    subject: `${subjectPrefix} - ${formData.service}`,
                    message: `${subjectPrefix}
${t.name}: ${formData.name}
${t.email}: ${formData.email}
${t.company}: ${formData.company || t.notGiven}
${t.phone}: ${formData.phone || t.notGiven}
${t.scope}: ${formData.service}
${t.budgetLabel}: ${formData.budget || t.notGiven}
${t.message}: ${formData.message}`,
                    formTimestamp: formStartTime.current,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t.failed);
            }

            trackLead('landing_form');
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
            setError(err instanceof Error ? err.message : t.failed);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="ct-panel p-8 text-center md:p-10">
                <span className="ct-eyebrow">{t.sentEyebrow}</span>
                <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.5px', margin: '10px 0 12px' }}>{t.sentTitle}</h3>
                <p className="ct-body" style={{ fontSize: 15, maxWidth: '52ch', margin: '0 auto 24px' }}>
                    {t.sentBody}
                </p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="ct-ghost"
                >
                    {t.again}
                </button>
            </div>
        );
    }

    return (
        <div className="ct-panel p-6 md:p-10">
            <span className="ct-eyebrow">{t.eyebrow}</span>
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
                            {t.name} <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="ct-input"
                            placeholder={t.namePlaceholder}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="ct-label">
                            {t.email} <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="ct-input"
                            placeholder={t.emailPlaceholder}
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="ct-label">
                            {t.company}
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="ct-input"
                            placeholder={t.companyPlaceholder}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="ct-label">
                            {t.phone}
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="ct-input"
                            placeholder={t.phonePlaceholder}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="service" className="ct-label">
                            {t.scope} <span style={{ color: 'var(--accent)' }}>*</span>
                        </label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="ct-input"
                        >
                            <option value="" disabled>{t.choose}</option>
                            {serviceOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="budget" className="ct-label">
                            {t.budget}
                        </label>
                        <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="ct-input"
                        >
                            <option value="" disabled>{t.choose}</option>
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
                        {t.message} <span style={{ color: 'var(--accent)' }}>*</span>
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
                        {submitting ? t.sending : t.submit}
                        <span className="ct-badge" aria-hidden="true">
                            <span className="ct-arrows"><span>→</span><span>→</span></span>
                        </span>
                    </button>
                </div>

                <p className="ct-body" style={{ fontSize: 13, color: 'var(--muted-2)' }}>
                    {t.consent}{' '}
                    <Link href={t.policy.href} className="underline">
                        {t.policy.label}
                    </Link>.
                </p>
            </form>
        </div>
    );
}
