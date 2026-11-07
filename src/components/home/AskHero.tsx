"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { MAX_QUESTION_LENGTH, type OfferAnswer } from '@/lib/offer-assistant';
import AnswerPanel from './AnswerPanel';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: {
        thinking: ['sprawdzamy ofertę', 'sprawdzamy cennik', 'przygotowujemy odpowiedź'],
        failed: 'Nie udało się przygotować odpowiedzi. Spróbuj ponownie albo napisz do nas.',
        offline: 'Brak połączenia. Spróbuj ponownie albo napisz do nas.',
        kicker: 'CreativeTrust · strony WWW, e-commerce, marketing automation',
        title: ['Sprawdź, jak zrealizujemy ', 'Twój projekt.'],
        sub: 'Opisz w 1–2 zdaniach, czego potrzebujesz — od razu zobaczysz, czy to robimy, jak do tego podejdziemy i orientacyjną cenę z naszego cennika.',
        label: 'Czego potrzebujesz?',
        placeholder: 'Np. sklep internetowy zintegrowany z naszym ERP albo landing page pod kampanię Google Ads',
        submit: 'Sprawdź',
        stepsLabel: 'Jak to działa',
        steps: ['Opisujesz potrzebę', 'Widzisz zakres i orientacyjną cenę', 'Szczegóły ustalasz z zespołem'],
        scroll: 'Przewiń do dalszej części strony',
    },
    en: {
        thinking: ['checking our services', 'checking our price list', 'preparing your answer'],
        failed: "We couldn't prepare an answer. Please try again or write to us.",
        offline: 'No connection. Please try again or write to us.',
        kicker: 'CreativeTrust · websites, e-commerce, marketing automation',
        title: ['See how we would deliver ', 'your project.'],
        sub: "Describe what you need in 1–2 sentences — you'll instantly see whether we do it, how we'd approach it and an indicative price from our price list.",
        label: 'What do you need?',
        placeholder: 'E.g. an online store integrated with our ERP, or a landing page for a Google Ads campaign',
        submit: 'Check',
        stepsLabel: 'How it works',
        steps: ['You describe the need', 'You see the scope and an indicative price', 'You agree the details with our team'],
        scroll: 'Scroll to the rest of the page',
    },
};

export type AskState =
    | { kind: 'idle' }
    | { kind: 'loading'; question: string }
    | { kind: 'answer'; question: string; answer: OfferAnswer }
    | { kind: 'error'; question: string; error: string };

/**
 * Full-viewport homepage hero: a centered statement and one question box. The visitor describes
 * what they need; /api/offer-assistant answers from the service catalogue only.
 */
export default function AskHero({ locale }: { locale: Locale }) {
    const t = copy[locale];
    const sectionRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [question, setQuestion] = useState('');
    const [state, setState] = useState<AskState>({ kind: 'idle' });
    const [honeypot, setHoneypot] = useState('');

    // The hero fills what is left of the first screen under the announcement strip and the header.
    useLayoutEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const measure = () => el.style.setProperty('--ask-offset', `${el.getBoundingClientRect().top + window.scrollY}px`);
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Grow with the text, up to a few lines.
    useLayoutEffect(() => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
    }, [question]);

    const ask = async (text: string) => {
        const q = text.trim();
        if (q.length < 3 || state.kind === 'loading') return;
        setQuestion(q);
        setState({ kind: 'loading', question: q });
        try {
            const res = await fetch('/api/offer-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: q, locale, website: honeypot }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.ok) setState({ kind: 'answer', question: q, answer: data.answer });
            else setState({ kind: 'error', question: q, error: data?.error || t.failed });
        } catch {
            setState({ kind: 'error', question: q, error: t.offline });
        }
    };

    const reset = () => {
        setState({ kind: 'idle' });
        setQuestion('');
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    const loading = state.kind === 'loading';

    return (
        <section ref={sectionRef} className="ct-ask-hero" aria-labelledby="ask-hero-title">
            <div className="ct-ask-inner">
                <p className="ct-ask-kicker">{t.kicker}</p>

                <h1 id="ask-hero-title" className="ct-ask-title">
                    {t.title[0]}<span className="ct-electric">{t.title[1]}</span>
                </h1>

                <p className="ct-ask-sub">
                    {t.sub}
                </p>

                <form
                    className="ct-ask-box"
                    data-busy={loading}
                    onSubmit={(e) => { e.preventDefault(); ask(question); }}
                >
                    <label htmlFor="ask-input" className="ct-ask-label">{t.label}</label>
                    <textarea
                        id="ask-input"
                        ref={inputRef}
                        rows={1}
                        value={question}
                        maxLength={MAX_QUESTION_LENGTH}
                        placeholder={t.placeholder}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                                e.preventDefault();
                                ask(question);
                            }
                        }}
                        disabled={loading}
                    />
                    <input
                        type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1} autoComplete="off" aria-hidden="true" className="ct-hp"
                    />
                    <div className="ct-ask-bar">
                        {question.length > MAX_QUESTION_LENGTH - 100 && (
                            <span className="ct-mono ct-ask-hint">{question.length}/{MAX_QUESTION_LENGTH}</span>
                        )}
                        <button type="submit" className="ct-ask-submit" disabled={loading || question.trim().length < 3}>
                            {t.submit}
                        </button>
                    </div>
                </form>

                {state.kind === 'idle' && (
                    <ol className="ct-ask-steps" aria-label={t.stepsLabel}>
                        {t.steps.map((step, i) => <li key={step}><span>{i + 1}</span> {step}</li>)}
                    </ol>
                )}

                <div aria-live="polite" className="w-full">
                    {loading && (
                        <div className="ct-ask-thinking ct-mono" role="status">
                            {t.thinking.map((line, i) => (
                                <span key={line} style={{ animationDelay: `${i * 0.6}s` }}>› {line}</span>
                            ))}
                        </div>
                    )}
                    {(state.kind === 'answer' || state.kind === 'error') && (
                        <AnswerPanel locale={locale} state={state} onReset={reset} />
                    )}
                </div>
            </div>

            <a href="#dalej" className="ct-scroll-cue" aria-label={t.scroll}>
                <ArrowDown size={18} strokeWidth={1.25} aria-hidden="true" />
            </a>
        </section>
    );
}
