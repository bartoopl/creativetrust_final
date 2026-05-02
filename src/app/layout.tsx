import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import SchemaScript from '@/components/SchemaScript';
import { organizationSchema } from '@/lib/schema';

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['500', '700'],
    display: 'swap'
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.creativetrust.pl'),
    title: {
        default: 'CreativeTrust | Agencja Marketingowa',
        template: '%s | CreativeTrust',
    },
    description: 'Agencja marketingowa specjalizująca się w performance marketingu, tworzeniu stron WWW, e-commerce, brandingu i marketing automation.',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'CreativeTrust | Agencja Marketingowa',
        description: 'Performance marketing, strony WWW, e-commerce, branding i marketing automation dla firm.',
        url: 'https://www.creativetrust.pl',
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CreativeTrust | Agencja Marketingowa',
        description: 'Performance marketing, strony WWW, e-commerce, branding i marketing automation dla firm.',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl" className="overflow-x-hidden">
        <head>
            <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
            <link rel="dns-prefetch" href="https://cdn.sanity.io" />
            <SchemaScript schema={organizationSchema} />
            {/* Consent Mode musi być ustawiony przed uruchomieniem GTM. */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        // Inicjalizacja dataLayer
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        
                        // Domyślna konfiguracja Consent Mode v2 - wszystko wymaga zgody (denied)
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'analytics_storage': 'denied',
                            'functionality_storage': 'denied',
                            'personalization_storage': 'denied',
                            'security_storage': 'granted', // Zawsze dozwolone ze względów bezpieczeństwa
                            'wait_for_update': 500 // Czas oczekiwania na aktualizację zgody
                        });
                        
                        // Funkcja do przywracania zgód z localStorage
                        function restoreConsents() {
                            try {
                                const consentType = localStorage.getItem('cookieConsent');
                                const consentSettings = localStorage.getItem('cookieConsentSettings');
                                
                                if (consentSettings) {
                                    // Jeśli mamy szczegółowe ustawienia, użyj ich
                                    const settings = JSON.parse(consentSettings);
                                    const consentUpdate = {
                                        'ad_storage': settings.ad_storage ? 'granted' : 'denied',
                                        'analytics_storage': settings.analytics_storage ? 'granted' : 'denied',
                                        'functionality_storage': settings.functionality_storage ? 'granted' : 'denied',
                                        'personalization_storage': settings.personalization_storage ? 'granted' : 'denied',
                                        'security_storage': 'granted'
                                    };
                                    
                                    window.dataLayer.push({
                                        event: 'consent_update',
                                        consent: consentUpdate
                                    });
                                    
                                    console.log('Consent restored from detailed settings:', consentUpdate);
                                    return;
                                }
                                
                                if (consentType === 'all') {
                                    window.dataLayer.push({
                                        event: 'consent_update',
                                        consent: {
                                            ad_storage: 'granted',
                                            analytics_storage: 'granted',
                                            functionality_storage: 'granted',
                                            personalization_storage: 'granted',
                                            security_storage: 'granted'
                                        }
                                    });
                                    console.log('Consent restored from storage: all granted');
                                } else if (consentType === 'essential') {
                                    window.dataLayer.push({
                                        event: 'consent_update',
                                        consent: {
                                            ad_storage: 'denied',
                                            analytics_storage: 'denied',
                                            functionality_storage: 'granted',
                                            personalization_storage: 'denied',
                                            security_storage: 'granted'
                                        }
                                    });
                                    console.log('Consent restored from storage: only essential granted');
                                }
                            } catch (error) {
                                console.error('Error restoring consent settings:', error);
                            }
                        }
                        
                        // Wczytaj zapisane zgody
                        restoreConsents();
                    `,
                }}
            />
        </head>
        <body className={`${manrope.className} overflow-x-hidden w-full`}>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function(w,d,s,l,i){
                        w[l]=w[l]||[];
                        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-WTKHM3K');
                `,
            }}
        />
        {/* Google Tag Manager (noscript) - umieść na początku body */}
        <noscript
            dangerouslySetInnerHTML={{
                __html: `
                            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WTKHM3K"
                            height="0" width="0" style="display:none;visibility:hidden"></iframe>
                        `,
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