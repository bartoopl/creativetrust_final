import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Contact | Book an AI-native consultation',
    description: 'Let’s talk about your project. A 30-minute consultation — we will show you where AI can genuinely save time and improve results. Strategy, design, development, automation.',
    alternates: pageAlternates('/kontakt', 'en', SITE_URL),
    openGraph: {
        title: 'Contact | Book an AI-native consultation | CreativeTrust',
        description: 'Let’s talk about your project. A 30-minute consultation — we will show you where AI can genuinely save time and improve results.',
        url: `${SITE_URL}/en/contact`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

const contactDetails = [
    { label: 'E-mail', value: 'office@creativetrust.pl', href: 'mailto:office@creativetrust.pl' },
    { label: 'Phone', value: '+48 570 526 421', href: 'tel:+48570526421' },
];

export default function ContactPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)' }}>
                <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <span className="ct-eyebrow">CONTACT</span>
                        <h1 className="ct-h1" style={{ margin: '16px 0 18px', maxWidth: '12ch' }}>
                            Let’s start with a conversation.
                        </h1>
                        <p className="ct-lead" style={{ maxWidth: '48ch', margin: '0 0 36px' }}>
                            A 30-minute, no-obligation consultation. We will show you where AI can genuinely save you time and improve your results — specifically, with no marketing fluff.
                        </p>

                        <div className="ct-grid-lines grid-cols-1 sm:grid-cols-2" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                            {contactDetails.map(d => (
                                <div key={d.label} style={{ padding: '20px 22px' }}>
                                    <div className="ct-meta" style={{ marginBottom: 8 }}>{d.label}</div>
                                    <Link href={d.href} className="ct-contact-link" style={{ fontWeight: 500, fontSize: 18, color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.3px' }}>
                                        {d.value}
                                    </Link>
                                </div>
                            ))}
                            <div className="sm:col-span-2" style={{ padding: '20px 22px' }}>
                                <div className="ct-meta" style={{ marginBottom: 8 }}>Address</div>
                                <p style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                                    M34 Business Center<br />
                                    ul. Kombatantów 34/500<br />
                                    66-400 Gorzów Wielkopolski
                                </p>
                            </div>
                        </div>

                        <div className="ct-panel" style={{ marginTop: 24, padding: 22, background: 'var(--panel)' }}>
                            <div className="ct-eyebrow" style={{ marginBottom: 6 }}>What you can describe in the form</div>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                {['What you want to improve: brand, website, online shop, automation', 'Project scale and timeframe', 'Indicative budget (optional)'].map((item, i) => (
                                    <li key={item} className="flex items-center gap-3" style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)', fontSize: 14, color: 'var(--text-2)', lineHeight: 1.5 }}>
                                        <span className="ct-bullet" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <ContactForm locale="en" />
                    </div>
                </div>
            </section>
        </main>
    );
}
