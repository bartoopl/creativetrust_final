import type { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
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

// Latest case studies and posts come from Sanity: regenerated hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
    // Already branded: absolute, so the root template does not add a second „| CreativeTrust”.
    title: { absolute: 'CreativeTrust — Audyt i zarządzanie e-commerce z zewnątrz' },
    description: 'Audytujemy sklepy internetowe i prowadzimy e-commerce marek z zewnątrz. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'CreativeTrust — Audyt i zarządzanie e-commerce z zewnątrz',
        description: 'Audyt sklepu w 5–7 dni roboczych, zarządzanie e-commerce z zewnątrz i wdrożenia w jednym zespole.',
        url: SITE_URL,
        type: 'website',
    },
};

/** Homepage trial redesign: everything inside .ct-v2 uses the "electric ink on drafting paper" theme. */
export default function Home() {
    return (
        <div className="ct-v2">
            <HomeHero />
            <HomeProof />
            <HomeServices />
            <HomeWhyUs />
            <HomeProcess />
            <HomeShowcase />
            <HomeCases />
            <HomeVoices />
            <AskHero />
            <HomeBlog />
            <HomeClosing />
        </div>
    );
}
