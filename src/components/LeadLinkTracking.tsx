"use client";

import { useEffect } from 'react';
import { leadSourceForHref, trackLead } from '@/lib/analytics';

/** Reports mailto/tel clicks anywhere on the site, CMS content included, as leads. */
export default function LeadLinkTracking() {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) return;
            const href = event.target.closest('a[href]')?.getAttribute('href');
            const source = href ? leadSourceForHref(href) : null;
            if (source) trackLead(source);
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return null;
}
