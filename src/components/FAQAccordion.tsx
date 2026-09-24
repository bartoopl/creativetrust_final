"use client";

import React, { useState } from 'react';

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

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={{ borderBottom: '1px solid var(--line)' }}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} style={{ borderTop: '1px solid var(--line)' }}>
                        <button
                            type="button"
                            className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                            onClick={() => toggleItem(index)}
                            aria-expanded={isOpen}
                        >
                            <h3
                                className="transition-colors group-hover:text-[var(--accent)]"
                                style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.4, margin: 0 }}
                            >
                                {item.question}
                            </h3>
                            <span
                                className="ct-mono"
                                aria-hidden="true"
                                style={{ fontSize: 18, lineHeight: 1.3, color: isOpen ? 'var(--accent)' : 'var(--muted)', flex: 'none', width: 16, textAlign: 'center' }}
                            >
                                {isOpen ? '−' : '+'}
                            </span>
                        </button>
                        {isOpen && (
                            <div className="ct-body" style={{ fontSize: 15, paddingBottom: 22, paddingRight: 40, maxWidth: '75ch', animation: 'ctfade .2s ease' }}>
                                {item.answer}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
