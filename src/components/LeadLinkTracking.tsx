"use client";

import { useEffect } from 'react';
import { contactMethodForHref, leadSourceForHref, trackContactClick, trackCtaClick, trackLead } from '@/lib/analytics';

/**
 * Reports two kinds of clicks anywhere on the site, CMS content included:
 * tel/mailto links (`click_contact` plus the existing `generate_lead` conversion)
 * and primary CTAs marked with `data-cta-label` (`cta_click`).
 */
export default function LeadLinkTracking() {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) return;
            const link = event.target.closest('a[href], [data-cta-label]');
            if (!link) return;

            const href = link.getAttribute('href');
            const method = href ? contactMethodForHref(href) : null;
            const source = href ? leadSourceForHref(href) : null;
            if (method && source) {
                trackContactClick(method);
                trackLead(source);
            }

            const ctaLabel = link.getAttribute('data-cta-label')?.trim();
            if (ctaLabel) trackCtaClick(ctaLabel);
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return null;
}
