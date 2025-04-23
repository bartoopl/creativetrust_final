"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/Button';
import WorkFlowDiagram from '@/components/WorkFlowDiagram';
import ClientLogos from '@/components/ClientLogos';
import PerformanceMarketingForm from '@/components/PerformanceMarketingForm';
import { Rocket, Target, Users, BarChart, Shield } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import PricingTable from '@/components/PricingTable';

// Animowane ikony korzyści
const BenefitIcon = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        {children}
    </motion.div>
);

// Komponent dla sekcji korzyści
const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        className="bg-white p-8 rounded-2xl shadow-sm hover:border-t-2 hover:border-[#1877F2] transition-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <BenefitIcon>{icon}</BenefitIcon>
        <h3 className="text-xl font-medium mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

// Komponent dla opinii klienta
const TestimonialCard = ({ quote, author, company, image }: { quote: string, author: string, company: string, image: string }) => (
    <motion.div
        className="bg-white p-8 rounded-2xl shadow-sm hover:border-l-2 hover:border-[#1877F2] transition-all"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <Image
                    src={image}
                    alt={author}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <p className="font-medium">{author}</p>
                <p className="text-gray-600">{company}</p>
            </div>
        </div>
        <p className="text-lg text-gray-800 italic">&ldquo;{quote}&rdquo;</p>
    </motion.div>
);

