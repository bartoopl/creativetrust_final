import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Portfolio i realizacje',
    description: 'Zobacz wybrane realizacje CreativeTrust: strony internetowe, e-commerce i kampanie marketingowe.',
    alternates: {
        canonical: `${SITE_URL}/portfolio`,
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
