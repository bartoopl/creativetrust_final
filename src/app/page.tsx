import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import StatsSection from '@/components/StatsSection';
import Services from '@/components/Services';
import NeuralBridgeSection from '@/components/NeuralBridgeSection';
import ProcessSection from '@/components/ProcessSection';
import RealizacjeSection from '@/components/RealizacjeSection';
import TestimonialSection from '@/components/TestimonialSection';
import LatestBlogPosts from '@/components/LatestBlogPosts';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
    title: 'CreativeTrust — AI-native partner produktowy | Branding, Web, E-commerce',
    description: 'Strategia, design, development i automatyzacja AI w jednym zespole. 150+ projektów, 15 lat doświadczenia. Tworzymy marki i produkty cyfrowe w tempie AI — wyniki, nie obietnice.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'CreativeTrust — AI-native partner produktowy',
        description: 'Tworzymy marki i produkty cyfrowe w tempie AI. Strategia, design, development i automatyzacja w jednym zespole.',
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
            <NeuralBridgeSection />
            <ProcessSection />
            <RealizacjeSection />
            <TestimonialSection />
            <LatestBlogPosts />
            <CTASection />
        </main>
    );
}
