"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface PricingPackage {
    name: string;
    price: string;
    budget: string;
    description: string;
    isHighlighted?: boolean;
}

const PricingTable: React.FC = () => {
    const packages: PricingPackage[] = [
        {
            name: "Mini Trust",
            price: "od 649 zł",
            budget: "dla budżetu do 4 999 zł",
            description: "Projekt i budowa konta reklamowego, 1200zł na start dla nowego konta, bezpłatnie banery reklamowe na start",
        },
        {
            name: "Power Trust",
            price: "od 1 149 zł",
            budget: "dla budżetu do 10 000 zł",
            description: "Aktywne wsparcie eksperta, bezpłatna konfiguracja analityki",
            isHighlighted: true
        },
        {
            name: "Smart Trust",
            price: "od 2 500 zł",
            budget: "dla budżetu od 10 000 zł",
            description: "Najnowsze metodologie działania, wspieranie AI, idealny dla sklepów internetowych",
        },
        {
            name: "Ultimate Trust",
            price: "Skontaktuj się z nami",
            budget: "operujesz na wyższych budżetach?",
            description: "Nie wiesz, który pakiet wybrać? Skontaktuj się z nami!",
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                        relative p-8 rounded-2xl shadow-sm
                        ${pkg.isHighlighted 
                            ? 'bg-[#E94D28] text-white border-2 border-[#E94D28]' 
                            : 'bg-white border border-gray-200 hover:border-[#E94D28]'}
                        transition-all duration-300
                    `}
                >
                    {pkg.isHighlighted && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-[#E94D28] text-white px-4 py-1 rounded-full text-sm font-medium">
                                Polecany
                            </span>
                        </div>
                    )}
                    
                    <h3 className={`text-2xl font-medium mb-4 ${pkg.isHighlighted ? 'text-white' : 'text-black'}`}>
                        {pkg.name}
                    </h3>
                    
                    <div className="mb-4">
                        <p className={`text-3xl font-bold ${pkg.isHighlighted ? 'text-white' : 'text-black'}`}>
                            {pkg.price}
                        </p>
                        <p className={`text-sm ${pkg.isHighlighted ? 'text-white/80' : 'text-gray-600'}`}>
                            (obsługa miesięcznie)
                        </p>
                    </div>
                    
                    <p className={`mb-4 ${pkg.isHighlighted ? 'text-white/90' : 'text-gray-700'}`}>
                        {pkg.budget}
                    </p>
                    
                    <p className={`mb-8 ${pkg.isHighlighted ? 'text-white/80' : 'text-gray-600'}`}>
                        {pkg.description}
                    </p>
                    
                    <Button 
                        href="#kontakt" 
                        className={`
                            w-full
                            ${pkg.isHighlighted 
                                ? 'bg-white text-[#E94D28] hover:bg-gray-100' 
                                : 'bg-[#E94D28] text-white hover:bg-[#d13d1a]'}
                        `}
                    >
                        Wybierz pakiet
                    </Button>
                </motion.div>
            ))}
        </div>
    );
};

export default PricingTable; 