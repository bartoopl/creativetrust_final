"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import { MAX_QUESTION_LENGTH, type OfferAnswer } from '@/lib/offer-assistant';
import AnswerPanel from './AnswerPanel';

const thinking = ['sprawdzamy ofertę', 'sprawdzamy cennik', 'przygotowujemy odpowiedź'];

export type AskState =
    | { kind: 'idle' }
    | { kind: 'loading'; question: string }
    | { kind: 'answer'; question: string; answer: OfferAnswer }
    | { kind: 'error'; question: string; error: string };

/**
 * Homepage offer assistant: a centered statement and one question box. The visitor describes
 * their situation; /api/offer-assistant answers from the service catalogue only.
 */
export default function AskHero() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [question, setQuestion] = useState('');
    const [state, setState] = useState<AskState>({ kind: 'idle' });
    const [honeypot, setHoneypot] = useState('');

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
        <section id="zapytaj" className="ct-ask-hero ct-ask-section" aria-labelledby="ask-hero-title" style={{ scrollMarginTop: 80 }}>
            <div className="ct-ask-inner">
                <p className="ct-ask-kicker">Nie wiesz, od czego zacząć?</p>

                <h2 id="ask-hero-title" className="ct-ask-title">
                    Opisz sytuację. <span className="ct-electric">Powiemy, jak możemy pomóc.</span>
                </h2>

                <p className="ct-ask-sub">
                    Napisz w 1–2 zdaniach, z czym mierzy się Twój e-commerce — od razu zobaczysz, czy to robimy
                    i jak do tego podejdziemy.
                </p>

                <form
                    className="ct-ask-box"
                    data-busy={loading}
                    onSubmit={(e) => { e.preventDefault(); ask(question); }}
                >
                    <label htmlFor="ask-input" className="ct-ask-label">Co dziś najbardziej hamuje sprzedaż?</label>
                    <textarea
                        id="ask-input"
                        ref={inputRef}
                        rows={1}
                        value={question}
                        maxLength={MAX_QUESTION_LENGTH}
                        placeholder="Np. sprzedaż rośnie, ale marża spada — albo: szukamy kogoś, kto poprowadzi nasz sklep z zewnątrz"
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
                            Sprawdź
                        </button>
                    </div>
                </form>

                {state.kind === 'idle' && (
                    <ol className="ct-ask-steps" aria-label="Jak to działa">
                        <li><span>1</span> Opisujesz sytuację</li>
                        <li><span>2</span> Widzisz, jak możemy pomóc</li>
                        <li><span>3</span> Szczegóły ustalasz z zespołem</li>
                    </ol>
                )}

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

        </section>
    );
}
