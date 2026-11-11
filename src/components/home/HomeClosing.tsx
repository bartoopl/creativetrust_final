import NotchedButton from '../ui/NotchedButton';
import type { Locale } from '@/lib/i18n';
import { homeCopy } from './home-copy';

/** Closing statement with the hero action pair; the alternate path sends visitors back to the assistant. */
export default function HomeClosing({ locale }: { locale: Locale }) {
    const { closing: t, contactHref } = homeCopy[locale];
    return (
        <section id="kontakt" className="ct-section" style={{ paddingBottom: 'clamp(96px, 12vw, 180px)' }}>
            <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
                <span className="ct-eyebrow">{t.eyebrow}</span>
                <h2 className="ct-h1 ct-statement" style={{ maxWidth: '14ch' }}>{t.title[0]}<span className="ct-electric">{t.title[1]}</span>{t.title[2]}</h2>
                <p className="ct-lead" style={{ maxWidth: '50ch' }}>{t.lead}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <NotchedButton href={t.ctaHref ?? contactHref}>{t.cta}</NotchedButton>
                    <NotchedButton href={t.secondaryHref} variant="ghost">{t.secondary}</NotchedButton>
                </div>
            </div>
        </section>
    );
}
