import { Geist_Mono, Inter, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import WebMcpTools from '@/components/WebMcpTools';
import LeadLinkTracking from '@/components/LeadLinkTracking';
import SchemaScript from '@/components/SchemaScript';
import { SITE_URL, organizationSchema } from '@/lib/schema';
import { CONSENT_BOOTSTRAP_SCRIPT, GTM_ID, gtmLoaderScript } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';

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

/** The whole document for one language; each language has its own root layout (`(pl)` and `en`). */
export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
    return (
        <html
            lang={locale}
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
                    <Header locale={locale} />
                    <main className="w-full overflow-x-hidden">{children}</main>
                    <Footer locale={locale} />
                    <CookieConsent locale={locale} />
                    <WebMcpTools />
                    <LeadLinkTracking />
                </div>
            </body>
        </html>
    );
}
