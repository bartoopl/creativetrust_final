import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';
import ContactForm from '@/components/ContactForm';

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
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)' }}>
                <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <span className="ct-eyebrow">KONTAKT</span>
                        <h1 className="ct-h1" style={{ margin: '16px 0 18px', maxWidth: '12ch' }}>
                            Zacznijmy od rozmowy.
                        </h1>
                        <p className="ct-lead" style={{ maxWidth: '48ch', margin: '0 0 36px' }}>
                            30-minutowa konsultacja bez zobowiązań. Pokażemy, gdzie AI realnie skróci Twój czas i podniesie wynik — konkretnie, bez marketingowego szumu.
                        </p>

                        <div className="ct-grid-lines grid-cols-1 sm:grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                            {contactDetails.map(d => (
                                <div key={d.label} style={{ padding: '20px 22px' }}>
                                    <div className="ct-meta" style={{ marginBottom: 8 }}>{d.label}</div>
                                    <Link href={d.href} className="ct-contact-link" style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.3px' }}>
                                        {d.value}
                                    </Link>
                                </div>
                            ))}
                            <div className="sm:col-span-2" style={{ padding: '20px 22px' }}>
                                <div className="ct-meta" style={{ marginBottom: 8 }}>Adres</div>
                                <p style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                                    M34 Business Center<br />
                                    ul. Kombatantów 34/500<br />
                                    66-400 Gorzów Wielkopolski
                                </p>
                            </div>
                        </div>

                        <div className="ct-panel" style={{ marginTop: 24, padding: 22, background: 'var(--panel)' }}>
                            <div className="ct-eyebrow" style={{ marginBottom: 6 }}>Co możesz opisać w formularzu</div>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                {['Co chcesz poprawić: markę, stronę, sklep, automatyzację', 'Skala projektu i horyzont czasowy', 'Budżet orientacyjny (opcjonalnie)'].map((item, i) => (
                                    <li key={item} className="flex items-center gap-3" style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>
                                        <span className="ct-bullet" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
