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
    title: 'Moja Agencja Marketingowa',
    description: 'Profesjonalne usługi marketingowe, tworzenie stron www i sklepów internetowych',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
        <body className={manrope.className}>
        <div className="max-w-[1800px] mx-auto">
            <Header />
            <main>{children}</main>
        </div>
        <Footer />
        </body>
        </html>
    );
}