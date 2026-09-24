"use client";

import React, { useState, useEffect } from 'react';
import { ConsentSettings, loadConsent, updateConsent } from '@/lib/consent-utils';
import NotchedButton from './ui/NotchedButton';

interface ConsentManagerProps {
    onClose: () => void;
}

const ConsentManager: React.FC<ConsentManagerProps> = ({ onClose }) => {
    const [consents, setConsents] = useState<ConsentSettings>({
        analytics_storage: false,
        ad_storage: false,
        functionality_storage: true,
        personalization_storage: false,
        security_storage: true
    });

    useEffect(() => {
        // Pobierz aktualne preferencje z localStorage przy montowaniu komponentu
        const storedConsents = loadConsent();
        setConsents(storedConsents);
    }, []);

    const savePreferences = () => {
        // Aktualizuj zgody w dataLayer i localStorage
        updateConsent(consents);
        onClose();
    };

    const acceptAll = () => {
        const allConsents: ConsentSettings = {
            analytics_storage: true,
            ad_storage: true,
            functionality_storage: true,
            personalization_storage: true,
            security_storage: true
        };

        setConsents(allConsents);
        setTimeout(() => {
            updateConsent(allConsents);
            onClose();
        }, 100);
    };

    const rejectAll = () => {
        const essentialConsents: ConsentSettings = {
            analytics_storage: false,
            ad_storage: false,
            functionality_storage: true,
            personalization_storage: false,
            security_storage: true
        };

        setConsents(essentialConsents);
        setTimeout(() => {
            updateConsent(essentialConsents);
            onClose();
        }, 100);
    };

    // Funkcja do obsługi zmiany dla konkretnego przełącznika
    const handleConsentChange = (key: keyof ConsentSettings) => {
        // Nie pozwól na zmianę dla security_storage
        if (key === 'security_storage') return;

        setConsents(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggle = (on: boolean) => (
        <div className="relative w-10 h-6">
            <div className="block w-10 h-6 rounded-full transition-colors" style={{ background: on ? 'var(--accent)' : 'var(--line-strong)' }}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${on ? 'transform translate-x-4' : ''}`}></div>
        </div>
    );

    const categories: { key: keyof ConsentSettings; title: string; description: string; ariaOn: string; ariaOff: string }[] = [
        {
            key: 'functionality_storage',
            title: 'Funkcjonalne',
            description: 'Te pliki cookie umożliwiają stronie internetowej zapamiętanie wyborów dokonanych przez użytkownika i zapewniają lepszą funkcjonalność i personalizację.',
            ariaOn: 'Wyłącz funkcjonalne',
            ariaOff: 'Włącz funkcjonalne',
        },
        {
            key: 'analytics_storage',
            title: 'Analityczne',
            description: 'Te pliki cookie pozwalają nam analizować użytkowanie strony, aby poprawić jej funkcjonowanie i dostosować do potrzeb użytkowników.',
            ariaOn: 'Wyłącz analityczne',
            ariaOff: 'Włącz analityczne',
        },
        {
            key: 'ad_storage',
            title: 'Marketingowe',
            description: 'Te pliki cookie są używane do śledzenia skuteczności reklam i wyświetlania bardziej odpowiednich treści reklamowych.',
            ariaOn: 'Wyłącz marketingowe',
            ariaOff: 'Włącz marketingowe',
        },
        {
            key: 'personalization_storage',
            title: 'Personalizacja',
            description: 'Te pliki cookie umożliwiają personalizację treści, które widzisz na naszej stronie, na podstawie Twoich wcześniejszych zachowań i preferencji.',
            ariaOn: 'Wyłącz personalizację',
            ariaOff: 'Włącz personalizację',
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(17,24,39,0.24)' }}>
            <div className="ct-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--radius-lg)' }}>
                <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                        <span className="ct-eyebrow">Cookies</span>
                        <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px', margin: '6px 0 0' }}>Ustawienia prywatności</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="ct-contact-link"
                        style={{ color: 'var(--muted)' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="ct-grid-lines grid-cols-1" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {/* Niezbędne */}
                    <div style={{ padding: '16px 18px' }}>
                        <div className="flex items-center justify-between mb-2 gap-4">
                            <span style={{ fontWeight: 600, fontSize: 15 }}>Niezbędne (zawsze aktywne)</span>
                            {toggle(true)}
                        </div>
                        <p className="ct-body" style={{ fontSize: 13.5 }}>
                            Te pliki cookie są niezbędne do funkcjonowania strony internetowej i nie mogą być wyłączone.
                        </p>
                    </div>

                    {categories.map((c) => (
                        <div key={c.key} style={{ padding: '16px 18px' }}>
                            <div className="flex items-center justify-between mb-2 gap-4">
                                <span style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</span>
                                <button
                                    onClick={() => handleConsentChange(c.key)}
                                    className="focus:outline-none"
                                    aria-label={consents[c.key] ? c.ariaOn : c.ariaOff}
                                >
                                    {toggle(consents[c.key])}
                                </button>
                            </div>
                            <p className="ct-body" style={{ fontSize: 13.5 }}>{c.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-between items-center gap-3">
                    <div className="flex flex-wrap gap-2">
                        <NotchedButton variant="ghost" onClick={rejectAll}>
                            Odrzuć opcjonalne
                        </NotchedButton>
                        <NotchedButton variant="primary" onClick={acceptAll}>
                            Akceptuj wszystkie
                        </NotchedButton>
                    </div>
                    <NotchedButton variant="ghost" onClick={savePreferences}>
                        Zapisz preferencje
                    </NotchedButton>
                </div>
            </div>
        </div>
    );
};

export default ConsentManager;
