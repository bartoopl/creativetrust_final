"use client";

import { useEffect, useRef } from 'react';

/** Public identifiers (not secrets): the CreativeTrust profile and Trustpilot's "Review Collector" TrustBox. */
export const TRUSTPILOT_BUSINESS_UNIT_ID = '6ae266b014c0719eb0bb48a7';
export const TRUSTPILOT_REVIEW_COLLECTOR_TEMPLATE = '56278e9abfbbba0bdcd568bc';
export const TRUSTPILOT_REVIEW_URL = 'https://pl.trustpilot.com/evaluate/creativetrust.pl';
const BOOTSTRAP_SRC = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

declare global {
    interface Window {
        Trustpilot?: { loadFromElement: (element: HTMLElement, forceReload?: boolean) => void };
    }
}

let bootstrap: Promise<void> | null = null;

function loadBootstrap(): Promise<void> {
    bootstrap ??= new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = BOOTSTRAP_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
            bootstrap = null;
            reject(new Error('Trustpilot bootstrap failed to load'));
        };
        document.head.appendChild(script);
    });
    return bootstrap;
}

/**
 * Footer prompt to review CreativeTrust on Trustpilot. The link is
 * server-rendered and works on its own (no JavaScript, script blocked, or
 * Trustpilot down); the official TrustBox replaces it only once the footer
 * scrolls near the viewport, so the third-party script never slows the page.
 */
export default function TrustpilotReviewCollector() {
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = widgetRef.current;
        if (!element || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                loadBootstrap()
                    .then(() => window.Trustpilot?.loadFromElement(element, true))
                    .catch(() => {
                        // The server-rendered link stays as the fallback.
                    });
            },
            { rootMargin: '200px' },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-2" style={{ maxWidth: 320 }}>
            <span className="ct-meta">Współpracowaliśmy?</span>
            <div
                ref={widgetRef}
                className="trustpilot-widget"
                data-locale="pl-PL"
                data-template-id={TRUSTPILOT_REVIEW_COLLECTOR_TEMPLATE}
                data-businessunit-id={TRUSTPILOT_BUSINESS_UNIT_ID}
                data-style-height="52px"
                data-style-width="100%"
                // The TrustBox centres its ~210px button; a narrow box keeps it aligned with the footer text.
                style={{ minHeight: 52, width: 220, marginLeft: -6 }}
            >
                <a href={TRUSTPILOT_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="ct-contact-link" style={{ fontSize: 14 }}>
                    Oceń nas na Trustpilot ★★★★★
                </a>
            </div>
        </div>
    );
}
