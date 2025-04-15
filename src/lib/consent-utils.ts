// src/lib/consent-utils.ts
export type ConsentState = 'all' | 'essential' | 'custom';

export interface ConsentSettings {
    ad_storage: boolean;
    analytics_storage: boolean;
    functionality_storage: boolean;
    personalization_storage: boolean;
    security_storage: boolean;
}

// Aktualizuj zgody w GTM i dataLayer
export function updateConsent(consents: ConsentSettings) {
    // Konwertuj boolean na 'granted' lub 'denied'
    const consentMode: Record<string, 'granted' | 'denied'> = {
        ad_storage: consents.ad_storage ? 'granted' : 'denied',
        analytics_storage: consents.analytics_storage ? 'granted' : 'denied',
        functionality_storage: consents.functionality_storage ? 'granted' : 'denied',
        personalization_storage: consents.personalization_storage ? 'granted' : 'denied',
        security_storage: 'granted' // Zawsze granted dla bezpieczeństwa
    };

    // Określ typ zgody na podstawie ustawień
    let consentType: ConsentState = 'custom';

    if (
        consents.ad_storage &&
        consents.analytics_storage &&
        consents.functionality_storage &&
        consents.personalization_storage
    ) {
        consentType = 'all';
    } else if (
        !consents.ad_storage &&
        !consents.analytics_storage &&
        consents.functionality_storage &&
        !consents.personalization_storage
    ) {
        consentType = 'essential';
    }

    // Zapisz w localStorage
    localStorage.setItem('cookieConsent', consentType);
    localStorage.setItem('cookieConsentSettings', JSON.stringify(consents));

    // Aktualizuj dataLayer
    if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];

        // Wysyłamy event do GTM
        window.dataLayer.push({
            event: 'consent_update',
            consent: consentMode
        });

        // Dodatkowo aktualizujemy bezpośrednio gtag, jeśli jest dostępny
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', consentMode);
        }

        console.log('Consent settings updated:', {
            type: consentType,
            settings: consents,
            gtmPayload: consentMode
        });
    }

    return { consentType, consentMode };
}

// Wczytaj zgody z localStorage
export function loadConsent(): ConsentSettings {
    // Domyślne ustawienia - wszystko denied oprócz security
    const defaultSettings: ConsentSettings = {
        ad_storage: false,
        analytics_storage: false,
        functionality_storage: true, // Funkcjonalne są zwykle niezbędne
        personalization_storage: false,
        security_storage: true
    };

    try {
        // Sprawdź, czy mamy zapisane szczegółowe ustawienia
        const savedSettings = localStorage.getItem('cookieConsentSettings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }

        // Jeśli nie ma szczegółowych ustawień, sprawdź ogólny typ zgody
        const consentType = localStorage.getItem('cookieConsent');

        if (consentType === 'all') {
            return {
                ad_storage: true,
                analytics_storage: true,
                functionality_storage: true,
                personalization_storage: true,
                security_storage: true
            };
        } else if (consentType === 'essential') {
            return {
                ad_storage: false,
                analytics_storage: false,
                functionality_storage: true,
                personalization_storage: false,
                security_storage: true
            };
        }
    } catch (error) {
        console.error('Error loading consent settings:', error);
    }

    return defaultSettings;
}