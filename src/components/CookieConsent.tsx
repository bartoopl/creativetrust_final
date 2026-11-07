"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ConsentManager from './ConsentManager';
import NotchedButton from './ui/NotchedButton';
import { updateConsent } from '@/lib/consent-utils';
import type { Locale } from '@/lib/i18n';

const copy = {
    pl: {
        region: 'Zgoda na pliki cookie',
        title: 'Pliki cookie',
        body: 'Używamy cookies, aby zapewnić najlepsze wrażenia podczas korzystania z naszej strony. Niektóre są niezbędne do funkcjonowania serwisu, inne pomagają nam analizować ruch i personalizować treści. Używając tej strony, wyrażasz zgodę na naszą',
        policy: { href: '/polityka-prywatnosci', label: 'politykę prywatności' },
        essential: 'Tylko niezbędne',
        settings: 'Ustawienia',
        acceptAll: 'Akceptuję wszystkie',
    },
    en: {
        region: 'Cookie consent',
        title: 'Cookies',
        body: 'We use cookies to give you the best experience on our website. Some are essential for the site to work; others help us analyse traffic and personalise content. By using this site, you agree to our',
        policy: { href: '/en/privacy-policy', label: 'privacy policy' },
        essential: 'Essential only',
        settings: 'Settings',
        acceptAll: 'Accept all',
    },
};

const CookieConsent = ({ locale = 'pl' }: { locale?: Locale }) => {
    const t = copy[locale];
    const [visible, setVisible] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        // Sprawdź, czy użytkownik już wyraził zgodę
        const hasConsent = localStorage.getItem('cookieConsent');
        if (!hasConsent) {
            setVisible(true);
        }
    }, []);

    // Akceptuj wszystkie zgody
    const acceptAll = () => {
        const allConsents = {
            ad_storage: true,
            analytics_storage: true,
            functionality_storage: true,
            personalization_storage: true,
            security_storage: true
        };

        updateConsent(allConsents);
        setVisible(false);
    };

    // Odrzuć opcjonalne zgody (zaakceptuj tylko niezbędne)
    const acceptEssential = () => {
        const essentialConsents = {
            ad_storage: false,
            analytics_storage: false,
            functionality_storage: true,
            personalization_storage: false,
            security_storage: true
        };

        updateConsent(essentialConsents);
        setVisible(false);
    };

    // Pokaż zaawansowane ustawienia
    const showAdvancedSettings = () => {
        setVisible(false);
        setShowManager(true);
    };

    return (
        <>
            {/* Rises from the bottom edge and leaves the same way (no early return, so the exit can play). */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={reduceMotion ? { opacity: 0 } : { y: '100%' }}
                        animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { y: '100%' }}
                        transition={reduceMotion ? { duration: 0.15 } : { type: 'spring', bounce: 0, duration: 0.4 }}
                        role="region"
                        aria-label={t.region}
                        className="fixed bottom-0 left-0 right-0 z-50"
                        style={{ background: 'var(--bg)', borderTop: '1px solid var(--line-strong)', padding: '20px var(--pad-x)' }}
                    >
                        <div className="mx-auto max-w-[1280px]">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
                                <div className="flex-1">
                                    <span className="ct-eyebrow">Cookies</span>
                                    <h3 style={{ fontSize: 16, fontWeight: 500, margin: '6px 0 6px', color: 'var(--text)' }}>{t.title}</h3>
                                    <p className="ct-body" style={{ fontSize: 13.5, maxWidth: '90ch' }}>
                                        {t.body}{' '}
                                        <a href={t.policy.href} style={{ textDecoration: 'underline' }}>{t.policy.label}</a>.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                                    <NotchedButton variant="ghost" onClick={acceptEssential}>
                                        {t.essential}
                                    </NotchedButton>
                                    <NotchedButton variant="ghost" onClick={showAdvancedSettings}>
                                        {t.settings}
                                    </NotchedButton>
                                    <NotchedButton variant="primary" onClick={acceptAll}>
                                        {t.acceptAll}
                                    </NotchedButton>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {showManager && <ConsentManager locale={locale} onClose={() => setShowManager(false)} />}
        </>
    );
};

export default CookieConsent;