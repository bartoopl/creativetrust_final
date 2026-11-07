import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { SITE_URL } from '@/lib/schema';

// Two root layouts ((pl) and en) leave unmatched URLs without a layout; this page renders them instead.
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'Nie znaleziono strony | Page not found — CreativeTrust',
    robots: { index: false },
};

export default function GlobalNotFound() {
    return (
        <SiteShell locale="pl">
            <section className="ct-section" style={{ minHeight: '60vh' }}>
                <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
                    <span className="ct-eyebrow">404</span>
                    <h1 className="ct-h2 ct-statement">Nie znaleziono strony.</h1>
                    <p className="ct-body" lang="en">Page not found.</p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <Link href="/" className="ct-cta">Strona główna</Link>
                        <Link href="/en" className="ct-ghost" lang="en">English home</Link>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
