"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Step {
    id: number;
    title: string;
    icon: React.ReactNode;
}

interface SigningProcessProps {
    currentStep?: number;
}

const SigningProcess: React.FC<SigningProcessProps> = ({ currentStep = 5 }) => {
    const [animateArrows, setAnimateArrows] = useState<boolean>(false);

    useEffect(() => {
        // Uruchom animację strzałek po załadowaniu komponentu
        setAnimateArrows(true);
    }, []);

    // Definicja kroków procesu
    const steps: Step[] = [
        {
            id: 1,
            title: 'Spotkanie i zapoznanie się :)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            id: 2,
            title: 'Analiza potrzeb',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            id: 3,
            title: 'Dobór produktów przez specjalistę',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            id: 4,
            title: 'Konsultacja zaproponowanych usług',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            )
        },
        {
            id: 5,
            title: 'Oferta',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 6,
            title: 'Podpisanie umowy',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            )
        },
        {
            id: 7,
            title: 'Przyjęcie harmonogramu działań usługi dla wybranej oferty',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            id: 8,
            title: 'Okresowa analiza działań i dostosowanie do zmian makrootoczenia',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        }
    ];

    // Animacje dla strzałek poziomych - sekwencyjna animacja dla wszystkich strzałek
    const horizontalArrowVariants = {
        hidden: { opacity: 0, width: "0%" },
        visible: {
            opacity: 1,
            width: "100%",
            transition: {
                duration: 0.5,
            }
        }
    };

    return (
        <section className="w-full py-16 px-6">
            <div className="max-w-[1800px] mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 text-center">Proces podpisania umowy</h2>

                <div className="relative pb-16">
                    {/* Kroki procesu - układ w dwóch rzędach */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {steps.slice(0, 4).map((step, index) => (
                            <div key={step.id} className="relative flex flex-col items-center">
                                {/* Punkt na osi czasu (ikona w kółku) */}
                                <div className="relative mb-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            type: "spring",
                                            damping: 15
                                        }}
                                        className="w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-md bg-black text-white"
                                    >
                                        {step.icon}
                                    </motion.div>
                                </div>
                                
                                {/* Tytuł kroku */}
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className="text-base text-center min-h-[50px] font-medium text-gray-800"
                                >
                                    {index + 1}. {step.title}
                                </motion.h3>
                                
                                {/* Pozioma strzałka do następnego kroku (nie pokazujemy przy ostatnim w rzędzie) */}
                                {index < 3 && (
                                    <motion.div
                                        className="hidden md:block absolute top-8 left-full -translate-x-4 z-20"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.2 + 0.5 }}
                                    >
                                        <svg
                                            className="w-8 h-8 text-black"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5 12h14m-5-5l5 5-5 5"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Przerwa między rzędami */}
                    <div className="my-6 md:my-8"></div>
                    
                    {/* Drugi rząd - kroki od 5 do 8 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                        {steps.slice(4).map((step, index) => {
                            // Prawdziwy indeks w pełnej tablicy kroków
                            const realIndex = index + 4;
                            return (
                                <div key={step.id} className="relative flex flex-col items-center">
                                    {/* Punkt na osi czasu (ikona w kółku) */}
                                    <div className="relative mb-6">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: realIndex * 0.1,
                                                type: "spring",
                                                damping: 15
                                            }}
                                            className="w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-md bg-black text-white"
                                        >
                                            {step.icon}
                                        </motion.div>
                                    </div>
                                    
                                    {/* Tytuł kroku */}
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: realIndex * 0.1 + 0.3 }}
                                        className="text-base text-center min-h-[50px] font-medium text-gray-800"
                                    >
                                        {realIndex + 1}. {step.title}
                                    </motion.h3>
                                    
                                    {/* Pozioma strzałka do następnego kroku (nie pokazujemy przy ostatnim) */}
                                    {index < 3 && (
                                        <motion.div
                                            className="hidden md:block absolute top-8 left-full -translate-x-4 z-20"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: realIndex * 0.2 + 0.5 }}
                                        >
                                            <svg
                                                className="w-8 h-8 text-black"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 12h14m-5-5l5 5-5 5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SigningProcess;