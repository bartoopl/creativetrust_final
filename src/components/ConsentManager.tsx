"use client";

import React, { useState, useEffect } from 'react';
import { ConsentSettings, loadConsent, updateConsent } from '@/lib/consent-utils';
import NotchedButton from './ui/NotchedButton';
import type { Locale } from '@/lib/i18n';

interface ConsentManagerProps {
    locale?: Locale;
    onClose: () => void;
}

type Category = { key: keyof ConsentSettings; title: string; description: string; ariaOn: string; ariaOff: string };

const copy: Record<Locale, {
    title: string; close: string; essential: string; essentialBody: string;
    rejectOptional: string; acceptAll: string; save: string; categories: Category[];
}> = {
    pl: {
        title: 'Ustawienia prywatności',
        close: 'Zamknij',
        essential: 'Niezbędne (zawsze aktywne)',
        essentialBody: 'Te pliki cookie są niezbędne do funkcjonowania strony internetowej i nie mogą być wyłączone.',
        rejectOptional: 'Odrzuć opcjonalne',
        acceptAll: 'Akceptuj wszystkie',
        save: 'Zapisz preferencje',
        categories: [
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
        ],
    },
    en: {
        title: 'Privacy settings',
        close: 'Close',
        essential: 'Essential (always on)',
        essentialBody: 'These cookies are required for the website to work and cannot be switched off.',
        rejectOptional: 'Reject optional',
        acceptAll: 'Accept all',
        save: 'Save preferences',
        categories: [
            {
                key: 'functionality_storage',
                title: 'Functional',
                description: 'These cookies let the website remember the choices you make and provide improved functionality and personalisation.',
                ariaOn: 'Turn off functional',
                ariaOff: 'Turn on functional',
            },
            {
                key: 'analytics_storage',
                title: 'Analytics',
                description: 'These cookies let us analyse how the site is used so we can improve it and tailor it to visitors’ needs.',
                ariaOn: 'Turn off analytics',
                ariaOff: 'Turn on analytics',
            },
            {
                key: 'ad_storage',
                title: 'Marketing',
                description: 'These cookies are used to measure ad performance and show more relevant advertising.',
                ariaOn: 'Turn off marketing',
                ariaOff: 'Turn on marketing',
            },
            {
                key: 'personalization_storage',
                title: 'Personalisation',
                description: 'These cookies personalise the content you see on our site based on your previous behaviour and preferences.',
                ariaOn: 'Turn off personalisation',
                ariaOff: 'Turn on personalisation',
            },
        ],
    },
};

const ConsentManager: React.FC<ConsentManagerProps> = ({ locale = 'pl', onClose }) => {
    const t = copy[locale];
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

    const categories = t.categories;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.24)' }}>
            <div className="ct-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--radius-lg)' }}>
                <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                        <span className="ct-eyebrow">Cookies</span>
                        <h2 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.5px', margin: '6px 0 0' }}>{t.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label={t.close}
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
                            <span style={{ fontWeight: 500, fontSize: 15 }}>{t.essential}</span>
                            {toggle(true)}
                        </div>
                        <p className="ct-body" style={{ fontSize: 13.5 }}>
                            {t.essentialBody}
                        </p>
                    </div>

                    {categories.map((c) => (
                        <div key={c.key} style={{ padding: '16px 18px' }}>
                            <div className="flex items-center justify-between mb-2 gap-4">
                                <span style={{ fontWeight: 500, fontSize: 15 }}>{c.title}</span>
                                <button
                                    onClick={() => handleConsentChange(c.key)}
                                    className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
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
                            {t.rejectOptional}
                        </NotchedButton>
                        <NotchedButton variant="primary" onClick={acceptAll}>
                            {t.acceptAll}
                        </NotchedButton>
                    </div>
                    <NotchedButton variant="ghost" onClick={savePreferences}>
                        {t.save}
                    </NotchedButton>
                </div>
            </div>
        </div>
    );
};

export default ConsentManager;
