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
            <div className="absolute top-[100px] right-[100px] w-[300px] h-[300px] z-0">
                <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                >
                    <path
                        d="M10,90 Q50,-10 90,90"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="160"
                        strokeDashoffset="160"
                        className="animate-[dashDraw_4s_ease-in-out_forwards]"
                    />
                </svg>
                <div className="absolute w-full h-full overflow-visible pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-[particleFloat_4s_linear_infinite]"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute top-[200px] right-[100px] z-10">
                <div
                    ref={animationRef}
                    className="w-[200px] h-[200px] bg-gradient-to-br from-fuchsia-500 to-yellow-400 rounded-full shadow-2xl opacity-90 mix-blend-screen transition-transform duration-300 hover:scale-110 hover:rotate-3 cursor-pointer"
                />
            </div>
        </main>
    );
}