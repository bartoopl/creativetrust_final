"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ClientLogo {
    id: number;
    name: string;
    logo: string;
}

interface ClientLogosProps {
    className?: string;
}

const ClientLogos: React.FC<ClientLogosProps> = ({ className = '' }) => {
    // Lista logotypów klientów
    // W prawdziwej implementacji dane mogłyby pochodzić z CMS (np. Sanity)
    const clients: ClientLogo[] = [
        { id: 1, name: 'Monnari', logo: '/logos/client1.png' },
        { id: 2, name: '51015kids', logo: '/logos/client2.png' },
        { id: 3, name: 'Sulphur', logo: '/logos/client3.png' },
        { id: 4, name: 'EB-GABINET', logo: '/logos/client4.svg' },
        { id: 5, name: 'Dr Pazera', logo: '/logos/client5.png' },
        { id: 6, name: 'Kapica Pasterski Partnerzy', logo: '/logos/client6.png' },
    ];

    return (
        <section className="w-full py-12 md:py-16 px-6 border-b border-gray-100">
            <div className="max-w-[1800px] mx-auto">
                <h3 className="text-center text-gray-500 font-medium mb-12">
                    Współpracowaliśmy między innymi z:
                </h3>

                <div className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 ${className}`}>
                    {clients.map((client) => (
                        <motion.div
                            key={client.id}
                            className="w-32 md:w-36 h-16 relative grayscale hover:grayscale-0 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: client.id * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={client.logo}
                                alt={`${client.name} logo`}
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientLogos;