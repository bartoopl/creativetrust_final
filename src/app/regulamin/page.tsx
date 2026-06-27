import { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Regulamin — CreativeTrust',
    alternates: { canonical: `${SITE_URL}/regulamin` },
};

export default function RegulationsPage() {
    return (
        <main style={{ minHeight: '100vh', padding: '72px 16px' }} className="lg:px-[72px] lg:py-[120px]">
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <h1 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(38px, 4.8vw, 60.8px)', lineHeight: '1.05', letterSpacing: '-2.4px', margin: '0 0 24px' }}>
                    Regulamin
                </h1>
                <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(0,0,0,0.6)' }}>
                    Treść regulaminu jest dostępna na życzenie.
                </p>
            </div>
        </main>
    );
}
