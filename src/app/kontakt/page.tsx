import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Kontakt — CreativeTrust | Umów konsultację AI-native',
    description: 'Porozmawiajmy o Twoim projekcie. 30-minutowa konsultacja — pokażemy, gdzie AI realnie skróci czas i podniesie wynik. Strategia, design, development, automatyzacja.',
    alternates: { canonical: `${SITE_URL}/kontakt` },
};

const contactDetails = [
    { label: 'E-mail', value: 'office@creativetrust.pl', href: 'mailto:office@creativetrust.pl' },
    { label: 'Telefon', value: '+48 570 526 421', href: 'tel:+48570526421' },
];

export default function ContactPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(72px, 10vw, 120px) 32px 96px' }} className="px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

                    {/* Left */}
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
                            KONTAKT
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5.5vw, 68px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: '0 0 24px' }}>
                            Zacznijmy od rozmowy.
                        </h1>
                        <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--muted)', maxWidth: '48ch', margin: '0 0 48px' }}>
                            30-minutowa konsultacja bez zobowiązań. Pokażemy, gdzie AI realnie skróci Twój czas i podniesie wynik — konkretnie, bez marketingowego szumu.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, borderTop: '1px solid var(--line)', paddingTop: 32 }}>
                            {contactDetails.map(d => (
                                <div key={d.label}>
                                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>{d.label}</div>
                                    <Link href={d.href} className="ct-contact-link" style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 600, fontSize: 20, color: 'var(--text)', textDecoration: 'none' }}>
                                        {d.value}
                                    </Link>
                                </div>
                            ))}
                            <div>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>Adres</div>
                                <p style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 16, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                                    M34 Business Center<br />
                                    ul. Kombatantów 34/500<br />
                                    66-400 Gorzów Wielkopolski
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: 48, padding: 24, borderRadius: 18, border: '1px solid color-mix(in srgb, var(--accent) 30%, var(--line))', background: 'color-mix(in srgb, var(--accent) 8%, var(--panel))' }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>Co możesz opisać w formularzu</div>
                            <ul style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, margin: 0, paddingLeft: 16 }}>
                                <li>Co chcesz poprawić: markę, stronę, sklep, automatyzację</li>
                                <li>Skala projektu i horyzont czasowy</li>
                                <li>Budżet orientacyjny (opcjonalnie)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right — iframe form */}
                    <div style={{ borderRadius: 22, border: '1px solid var(--line)', background: 'var(--panel)', overflow: 'hidden', padding: 8 }} className="min-h-[760px]">
                        <iframe
                            src="https://forms.creativetrust.pl/s/cmksbivfc000cm2014hk4d62s"
                            style={{ width: '100%', height: '100%', minHeight: 760, border: 'none', display: 'block' }}
                            title="Formularz kontaktowy"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
