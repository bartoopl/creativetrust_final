import Link from 'next/link';
import NotchedButton from '../ui/NotchedButton';
import { AUDIT_FORM_HREF, MANAGEMENT_HREF, experience } from '@/lib/experience';

/** Homepage hero: what we do, the first step, and the experience it rests on. */
export default function HomeHero() {
    return (
        <section className="ct-home-hero" aria-labelledby="home-hero-title">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 text-center">
                <p className="ct-eyebrow" style={{ margin: 0 }}>Audyt, zarządzanie i budowa e-commerce</p>
                <h1 id="home-hero-title" className="ct-h1 ct-home-hero-title">
                    Prowadzimy e‑commerce marek, które chcą rosnąć <span className="ct-electric">z zyskiem.</span>
                </h1>
                <p className="ct-lead" style={{ maxWidth: '56ch' }}>
                    Audytujemy sklepy i prowadzimy e-commerce z zewnątrz. Projektujemy też i budujemy sklepy oraz strony
                    internetowe — tak, jak sami chcielibyśmy nimi zarządzać.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <NotchedButton href={AUDIT_FORM_HREF}>Zamów audyt e-commerce</NotchedButton>
                    <NotchedButton href={MANAGEMENT_HREF} variant="ghost">Jak zarządzamy e-commerce</NotchedButton>
                </div>
                <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)' }}>
                    Budujemy też:{' '}
                    <Link href="/uslugi/e-commerce" className="ct-home-hero-link">sklepy internetowe →</Link>{' '}
                    <Link href="/uslugi/strony-www" className="ct-home-hero-link">strony internetowe →</Link>
                </p>

                <div className="mt-10 flex w-full flex-col gap-4">
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-2)' }}>Doświadczenie, na którym opieramy pracę</p>
                    <ul className="grid w-full grid-cols-1 gap-1 text-left md:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {experience.map((item) => (
                            <li key={item.brand} className="ct-tile flex flex-col gap-6" style={{ padding: 'clamp(20px, 2.4vw, 28px)' }}>
                                <span style={{ fontSize: 13, color: 'var(--muted-2)' }}>{item.role}</span>
                                <div className="flex flex-col gap-2">
                                    <span style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text)' }}>{item.brand}</span>
                                    <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{item.text}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
