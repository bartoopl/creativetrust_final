import type { Metadata } from 'next';
import { Geist_Mono, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import WebMcpTools from '@/components/WebMcpTools';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, organizationSchema } from '@/lib/schema';
import { CONSENT_BOOTSTRAP_SCRIPT, GTM_ID, gtmLoaderScript } from '@/lib/analytics';

const inter = Inter({
    subsets: ['latin', 'latin-ext'],
    variable: '--font-inter',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin', 'latin-ext'],
    variable: '--font-jetbrains',
    display: 'swap',
    weight: ['400', '500', '600'],
});

// Technical detail type of the site theme (.ct-v2); not preloaded, loads when first used.
const geistMono = Geist_Mono({
    subsets: ['latin', 'latin-ext'],
    variable: '--font-geist-mono',
    display: 'swap',
    weight: ['400', '500'],
    preload: false,
});

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="pl"
            className={`${inter.variable} ${jetbrainsMono.variable} ${geistMono.variable} overflow-x-hidden`}
        >
            <head>
                <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
                <link rel="dns-prefetch" href="https://cdn.sanity.io" />
                <SchemaScript schema={organizationSchema} />
                <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_SCRIPT }} />
            </head>
            <body className="overflow-x-hidden w-full antialiased" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
                <script dangerouslySetInnerHTML={{ __html: gtmLoaderScript(new URL(SITE_URL).hostname) }} />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                />
                <div className="ct-v2 w-full overflow-x-hidden">
                    <Header />
                    <main className="w-full overflow-x-hidden">{children}</main>
                    <Footer />
                    <CookieConsent />
                    <WebMcpTools />
                </div>
            </body>
        </html>
    );
}