export default function MetaAdsPage() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <main className="min-h-screen">
            {/* Hero section */}
            <section className="w-full py-16 md:py-24 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h6 className="text-gray-600 mb-4 text-lg">Meta Ads</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">
                                Kampanie Meta Ads, które realnie sprzedają
                            </h1>
                            <p className="text-xl text-gray-600 mb-10">
                                Zwiększ rozpoznawalność marki, zdobądź klientów i generuj leady dzięki skutecznie prowadzonym kampaniom na Facebooku i Instagramie – kompleksowo, transparentnie i z nastawieniem na wynik.
                            </p>
                            <Button href="#kontakt" className="bg-[#1877F2] hover:bg-[#166FE5] text-white">
                                Umów bezpłatną konsultację
                            </Button>
                        </motion.div>
                        <motion.div
                            className="relative h-[500px]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                            >
                                <source src="/meta-ads-hero.mp4" type="video/mp4" />
                                Twoja przeglądarka nie obsługuje elementu video.
                            </video>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits section */}
            <section className="w-full py-24 px-6">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BenefitCard
                            icon={<Target className="w-8 h-8" />}
                            title="Precyzyjne targetowanie odbiorców"
                            description="Docieramy do idealnych klientów dzięki zaawansowanym opcjom targetowania demograficznego, behawioralnego i zainteresowań."
                        />
                        <BenefitCard
                            icon={<Users className="w-8 h-8" />}
                            title="Dedykowany specjalista i cykliczne omawianie wyników"
                            description="Masz dostęp do dedykowanego specjalisty, który nie tylko prowadzi kampanię, ale regularnie analizuje jej wyniki razem z Tobą."
                        />
                        <BenefitCard
                            icon={<Rocket className="w-8 h-8" />}
                            title="Pełne wdrożenie usługi i elastyczność budżetowa"
                            description="Zajmujemy się wszystkim – od audytu i strategii po optymalizację i raporty. Możesz startować z dowolnym budżetem, a my wyciśniemy z niego maksimum."
                        />
                        <BenefitCard
                            icon={<BarChart className="w-8 h-8" />}
                            title="Różnorodne formaty reklam"
                            description="Wykorzystujemy pełen potencjał reklam obrazkowych, wideo, karuzel i innych formatów dostępnych na Facebooku i Instagramie."
                        />
                        <BenefitCard
                            icon={<Shield className="w-8 h-8" />}
                            title="Transparentność współpracy"
                            description="Zero tajemnic i niezrozumiałych raportów. Przejrzyste zasady, jasna komunikacja, pełna kontrola nad budżetem."
                        />
                    </div>
                </div>
            </section>

            {/* Clients section */}
            <section className="w-full py-16 bg-black">
                <div className="max-w-[1800px] mx-auto">
                    <ClientLogos className="invert" />
                </div>
            </section>

            {/* Testimonials */}
            <section className="w-full py-24 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium mb-16 text-center">
                        Co mówią nasi klienci?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="Współpraca z CreativeTrust to strzał w dziesiątkę. Profesjonalne podejście i realne efekty biznesowe."
                            author="Iza"
                            company="Właściciel, Kogel Mogel"
                            image="/testimonial1.jpg"
                        />
                        <TestimonialCard
                            quote="Wreszcie znaleźliśmy agencję, która rozumie nasze potrzeby i dostarcza konkretne rezultaty."
                            author="Dorota"
                            company="Marketing Manager, Secret of Beauty"
                            image="/testimonial2.jpg"
                        />
                        <TestimonialCard
                            quote="Świetna komunikacja i pełna transparentność. Polecam każdemu, kto szuka profesjonalistów od Meta Ads."
                            author="Katarzyna"
                            company="Właściciel, EB Gabinet"
                            image="/testimonial3.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* Workflow section */}
            <section className="w-full py-24 px-6" ref={targetRef}>
                <div className="max-w-[1800px] mx-auto">
                    <WorkFlowDiagram />
                </div>
            </section>

            {/* Contact form section */}
            <section id="kontakt" className="w-full py-24 px-6 bg-black text-white">
                <div className="max-w-[1800px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-medium mb-8">
                                Wypełnij formularz
                            </h2>
                            <p className="text-xl text-gray-300 mb-10">
                                W odpowiedzi przygotujemy i prześlemy indywidualną ofertę. Skontaktujemy się z Tobą w ciągu 24h.
                            </p>
                            <div className="bg-gray-900 p-6 rounded-2xl">
                                <p className="text-gray-300 mb-4">
                                    Na zapytania złożone pon. – pt. 8.00 – 16.00 odpowiadamy w ciągu maksymalnie 3 godz.
                                </p>
                                <p className="text-gray-300">
                                    Na pozostałe pytania odpowiemy następnego dnia roboczego po 10:00.
                                </p>
                            </div>
                        </div>
                        <div>
                            <PerformanceMarketingForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing section */}
            <section className="w-full py-24 px-6 bg-white">
                <div className="container mx-auto">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-medium text-black mb-6">
                            Wybierz pakiet dla siebie
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Dostosuj nasze usługi do swoich potrzeb i budżetu
                        </p>
                    </div>
                    <PricingTable />
                </div>
            </section>

            {/* FAQ section */}
            <section className="w-full py-24 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl font-medium mb-12 text-center">
                        Pytania i odpowiedzi
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={[
                            {
                                question: "Co to jest Meta Ads i dlaczego warto z niej skorzystać?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Meta Ads to system reklamowy Facebooka i Instagrama, który umożliwia dotarcie do miliardów użytkowników na całym świecie. Jest to jeden z najskuteczniejszych sposobów na budowanie świadomości marki i generowanie sprzedaży w mediach społecznościowych.
                                        </p>
                                        <p className="mb-4">
                                            Meta Ads oferuje szeroki wachlarz formatów reklamowych, od statycznych obrazów i wideo po interaktywne karuzele i kolekcje. Dzięki zaawansowanym opcjom targetowania możesz precyzyjnie dotrzeć do swojej grupy docelowej.
                                        </p>
                                    </>
                                )
                            },
                            {
                                question: "Jakie formaty reklam są dostępne w Meta Ads?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Meta Ads oferuje wiele formatów reklamowych, w tym:
                                        </p>
                                        <ul className="list-disc pl-6 mb-4">
                                            <li>Reklamy obrazkowe</li>
                                            <li>Reklamy wideo</li>
                                            <li>Karuzele produktów</li>
                                            <li>Kolekcje</li>
                                            <li>Reklamy w Stories</li>
                                            <li>Reklamy w Messengerze</li>
                                        </ul>
                                    </>
                                )
                            },
                            {
                                question: "Ile kosztuje prowadzenie kampanii Meta Ads?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Koszt prowadzenia kampanii Meta Ads zależy od wielu czynników, takich jak:
                                        </p>
                                        <ul className="list-disc pl-6 mb-4">
                                            <li>Wybrany format reklamy</li>
                                            <li>Konkurencyjność branży</li>
                                            <li>Cel kampanii</li>
                                            <li>Wielkość grupy docelowej</li>
                                        </ul>
                                        <p>
                                            W CreativeTrust oferujemy elastyczne pakiety dostosowane do różnych budżetów. Skontaktuj się z nami, aby otrzymać indywidualną wycenę.
                                        </p>
                                    </>
                                )
                            }
                        ]} />
                    </div>
                </div>
            </section>
        </main>
    );
} 