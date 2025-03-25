"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ServiceItemProps {
    title: string;
    href: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, href }) => {
    return (
        <Link href={href} className="block">
            <div className="py-10 border-t border-gray-200 group">
                <div className="flex justify-between items-center">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium transition-colors duration-300 group-hover:text-gray-600">
                        {title}
                    </h3>
                    <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 45 }}
                        className="transition-all duration-300"
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transform transition-transform ease-in-out group-hover:rotate-45"
                        >
                            <path
                                d="M7 17L17 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7 7H17V17"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </Link>
    );
};

const Services: React.FC = () => {
    const services = [
        { title: "Branding", href: "/uslugi/branding" },
        { title: "Strony WWW", href: "/uslugi/strony-www" },
        { title: "E-commerce", href: "/uslugi/e-commerce" },
        { title: "Performance Marketing", href: "/uslugi/performance-marketing" },
        { title: "Marketing Automation", href: "/uslugi/marketing-automation" },
    ];

    return (
        <section className="w-full py-16 md:py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <h2 className="text-2xl mb-10">Usługi</h2>

                <div>
                    {services.map((service, index) => (
                        <ServiceItem
                            key={index}
                            title={service.title}
                            href={service.href}
                        />
                    ))}
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
        </section>
    );
};

export default Services;