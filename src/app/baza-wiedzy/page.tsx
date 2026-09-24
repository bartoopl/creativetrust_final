import React from 'react';
import Link from 'next/link';
import { getKnowledgeBase, getKnowledgeBaseLetters } from '@/lib/sanity';
import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Card from '@/components/ui/Card';

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
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
            <PageHero
                eyebrow="Baza wiedzy"
                title="Baza wiedzy"
                description="Zapoznaj się z naszą bazą wiedzy na temat marketingu, designu, UX/UI i innych tematów związanych z rozwojem biznesu online."
            />

            {/* Alfabetyczna nawigacja */}
            <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--panel)' }}>
                <div className="ct-shell-sm mx-auto flex max-w-[1280px] flex-wrap gap-1.5" style={{ boxSizing: 'content-box' }}>
                    {alphabet.map((letter) => {
                        const hasEntries = availableLetters.includes(letter.toLowerCase());
                        return (
                            <Link
                                key={letter}
                                href={hasEntries ? `#${letter}` : '#'}
                                className={`ct-mono flex items-center justify-center ${hasEntries ? 'ct-card-hover' : 'cursor-not-allowed'}`}
                                style={{
                                    width: 34, height: 34, fontSize: 13, fontWeight: 500,
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--line-strong)',
                                    background: hasEntries ? '#fff' : 'transparent',
                                    color: hasEntries ? 'var(--text)' : 'var(--muted-2)',
                                    opacity: hasEntries ? 1 : 0.6,
                                }}
                            >
                                {letter}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Lista wpisów według liter */}
            <div style={{ padding: 'var(--pad-y) var(--pad-x)' }}>
                <div className="mx-auto flex max-w-[1280px] flex-col" style={{ gap: 'clamp(40px, 6vw, 64px)' }}>
                    {alphabet.map((letter) => {
                        const entries = entriesByLetter[letter] || [];
                        if (entries.length === 0) return null;

                        return (
                            <section key={letter} id={letter} className="scroll-mt-24">
                                <h2 className="ct-mono flex items-baseline justify-between" style={{ margin: '0 0 20px', paddingBottom: 12, borderBottom: '1px solid var(--line)', fontSize: 28, fontWeight: 500, color: 'var(--accent)' }}>
                                    {letter}
                                    <span className="ct-meta" style={{ color: 'var(--muted-2)' }}>{String(entries.length).padStart(2, '0')}</span>
                                </h2>
                                <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                                    {entries.map((entry: any) => (
                                        <Card
                                            key={entry._id}
                                            href={`/baza-wiedzy/${entry.slug.current}`}
                                            title={entry.title}
                                            description={entry.shortDescription}
                                            tags={[
                                                ...(entry.tags?.slice(0, 3) || []),
                                                ...(entry.tags?.length > 3 ? [`+${entry.tags.length - 3}`] : []),
                                            ]}
                                        />
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
