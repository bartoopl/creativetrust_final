import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    // Project pages keep the brand suffix (a plain string title here would drop the root template).
    title: { default: 'Portfolio i realizacje', template: '%s | CreativeTrust' },
    description: 'Zobacz wybrane realizacje CreativeTrust: strony internetowe, e-commerce i kampanie marketingowe.',
    alternates: {
        ...pageAlternates('/portfolio', 'pl', SITE_URL),
        types: { 'text/markdown': `${SITE_URL}/portfolio.md` },
    },
    openGraph: {
        title: 'Portfolio i realizacje | CreativeTrust',
        description: 'Zobacz wybrane realizacje CreativeTrust dla firm i produktów cyfrowych.',
        url: `${SITE_URL}/portfolio`,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
    return children;
}
