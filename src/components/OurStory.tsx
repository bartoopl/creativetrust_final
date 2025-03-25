"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './Button';

const OurStory: React.FC = () => {
    const [firstPartWords, setFirstPartWords] = useState<string[]>([]);
    const [secondPartWords, setSecondPartWords] = useState<string[]>([]);

    const firstPart = "Poznaj naszą historię i dowiedz się, co wyróżnia nas w";
    const secondPart = "tworzeniu skutecznych doświadczeń cyfrowych.";

    useEffect(() => {
        setFirstPartWords(firstPart.split(' '));
        setSecondPartWords(secondPart.split(' '));
    }, []);

    return (
        <section className="w-full py-20 px-6 border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-medium">Nasza Historia</h3>
                    </div>

                    <div className="w-full md:w-3/5">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-10 md:mb-6 leading-tight flex flex-wrap">
                            {firstPartWords.map((word, wordIndex) => (
                                <React.Fragment key={wordIndex}>
                  <span className="inline-flex mr-[0.3em] whitespace-nowrap">
                    {word.split('').map((letter, letterIndex) => (
                        <motion.span
                            key={letterIndex}
                            initial={{ color: "rgb(156, 163, 175)" }} // text-gray-400
                            animate={{ color: "rgb(33, 33, 33)" }}    // text-gray-900
                            transition={{
                                duration: 0.3,
                                delay: (wordIndex * word.length + letterIndex) * 0.01,
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
                            {" "}
                            {secondPartWords.map((word, wordIndex) => (
                                <React.Fragment key={wordIndex}>
                  <span className="inline-flex mr-[0.3em] whitespace-nowrap">
                    {word.split('').map((letter, letterIndex) => (
                        <motion.span
                            key={letterIndex}
                            initial={{ color: "rgb(209, 213, 219)" }} // bardzo jasny szary
                            animate={{ color: "rgb(156, 163, 175)" }}    // docelowy szary
                            transition={{
                                duration: 0.3,
                                delay: ((firstPartWords.length + wordIndex) * word.length + letterIndex) * 0.01,
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
                        </h2>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Button href="/o-nas">
                        O nas
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default OurStory;