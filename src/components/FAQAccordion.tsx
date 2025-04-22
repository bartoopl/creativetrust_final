import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        onClick={() => toggleItem(index)}
                    >
                        <h3 className="text-lg font-medium">{item.question}</h3>
                        <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                                openIndex === index ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                    {openIndex === index && (
                        <div className="px-6 pb-4">
                            <div className="text-gray-600">
                                {item.answer}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
} 