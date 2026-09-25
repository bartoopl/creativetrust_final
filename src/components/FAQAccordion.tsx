"use client";

import React, { useId, useState } from 'react';

interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

/** FAQ list: hairline-separated rows with a mono +/− toggle. */
export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const baseId = useId();

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={{ borderBottom: '1px solid var(--line)' }}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                const buttonId = `${baseId}-q${index}`;
                const panelId = `${baseId}-a${index}`;
                return (
                    <div key={index} style={{ borderTop: '1px solid var(--line)' }}>
                        <h3 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
                            <button
                                type="button"
                                id={buttonId}
                                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                                style={{ font: 'inherit', color: 'inherit' }}
                                onClick={() => toggleItem(index)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                            >
                                <span className="transition-colors group-hover:text-[var(--accent)]">{item.question}</span>
                                <span
                                    className="ct-mono"
                                    aria-hidden="true"
                                    style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.3, color: isOpen ? 'var(--accent)' : 'var(--muted)', flex: 'none', width: 16, textAlign: 'center' }}
                                >
                                    {isOpen ? '−' : '+'}
                                </span>
                            </button>
                        </h3>
                        {/* Always rendered (crawlable); height animates 0fr → 1fr and reverses mid-flight on a quick re-click. */}
                        <div id={panelId} role="region" aria-labelledby={buttonId} className="ct-disclosure" data-open={isOpen} inert={!isOpen}>
                            <div>
                                <div className="ct-body" style={{ fontSize: 15, paddingBottom: 22, paddingRight: 40, maxWidth: '75ch' }}>
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
