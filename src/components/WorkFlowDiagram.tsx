"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const WorkflowDiagram = () => {
    // Styling constants
    const primaryColor = "#000000";
    const secondaryColor = "#333333";
    const accentColor = "#FF3366";

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const pathVariants = {
        hidden: { pathLength: 0 },
        visible: {
            pathLength: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            },
        },
    };

    const timelineVariants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                duration: 1,
                ease: "easeInOut",
                delay: 1,
            },
        },
    };

    return (
        <div className="w-full bg-white py-24">
            <motion.div 
                className="container mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Header Section */}
                <div className="flex justify-between items-start mb-16">
                    <motion.div variants={itemVariants}>
                        <p className="text-gray-600 mb-2 text-lg">Google Ads</p>
                        <h2 className="text-4xl md:text-5xl font-medium text-black">Jak działamy?</h2>
                    </motion.div>
                </div>

                {/* Main Workflow Diagram */}
                <div className="relative">
                    {/* Center content with rocket */}
                    <motion.div 
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <div className="bg-[#E94D28] rounded-full p-8 w-48 h-48 flex flex-col items-center justify-center shadow-xl">
                            <div className="bg-white rounded-full p-5">
                                <Rocket className="h-14 w-14 text-[#E94D28]" />
                            </div>
                            <p className="text-white text-sm font-medium text-center mt-4">
                                Start i optymalizacja kampanii
                            </p>
                        </div>
                    </motion.div>

                    {/* Circular path with workflow steps */}
                    <div className="relative h-[800px] md:h-[700px]">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800">
                            <motion.circle
                                cx="400"
                                cy="400"
                                r="300"
                                fill="none"
                                stroke="#E5E5E5"
                                strokeWidth="3"
                                strokeDasharray="8 8"
                                variants={pathVariants}
                            />
                        </svg>

                        {/* Workflow steps positioned around the circle */}
                        {[...Array(8)].map((_, index) => {
                            const angle = (index * 45 - 90) * (Math.PI / 180);
                            const radius = 300;
                            const x = 400 + radius * Math.cos(angle);
                            const y = 400 + radius * Math.sin(angle);

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: `${(x / 800) * 100}%`,
                                        top: `${(y / 800) * 100}%`,
                                    }}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="bg-black rounded-full p-4 text-white shadow-lg transition-transform">
                                        <div className="w-12 h-12 flex items-center justify-center">
                                            {/* Icon based on index */}
                                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="absolute mt-4 w-48 text-center -translate-x-1/2 left-1/2">
                                        <p className="text-black font-medium text-sm">
                                            {getStepTitle(index)}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Timeline section */}
                <motion.div 
                    className="mt-16"
                    variants={itemVariants}
                >
                    <p className="text-black text-xl font-medium mb-6">
                        Pierwsze 180 dni jest kluczowe dla Twojej kampanii
                    </p>

                    {/* Timeline bar */}
                    <div className="relative">
                        {/* Gradient background */}
                        <motion.div 
                            className="h-16 bg-gradient-to-r from-gray-100 to-black rounded-tr-3xl rounded-br-3xl"
                            variants={timelineVariants}
                            style={{ transformOrigin: "left" }}
                        />

                        {/* Month markers */}
                        <div className="flex justify-between px-4 pt-2">
                            {Array.from({length: 6}, (_, i) => (
                                <motion.div 
                                    key={i}
                                    variants={itemVariants}
                                    className="text-center"
                                >
                                    <div className="h-4 border-r-2 border-gray-300 mx-auto"></div>
                                    <p className="text-sm mt-1 text-gray-600">{i + 1} miesiąc</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

// Helper function to get step titles
const getStepTitle = (index: number): string => {
    const titles = [
        "Przegląd strategii i egzekucja działań",
        "Analiza pod wybrane cele",
        "Zbieranie i analiza danych",
        'Operacje / "Praca ręczna"',
        "Raportowanie + Panel Klienta",
        "Monitoring efektów i Optymalizacja",
        "Dodatkowe zadania poboczne",
        "Stały kontakt z Klientem"
    ];
    return titles[index];
};

export default WorkflowDiagram;