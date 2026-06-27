"use client";

import Link from 'next/link';
const services = [
    { href: '/uslugi/strony-www', label: 'Strony www' },
    { href: '/uslugi/e-commerce', label: 'Ecommerce headless' },
    { href: '/uslugi/e-commerce', label: 'E-commerce management' },
    { href: '/uslugi/marketing-automation', label: 'Marketing automation' },
    { href: '/uslugi/social-media', label: 'Social media' },
];

const company = [
    { href: '/o-nas', label: 'O nas' },
    { href: '/portfolio', label: 'Case studies' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontakt', label: 'Kontakt' },
];

function LogoMark() {
    return (
        <svg width="154" height="19" viewBox="0 0 154 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="CreativeTrust">
            <rect x="0" y="0" width="3" height="3" fill="#000" />
            <rect x="4" y="0" width="3" height="3" fill="#000" />
            <rect x="8" y="0" width="3" height="3" fill="#000" />
            <rect x="0" y="4" width="3" height="3" fill="#000" />
            <rect x="0" y="8" width="3" height="3" fill="#000" />
            <rect x="0" y="12" width="3" height="3" fill="#000" />
            <rect x="0" y="16" width="3" height="3" fill="#000" />
            <rect x="4" y="16" width="3" height="3" fill="#000" />
            <rect x="8" y="16" width="3" height="3" fill="#000" />
            <text x="16" y="14" fontFamily="Inter,-apple-system,BlinkMacSystemFont,sans-serif" fontSize="13.5" fontWeight="500" letterSpacing="-0.4" fill="#000">
                creativetrust
            </text>
        </svg>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }} className="ct-shell-sm">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-start">
                        <LogoMark />
                        <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
                            <div className="flex flex-col gap-4">
                                <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Usługi</span>
                                {services.map((item) => (
                                    <Link key={item.href + item.label} href={item.href} style={{ fontSize: 14, color: '#000', textDecoration: 'none' }}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Firma</span>
                                {company.map((item) => (
                                    <Link key={item.href + item.label} href={item.href} style={{ fontSize: 14, color: '#000', textDecoration: 'none' }}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 32 }} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p style={{ fontSize: 11.4, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: 'rgba(0,0,0,0.4)', margin: 0 }}>
                            © {year} Creativetrust. Wszelkie prawa zastrzeżone.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/polityka-prywatnosci" style={{ fontSize: 11.4, color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
                                Polityka prywatności
                            </Link>
                            <Link href="/regulamin" style={{ fontSize: 11.4, color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
                                Regulamin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
