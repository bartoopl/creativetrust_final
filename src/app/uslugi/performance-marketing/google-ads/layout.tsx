import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Kampanie Google Ads | Agencja Google Ads',
    description:
        'Skuteczne kampanie Google Ads nastawione na ROAS i konwersje. Zarządzamy budżetami, optymalizujemy kampanie i raportujemy wyniki.',
    alternates: {
        canonical: `${SITE_URL}/uslugi/performance-marketing/google-ads`,
    },
    openGraph: {
        title: 'Kampanie Google Ads | CreativeTrust',
        description: 'Skuteczne kampanie Google Ads: strategia, optymalizacja, raportowanie i audyt kampanii.',
        url: `${SITE_URL}/uslugi/performance-marketing/google-ads`,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Kampanie Google Ads | CreativeTrust',
        description: 'Skuteczne kampanie Google Ads: strategia, optymalizacja, raportowanie i audyt kampanii.',
    },
};

export default function GoogleAdsLayout({ children }: { children: ReactNode }) {
    return children;
}
