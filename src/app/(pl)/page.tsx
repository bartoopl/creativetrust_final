import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

// Latest case studies and posts come from Sanity: regenerated hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
    // Already branded: absolute, so the root template does not add a second „| CreativeTrust”.
    title: { absolute: 'CreativeTrust — Audyt, zarządzanie i budowa e-commerce' },
    description: 'Audytujemy i prowadzimy e-commerce marek z zewnątrz. Projektujemy i budujemy sklepy oraz strony internetowe. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.',
    alternates: pageAlternates('/', 'pl', SITE_URL),
    openGraph: {
        title: 'CreativeTrust — Audyt, zarządzanie i budowa e-commerce',
        description: 'Audyt sklepu w 5–7 dni roboczych, zarządzanie e-commerce z zewnątrz oraz budowa sklepów i stron internetowych.',
        url: SITE_URL,
        type: 'website',
    },
};

export default function Home() {
    return <HomePage locale="pl" />;
}
