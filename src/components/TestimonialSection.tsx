export default function TestimonialSection() {
    return (
        <section style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--panel2)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '68px 32px', textAlign: 'center' }} className="px-4 py-16 sm:px-6 lg:px-8">
                <div style={{
                    fontFamily: 'var(--font-space), sans-serif',
                    fontSize: 'clamp(18px, 2.1vw, 26px)',
                    fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em',
                }}>
                    „Dostaliśmy partnera, który myśli produktem, nie tylko pikselami.{' '}
                    <span style={{ color: 'var(--accent)' }}>Tempo wdrożeń wzrosło dwukrotnie</span>, a komunikacja zaczęła sprzedawać."
                </div>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'repeating-linear-gradient(135deg, var(--panel) 0 6px, color-mix(in srgb, var(--accent) 14%, var(--panel)) 6px 12px)', border: '1px solid var(--line)', display: 'inline-block' }} />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-space), sans-serif' }}>Klient CreativeTrust</div>
                        <div style={{ color: 'var(--muted)', fontSize: 12 }}>Head of Growth</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
