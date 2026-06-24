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
    title: 'CreativeTrust — AI-native partner produktowy | Web, E-commerce, Automatyzacja',
    description: 'Projektujemy web, e-commerce i automatyzacje z prędkością AI. Strategia, design i wdrożenie w jednym zespole.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'CreativeTrust — AI-native partner produktowy',
        description: 'Projektujemy web, e-commerce i automatyzacje z prędkością AI.',
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
