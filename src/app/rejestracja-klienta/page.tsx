"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClientRegistrationPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        nip: '',
        street: '',
        postalCode: '',
        city: '',
        country: 'Polska',
        phone: '',
        contactPerson: '',
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email jest wymagany';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Podaj prawidłowy adres email';
        }
        
        // Password validation
        if (!formData.password) {
            newErrors.password = 'Hasło jest wymagane';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Hasło musi mieć co najmniej 8 znaków';
        }
        
        // Password confirmation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Hasła nie są identyczne';
        }
        
        // Company name validation
        if (!formData.name) {
            newErrors.name = 'Nazwa firmy jest wymagana';
        }
        
        // NIP validation
        if (!formData.nip) {
            newErrors.nip = 'NIP jest wymagany';
        } else if (!/^\d{10}$/.test(formData.nip.replace(/[^0-9]/g, ''))) {
            newErrors.nip = 'NIP musi składać się z 10 cyfr';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setSuccess('');
        
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch('/api/client/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                    nip: formData.nip,
                    address: {
                        street: formData.street,
                        postalCode: formData.postalCode,
                        city: formData.city,
                        country: formData.country,
                    },
                    phone: formData.phone,
                    contactPerson: formData.contactPerson,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Wystąpił błąd podczas rejestracji');
            }

            setSuccess('Rejestracja przebiegła pomyślnie. Możesz się teraz zalogować.');
            
            // Clear form
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                nip: '',
                street: '',
                postalCode: '',
                city: '',
                country: 'Polska',
                phone: '',
                contactPerson: '',
            });
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/logowanie-klienta');
            }, 2000);
            
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen py-12 px-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-medium mb-8 text-center">Rejestracja w Panelu Klienta</h1>

                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-2xl font-medium mb-6">Utwórz konto</h2>
                    
                    <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6">
                        <p>Zarejestruj się, aby uzyskać dostęp do Panelu Klienta. Po rejestracji Twoje konto zostanie zweryfikowane przez administratora i aktywowane w ciągu 24 godzin.</p>
                    </div>

                    {formError && (
                        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
                            {formError}
                        </div>
                    )}
                    
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left column */}
                            <div className="space-y-4">
                                {/* Email field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
                                        placeholder="Twój adres email"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Password field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Hasło <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
                                        placeholder="Hasło (min. 8 znaków)"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                {/* Confirm Password field */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Potwierdź hasło <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
                                        placeholder="Wprowadź hasło ponownie"
                                    />
                                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                                </div>

                                {/* Company Name field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nazwa firmy <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
                                        placeholder="Nazwa firmy / organizacji"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* NIP field */}
                                <div>
                                    <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-1">
                                        NIP <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="nip"
                                        name="nip"
                                        type="text"
                                        value={formData.nip}
                                        onChange={handleChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.nip ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-black focus:border-transparent transition-all`}
                                        placeholder="NIP (10 cyfr)"
                                    />
                                    {errors.nip && <p className="mt-1 text-sm text-red-600">{errors.nip}</p>}
                                    <p className="mt-1 text-xs text-gray-600">
                                        Wprowadź NIP firmy (10 cyfr)
                                    </p>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="space-y-4">
                                {/* Street field */}
                                <div>
                                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ulica i numer
                                    </label>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Ulica i numer"
                                    />
                                </div>

                                {/* Postal code field */}
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Kod pocztowy
                                    </label>
                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Kod pocztowy"
                                    />
                                </div>

                                {/* City field */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        Miasto
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Miasto"
                                    />
                                </div>

                                {/* Phone field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Telefon
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Numer telefonu"
                                    />
                                </div>

                                {/* Contact person field */}
                                <div>
                                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                                        Osoba kontaktowa
                                    </label>
                                    <input
                                        id="contactPerson"
                                        name="contactPerson"
                                        type="text"
                                        value={formData.contactPerson}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                        placeholder="Imię i nazwisko osoby kontaktowej"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
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
                                {loading ? 'Przetwarzanie...' : 'Zarejestruj się'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Masz już konto?{' '}
                        <Link
                            href="/logowanie-klienta"
                            className="text-black hover:underline"
                        >
                            Zaloguj się
                        </Link>
                    </p>

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