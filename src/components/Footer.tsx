import Link from 'next/link';
import Wordmark from './ui/Wordmark';

const services = [
    { href: '/uslugi/strony-www', label: 'Strony www' },
    { href: '/uslugi/e-commerce', label: 'Ecommerce headless' },
    { href: '/uslugi/marketing-automation', label: 'Marketing automation' },
    { href: '/uslugi/social-media', label: 'Social media' },
];

const company = [
    { href: '/o-nas', label: 'O nas' },
    { href: '/portfolio', label: 'Case studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontakt', label: 'Kontakt' },
];

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
    return (
        <div className="flex flex-col gap-2.5">
            <span className="ct-meta">{title}</span>
            {items.map((item) => (
                <Link key={item.href + item.label} href={item.href} className="ct-nav-link" style={{ fontWeight: 400 }}>
                    {item.label}
                </Link>
            ))}
        </div>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#fff', borderTop: '1px solid var(--line)', padding: '56px var(--pad-x) 32px' }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
                <div className="flex flex-wrap justify-between gap-10">
                    <div className="flex flex-col gap-3" style={{ maxWidth: 320 }}>
                        <Link href="/" aria-label="CreativeTrust — strona główna"><Wordmark /></Link>
                        <p className="ct-body" style={{ fontSize: 13 }}>
                            Strony www, ecommerce headless, marketing automation i social media — z tempem AI.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-16">
                        <FooterColumn title="Usługi" items={services} />
                        <FooterColumn title="Firma" items={company} />
                    </div>
                </div>

                <div className="flex flex-wrap justify-between gap-3" style={{ paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
                        © {year} Creativetrust. Wszelkie prawa zastrzeżone.
                    </p>
                    <div className="flex gap-5">
                        <Link href="/polityka-prywatnosci" className="ct-contact-link" style={{ fontSize: 12, color: 'var(--muted)' }}>Polityka prywatności</Link>
                        <Link href="/regulamin" className="ct-contact-link" style={{ fontSize: 12, color: 'var(--muted)' }}>Regulamin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
