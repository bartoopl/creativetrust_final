import AskHero from './AskHero';
import HomeShowcase from './HomeShowcase';
import HomeProof from './HomeProof';
import HomeServices from './HomeServices';
import HomeWhyUs from './HomeWhyUs';
import HomeProcess from './HomeProcess';
import HomeVoices from './HomeVoices';
import HomeClosing from './HomeClosing';
import HomeCases from './HomeCases';
import HomeBlog from './HomeBlog';
import type { Locale } from '@/lib/i18n';

/** Homepage trial redesign: everything inside .ct-v2 uses the "electric ink on drafting paper" theme. */
export default function HomePage({ locale }: { locale: Locale }) {
    return (
        <div className="ct-v2">
            <AskHero locale={locale} />
            <div id="dalej" style={{ scrollMarginTop: 72 }} />
            <HomeShowcase locale={locale} />
            <HomeProof locale={locale} />
            <HomeServices locale={locale} />
            <HomeWhyUs locale={locale} />
            <HomeProcess locale={locale} />
            <HomeCases locale={locale} />
            <HomeVoices locale={locale} />
            <HomeBlog locale={locale} />
            <HomeClosing locale={locale} />
        </div>
    );
}
