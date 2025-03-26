import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Kontakt - Skontaktuj się z nami',
    description: 'Skontaktuj się z naszym zespołem, aby dowiedzieć się więcej o naszych usługach i jak możemy pomóc w rozwoju Twojego biznesu.',
};

export default function ContactPage() {
    const currentYear = new Date().getFullYear();

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Lewa kolumna - informacje kontaktowe */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        <div>
                            <h6 className="text-gray-600 mb-2">Kontakt</h6>
                            <h1 className="text-4xl md:text-6xl font-medium mb-8">Masz biznes? My mamy pomysł na jego rozwój w sieci.</h1>
                            <p className="text-xl max-w-md">
                                Zostaw wiadomość i opowiedz nam o swoich planach — my podpowiemy, jak je przekuć w cyfrowy sukces.
                                Pierwsze 30 minut konsultacji jest gratis i do niczego nie zobowiązuje.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-medium text-gray-500">E-mail</h3>
                            <Link
                                href="mailto:office@creativetrust.pl"
                                className="flex items-center justify-between group"
                            >
                                <span className="text-lg hover:text-gray-600">office@creativetrust.pl</span>
                                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                </span>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-medium text-gray-500">Telefon</h3>
                            <p className="text-lg">+48 570 526 421</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-medium text-gray-500">Adres</h3>
                            <p className="text-lg">
                                M34 Business Center<br />
                                ul. Kombatantów 34/500<br />
                                66-400 Gorzów Wielkopolski
                            </p>
                        </div>

                        <div className="space-y-8 pt-12">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="https://www.linkedin.com/company/creativetrust"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center group"
                                >
                                    <span className="text-lg hover:text-gray-600 mr-4">LinkedIn</span>
                                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                  </span>
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link
                                    href="https://www.facebook.com/creativetrustpl/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center group"
                                >
                                    <span className="text-lg hover:text-gray-600 mr-4">Facebook</span>
                                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                  </span>
                                </Link>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Link
                                    href="https://www.instagram.com/creativetrust_/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center group"
                                >
                                    <span className="text-lg hover:text-gray-600 mr-4">Instagram</span>
                                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                  </span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Prawa kolumna - formularz kontaktowy */}
                    <div className="w-full lg:w-1/2">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}