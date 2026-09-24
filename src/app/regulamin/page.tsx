import { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Regulamin — CreativeTrust',
    alternates: { canonical: `${SITE_URL}/regulamin` },
};

export default function RegulationsPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <section className="ct-dotgrid" style={{ padding: 'var(--pad-y) var(--pad-x)', borderBottom: '1px solid var(--line)' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <span className="ct-eyebrow">LEGAL</span>
                    <h1 className="ct-h1" style={{ marginTop: 16 }}>
                        Regulamin
                    </h1>
                </div>
            </section>
            <div style={{ padding: 'var(--pad-y) var(--pad-x)' }}>
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <p className="ct-lead">
                        Treść regulaminu jest dostępna na życzenie.
                    </p>
                </div>
            </div>
        </main>
    );
}
