import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'CreativeTrust — Audyt, zarządzanie i budowa e-commerce',
        template: '%s | CreativeTrust',
    },
    description: 'Audytujemy i prowadzimy e-commerce marek z zewnątrz, projektujemy i budujemy sklepy oraz strony internetowe. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.',
    keywords: ['audyt e-commerce', 'zarządzanie e-commerce', 'e-commerce manager z zewnątrz', 'konsulting e-commerce', 'sklepy internetowe', 'wdrożenia e-commerce', 'strony internetowe', 'marketing automation'],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'CreativeTrust — Audyt, zarządzanie i budowa e-commerce',
        description: 'Audyt sklepu, zarządzanie e-commerce z zewnątrz oraz budowa sklepów i stron internetowych w jednym zespole.',
        url: SITE_URL,
        siteName: 'CreativeTrust',
        locale: 'pl_PL',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'CreativeTrust — Audyt, zarządzanie i budowa e-commerce',
        description: 'Audyt sklepu, zarządzanie e-commerce z zewnątrz oraz budowa sklepów i stron internetowych w jednym zespole.',
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
