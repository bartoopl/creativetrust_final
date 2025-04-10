import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['500', '700'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'CreativeTrust',
    description: 'Profesjonalne usługi marketingowe, tworzenie stron www i sklepów internetowych',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl" className="overflow-x-hidden">
        <head>
            {/* Google Tag Manager - umieść przed zamknięciem tagu head */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                            // Konfiguracja Consent Mode v2
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            
                            // Domyślne ustawienia Consent Mode - wszystko wymaga zgody (denied)
                            gtag('consent', 'default', {
                                'ad_storage': 'denied',
                                'analytics_storage': 'denied',
                                'functionality_storage': 'denied',
                                'personalization_storage': 'denied',
                                'security_storage': 'granted', // Zawsze dozwolone ze względów bezpieczeństwa
                                'wait_for_update': 500 // Czas oczekiwania na aktualizację zgody
                            });
                            
                            // Google Tag Manager
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-WTKHM3K');
                        `,
                }}
            />
        </head>
        <body className={`${manrope.className} overflow-x-hidden w-full`}>
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