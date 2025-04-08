"use client";

import React, { useState, useEffect } from 'react';
import ConsentManager from './ConsentManager';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);
    const [showManager, setShowManager] = useState(false);

    useEffect(() => {
        // Sprawdź, czy użytkownik już wyraził zgodę
        const hasConsent = localStorage.getItem('cookieConsent');
        if (!hasConsent) {
            setVisible(true);
        }
    }, []);

    // Akceptuj wszystkie zgody
    const acceptAll = () => {
        // Ustawienie zgód w dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'consent_update',
            consent: {
                ad_storage: 'granted',
                analytics_storage: 'granted',
                functionality_storage: 'granted',
                personalization_storage: 'granted',
                security_storage: 'granted'
            }
        });

        localStorage.setItem('cookieConsent', 'all');
        setVisible(false);
    };

    // Odrzuć opcjonalne zgody (zaakceptuj tylko niezbędne)
    const acceptEssential = () => {
        // Ustawienie zgód w dataLayer - tylko niezbędne
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'consent_update',
            consent: {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'granted', // Funkcjonalne są potrzebne do działania strony
                personalization_storage: 'denied',
                security_storage: 'granted'
            }
        });

        localStorage.setItem('cookieConsent', 'essential');
        setVisible(false);
    };

    // Pokaż zaawansowane ustawienia
    const showAdvancedSettings = () => {
        setVisible(false);
        setShowManager(true);
    };

    if (!visible && !showManager) return null;

    return (
        <>
            {visible && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200 p-4 md:p-6">
                    <div className="max-w-[1800px] mx-auto">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium mb-2">Pliki cookie</h3>
                                <p className="text-gray-600 text-sm">
                                    Używamy cookies, aby zapewnić najlepsze wrażenia podczas korzystania z naszej strony.
                                    Niektóre są niezbędne do funkcjonowania serwisu, inne pomagają nam analizować ruch i
                                    personalizować treści. Używając tej strony, wyrażasz zgodę na naszą{' '}
                                    <a href="/polityka-prywatnosci" className="underline">politykę prywatności</a>.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={acceptEssential}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Tylko niezbędne
                                </button>
                                <button
                                    onClick={showAdvancedSettings}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Ustawienia
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
                                >
                                    Akceptuję wszystkie
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showManager && <ConsentManager onClose={() => setShowManager(false)} />}
        </>
    );
};

export default CookieConsent;