import React from 'react';
import Link from 'next/link';
import { getKnowledgeBase, getKnowledgeBaseLetters } from '@/lib/sanity';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Baza wiedzy - Agencja Marketingowa',
    description: 'Zapoznaj się z naszą bazą wiedzy na temat marketingu, designu, UX/UI i innych tematów związanych z rozwojem biznesu online.',
};

export default async function KnowledgeBasePage() {
    const knowledgeBaseEntries = await getKnowledgeBase();
    const availableLetters = await getKnowledgeBaseLetters();

    // Grupowanie wpisów według liter
    const entriesByLetter = knowledgeBaseEntries.reduce((acc: any, entry: any) => {
        const letter = entry.letter.toUpperCase();
        if (!acc[letter]) {
            acc[letter] = [];
        }
        acc[letter].push(entry);
        return acc;
    }, {});

    // Kompletny alfabet (bez polskich znaków)
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-[1800px] mx-auto">
                <h1 className="text-4xl md:text-5xl font-medium mb-4">Baza wiedzy</h1>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl">
                    Zapoznaj się z naszą bazą wiedzy na temat marketingu, designu, UX/UI i innych tematów związanych z rozwojem biznesu online.
                </p>

                {/* Alfabetyczna nawigacja */}
                <div className="flex flex-wrap gap-2 mb-16">
                    {alphabet.map((letter) => {
                        const hasEntries = availableLetters.includes(letter.toLowerCase());
                        return (
                            <Link
                                key={letter}
                                href={hasEntries ? `#${letter}` : '#'}
                                className={`
                  w-10 h-10 flex items-center justify-center rounded-full
                  ${hasEntries
                                    ? 'bg-black text-white hover:bg-gray-800'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
                            >
                                {letter}
                            </Link>
                        );
                    })}
                </div>

                {/* Lista wpisów według liter */}
                <div className="space-y-16">
                    {alphabet.map((letter) => {
                        const entries = entriesByLetter[letter] || [];
                        if (entries.length === 0) return null;

                        return (
                            <section key={letter} id={letter} className="scroll-mt-24">
                                <h2 className="text-6xl font-bold mb-8 border-b pb-4">{letter}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {entries.map((entry: any) => (
                                        <Link
                                            key={entry._id}
                                            href={`/baza-wiedzy/${entry.slug.current}`}
                                            className="block p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <h3 className="text-xl font-medium mb-2">{entry.title}</h3>
                                            <p className="text-gray-600 mb-4">{entry.shortDescription}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {entry.tags?.slice(0, 3).map((tag: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                                    >
                            {tag}
                          </span>
                                                ))}
                                                {entry.tags?.length > 3 && (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            +{entry.tags.length - 3}
                          </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}