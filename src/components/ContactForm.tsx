"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HONEYPOT_FIELD_NAME } from '@/lib/antispam';
import { trackFormLead } from '@/lib/analytics';
import NotchedButton from './ui/NotchedButton';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: {
        failed: 'Wystąpił błąd podczas wysyłania formularza',
        agentFailed: 'Nie udało się wysłać wiadomości.',
        error: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
        sentEyebrow: 'Wysłano',
        sentTitle: 'Dziękujemy za wiadomość!',
        sentBody: 'Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe.',
        again: 'Wyślij nową wiadomość',
        eyebrow: 'Formularz',
        title: 'Napisz do nas',
        name: 'Imię i nazwisko *',
        namePlaceholder: 'Twoje imię i nazwisko',
        email: 'Email *',
        emailPlaceholder: 'Twój adres email',
        subject: 'Temat *',
        chooseSubject: 'Wybierz temat',
        subjects: { general: 'Zapytanie ogólne', cooperation: 'Współpraca', project: 'Wycena projektu', support: 'Wsparcie techniczne', other: 'Inny' },
        message: 'Wiadomość *',
        messagePlaceholder: 'Twoja wiadomość...',
        messageTool: 'The message, preferably in Polish: what the visitor needs, scope, timeline and budget if known.',
        sending: 'Wysyłanie...',
        submit: 'Wyślij wiadomość',
        consent: 'Wysyłając ten formularz, zgadzasz się na przetwarzanie Twoich danych osobowych zgodnie z naszą',
        policy: { href: '/polityka-prywatnosci', label: 'polityką prywatności' },
    },
    en: {
        failed: 'Something went wrong while sending the form',
        agentFailed: 'The message could not be sent.',
        error: 'Something went wrong while sending your message. Please try again later.',
        sentEyebrow: 'Sent',
        sentTitle: 'Thank you for your message!',
        sentBody: 'Your message has been sent. We will get back to you as soon as possible.',
        again: 'Send another message',
        eyebrow: 'Form',
        title: 'Write to us',
        name: 'Full name *',
        namePlaceholder: 'Your full name',
        email: 'Email *',
        emailPlaceholder: 'Your email address',
        subject: 'Subject *',
        chooseSubject: 'Choose a subject',
        subjects: { general: 'General enquiry', cooperation: 'Partnership', project: 'Project quote', support: 'Technical support', other: 'Other' },
        message: 'Message *',
        messagePlaceholder: 'Your message...',
        messageTool: 'The message, in English or Polish: what the visitor needs, scope, timeline and budget if known.',
        sending: 'Sending...',
        submit: 'Send message',
        consent: 'By sending this form, you agree to the processing of your personal data in line with our',
        policy: { href: '/en/privacy-policy', label: 'privacy policy' },
    },
};

/** WebMCP's SubmitEvent additions for a submission an in-browser AI agent triggered. */
type AgentSubmitEvent = SubmitEvent & {
    agentInvoked?: boolean;
    respondWith?: (response: Promise<unknown>) => void;
};

