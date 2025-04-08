"use client";

import React, { useState, useEffect } from 'react';

interface ConsentManagerProps {
    onClose: () => void;
}

const ConsentManager: React.FC<ConsentManagerProps> = ({ onClose }) => {
    const [consents, setConsents] = useState({
        analytics_storage: false,
        ad_storage: false,
        functionality_storage: true,
        personalization_storage: false,
        security_storage: true
    });

    useEffect(() => {
        // Pobierz aktualne preferencje z localStorage
        const storedConsent = localStorage.getItem('cookieConsent');
        if (storedConsent === 'all') {
            setConsents({
                analytics_storage: true,
                ad_storage: true,
                functionality_storage: true,
                personalization_storage: true,
                security_storage: true
            });
        }
    }, []);

    const savePreferences = () => {
        // Przekształć preferencje na format Consent Mode
        const consentUpdate: { [key: string]: 'granted' | 'denied' } = {
            ad_storage: consents.ad_storage ? 'granted' : 'denied',
            analytics_storage: consents.analytics_storage ? 'granted' : 'denied',
            functionality_storage: consents.functionality_storage ? 'granted' : 'denied',
            personalization_storage: consents.personalization_storage ? 'granted' : 'denied',
            security_storage: 'granted'
        };

        // Zapisz w localStorage
        if (consents.analytics_storage && consents.ad_storage &&
            consents.functionality_storage && consents.personalization_storage) {
            localStorage.setItem('cookieConsent', 'all');
        } else if (consents.functionality_storage) {
            localStorage.setItem('cookieConsent', 'essential');
        } else {
            localStorage.setItem('cookieConsent', 'minimal');
        }

        // Aktualizuj w dataLayer
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'consent_update',
                consent: consentUpdate
            });
        }

        onClose();
    };

    const acceptAll = () => {
        setConsents({
            analytics_storage: true,
            ad_storage: true,
            functionality_storage: true,
            personalization_storage: true,
            security_storage: true
        });

        setTimeout(savePreferences, 100);
    };

    const rejectAll = () => {
        setConsents({
            analytics_storage: false,
            ad_storage: false,
            functionality_storage: true,
            personalization_storage: false,
            security_storage: true
        });

        setTimeout(savePreferences, 100);
    };

    // Funkcja do obsługi kliknięcia na przełącznik
    const handleToggleClick = (key: keyof typeof consents) => {
        if (key === 'security_storage') return; // Nie pozwól na zmianę dla security_storage

        setConsents(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium">Ustawienia prywatności</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Niezbędne */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Niezbędne (zawsze aktywne)</span>
                            <label className="inline-flex items-center cursor-not-allowed">
                                <div className="relative w-10 h-6">
                                    <input type="checkbox" className="hidden" checked={true} readOnly />
                                    <div className="block bg-black w-10 h-6 rounded-full"></div>
                                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform translate-x-4"></div>
                                </div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-600">
                            Te pliki cookie są niezbędne do funkcjonowania strony internetowej i nie mogą być wyłączone.
                        </p>
                    </div>

                    {/* Funkcjonalne */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Funkcjonalne</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <div
                                    className="relative w-10 h-6"
                                    onClick={() => handleToggleClick('functionality_storage')}
                                >
                                    <input type="checkbox" className="hidden" checked={consents.functionality_storage} readOnly />
                                    <div className={`block w-10 h-6 rounded-full transition-colors ${consents.functionality_storage ? 'bg-black' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${consents.functionality_storage ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-600">
                            Te pliki cookie umożliwiają stronie internetowej zapamiętanie wyborów dokonanych przez użytkownika
                            i zapewniają lepszą funkcjonalność i personalizację.
                        </p>
                    </div>

                    {/* Analityczne */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Analityczne</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <div
                                    className="relative w-10 h-6"
                                    onClick={() => handleToggleClick('analytics_storage')}
                                >
                                    <input type="checkbox" className="hidden" checked={consents.analytics_storage} readOnly />
                                    <div className={`block w-10 h-6 rounded-full transition-colors ${consents.analytics_storage ? 'bg-black' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${consents.analytics_storage ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-600">
                            Te pliki cookie pozwalają nam analizować użytkowanie strony, aby poprawić jej funkcjonowanie
                            i dostosować do potrzeb użytkowników.
                        </p>
                    </div>

                    {/* Marketingowe */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Marketingowe</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <div
                                    className="relative w-10 h-6"
                                    onClick={() => handleToggleClick('ad_storage')}
                                >
                                    <input type="checkbox" className="hidden" checked={consents.ad_storage} readOnly />
                                    <div className={`block w-10 h-6 rounded-full transition-colors ${consents.ad_storage ? 'bg-black' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${consents.ad_storage ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-600">
                            Te pliki cookie są używane do śledzenia skuteczności reklam i wyświetlania bardziej
                            odpowiednich treści reklamowych.
                        </p>
                    </div>

                    {/* Personalizacja */}
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Personalizacja</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <div
                                    className="relative w-10 h-6"
                                    onClick={() => handleToggleClick('personalization_storage')}
                                >
                                    <input type="checkbox" className="hidden" checked={consents.personalization_storage} readOnly />
                                    <div className={`block w-10 h-6 rounded-full transition-colors ${consents.personalization_storage ? 'bg-black' : 'bg-gray-300'}`}></div>
                                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${consents.personalization_storage ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-600">
                            Te pliki cookie umożliwiają personalizację treści, które widzisz na naszej stronie,
                            na podstawie Twoich wcześniejszych zachowań i preferencji.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <div className="space-x-4">
                        <button
                            onClick={rejectAll}
                            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
                        >
                            Odrzuć opcjonalne
                        </button>
                        <button
                            onClick={acceptAll}
                            className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                        >
                            Akceptuj wszystkie
                        </button>
                    </div>
                    <button
                        onClick={savePreferences}
                        className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                    >
                        Zapisz preferencje
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsentManager;