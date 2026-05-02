import { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Meta Ads | Skuteczne kampanie na Facebooku i Instagramie - CreativeTrust',
    description: 'Zwiększ sprzedaż i rozpoznawalność marki dzięki kampaniom reklamowym na Facebooku i Instagramie. Profesjonalne prowadzenie i optymalizacja kampanii Meta Ads.',
    alternates: {
        canonical: `${SITE_URL}/uslugi/performance-marketing/meta-ads`,
    },
    openGraph: {
        title: 'Meta Ads | CreativeTrust',
        description: 'Kampanie Meta Ads na Facebooku i Instagramie: strategia, kreacje, optymalizacja i raportowanie.',
        url: `${SITE_URL}/uslugi/performance-marketing/meta-ads`,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Meta Ads | CreativeTrust',
        description: 'Kampanie Meta Ads na Facebooku i Instagramie: strategia, kreacje, optymalizacja i raportowanie.',
    },
}; 