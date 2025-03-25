import Hero from '@/components/Hero';
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import Services from '@/components/Services';
import OurStory from '@/components/OurStory';
import Portfolio from '@/components/Portfolio';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <Hero />
            <FeaturedCaseStudy />
            <Services />
            <OurStory />
            <Portfolio />
        </main>
    );
}