import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Kontakt - CreativeTrust',
    description: 'Skontaktuj się z CreativeTrust, jeśli chcesz uporządkować branding, stronę WWW, e-commerce lub komunikację marketingową.',
    alternates: {
        canonical: `${SITE_URL}/kontakt`,
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen px-6 py-16 md:py-24 lg:py-28">
            <div className="mx-auto grid max-w-[1800px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Kontakt
                    </p>
                    <h1 className="mt-4 text-4xl font-medium leading-[1.02] text-slate-950 md:text-6xl lg:text-7xl">
                        Jeśli projekt ma mieć sens biznesowy, zacznijmy od rozmowy.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                        Opisz krótko, co chcesz uporządkować: markę, stronę WWW, sklep, social media albo automatyzację.
                        Odpowiemy konkretnie i bez marketingowego szumu.
                    </p>

                    <div className="mt-10 space-y-8 border-t border-slate-200 pt-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">E-mail</p>
                            <Link href="mailto:office@creativetrust.pl" className="mt-2 inline-flex text-lg font-medium text-slate-950 hover:text-slate-500">
                                office@creativetrust.pl
                            </Link>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Telefon</p>
                            <p className="mt-2 text-lg font-medium text-slate-950">+48 570 526 421</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Adres</p>
                            <p className="mt-2 text-lg font-medium text-slate-950">
                                M34 Business Center
                                <br />
                                ul. Kombatantów 34/500
                                <br />
                                66-400 Gorzów Wielkopolski
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[8px] border border-slate-200 bg-white p-4 md:p-6">
                    <iframe
                        src="https://forms.creativetrust.pl/s/cmksbivfc000cm2014hk4d62s"
                        className="h-[760px] w-full border-0"
                        title="Formularz kontaktowy"
                    />
                </div>
            </div>
        </main>
    );
}
