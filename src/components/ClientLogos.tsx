const logos = [
    '/design-handoff-v7/clients-logo-stripe.svg',
    '/design-handoff-v7/clients-logo-2.svg',
    '/design-handoff-v7/clients-logo-3.svg',
    '/design-handoff-v7/clients-logo-4.svg',
    '/design-handoff-v7/clients-logo-5.svg',
    '/design-handoff-v7/clients-logo-6.svg',
    '/design-handoff-v7/clients-logo-7.svg',
    '/design-handoff-v7/clients-logo-8.svg',
    '/design-handoff-v7/clients-logo-9.svg',
];

export default function ClientLogos() {
    const rows = [logos, logos];

    return (
        <section style={{ background: 'rgba(0,0,0,0.8)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', height: 56, overflow: 'hidden', display: 'flex', alignItems: 'center' }} className="lg:!h-[72px]">
            <div style={{ display: 'flex', animation: 'ctmarquee 28s linear infinite', whiteSpace: 'nowrap' }}>
                {rows.map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 40, padding: '0 20px' }} className="lg:gap-16 lg:px-8">
                        {row.map((src) => (
                            <img key={src} src={src} alt="" style={{ height: 16, opacity: 0.5, filter: 'invert(1)' }} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
