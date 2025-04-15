"use client";

import React, { useState, useEffect } from 'react';

interface ClientProfile {
    _id: string;
    name: string;
    email: string;
    nip?: string;
    address?: {
        street?: string;
        postalCode?: string;
        city?: string;
        country?: string;
    };
    phone?: string;
    contactPerson?: string;
    createdAt?: string;
}

export default function Profile() {
    const [profile, setProfile] = useState<ClientProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);

                const response = await fetch('/api/client/profile');
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych profilu');
                }

                const data = await response.json();
                setProfile(data.profile);

            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                <p className="font-medium">Wystąpił błąd</p>
                <p>{error}</p>
                <button
                    className="mt-2 text-sm underline"
                    onClick={() => window.location.reload()}
                >
                    Odśwież stronę
                </button>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                <p className="font-medium">Brak danych</p>
                <p>Nie znaleziono danych profilu.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-medium mb-8">Mój profil</h1>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-medium mb-6">Dane konta</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Nazwa / Firma</h3>
                                <p className="mt-1">{profile.name}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="mt-1">{profile.email}</p>
                            </div>

                            {profile.nip && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">NIP</h3>
                                    <p className="mt-1">{profile.nip}</p>
                                </div>
                            )}

                            {profile.phone && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                                    <p className="mt-1">{profile.phone}</p>
                                </div>
                            )}

                            {profile.contactPerson && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Osoba kontaktowa</h3>
                                    <p className="mt-1">{profile.contactPerson}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Data utworzenia konta</h3>
                                <p className="mt-1">{formatDate(profile.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-medium mb-6">Adres</h2>

                        {profile.address ? (
                            <div className="space-y-4">
                                {profile.address.street && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Ulica i numer</h3>
                                        <p className="mt-1">{profile.address.street}</p>
                                    </div>
                                )}

                                {profile.address.postalCode && profile.address.city && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Kod pocztowy i miasto</h3>
                                        <p className="mt-1">{profile.address.postalCode} {profile.address.city}</p>
                                    </div>
                                )}

                                {profile.address.country && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Kraj</h3>
                                        <p className="mt-1">{profile.address.country}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">Brak danych adresowych</p>
                        )}
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Aby zaktualizować swoje dane, skontaktuj się z nami:
                    </p>
                    <div className="mt-2">
                        <a
                            href="mailto:office@creativetrust.pl"
                            className="text-black hover:text-gray-600 transition-colors font-medium"
                        >
                            office@creativetrust.pl
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}