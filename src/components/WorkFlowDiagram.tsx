"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBar, Rocket, BarChart3, FileText } from 'lucide-react';

interface WorkflowStep {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const WorkFlowDiagram: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    const steps: WorkflowStep[] = [
        {
            id: 1,
            title: "Przygotowanie strategii", 
            description: "Analiza rynku, konkurencji i potrzeb. Przygotowanie strategii działań i planu kampanii.",
            icon: <ChartBar className="w-6 h-6" />
        },
        {
            id: 2,
            title: "Start kampanii",
            description: "Konfiguracja konta, tworzenie reklam i grup reklam, ustawienie targetowania.",
            icon: <Rocket className="w-6 h-6" />
        },
        {
            id: 3,
            title: "Optymalizacja",
            description: "Ciągłe monitorowanie wyników, optymalizacja stawek i reklam, testowanie nowych rozwiązań.",
            icon: <BarChart3 className="w-6 h-6" />
        },
        {
            id: 4,
            title: "Raportowanie",
            description: "Regularne raporty z wynikami, analiza KPI, rekomendacje dalszych działań.",
            icon: <FileText className="w-6 h-6" />
        }
    ];

    // Mobilna wersja
    const MobileView = () => (
        <div className="space-y-4">
            {steps.map((step) => (
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                        p-6 rounded-xl cursor-pointer
                        ${activeStep === step.id ? 'bg-[#E94D28] text-white' : 'bg-white shadow-sm hover:shadow-md'}
                        transition-all duration-300
                    `}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                    <div className="flex items-center gap-4">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${activeStep === step.id ? 'bg-white text-[#E94D28]' : 'bg-[#E94D28] text-white'}
                        `}>
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">{step.title}</h3>
                            <AnimatePresence>
                                {activeStep === step.id && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`mt-2 text-sm ${activeStep === step.id ? 'text-white/90' : 'text-gray-600'}`}
                                    >
                                        {step.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Desktop wersja
    const DesktopView = () => (
        <div className="relative w-full max-w-[1200px] mx-auto h-[700px]">
            {/* Centralne koło */}
            <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E94D28] rounded-full flex items-center justify-center text-white text-center p-4 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <div>
                    <Rocket className="w-12 h-12 mx-auto mb-4" />
                    <p className="font-medium text-xl">Start i optymalizacja kampanii</p>
                </div>
            </motion.div>

            {/* Kroki */}
            {steps.map((step, index) => {
                const angle = (index * (360 / steps.length) - 45) * (Math.PI / 180);
                const radius = 300; // Zwiększony promień okręgu
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <motion.div
                        key={step.id}
                        className={`
                            absolute p-6 rounded-xl cursor-pointer w-72 backdrop-blur-sm
                            ${activeStep === step.id ? 'bg-[#E94D28] text-white' : 'bg-white/90 shadow-lg hover:shadow-xl'}
                        `}
                        style={{
                            left: `calc(50% + ${x}px - 144px)`,
                            top: `calc(50% + ${y}px - 48px)`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: 1,
                            y: Math.sin(Date.now() / 2000 + index) * 10
                        }}
                        transition={{ 
                            duration: 0.5,
                            y: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center
                                ${activeStep === step.id ? 'bg-white text-[#E94D28]' : 'bg-[#E94D28] text-white'}
                            `}>
                                {step.icon}
                            </div>
                            <h3 className="font-medium text-lg">{step.title}</h3>
                        </div>
                        <AnimatePresence>
                            {activeStep === step.id && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 text-sm"
                                >
                                    {step.description}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );

    return (
        <div className="w-full py-16">
            <div className="container mx-auto">
                {/* Nagłówek sekcji */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h6 className="text-gray-600 mb-4 text-xl">Google Ads</h6>
                        <h2 className="text-5xl md:text-6xl font-medium text-black">
                            Jak działamy?
                        </h2>
                    </motion.div>
                </div>

                {/* Mobilna wersja */}
                <div className="md:hidden px-6">
                    <MobileView />
                </div>

                {/* Desktop wersja */}
                <div className="hidden md:block">
                    <DesktopView />
                </div>
            </div>
        </div>
    );
};

export default WorkFlowDiagram;