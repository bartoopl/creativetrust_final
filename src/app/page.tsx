import type { Metadata } from 'next';
import AskHero from '@/components/home/AskHero';
import HomeShowcase from '@/components/home/HomeShowcase';
import HomeProof from '@/components/home/HomeProof';
import HomeServices from '@/components/home/HomeServices';
import HomeWhyUs from '@/components/home/HomeWhyUs';
import HomeProcess from '@/components/home/HomeProcess';
import HomeVoices from '@/components/home/HomeVoices';
import HomeClosing from '@/components/home/HomeClosing';
import HomeCases from '@/components/home/HomeCases';
import HomeBlog from '@/components/home/HomeBlog';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    // Already branded: absolute, so the root template does not add a second „| CreativeTrust”.
    title: { absolute: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo' },
    description: 'Strony www, ecommerce headless, marketing automation i social media. Strategia, design i wdrożenie w jednym zespole.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'CreativeTrust — Projekty cyfrowe, które działają biznesowo',
        description: 'Strony www, ecommerce headless, marketing automation i social media.',
        url: SITE_URL,
        type: 'website',
    },
};

/** Homepage trial redesign: everything inside .ct-v2 uses the "electric ink on drafting paper" theme. */
export default function Home() {
    return (
        <div className="ct-v2">
            <AskHero />
            <div id="dalej" style={{ scrollMarginTop: 72 }} />
            <HomeShowcase />
            <HomeProof />
            <HomeServices />
            <HomeWhyUs />
            <HomeProcess />
            <HomeCases />
            <HomeVoices />
            <HomeBlog />
            <HomeClosing />
        </div>
    );
}
