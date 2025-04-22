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
        className="bg-white p-8 rounded-2xl shadow-sm"
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
        className="bg-white p-8 rounded-2xl shadow-sm"
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

export default function GoogleAdsPage() {
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
                            <h6 className="text-gray-600 mb-4 text-lg">Google Ads</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">
                                Kampanie Google Ads, które realnie sprzedają
                            </h1>
                            <p className="text-xl text-gray-600 mb-10">
                                Zwiększ widoczność, zdobądź klientów i generuj leady dzięki skutecznie prowadzonym kampaniom Google Ads – kompleksowo, transparentnie i z nastawieniem na wynik.
                            </p>
                            <Button href="#kontakt">
                                Umów bezpłatną konsultację
                            </Button>
                        </motion.div>
                        <motion.div
                            className="relative h-[500px]"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/google-ads.jpg"
                                alt="Google Ads kampanie reklamowe"
                                fill
                                className="object-cover rounded-2xl"
                                priority
                            />
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
                            title="Natychmiastowa widoczność w wyszukiwarce Google"
                            description="Twoje usługi/produkty pojawią się dokładnie wtedy, gdy Klienci szukają Twoich produktów lub usług."
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
                            title="Doradztwo marketingowe 360°"
                            description="Pomagamy nie tylko w reklamie. Możemy wesprzeć Cię na każdym etapie – od budowania marki po sprzedaż i rozwój e-commerce."
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
                            quote="Świetna komunikacja i pełna transparentność. Polecam każdemu, kto szuka profesjonalistów od Google Ads."
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
            <section className="w-full py-24 px-6 bg-black text-white">
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

            {/* FAQ section */}
            <section className="w-full py-24 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-[1800px] mx-auto">
                    <h2 className="text-3xl font-medium mb-12 text-center">
                        Pytania i odpowiedzi
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion items={[
                            {
                                question: "Co to jest reklama Google Ads i dlaczego warto z niej skorzystać?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Planując działania marketingowe online, kluczowe jest dobranie takich kanałów promocji, które będą maksymalnie efektywne w stosunku do budżetu i celów biznesowych. Jednym z najskuteczniejszych i najczęściej wybieranych narzędzi jest Google Ads – system reklamowy Google, który do 2018 roku funkcjonował pod nazwą Google AdWords.
                                        </p>
                                        <p className="mb-4">
                                            Google Ads umożliwia emisję reklam tekstowych, graficznych, produktowych oraz wideo – zarówno w wyszukiwarce Google, jak i w sieci reklamowej Google, która obejmuje ponad 2 miliony witryn i dociera do ponad 90% internautów na całym świecie.
                                        </p>
                                        <p className="mb-4">
                                            W ramach Google Ads możemy zaplanować m.in.:
                                        </p>
                                        <ul className="list-disc pl-6 mb-4">
                                            <li>reklamy w wyszukiwarce Google (Search Ads)</li>
                                            <li>kampanie w sieci reklamowej (Display Ads)</li>
                                            <li>reklamy w Gmail (Gmail Ads)</li>
                                            <li>reklamy na YouTube (Video Ads)</li>
                                            <li>reklamy produktowe (Google Shopping / Performance Max)</li>
                                            <li>remarketing Google Ads</li>
                                        </ul>
                                    </>
                                )
                            },
                            {
                                question: "Jaki cel można osiągnąć dzięki kampaniom Google Ads?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Google Ads daje ogromne możliwości – wszystko zależy od tego, co dla Ciebie najważniejsze. Możesz:
                                        </p>
                                        <ul className="list-disc pl-6 mb-4">
                                            <li>generować leady i zapytania ofertowe</li>
                                            <li>zwiększyć sprzedaż online w sklepie</li>
                                            <li>zbudować świadomość marki i dotrzeć do nowych klientów</li>
                                            <li>promować konkretną usługę lub wydarzenie</li>
                                        </ul>
                                        <p>
                                            Od celu zależy dobór rodzaju kampanii, formatu reklam, lokalizacji i strategii licytacji.
                                        </p>
                                    </>
                                )
                            },
                            {
                                question: "Jakim budżetem należy dysponować na kampanie Google Ads?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Kampanie Google Ads można prowadzić już od kilkuset złotych miesięcznie, ale im wyższy budżet, tym większy potencjał dotarcia i testowania skutecznych rozwiązań.
                                        </p>
                                        <p>
                                            Nie wiesz, ile wydać? Doradzimy Ci optymalny budżet na start – na podstawie konkurencji, branży i oczekiwań.
                                        </p>
                                    </>
                                )
                            },
                            {
                                question: "Jak szybko można spodziewać się efektów kampanii Google Ads?",
                                answer: (
                                    <>
                                        <p className="mb-4">
                                            Google Ads pozwala dotrzeć do klientów praktycznie z dnia na dzień, ale warto pamiętać, że:
                                        </p>
                                        <ul className="list-disc pl-6 mb-4">
                                            <li>pierwsze dni to testowanie ustawień i słów kluczowych</li>
                                            <li>najlepsze wyniki pojawiają się po kilku tygodniach optymalizacji</li>
                                            <li>sukces wymaga nie tylko kliknięć, ale też dobrej strony docelowej (landing page)</li>
                                        </ul>
                                    </>
                                )
                            },
                            {
                                question: "Czy potrzebna jest specjalna strona internetowa do kampanii Google Ads?",
                                answer: (
                                    <>
                                        <p>
                                            Reklama to tylko połowa sukcesu – druga to miejsce, do którego kierujemy użytkownika. Jeśli strona ładuje się wolno, nie zawiera jasnego przekazu lub nie zachęca do działania – możemy pomóc ją zoptymalizować lub stworzyć nową.
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