"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { MAX_QUESTION_LENGTH, type OfferAnswer } from '@/lib/offer-assistant';
import AnswerPanel from './AnswerPanel';

const thinking = ['sprawdzamy ofertę', 'sprawdzamy cennik', 'przygotowujemy odpowiedź'];

export type AskState =
    | { kind: 'idle' }
    | { kind: 'loading'; question: string }
    | { kind: 'answer'; question: string; answer: OfferAnswer }
    | { kind: 'error'; question: string; error: string };

/**
 * Full-viewport homepage hero: a centered statement and one question box. The visitor describes
 * what they need; /api/offer-assistant answers from the service catalogue only.
 */
export default function AskHero() {
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
        el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
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
                body: JSON.stringify({ question: q, website: honeypot }),
            });
            const data = await res.json().catch(() => null);
            if (res.ok && data?.ok) setState({ kind: 'answer', question: q, answer: data.answer });
            else setState({ kind: 'error', question: q, error: data?.error || 'Nie udało się przygotować odpowiedzi. Spróbuj ponownie albo napisz do nas.' });
        } catch {
            setState({ kind: 'error', question: q, error: 'Brak połączenia. Spróbuj ponownie albo napisz do nas.' });
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
                <h1 id="ask-hero-title" className="ct-ask-title">
                    Projekty cyfrowe, które działają <span className="ct-electric">biznesowo.</span>
                </h1>

                <p className="ct-ask-sub">
                    Opisz, czego potrzebujesz — od razu podpowiemy, czy to robimy, jak do tego podejdziemy i ile to może kosztować.
                </p>

                <form
                    className="ct-ask-box"
                    data-busy={loading}
                    onSubmit={(e) => { e.preventDefault(); ask(question); }}
                >
                    <label htmlFor="ask-input" className="sr-only">Czego potrzebujesz?</label>
                    <textarea
                        id="ask-input"
                        ref={inputRef}
                        rows={1}
                        value={question}
                        maxLength={MAX_QUESTION_LENGTH}
                        placeholder="Np. potrzebuję sklepu, który zintegruje się z naszym ERP…"
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
                        <button type="submit" className="ct-ask-submit" disabled={loading || question.trim().length < 3} aria-label="Wyślij pytanie">
                            <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                    </div>
                </form>

                <div aria-live="polite" className="w-full">
                    {loading && (
                        <div className="ct-ask-thinking ct-mono" role="status">
                            {thinking.map((line, i) => (
                                <span key={line} style={{ animationDelay: `${i * 0.6}s` }}>› {line}</span>
                            ))}
                        </div>
                    )}
                    {(state.kind === 'answer' || state.kind === 'error') && (
                        <AnswerPanel state={state} onReset={reset} />
                    )}
                </div>
            </div>

            <a href="#dalej" className="ct-scroll-cue" aria-label="Przewiń do dalszej części strony">
                <ArrowDown size={18} strokeWidth={1.25} aria-hidden="true" />
            </a>
        </section>
    );
}
