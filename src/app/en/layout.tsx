import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'CreativeTrust — AI-native product partner | Web, E-commerce',
        template: '%s | CreativeTrust',
    },
    description: 'Strategy, design, development and AI automation in one team. 150+ projects, 15 years of experience. We build digital products at AI speed — results, not promises.',
    keywords: ['AI agency', 'websites', 'e-commerce', 'marketing automation', 'UX design', 'AI automation', 'product partner'],
    alternates: {
        canonical: '/en',
    },
    openGraph: {
        title: 'CreativeTrust — AI-native product partner',
        description: 'Strategy, design, development and AI automation in one team. We build digital products at AI speed.',
        url: `${SITE_URL}/en`,
        siteName: 'CreativeTrust',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CreativeTrust — AI-native product partner',
        description: 'Strategy, design, development and AI automation in one team. We build digital products at AI speed.',
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
