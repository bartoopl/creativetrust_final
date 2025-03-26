"use client";

import React, { useEffect, useState } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const headlineText = "Tworzymy strategie, które przynoszą realne wyniki dla Twojego biznesu.";
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        // Podziel tekst na słowa
        setWords(headlineText.split(' '));
    }, []);

    return (
        <section className="w-full py-20 md:py-28 lg:py-36 px-6 overflow-hidden">
            <div className="max-w-[1800px] mx-auto">
                {/* Kategorie/Breadcrumbs */}
                <div className="mb-6 md:mb-8">
                    <p className="text-gray-700 font-medium">
                        Marketing · Strony WWW · E-commerce
                    </p>
                </div>

                {/* Główny nagłówek z animacją słów */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium max-w-5xl mb-8 md:mb-10 tracking-tight flex flex-wrap">
                    {words.map((word, wordIndex) => (
                        <React.Fragment key={wordIndex}>
                            <span className="inline-flex mr-[0.3em] whitespace-nowrap">
                                {word.split('').map((letter, letterIndex) => (
                                    <motion.span
                                        key={letterIndex}
                                        initial={{ color: "rgb(156, 163, 175)" }} // text-gray-400
                                        animate={{ color: "rgb(33, 33, 33)" }}    // text-gray-900
                                        transition={{
                                            duration: 0.3,
                                            delay: (wordIndex * word.length + letterIndex) * 0.02, // Zachowuje sekwencyjne opóźnienie
                                            ease: "easeInOut"
                                        }}
                                        className="inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        </React.Fragment>
                    ))}
                </h1>

                {/* Przycisk CTA */}
                <div>
                    <Button href="/kontakt">
                        Zamów bezpłatną konsultację
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;