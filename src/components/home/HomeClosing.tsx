import NotchedButton from '../ui/NotchedButton';

/** Closing statement with the hero action pair; the alternate path sends visitors back to the assistant. */
export default function HomeClosing() {
    return (
        <section id="kontakt" className="ct-section" style={{ paddingBottom: 'clamp(96px, 12vw, 180px)' }}>
            <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
                <span className="ct-eyebrow">Łączymy myślenie biznesowe z prędkością AI</span>
                <h2 className="ct-h1 ct-statement" style={{ maxWidth: '14ch' }}>Zacznij budować <span className="ct-electric">digitalnie.</span></h2>
                <p className="ct-lead" style={{ maxWidth: '48ch' }}>Senior specjaliści i narzędzia AI — realizujemy projekty szybciej, bez obniżania poprzeczki.</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <NotchedButton href="/kontakt">Umów bezpłatną konsultację</NotchedButton>
                    <NotchedButton href="#ask-hero-title" variant="ghost">Zadaj nam pytanie</NotchedButton>
                </div>
            </div>
        </section>
    );
}
