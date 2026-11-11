import NotchedButton from '../ui/NotchedButton';
import { AUDIT_FORM_HREF } from '@/lib/experience';

/** Closing statement: the audit is the first step; a short call is the alternate path. */
export default function HomeClosing() {
    return (
        <section id="kontakt" className="ct-section" style={{ paddingBottom: 'clamp(96px, 12vw, 180px)' }}>
            <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
                <span className="ct-eyebrow">Pierwszy krok</span>
                <h2 className="ct-h1 ct-statement" style={{ maxWidth: '14ch' }}>Zacznij od <span className="ct-electric">audytu.</span></h2>
                <p className="ct-lead" style={{ maxWidth: '50ch' }}>W 5–7 dni roboczych wiesz, gdzie sklep traci sprzedaż, marżę i czas zespołu — i co z tym zrobić w pierwszej kolejności.</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <NotchedButton href={AUDIT_FORM_HREF}>Zamów audyt e-commerce</NotchedButton>
                    <NotchedButton href="/kontakt" variant="ghost">Umów 15 minut rozmowy</NotchedButton>
                </div>
            </div>
        </section>
    );
}
