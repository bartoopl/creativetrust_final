import type { Metadata } from 'next';
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import SchemaScript from '@/components/SchemaScript';
import { organizationSchema } from '@/lib/schema';

const hankenGrotesk = Hanken_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-hanken',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-space',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://creativetrust.pl'),
    title: {
        default: 'CreativeTrust — AI-native partner produktowy | Branding, Web, E-commerce',
        template: '%s | CreativeTrust',
    },
    description: 'Strategia, design, development i automatyzacja AI w jednym zespole. 150+ projektów, 15 lat doświadczenia. Tworzymy marki i produkty cyfrowe w tempie AI — wyniki, nie obietnice.',
    keywords: ['agencja AI', 'branding', 'strony internetowe', 'e-commerce', 'marketing automation', 'UX design', 'automatyzacja AI', 'partner produktowy'],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'CreativeTrust — AI-native partner produktowy',
        description: 'Strategia, design, development i automatyzacja AI w jednym zespole. Tworzymy marki i produkty cyfrowe w tempie AI.',
        url: 'https://creativetrust.pl',
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CreativeTrust — AI-native partner produktowy',
        description: 'Strategia, design, development i automatyzacja AI w jednym zespole. Tworzymy marki i produkty cyfrowe w tempie AI.',
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
            className={`overflow-x-hidden ${hankenGrotesk.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
            style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        >
            <head>
                <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
                <link rel="dns-prefetch" href="https://cdn.sanity.io" />
                <SchemaScript schema={organizationSchema} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'analytics_storage': 'denied',
                            'functionality_storage': 'denied',
                            'personalization_storage': 'denied',
                            'security_storage': 'granted',
                            'wait_for_update': 500
                        });
                        function restoreConsents() {
                            try {
                                const consentType = localStorage.getItem('cookieConsent');
                                const consentSettings = localStorage.getItem('cookieConsentSettings');
                                if (consentSettings) {
                                    const settings = JSON.parse(consentSettings);
                                    window.dataLayer.push({ event: 'consent_update', consent: {
                                        'ad_storage': settings.ad_storage ? 'granted' : 'denied',
                                        'analytics_storage': settings.analytics_storage ? 'granted' : 'denied',
                                        'functionality_storage': settings.functionality_storage ? 'granted' : 'denied',
                                        'personalization_storage': settings.personalization_storage ? 'granted' : 'denied',
                                        'security_storage': 'granted'
                                    }});
                                    return;
                                }
                                if (consentType === 'all') {
                                    window.dataLayer.push({ event: 'consent_update', consent: {
                                        ad_storage: 'granted', analytics_storage: 'granted',
                                        functionality_storage: 'granted', personalization_storage: 'granted',
                                        security_storage: 'granted'
                                    }});
                                } else if (consentType === 'essential') {
                                    window.dataLayer.push({ event: 'consent_update', consent: {
                                        ad_storage: 'denied', analytics_storage: 'denied',
                                        functionality_storage: 'granted', personalization_storage: 'denied',
                                        security_storage: 'granted'
                                    }});
                                }
                            } catch(e) {}
                        }
                        restoreConsents();
                    `,
                    }}
                />
            </head>
            <body className="overflow-x-hidden w-full antialiased" style={{ fontFamily: 'var(--font-hanken), sans-serif' }}>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WTKHM3K');`,
                    }}
                />
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WTKHM3K" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                />
                <div className="w-full overflow-x-hidden">
                    <Header />
                    <main className="w-full overflow-x-hidden">{children}</main>
                    <Footer />
                    <CookieConsent />
                </div>
            </body>
        </html>
    );
}
