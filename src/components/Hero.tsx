"use client";

import React, { useEffect, useRef } from 'react';
import Button from './Button';
import gsap from 'gsap';

const AdvancedHero: React.FC = () => {
    const headlineText = "Tworzymy strategie, które przynoszą realne wyniki dla Twojego biznesu.";
    const containerRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const orbsRef = useRef<HTMLDivElement>(null);

    // Ustawienie animacji śledzenia kursora
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current || !cursorRef.current || !orbsRef.current) return;

            // Animacja kursora
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });

            // Animacja orbs (animowane elementy tła, które podążają za kursorem)
            const orbs = orbsRef.current.children;
            for (let i = 0; i < orbs.length; i++) {
                const orb = orbs[i] as HTMLElement;
                const speed = parseFloat(orb.getAttribute('data-speed') || '0.1');
                const delay = i * 0.05;

                gsap.to(orb, {
                    x: (e.clientX - window.innerWidth / 2) * speed,
                    y: (e.clientY - window.innerHeight / 2) * speed,
                    duration: 1,
                    delay: delay,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Animacja głównego tekstu
    useEffect(() => {
        if (!containerRef.current) return;

        // Podziel tekst na słowa
        const words = headlineText.split(' ');
        const container = containerRef.current;

        // Wyczyść kontener
        container.innerHTML = '';

        // Utwórz elementy dla każdego słowa z pseudo-losowymi klasami dla różnych animacji
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';

            // Nadaj klasy dla różnych typów animacji
            const animClass = wordIndex % 3 === 0 ? 'fade-up' :
                wordIndex % 3 === 1 ? 'fade-right' : 'fade-left';

            wordSpan.classList.add(animClass);

            // Dodaj każdą literę jako osobny span dla bardziej szczegółowej animacji
            word.split('').forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                wordSpan.appendChild(charSpan);
            });

            container.appendChild(wordSpan);

            // Dodaj spację po każdym słowie oprócz ostatniego
            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                container.appendChild(space);
            }
        });

        // Pobierz wszystkie słowa i litery do animacji
        const fadeUpWords = container.querySelectorAll('.fade-up');
        const fadeRightWords = container.querySelectorAll('.fade-right');
        const fadeLeftWords = container.querySelectorAll('.fade-left');
        const allChars = container.querySelectorAll('.char');

        // Przygotuj timeline animacji
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Najpierw ustaw początkowy stan elementów
        gsap.set(fadeUpWords, { y: 50, opacity: 0 });
        gsap.set(fadeRightWords, { x: 50, opacity: 0 });
        gsap.set(fadeLeftWords, { x: -50, opacity: 0 });
        gsap.set(allChars, { opacity: 0, scale: 0.5 });

        // Najpierw animuj kategorie/breadcrumbs
        if (categoriesRef.current) {
            gsap.set(categoriesRef.current, { opacity: 0, y: -10 });
            tl.to(categoriesRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3
            });
        }

        // Następnie animuj słowa nagłówka
        tl.to(fadeUpWords, {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.4
        }, "-=0.2");

        tl.to(fadeRightWords, {
            x: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.4
        }, "-=0.3");

        tl.to(fadeLeftWords, {
            x: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.4
        }, "-=0.3");

        // Animuj litery dla dodatkowego efektu
        tl.to(allChars, {
            opacity: 1,
            scale: 1,
            stagger: 0.005,
            duration: 0.3
        }, "-=0.4");

        // Na końcu animuj przycisk
        if (btnRef.current) {
            gsap.set(btnRef.current, { opacity: 0, scale: 0.9 });
            tl.to(btnRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.3");
        }

    }, [headlineText]);

    return (
        <section
            ref={sectionRef}
            className="w-full py-20 md:py-28 lg:py-36 px-6 overflow-hidden relative"
        >
            {/* Orbs - animowane elementy tła */}
            <div ref={orbsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
                <div data-speed="0.05" className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-40 blur-xl"></div>
                <div data-speed="0.08" className="absolute top-2/3 left-1/3 w-48 h-48 bg-green-100 rounded-full opacity-30 blur-xl"></div>
                <div data-speed="0.12" className="absolute top-1/3 left-2/3 w-40 h-40 bg-purple-100 rounded-full opacity-40 blur-xl"></div>
                <div data-speed="0.06" className="absolute top-3/4 left-1/2 w-56 h-56 bg-yellow-100 rounded-full opacity-30 blur-xl"></div>
                <div data-speed="0.09" className="absolute top-10 right-1/4 w-36 h-36 bg-pink-100 rounded-full opacity-30 blur-xl"></div>
            </div>

            {/* Kursor efekt */}
            <div
                ref={cursorRef}
                className="hidden md:block fixed w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-40 pointer-events-none mix-blend-screen"
                style={{ top: 0, left: 0, transform: 'translate(-50%, -50%)' }}
            ></div>

            <div className="max-w-[1800px] mx-auto relative">
                {/* Kategorie/Breadcrumbs */}
                <div ref={categoriesRef} className="mb-6 md:mb-8 relative">
                    <p className="text-gray-700 font-medium">
                        Marketing · Strony WWW · E-commerce
                    </p>
                </div>

                {/* Główny nagłówek z animacją GSAP */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium max-w-5xl mb-8 md:mb-10 tracking-tight relative">
                    <div ref={containerRef} className="hero-text">{headlineText}</div>
                </h1>

                {/* Przycisk CTA */}
                <div ref={btnRef} className="relative">
                    <Button href="/kontakt">
                        Zamów bezpłatną konsultację
                    </Button>
                </div>
            </div>

            <style jsx global>{`
                .word {
                    display: inline-block;
                    margin-right: 0.3em;
                    white-space: nowrap;
                }
                .char {
                    display: inline-block;
                    transform-origin: center;
                }
                .hero-text {
                    background-image: linear-gradient(45deg, #333, #000);
                    -webkit-background-clip: text;
                    background-clip: text;
                    background-size: 200% 100%;
                    animation: gradientMove 8s infinite linear;
                }
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </section>
    );
};

export default AdvancedHero;