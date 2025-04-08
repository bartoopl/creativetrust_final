import Hero from '@/components/Hero';
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import Services from '@/components/Services';
import OurStory from '@/components/OurStory';
import PortfolioHomepage from '@/components/PortfolioHomepage';
import LatestBlogPosts from '@/components/LatestBlogPosts';

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col">
            <Hero />
            <FeaturedCaseStudy />
            <Services />
            <OurStory />
            <PortfolioHomepage />
            <LatestBlogPosts />
        </main>
    );
}