import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import StatsSection from '@/components/StatsSection';
import WhyUsSection from '@/components/WhyUsSection';
import Services from '@/components/Services';
import ProcessPipelineSection from '@/components/ProcessPipelineSection';
import RealizacjeSection from '@/components/RealizacjeSection';
import TestimonialSection from '@/components/TestimonialSection';
import BlogSection from '@/components/BlogSection';
import CTASection from '@/components/CTASection';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo',
    description: 'Strony www, ecommerce headless, marketing automation i social media. Strategia, design i wdrożenie w jednym zespole.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo',
        description: 'Strony www, ecommerce headless, marketing automation i social media.',
        url: SITE_URL,
        type: 'website',
    },
};

export default function Home() {
    return (
        <>
            <Hero />
            <ClientLogos />
            <StatsSection />
            <WhyUsSection />
            <Services />
            <ProcessPipelineSection />
            <RealizacjeSection />
            <TestimonialSection />
            <BlogSection />
            <CTASection />
        </>
    );
}
