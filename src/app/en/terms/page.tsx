import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'Terms and conditions',
    alternates: pageAlternates('/regulamin', 'en', SITE_URL),
    openGraph: {
        title: 'Terms and conditions | CreativeTrust',
        url: `${SITE_URL}/en/terms`, siteName: 'CreativeTrust', locale: 'en_GB', type: 'website',
    },
};

export default function RegulationsPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <span className="ct-eyebrow">LEGAL</span>
                    <h1 className="ct-h1" style={{ marginTop: 16 }}>
                        Terms and conditions
                    </h1>
                </div>
            </section>
            <div style={{ padding: 'var(--pad-y) var(--pad-x)' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <p className="ct-body" style={{ margin: '0 0 24px', fontSize: 14 }}>
                        This is a courtesy translation. The <Link href="/regulamin" hrefLang="pl">Polish version</Link> is the legally binding one.
                    </p>
                    <p className="ct-lead">
                        The text of the terms and conditions is available on request.
                    </p>
                </div>
            </div>
        </main>
    );
}
