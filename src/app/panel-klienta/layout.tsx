"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface ClientPanelLayoutProps {
    children: React.ReactNode;
}

export default function ClientPanelLayout({ children }: ClientPanelLayoutProps) {
    const [clientName, setClientName] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Fetch client data on mount
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch('/api/client/auth-status');
                const data = await response.json();

                if (!data.authenticated) {
                    // Redirect to login if not authenticated
                    router.push('/logowanie-klienta');
                    return;
                }

                if (data.client?.name) {
                    setClientName(data.temporary ? `${data.client.name} (Konto tymczasowe)` : data.client.name);
                }
            } catch (error) {
                console.error('Failed to fetch client data:', error);
            }
        };

        fetchClientData();
    }, [router]);

    // Logout function
    const handleLogout = async () => {
        try {
            console.log('Logout button clicked');
            const response = await fetch('/api/client/logout', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            console.log('Logout response:', data);
            
            // Clear any local state
            setClientName('');
            
            // Force a redirect to login page
            window.location.href = '/logowanie-klienta';
        } catch (error) {
            console.error('Logout error:', error);
            alert('Wystąpił błąd podczas wylogowywania. Spróbuj odświeżyć stronę.');
        }
    };

    // Navigation items
    const navItems = [
        { path: '/panel-klienta', label: 'Pulpit' },
        { path: '/panel-klienta/faktury', label: 'Faktury' },
        { path: '/panel-klienta/kampanie', label: 'Kampanie reklamowe' },
        { path: '/panel-klienta/profil', label: 'Mój profil' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-black">
                                    CreativeTrust
                                </Link>
                            </div>

                            {/* Desktop navigation */}
                            <nav className="hidden md:ml-10 md:flex md:space-x-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                            pathname === item.path
                                                ? 'border-black text-gray-900'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="hidden md:flex items-center">
                            <div className="flex-shrink-0">
                <span className="text-sm font-medium mr-4 text-gray-700">
                  {clientName}
                </span>
                                <button
                                    onClick={handleLogout}
                                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    Wyloguj
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                        pathname === item.path
                                            ? 'bg-gray-50 border-black text-black'
                                            : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-4">
                                    <div className="text-base font-medium text-gray-800">{clientName}</div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Wyloguj
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}