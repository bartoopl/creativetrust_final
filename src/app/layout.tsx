import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['500', '700'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'CreativeTrust',
    description: 'Profesjonalne usługi marketingowe, tworzenie stron www i sklepów internetowych',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl" className="overflow-x-hidden">
        <body className={`${manrope.className} overflow-x-hidden w-full`}>
        <div className="w-full overflow-x-hidden">
            <Header />
            <main className="w-full overflow-x-hidden">{children}</main>
            <Footer />
        </div>
        </body>
        </html>
    );
}