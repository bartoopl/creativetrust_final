"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/client/auth-bypass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email,
                    secret: password === 'creativetrust-admin' ? 'creativetrust123' : 'invalid'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Wystąpił błąd podczas logowania');
            }

            console.log('Admin login successful, redirecting to panel');
            // Force full page refresh
            window.location.href = '/panel-klienta';
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas logowania');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-medium mb-8 text-center">Panel Administratora</h1>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-2xl font-medium mb-6">Awaryjne logowanie klienta</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email klienta
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="Adres email klienta"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Hasło administratora
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                placeholder="Hasło administratora"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`
                  w-full px-6 py-3 rounded-full font-medium
                  ${loading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-800'}
                  transition-all
                `}
                            >
                                {loading ? 'Logowanie...' : 'Zaloguj klienta'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-black transition-colors text-sm"
                        >
                            Powrót do strony głównej
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}