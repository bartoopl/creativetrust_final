import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

// Latest case studies and posts come from Sanity: regenerated hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
    // Already branded: absolute, so the root template does not add a second „| CreativeTrust”.
    title: { absolute: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo' },
    description: 'Strony www, ecommerce headless, marketing automation i social media. Strategia, design i wdrożenie w jednym zespole.',
    alternates: pageAlternates('/', 'pl', SITE_URL),
    openGraph: {
        title: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo',
        description: 'Strony www, ecommerce headless, marketing automation i social media.',
        url: SITE_URL,
        type: 'website',
    },
};

export default function Home() {
    return <HomePage locale="pl" />;
}