export default function ContactForm({ locale = 'pl' }: { locale?: Locale }) {
    const t = copy[locale];
    const formStartTime = useRef<number>(Date.now());
    const honeypotRef = useRef<HTMLInputElement>(null);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        formStartTime.current = Date.now();
    }, []);

    const send = async (form: HTMLFormElement): Promise<string> => {
        // Uncontrolled fields, read at submit: values an agent filled into the DOM are sent exactly as shown.
        const fields = new FormData(form);
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: fields.get('name') ?? '',
                email: fields.get('email') ?? '',
                subject: fields.get('subject') ?? '',
                message: fields.get('message') ?? '',
                locale,
                [HONEYPOT_FIELD_NAME]: honeypotRef.current?.value ?? '',
                formTimestamp: formStartTime.current,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || t.failed);
        }
        return data.message;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        const submission = send(form);
        // Tell an agent that triggered the submission how it went (must be called during dispatch).
        const nativeEvent = e.nativeEvent as AgentSubmitEvent;
        if (nativeEvent.agentInvoked && typeof nativeEvent.respondWith === 'function') {
            nativeEvent.respondWith(submission.then(
                (message) => ({ sent: true, message }),
                (err: unknown) => ({ sent: false, message: err instanceof Error ? err.message : t.agentFailed }),
            ));
        }

        try {
            const message = await submission;
            trackFormLead('contact_form', 'contact_form');
            setSuccess(message);
            // The thank-you view replaces the form and "Wyślij nową wiadomość" mounts a fresh one, so no
            // form.reset() — resetting would cancel the agent's pending tool call before it gets the response.
            setSubmitted(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(t.error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="ct-panel" style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                <div className="flex flex-col gap-3" style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 20 }}>
                    <span className="ct-eyebrow">{t.sentEyebrow}</span>
                    <h3 style={{ fontWeight: 500, fontSize: 22, letterSpacing: '-0.5px', color: 'var(--text)', margin: 0 }}>
                        {t.sentTitle}
                    </h3>
                    <p className="ct-body" style={{ fontSize: 15, margin: '0 0 8px' }}>
                        {success || t.sentBody}
                    </p>
                    <div>
                        <NotchedButton variant="ghost" onClick={() => setSubmitted(false)}>
                            {t.again}
                        </NotchedButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ct-panel" style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
            <span className="ct-eyebrow">{t.eyebrow}</span>
            <h2 style={{ fontWeight: 500, fontSize: 22, letterSpacing: '-0.5px', color: 'var(--text)', margin: '8px 0 24px' }}>
                {t.title}
            </h2>

            {/* Honeypot field - hidden from users but visible to bots. Kept outside the <form> so the
                WebMCP tool synthesized from the form never offers it to an AI agent to fill in. */}
            <input
                ref={honeypotRef}
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

            {/* WebMCP declarative tool: an agent may fill the form in, but without `toolautosubmit`
                the visitor reviews it and presses "Wyślij" themselves. */}
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                toolname="contact_creativetrust"
                tooldescription="Prepares a message to CreativeTrust, a Polish digital agency (websites, headless e-commerce, marketing automation, social media). Fills the contact form for the visitor to review and send; the agency replies by email."
            >
                <div>
                    <label htmlFor="name" className="ct-label">{t.name}</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="ct-input"
                        placeholder={t.namePlaceholder}
                        toolparamdescription="Visitor's full name."
                    />
                </div>

                <div>
                    <label htmlFor="email" className="ct-label">{t.email}</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="ct-input"
                        placeholder={t.emailPlaceholder}
                        toolparamdescription="Visitor's email address for the reply."
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="ct-label">{t.subject}</label>
                    <select
                        id="subject"
                        name="subject"
                        defaultValue=""
                        required
                        className="ct-input"
                        toolparamdescription="general = general question, cooperation = partnership, project = project quote, support = technical support, other = anything else."
                    >
                        <option value="" disabled>{t.chooseSubject}</option>
                        {Object.entries(t.subjects).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="ct-label">{t.message}</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="ct-input"
                        style={{ resize: 'vertical' }}
                        placeholder={t.messagePlaceholder}
                        toolparamdescription={t.messageTool}
                    />
                </div>

                {error && (
                    <div style={{ padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(220,38,38,0.04)', color: '#b91c1c', fontSize: 13.5 }}>
                        {error}
                    </div>
                )}

                <NotchedButton type="submit" variant="primary" disabled={submitting} className="self-start">
                    {submitting ? t.sending : t.submit}
                </NotchedButton>

                <p style={{ fontSize: 12, color: 'var(--muted-2)', lineHeight: 1.6, margin: 0 }}>
                    {t.consent}{' '}
                    <a href={t.policy.href} style={{ color: 'var(--muted)', textDecoration: 'underline' }}>{t.policy.label}</a>.
                </p>
            </form>
        </div>
    );
}
