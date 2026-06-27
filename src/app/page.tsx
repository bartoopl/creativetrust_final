import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import StatsSection from '@/components/StatsSection';
import Services from '@/components/Services';
import ProcessSection from '@/components/ProcessSection';
import RealizacjeSection from '@/components/RealizacjeSection';
import LatestBlogPosts from '@/components/LatestBlogPosts';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
    title: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo',
    description: 'Strony www, ecommerce headless, marketing automation i social media. Strategia, design i wdrożenie w jednym zespole.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo',
        description: 'Strony www, ecommerce headless, marketing automation i social media.',
        url: 'https://creativetrust.pl',
        type: 'website',
    },
};

export default function Home() {
    return (
        <main>
            <Hero />
            <ClientLogos />
            <StatsSection />
            <Services />
            <ProcessSection />
            <RealizacjeSection />
            <LatestBlogPosts />
            <CTASection />
        </main>
    );
}
