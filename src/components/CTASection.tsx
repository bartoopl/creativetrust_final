import NotchedButton from './ui/NotchedButton';
import CTAPulseCanvas from './CTAPulseCanvas';

export default function CTASection() {
    return (
        <section style={{ background: '#000', overflow: 'hidden', position: 'relative' }}>
            <img src="/design-handoff-v7/cad2d7d59470aff2.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            <CTAPulseCanvas />
            <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', padding: '96px 16px 0' }} className="lg:px-[72px] lg:pt-[200px]">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24, paddingBottom: 48 }} className="lg:gap-8 lg:pb-16">
                    <span style={{ fontSize: 12.2, fontWeight: 500, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: '20px' }}>
                        Łączymy myślenie biznesowe z prędkością AI
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(28px, 4.8vw, 60.8px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-2.4px', color: '#fff', margin: 0, whiteSpace: 'normal' }} className="lg:whitespace-nowrap lg:text-[60.8px] lg:leading-[66px]">
                        Zacznij budować digitalnie.
                    </h2>
                    <p style={{ fontSize: 17, lineHeight: '27px', letterSpacing: '-0.36px', color: 'rgba(255,255,255,0.6)', maxWidth: 640, margin: 0 }}>
                        Senior specjaliści i narzędzia AI - realizujemy projekty szybciej bez obniżania poprzeczki. Sprawdźmy razem, co możemy zrobić dla Twojego biznesu.
                    </p>
                    <NotchedButton href="/kontakt" variant="primary-dark">
                        Umów bezpłatną konsultację
                    </NotchedButton>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', height: 48, overflow: 'hidden', display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)' }} className="lg:h-[58px]">
                <div style={{ display: 'flex', animation: 'ctmarquee 25s linear infinite', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px', fontSize: 12.2, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.36px' }}>
                        <span>Strony www</span><span style={{ opacity: 0.4 }}>·</span><span>Ecommerce headless</span><span style={{ opacity: 0.4 }}>·</span><span>Marketing automation</span><span style={{ opacity: 0.4 }}>·</span><span>Social media</span><span style={{ opacity: 0.4 }}>·</span><span>Medusa.js</span><span style={{ opacity: 0.4 }}>·</span><span>Projekty z wynikami</span><span style={{ opacity: 0.4 }}>·</span><span>Prędkość AI w wdrożeniach</span><span style={{ opacity: 0.4 }}>·</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px', fontSize: 12.2, fontWeight: 500, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.36px' }}>
                        <span>Strony www</span><span style={{ opacity: 0.4 }}>·</span><span>Ecommerce headless</span><span style={{ opacity: 0.4 }}>·</span><span>Marketing automation</span><span style={{ opacity: 0.4 }}>·</span><span>Social media</span><span style={{ opacity: 0.4 }}>·</span><span>Medusa.js</span><span style={{ opacity: 0.4 }}>·</span><span>Projekty z wynikami</span><span style={{ opacity: 0.4 }}>·</span><span>Prędkość AI w wdrożeniach</span><span style={{ opacity: 0.4 }}>·</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
