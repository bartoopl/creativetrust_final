'use client';

import Hero from '@/components/Hero';
import FeaturedCaseStudy from '@/components/FeaturedCaseStudy';
import Services from '@/components/Services';
import OurStory from '@/components/OurStory';
import PortfolioHomepage from '@/components/PortfolioHomepage';
import LatestBlogPosts from '@/components/LatestBlogPosts';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
    const animationRef = useRef(null);

    useEffect(() => {
        if (animationRef.current) {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.to(animationRef.current, {
                x: 40,
                y: -20,
                scale: 1.1,
                rotate: 10,
                duration: 2,
                ease: 'power1.inOut'
            }).to(animationRef.current, {
                x: -30,
                y: 10,
                scale: 0.95,
                rotate: -10,
                duration: 2,
                ease: 'power1.inOut'
            });
        }
    }, []);

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