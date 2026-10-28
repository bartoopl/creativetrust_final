"use client";

import Link from 'next/link';
import { useState } from 'react';
import type { Verdict } from '@/lib/offer-assistant';
import type { AskState } from './AskHero';
import LeadRequest from './LeadRequest';

const verdicts: Record<Verdict, { mark: string; label: string }> = {
    yes: { mark: '●', label: 'Robimy to' },
    partly: { mark: '◐', label: 'Częściowo w naszym zakresie' },
    no: { mark: '○', label: 'Tego nie robimy' },
    unclear: { mark: '?', label: 'Doprecyzujmy' },
};

interface AnswerPanelProps {
    state: Extract<AskState, { kind: 'answer' } | { kind: 'error' }>;
    onReset: () => void;
}

/** The assistant's answer as a flat product frame: verdict, text, matching services, published prices, next step. */
export default function AnswerPanel({ state, onReset }: AnswerPanelProps) {
    const [leadOpen, setLeadOpen] = useState(false);
    const answer = state.kind === 'answer' ? state.answer : null;
    const verdict = answer ? verdicts[answer.verdict] : null;

    return (
        <article className="ct-ask-answer ct-fade" aria-label="Wstępna odpowiedź">
            <header className="ct-ask-answer-head">
                <span className="ct-mono">creativetrust / wstępna odpowiedź</span>
                {verdict && (
                    <span className="ct-mono" data-verdict={answer?.verdict}>{verdict.mark} {verdict.label}</span>
                )}
            </header>

            <div className="ct-ask-answer-body">
                <p className="ct-ask-question">„{state.question}”</p>

                {state.kind === 'answer' ? (
                    <p className="ct-ask-text">{state.answer.answer}</p>
                ) : (
                    <p className="ct-ask-text" role="alert">{state.error}</p>
                )}

                {answer && answer.prices.length > 0 && (
                    <dl className="ct-ask-prices">
                        {answer.prices.map((p) => (
                            <div key={p.name}>
                                <dt>{p.name}</dt>
                                <dd>{p.price}</dd>
                            </div>
                        ))}
                        <p className="ct-ask-note">Ceny z <Link href={answer.prices[0].source}>naszego cennika</Link>. Dokładną wycenę przygotujemy po krótkiej rozmowie.</p>
                    </dl>
                )}

                {answer && answer.services.length > 0 && (
                    <ul className="ct-ask-services" aria-label="Pasujące usługi">
                        {answer.services.map((s) => (
                            <li key={s.slug}><Link href={s.href}>{s.title} <span aria-hidden="true">→</span></Link></li>
                        ))}
                    </ul>
                )}

                {leadOpen ? (
                    <LeadRequest question={state.question} answer={answer} />
                ) : (
                    <div className="flex flex-wrap justify-center gap-2" style={{ paddingTop: 4 }}>
                        <button type="button" className="ct-cta" onClick={() => setLeadOpen(true)}>Poproś o kontakt</button>
                        <button type="button" className="ct-ghost" onClick={onReset}>Zadaj inne pytanie</button>
                    </div>
                )}

                <p className="ct-ask-note">
                    Wstępna odpowiedź na podstawie naszej oferty. Szczegóły i wycenę zawsze potwierdza ktoś z zespołu.
                </p>
            </div>
        </article>
    );
}
