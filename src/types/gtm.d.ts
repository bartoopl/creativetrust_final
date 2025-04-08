// src/types/gtm.d.ts

interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
}

type ConsentMode = {
    ad_storage?: 'granted' | 'denied';
    analytics_storage?: 'granted' | 'denied';
    functionality_storage?: 'granted' | 'denied';
    personalization_storage?: 'granted' | 'denied';
    security_storage?: 'granted' | 'denied';
    wait_for_update?: number;
};

interface ConsentUpdate {
    event: 'consent_update';
    consent: ConsentMode;
}