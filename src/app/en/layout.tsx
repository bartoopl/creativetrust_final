import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'CreativeTrust — E-commerce audit, management and build',
        template: '%s | CreativeTrust',
    },
    description: 'We audit and run brands’ e-commerce as an external team, and we design and build online stores and websites. E-commerce experience across many industries, including 5.10.15, Quiosque and the Monnari capital group.',
    keywords: ['e-commerce audit', 'e-commerce management', 'outsourced e-commerce manager', 'e-commerce consulting', 'online stores', 'e-commerce implementation', 'websites', 'marketing automation'],
    alternates: {
        canonical: '/en',
    },
    openGraph: {
        title: 'CreativeTrust — E-commerce audit, management and build',
        description: 'A store audit, outsourced e-commerce management, and the build of online stores and websites — in one team.',
        url: `${SITE_URL}/en`,
        siteName: 'CreativeTrust',
        locale: 'en_GB',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CreativeTrust — E-commerce audit, management and build',
        description: 'A store audit, outsourced e-commerce management, and the build of online stores and websites — in one team.',
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

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
    return <SiteShell locale="en">{children}</SiteShell>;
}
