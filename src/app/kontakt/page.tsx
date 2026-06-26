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
            <section style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: '112px 72px 120px' }} className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 500 }}>
                            KONTAKT
                        </div>
                        <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '66px', letterSpacing: '-2.4px', margin: '0 0 18px', maxWidth: '10ch' }}>
                            Zacznijmy od rozmowy.
                        </h1>
                        <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(255,255,255,0.6)', maxWidth: '48ch', margin: '0 0 36px' }}>
                            30-minutowa konsultacja bez zobowiązań. Pokażemy, gdzie AI realnie skróci Twój czas i podniesie wynik — konkretnie, bez marketingowego szumu.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32 }}>
                            {contactDetails.map(d => (
                                <div key={d.label}>
                                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>{d.label}</div>
                                    <Link href={d.href} className="ct-contact-link" style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 19.8, color: '#fff', textDecoration: 'none', letterSpacing: '-0.8px' }}>
                                        {d.value}
                                    </Link>
                                </div>
                            ))}
                            <div>
                                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '0.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>Adres</div>
                                <p style={{ fontFamily: 'var(--font-space), sans-serif', fontWeight: 500, fontSize: 15.4, color: '#fff', margin: 0, lineHeight: '24px', letterSpacing: '-0.32px' }}>
                                    M34 Business Center<br />
                                    ul. Kombatantów 34/500<br />
                                    66-400 Gorzów Wielkopolski
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: 40, padding: 22, borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11.4, letterSpacing: '.5px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 10 }}>Co możesz opisać w formularzu</div>
                            <ul style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13.5, lineHeight: 1.7, margin: 0, paddingLeft: 16 }}>
                                <li>Co chcesz poprawić: markę, stronę, sklep, automatyzację</li>
                                <li>Skala projektu i horyzont czasowy</li>
                                <li>Budżet orientacyjny (opcjonalnie)</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ borderRadius: 4, border: '1px solid rgba(255,255,255,0.08)', background: '#fff', overflow: 'hidden', padding: 8 }} className="min-h-[560px] lg:min-h-[760px]">
                        <iframe
                            src="https://forms.creativetrust.pl/s/cmksbivfc000cm2014hk4d62s"
                            style={{ width: '100%', height: '100%', minHeight: 560, border: 'none', display: 'block' }}
                            title="Formularz kontaktowy"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
