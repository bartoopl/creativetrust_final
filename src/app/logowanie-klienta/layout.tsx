import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Logowanie do panelu klienta - CreativeTrust',
    description: 'Zaloguj się do swojego panelu klienta aby uzyskać dostęp do faktur i płatności.'
};

export default function LoginLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return children;
}