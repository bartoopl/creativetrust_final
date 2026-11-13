/** GTM container of the production site; it also carries the GA4 tags. */
export const GTM_ID = 'GTM-WTKHM3K';

/**
 * Standard GTM snippet, run only on the production hostname: localhost and deploy
 * previews would otherwise report to the production GA4 property.
 */
export function gtmLoaderScript(hostname: string): string {
    return `if(location.hostname===${JSON.stringify(hostname)}){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});}`;
}

/**
 * Consent Mode defaults, then the visitor's stored choice. Must run before GTM loads.
 * The choice goes through gtag('consent', 'update'): Consent Mode ignores a plain
 * dataLayer event, so `consent_update` alone would leave a returning visitor denied.
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
});
(function () {
    function storedConsent() {
        var consentType = localStorage.getItem('cookieConsent');
        var consentSettings = localStorage.getItem('cookieConsentSettings');
        if (consentSettings) {
            var settings = JSON.parse(consentSettings);
            return {
                ad_storage: settings.ad_storage ? 'granted' : 'denied',
                analytics_storage: settings.analytics_storage ? 'granted' : 'denied',
                functionality_storage: settings.functionality_storage ? 'granted' : 'denied',
                personalization_storage: settings.personalization_storage ? 'granted' : 'denied',
                security_storage: 'granted'
            };
        }
        if (consentType === 'all') {
            return {
                ad_storage: 'granted', analytics_storage: 'granted',
                functionality_storage: 'granted', personalization_storage: 'granted',
                security_storage: 'granted'
            };
        }
        if (consentType === 'essential') {
            return {
                ad_storage: 'denied', analytics_storage: 'denied',
                functionality_storage: 'granted', personalization_storage: 'denied',
                security_storage: 'granted'
            };
        }
        return null;
    }
    try {
        var consent = storedConsent();
        if (consent) {
            gtag('consent', 'update', consent);
            window.dataLayer.push({ event: 'consent_update', consent: consent });
        }
    } catch (e) {}
})();
`;

export type LeadSource = 'contact_form' | 'landing_form' | 'email_click' | 'phone_click';

export type ContactMethod = 'phone' | 'email';

/** Current path without the query string; empty during a server render. */
function pagePath(): string {
    return typeof window !== 'undefined' && window.location ? window.location.pathname : '';
}

/** GA4 `generate_lead`, forwarded by GTM. Never pass form values here: they would end up in GA4. */
export function trackLead(leadSource: LeadSource): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', lead_source: leadSource });
}

/**
 * A lead confirmed by a form: same `generate_lead` event (the GTM lead trigger keeps working)
 * with the extra `form_name` and `page_path` dimensions that separate the forms and pages.
 */
export function trackFormLead(leadSource: LeadSource, formName: string): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'generate_lead',
        lead_source: leadSource,
        form_name: formName,
        page_path: pagePath(),
    });
}

/** A click on a phone number or an e-mail address anywhere on the site. */
export function trackContactClick(method: ContactMethod): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'click_contact', method });
}

/** A click on a primary CTA; `cta_label` is the visible label, so reports stay readable. */
export function trackCtaClick(ctaLabel: string): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'cta_click', cta_label: ctaLabel });
}

export function leadSourceForHref(href: string): LeadSource | null {
    if (href.startsWith('mailto:')) return 'email_click';
    if (href.startsWith('tel:')) return 'phone_click';
    return null;
}

/** `email`/`phone` for a contact link, `null` for every other href. */
export function contactMethodForHref(href: string): ContactMethod | null {
    if (href.startsWith('mailto:')) return 'email';
    if (href.startsWith('tel:')) return 'phone';
    return null;
}
