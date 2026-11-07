import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    // Project pages keep the brand suffix (a plain string title here would drop the root template).
    title: { default: 'Portfolio and case studies', template: '%s | CreativeTrust' },
    description: 'See selected CreativeTrust projects: websites, e-commerce and marketing campaigns.',
    alternates: pageAlternates('/portfolio', 'en', SITE_URL),
    openGraph: {
        title: 'Portfolio and case studies | CreativeTrust',
        description: 'See selected CreativeTrust projects for companies and digital products.',
        url: `${SITE_URL}/en/portfolio`,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
    return children;
}
