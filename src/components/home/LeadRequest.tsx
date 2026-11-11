"use client";

import { useRef, useState } from 'react';
import { formatLeadMessage, type OfferAnswer } from '@/lib/offer-assistant';
import { trackLead } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: {
        failed: 'Nie udało się wysłać. Spróbuj ponownie.',
        offline: 'Brak połączenia. Spróbuj ponownie.',
        sent: 'Dziękujemy — mamy Twoje pytanie. Odezwie się do Ciebie osoba z zespołu, zwykle w ciągu jednego dnia roboczego.',
        name: 'Imię',
        email: 'E-mail',
        note: 'Coś jeszcze? (opcjonalnie)',
        notePlaceholder: 'Termin, budżet, link do obecnej strony…',
        consent: ['Wysyłając, zgadzasz się na przetwarzanie danych zgodnie z naszą ', 'polityką prywatności', '. Dołączymy Twoje pytanie, żeby nie trzeba było go powtarzać.'],
        policyHref: '/polityka-prywatnosci',
        sending: 'Wysyłanie…',
        submit: 'Wyślij prośbę o kontakt',
    },
    en: {
        failed: "We couldn't send it. Please try again.",
        offline: 'No connection. Please try again.',
        sent: 'Thank you — we have your question. Someone from our team will get back to you, usually within one business day.',
        name: 'Name',
        email: 'E-mail',
        note: 'Anything else? (optional)',
        notePlaceholder: 'Timeline, budget, link to your current site…',
        consent: ['By sending, you agree to the processing of your data in line with our ', 'privacy policy', ". We'll attach your question so you don't have to repeat it."],
        policyHref: '/en/privacy-policy',
        sending: 'Sending…',
        submit: 'Send a call request',
    },
};

interface LeadRequestProps {
    locale: Locale;
    question: string;
    answer: OfferAnswer | null;
}

/** Contact request sent through the existing /api/contact, with the question and the assistant's answer attached. */
export default function LeadRequest({ locale, question, answer }: LeadRequestProps) {
    const t = copy[locale];
    const startedAt = useRef(Date.now());
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: String(form.get('name') ?? '').trim(),
                    email: String(form.get('email') ?? '').trim(),
                    subject: 'project',
                    message: formatLeadMessage(question, answer, String(form.get('note') ?? ''), locale),
                    type: 'general',
                    locale,
                    website: String(form.get('website') ?? ''),
                    formTimestamp: startedAt.current,
                }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success !== false) {
                trackLead('assistant_form');
                setStatus('sent');
            } else {
                setError(data?.message || t.failed);
                setStatus('error');
            }
        } catch {
            setError(t.offline);
            setStatus('error');
        }
    };

    if (status === 'sent') {
        return (
            <p className="ct-ask-sent" role="status">
                {t.sent}
            </p>
        );
    }

    return (
        <form className="ct-ask-lead" onSubmit={onSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
                <div>
                    <label htmlFor="lead-name" className="ct-label">{t.name}</label>
                    <input id="lead-name" name="name" required autoComplete="name" className="ct-input" />
                </div>
                <div>
                    <label htmlFor="lead-email" className="ct-label">{t.email}</label>
                    <input id="lead-email" name="email" type="email" required autoComplete="email" className="ct-input" />
                </div>
            </div>
            <div>
                <label htmlFor="lead-note" className="ct-label">{t.note}</label>
                <textarea id="lead-note" name="note" rows={2} maxLength={1000} className="ct-input" placeholder={t.notePlaceholder} />
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="ct-hp" />
            {status === 'error' && <p className="ct-ask-note" role="alert" style={{ color: '#b42318' }}>{error}</p>}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="ct-ask-note" style={{ textAlign: 'left', margin: 0, maxWidth: '44ch' }}>
                    {t.consent[0]}<a href={t.policyHref}>{t.consent[1]}</a>{t.consent[2]}
                </p>
                <button type="submit" className="ct-cta" disabled={status === 'sending'}>
                    {status === 'sending' ? t.sending : t.submit}
                </button>
            </div>
        </form>
    );
}
