import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'CreativeTrust — AI-native partner produktowy | Web, E-commerce',
        template: '%s | CreativeTrust',
    },
    description: 'Strategia, design, development i automatyzacja AI w jednym zespole. 150+ projektów, 15 lat doświadczenia. Tworzymy produkty cyfrowe w tempie AI — wyniki, nie obietnice.',
    keywords: ['agencja AI', 'strony internetowe', 'e-commerce', 'marketing automation', 'UX design', 'automatyzacja AI', 'partner produktowy'],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'CreativeTrust — AI-native partner produktowy',
        description: 'Strategia, design, development i automatyzacja AI w jednym zespole. Tworzymy produkty cyfrowe w tempie AI.',
        url: SITE_URL,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CreativeTrust — AI-native partner produktowy',
        description: 'Strategia, design, development i automatyzacja AI w jednym zespole. Tworzymy produkty cyfrowe w tempie AI.',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
        },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function PolishRootLayout({ children }: { children: React.ReactNode }) {
    return <SiteShell locale="pl">{children}</SiteShell>;
}
