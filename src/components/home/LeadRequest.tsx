"use client";

import { useRef, useState } from 'react';
import { formatLeadMessage, type OfferAnswer } from '@/lib/offer-assistant';

interface LeadRequestProps {
    question: string;
    answer: OfferAnswer | null;
}

/** Contact request sent through the existing /api/contact, with the question and the assistant's answer attached. */
export default function LeadRequest({ question, answer }: LeadRequestProps) {
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
                    message: formatLeadMessage(question, answer, String(form.get('note') ?? '')),
                    type: 'general',
                    website: String(form.get('website') ?? ''),
                    formTimestamp: startedAt.current,
                }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.success !== false) {
                setStatus('sent');
            } else {
                setError(data?.message || 'Nie udało się wysłać. Spróbuj ponownie.');
                setStatus('error');
            }
        } catch {
            setError('Brak połączenia. Spróbuj ponownie.');
            setStatus('error');
        }
    };

    if (status === 'sent') {
        return (
            <p className="ct-ask-sent" role="status">
                Dziękujemy — mamy Twoje pytanie. Odezwie się do Ciebie osoba z zespołu, zwykle w ciągu jednego dnia roboczego.
            </p>
        );
    }

    return (
        <form className="ct-ask-lead" onSubmit={onSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
                <div>
                    <label htmlFor="lead-name" className="ct-label">Imię</label>
                    <input id="lead-name" name="name" required autoComplete="name" className="ct-input" />
                </div>
                <div>
                    <label htmlFor="lead-email" className="ct-label">E-mail</label>
                    <input id="lead-email" name="email" type="email" required autoComplete="email" className="ct-input" />
                </div>
            </div>
            <div>
                <label htmlFor="lead-note" className="ct-label">Coś jeszcze? (opcjonalnie)</label>
                <textarea id="lead-note" name="note" rows={2} maxLength={1000} className="ct-input" placeholder="Termin, budżet, link do obecnej strony…" />
            </div>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="ct-hp" />
            {status === 'error' && <p className="ct-ask-note" role="alert" style={{ color: '#b42318' }}>{error}</p>}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="ct-ask-note" style={{ textAlign: 'left', margin: 0, maxWidth: '44ch' }}>
                    Wysyłając, zgadzasz się na przetwarzanie danych zgodnie z naszą <a href="/polityka-prywatnosci">polityką prywatności</a>. Dołączymy Twoje pytanie, żeby nie trzeba było go powtarzać.
                </p>
                <button type="submit" className="ct-cta" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Wysyłanie…' : 'Wyślij prośbę o kontakt'}
                </button>
            </div>
        </form>
    );
}
