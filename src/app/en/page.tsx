import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

// Rendered on request from cached CMS data (src/lib/cms.ts); saving in the
// admin refreshes it immediately, otherwise it is re-read hourly.

export const metadata: Metadata = {
    title: { absolute: 'CreativeTrust — Digital projects that work for your business' },
    description: 'Websites, headless e-commerce, marketing automation and social media. Strategy, design and delivery in one team.',
    alternates: pageAlternates('/', 'en', SITE_URL),
    openGraph: {
        title: 'CreativeTrust — Digital projects that work for your business',
        description: 'Websites, headless e-commerce, marketing automation and social media.',
        url: `${SITE_URL}/en`,
        locale: 'en_GB',
        type: 'website',
    },
};

export default function Home() {
    return <HomePage locale="en" />;
}
