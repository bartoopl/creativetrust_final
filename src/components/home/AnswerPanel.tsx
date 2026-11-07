"use client";

import Link from 'next/link';
import { useState } from 'react';
import type { Verdict } from '@/lib/offer-assistant';
import type { AskState } from './AskHero';
import LeadRequest from './LeadRequest';
import type { Locale } from '@/lib/i18n';

const MARKS: Record<Verdict, string> = { yes: '●', partly: '◐', no: '○', unclear: '?' };

const copy = {
    pl: {
        verdicts: { yes: 'Robimy to', partly: 'Częściowo w naszym zakresie', no: 'Tego nie robimy', unclear: 'Doprecyzujmy' } as Record<Verdict, string>,
        label: 'Wstępna odpowiedź',
        head: 'creativetrust / wstępna odpowiedź',
        pricesFrom: 'Ceny z',
        priceList: 'naszego cennika',
        pricesNote: 'Dokładną wycenę przygotujemy po krótkiej rozmowie.',
        servicesLabel: 'Pasujące usługi',
        contact: 'Poproś o kontakt',
        again: 'Zadaj inne pytanie',
        disclaimer: 'Wstępna odpowiedź na podstawie naszej oferty. Szczegóły i wycenę zawsze potwierdza ktoś z zespołu.',
        quote: (q: string) => `„${q}”`,
    },
    en: {
        verdicts: { yes: 'We do this', partly: 'Partly within our scope', no: "We don't do this", unclear: "Let's clarify" } as Record<Verdict, string>,
        label: 'Initial answer',
        head: 'creativetrust / initial answer',
        pricesFrom: 'Prices from',
        priceList: 'our price list',
        pricesNote: "We'll prepare an exact quote after a short call.",
        servicesLabel: 'Matching services',
        contact: 'Request a call',
        again: 'Ask another question',
        disclaimer: 'An initial answer based on our services. Someone from our team always confirms the details and the quote.',
        quote: (q: string) => `“${q}”`,
    },
};

interface AnswerPanelProps {
    locale: Locale;
    state: Extract<AskState, { kind: 'answer' } | { kind: 'error' }>;
    onReset: () => void;
}

/** The assistant's answer as a flat product frame: verdict, text, matching services, published prices, next step. */
export default function AnswerPanel({ locale, state, onReset }: AnswerPanelProps) {
    const t = copy[locale];
    const [leadOpen, setLeadOpen] = useState(false);
    const answer = state.kind === 'answer' ? state.answer : null;
    const verdict = answer ? { mark: MARKS[answer.verdict], label: t.verdicts[answer.verdict] } : null;

    return (
        <article className="ct-ask-answer ct-fade" aria-label={t.label}>
            <header className="ct-ask-answer-head">
                <span className="ct-mono">{t.head}</span>
                {verdict && (
                    <span className="ct-mono" data-verdict={answer?.verdict}>{verdict.mark} {verdict.label}</span>
                )}
            </header>

            <div className="ct-ask-answer-body">
                <p className="ct-ask-question">{t.quote(state.question)}</p>

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
                        <p className="ct-ask-note">{t.pricesFrom} <Link href={answer.prices[0].source}>{t.priceList}</Link>. {t.pricesNote}</p>
                    </dl>
                )}

                {answer && answer.services.length > 0 && (
                    <ul className="ct-ask-services" aria-label={t.servicesLabel}>
                        {answer.services.map((s) => (
                            <li key={s.slug}><Link href={s.href}>{s.title} <span aria-hidden="true">→</span></Link></li>
                        ))}
                    </ul>
                )}

                {leadOpen ? (
                    <LeadRequest locale={locale} question={state.question} answer={answer} />
                ) : (
                    <div className="flex flex-wrap justify-center gap-2" style={{ paddingTop: 4 }}>
                        <button type="button" className="ct-cta" onClick={() => setLeadOpen(true)}>{t.contact}</button>
                        <button type="button" className="ct-ghost" onClick={onReset}>{t.again}</button>
                    </div>
                )}

                <p className="ct-ask-note">
                    {t.disclaimer}
                </p>
            </div>
        </article>
    );
}
